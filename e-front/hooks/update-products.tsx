import getProducts from "@/actions/get-products";
import useCart from "./use-cart";

export const fetchAndUpdateProducts = async () => {
    try {
        const updatedProducts = await getProducts({}); // Fetch the latest products
        // Get the current state from the store
        const currentState = useCart.getState();
        // Compare and update items
        const updatedItems = currentState.items.map(item => {
            const updatedProduct = updatedProducts.find(p => p.id === item.id);
            return updatedProduct ? { ...item, ...updatedProduct } : item;
        });
        // Update the store
        useCart.getState().updatePrices(updatedItems);
        console.log('Updated cart items:', updatedItems)
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};