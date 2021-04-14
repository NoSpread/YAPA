/* For reference: https://docs.meteor.com/api/mobile-config.html */

App.icons({
  'android_mdpi': 'images/icon-48x48.png',
  'android_hdpi': 'images/icon-72x72.png',
  'android_xhdpi': 'images/icon-96x96.png',
  'android_xxhdpi': 'images/icon-144x144.png',
  'android_xxxhdpi': 'images/icon-192x192.png'
});

App.launchScreens({
  'android_mdpi_portrait': 'images/screen-320x480.png',
  'android_mdpi_landscape': 'images/screen-480x320.png',
  'android_hdpi_portrait': 'images/screen-480x800.png',
  'android_hdpi_landscape': 'images/screen-800x480.png',
  'android_xhdpi_portrait': 'images/screen-720x1280.png',
  'android_xhdpi_landscape': 'images/screen-1280x720.png',
  'android_xxhdpi_portrait': 'images/screen-960x1600.png',
  'android_xxhdpi_landscape': 'images/screen-1600x960.png',
  'android_xxxhdpi_portrait': 'images/screen-1280x1920.png',
  'android_xxxhdpi_landscape': 'images/screen-1920x1280.png'
});

App.info({
  id: 'com.yapa.dev',
  name: 'Yapa',
  description: 'Best App',
  author: 'xyz',
  email: 'contact@example.com',
  website: 'http://example.com'
});