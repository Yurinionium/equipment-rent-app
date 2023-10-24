import { Component } from "../Abstract/Component";
import { TGood, TServises } from "../Abstract/Types";

export class Card extends Component {
    constructor(parrent: HTMLElement, services: TServises, data: TGood, basketMode: boolean = false, orderId?: string) {
        super(parrent, "div", ["card"]);

        new Component(this.root, "img", ["card__img"], { src: `${data.url}`, alt: `${data.url}`},  )
        new Component(this.root, "h3", ["card__title"], null, data.name);
        new Component(this.root, "h3", ["card__parag"], null, data.model);
        new Component(this.root, "span", ["card__price"], null, `${String(data.price)} BYN/ЧАС`);

        if (basketMode) {
            const cardButton = new Component(this.root, 'button', ['card__button', 'null'], null, "Удалить заказ")

            const remove = async () => {
                const result = await services.dbService.deleteOrder(orderId || '')

                if (result) {
                    alert('Success')
                    window.location.reload()
                }
                
            }
            cardButton.root.addEventListener('click', remove)
        } else {
            const cardButton = new Component(this.root, 'button', ['card__button', 'null'], null, "Купить")

        const order = async () => {
            const user = services.authService.user;

            if (!user) {
                return services.authService.authWithGoogle();
            }

            const date = prompt('Укажите дату в формате dd.mm.yyyy') || '01.01.2001'

            if (date.trim()) {
                const result = await services.dbService.createOrder({
                    buyer: user.uid,
                    product: data.id,
                    date: date,
                    isOrdered: false
                })
    
                if (result) {
                    alert('Заказ записан')
                } else {
                    alert('Try again!')
                }
            }
            
            
            

        }
        cardButton.root.addEventListener('click', order)
        }
        // new Component(this.node, "span", [], data.company);

        
    }
}