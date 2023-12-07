"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendEmail(formData: FormData): Promise<{ data?: any; error?: string }> {
    const senderEmail = formData.get("senderEmail");
    const message = formData.get("message");
    const senderName = formData.get("senderName");
    const senderLName = formData.get("senderLName");
    const subject = formData.get("subject");

    // simple server-side validation
    if (!validateString(senderEmail, 500)) {
        return {
            error: "Invalid sender email",
        };
    }
    if (!validateString(message, 5000)) {
        return {
            error: "Invalid message",
        };
    }
    try {
        const response = await resend.emails.send({
            from: "New Message OxxyKnits <onboarding@resend.dev>",
            to: ["yuliia.shmidt@gmail.com"],
            subject: "Message from contact form",
            reply_to: senderEmail as string,
            react: React.createElement(ContactFormEmail, {
                message: message as string,
                senderEmail: senderEmail as string,
                senderName: senderName as string,
                senderLName: senderLName as string,
                subject: subject as string,
            }),
        });

      
        return { data: response };
    } catch (error:any) {
        const errorMessage = error.message || 'An unexpected error occurred';
    console.error('Error sending email:', errorMessage);
    
    // Return only serializable error information.
    return { error: errorMessage };
    }
}

// export const sendEmail = async (formData: FormData) => {
//     const senderEmail = formData.get("senderEmail");
//     const message = formData.get("message");

//     // simple server-side validation
//     if (!validateString(senderEmail, 500)) {
//         return {
//             error: "Invalid sender email",
//         };
//     }
//     if (!validateString(message, 5000)) {
//         return {
//             error: "Invalid message",
//         };
//     }

//     // let data;
//     // try {
//     //     data = await resend.emails.send({
//     //         from: "Contact Form <onboarding@resend.dssev>",
//     //         to: ["yuliia.shmidt@gmail.com"],
//     //         subject: "Message from contact form",
//     //         reply_to: senderEmail as string,
//     //         react: React.createElement(ContactFormEmail, {
//     //             message: message as string,
//     //             senderEmail: senderEmail as string,
//     //         }),
//     //     });
//     //     console.log("Email sent", data)
//     //     return {data}
//     // } catch (error) {
//     //     console.log("Error sending email", error);
//     //     const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
//     //     return {
//     //         error: errorMessage,
//     //     };
//     // }


// };