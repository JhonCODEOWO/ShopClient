import { UserLogged } from "../auth/interfaces/user-logged.interface";
import { Product } from "../products/interfaces/product.interface";

export interface SaleInterface {
    id:              number;
    lng:             string;
    lat:             string;
    city:            string;
    street:          string;
    internal_number: string;
    external_number: string;
    references:      string;
    products:        Product[];
    total_preview: number;
}
