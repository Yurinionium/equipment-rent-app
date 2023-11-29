import { FirebaseApp } from "firebase/app";
import { Observer } from "../Abstract/Observer";
import {
    DocumentData,
    Firestore,
    Timestamp,
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    runTransaction,
    setDoc
} from "firebase/firestore";
import { User } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { TGood, TDataUser, TGoodBasket, TDataBasket, TDataHistoryWithId, dataHistory, TDataGraph } from "../Abstract/Types";

export class DBService extends Observer {
    private db: Firestore = getFirestore(this.DBFirestore);

    dataUser: TDataUser | null = null;

    dataBasket: TDataBasket = {
        summa: 0,
    };

    constructor(private DBFirestore: FirebaseApp) {
        super();
    }

    caclCostGood(count: number, price: number): number {
        const cost = count * price;
        return cost;
    }

    calcDataBasket() {
        if (!this.dataUser) return;
        let summa = 0;
        let count = 0;
        this.dataUser.basket.forEach((el) => {
            summa += el.count * el.good.price;
            count += el.count;
        });
        // const percent = count >= 20 ? 10 : count >= 10 ? 5 : 0;
        const allSumma = summa / 100;

        this.dataBasket.summa = summa;
        // this.dataBasket.percent = percent;
    }

    async getAllGoods(): Promise<TGood[]> {
        const querySnapshot = await getDocs(collection(this.db, "Goods"));
        const storage = getStorage();
        const filterDocs = querySnapshot.docs.filter(value => (value.data().date as Timestamp).toDate() < new Date());
        // const goods = querySnapshot.docs.map(async (doc) => {
        const goods = filterDocs.map(async (doc) => {
            const data = doc.data();
            const uri = ref(storage, data.url);
            const url = await getDownloadURL(uri);
            const good = {
                category: data.category as string,
                id: doc.id,
                model: data.model as string,
                name: data.name as string,
                price: data.price as number,
                url: url,
                date: (data.date as Timestamp).toDate(),
            };
            return good;
        });
        return Promise.all(goods);
    }

    async getDataUser(user: User | null): Promise<void> {
        if (user === null) return;

        const docRef = doc(this.db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            this.dataUser = docSnap.data() as TDataUser;
            // console.log(docSnap.data());
        } else {
            const data = {
                email: user.email,
                name: user.displayName,
                fotoUrl: user.photoURL,
                basket: [],
            };
            await setDoc(doc(this.db, "users", user.uid), data);
            const docSetSnap = await getDoc(docRef);
            this.dataUser = (docSetSnap.data() as TDataUser) || null;
            console.log("create document!");
        }
    }

