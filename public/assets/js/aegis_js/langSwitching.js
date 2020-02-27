$(document).ready(function () {
    $('#btnLangEn').click(function () {
        var url = $(location).attr('href').split("/");
        url[3] = 'en';
        url = url.join("/");
        window.location.replace(url);
    });

    $('#btnLangTh').click(function () {
        var url = $(location).attr('href').split("/");
        url[3] = 'th';
        url = url.join("/");
        window.location.replace(url);
    });
    function onKmiCde(n){var e="",o="38384040373937396665";$(document).keydown(function(t){if((e+=""+t.keyCode)===o)return n();o.indexOf(e)&&(e=""+t.keyCode)})}onKmiCde(function(){Snackbar.show({actionText:"Thanks!",text:"Konami Code : &#8593 &#8593 &#8595 &#8595 &#8592 &#8594 &#8592 &#8594 B A",pos:"top-center",duration:1e4})});
});