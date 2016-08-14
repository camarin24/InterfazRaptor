cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-admobpro/www/AdMob.js",
        "id": "cordova-plugin-admobpro.AdMob",
        "clobbers": [
            "window.AdMob"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-music-controls/www/MusicControls.js",
        "id": "cordova-plugin-music-controls.MusicControls",
        "clobbers": [
            "MusicControls"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-extension": "1.5.1",
    "cordova-plugin-admobpro": "2.19.1",
    "cordova-plugin-device": "1.1.2",
    "cordova-plugin-music-controls": "1.3",
    "cordova-plugin-statusbar": "2.1.3"
};
// BOTTOM OF METADATA
});