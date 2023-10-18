import { Component } from "../Abstract/Component";
import { getDatabase, ref, child, get, set } from "firebase/database";

export class Catalog extends Component {
    constructor(
        public parent: HTMLElement
    ) {
        super(parent, 'main', ['main__wrapper'], null, null);
        const mainTitle = new Component(this.root, 'h2', ['catalog__title', 'object__title'], null, "Вибротрамбовки");

        mainTitle.root.onclick = () => {

            const db = getDatabase();
            set(ref(db, 'cards/2'), {
                "name": "Card 2",
                "description": "Card 2 description",
                "price": 101,
                "profile_picture" : "https://www.pnevmoteh.by/sites/pnevmoteh.by/files/images/iqsuie3qv7azd43f92s9sn3nd34gle4h.jpeg"
            });


            // const dbRef = ref(getDatabase());
            // get(child(dbRef, `cards`)).then((snapshot) => {
            // if (snapshot.exists()) {
            //     console.log(snapshot.val());
            // } else {
            //     console.log("No data available");
            // }
            // }).catch((error) => {
            // console.error(error);
            // });
              
        }
    }
}
