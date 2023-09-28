import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async() => {
    const billboard = await getBillboard("a8133574-ecce-4b45-ba76-c5da4d8fdd64");
    return ( 
        <div>
       <Container>
        <div className="space-y-10 pb-10">
            <Billboard data={billboard}></Billboard>
        </div>
       </Container>
       </div>
     );
}
 
export default HomePage;