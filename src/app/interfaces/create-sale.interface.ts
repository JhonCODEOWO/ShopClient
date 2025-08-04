export interface CreateSaleInterface {
    lng:             string;
    lat:             string;
    street:          string;
    city:            string;
    internal_number: string;
    external_number: string;
    references:      string;
    due_date:        string;
    products:        ProductInSale[];
}

export interface ProductInSale {
    product_id: number;
    quantity: number;
}
