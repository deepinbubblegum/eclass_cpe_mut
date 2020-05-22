$(document).ready(function () {

        function bootstrapClearButton() {
                $('.position-relative :input').on('keydown focus', function () {
                        if ($(this).val().length > 0) {
                                $(this).nextAll('.form-clear').removeClass('d-none');
                        }
                }).on('keydown keyup blur', function () {
                        if ($(this).val().length === 0) {
                                $(this).nextAll('.form-clear').addClass('d-none');
                        }
                });
                $('.form-clear').on('click', function () {
                        $(this).addClass('d-none').prevAll(':input').val('');
                });
        }
        bootstrapClearButton();

        // $('#qr_canvas').hide();
        // var video = document.createElement("video");
        // var canvasElement = document.getElementById("qr_canvas");
        // var canvas = canvasElement.getContext("2d");
        // var localstream;
        // var flag = 0;
        // $('#Ticket').val('');
        // function qr_reader_start() {
        //         $('#qr_canvas').show(500);

        //         function drawLine(begin, end, color) {
        //                 canvas.beginPath();
        //                 canvas.moveTo(begin.x, begin.y);
        //                 canvas.lineTo(end.x, end.y);
        //                 canvas.lineWidth = 4;
        //                 canvas.strokeStyle = color;
        //                 canvas.stroke();
        //         }

        //         navigator.mediaDevices.getUserMedia({
        //                 video: {
        //                         facingMode: "environment"
        //                 }
        //         }).then(function (stream) {
        //                 video.srcObject = stream;
        //                 localstream = stream;
        //                 video.setAttribute("playsinline", true);
        //                 video.play();
        //                 requestAnimationFrame(tick);
        //         });

        //         function tick() {
        //                 if (video.readyState === video.HAVE_ENOUGH_DATA) {
        //                         canvasElement.hidden = false;
        //                         canvasElement.height = video.videoHeight;
        //                         canvasElement.width = video.videoWidth;
        //                         canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        //                         var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        //                         var code = jsQR(imageData.data, imageData.width, imageData.height, {
        //                                 inversionAttempts: "dontInvert",
        //                         });
        //                         if (code) {
        //                                 console.log(code.data);
        //                                 if(code.data.length == 24){
        //                                         drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#92FF45");
        //                                         drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#92FF45");
        //                                         drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#92FF45");
        //                                         drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#92FF45");
        //                                         $('#Ticket').val(code.data);
        //                                         $('#key_label').addClass('has-value');
        //                                         video.pause();
        //                                         // video.src = "";
        //                                         localstream.getTracks()[0].stop();
        //                                         // console.log("Vid off");
        //                                         // ok_qr();
        //                                         // canvasElement.hidden = true;
        //                                         return;
        //                                 }
        //                         }
        //                 }
        //                 requestAnimationFrame(tick);
        //         }
        // }

        // $('#btn_start_reader').click(function (e) {
        //         e.preventDefault();
        //         flag++;
        //         if(flag == 1){
        //                 qr_reader_start();
        //                 $('#Ticket').val('');
        //                 console.log('ON');
        //         }else{
        //                 qr_reader_stop();
        //                 flag = 0;
        //                 console.log('OFF');
        //         }
        // });

        // function qr_reader_stop(){
        //         video.pause();
        //         localstream.getTracks()[0].stop();
        //         $('#qr_canvas').hide();
        // }

        // $('#qr_close').click(function (e) {
        //         e.preventDefault();
        //         qr_reader_stop();
        // });
        // const video = $('#video');
        // const select = $('#select_camera');

        // $('#qr_canvas').hide();

        // const video = document.createElement("video");
        // const canvasElement = document.getElementById('qr_canvas');
        // const canvas = canvasElement.getContext("2d",{
        //         // desynchronized: true,
        //         preserveDrawingBuffer: false
        // });
        // // const button = document.getElementById('button');
        // const select = document.getElementById('select_camera');
        // let currentStream;
        // var flag = 0;

        // if (canvas.getContextAttributes().desynchronized) {
        //         console.log('Low latency canvas supported. Yay!');
        // } else {
        //         console.log('Low latency canvas not supported. Boo!');
        // }

        // $('#Ticket').val('');
        // // $('#select_camera').hide();
        // function stopMediaTracks(stream) {
        //         stream.getTracks().forEach(track => {
        //                 track.stop();
        //         });
        // }

        // function gotDevices(mediaDevices) {
        //         let count = 1;
        //         // var count_list = 0;
        //         // if (count_list == 0) {
        //         select.innerHTML = '';
        //         // const choose_camera = document.createElement('option');
        //         // const choose_label = document.createTextNode('Choose cameras');
        //         // choose_camera.appendChild(choose_label);
        //         // select.appendChild(choose_camera);
        //         // }
        //         mediaDevices.forEach(mediaDevice => {
        //                 if (mediaDevice.kind === 'videoinput') {
        //                         // if (count_list <= count) {
        //                         const option = document.createElement('option');
        //                         option.value = mediaDevice.deviceId;
        //                         const label = mediaDevice.label || `Camera ${count++}`;
        //                         const textNode = document.createTextNode(label);
        //                         option.appendChild(textNode);
        //                         select.appendChild(option);
        //                         // count_list++;
        //                         // }
        //                 }
        //         });
        //         // $('#select_camera').show();
        // }

        // function qr_reader_start() {
        //         $('#qr_canvas').show(500);
        //         if (typeof currentStream !== 'undefined') {
        //                 stopMediaTracks(currentStream);
        //         }
        //         const videoConstraints = {
        //                 frameRate: {
        //                         ideal: 60,
        //                         min: 25
        //                 }
        //         };
        //         if (select.value === '') {
        //                 videoConstraints.facingMode = 'environment';
        //         } else {
        //                 videoConstraints.deviceId = {
        //                         exact: select.value
        //                 };
        //         }
        //         const constraints = {
        //                 video: videoConstraints,
        //                 audio: false
        //         };
        //         navigator.mediaDevices
        //                 .getUserMedia(constraints)
        //                 .then(stream => {
        //                         currentStream = stream;
        //                         video.srcObject = stream;
        //                         video.setAttribute("playsinline", true);
        //                         video.play();
        //                         requestAnimationFrame(tick);
        //                         return navigator.mediaDevices.enumerateDevices();
        //                 })
        //                 .then( /*gotDevices*/ )
        //                 .catch(error => {
        //                         console.error(error);
        //                 });
        // };
        // navigator.mediaDevices.enumerateDevices().then(gotDevices);

        // function drawLine(begin, end, color) {
        //         canvas.beginPath();
        //         canvas.moveTo(begin.x, begin.y);
        //         canvas.lineTo(end.x, end.y);
        //         canvas.lineWidth = 4;
        //         canvas.strokeStyle = color;
        //         canvas.stroke();
        // }

        // function tick() {
        //         if (video.readyState === video.HAVE_ENOUGH_DATA) {
        //                 canvasElement.hidden = false;
        //                 canvasElement.height = video.videoHeight;
        //                 canvasElement.width = video.videoWidth;
        //                 canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        //                 var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        //                 var code = jsQR(imageData.data, imageData.width, imageData.height, {
        //                         inversionAttempts: "dontInvert",
        //                 });
        //                 if (code) {
        //                         console.log(code.data);
        //                         if (code.data.length == 24) {
        //                                 drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#92FF45");
        //                                 drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#92FF45");
        //                                 drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#92FF45");
        //                                 drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#92FF45");
        //                                 $('#Ticket').val(code.data);
        //                                 $('#floating-lable-label').addClass('is-focused');
        //                                 $('#key_label').addClass('has-value');
        //                                 video.pause();
        //                                 // video.src = "";
        //                                 stopMediaTracks(currentStream);
        //                                 // console.log("Vid off");
        //                                 // ok_qr();
        //                                 // canvasElement.hidden = true;
        //                                 return;
        //                         }
        //                 }
        //         }
        //         requestAnimationFrame(tick);
        // }

        // $('#btn_start_reader').click(function (e) {
        //         e.preventDefault();
        //         flag++;
        //         if (flag == 1) {
        //                 qr_reader_start();
        //                 $('#Ticket').val('');
        //                 console.log('ON');
        //         } else {
        //                 qr_reader_stop();
        //                 flag = 0;
        //                 console.log('OFF');
        //         }
        // });

        // $('#select_camera').change(function (e) {
        //         e.preventDefault();
        //         qr_reader_stop();
        //         qr_reader_start();
        // });

        // $('#qr_close').click(function (e) {
        //         e.preventDefault();
        //         if (flag == 1) {
        //                 qr_reader_stop();
        //         }
        //         $("#modal_ticket").modal('hide');
        // });

        // function qr_reader_stop() {
        //         video.pause();
        //         stopMediaTracks(currentStream);
        //         $('#qr_canvas').hide();
        //         // $('#select_camera').hide();
        // }

        // // function key_rex(arg) {
        // //         re = /([A-Z^0-9]{4})([A-Z^0-9]{4})([A-Z^0-9]{4})([A-Z^0-9]{4})([A-Z^0-9]{4})/g;
        // //         result = arg.replace(re, "$1-$2-$3-$4-$5");
        // //         console.log('regex = ' + result);
        // //         return result;
        // // }

        // // $('#Ticket').keypress(function (e) {
        // //         key_txt = $('#Ticket').val().toUpperCase();
        // //         $('#Ticket').val(key_rex(key_txt));
        // // });

        // $('#Ticket').keyup(function (e) {
        //         $('#Ticket').val($('#Ticket').val().toUpperCase());
        //         noOfTxt = $('#Ticket').val().replace(/-/gi, "").length;
        //         if (e.keyCode != 8) { //back space
        //                 if (noOfTxt != 0 && noOfTxt % 4 == 0 && noOfTxt < 20) {
        //                         $('#Ticket').val($('#Ticket').val() + '-');
        //                 }
        //         }
        // });


        // $('#qr_canvas').hide();
        // video = document.getElementById('video');

        // navigator.mediaDevices.getUserMedia({
        //                 video: {
        //                         width: {
        //                                 exact: 320
        //                         },
        //                         height: {
        //                                 exact: 240
        //                         }
        //                 }
        //         })
        //         .then(function (stream) {
        //                 if (navigator.mozGetUserMedia) {
        //                         video.mozSrcObject = stream;
        //                 } else {
        //                         video.srcObject = stream;
        //                 }
        //         })
        //         .catch(function (e) {
        //                 alert(e);
        //                 console.log(e)
        //         });




        var video;
        var switchCameraButton;
        var amountOfCameras = 0;
        var currentFacingMode = 'environment';

        function deviceCount() {
                return new Promise(function (resolve) {
                        var videoInCount = 0;

                        navigator.mediaDevices
                                .enumerateDevices()
                                .then(function (devices) {
                                        devices.forEach(function (device) {
                                                if (device.kind === 'video') {
                                                        device.kind = 'videoinput';
                                                }

                                                if (device.kind === 'videoinput') {
                                                        videoInCount++;
                                                        console.log('videocam: ' + device.label);
                                                }
                                        });

                                        resolve(videoInCount);
                                })
                                .catch(function (err) {
                                        console.log(err.name + ': ' + err.message);
                                        resolve(0);
                                });
                });
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && navigator.mediaDevices.enumerateDevices) {
                navigator.mediaDevices
                        .getUserMedia({
                                audio: false,
                                video: true,
                        })
                        .then(function (stream) {
                                stream.getTracks().forEach(function (track) {
                                        track.stop();
                                });

                                deviceCount().then(function (deviceCount) {
                                        amountOfCameras = deviceCount;

                                        initCameraUI();
                                        initCameraStream();
                                });
                        })
                        .catch(function (error) {
                                if (error === 'PermissionDeniedError') {
                                        alert('Permission denied. Please refresh and give permission.');
                                }

                                console.error('getUserMedia() error: ', error);
                        });
        } else {
                alert('Mobile camera is not supported by browser, or there is no camera detected/connected');
        }

        function initCameraUI() {
                video = document.getElementById('video');
                switchCameraButton = document.getElementById('switchCameraButton');
                // -- switch camera part
                if (amountOfCameras > 1) {
                        switchCameraButton.addEventListener('click', function () {
                                if (currentFacingMode === 'environment') {
                                        currentFacingMode = 'user';
                                        console.log('user');
                                } else {
                                        currentFacingMode = 'environment'
                                        console.log('environment');
                                };

                                initCameraStream();
                        });
                }

        }

        function initCameraStream() {
                if (window.stream) {
                        window.stream.getTracks().forEach(function (track) {
                                console.log(track);
                                track.stop();
                        });
                }

                var size = 1280;

                var constraints = {
                        audio: false,
                        video: {
                                width: {
                                        ideal: size
                                },
                                height: {
                                        ideal: size
                                },
                                //width: { min: 1024, ideal: window.innerWidth, max: 1920 },
                                //height: { min: 776, ideal: window.innerHeight, max: 1080 },
                                facingMode: currentFacingMode,
                        },
                };

                navigator.mediaDevices
                        .getUserMedia(constraints)
                        .then(handleSuccess)
                        .catch(handleError);

                function handleSuccess(stream) {
                        window.stream = stream;
                        video.srcObject = stream;

                        if (constraints.video.facingMode) {
                                if (constraints.video.facingMode === 'environment') {
                                        switchCameraButton.setAttribute('aria-pressed', true);
                                } else {
                                        switchCameraButton.setAttribute('aria-pressed', false);
                                }
                        }

                        const track = window.stream.getVideoTracks()[0];
                        const settings = track.getSettings();
                        str = JSON.stringify(settings, null, 4);
                        console.log('settings ' + str);
                }

                function handleError(error) {
                        console.error('getUserMedia() error: ', error);
                }
        }

});