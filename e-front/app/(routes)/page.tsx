import getBillboard from "@/actions/get-billboard";
import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/products-list";
import Billboard from "@/components/ui/billboard";
import Canvas from "@/components/ui/canvas";
import CanvasIntro from "@/components/ui/canvas-intro";
import CategoryCard from "@/components/ui/category";
// import Category from "@/components/ui/category";
import Container from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faq } from "@/lib/data";
import { Suspense } from "react";
import Loading from "../loading";
import TextContainer from "@/components/text-container";
// import styled from 'styled-components'


export const revalidate = 0;
const billboard_id = process.env.OXXYKNITS;
const HomePage = async () => {
  // useLayoutEffect(() => {
  //   const gradient = new Gradient()
  //   gradient.initGradient('#gradient-canvas')
  // }, [])

  const billboard = await getBillboard(billboard_id);
  const products = await getProducts({ isFeatured: "true" });
  const categories = await getCategories();

  const billboardData = billboard;
  return (
    
    <div> 
       <Canvas></Canvas>
      {/* <Container> */}

        {/* <Billboard 
          data={billboardData}
        /> */}
        {/* <canvas id="gradient-canvas" data-transition-in /> */}

        <CategoryCard items={categories}></CategoryCard>
  

        <TextContainer></TextContainer>
        <div className="space-y-10 pb-10">
          {/* <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 relative"> */}

          <ProductList title="Featured Products" items={products}></ProductList>
          {/* </div> */}
        </div>
        <Container> <Accordion type="single" collapsible className="w-full">
        {faq.map((link, id) => (
          <AccordionItem key={id} value={`item-${id}`}>
            <AccordionTrigger><div className="flex gap-1 font-noto"> <span className="flex items-center pr-1 text-[20px]  lg:text-[30px]">{link.icon}</span>{link.title}</div></AccordionTrigger>
            <AccordionContent>{link.description}</AccordionContent>
          </AccordionItem>
        
        ))}
  
    </Accordion>
       </Container>
       </div>
     );
}

export default HomePage;

// const Main = styled.main`
//   position: relative;
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   height: 100%;
//   @media only screen and (max-width: 1200px) {
//     flex-direction: column;
//   }
// `

// const CanvasContainer = styled.div`
//   position: relative;
//   flex: 1 1 0;
//   min-width: 0;
//   min-height: 0;
//   padding-right: 4em;

//   @media only screen and (max-width: 1200px) {
//     padding-right: 0;
//     order: -1;
//   }
// `