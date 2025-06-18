'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useState } from 'react';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 pb-4">
      <button
        className="flex justify-between items-center w-full text-left text-2xl font-medium text-white hover:text-purple-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <svg
          className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-gray-300"
        >
          {answer}
        </motion.p>
      )}
    </div>
  );
}

export default function MicrolicensingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-gray-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center mb-8">
              <p className="text-xl text-gray-400 animate-pulse">waiting for spaceship to drop</p>
              {/* Placeholder for SVG animation */}
              <svg className="mx-auto w-16 h-16 text-purple-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              {/* Add your SVG animation code here */}
            </div>
            <h1 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">Microlicensing Information</h1>

          <section className="mb-12">
            <h2 className="text-4xl font-bold mb-8 text-purple-300">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <FAQItem
                question="What Are You Actually Buying?"
                answer="You are purchasing a synchronization license that allows you to “sync” your audio-visual image (insert the name of your awesome non commercial video here) to our music for the use specified in the license."
              />
              <FAQItem
                question="Do You Need A License If You Buy The Track On iTunes?"
                answer="Yes. If you plan on using the music you’ve purchased from iTunes in a video that fits the criteria above, you will be required to purchase a license."
              />
              <FAQItem
                question="Do You Need A License For Each New Project?"
                answer="Yes. Each song is licensed for one project (as described in the License). You can use multiple songs in the same project as long as each song has been licensed for that specific use."
              />
              <FAQItem
                question="You Own The Music You License With Us?"
                answer="No. You do not own the music. Purchasing a license only allows you to use the music for your project and purpose specified in the license agreement. That is different than ownership. We own all of the copyrights in and to the underlying composition and sound recording of every track. You may not market the music as your own even if you add other instruments or a vocal to the music. Your Audiomachine license does NOT allow you to upload your project to YouTube’s Content ID system. Uploading Audiomachine music to Content ID will cause mistaken copyright claims for other users and for your future projects, and constitutes a violation of our licensing terms."
              />
              <FAQItem
                question="How Do I Get The Music?"
                answer="Once purchased, you will receive an email receipt that includes a link to download both an uncompressed AIFF and an MP3 version of the requested track."
              />
              <FAQItem
                question="Can I Monetize My Video On Youtube?"
                answer="Yes. If you purchase our YouTube monetization license or social media bundle, simply email contact@ikersubu.com a copy of your receipt and the url to your video and we will remove the third party claim on the licensed track."
              />
              <FAQItem
                question="Can I Still Use Audiomachine On My Youtube Without Monetizing?"
                answer="Yes. Please note that a third party matched claim will automatically be placed by YouTube on your video and ads will run as a result. No further action is required on your part if you are ok with ads running before your video."
              />
              <FAQItem
                question="What Happens If Your Youtube Video Gets Flagged For “Matched Third Party Content”?"
                answer="If you receive an email about matched third party content and you have the necessary license (personal use license does not apply), please click the dispute button and put your license and invoice number in the field.We will review it within 1 business day and remove the claim, if a valid license was purchased. In order to maximize your revenue, you should make the video private until we have removed the claim so you don’t lose out on potential ad clicks."
              />
            </div>
          </section>
        </div>

        {/* Categories Section */}
        <section className="py-20 px-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
          <h2 className="text-4xl font-bold text-center mb-12 text-pink-400">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Background Music', 'Sound Effects', 'Jingles', 'Loops', 'Stems'].map((category) => (
              <button key={category} className="px-8 py-4 bg-purple-600 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg">
                {category}
              </button>
            ))} 
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-8 text-center bg-gray-900 bg-opacity-70">
          <h2 className="text-4xl font-bold mb-6 text-purple-400">Need Custom Audio?</h2>
          <p className="text-xl mb-10 text-gray-300">Contact us for bespoke microlicensing solutions.</p>
          <button className="px-10 py-5 bg-linear-to-r from-purple-600 to-pink-600 rounded-full text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-colors shadow-xl">
            Get a Quote
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
}