import { Component } from "../Abstract/Component";


export const headerMenu = `
    <div class="header__wrapp">
        <img src="../assets/fav.png">
        <ul>
        <li>Главная</li>
        <li>Каталог</li>
        <li>Авторизация</li>
        <li>Корзина</li>
        </ul>
    </div>
`

export class Header extends Component {
    constructor(
        public parent: HTMLElement
    ) {
    super(parent, 'header', ['header'], null, null)
    const headerContainer = new Component(this.root, 'div', ['header__wrapp'], null, null);
    const headerImg = new Component(headerContainer.root, 'img', ['header__img'],  { src: "./assets/Equipment.png", alt: "logo"}, null);
    const headerList = new Component(headerContainer.root, 'ul', ['header__list'],  null, null);
    const headerItemMain = new Component(headerList.root, 'li', ['header__item'],  null, "Главная");
    const headerItemCatalog = new Component(headerList.root, 'li', ['header__item'],  null, "Каталог");
    const headerItemAuto = new Component(headerList.root, 'li', ['header__item'],  null, "Авторизация");
    const headerItemBascket = new Component(headerList.root, 'li', ['header__item'],  null, "Корзина");
    }
}

