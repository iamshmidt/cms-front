import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/products-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faq } from "@/lib/data";
export const revalidate = 0;
const billboard_id = process.env.OXXYKNITS;
const HomePage = async() => {

    const billboard = await getBillboard(billboard_id);
    const products = await getProducts({isFeatured: "true"});
    console.log(products)
    const billboardData = billboard;
    return ( 
        <div>
       <Container>
        <div className="space-y-10 pb-10">
        <Billboard 
          data={billboardData}
        />
        
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 relative">
            <ProductList title="Featured Products" items={products}></ProductList>
        </div>
        <Accordion type="single" collapsible className="w-full">
        {faq.map((link, id) => (
          <AccordionItem key={id} value={`item-${id}`}>
            <AccordionTrigger><div className="flex gap-1"> <span className="font-lg">{link.icon}</span>{link.title}</div></AccordionTrigger>
            <AccordionContent>{link.description}</AccordionContent>
          </AccordionItem>
        
        ))}
      {/* <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem> */}
    </Accordion>
        </div>
       </Container>
       </div>
     );
}
 
export default HomePage;