'use client';
import React from 'react';

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="bg-[#1A1F35] p-6 rounded-lg shadow-lg">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSdcrTUIlxrNMsLj5vxQGb07lv927oq0r4cvl883aAaSkT3pzA/viewform?embedded=true" 
            width={640}
            height={1877}
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            className="mx-auto"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
}