    async addGoodInBasket(user: User | null, good: TGood): Promise<void> {
        if (!user || !this.dataUser) return;

        const index = this.dataUser.basket.findIndex(
            (element) => element.good.id === good.id
        );
        if (index >= 0) {
            return;
        }

        const newUser = {} as TDataUser;
        Object.assign(newUser, this.dataUser);
        const goodBasket = {
            good: good,
            count: 1
        } as TGoodBasket;

        newUser.basket.push(goodBasket);

        await setDoc(doc(this.db, "users", user.uid), newUser)
            .then(() => {
                this.dataUser = newUser;
                this.calcDataBasket();
                this.dispatch("goodInBasket", goodBasket);
                this.dispatch("changeDataBasket", this.dataBasket);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    async changeGoodInBasket(user: User | null, goodBasket: TGoodBasket): Promise<void> {
        if (!user || !this.dataUser) return;

        const index = this.dataUser.basket.findIndex((el) => el.good.id === goodBasket.good.id);

        const newUser = {} as TDataUser;
        Object.assign(newUser, this.dataUser);
        newUser.basket[index] = goodBasket;
        await setDoc(doc(this.db, "users", user.uid), newUser)
            .then(() => {
                this.dataUser = newUser;
                this.calcDataBasket();
                this.dispatch("changeDataBasket", this.dataBasket);
            })
            .catch(() => { });
    }

    async delGoodFromBasket(user: User | null, good: TGoodBasket): Promise<void> {
        if (!user || !this.dataUser) return;

        const newBasket = this.dataUser.basket.filter(
            (el) => el.good.id !== good.good.id
        );

        const newUser = {} as TDataUser;
        Object.assign(newUser, this.dataUser);
        newUser.basket = newBasket;

        await setDoc(doc(this.db, "users", user.uid), newUser)
            .then(() => {
                this.dataUser = newUser;
                this.calcDataBasket();
                this.dispatch("delGoodFromBasket", good.good.id);
                this.dispatch("changeDataBasket", this.dataBasket);
            })
            .catch(() => { });
    }

    async addBasketInHistory(user: User | null): Promise<void> {
        if (!user || !this.dataUser) return;

        const newUser = {} as TDataUser;
        Object.assign(newUser, this.dataUser);
        newUser.basket = [];

        const dataHistory = {
            basket: this.dataUser.basket,
            dataBasket: this.dataBasket,
            data: Timestamp.now()
        };

        try {
            await runTransaction(this.db, async (transaction) => {
                if (!this.dataUser) throw "БД отсутствует";

                const result = this.dataUser.basket.map(async (el) => {
                    const goodRef = doc(this.db, "Goods", el.good.id);
                    const sfGood = await transaction.get(goodRef);

                    if (!sfGood.exists()) throw "Good does not exist!";

                    let dayGood = sfGood.data().date.seconds * 1000;

                    let today = new Date().getTime();

                    if (isNaN(dayGood) || isNaN(today)) {
                        console.error("Invalid date values:", dayGood, today);
                    }

                    let dayError = new Date(dayGood); // Пример времени в миллисекундах

                    // Извлекаем компоненты даты
                    const day = dayError.getDate();
                    const month = dayError.getMonth() + 1; // Месяцы начинаются с 0, поэтому прибавляем 1
                    const year = dayError.getFullYear();


                    if (dayGood > today) {
                        alert(`Товар ${el.good.name} будет доступна ${day < 10 ? '0' : ''}${day}:${month < 10 ? '0' : ''}${month}:${year}`);
                        throw "Good does not count!";
                    }

                    let newDate = new Date(today);
                    newDate.setDate(newDate.getDate() + el.count);
                    console.log(newDate);
                    let newTimestamp = newDate.getTime().toLocaleString('en');
                    transaction.update(goodRef, { date: newDate });
                    return Promise.resolve("ok");
                });

                await Promise.all(result);

                const userRef = doc(this.db, "users", user.uid);
                transaction.update(userRef, { basket: [] });
            });

            await addDoc(collection(this.db, "users", user.uid, "history"), dataHistory);

            this.dataUser.basket.forEach((el) => {
                this.dispatch("delGoodFromCatalog", el.good.id);
            });

            console.log(dataHistory);
            this.dispatch("addInHistory", dataHistory);
            this.dataUser = newUser;
            this.calcDataBasket();
            this.dispatch("clearBasket");
            this.dispatch("changeDataBasket", this.dataBasket);
            this.calcCountDocsHistory(user);

            console.log("Transaction successfully committed!");
        } catch (e) {
            console.log("Transaction failed: ", e);
        }
    }

    async calcCountDocsHistory(user: User | null): Promise<void> {
        if (!user || !this.dataUser) return;

        const querySnapshot = await getDocs(collection(this.db, "users", user.uid, "history"));
        const count = querySnapshot.docs.length;

        let summa = 0;
        querySnapshot.docs.forEach((el) => {
            if (el.data().dataBasket.summa > summa) summa = el.data().dataBasket.summa;
        });

        this.dispatch("changeStat", count, summa);
    }

    async getAllHistory(user: User | null): Promise<TDataHistoryWithId[]> {
        if (!user || !this.dataUser) return [];

        const q = query(collection(this.db, "users", user.uid, "history"), orderBy("data", "asc"));
        const querySnapshot = await getDocs(q);
        const rez = querySnapshot.docs.map((doc) => {
            const data = doc.data() as TDataHistoryWithId;
            data.id = doc.id;
            return data;
        });
        return rez;
    }

    updateDataGraph(histories: dataHistory[]): TDataGraph[] {
        const data = {} as Record<string, number>;
        histories.forEach((el) => {
            const dataString = el.data.toDate().toDateString();
            if (data[dataString]) {
                data[dataString] += el.dataBasket.summa;
            } else {
                data[dataString] = el.dataBasket.summa;
            }
        });
        const sortData = [];
        for (const day in data) {
            sortData.push({
                x: new Date(day),
                y: data[day]
            });
        }
        return sortData.sort((a, b) => a.x.getMilliseconds() - b.x.getMilliseconds());
    }
}
