/**
 * Incremental Static Regeneration (ISR) Utilities
 * 
 * This utility helps implement ISR with stale-while-revalidate pattern
 * for Next.js App Router.
 */

import { cache } from 'react';

type RevalidateOptions = {
  revalidate?: number | false; // Revalidation time in seconds, false for static
  tags?: string[];            // Cache tags for on-demand revalidation
};

/**
 * Fetches data with ISR caching
 * 
 * This function wraps fetch with Next.js ISR capabilities.
 * It supports both time-based revalidation and on-demand revalidation via tags.
 * 
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @param revalidateOptions - Revalidation options
 * @returns The fetched data
 */
export const fetchWithISR = cache(async <T>(
  url: string,
  options: RequestInit = {},
  revalidateOptions: RevalidateOptions = {}
): Promise<T> => {
  const { revalidate = 3600, tags = [] } = revalidateOptions;
  
  const response = await fetch(url, {
    ...options,
    next: {
      revalidate,
      tags,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${response.status} ${response.statusText}`);
  }
  
  return response.json() as Promise<T>;
});

/**
 * Fetches data with stale-while-revalidate pattern
 * 
 * This function implements a stale-while-revalidate pattern for data fetching.
 * It returns stale data immediately while revalidating in the background.
 * 
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns The fetched data
 */
export const fetchWithSWR = cache(async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  return fetchWithISR<T>(url, options, {
    // Use a short revalidation time to ensure data is fresh
    revalidate: 60, // 1 minute
    // Add a tag for on-demand revalidation
    tags: ['swr'],
  });
});

/**
 * Generates static params for a dynamic route
 * 
 * This function helps generate static params for dynamic routes
 * with ISR capabilities.
 * 
 * @param fetchFn - Function that fetches the data for generating params
 * @param paramKey - The key to extract from each item for the param
 * @returns An array of params objects
 */
export async function generateStaticParamsWithISR<T>(
  fetchFn: () => Promise<T[]>,
  paramKey: keyof T
): Promise<Record<string, string>[]> {
  try {
    const items = await fetchFn();
    
    return items.map(item => ({
      [paramKey as string]: String(item[paramKey]),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}