export class App {
    root: HTMLElement;

    constructor(
        public parent: HTMLElement | null,
        tagName: keyof HTMLElementTagNameMap,
        arrStyle: string[] | null,
        attributes?: { [key: string]: string } | null,
        content?: string | null
    ) {
        this.root = document.createElement(tagName);

        if(arrStyle){
            arrStyle.forEach((style) => {
                this.root.classList.add(style);
            })
        }

        if (attributes) {
            for (const key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    this.root.setAttribute(key, attributes[key]);
                }
            }
        }

        if (content) {
            this.root.innerHTML = content;
        }

        this.parent = parent;
        this.render();
    }

    render() {
        if (this.parent) {
            this.parent.appendChild(this.root);
        }
    }

}