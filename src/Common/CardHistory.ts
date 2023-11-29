import { Component } from "../Abstract/Component";
import { TServises, TGoodBasket, TDataHistoryWithId, dataHistory } from "../Abstract/Types";


export class CardHistory extends Component {
    constructor(parrent: HTMLElement, private services: TServises, private data: TDataHistoryWithId) {
        super(parrent, "div", ["card__history"]);

        const divOrder = new Component(this.root, "div", ["cart_history__order"]);
        new Component(divOrder.root, "span", ["card__number"], null,  `НОМЕР ЗАКАЗА: ${data.id}`);
        // new Component(divOrder.root, "span", [], null, data.id);
        new Component(divOrder.root, "span", ["card__number"], null,  `ДАТА ЗАКАЗА: ${data.data.toDate().toLocaleDateString("ru")}`);

        const divGoods = new Component(this.root, "div", ["cart_history__goods"]);
        data.basket.forEach((goodBasket) => {
            const divGood = new Component(divGoods.root, "div", ["cart_history__good"]);
            new Component(divGood.root, "img", ['history__img'], { src: `${goodBasket.good.url}`, alt: "logo" });
            const divDesc = new Component(divGood.root, "div", ["cart_history__desc"]);
            new Component(divDesc.root, "span", ['card_history-name'], null, `Наименование товара: ${goodBasket.good.name}`);
            new Component(divDesc.root, "span", ['card_history-name'], null, `Стоимость: ${services.dbService.caclCostGood(goodBasket.count, goodBasket.good.price)}`);
        });

        const divData = new Component(this.root, "div", ["cart_history__data"]);
        new Component(divData.root, "span", ['card_historySumma'], null, `Сумма: ${data.dataBasket.summa} руб`);
    }
}