import { create } from "zustand"
import { Product } from "../types"
import { createJSONStorage, persist } from "zustand/middleware";
import toast from "react-hot-toast";
import getProducts from "@/actions/get-products";
// const fetchAndUpdatePrices = async () => {
//     try {
//       const updatedProducts = await getProducts({});
//       console.log(updatedProducts)
      
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };
//   fetchAndUpdatePrices()
const fetchAndUpdateProducts = async () => {
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
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};
  
interface CartStore {
    items: Product[];
    wishlist: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
    addToWishlist: (data: Product) => void;
    removeFromWishlist: (id: string) => void;
    isItemInWishlist: (data: Product) => boolean;
    updateAmount: (data: Product) => void;
    updatePrices: (updatedProducts: Product[]) => void;
}

const useCart = create(persist<CartStore>((set, get) => ({
    items: [],
    wishlist: [],
    updateAmount: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === data.id);
        if (existingItem) {
            if (existingItem.amount < data.quantity) {
                existingItem.amount++;
                set({ items: [...currentItems] });
            } else {
                existingItem.amount = data.quantity;
                set({ items: [...currentItems] });
            }

            // toast("Item quantity updated in cart");
        } else {
            data.amount = 1;  // Set initial quantity to 1 if item is new
            set({ items: [...currentItems, data] });
            // toast("Item added to cart");
        }
    },

    updatePrices: (updatedCartItems) => {
        set((state) => ({ ...state, items: updatedCartItems }));
    },

    addItem: (data: Product) => {
        const currentItems = [...get().items];
        const existingItemIndex = currentItems.findIndex(item => item.id === data.id);

        if (existingItemIndex !== -1) {
            const existingItem = currentItems[existingItemIndex];
            existingItem.amount = data.amount;
            //   currentItems.push(data);
            toast("Item quantity updated in cart");
        } else {
            //   data.amount = 1;  // Set initial quantity to 1 if item is new
            currentItems.push(data);
            toast("Item added to cart");
        }

        set({ items: currentItems });
    },


    addToWishlist: (data: Product) => {
        const currentWishlist = get().wishlist;
        const existingItemIndex = currentWishlist.findIndex(item => item.id === data.id);
        if (existingItemIndex !== -1) {
          // Item already exists in the wishlist, remove it
          const updatedWishlist = currentWishlist.filter((item, index) => index !== existingItemIndex);
          set({ wishlist: updatedWishlist });
          toast("Item removed from wishlist");
        } else {
          // Item doesn't exist in the wishlist, add it
          set({ wishlist: [...get().wishlist, data] });
          toast.success("Item added to wishlist");
        }
    },

    removeItem: (id: string) => {
        set({ items: [...get().items.filter(item => item.id !== id)] });
        toast.success("Item removed from the cart cart")
    },

    removeFromWishlist: (id: string) => {
        set({ wishlist: [...get().wishlist.filter(item => item.id !== id)] });
        toast.success("Item removed from the wishlist");
    },

    isItemInWishlist:(data: Product): boolean => {
        const currentWishlist = get().wishlist;
        return currentWishlist.some(wishlistItem => wishlistItem.id === data.id);
    },

    removeAll: () => set({ items: [] })



}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}))




export default useCart;