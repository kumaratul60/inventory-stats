export interface Product {
    name: string;
    category: string;
    price: number | string;
    quantity: number;
    value: string;
    disabled?: boolean;
}