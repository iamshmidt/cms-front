import getBillboard from "@/actions/get-billboard";
import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/products-list";
import Billboard from "@/components/ui/billboard";
import CategoryCard from "@/components/ui/category";
// import Category from "@/components/ui/category";
import Container from "@/components/ui/container";


export const revalidate = 0;
const billboard_id = process.env.OXXYKNITS;
const HomePage = async() => {

    const billboard = await getBillboard(billboard_id);
    const products = await getProducts({isFeatured: "true"});
    const categories = await getCategories();
    const billboardData = billboard;
    return ( 
        <div>
       <Container>
        <div className="space-y-10 pb-10">
        <Billboard 
          data={billboardData}
        />
        <CategoryCard items={products}></CategoryCard>
        {/* <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 relative"> */}
            
            {/* <ProductList title="Featured Products" items={products}></ProductList> */}
        {/* </div> */}
        </div>
       </Container>
       </div>
     );
}
 
export default HomePage;