$(document).ready(function () {
    var url = $(location).attr('href').split("/");

    genOverHead();
    showTableHead();

    htmlTbody = '';
    pointData = [];
    bodyData = [];
    getFieldPoint = [];
    getMaxPointData = [];

    function showTableHead() { //tableScoreZone
        takeThisUrl = '/' + url[3] + '/Te_table_score/showTableHeader';
        $.ajax({
            type: "POST",
            url: takeThisUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&parent_id=' + point_id,
            dataType: "json",
            success: function (response) {
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
                        html += '<th scope="col"><a id="charts-' + i + '" >' + response[i].setpoint_mininame + '</a>';
                        if (response[i].setpoint_option == '1') {
                            html += ' [' + response[i].setpoint_maxpoint + ']</th>';
                            getMaxPointData[i] = response[i].setpoint_maxpoint * 1;
                        } else if (response[i].setpoint_option == '2') {
                            showMax = response[i].setpoint_maxpoint.split(':');
                            if (showMax[1] != undefined) {
                                html += ' [' + showMax[1] + ']</th>';
                                getMaxPointData[i] = showMax[1] * 1;
                            } else {
                                html += ' [maxpoint-' + i + ']</th>';
                            }
                            formulaField++;
                            formulaMax++;
                        }
                        //maxSum += response[i].setpoint_maxpoint * 1;
                    }
                    // html += '<th scope="col" id="maxSum">SUM</th>';
                    html += '</tr>';
                } else {
                    html += '<label>NO DATA</label>';
                }
                $('#theadScoreZone').html(html);
                for (i = 0; i < getFieldPoint.length; i++) {
                    if (response[i].setpoint_option == '2') {
                        getShowMax = response[i].setpoint_maxpoint.split(':');
                        if (getShowMax[1] == undefined) {
                            takeShowMax = getShowMax[0].split("#");
                            setNewMaxPoint = 0;
                            for (j = 0; j < getFieldPoint.length; j++) {
                                for (k = 0; k < takeShowMax.length; k++) {
                                    if (getFieldPoint[j].setpoint_mininame == takeShowMax[k]) {
                                        getMaxPointField = $('#charts-' + j).parent().text();
                                        getForSlice = getMaxPointField.search(/\[/)
                                        sliced = getMaxPointField.slice(getForSlice + 1, getMaxPointField.length - 1);
                                        setNewMaxPoint += sliced * 1;
                                        console.log(setNewMaxPoint);
                                    }
                                }
                            }
                            getMaxPointData[i] = setNewMaxPoint;
                            html = html.replace('maxpoint-' + i, setNewMaxPoint);
                        }
                    }
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
            success: function (response) {
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
            success: function (response) {
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
            success: function (response) {
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

                $.each(getFieldPoint, function (i, p) {
                    $("#charts-" + i).click(function (e) {
                        //console.log(i);
                        $('#exampleModalLabel').text(getFieldPoint[i].setpoint_mininame);
                        $('#exampleModal').modal('show');
                        getData = [];
                        for (j = 0; j < bodyData.length; j++) {
                            getData[j] = $('#point-' + bodyData[j].substd_stdid + '-' + getFieldPoint[i].setpoint_setpoint_id).text();
                        }

                        getData.sort(function (a, b) {
                            return a - b
                        });
                        k = 0;
                        headData = [];
                        valueData = [];
                        sumData = 0;

                        moreThan = lessThan = 0;

                        for (j = 0; j < getData.length; j++) {
                            if (!valueData[k]) valueData[k] = 0;
                            if (getData[j] != getData[j + 1]) {
                                headData[k] = getData[j];
                                valueData[k] = (valueData[k] * 1) + 1;
                                k++;
                            } else {
                                valueData[k] = (valueData[k] * 1) + 1;
                            }
                            sumData += getData[j] * 1;
                            if (getData[j] >= (getMaxPointData[i] / 2)) {
                                moreThan++;
                            } else {
                                lessThan++;
                            }
                        }

                        avgData = sumData / (getData.length * 1);
                        findSd1 = 0;
                        checkPow = [];

                        for (j = 0; j < getData.length; j++) {
                            findSd1 += Math.pow(getData[j] - avgData, 2);
                            checkPow[j] = Math.pow(getData[j] - avgData, 2);
                        }
                        avgData = Math.round(avgData * 10000) / 10000;

                        findSd2 = findSd1 / (getData.length - 1);
                        findSd3 = Math.sqrt(findSd2);
                        findSd4 = Math.round(findSd3 * 10000) / 10000;

                        console.log(findSd1, findSd2);
                        console.log(checkPow);
                        console.log(headData);



                        new Chart(document.getElementById("score_show"), {
                            "type": "horizontalBar",
                            "data": {
                                //"labels": ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Grey"],
                                "labels": headData,
                                "datasets": [{
                                    "label": "People",
                                    "data": valueData,
                                    "fill": false,
                                    "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)",
                                        "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)",
                                        "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"
                                    ],
                                    "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)",
                                        "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"
                                    ],
                                    "borderWidth": 1
                                }]
                            },
                            "options": {
                                "scales": {
                                    "xAxes": [{
                                        "ticks": {
                                            "beginAtZero": true
                                        }
                                    }]
                                }
                            }
                        });
                        console.log(sumData);
                        html = '<table class="table table-striped mt-2"><tbody>';
                        html += '<tr><td>Student</td> <td>' + getData.length + '</td> <td>People</td> </tr>';
                        html += '<tr><td>Max</td> <td>' + Math.max(...getData) + '</td> <td>Point</td> </tr>';
                        html += '<tr><td>Min</td> <td>' + Math.min(...getData) + '</td> <td>Point</td> </tr>';
                        html += '<tr><td>Average</td> <td>' + avgData + '</td> <td>Point</td> </tr>';
                        html += '<tr><td>S.D.</td> <td>' + findSd4 + '</td> <td>Point</td> </tr>';
                        html += '<tr><td>Max Point</td> <td>' + getMaxPointData[i] + '</td> <td>Point</td> </tr>';
                        html += '<tr><td>More than or equal 50%</td> <td>' + moreThan + '</td> <td>People</td> </tr>';
                        html += '<tr><td>Less than 50%</td> <td>' + lessThan + '</td> <td>People</td> </tr>';
                        html += '</tbody></table>'
                        $('#f34r-here').html(html);
                        // console.log(getData);
                        // console.log(Math.max(...getData), 'max');
                        // console.log(Math.min(...getData), 'min');
                    });
                });
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
        textInPut = textInPut.replace(/\:/gi, "%3A");
        return textInPut;
    }

    $(document).ajaxStop(function () {
        ajaxCount++;
        //console.log('ajaxComplete', ajaxCount, formulaField); 
        if (ajaxCount >= 1 && formulaField > 0) {

            //console.log('---------------------ifCondition')
            //F34REXECUTION();
            //console.log(formulaMax);
            if (formulaMax == 1) {
                loopStart = pointData.length - formulaMax;
                loopStop = pointData.length;
            } else {
                loopStart = pointData.length - formulaMax + F34R;
                loopStop = pointData.length + (F34R - 1);
                F34R++;
            }
            formulaField--;

            loopStart = 0;
            loopStop = pointData.length;

            for (i = loopStart; i < loopStop; i++) { //FIELD 
                for (j = 0; j < bodyData.length; j++) { //STD  
                    //console.log(i, j);
                    if (pointData[i].setpoint_option == '2') {
                        setFormula = '';
                        // splitMax = pointData[i].setpoint_maxpoint.split(":");
                        // setMax = splitMax[1];
                        // getFormula = splitMax[0];
                        // if (pointData[i].setpoint_maxpoint.split(":").length == 1 || pointData[i].setpoint_maxpoint.split(":").length == undefined) {
                        //     getFormula = pointData[i].setpoint_maxpoint.split("#");
                        // } else if (pointData[i].setpoint_maxpoint.split(":").length == 2) {
                        //     splitFormula = pointData[i].setpoint_maxpoint.split(":");
                        //     console.log(splitFormula, '-------------------------------------------------');
                        //     getFormula = splitFormula[0];
                        //     getSumMaxFormula = splitFormula[1];
                        //     console.log(getSumMaxFormula);
                        // }
                        //console.log('split', bodyData[j].substd_stdid, pointData[i].setpoint_setpoint_id); 
                        splitFormula = pointData[i].setpoint_maxpoint.split(":");
                        getSumMaxFormula = null;
                        if (splitFormula.length == 1) {
                            getFormula = splitFormula[0].split("#");
                            getSumMaxFormula = null;
                        } else if (splitFormula.length == 2) {
                            getFormula = splitFormula[0].split("#");
                            getSumMaxFormula = splitFormula[1];
                        }
                        //console.log(splitFormula, 'SPLITTING FORMULA----------------------', splitFormula.length);


                        for (l = 0; l < getFormula.length; l++) {
                            for (k = 0; k < pointData.length; k++) { //CHECK ALL FIELD  
                                if (pointData[k].setpoint_mininame == getFormula[l]) {
                                    setFormula += $('#point-' + bodyData[j].substd_stdid + '-' + pointData[k].setpoint_setpoint_id).text();
                                    setFormula += getFormula[l + 1];
                                } else if (pointData[k].setpoint_mininame != getFormula[l] && l == 0 && k == 0) {
                                    setFormula += getFormula[l];
                                }
                            }
                        }
                        //console.log(setFormula);
                        setFormula = htmlEncodeF34R(setFormula);
                        takeFormula(bodyData[j].substd_stdid, pointData[i].setpoint_setpoint_id, setFormula, getSumMaxFormula);

                        // console.log('F34REXECUTION');
                        // if (!keeper[i]) keeper[i] = []
                        // keeper[i][keepCheck++] = [bodyData[i].substd_stdid, pointData[i].setpoint_setpoint_id, setFormula];
                    }

                }
            }
            //console.log(rowCount, colCount, formulaField);

        }
    });

    //'/' + url[3] + '/Te_table_score/takeFormula'
    function takeFormula(stdId, colId, takeFormula, sumMax) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_table_score/takeFormula',
            data: '&formula=' + '(' + takeFormula + ')',
            dataType: "json",
            success: function (getSum) {
                //console.log(stdId, colId);
                console.log('takeFormula->' + getSum[0].sum + '<-');
                //if (getSum[0].sum > formulaMaxPoint) getSum[0].sum = formulaMaxPoint;
                if (sumMax != null && getSum[0].sum * 1 >= sumMax) {
                    getSum[0].sum = sumMax;
                }
                $('#point-' + stdId + '-' + colId).text(getSum[0].sum * 1);

            }
        });
    }

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

    $('#download_PDF').click(function (e) {
        e.preventDefault();
        // var reportPageHeight = $('#reportPage').innerHeight();
        // var reportPageWidth = $('#reportPage').innerWidth();
        var canvas = document.getElementById('score_show');
        var imgData = canvas.toDataURL("image/png", 1.0);
        var pdf = new jsPDF("p", "cm", "a4");
        pdf.setFont('THSarabunNew');
        var margins = {
            top: 2.54,
            bottom: 2.54,
            left: 2.54
        };
        pdf.addImage(imgData, 'PNG', margins.left, margins.top, 16, 8);
        pdf.text('Hello ทด world!', margins.left, 12);
        pdf.text('Hello world!', margins.left, 12.7);
        pdf.save("download.pdf");

        // var pdf = new jsPDF('l', 'pt', [reportPageWidth, reportPageHeight]);
        // pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);

        // console.log(pdfCanvas);

        // filename = $('.modal-title').val();
        // pdf.save(filename + '.pdf');
    });
});