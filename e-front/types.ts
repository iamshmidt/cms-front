export interface Product {
    id: string;
    category: Category;
    name: string;
    price: string;
    discount: number;
    priceAfterDiscount: string;
    quantity: number;
    isFeatured: boolean;
    size: Size;
    color: Color;
    images: Image[];
    amount: number;
    liked: boolean;
  };

  export interface ProductStorage {
    id:string;
    amount: number;
    quantity: number;
  }
  
  export interface Image {
    id: string;
    url: string;
  }
  
  export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
  };
  
  export interface Category {
    billboardId: string;
    name: string;
    billboard: Billboard;
  };
  
  export interface Size {
    id: string;
    name: string;
    value: string;
  };
  
  export interface Color {
    id: string;
    name: string;
    value: string;
  };

  export interface Result {
    id: string;
    // category: Category;
    name: string;
    price: string;
    quantity: number;
    isFeatured: boolean;
    // size: Size;
    // color: Color;
    images: Image[];
    // amount: number;
    // liked: boolean;
    
  }
