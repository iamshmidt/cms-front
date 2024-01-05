import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { TbHorseToy } from "react-icons/tb";
import { FaCottonBureau } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { TbTruckReturn } from "react-icons/tb";
import { TbWash } from "react-icons/tb";

export const faq = [
    {
      title: "Where are you located?",
      description:
        "I am based in NY.",
        icon: React.createElement(CiLocationOn),
    },
    {
      title: "Do you knit all toys yourself?",
      description:
        "Yes! I personally handle every step of the process in creating the toys. From the initial design to the finished product, each toy passes through my hands. I meticulously sew, stuff them with fiber, embroider details, pack them, and ship them out. This hands-on approach ensures that each toy receives the care and attention to detail. It is my goal to provide high-quality toys for children to enjoy. By personally overseeing every aspect of the crafting process, I am able to create unique and valuable individual pieces of work.",
    icon:React.createElement(TbHorseToy),
    },
    {
      title: "What materials do you use for your soft toys?",
      description:
        "I primarily use Minky fabric for my soft toys. Minky fabric is a type of microfiber fabric that is highly regarded for its incredibly soft and plush texture. It is made from 100% polyester fibers, which not only adds to its luxurious feel but also ensures durability and longevity. Minky fabric is a popular choice for creating cuddly and huggable toys that are gentle to the touch and provide a comforting experience for children.",
        icon: React.createElement(FaCottonBureau),
    },
    {
      title: "How long does it take to make a toy?",
      description:
        "The time it takes to create a toy can vary depending on various factors such as the complexity of the design, size, and level of detail. For instance, a baby toy typically takes around 3 hours to sew, while a mom toy may take approximately 4 hours. Additionally, I spend approximately 1 hour making a handmade cotton bag to accompany the toy.",
        icon: React.createElement(IoIosTimer),
    },
    {
      title: "Shipping",
      description:
        "Once your payment has been received, your hand-made toy will be carefully packaged and shipped within 3-5 business days.",
        icon: React.createElement(CiLocationOn),
    },
    {
      title: "Returns",
      description:
        `I highly value our customers and strive to ensure your complete satisfaction with your purchase from Toys by Polina. If, for any reason, you are not 100% satisfied with your order, please contact us promptly at toysbypolina@gmail.com.

        I accept returns and exchanges within the first 30 days of purchase, with the exception of sale or custom items. To be eligible for a return or exchange, the items must be returned in their original packaging and in the same condition as when they arrived. Once the returned items have been received and inspected, I will issue a refund or exchange within 5 days.
        
        Please note that shipping costs for returns or exchanges are the responsibility of the customer. I strongly recommend using a trackable mail service when returning items to me, as I cannot be held liable for merchandise damaged or lost during return shipment.
        
        Please be aware that digital patterns are non-refundable and cannot be returned or exchanged.
        
        Toys by Polina reserves the right to refuse returns or exchanges of any merchandise that does not meet the above return conditions.`,
        icon: React.createElement(TbTruckReturn),
    },
    {
        title: "Caring for handmade toy ",
        description:
          `To ensure the longevity and beauty of your handmade toy, I recommend avoiding the use of a washing machine, as it is a delicate handmade item. Instead, I suggest hand washing the toy using gentle methods.

          For general cleaning, I recommend spot cleaning the toy by gently dabbing the fabric with a mild detergent or soap. You can use a soft cloth or sponge to carefully remove any dirt or stains from the surface of the toy.
          
          After cleaning, it is important to allow the toy to air dry completely before giving it to your little one.`,
          icon: React.createElement(TbWash),
      },
  ] as const;