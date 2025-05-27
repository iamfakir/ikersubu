import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollEffect() {
  if (typeof window !== 'undefined') {
    const scrollContainer = document.querySelector('[data-animate="true"]');
    if (scrollContainer) {
      const items = gsap.utils.toArray('.scrollItem');

      // Only apply GSAP animations if native CSS scroll animations are not supported
      if (!CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
        // Remove the initial opacity setting and dimmer timeline
        // gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });

        // const dimmer = gsap
        //   .timeline()
        //   .to(items.slice(1), {
        //     opacity: 1,
        //     stagger: 0.5,
        //   })
        //   .to(
        //     items.slice(0, items.length - 1),
        //     {
        //       opacity: 0.2,
        //       stagger: 0.5,
        //     },
        //     0
        //   );

        // const dimmerScrub = ScrollTrigger.create({
        //   trigger: scrollContainer,
        //   endTrigger: scrollContainer,
        //   start: 'top top',
        //   end: 'bottom bottom',
        //   animation: dimmer,
        //   scrub: 0.2,
        // });

        // register scrollbar changer
        const scroller = gsap.timeline().fromTo(
          scrollContainer,
          {
            '--hue': 0,
          },
          {
            '--hue': 360,
            ease: 'none',
          }
        );

        const scrollerScrub = ScrollTrigger.create({
          trigger: scrollContainer,
          endTrigger: scrollContainer,
          start: 'top top',
          end: 'bottom bottom',
          animation: scroller,
          scrub: 0.2,
        });

        const chromaEntry = gsap.fromTo(
          scrollContainer,
          {
            '--chroma': 0,
          },
          {
            '--chroma': 0.3,
            ease: 'none',
            scrollTrigger: {
              scrub: 0.2,
              trigger: scrollContainer,
              start: 'top top+=40',
              end: 'top top',
            },
          }
        );
        const chromaExit = gsap.fromTo(
          scrollContainer,
          {
            '--chroma': 0.3,
          },
          {
            '--chroma': 0,
            ease: 'none',
            scrollTrigger: {
              scrub: 0.2,
              trigger: scrollContainer,
              start: 'bottom bottom',
              end: 'bottom bottom-=40',
            },
          }
        );

        // Update function to handle dynamic changes (if needed, similar to Codepen's update)
        // For now, we'll just ensure the initial state is set.
        // gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });
        gsap.set(scrollContainer, { 
          '--chroma': 0,
          '--lightness': '65%'
        });

      } else {
        // If native CSS scroll animations are supported, ensure GSAP doesn't interfere
        gsap.set(items, { opacity: 1 });
        gsap.set(scrollContainer, { 
          '--chroma': 0,
          '--lightness': '65%'
        });
      }
    }
  }
}
