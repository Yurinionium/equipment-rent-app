import { Component } from "../Abstract/Component";
import { getAuth, signOut } from "firebase/auth";

export class PersonalAccount extends Component {
    googgleLogOut: Component;
    constructor(
        public parent: HTMLElement,
    ) {
        super(parent, 'main', ['main__wrapper'], null, null)
        const container = new Component(this.root, 'div', ['container'], null);
        const mainTitle = new Component(container.root, 'h2', ['object__title'], null, "Личный кабинет");

        this.googgleLogOut = new Component(container.root, 'button', ['autorization__button', 'null'], null, "Выйти");

        const user = localStorage.getItem('user')
        const userData = user ? JSON.parse(user) : null

        const nameContent = userData ? `Name: ${userData.displayName}` : ''
        const emailContent = userData ? `Email: ${userData.email}` : ''

        const personalContainer = new Component(this.root, 'div', ['personal__container'], null);
        const personalImg = new Component(personalContainer.root, 'img', ['personal__img'], { src: "./assets/person.png", alt: "logo" }, null);
        const personInforContainer = new Component(personalContainer.root, 'div', ['personalinform__container'], null);
        const nameContainer = new Component(personInforContainer.root, 'div', ['personaltext__container'], null);
        const nameTitle = new Component(nameContainer.root, 'p', ['personal__text'], null, nameContent);
        const nameTitleData = new Component(nameContainer.root, 'p', ['personal__text'], null,);
        const emailContainer = new Component(personInforContainer.root, 'div', ['personaltext__container'], null);
        const nameTitleEmail = new Component(emailContainer.root, 'p', ['personal__text'], null, emailContent);
        const nameTitleDataEmail = new Component(emailContainer.root, 'p', ['personal__text'], null, );
        const priceContainer = new Component(personInforContainer.root, 'div', ['personaltext__container'], null);

        this.googgleLogOut.root.addEventListener('click', () => {
            this.outFromGoogle();
        });
    }
    outFromGoogle(): void{
        const auth = getAuth();
        signOut(auth)
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        })
    }
}
