import {create} from "zustand"
import {Product} from "../types"

interface PreviewModalStore {
    isOpen: boolean;
    data?:Product;
    onOpen:(product: Product) => void;
    onClose:() => void;
}

const usePreviewModal = create<PreviewModalStore>((set=>({
    isOpen: false,
    data: undefined,
    onOpen: (product) => set({isOpen: true, data: product}),
    onClose: () => set({isOpen: false, data: undefined})
})))
 
export default usePreviewModal;