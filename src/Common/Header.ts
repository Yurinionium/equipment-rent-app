import { Component } from "../Abstract/Component";
import { TServises } from "../Abstract/Types";

export class Header extends Component {

    constructor(
        public parent: HTMLElement,
        private services: TServises
    ) {
    super(parent, 'header', ['header'], null, null)
    const headerContainer = new Component(this.root, 'div', ['header__wrapp'], null, null);
    const headerImg = new Component(headerContainer.root, 'img', ['header__img'],  { src: "./assets/Equipment.png", alt: "logo"}, null);
    const headerList = new Component(headerContainer.root, 'ul', ['header__list'],  null, null);
    const headerItemMain = new Component(headerList.root, 'li', ['header__item'],  null, "Главная");
    const headerItemCatalog = new Component(headerList.root, 'li', ['header__item'],  null, "Каталог");
    const headerItemBascket = new Component(headerList.root, 'li', ['header__item'],  null, "Корзина");
    const headerItemAuto = new Component(headerList.root, 'li', ['header__item'],  null, "Личный кабинет");
    

    headerImg.root.addEventListener('click', () =>{
        window.location.hash = '#';        
    })
    headerItemMain.root.addEventListener('click', () =>{
        window.location.hash = '#';        
    })
    headerItemCatalog.root.addEventListener('click', () =>{
        window.location.hash = '#catalog';        
    })
    headerItemAuto.root.addEventListener('click', () =>{
        window.location.hash = '#personalroom';        
    })
    headerItemBascket.root.addEventListener('click', () =>{
        window.location.hash = '#basket';        
    })
    }
}

