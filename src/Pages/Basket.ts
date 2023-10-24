import { Component } from "../Abstract/Component";
import { TGood, TServises } from "../Abstract/Types";
import { Card } from "../Common/Card";
import { ServerOrder } from "../Services/DBService";
import { Order } from "./Catalog";

export class Basket extends Component {
    allGoods: TGood[] = []
    orders: ServerOrder[] = []
    allCards: Component[] = []

    cards: Component

    constructor(
        public parent: HTMLElement,
        private services: TServises
    ) {
        super(parent, 'main', ['main__wrapper'], null, null)
        const mainTitle = new Component(this.root, 'h2', ['catalog__title', 'object__title'], null, "Корзина")

        const user = this.services.authService.user;

       Promise.all([
            services.dbService.getAllGoods(), 
            services.dbService.getOrdersByBuyer(user ? user.uid : '')
        ])
            .then(result => {
                const [ goods, orders ] = result
                this.allGoods = goods
                this.orders = orders
                console.log({goods});
                

                const filtered = goods.filter(good => this.orders.find(order => (order.product === good.id) && !order.isOrdered))

                this.renderGoodsonPage(filtered)
            })

        this.cards = new Component(this.root, "div", ["cards"])

    

    }

    putGoodsOnPage(tag: Component, goods?: TGood[]) {
        const items = goods || this.allGoods
        items.forEach((product) => {
            const order = this.orders.find(order => (order.product === product.id) && !order.isOrdered)
            console.log(order);
            

            const card: any = new Card(tag.root, this.services, product, true, order ? order.id : '')
            this.allCards.push(card)
        })
    }

    renderGoodsonPage(goods?: TGood[]) {
        this.allCards.forEach(card  => card.myRemove())
        this.putGoodsOnPage(this.cards, goods)
    }
}
