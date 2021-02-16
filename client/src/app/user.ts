import { Shirt } from "./shirt";

export class User {
    name:String;
    mail:String;
    isManager:Boolean;
    isGuest:Boolean;
    address:String;
    phone:String;
    shoppingCart:Shirt[];
    purchases:Shirt[];
}
