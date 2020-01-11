//Make sure that service worker are supported

if('serviceWorker' in navigator){
    window.addEventListener('load', () =>{
        navigator.serviceWorker
        .register('./sw_site.js')
        .then(reg=>console.log('Service worker: Register'))
        .catch(err=>console.log(`Serivce Worker:Error ${err}`));
    });
}