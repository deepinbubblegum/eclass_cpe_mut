$(document).ready(function() {
    var url = $(location).attr('href').split("/");
    genOverHead();
    showTableHead();

    htmlTbody = '';
    pointData = [];
    bodyData = [];
    getFieldPoint = [];

    function showTableHead() { //tableScoreZone
        takeThisUrl = '/' + url[3] + '/Te_table_score/showTableHeader';
        $.ajax({
            type: "POST",
            url: takeThisUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&parent_id=' + point_id,
            dataType: "json",
            success: function(response) {
                console.log('showTableHead');
                //console.log(response);
                getFieldPoint = response;
                html = '';
                //maxSum = 0;
                if (response.length != undefined) {
                    pointData = response;
                    html +=
                        '<tr>' +
                        '<th scope="col">Student ID</th>';
                    for (i = 0; i < response.length; i++) {
                        html += '<th scope="col">' + response[i].setpoint_mininame;
                        if (response[i].setpoint_option == '1') {
                            html += ' [' + response[i].setpoint_maxpoint + ']</th>';
                        } else if (response[i].setpoint_option == '2') {
                            formulaField++;
                            formulaMax++;
                        }
                        //maxSum += response[i].setpoint_maxpoint * 1;
                    }
                    // html += '<th scope="col" id="maxSum">SUM</th>';
                    html += '</tr>';
                } else {
                    html = '<label>NO DATA</label>';
                }
                $('#theadScoreZone').html(html);
                //$('#maxSum').text('SUM [' + maxSum + ']');
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
                console.log('genOverHead');
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
                console.log('showTableBody');
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

                        //html += '<th id="sum-' + response[i].substd_stdid + '">0</th>';
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

    formulaField = 0;
    formulaMax = 0;

    function showPoint() { //tableScoreZone
        takeThisUrl = '/' + url[3] + '/Te_table_score/showPoint';
        $.ajax({
            type: "POST",
            url: takeThisUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&parent_id=' + point_id,
            dataType: "json",
            success: function(response) {
                console.log('showPoint');
                dataPoint = response;
                //console.log(response);
                point = 0;
                if (dataPoint.length != undefined) {
                    for (i = 0; i < dataPoint.length; i++) {
                        if (i > 0) {
                            if ((dataPoint[i].point_std_user_id == dataPoint[i - 1].point_std_user_id) && (dataPoint[i].point_std_setpoint_id == dataPoint[i - 1].point_std_setpoint_id)) {
                                //console.log('true');
                                point += dataPoint[i].point_std_point * 1;
                            } else {
                                point = dataPoint[i].point_std_point * 1;
                            }
                        } else {
                            point = dataPoint[i].point_std_point * 1;
                        }

                        $('#point-' + dataPoint[i].point_std_user_id + '-' + dataPoint[i].point_std_setpoint_id).text(point);
                    }
                } else {
                    //     html = '<label>NO DATA</label>';
                }
                for (i = 0; i < bodyData.length; i++) {
                    keepCheck = 0;
                    for (j = 0; j < pointData.length; j++) {
                        getPoint = $('#point-' + bodyData[i].substd_stdid + '-' + pointData[j].setpoint_setpoint_id);
                        if (getFieldPoint[j].setpoint_option == '1') {
                            if ((getPoint.text() * 1) > pointData[j].setpoint_maxpoint) {
                                getPoint.text(pointData[j].setpoint_maxpoint)
                            } //set over value to max  
                        }
                    }
                }
            },
        });
    }
    dataPoint = [];


    var ajaxCount = 0;
    keeper = [];

    function htmlEncodeF34R(textInPut) {
        textInPut = textInPut.replace(/\(/gi, "%28");
        textInPut = textInPut.replace(/\)/gi, "%29");
        textInPut = textInPut.replace(/\*/gi, "%2A");
        textInPut = textInPut.replace(/\+/gi, "%2B");
        textInPut = textInPut.replace(/\-/gi, "%2D");
        textInPut = textInPut.replace(/\//gi, "%2F");
        return textInPut;
    }
    //'/' + url[3] + '/Te_table_score/takeFormula'
    function takeFormula(stdId, colId, takeFormula) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_table_score/takeFormula',
            data: '&formula=' + '(' + takeFormula + ')',
            dataType: "json",
            success: function(getSum) {
                console.log(stdId, colId);
                console.log('takeFormula->' + getSum[0].sum + '<-');
                $('#point-' + stdId + '-' + colId).text(getSum[0].sum);
            }
        });
    }

    $(document).ajaxStop(function() {
        ajaxCount++;
        console.log('ajaxComplete', ajaxCount, formulaField);
        if (ajaxCount >= 1 && formulaField > 0) {
            console.log('---------------------ifCondition')
                //F34REXECUTION();
            console.log(formulaMax);
            if (formulaMax == 1) {
                loopStart = pointData.length - formulaMax;
                loopStop = pointData.length;
            } else {
                loopStart = pointData.length - formulaMax + F34R;
                loopStop = pointData.length + (F34R - 1);
            }

            for (i = loopStart; i < loopStop; i++) { //FIELD 
                for (j = 0; j < bodyData.length; j++) { //STD  
                    console.log(i, j);
                    if (pointData[i].setpoint_option == '2') {
                        setFormula = '';
                        getFormula = pointData[i].setpoint_maxpoint.split("#");
                        //console.log('split', bodyData[j].substd_stdid, pointData[i].setpoint_setpoint_id);
                        for (l = 0; l < getFormula.length; l++) {
                            for (k = 0; k < pointData.length; k++) { //CHECK ALL FIELD 
                                if (pointData[k].setpoint_mininame == getFormula[l]) {
                                    setFormula += $('#point-' + bodyData[j].substd_stdid + '-' + pointData[k].setpoint_setpoint_id).text();
                                    setFormula += getFormula[l + 1];
                                }
                            }
                        }
                        console.log(setFormula);
                        setFormula = htmlEncodeF34R(setFormula);
                        takeFormula(bodyData[j].substd_stdid, pointData[i].setpoint_setpoint_id, setFormula);

                        // console.log('F34REXECUTION');
                        // if (!keeper[i]) keeper[i] = []
                        // keeper[i][keepCheck++] = [bodyData[i].substd_stdid, pointData[i].setpoint_setpoint_id, setFormula];
                    }

                }
            }
            //console.log(rowCount, colCount, formulaField);
            formulaField--;
            F34R++;
        }
    });
    F34R = 0;

    function F34REXECUTION() {
        for (i = pointData.length - formulaMax + F34R; i < pointData.length + (F34R - 1); i++) { //FIELD 
            for (j = 0; j < bodyData.length; j++) { //STD   
                if (pointData[i].setpoint_option == '2') {
                    setFormula = '';
                    getFormula = pointData[i].setpoint_maxpoint.split("#");
                    for (l = 0; l < getFormula.length; l++) {
                        for (k = 0; k < pointData.length; k++) { //CHECK ALL FIELD 
                            if (pointData[k].setpoint_mininame == getFormula[l]) {
                                setFormula += $('#point-' + bodyData[j].substd_stdid + '-' + pointData[k].setpoint_setpoint_id).text();
                                setFormula += getFormula[l + 1];
                            }
                        }
                    }
                    setFormula = htmlEncodeF34R(setFormula);
                    takeFormula(bodyData[j].substd_stdid, pointData[i].setpoint_setpoint_id, setFormula);
                }

            }
        }
    }
});