import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product.type';

interface InventoryState {
    products: Product[];
    totalProducts: number;
    totalValue: number;
    outOfStock: number;
    categories: number;
}

const initialState: InventoryState = {
    products: [],
    totalProducts: 0,
    totalValue: 0,
    outOfStock: 0,
    categories: 0,
};

// Utility function to parse the price from various formats to number
const parsePrice = (price: any): number => {
    if (typeof price === 'string') {
        const parsed = parseFloat(price?.replace('$', ''));
        return isNaN(parsed) ? 0 : parsed;
    }
    return typeof price === 'number' ? price : 0;
};

// Utility function to calculate total products, total value, out of stock items, and unique categories
const calculateTotals = (products: Product[]) => {
    const totalProducts = products.length;
    const totalValue = products.reduce((total, product) => total + (parsePrice(product.price) * product.quantity), 0);
    const outOfStock = products.filter(product => product.quantity === 0).length;
    const categories = new Set(products.map(product => product.category)).size;

    return { totalProducts, totalValue, outOfStock, categories };
};

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        // Action to set the entire inventory state
        setInventory(state, action: PayloadAction<Product[]>) {
            state.products = action.payload.map(product => ({
                ...product,
                price: parsePrice(product.price),
                quantity: Number(product.quantity),
                disabled: product.disabled ?? false, // Ensure disabled property defaults to false
            }));

            // Calculate and set total counts and values
            const totals = calculateTotals(state.products);
            state.totalProducts = totals?.totalProducts;
            state.totalValue = totals?.totalValue;
            state.outOfStock = totals?.outOfStock;
            state.categories = totals?.categories;
        },

        // Action to toggle the disabled state of a product
        disableProduct(state, action: PayloadAction<number>) {
            const index = action.payload;
            if (state.products[index]) {
                state.products[index].disabled = !state.products[index].disabled;
            }

            // Recalculate totals after updating product state
            const totals = calculateTotals(state.products);
            state.totalProducts = totals?.totalProducts;
            state.totalValue = totals?.totalValue;
            state.outOfStock = totals?.outOfStock;
            state.categories = totals?.categories;
        },

        // Action to delete a product from the inventory
        deleteProduct(state, action: PayloadAction<number>) {
            state.products.splice(action.payload, 1);

            // Recalculate totals after deleting a product
            const totals = calculateTotals(state.products);
            state.totalProducts = totals?.totalProducts;
            state.totalValue = totals?.totalValue;
            state.outOfStock = totals?.outOfStock;
            state.categories = totals?.categories;
        },

        // Action to update a product in the inventory
        updateProduct(state, action: PayloadAction<{ index: number, updatedProduct: Product }>) {
            const { index, updatedProduct } = action.payload;
            state.products[index] = {
                ...updatedProduct,
                price: parsePrice(updatedProduct.price),
                quantity: Number(updatedProduct.quantity),
            };

            // Recalculate totals after updating a product
            const totals = calculateTotals(state.products);
            state.totalProducts = totals?.totalProducts;
            state.totalValue = totals?.totalValue;
            state.outOfStock = totals?.outOfStock;
            state.categories = totals?.categories;
        },
    },
});

export const { setInventory, disableProduct, deleteProduct, updateProduct } = inventorySlice.actions;

export default inventorySlice.reducer;
