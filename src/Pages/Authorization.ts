import { Component } from "../Abstract/Component";

export class Authorization extends Component {
    constructor(
        public parent: HTMLElement
    ) {
        super(parent, 'main', ['main__wrapper'], null, null)
        const mainTitle = new Component(this.root, 'h2', ['autorization__title', 'object__title'], null, "Авторизация");
        const mainParagraph1 = new Component(this.root, 'p', ['autorization__par', 'autorization__ots'], null, "Создав учетную запись на нашем сайте, вы получите ряд удобных преимуществ. В первую очередь, вы сможете значительно сократить время, затрачиваемое на оформление заказов. Мы предоставляем возможность сохранять товары, которые вас заинтересовали, в вашем личном кабинете. Это позволит вам легко возвращаться к ним позже, сравнивать их, делать заметки и принимать более обоснованные решения о покупке.");
        const mainParagraph2 = new Component(this.root, 'p', ['autorization__par'], null, "Кроме того, после регистрации вы сможете следить за статистикой ваших заказов и их выполнением. Вы будете в курсе статуса каждого заказа, его истории и деталей доставки. Это обеспечит вам дополнительный контроль над вашими покупками и позволит вам планировать свои покупки более эффективно.");
        const mainParagraph3 = new Component(this.root, 'p', ['autorization__par'], null, "Не упустите возможность сделать свой опыт покупок на нашем сайте более удобным и информативным. ");
        const mainParagraph4 = new Component(this.root, 'p', ['autorization__par'], null, "Создайте свою учетную запись сейчас и начните пользоваться всеми этими преимуществами!");
        const mainButton = new Component(this.root, 'button', ['autorization__button'], null, "Continue with Google");
        mainButton.root.addEventListener('click', () =>{
            window.location.hash = '#authorization';        
        })
    }
}
