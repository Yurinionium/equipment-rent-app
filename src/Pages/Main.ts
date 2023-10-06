import { Component } from "../Abstract/Component";

export class Main extends Component {
    constructor(
        public parent: HTMLElement
    ) {
        super(parent, 'main', ['main__wrapper'], null, null)
        const mainTitle = new Component(this.root, 'h1', ['main__title'], null, "Equipment-Rent-App");
        const mainParagraph1 = new Component(this.root, 'p', ['main__paragraph'], null, "Добро пожаловать на нашу платформу для аренды оборудования. ");
        const mainParagraph2 = new Component(this.root, 'p', ['main__paragraph', 'main__paragraph-padding'], null, "Мы предлагаем широкий выбор оборудования и удобный способ организовать аренду. ");
        const mainParagraph3 = new Component(this.root, 'p', ['main__paragraph'], null, "Сделайте ваш следующий проект еще проще с нашим приложением.");
        const mainSubtitile = new Component(this.root, 'p', ['main__subtitle'], null, "Как мы работаем!");
        const mainCards = new Component(this.root, 'div', ['main__cards'], null, null);

        const mainCard1 = new Component(mainCards.root, 'div', ['main__card'], null, null);
        const mainCardTitle1 = new Component(mainCard1.root, 'h3', ['main__card-title'], null, "Выберите оборудование");
        const mainCardSubtitle1 = new Component(mainCard1.root, 'p', ['main__card-subtitle'], null, "Изучите наш каталог и выберите необходимое оборудование для вашего проекта.");

        const mainCard2 = new Component(mainCards.root, 'div', ['main__card'], null, null);
        const mainCardTitle2 = new Component(mainCard2.root, 'h3', ['main__card-title'], null, "Определите срок");
        const mainCardSubtitle2 = new Component(mainCard2.root, 'p', ['main__card-subtitle'], null, "Определите требуемый срок аренды и укажите дату и время, когда вам нужно будет использовать оборудование.");
        const mainCard3 = new Component(mainCards.root, 'div', ['main__card'], null, null);
        const mainCardTitle3 = new Component(mainCard3.root, 'h3', ['main__card-title'], null, "Авторизируйтесь на сайте");
        const mainCardSubtitle3 = new Component(mainCard3.root, 'p', ['main__card-subtitle'], null, "Авторизируйтесь на сайте и завершите процесс заказа. Мы позаботимся о доставке оборудования к вам.");

        const mainButton = new Component(this.root, 'input', ['main__button'], { type: "button", value: "Каталог" }, null);
        const mainImg = new Component(this.root, 'img', ['main__img'], { src: "./assets/main__img.png", alt: "logo" }, null);

        mainButton.root.addEventListener('click', () => {
            window.location.hash = '#catalog'; 
        })
    }
}
