# Carousel Component

A responsive, touch-enabled carousel component for Next.js applications.

## Features

- Responsive design that works on all screen sizes
- Touch support for mobile devices
- Keyboard navigation (left/right arrows)
- Auto-play with pause on hover
- Smooth animations and transitions
- Accessible with ARIA attributes
- TypeScript support

## Installation

1. Copy the `carousel` directory to your `components` folder
2. Import the Carousel component in your page:

```tsx
import dynamic from 'next/dynamic';

const Carousel = dynamic(() => import('@/components/carousel/Carousel'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
```

## Usage

```tsx
<Carousel 
  slides={[
    {
      id: 1,
      image: '/path/to/image1.jpg',
      title: 'Project Title',
      description: 'Project description'
    },
    // Add more slides as needed
  ]}
  autoPlay={true}
  interval={5000} // 5 seconds
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| slides | `Array<{id: number, image: string, title: string, description: string}>` | `[]` | Array of slide objects |
| autoPlay | `boolean` | `true` | Enable/disable auto-play |
| interval | `number` | `5000` | Auto-play interval in milliseconds |

## Adding Portfolio Items

1. Add your portfolio images to the `public/images/works` directory
2. Update the `portfolioItems` array in `src/app/portfolio/page.tsx`:

```tsx
const portfolioItems = [
  {
    id: 1,
    image: '/images/works/your-image.jpg',
    title: 'Your Project Title',
    description: 'Your project description'
  },
  // Add more items as needed
];
```

## Customization

You can customize the carousel's appearance by modifying the styles in `styles.css`. The component uses CSS variables for easy theming.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 10+)
- Chrome for Android

## License

MIT
