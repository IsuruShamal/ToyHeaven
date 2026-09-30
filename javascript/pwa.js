/* PWA service worker */
if ("serviceWorker" in navigator) {

    const serviceWorkerURL =
        new URL("../service-worker.js", document.currentScript.src);

    window.addEventListener("load", function() {

        navigator.serviceWorker
            .register(serviceWorkerURL.href);

    });

}