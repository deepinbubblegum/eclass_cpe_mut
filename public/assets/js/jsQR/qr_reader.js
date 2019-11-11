$(document).ready(function () {
        $('#qr_canvas').hide();
        $('#btn_start_reader').click(function (e) { 
                e.preventDefault();
                $('#qr_canvas').show(500);
                var video = document.createElement("video");
                var canvasElement = document.getElementById("qr_canvas");
                var canvas = canvasElement.getContext("2d"); 
                function drawLine(begin, end, color) {
                        canvas.beginPath();
                        canvas.moveTo(begin.x, begin.y);
                        canvas.lineTo(end.x, end.y);
                        canvas.lineWidth = 4;
                        canvas.strokeStyle = color;
                        canvas.stroke();
                }

                navigator.mediaDevices.getUserMedia({
                        video: {
                                facingMode: "environment"
                        }
                }).then(function (stream) {
                        video.srcObject = stream;
                        video.setAttribute("playsinline", true);
                        video.play();
                        requestAnimationFrame(tick);
                }); 

                function tick() {
                        if (video.readyState === video.HAVE_ENOUGH_DATA) {
                                canvasElement.hidden = false;
                                canvasElement.height = video.videoHeight;
                                canvasElement.width = video.videoWidth;
                                canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                                var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                                var code = jsQR(imageData.data, imageData.width, imageData.height, {
                                        inversionAttempts: "dontInvert",
                                });
                                if (code) {
                                        drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
                                        drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
                                        drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
                                        drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
                                        $('#qr_text').val(code.data);
                                        video.pause();
                                        localstream.getTracks()[0].stop();
                                        return;
                                }
                        }
                        requestAnimationFrame(tick);
                }
        });
});