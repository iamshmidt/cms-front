import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/products-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async() => {
    const billboard = await getBillboard("e3ef3e5f-b4f9-4f50-b3d7-7d34773cc9d4");
    const products = await getProducts({isFeatured: "true"});
    return ( 
        <div>
       <Container>
        <div className="space-y-10 pb-10">
        <Billboard 
          data={billboard}
        />
        
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={products}></ProductList>
        </div>
        </div>
       </Container>
       </div>
     );
}
 
export default HomePage;