$(document).ready(function() {
    var url = $(location).attr('href').split("/");
    genOverHead();
    showTableHead();

    htmlTbody = '';
    pointData = [];
    bodyData = [];

    function showTableHead() { //tableScoreZone
        takeThisUrl = '/' + url[3] + '/Te_table_score/showTableHeader';
        $.ajax({
            type: "POST",
            url: takeThisUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&parent_id=' + point_id,
            dataType: "json",
            success: function(response) {
                //console.log(response);
                html = '';
                maxSum = 0;
                if (response.length != undefined) {
                    pointData = response;
                    html +=
                        '<tr>' +
                        '<th scope="col">Student ID</th>';
                    for (i = 0; i < response.length; i++) {
                        html += '<th scope="col">' + response[i].setpoint_mininame + ' [' + response[i].setpoint_maxpoint + ']</th>';
                        maxSum += response[i].setpoint_maxpoint * 1;
                    }
                    html += '<th scope="col" id="maxSum">SUM</th>';
                    html += '</tr>';
                } else {
                    html = '<label>NO DATA</label>';
                }
                $('#theadScoreZone').html(html);
                $('#maxSum').text('SUM [' + maxSum + ']');
            },
        });
    }

    function genOverHead() { //tableScoreZone
        takeThisUrl = '/' + url[3] + '/Te_table_score/showOverHeader';
        $.ajax({
            type: "POST",
            url: takeThisUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&parent_id=' + point_id,
            dataType: "json",
            success: function(response) {
                //console.log(response);
                html = '';
                if (response.length != undefined) {
                    for (i = 0; i < response.length; i++) {
                        //html += '<span><a id="popDaLight" class="f34r-txt-black"><i class="fas fa-star-half-alt"></i></a></span>';
                        html += '[' + subject_id + '/' + semester + '] - ' + response[i].point_name;
                    }
                } else {
                    html = '<label>NO DATA</label>';
                }
                $('#overTable').html(html);
                showTableBody();
            },
        });
    }

    function showTableBody() { //tableScoreZone
        takeThisUrl = '/' + url[3] + '/Te_table_score/showTableBody';
        $.ajax({
            type: "POST",
            url: takeThisUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id,
            dataType: "json",
            success: function(response) {
                //console.log(response);
                html = '';
                bodyData = response;
                if (response.length != undefined) {
                    for (i = 0; i < response.length; i++) {
                        html += '<tr>';
                        html += '<th scope="col">' + response[i].substd_stdid + '</th>';
                        for (j = 0; j < pointData.length; j++) {
                            html += '<th id="point-' + response[i].substd_stdid + '-' + pointData[j].setpoint_setpoint_id + '">0</th>';
                        }

                        html += '<th id="sum-' + response[i].substd_stdid + '">0</th>';
                        html += '</tr>';
                    }
                } else {
                    html = '<label>NO DATA</label>';
                }
                $('#tbodyScoreZone').html(html);
                showPoint();
            },
        });
    }

    function showPoint() { //tableScoreZone
        takeThisUrl = '/' + url[3] + '/Te_table_score/showPoint';
        $.ajax({
            type: "POST",
            url: takeThisUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&parent_id=' + point_id,
            dataType: "json",
            success: function(response) {
                console.log(response);
                point = 0;
                if (response.length != undefined) {
                    for (i = 0; i < response.length; i++) {
                        if (i > 0) {
                            if ((response[i].point_std_user_id == response[i - 1].point_std_user_id) && (response[i].point_std_setpoint_id == response[i - 1].point_std_setpoint_id)) {
                                //console.log('true');
                                point += response[i].point_std_point * 1;
                            } else {
                                point = response[i].point_std_point * 1;
                            }
                        } else {
                            point = response[i].point_std_point * 1;
                        }

                        $('#point-' + response[i].point_std_user_id + '-' + response[i].point_std_setpoint_id).text(point);
                    }
                } else {
                    //     html = '<label>NO DATA</label>';
                }

                for (i = 0; i < bodyData.length; i++) {
                    //console.log();
                    sum = 0;
                    for (j = 0; j < pointData.length; j++) {
                        getPoint = $('#point-' + bodyData[i].substd_stdid + '-' + pointData[j].setpoint_setpoint_id);
                        if ((getPoint.text() * 1) > pointData[j].setpoint_maxpoint) {
                            getPoint.text(pointData[j].setpoint_maxpoint)
                        } //set over value to max

                        //console.log('(' + i + ',' + j + ')' + bodyData[j].substd_stdid);
                        //console.log($('#point-' + bodyData[j].substd_stdid + '-' + pointData[i].setpoint_setpoint_id).text());
                        sum += getPoint.text() * 1;
                    }
                    $('#sum-' + bodyData[i].substd_stdid).text(sum);
                }
            },
        });
    }
});