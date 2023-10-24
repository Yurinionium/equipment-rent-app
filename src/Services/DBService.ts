import { FirebaseApp } from "firebase/app";
import { Observer } from "../Abstract/Observer";
import { DocumentData, Firestore, collection, doc, getDoc, getDocs, getFirestore, setDoc, addDoc, query, where, deleteDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { TGood } from "../Abstract/Types";
import { Order } from "../Pages/Catalog";

export type ServerOrder = Order & { id: string }

export class DBService extends Observer {
    private db: Firestore = getFirestore(this.DBFirestore);

    dataUser: DocumentData | null = null;

    constructor(private DBFirestore: FirebaseApp) {
        super();
    }

    async createOrder(order: Order) {
        try {
            await addDoc(collection(this.db, "orders"), order);
            return true;
        } catch (error) {
            console.error("Error adding document: ", error);
            return false;
        }
    }

    async deleteOrder(orderId: string) {
        try {
            
            // Создаем ссылку на документ, который мы собираемся удалить
            console.log(orderId);
            
            const orderRef = doc(this.db, "orders", orderId);
    
            // Удаляем документ
            await deleteDoc(orderRef);
    
            return true; // Успешное удаление
        } catch (error) {
            console.error("Error removing document: ", error);
            return false; // Обработка ошибки удаления
        }
    }



    async getOrdersByBuyer(buyerId: string) {
        try {
            // Создаем ссылку на коллекцию
            const ordersCollection = collection(this.db, "orders");

            // Создаем запрос с условием фильтрации
            const q = query(ordersCollection, where("buyer", "==", buyerId));

            // Выполняем запрос и получаем результаты
            const querySnapshot = await getDocs(q);
            
            // Собираем все данные документов в массив
            
            let orders: ServerOrder[] = [];
            querySnapshot.forEach((doc) => {
                // doc.data() возвращает объект данных для каждого документа
                orders.push((doc.data() as ServerOrder));
            });

            return orders; // Возвращаем список заказов

        } catch (error) {
            console.error("Error getting documents: ", error);
            return []; // Возвращаем null или обрабатываем ошибку соответствующим образом
        }
    }

    async getAllGoods(): Promise<TGood[]> {
        const querySnapshot = await getDocs(collection(this.db, "Goods"));
        const storage = getStorage();
        const goods = querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const uri = ref(storage, data.url);
            // console.log(uri);
            const url = await getDownloadURL(uri);
            const good = {
                category: data.category as string,
                id: doc.id,
                model: data.model as string,
                name: data.name as string,
                price: data.price as number,
                type: data.type as string,
                url: url
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
            this.dataUser = docSnap.data();
            console.log(docSnap.data());
        } else {
            const data = {
                email: user.email,
                name: user.displayName,
                fotoUrl: user.photoURL
            };
            await setDoc(doc(this.db, "users", user.uid), data);
            const docSetSnap = await getDoc(docRef);
            this.dataUser = docSetSnap.data() || null;
            console.log("create document!");
        }
    }
}
