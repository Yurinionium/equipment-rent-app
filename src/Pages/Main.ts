import { Component } from "../Abstract/Component";

export class Main extends Component {
    constructor(
        public parent: HTMLElement,
        tagName: keyof HTMLElementTagNameMap,
        arrStyle: string[] | null,
        attributes?: { [key: string]: string } | null,
        content?: string | null
    ) {
       super(parent, tagName, arrStyle, attributes, content)
    }

}
