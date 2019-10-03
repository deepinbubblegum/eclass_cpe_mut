$(document).ready(function() {
    $('#btnLangEn').click(function() {
        var url = $(location).attr('href').split("/");
        url[3] = 'en';
        url = url.join("/");
        window.location.replace(url);
    });

    $('#btnLangTh').click(function() {
        var url = $(location).attr('href').split("/");
        url[3] = 'th';
        url = url.join("/");
        window.location.replace(url);
    });

});