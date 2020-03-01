/**
 * Setup code wrapped in their individual IIFEs
 * To be ran before main.js by being imported from main.js
 */

(function checkMobile() {
  // Detect if the user is using a mobile device
  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );
  console.log("isMobile: ", isMobile);
  if (!isMobile)
    alert("Please use this app only on mobile for a better experience!");
})();

(function checkIndexedDB() {
  const indexedDBSupport = "indexedDB" in window;
  console.log("IndexedDB is supported:", indexedDBSupport);
  if (!indexedDBSupport)
    alert(
      "IndexedDB not supported, performance and offline usage will be impacted"
    );
})();
