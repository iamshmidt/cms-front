"use client";
// import { sendEmail } from "@/action/sendEmail";
// import { useSectionInView } from "@/lib/hooks";
// import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { sendEmail } from "@/actions/send-email";


const Contact = () => {
    // const { ref } = useSectionInView("Contact");
    const [pending, setPending] = useState(false); // Step 2: Create pending state

    // Step 4: Form submission handler
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPending(true); // Start loading state

        const form = event.currentTarget;
        const formData = new FormData(form);
        console.log(formData);
        try {
            const { data, error } = await sendEmail(formData);
            console.log(data, error);
            if (data?.name) {
                toast.error("An unexpected error occurred");
            } else {
                toast.success("Email sent successfully");
                form.reset()
            }
        } catch (error: any) {
            // Handle the error based on its structure
            toast.error("An unexpected error occurred");
        } finally {
            setPending(false); // End loading state
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">I would love to hear from you! If you have any questions, inquiries, or feedback, please don't hesitate to reach out to me.</p>
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="flex  gap-3 ">
                        <div>
                            <label htmlFor="senderName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                            <input type="text" id="senderName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="" name="senderName"

                                required
                                maxLength={500} />

                        </div>
                        <div>
                            <label htmlFor="senderLName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Name</label>
                            <input type="text" id="senderLName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="" name="senderLName"
                                required
                                maxLength={500} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your email" name="senderEmail"

                            required
                            maxLength={500} />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                        <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you"  name="subject" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                        <textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" name="message"
                            placeholder="Your message"
                            required></textarea>
                    </div>
                    {/* ... other input fields ... */}
                    {/* <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button> */}

                    <button type="submit"
                            className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem]  mt-10 outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65  border  bg-slate-800 p-4 duration-200 hover:border-[#06b6d470] hover:shadow-xl hover:shadow-[#06b6d4]/20 rounded-lg  text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium"
                        >
                            {pending ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                            ) : (<> Send     <FaPaperPlane className=" text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}</>)}

                        </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;