$(document).ready(function() {
    var url = $(location).attr('href').split("/");
    var getMenu = [];
    var getField = [];
    showMenuPoint();

    function showMenuPoint() {
        $.ajax({
            url: '/' + url[3] + '/Std_score/showMenuPoint/' + subject_id + '-' + semester,
            dataType: "json",
            success: function(response) {
                getMenu = response;
                console.log(response);
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<div class="expansion-panel list-group-item success-color" >' +
                            '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapse' + i + '" id="heading' + i + '">' +
                            response[i].point_name +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>' +
                            '<div aria-labelledby="heading' + i + '" class="collapse" data-parent="#accordionOne" id="collapse' + i + '">' +
                            '<div class="expansion-panel-body">' +
                            /* --------BTN-------- */
                            '<span style="font-size: 1.7em;"><a href="/select/scoreTable/' + subject_id + '-' + semester + '-' + response[i].point_id + '" id="showInMenu-' + response[i].point_id + '" href="#" class="f34r-txt-black"><i class="fas fa-star"></a></i></span>&nbsp;' +
                            /* --------BTN-------- */
                            '<br>' +
                            response[i].point_discription +
                            '<div id="menuScoreId-' + response[i].point_id + '">' +
                            /*--------------------------------------------------*/
                            '<br>' +
                            '<div class="d-flex" id="genIn-' + response[i].point_id + '">' +
                            '</div>' +
                            /*--------------------------------------------------*/
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                }
                $('.showMenuScore').html(html);
                $.each(getMenu, function(i, p) {
                    showUnit(getMenu[i].point_id);
                });
            }
        });
    }

    function showUnit(popUp) {
        $.ajax({
            url: '/' + url[3] + '/Std_score/showPointField/' + subject_id + '-' + semester + '-' + popUp,
            dataType: "json",
            success: function(response) {
                var html = "";
                if (!getField[popUp]) getField[popUp] = []
                getField[popUp] = response;
                if (response.length != undefined) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<center>' +
                            '<div class="p-2 f34r-bg-n-txt">' + response[i].setpoint_mininame + '<br>' +
                            '<span style="font-size: 1.5em;"><a href="#" id="viewPoint-' + popUp + '-' + response[i].setpoint_setpoint_id + '"class="f34r-txt-black"><i class="fas fa-clipboard-list"></i></a></span>&nbsp;' +
                            '</div>' +
                            '</center>&nbsp;';

                    }
                } else {
                    html += '<h1>NO DATA</h1>'
                }
                $('#genIn-' + popUp).html(html);
                console.log(getField[popUp])
                $.each(getField[popUp], function(i, p) {
                    $('#viewPoint-' + popUp + '-' + getField[popUp][i].setpoint_setpoint_id).click(function(e) {
                        console.log('#viewPoint-' + popUp + '-' + getField[popUp][i].setpoint_setpoint_id);
                        showPoint(getField[popUp][i].setpoint_setpoint_id, popUp);
                        $('#showPoint').modal('show');
                    });
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }

    function showPoint(childId, parentId) {
        console.log('showPoint(' + childId + ',' + parentId + ')');
        takeThisUrl = '/' + url[3] + '/Std_score/showPoint';
        $.ajax({
            type: "POST",
            url: takeThisUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&setIdChild=' + childId + '&setIdParent=' + parentId,
            dataType: "json",
            success: function(response) {
                //console.log(response + '<- This is showPoint response');
                html = '';
                if (response.length != undefined) {
                    html += '<table class="table">' +
                        '<thead>' +
                        '<tr>' +
                        '<th scope="col">Student Id</th>' +
                        '<th scope="col">Point</th>' +
                        '</tr>' +
                        '</thead>';

                    html += '<tbody>';
                    for (i = 0; i < response.length; i++) {
                        html += '<tr id="tr-' + response[i].point_std_setpoint_id + '-' + response[i].point_std_id + '-' + i + '">' +
                            '<td>' + response[i].point_std_user_id + '</td>' +
                            '<td>' + response[i].point_std_point + '</td>' +
                            '</tr>';
                    }
                    html += '</tbody>';
                } else {
                    html = '<label>NO DATA</label>';
                }
                $('#showPointZone').html(html);
            },
        });
    }
});