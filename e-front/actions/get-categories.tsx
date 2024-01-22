import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async(): Promise<Category[]> => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log('data', data)
    return data;
}

export default getCategories;