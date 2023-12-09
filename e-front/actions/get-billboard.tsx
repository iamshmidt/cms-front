import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async(id: string | undefined): Promise<Billboard> => {
    const response = await fetch(`${URL}/${id}`);
    const data = await response.json();
    return data;
}

export default getBillboard;