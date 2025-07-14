export interface Product {
    id:             number;
    name:           string;
    slug:           string;
    description:    string;
    price:          number;
    stock:          number;
    image_url:      string;
    created_at:     Date;
    quantityInSale: null;
    subtotal:       null;
    images:         string[];
}
