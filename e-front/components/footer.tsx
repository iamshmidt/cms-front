import Link from "next/link";
import Container from "./ui/container";


const Footer = () => {
    return (
        <footer className="bg-white border-t">
            <Container>
            <div className="mx-auto py-10 flex justify-between items-center">
                <div className="">
                <p className="text-center text-xs text-black">
                    &copy; 2024 OxxyKnits, Inc. All rights reserved.
                </p>
                </div>
                <div className="flex row gap-2 ">

                    <div className="hover"><Link className="hover-3 text-s" href='/return' title="return-policy">Return Policy</Link></div>
                    <div className="hover"><Link  className="hover-3 text-s" href='/contact' title="return-policy">Contact</Link></div>
                </div>
              
            </div>
            </Container>
        </footer>
    );
}

export default Footer;