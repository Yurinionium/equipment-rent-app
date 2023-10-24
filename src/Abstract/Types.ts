import { AuthService } from "../Services/AuthService";
import { LogicService } from "../Services/LogicService";
import { DBService } from "../Services/DBService";

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
    type: string;
    url: string;
};