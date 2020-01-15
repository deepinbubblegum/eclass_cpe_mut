$(document).ready(function () {
    var url = $(location).attr('href').split("/");

    subjectMain();
    var dataMenu;
    var subIdOption = [];
    var subNameOption = [];

    var std_sub = [];
    var std_point = [];


    function subjectMain() {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Std_point_request/showSubjectMain",
            data: '&semester=' + semester,
            dataType: "json",
            success: function (response) {
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        subIdOption.push(response[i].subject_id);
                        subNameOption.push(response[i].subject_name);
                    }
                }
                console.log(subIdOption);
                ShowMenu();
            }
        });
    }

    function ShowMenu() {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Std_point_request/showMenu",
            data: '&semester=' + semester + '&subject_id=' + subject_id,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                var x = 0;
                if (response != null) {
                    // console.log(response);
                    dataMenu = response;
                    for (i = 0; i < response.length; i++) {
                        html += '<div class="expansion-panel list-group-item">' +
                            '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed text-left" data-toggle="collapse" href="#collapse' + i + '" id="' + response[i].menuPS_id + '">' +
                            '<div class="d-flex justify-content-start">' +
                            '<span class="text-left"> ' + response[i].menuPS_header + ' ( แลกได้ถึงวันที่ : ' + response[i].menuPS_date + ' ) </span>' +
                            '</div>' +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>' +
                            '<div aria-labelledby="' + response[i].menuPS_id + '" class="collapse" data-parent="#accordionMenu" id="collapse' + i + '">' +
                            '<div class="expansion-panel-body text-left">' +
                            'เลือกวิชาขอแลกคะแนน (จำนวน : ' + response[i].menuPS_num_subject + ' วิชา) <span id=PointStd> </span>';
                        for (a = 0; a < response[i].menuPS_num_subject; a++) {
                            x = a;
                            html += '<div class="form-row" >' +
                                '<div class="col-md-6 mb-3" >' +
                                '<select class="custom-select" id="selctSub' + response[i].menuPS_id + a + '" >' +

                                '</select>' +
                                '</div>' +
                                '</div>';
                        }
                        // 'จำนวนวิชาที่แลกได้ : ' + response[i].menuPS_num_subject +
                        // '<br>' +
                        // 'แลกคะแนนได้ถึงวันที่ : ' + response[i].menuPS_date +
                        // '<br>' +
                        // 'ช่องคะแนน : ' + response[i].setpoint_fullname +
                        html += '<button type="button" class="btn btn-info ml-1 mr-1" id="RequestSave' + i + '" data-1="' + response[i].menuPS_setpointID + '"> ขอแลกคะแนน </button>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        showTableHead(response[i].menuPS_pointID, response[i].menuPS_setpointID, i);
                    }
                }
                $('#accordionMenu').html(html);
                SubjectOption();
                $.each(dataMenu, function (i) {
                    $('#RequestSave' + i).click(function () {
                        chk = 0;
                        menu_id = '';
                        std_sub = [];
                        std_point = [];
                        id = $(this).attr('data-1');
                        point = $('#point-' + ID_STD + '-' + id).text();
                        if (point != 0) {
                            for (x = 0; x < dataMenu.length; x++) {
                                if (x == i) {
                                    menu_id = dataMenu[x].menuPS_id;
                                    for (y = 0; y < dataMenu[x].menuPS_num_subject; y++) {
                                        if (std_sub.includes($('#selctSub' + dataMenu[x].menuPS_id + y).val()) == false) {
                                            std_sub.push($('#selctSub' + dataMenu[x].menuPS_id + y).val());
                                            std_point.push(point);
                                        } else {
                                            Snackbar.show({
                                                actionText: 'close',
                                                pos: 'top-center',
                                                actionTextColor: '#FF0000',
                                                backgroundColor: '#323232',
                                                width: 'auto',
                                                text: 'ห้ามเลือกวิชาซ้ำกัน'
                                            });
                                            chk = 1;
                                        }
                                    }
                                }
                            }

                            if (chk != 1) {
                                AddSubSTD(std_sub, std_point, menu_id);
                            }
                        } else {
                            Snackbar.show({
                                actionText: 'close',
                                pos: 'top-center',
                                actionTextColor: '#FF0000',
                                backgroundColor: '#323232',
                                width: 'auto',
                                text: 'ท่านไม่มีคะแนนสำหรับแลก'
                            });
                        }
                        // console.log(std_sub);
                        // console.log(std_point);
                    });
                });
            }
        });
    }

    function SubjectOption() {
        var html = '';
        var idmenu = '';
        for (i = 0; i < dataMenu.length; i++) {
            idmenu = dataMenu[i].menuPS_id
            for (y = 0; y < dataMenu[i].menuPS_num_subject; y++) {
                html = '';
                for (a = 0; a < subIdOption.length; a++) {
                    html += '<option value="' + subIdOption[a] + '"> (' + subIdOption[a] + ') ' + subNameOption[a] + ' </option>';
                }
                $('#selctSub' + idmenu + y).html(html);
                subjectMain2(idmenu, y)
            }
        }
    }


    function subjectMain2(idmenu, y) {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Std_point_request/showSubjectAdd",
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&menuId=' + idmenu,
            dataType: "json",
            success: function (response) {
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        $('#selctSub' + idmenu + y).append('<option value="' + response[i].subject_id + '"> (' + response[i].subject_id + ') ' + response[i].subject_name + ' </option>');
                    }
                }
            }
        });
    }

    function AddSubSTD(std_sub, std_point, menu_id) {
        // alert(std_sub);
        //alert(menu_id);
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Std_point_request/AddSubStd",
            data: {
                subject_id,
                semester,
                std_sub,
                std_point,
                menu_id
            },
            dataType: "json",
            success: function (response) {
                // alert(response);
                if (response == 1) {
                    Snackbar.show({
                        actionText: 'close',
                        pos: 'top-center',
                        actionTextColor: '#0071c5',
                        backgroundColor: '#323232',
                        width: 'auto',
                        text: 'บันทึกข้อมูลแล้ว'
                    });
                } else if (response == 0) {
                    Snackbar.show({
                        actionText: 'close',
                        pos: 'top-center',
                        actionTextColor: '#FF0000',
                        backgroundColor: '#323232',
                        width: 'auto',
                        text: 'ท่านได้ทำการแลกคะแนนแล้ว'
                    });
                } else {
                    Snackbar.show({
                        actionText: 'close',
                        pos: 'top-center',
                        actionTextColor: '#FF0000',
                        backgroundColor: '#323232',
                        width: 'auto',
                        text: 'หมดเวลาในการขอแลกคะแนนแล้ว'
                    });
                }
            }
        });
    }


    /* --------------------------------------------------------CALCULATOR SOCRE-------------------------------------------------------------------------------- */

    var url = $(location).attr('href').split("/");


    htmlTbody = '';
    pointData = [];
    bodyData = [];
    getFieldPoint = [];
    getMaxPointData = [];

    function showTableHead(point_id, setpointID) { //tableScoreZone
        // alert(setpointID);
        takeThisUrl = '/' + url[3] + '/Std_point_request/showTableHeader';
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
                    console.log(pointData);
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
                showTableBody(point_id, setpointID);
            },
        });
    }

    var ID_STD;

    function showTableBody(point_id, setpointID) { //tableScoreZone
        takeThisUrl = '/' + url[3] + '/Std_point_request/showStd';
        $.ajax({
            type: "POST",
            url: takeThisUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&point_id=' + point_id,
            dataType: "json",
            success: function (response) {
                console.log('showTableBody');
                console.log(response);
                html = '';
                bodyData = response;
                if (response.length != undefined) {
                    for (i = 0; i < response.length; i++) {
                        html += '<tr>';
                        html += '<th scope="col">' + response[i].std_code_id + '</th>';
                        for (j = 0; j < pointData.length; j++) {
                            ID_STD = response[i].std_code_id;
                            html += '<th id="point-' + response[i].std_code_id + '-' + pointData[j].setpoint_setpoint_id + '">0</th>';
                        }

                        //html += '<th id="sum-' + response[i].std_code_id + '">0</th>';
                        html += '</tr>';
                    }
                } else {
                    html = '<label>NO DATA</label>';
                }
                $('#tbodyScoreZone').html(html);
                showPoint(point_id, setpointID);
            },
        });
    }

    formulaField = 0;
    formulaMax = 0;


    function showPoint(point_id, setpointID) { //tableScoreZone
        takeThisUrl = '/' + url[3] + '/Std_table_score/showPoint';
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
                        getPoint = $('#point-' + bodyData[i].std_code_id + '-' + pointData[j].setpoint_setpoint_id);
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
                        //console.log('split', bodyData[j].std_code_id, pointData[i].setpoint_setpoint_id); 
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
                                    setFormula += $('#point-' + bodyData[j].std_code_id + '-' + pointData[k].setpoint_setpoint_id).text();
                                    setFormula += getFormula[l + 1];
                                } else if (pointData[k].setpoint_mininame != getFormula[l] && l == 0 && k == 0) {
                                    setFormula += getFormula[l];
                                }
                            }
                        }
                        //console.log(setFormula);
                        setFormula = htmlEncodeF34R(setFormula);
                        // alert(pointData[i].setpoint_id);
                        takeFormula(bodyData[j].std_code_id, pointData[i].setpoint_setpoint_id, setFormula, getSumMaxFormula, pointData[i].setpoint_id);

                        // console.log('F34REXECUTION');
                        // if (!keeper[i]) keeper[i] = []
                        // keeper[i][keepCheck++] = [bodyData[i].std_code_id, pointData[i].setpoint_setpoint_id, setFormula];
                    }

                }
            }
            //console.log(rowCount, colCount, formulaField);

        }
    });

    var pointSTD;
    //'/' + url[3] + '/Std_table_score/takeFormula'
    function takeFormula(stdId, colId, takeFormula, sumMax, setpointID) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Std_table_score/takeFormula',
            data: '&formula=' + '(' + takeFormula + ')',
            dataType: "json",
            success: function (getSum) {
                //console.log(stdId, colId);
                console.log('takeFormula->' + getSum[0].sum + '<-');
                //if (getSum[0].sum > formulaMaxPoint) getSum[0].sum = formulaMaxPoint;
                if (sumMax != null && getSum[0].sum * 1 >= sumMax) {
                    getSum[0].sum = sumMax;
                }
                // alert(getSum[0].sum);
                $('#point-' + stdId + '-' + colId).text(getSum[0].sum * 1);
            }
        });
    }

    F34R = 0;

});