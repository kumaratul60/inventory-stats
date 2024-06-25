import { fetchInventory } from "../api/fetchInventory";
import { setInventory } from "./inventorySlice";

export const fetchInventoryData: any = () => async (dispatch: any) => {
    try {
        const inventory = await fetchInventory();
        dispatch(setInventory(inventory));
    } catch (error) {
        console.error('Error fetching inventory data:', error);
    }
};