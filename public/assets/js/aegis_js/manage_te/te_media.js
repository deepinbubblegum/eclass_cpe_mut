$(document).ready(function () {
        // ---------------function video-upload--------------
        $('#video_file').change(function (e) { 
                e.preventDefault();
                html ='';
                _files = $(this)[0].files;
                console.log(_file[0].name);
                $(this).next("label").text(_files[0].name);
        });
});