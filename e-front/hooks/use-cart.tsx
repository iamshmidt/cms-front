import { create } from "zustand"
import { Product } from "../types"
import { createJSONStorage, persist } from "zustand/middleware";
import toast from "react-hot-toast";

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
}

// const useCart = create<CartStore>((set=>({
//     items: [],
//     addItem: (data) => set(state => ({items: [...state.items, data]})),
//     removeItem: (id) => set(state => ({items: state.items.filter(item => item.id !== id)})),
//     removeAll: () => set({items: []})
// })))

//     if(existingItem){
//         const updatedItems = currentItems.map(item => {
//             if(item.id === data.id){
//                 return {
//                     ...item,
//                     quantity: item.quantity + 1
//                 }
//             }
//             return item;
//         })
//         set({items: updatedItems})
// }

const useCart = create(persist<CartStore>((set, get) => ({
    items: [],
    wishlist: [],
    updateAmount: (data: Product) => {
        console.log('data!!!', data)
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === data.id);
        console.log('currentItems', data.amount)
        if (existingItem) {
            console.log('existingItem', existingItem)
            if (existingItem.amount < data.quantity) {
                existingItem.amount++;
                set({ items: [...currentItems] });
            } else {
                console.log('data.quantity', existingItem.amount)
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

    // addItem: (data: Product) => {
    //     const currentItems = get().items;
    //     const existingItem = currentItems.find(item => item.id === data.id);

    //     if (existingItem) {
    //         // data.amount++; // Increment the quantity if item already exists
    //         console.log('data.amount', data.amount)
    //         console.log('existingItem', existingItem.amount)
    //         data.amount += existingItem.amount;
    //         console.log('new daaa', data.amount)
    //         set({ items: [...currentItems] });
    //         toast("Item quantity updated in cart");
    //     } else {
    //         // data.amount = 1;  // Set initial quantity to 1 if item is new
    //         set({ items: [...currentItems, data] });
    //         toast("Item added to cart");
    //     }

    //     // set({ items: [...get().items, data] });
    //     // toast.success("Item added to cart")
    // },

    addToWishlist: (data: Product) => {
        const currentWishlist = get().wishlist;
        const existingItemIndex = currentWishlist.findIndex(item => item.id === data.id);
      console.log('liked', data.id)
      console.log('data', data)
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
        // const currentItems = get().items;
        // const updatedItems = currentItems.map(item =>
        //   item.id === id ? { ...item, amount: item.amount - 1 } : item
        // );
        // set({ items: updatedItems.filter(item => item.amount > 0) });
        // toast("Item removed from cart");
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