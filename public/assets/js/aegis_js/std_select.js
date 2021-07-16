$(document).ready(function () {

    /******************************* highlight Navbar ************************************* */
    var Navbar_Side_highlight = ['side_Anc', 'side_score', 'side_uploads', "side_downloads", "side_media", "side_quiz", "side_vote"];
    for (z = 0; z < Navbar_Side_highlight.length; z++) {
        var elementRemove = document.getElementById(Navbar_Side_highlight[z]);
        elementRemove.classList.remove("bg-info");
    }

    var Navbar_highlight = ['Anc', 'score', 'uploads', "downloads", "media", "quiz", "vote"];
    for (y = 0; y < Navbar_highlight.length; y++) {
        var elementRemove = document.getElementById(Navbar_highlight[y]);
        elementRemove.classList.remove("bg-info");
    }

    // $('#score').classList.add(".bg-primary");
    var element = document.getElementById("Anc");
    element.classList.add("bg-info");
    var element = document.getElementById("side_Anc");
    element.classList.add("bg-info");
    /******************************************************************** */

    year = semester.substr(0, 4);
    part = semester.substr(4, 1);
    $('#header').text('ประกาศถึงนักศึกษา : ' + subject_id + ' - ' + year + '/' + part);
    // $('#header').text('ประกาศถึงนักศึกษา : ' + subject_id + ' / ' + semester);

    var url = $(location).attr('href').split("/");
    ShowDataAnnouce();

    function ShowDataAnnouce() {
        $.ajax({
            type: "POST",
            url: "/" + url[3] + "/Std_select/Show_Data_ctl",
            data: '&semester=' + semester + '&subject=' + subject_id,
            dataType: "json",
            // url: '/' + url[3] + '/Std_select/Show_Data_ctl/' + subject_id + '-' + semester,
            // dataType: "json",
            success: function (response) {
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    if (response.length == 0) {
                        html = 'ยังไม่มีประกาศจากอาจารย์ผู้สอน';
                    } else {
                        for (i = 0; i < response.length; i++) {
                            if (i == 0) {
                                html += '<div class="expansion-panel list-group-item ">' +
                                    '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapse' + i + '" id="' + response[i].annouce_id + '">' +
                                    response[i].annouce_name +
                                    '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                    '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                    '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                    '</div>' +
                                    '</a>' +
                                    '<div aria-labelledby="' + response[i].annouce_id + '" class="collapse " data-parent="#accordionOne" id="collapse' + i + '">' +
                                    '<div class="expansion-panel-body text-left">' +
                                    response[i].annouce_discription +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                            } else {
                                html += '<div class="expansion-panel list-group-item">' +
                                    '<a aria-controls="collapse' + i + '" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapse' + i + '" id="' + response[i].annouce_id + '">' +
                                    response[i].annouce_name +
                                    '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                    '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                    '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                    '</div>' +
                                    '</a>' +
                                    '<div aria-labelledby="' + response[i].annouce_id + '" class="collapse" data-parent="#accordionOne" id="collapse' + i + '">' +
                                    '<div class="expansion-panel-body text-left">' +
                                    response[i].annouce_discription +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                            }
                        }
                    }
                }
                $('#accordionOne').html(html);
            }
        });
    }

});