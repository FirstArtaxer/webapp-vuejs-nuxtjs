// export default ({ app, store , $notifier}, inject) => {


  // if ('serviceWorker' in navigator) {
  //   // console.log('Service worker:', 'hiiiiiojij')
  //   // $notifier.showMessage({ content: 'اپلیکشن شما به روز رسانی شد.', color: 'success', title: 'بروز رسانی' , icon: 'mdi-check-circle-outline' })
  //
  //   navigator.serviceWorker.getRegistrations().then((registrations) => {
  //     for (const worker of registrations) {
  //       console.log('Service worker:', worker)
  //     }
  //   })
  // }

  const workbox =  window.$workbox;
  if (workbox) {

    workbox.addEventListener('installed', (event) => {
      // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
      if (event.isUpdate) {
        window.location.reload(true)
      }
    })
  }

// }
