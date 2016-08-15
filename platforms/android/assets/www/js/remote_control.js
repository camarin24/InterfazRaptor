function start_remote_controls(data) {
    MusicControls.destroy(onSuccess_control, onError_control);
    MusicControls.create(data, onSuccess_control, onError_control);
    function events(action) {
        switch(action) {
            case 'music-controls-next':
                alert("next");
                break;
            case 'music-controls-previous':
                alert("anterior");
                break;
            case 'music-controls-pause':
                app.reproductor.playPause();
                break;
            case 'music-controls-play':                
                app.reproductor.playPause();
                break;
            case 'music-controls-destroy':
                alert("fuera");
                break;

            // // Headset events (Android only)
            // case 'music-controls-media-button' :
            //     // Do something
            //     break;
            // case 'music-controls-headset-unplugged':
            //     // Do something
            //     break;
            // case 'music-controls-headset-plugged':
            //     // Do something
            //     break;
            // default:
            //     break;
        }
    }

    // Register callback
    MusicControls.subscribe(events);

    // Start listening for events
    // The plugin will run the events function each time an event is fired
    MusicControls.listen();

}

function onSuccess_control() {
    //alert("Exito");
}

function onError_control() {
    alert("Error en controles externos de la aplicacion");
}
