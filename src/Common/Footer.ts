import { Component } from "../Abstract/Component";
import "../style.scss"

export const FooterMenu = `
    <li class="footer__item"><h2 class="footer__titile">Контакты</h2></li>
    <li class="footer__item"><p class="footer__par">Тел: +375 29 9824917</p></li>
    <li class="footer__item"><p class="footer__par">e-mail: equipment@mail.ru</p></li>
    <li class="footer__item footer__item-social"><img class="footer__img" src="../assets/inst.png"><img class="footer__img" src="../assets/tg.png"></li>
`
export const FooterAutor = `
    <li class="footer__item"><h2 class="footer__titile">Автор</h2></li>
    <li class="footer__item"><p class="footer__par">Кондратюк Юрий Сергеевич</p></li>
    <li class="footer__item"><p class="footer__par">группа ЭМ-3</p></li>
    <li class="footer__item"><p class="footer__par">4 курс</p></li>
    <li class="footer__item"><p class="footer__par">e-mail: em000314@g.bstu.by</p></li>
`

export class Footer extends Component {
    constructor(
        public parent: HTMLElement
    ) {
        super(parent, 'footer', ['footer'], null, null)
        const footerWrapper = new Component(this.root, 'div', ['footer__wrapp'], null, null);

        const footerContacts = new Component(footerWrapper.root, 'ul', ['footer__list'], null, FooterMenu);

        const footerInfo = new Component(footerWrapper.root, 'ul', ['footer__list'], null, null);

        const footerInfoList = new Component(footerInfo.root, 'li', ['footer__list'], null, null);
        const footerInfoListTitle = new Component(footerInfoList.root, 'p', ['footer__titile'], null, "Информация");
        const footerInfoList1 = new Component(footerInfo.root, 'li', ['footer__list'], null, null);
        const footerInfoListCatlog = new Component(footerInfoList1.root, 'p', ['footer__par'], null, "Каталог");
        const footerInfoList2 = new Component(footerInfo.root, 'li', ['footer__list'], null, null);
        const footerInfoListAvtorisation = new Component(footerInfoList2.root, 'p', ['footer__par'], null, "Авторизация");
        const footerInfoList3 = new Component(footerInfo.root, 'li', ['footer__list'], null, null);
        const footerInfoListBasket = new Component(footerInfoList3.root, 'p', ['footer__par'], null, "Корзина");
        const footerInfoList4 = new Component(footerInfo.root, 'li', ['footer__list'], null, null);
        const footerInfoListMainRoom = new Component(footerInfoList4.root, 'p', ['footer__par'], null, "Личный кабинет");

        const footerAutor = new Component(footerWrapper.root, 'ul', ['footer__list'], null, FooterAutor);
    }

}
