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
    addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === data.id);

        if (existingItem) {
            return toast("Item already in cart")
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart")
    },

    addToWishlist: (data: Product) => {
        const currentWishlist = get().wishlist;
        const existingItem = currentWishlist.find(item => item.id === data.id);
  
        if (existingItem) {
          return toast("Item already in wishlist");
        }
  
        set({ wishlist: [...get().wishlist, data] });
        toast.success("Item added to wishlist");
      },

    removeItem:(id:string)=>{
        set({ items: [...get().items.filter(item => item.id !== id)] });
        toast.success("Item removed from the cart cart")
    },

    removeFromWishlist: (id: string) => {
        set({ wishlist: [...get().wishlist.filter(item => item.id !== id)] });
        toast.success("Item removed from the wishlist");
    },

    removeAll: () => set({ items: [] })



}), {
    name: "cart-storage",
    storage: createJSONStorage(()=> localStorage)
}))




export default useCart;