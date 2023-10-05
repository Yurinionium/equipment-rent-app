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
        public parent: HTMLElement,
        tagName: keyof HTMLElementTagNameMap,
        arrStyle?: string[] | null,
        attributes?: { [key: string]: string } | null,
        content?: string | null
    ) {
       super(parent, tagName, arrStyle, attributes, content)
    }

}
