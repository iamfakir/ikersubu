# Image Optimization Guide

## Implemented Optimizations

### 1. Next.js Image Component

We've replaced standard HTML `<img>` tags with Next.js `<Image>` components across the site. This provides several benefits:

- Automatic WebP conversion (when supported by the browser)
- Responsive sizing with the `sizes` attribute
- Lazy loading by default
- Prevents Cumulative Layout Shift (CLS)
- Image optimization on-demand

Example implementation:

```jsx
// Before
<img src="/path/to/image.jpg" alt="Description" className="w-full h-auto" />

// After
<Image 
  src="/path/to/image.jpg" 
  alt="Description" 
  width={800} 
  height={600} 
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="w-full h-auto"
/>
```

### 2. WebP Conversion

We've converted JPG images to WebP format, which provides better compression with similar quality. The conversion process reduced file sizes by approximately 60-70%.

The optimized images are stored in `/public/assets/images/works/optimized/` directory.

### 3. Image Preloading

Critical images (those visible in the initial viewport) are now preloaded to improve loading performance. Preload directives have been added to the `layout.tsx` file.

## Scripts

We've created several scripts to help with image optimization:

1. **optimize-images.js**: Converts JPG images to WebP format with 80% quality
2. **update-image-paths.js**: Updates image references in the codebase to use optimized WebP images
3. **add-image-preload.js**: Adds preload directives for critical images

## Best Practices for Future Development

### Adding New Images

1. Use WebP format for all new images when possible
2. Optimize images before adding them to the project (use tools like [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/))
3. Use appropriate dimensions - don't use a 2000px wide image for a 300px container
4. Always use the Next.js `<Image>` component instead of HTML `<img>` tags

### Image Component Usage

1. Always specify `width` and `height` or use `fill` with a parent container that has position `relative`
2. Use the `sizes` attribute to help the browser determine which image size to download
3. Use `priority` prop only for images above the fold
4. For background images, use CSS with `next/image` in a container with `position: relative`

### Performance Monitoring

1. Regularly check Lighthouse scores for image-related metrics
2. Monitor Core Web Vitals, especially Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS)
3. Use the Network tab in browser DevTools to check image download sizes

## Configuration

The Next.js image optimization is configured in `next.config.js`:

```js
images: {
  domains: [
    'images.unsplash.com',
    'plus.unsplash.com',
    'source.unsplash.com',
  ],
  unoptimized: false,
  formats: ['image/webp'],
},
```

This configuration enables WebP format conversion and applies optimization to all images.