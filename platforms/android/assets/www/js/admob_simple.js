var admobid = {};

// TODO: replace the following ad units with your own
if (/(android)/i.test(navigator.userAgent)) {
    admobid = { // for Android
        banner: 'ca-app-pub-2914840006608630/8148456102',
        interstitial: 'ca-app-pub-2914840006608630/2101922502'
    };
} else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-2914840006608630/8148456102',
        interstitial: 'ca-app-pub-2914840006608630/2101922502'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-2914840006608630/8148456102',
        interstitial: 'ca-app-pub-2914840006608630/2101922502'
    };
}

function initAdmob() {
    if (!AdMob) { alert('admob plugin not ready'); return; }
    if (app.untils.isPurchase) { return; }
    // this will create a banner on startup
    AdMob.createBanner({
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        isTesting: true,
        overlap: false,
        offsetTopBar: false,
        bgColor: 'black'
    });

    // this will load a full screen ad on startup
    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        isTesting: true,
        autoShow: false
    });
}
//if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
//    document.addEventListener('deviceready', initApp, false);

//} else {

//}









/*var admobid = {};
  if( /(android)/i.test(navigator.userAgent) ) {
    admobid = { // for Android
      banner: 'ca-app-pub-2914840006608630/8148456102',
      interstitial: 'ca-app-pub-2914840006608630/2101922502'
    };
  } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
      banner: 'ca-app-pub-2914840006608630/8148456102',
      interstitial: 'ca-app-pub-2914840006608630/2101922502'
    };
  } else {
    admobid = { // for Windows Phone
      banner: 'ca-app-pub-2914840006608630/8148456102',
      interstitial: 'ca-app-pub-2914840006608630/2101922502'
    };
  }

  function createSelectedBanner(){
    if(AdMob) AdMob.createBanner({
      adId: admobid.banner,
      overlap: $('#overlap').is(':checked'),
      offsetTopBar: $('#offsetTopBar').is(':checked'),
      adSize: $('#adSize').val(),
      position: $('#adPosition').val(),
    });
  }

  function showBannerAtPosition(){
    if(AdMob) AdMob.showBanner( $('#adPosition').val() );
  }

  function onDeviceReady() {
    if (! AdMob) { alert( 'admob plugin not ready' ); return; }

    initAd();

    // display a banner at startup
    createSelectedBanner();
  }

  function initAd(){
    AdMob.getAdSettings(function(info){
      console.log('adId: ' + info.adId + '\n' + 'adTrackingEnabled: ' + info.adTrackingEnabled);
    }, function(){
      console.log('failed to get user ad settings');
    });

    AdMob.setOptions({
      // adSize: 'SMART_BANNER',
      position: AdMob.AD_POSITION.BOTTOM_CENTER,
      bgColor: 'black', // color name, or '#RRGGBB'
      isTesting: false,
      // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
      // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
    });

    // new events, with variable to differentiate: adNetwork, adType, adEvent
    $(document).on('onAdFailLoad', function(e){
      // when jquery used, it will hijack the event, so we have to get data from original event
      if(typeof e.originalEvent !== 'undefined') e = e.originalEvent;
      var data = e.detail || e.data || e;

      alert('error: ' + data.error +
          ', reason: ' + data.reason +
          ', adNetwork:' + data.adNetwork +
          ', adType:' + data.adType +
          ', adEvent:' + data.adEvent); // adType: 'banner', 'interstitial', etc.
    });
    $(document).on('onAdLoaded', function(e){
    });
    $(document).on('onAdPresent', function(e){
    });
    $(document).on('onAdLeaveApp', function(e){
    });
    $(document).on('onAdDismiss', function(e){
    });

    $('#btn_create').click(createSelectedBanner);
    $('#btn_remove').click(function(){
      AdMob.removeBanner();
    });

    $('#btn_show').click(showBannerAtPosition);
    $('#btn_hide').click(function(){
      AdMob.hideBanner();
    });

    // test interstitial ad
    $('#btn_prepare').click(function(){
      AdMob.prepareInterstitial({
        adId:admobid.interstitial,
        autoShow: $('#autoshow').is(':checked'),
      });
    });

    $('#btn_showfull').click(function(){
      AdMob.showInterstitial();
    });

    // test case for #256, https://github.com/floatinghotpot/cordova-admob-pro/issues/256
    $(document).on('backbutton', function(){
      if(window.confirm('Are you sure to quit?')) navigator.app.exitApp();
    });

    // test case #283, https://github.com/floatinghotpot/cordova-admob-pro/issues/283
    $(document).on('resume', function(){
      AdMob.showInterstitial();
    });
  }

  // test the webview resized properly
  $(window).resize(function(){
    $('#textinfo').html('web view: ' + $(window).width() + " x " + $(window).height());
  });

  $(document).ready(function(){
    // on mobile device, we must wait the 'deviceready' event fired by cordova
    if(/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent)) {
      document.addEventListener('deviceready', onDeviceReady, false);
    } else {
      onDeviceReady();
    }
  });*/
