/**
 * CSRF Protection Utility
 * 
 * This utility helps manage CSRF tokens for form submissions and API requests.
 * It works with the middleware.ts CSRF protection implementation.
 */

/**
 * Gets the CSRF token from cookies
 */
export function getCSRFToken(): string | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrf_token') {
      return value;
    }
  }
  return null;
}

/**
 * Adds a CSRF token to a fetch request's headers
 */
export function addCSRFToken(headers: HeadersInit = {}): HeadersInit {
  const token = getCSRFToken();
  if (token) {
    return {
      ...headers,
      'x-csrf-token': token,
    };
  }
  return headers;
}

/**
 * Creates a fetch wrapper that automatically adds CSRF tokens
 */
export function fetchWithCSRF(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = addCSRFToken(options.headers || {});
  return fetch(url, { ...options, headers });
}

/**
 * Adds CSRF token to all forms on the page
 */
export function setupCSRFForForms(): void {
  const token = getCSRFToken();
  if (!token) return;

  // Add to all forms
  document.querySelectorAll('form').forEach(form => {
    // Skip if already has a CSRF input
    if (form.querySelector('input[name="csrf_token"]')) return;
    
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'csrf_token';
    input.value = token;
    form.appendChild(input);
  });
}

/**
 * Initialize CSRF protection when the DOM is loaded
 */
export function initCSRF(): void {
  if (typeof window !== 'undefined') {
    // Setup on page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupCSRFForForms);
    } else {
      setupCSRFForForms();
    }

    // Setup when DOM changes (for dynamically added forms)
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          setupCSRFForForms();
          break;
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}