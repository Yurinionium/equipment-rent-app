import { Component } from "../Abstract/Component";
import { TGood, TServises, TGoodBasket } from "../Abstract/Types";

export class CardBasket extends Component {
    btnDel: Component;
    spanCount: Component;
    spanSumma: Component;

    constructor(parrent: HTMLElement, private services: TServises, private data: TGoodBasket) {
        super(parrent, "div", ["cardBasket"]);

        new Component(this.root, "img", ["cardBasket__img"], { src: `${data.good.url}`, alt: `${data.good.url}` },)
        const description = new Component(this.root, "div", ["cardBasket-descr__coontainer"])
        new Component(description.root, "h3", ["cardBasket__title"], null, data.good.name);
        new Component(description.root, "h3", ["cardBasket__title"], null, data.good.model);
        new Component(description.root, "span", ["cardBasket__price"], null, `Цена: ${data.good.price} BYN/ЧАС`);


        const divCount = new Component(this.root, "div", ["cardBasket__count"]);
        const btnDec = new Component(divCount.root, "input", ["count__button"], { type: "button", value: "-" });

        const divNumber = new Component(divCount.root, "div", ["div__count"]);
        this.spanCount = new Component(divNumber.root, "span", ["count__number", "cardBasket__title"], null, `${data.count}`);

        const btnInk = new Component(divCount.root, "input", ["count__button"], { type: "button", value: "+" });

        btnDec.root.onclick = () => {
            this.changeCountGood(-1);
        };

        btnInk.root.onclick = () => {
            this.changeCountGood(1);
        };

        this.spanSumma = new Component(this.root, "span", ["basket__summa", "cardBasket__title"], null, `${services.dbService.caclCostGood(data.count, data.good.price)} руб`);

        this.btnDel = new Component(this.root, 'button', ['cardBasket__button'], null, "Удалить заказ")

        this.btnDel.root.onclick = () => {
            (this.btnDel.root as HTMLInputElement).disabled = true;
            this.delGoodFromBasket();
        };

    }

    changeCountGood(grad: number) {
        const newCount = this.data.count + grad;
        if (newCount <= 0) return;

        const newData = {} as TGoodBasket;
        Object.assign(newData, this.data);
        newData.count = newCount;

        const user = this.services.authService.user;

        this.services.dbService.changeGoodInBasket(user, newData).then(() => {
            Object.assign(this.data, newData);
            this.spanCount.root.innerHTML = `${this.data.count}`;
            this.spanSumma.root.innerHTML = `${this.services.dbService.caclCostGood(
                this.data.count,
                this.data.good.price
            )} руб`;
        });
    }

    delGoodFromBasket() {
        const user = this.services.authService.user;
        this.services.dbService
            .delGoodFromBasket(user, this.data)
            .then(() => {
                this.myRemove();
            })
            .catch(() => {
                (this.btnDel.root as HTMLInputElement).disabled = false;
            });
    }
}