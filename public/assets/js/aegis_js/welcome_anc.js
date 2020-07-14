$(document).ready(function () {
        var url = $(location).attr('href').split("/");
        $.ajax({
                url: "../Announce/announce_showdata_ctl",
                dataType: "json",
                success: function (response) {
                        html = '';
                        console.log(response);
                        if (response == 0) {
                                html = '<center><h2>ไม่มีประกาศ</h2></center>';
                        } else {
                                for (i = 0; i < response.length; i++) {
                                        if(response[i].e_time == "0000-00-00 00:00:00"){
                                                response[i].e_time = "ประกาศตลอด";
                                        }
                                        if (i == 0) {
                                                html += '<div class="expansion-panel list-group-item ">';
                                        } else {
                                                html += '<div class="expansion-panel list-group-item">';
                                        }
                                        html += '<a aria-controls="' + response[i]['anc_id'] + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#' + response[i]['anc_id'] + '" id="headingOne">' +
                                                response[i]['title'] +
                                                '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                                '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                                '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                                '</div>' +
                                                '</a>';
                                        if (i == 0) {
                                                html += '<div aria-labelledby="headingOne" class="collapse " data-parent="#accordionOne" id="' + response[i]['anc_id'] + '">';
                                        } else {
                                                html += '<div aria-labelledby="headingOne" class="collapse" data-parent="#accordionOne" id="' + response[i]['anc_id'] + '">';
                                        }
                                        html += '<div class="expansion-panel-body">' +
                                                response[i]['content'] +
                                                '</div>' +
                                                '<div class="navdrawer-divider"></div>' +
                                                '<div class="d-flex text-muted">' +
                                                '<div class="p-2"> <small class="ml-2 my-1">ประกาศเมื่อ : ' + response[i].s_time + '</small> </div>' +
                                                '<div class="ml-auto p-2"> <small class="mr-2 my-1"> สิ้นสุดการประกาศ : ' + response[i].e_time + '</small> </div>' +
                                                '</div>' +
                                                '</div>' +
                                                '</div>';

                                }
                        }
                        $('#accordionOne').html(html);
                }
        });
});