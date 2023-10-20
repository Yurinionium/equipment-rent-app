import { Component } from "../Abstract/Component";
import { TServises } from "../Abstract/Types";

export class Basket extends Component {
    constructor(
        public parent: HTMLElement,
        private services: TServises
    ) {
        super(parent, 'main', ['main__wrapper'], null, null)
        const mainTitle = new Component(this.root, 'h2', ['catalog__title', 'object__title'], null, "Корзина");
        // const mainParagraph = new Component(this.root, 'h2', ['basket__title'], null, "Ваша корзина недоступна. Авторизируйтесь!");
        // const mainButton = new Component(this.root, 'button', ['autorization__button'], null, "Авторизироваться");
        // mainButton.root.addEventListener('click', () =>{
        //     window.location.hash = '#authorization';        
        // })
    }
}
