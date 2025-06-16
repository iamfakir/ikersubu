import Testimonials from '@/components/Testimonials/Testimonials';

export const metadata = {
  title: 'Testimonials | IKER SUBU - Professional Audio Engineer',
  description: 'See what artists and producers say about working with IKER SUBU. Professional mixing, mastering, and production services.',
  openGraph: {
    title: 'Client Testimonials | IKER SUBU',
    description: 'Read testimonials from artists and producers who have worked with IKER SUBU for professional mixing, mastering, and production services.',
  },
};

export default function TestimonialsPage() {
  return (
    <main>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0B0E17] to-[#1A1F35]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Client Testimonials
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what artists and producers say about working with me.
          </p>
        </div>
      </section>
      
      <Testimonials />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0B0E17] to-[#1A1F35]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the list of satisfied artists who have taken their music to the next level.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:opacity-90 transition-all text-lg"
            >
              Get in Touch
            </a>
            <a
              href="/portfolio"
              className="px-8 py-4 border border-gray-600 text-white rounded-full font-medium hover:bg-gray-800/50 transition-all text-lg"
            >
              View My Work
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
