import { Component } from "./Abstract/Component"
import { Footer, FooterMenu, FooterAutor} from "./Common/Footer"
import { Header, headerMenu } from "./Common/Header"
import { Main } from "./Pages/Main"
import "./style.scss"
import "./style.scss"

class App {
    constructor(parrent: HTMLElement) {
        const wrap = new Component(parrent, 'div', []);
        
        const header = new Header(wrap.root, 'header', ['header'], null, null);
        const headerContainer = new Header(header.root, 'div', ['header__wrapp'], null, null);
        const headerImg = new Header(headerContainer.root, 'img', ['header__img'],  { src: "./assets/Equipment.png", alt: "logo"}, null);
        const headerList = new Header(headerContainer.root, 'ul', ['header__list'],  null, null);
        const headerItemMain = new Header(headerList.root, 'li', ['header__item'],  null, "Главная");
        const headerItemCatalog = new Header(headerList.root, 'li', ['header__item'],  null, "Каталог");
        const headerItemAuto = new Header(headerList.root, 'li', ['header__item'],  null, "Авторизация");
        const headerItemBascket = new Header(headerList.root, 'li', ['header__item'],  null, "Корзина");

        const main = new Main(wrap.root, 'main', ['main__wrapper'], null, null);
        const mainTitle = new Main(main.root, 'h1', ['main__title'], null, "Equipment-Rent-App");
        const mainParagraph1 = new Main(main.root, 'p', ['main__paragraph'], null, "Добро пожаловать на нашу платформу для аренды оборудования. ");
        const mainParagraph2 = new Main(main.root, 'p', ['main__paragraph', 'main__paragraph-padding'], null, "Мы предлагаем широкий выбор оборудования и удобный способ организовать аренду. ");
        const mainParagraph3 = new Main(main.root, 'p', ['main__paragraph'], null, "Сделайте ваш следующий проект еще проще с нашим приложением.");
        const mainSubtitile = new Main(main.root, 'p', ['main__subtitle'], null, "Как мы работаем!");
        const mainCards = new Main(main.root, 'div', ['main__cards'], null, null);

        const mainCard1 = new Main(mainCards.root, 'div', ['main__card'], null, null);
        const mainCardTitle1 = new Main(mainCard1.root, 'h3', ['main__card-title'], null, "Выберите оборудование");
        const mainCardSubtitle1 = new Main(mainCard1.root, 'p', ['main__card-subtitle'], null, "Изучите наш каталог и выберите необходимое оборудование для вашего проекта.");

        const mainCard2 = new Main(mainCards.root, 'div', ['main__card'], null, null);
        const mainCardTitle2 = new Main(mainCard2.root, 'h3', ['main__card-title'], null, "Определите срок");
        const mainCardSubtitle2 = new Main(mainCard2.root, 'p', ['main__card-subtitle'], null, "Определите требуемый срок аренды и укажите дату и время, когда вам нужно будет использовать оборудование.");
        const mainCard3 = new Main(mainCards.root, 'div', ['main__card'], null, null);
        const mainCardTitle3 = new Main(mainCard3.root, 'h3', ['main__card-title'], null, "Авторизируйтесь на сайте");
        const mainCardSubtitle3 = new Main(mainCard3.root, 'p', ['main__card-subtitle'], null, "Авторизируйтесь на сайте и завершите процесс заказа. Мы позаботимся о доставке оборудования к вам.");
        
        const mainButton = new Main(main.root, 'input', ['main__button'],  { type: "button", value: "Каталог" }, null);
        const mainImg = new Main(main.root, 'img', ['main__img'],  { src: "./assets/main__img.png", alt: "logo"}, null);
        

        const footer = new Footer(wrap.root, 'footer', ['footer'], null, null);
        const footerWrapper = new Footer(footer.root, 'div', ['footer__wrapp'], null, null);

        const footerContacts = new Footer(footerWrapper.root, 'ul', ['footer__list'], null, FooterMenu);

        const footerInfo = new Footer(footerWrapper.root, 'ul', ['footer__list'], null, null);

        const footerInfoList = new Footer(footerInfo.root, 'li', ['footer__list'], null, null);
        const footerInfoListTitle = new Footer(footerInfoList.root, 'p', ['footer__titile'], null, "Информация");
        const footerInfoList1 = new Footer(footerInfo.root, 'li', ['footer__list'], null, null);
        const footerInfoListCatlog = new Footer(footerInfoList1.root, 'p', ['footer__par'], null, "Каталог");
        const footerInfoList2 = new Footer(footerInfo.root, 'li', ['footer__list'], null, null);
        const footerInfoListAvtorisation = new Footer(footerInfoList2.root, 'p', ['footer__par'], null, "Авторизация");
        const footerInfoList3 = new Footer(footerInfo.root, 'li', ['footer__list'], null, null);
        const footerInfoListBasket = new Footer(footerInfoList3.root, 'p', ['footer__par'], null, "Корзина");
        const footerInfoList4 = new Footer(footerInfo.root, 'li', ['footer__list'], null, null);
        const footerInfoListMainRoom = new Footer(footerInfoList4.root, 'p', ['footer__par'], null, "Личный кабинет");

        const footerAutor = new Footer(footerWrapper.root, 'ul', ['footer__list'], null, FooterAutor);
        
        // const footerContacts = new Footer(footerWrapper.root, 'div', ['footer__wrapp'], null, FooterMenu);
        

        // const menu = new Component(header.root, 'menu', [], null, headerMenu)

        

        // const item = new Footer(footer.root, 'div', [], null, '<b>footer 2</b>')


    }
}

declare global {
    interface Window {
        app: App
    }
}

window.app = new App(document.body)