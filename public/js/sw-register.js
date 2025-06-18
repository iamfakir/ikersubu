/**
 * Service Worker Registration
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Function to check if the app is online
function isOnline() {
  return navigator.onLine;
}

// Function to notify users when they're offline
function notifyOfflineStatus() {
  if (!isOnline()) {
    // Create or show an offline notification
    const offlineNotification = document.getElementById('offline-notification') || createOfflineNotification();
    offlineNotification.style.display = 'block';
  } else {
    // Hide the offline notification if it exists
    const offlineNotification = document.getElementById('offline-notification');
    if (offlineNotification) {
      offlineNotification.style.display = 'none';
    }
  }
}

// Create the offline notification element
function createOfflineNotification() {
  const notification = document.createElement('div');
  notification.id = 'offline-notification';
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = '#f44336';
  notification.style.color = 'white';
  notification.style.padding = '12px 24px';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
  notification.style.zIndex = '9999';
  notification.style.display = 'none';
  notification.textContent = 'You are currently offline. Some features may be unavailable.';
  
  document.body.appendChild(notification);
  return notification;
}

// Listen for online/offline events
window.addEventListener('online', notifyOfflineStatus);
window.addEventListener('offline', notifyOfflineStatus);

// Check status when the page loads
window.addEventListener('load', notifyOfflineStatus);