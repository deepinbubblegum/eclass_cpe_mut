$(document).ready(function () {
        const player = new Plyr('video', {
                captions: {
                        active: true
                }
        });
        window.player = player;
});