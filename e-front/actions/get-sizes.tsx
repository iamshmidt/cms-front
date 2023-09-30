import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async(): Promise<Size[]> => {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

export default getSizes;