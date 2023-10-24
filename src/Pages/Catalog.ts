import { Component } from "../Abstract/Component";
import { TServises, TGood } from "../Abstract/Types";
import { Card } from "../Common/Card";


export type Order = {
    buyer: string,
    product: string,
    date: string,
    isOrdered: boolean
}


export class Catalog extends Component {
    allGoods: TGood[] = []
    allCards: Component[] = []

    cards: Component
    sortType: 'asc' | 'desc' = 'asc'

    constructor(
        public parent: HTMLElement,
        private services: TServises
    ) {
        super(parent, 'main', ['main__wrapper'], null, null);
        const catWrapp = new Component(this.root, "div", ["catalog__wrapp"]);
        new Component(catWrapp.root, 'h2', ['catalog__title', 'object__title'], null, "Фильтры");
        // const div = new Component(this.root, "div", ["custom-select js-select"]);
        // const i = new Component(this.root, "i", ["custom-select__icon js-icon"]);
        const cat = new Component(this.root, "div", ["catalog__wrapp-container"]);
        const showAll = new Component(cat.root, 'button', ['card__button', 'null'], { 'data-type': 'showAll' }, "Показать все");
        const vibration = new Component(cat.root, 'button', ['card__button', 'null'], { 'data-type': 'vibrationmachine' }, "Вибротрамбовки");
        const vibrationmachine = new Component(cat.root, 'button', ['card__button', 'null'], { 'data-type': 'chainsaw' }, "Бензопилы");
        const puncher = new Component(cat.root, 'button', ['card__button', 'null'], { 'data-type': 'puncher' }, "Перфораторы ");
        const vibratingplate = new Component(cat.root, 'button', ['card__button', 'null'], { 'data-type': 'vibratingplate' }, "Виброплиты");
        const grassmachine = new Component(cat.root, 'button', ['card__button', 'null'], { 'data-type': 'grassmachine' }, "Газонокосилки");

        this.cards = new Component(this.root, "div", ["cards"]) 


        
        const useFilter = (event: Event) => {
            const { type } = (event.target as HTMLElement).dataset

            if (type === 'showAll') {
                return this.renderGoodsonPage()
            }
            
            const filtered = this.allGoods.filter(good => good.category === type)
            this.renderGoodsonPage(filtered)
        }

        showAll.root.addEventListener('click', useFilter)
        vibration.root.addEventListener('click', useFilter)
        vibrationmachine.root.addEventListener('click', useFilter)
        puncher.root.addEventListener('click', useFilter)
        vibratingplate.root.addEventListener('click', useFilter)
        grassmachine.root.addEventListener('click', useFilter)

        const sortButton = new Component(catWrapp.root, 'img', ['catalog__img'], { src: "./assets/sort.png", alt: "sort" }, null);
        sortButton.root.addEventListener('click', () => {
            this.sortType = this.sortType === 'asc' ? 'desc' : 'asc'
            this.sortGoods()
            this.renderGoodsonPage() 
        })

        services.dbService.getAllGoods().then((goods) => {
            this.allGoods = goods
            this.putGoodsOnPage(this.cards);
        });
    }

    sortGoods(): void {
        this.allGoods.sort((a: TGood, b: TGood) => {
            if (this.sortType === 'asc') {
                return a.price - b.price
            } else {
                return b.price - a.price
            }
        })
    }

    putGoodsOnPage(tag: Component, goods?: TGood[]) {
        const items = goods || this.allGoods
        items.forEach((product) => {
            const card = new Card(tag.root, this.services, product)
            this.allCards.push(card)
        })
    }

    renderGoodsonPage(goods?: TGood[]) {
        this.allCards.forEach(card  => card.myRemove())
        this.putGoodsOnPage(this.cards, goods)
    }
}
