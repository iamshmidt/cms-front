
import React from "react";


type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
    senderName: string;
    senderLName: string;
    subject: string;
};

export default function ContactFormEmail({
  message,
  senderEmail,
    senderName,
    senderLName,
    subject,
}: ContactFormEmailProps) {
  return (
    
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-2">Subject: {subject}</h2>
    <div className="mb-4">
      <p className="text-gray-700">Message: {message}</p>
    </div>
    <div className="text-gray-600">
      <p>From: {senderName} {senderLName}</p>
      <p>Email: {senderEmail}</p>
    </div>
  </div>
  );
}
const main = {
  backgroundColor: '#E2E8F0', color: '#000', fontFamily: 'Arial, sans-serif'};

const container = {
  maxWidth: '600px',
  margin: '40px auto',
  padding: '20px',
  backgroundColor: '#FFF',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px'
};

const h1 = {
  fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' 
};

const text = {
  color: '#aaaaaa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 40px',
};