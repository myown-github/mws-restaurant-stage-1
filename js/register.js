//credit to https://matthewcranford.com
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
  .then(function() {
    console.log('SW: Registered');
  })
  .catch(function(err) {
    console.error('SW: Registration failed: ' + err);
  });
}
