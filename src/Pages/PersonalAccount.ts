import { Component } from "../Abstract/Component";
import { getAuth, signOut } from "firebase/auth";
import { TServises } from "../Abstract/Types";

export class PersonalAccount extends Component {
    googgleLogOut: Component;
    constructor(
        public parent: HTMLElement,
        private services: TServises
    ) {
        super(parent, 'main', ['main__wrapper'], null, null)
        const container = new Component(this.root, 'div', ['container'], null);
        const mainTitle = new Component(container.root, 'h2', ['object__title'], null, "Личный кабинет");

        this.googgleLogOut = new Component(container.root, 'button', ['autorization__button', 'null'], null, "Выйти");

        const personalContainer = new Component(this.root, 'div', ['personal__container'], null);
        const personalImg = new Component(personalContainer.root, 'img', ['personal__img'], { src: `${services.authService.user?.photoURL}`, alt: "logo" }, null);
        const personInforContainer = new Component(personalContainer.root, 'div', ['personalinform__container'], null);
        const nameContainer = new Component(personInforContainer.root, 'div', ['personaltext__container'], null);
        const nameTitle = new Component(nameContainer.root, 'span', ['personal__text'], null, "Name:");
        const nameTitleData = new Component(nameContainer.root, 'span', ['personal__text'], null, services.authService.user?.displayName);
        const emailContainer = new Component(personInforContainer.root, 'div', ['personaltext__container'], null);
        const nameTitleEmail = new Component(emailContainer.root, 'p', ['personal__text'], null, "Email:");
        const nameTitleDataEmail = new Component(emailContainer.root, 'p', ['personal__text'], null, services.authService.user?.email);
        const priceContainer = new Component(personInforContainer.root, 'div', ['personaltext__container'], null);

        this.googgleLogOut.root.addEventListener('click', () => {
            this.services.authService.outFromGoogle();
        });
    }
}
