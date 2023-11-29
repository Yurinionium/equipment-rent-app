import { Component } from "../Abstract/Component";
import { getAuth, signOut } from "firebase/auth";
import { TServises, TDataHistoryWithId} from "../Abstract/Types";

import { CardHistory } from "../Common/CardHistory";
import { Graph } from "../Common/Graph";

export class PersonalAccount extends Component {
    googgleLogOut: Component;
    divHistory: Component;
    constructor(
        public parent: HTMLElement,
        private services: TServises
    ) {
        super(parent, 'main', ['main__wrapper'], null, null)
        const container = new Component(this.root, 'div', ['container'], null);
        const mainTitle = new Component(container.root, 'h2', ['object__title'], null, "Личный кабинет");

        this.googgleLogOut = new Component(container.root, 'button', ['personal__button', 'null'], null, "Выйти");

        const personalContainer = new Component(this.root, 'div', ['personal__container'], null);
        const personalImg = new Component(personalContainer.root, 'img', ['personal__img'], { src: `${services.authService.user?.photoURL}`, alt: "logo" }, null);
        const personInforContainer = new Component(personalContainer.root, 'div', ['personalinform__container'], null);
        const nameContainer = new Component(personInforContainer.root, 'div', ['personaltext__container'], null);
        const nameTitle = new Component(nameContainer.root, 'span', ['personal__text'], null, "Name:");
        const nameTitleData = new Component(nameContainer.root, 'span', ['personal__text'], null, services.authService.user?.displayName);
        const emailContainer = new Component(personInforContainer.root, 'div', ['personaltext__container'], null);
        const nameTitleEmail = new Component(emailContainer.root, 'p', ['personal__text'], null, "Email:");
        const nameTitleDataEmail = new Component(emailContainer.root, 'p', ['personal__text'], null, services.authService.user?.email);
        const priceContainer = new Component(personInforContainer.root, 'div', ['personaltext__container'], null);


        const divGraph = new Component(this.root, "div", ["stat__graph"]);
        const graph = new Graph(divGraph.root);

        const divStat = new Component(this.root, "div", ["stat__data"]);
        const spanCount = new Component(divStat.root, "span", [], null, "0");
        const spanSumma = new Component(divStat.root, "span", [], null, "0");

        services.dbService.addListener("changeStat", (count, summa) => {
        spanCount.root.innerHTML = `${count}`;
        spanSumma.root.innerHTML = `${summa}`;
        });

        this.divHistory = new Component(this.root, "div", ["stat__history"]);

        const user = services.authService.user;
        services.dbService.calcCountDocsHistory(user);

        services.dbService.getAllHistory(user).then((historys) => {
            graph.graphik.data.datasets[0].data = services.dbService.updateDataGraph(historys);
            graph.graphik.update();
            this.putHistoryOnPage(this.divHistory, historys);
        });

        services.dbService.addListener("addInHistory", (history) => {
            const user = services.authService.user;
            services.dbService.getAllHistory(user).then((historys) => {
                graph.graphik.data.datasets[0].data = services.dbService.updateDataGraph(historys);
                graph.graphik.update();
            });

            this.putHistoryOnPage(this.divHistory, [history as TDataHistoryWithId]);
        });

        this.googgleLogOut.root.addEventListener('click', () => {
            this.services.authService.outFromGoogle();
        });
    }
    putHistoryOnPage(tag: Component, historys: TDataHistoryWithId[]) {
        historys.forEach((history) => {
            new CardHistory(tag.root, this.services, history);
        });
    }
}
