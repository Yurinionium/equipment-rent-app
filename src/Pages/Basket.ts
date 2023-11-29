import { Component } from "../Abstract/Component";
import { TGoodBasket, TServises, TDataBasket } from "../Abstract/Types";
import { CardBasket } from "../Common/CardBasket";


export class Basket extends Component {
    divBasket: Component;
    spanSumma: Component;
    btnOpata: Component;
    // spanPercent: Component;
    // spanAllSumma: Component;
    divAllBasket: Component;
    divClearBasket: Component;

    constructor(parrent: HTMLElement, private services: TServises) {
        super(parrent, "div", ["basket_pages"]);
        services.dbService.calcDataBasket();

        let isBasketClear = false;
        if (services.dbService.dataUser) {
            if (services.dbService.dataUser.basket.length > 0) isBasketClear = true;
        }

        new Component(this.root, 'h2', ['catalog__title', 'object__title', 'filter'], null, "Корзина");
        this.divClearBasket = new Component(this.root, "div", ["basket__clear"]);
        new Component(this.divClearBasket.root, "p", ['basket__null'], null, "Ваша корзина пуста!");

        this.divAllBasket = new Component(this.root, "div", ["basket__all"]);

        this.divBasket = new Component(this.divAllBasket.root, "div", ["cards", "cards__basket"])

        this.toggleBasket(isBasketClear);

        if (services.dbService.dataUser) {
            services.dbService.dataUser.basket.forEach((el) => {
                this.putGoodsInBasket(this.divBasket, el);
            });
        }

        const divDataBasket = new Component(this.divAllBasket.root, "div", ["basket__data"]);
        this.spanSumma = new Component(divDataBasket.root, "span", ["span"], null, `Общая сумма ${services.dbService.dataBasket.summa} руб.`);


        this.btnOpata = new Component(this.divAllBasket.root, "button", ['cardBasket__button', 'oplata'], null, "Заказать")

        this.btnOpata.root.onclick = () => {
            const user = services.authService.user;
            services.dbService.addBasketInHistory(user).then(() => {
            });
        };

        services.dbService.addListener("goodInBasket", (good) => {
            this.putGoodsInBasket(this.divBasket, good as TGoodBasket);
            this.toggleBasket(true);
        });

        services.dbService.addListener("changeDataBasket", (dataBasket) => {
            this.spanSumma.root.innerHTML = `${(dataBasket as TDataBasket).summa}`;
            isBasketClear = false;
            if (services.dbService.dataUser) {
                if (services.dbService.dataUser.basket.length > 0) isBasketClear = true;
            }
            this.toggleBasket(isBasketClear);
        });

        services.dbService.addListener("clearBasket", () => {
            this.divBasket.root.innerHTML = "";
            this.toggleBasket(false);
        });
    }

    putGoodsInBasket(tag: Component, product: TGoodBasket) {
        new CardBasket(tag.root, this.services, product);
    }

    toggleBasket(isBasketClear: boolean) {
        if (isBasketClear) {
            this.divClearBasket.myRemove();
            this.divAllBasket.render();
        } else {
            this.divAllBasket.myRemove();
            this.divClearBasket.render();
        }
    }
}
