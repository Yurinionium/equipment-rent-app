import { Component } from "../Abstract/Component";
import { TGood, TServises } from "../Abstract/Types";

export class Card extends Component {
    btnBasket: Component;
    imgBaslet: Component;

    constructor(parrent: HTMLElement, private services: TServises, private data: TGood) {
        super(parrent, "div", ["card"]);

        this.imgBaslet = new Component(this.root, "img", ["card__img"], { src: `${data.url}`, alt: `${data.url}` },)
        new Component(this.root, "h3", ["card__title"], null, data.name);
        new Component(this.root, "h3", ["card__parag"], null, data.model);
        new Component(this.root, "span", ["card__price"], null, `${data.price} BYN/ЧАС`);

        this.btnBasket = new Component(this.root, 'button', ['card__button', 'null'], null, "Купить")

        if (services.dbService.dataUser) {
            const index = services.dbService.dataUser.basket.findIndex(
                (el) => el.good.id === data.id
            );
            if (index >= 0) {
                (this.btnBasket.root as HTMLInputElement).disabled = true;
                this.imgBaslet.root.classList.add("color");
                this.btnBasket.root.classList.add("color");
                this.btnBasket.root.textContent = "Товар в корзине";
            }
        }

        this.btnBasket.root.onclick = () => {
            (this.btnBasket.root as HTMLInputElement).disabled = true;
            this.imgBaslet.root.classList.add("color");
            this.btnBasket.root.classList.add("color");
            this.btnBasket.root.textContent = "Товар в корзине"
            this.addGoodInBasket();
            
        };

        services.dbService.addListener("delGoodFromBasket", (idGood) => {
            if (idGood === data.id) {
                (this.btnBasket.root as HTMLInputElement).disabled = false;
                this.imgBaslet.root.classList.remove("color");
                this.btnBasket.root.classList.remove("color");
                this.btnBasket.root.textContent = "Купить"
            }
        });

        services.dbService.addListener("delGoodFromCatalog", (idGood) => {
            if (idGood === data.id) {
                this.myRemove();
            }
        });

    }
    addGoodInBasket() {
        const user = this.services.authService.user;
        this.services.dbService.addGoodInBasket(user, this.data).catch(() => {
            (this.btnBasket.root as HTMLInputElement).disabled = false;
            this.imgBaslet.root.classList.remove("color");
            this.btnBasket.root.classList.remove("color");
            this.btnBasket.root.textContent = "Купить"
        });
    }
}