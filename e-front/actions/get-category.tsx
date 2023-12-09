import { Category} from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async(id: string): Promise<Category> => {
    const response = await fetch(`${URL}/${id}`);
    const data = await response.json();
    console.log('Category:', data)
    return data;
}

export default getCategory;