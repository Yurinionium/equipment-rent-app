import { AuthService } from "../Services/AuthService";
import { LogicService } from "../Services/LogicService";
import { DBService } from "../Services/DBService";
import { Timestamp } from "firebase/firestore";

export type TServises = {
    authService: AuthService,
    logicService: LogicService,
    dbService: DBService
}

export type TGood = {
    category: string;
    id: string;
    model: string;
    name: string;
    price: number;
    url: string;
    date: Date;
};

export type TGoodBasket = {
    count: number;
    good: TGood;
};

export type TDataUser = {
    name: string;
    fotoUrl: string;
    email: string;
    basket: TGoodBasket[];
};

export type TDataBasket = {
    summa: number;
};

export type dataHistory = {
    basket: TGoodBasket[];
    dataBasket: TDataBasket;
    data: Timestamp;
};

export type TDataHistoryWithId = {
    basket: TGoodBasket[];
    dataBasket: TDataBasket;
    data: Timestamp;
    id: string;
};

export type TDataGraph = {
    x: Date;
    y: number;
};