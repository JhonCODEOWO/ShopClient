import { Product } from "../../products/interfaces/product.interface";

export interface InCart {
    product: Product,
    quantity: number,
}