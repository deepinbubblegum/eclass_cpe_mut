$(document).ready(function () {
    
    year = semester.substr(0, 4);
    part = semester.substr(4, 1);
    $('#header').text('แบบสำรวจ : ' + subject_id + ' - ' + year + '/' + part);

    function SnackCall(SnackText){
        Snackbar.show({
            actionText: 'close',
            pos: 'top-center',
            actionTextColor: '#4CAF50',
            backgroundColor: '#323232',
            width: 'auto',
            text: SnackText
        });
    }

    var url = $(location).attr('href').split("/");
    var editMenuId = '';
    var fieldSaveUrl = '';
    var getField = [];
    var getPoint = [];
    var studentCount = 0;
    var studentVoted = 0;
    var SHeadID = '';

    selectStudent();
    showMenuVote();
    

    function showMenuVote() {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_vote/showMenuVote/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                getMenu = response;
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) { 
                            if (response[i].menuVoteStatus == '1') {
                                console.log('somthing blocked');
                            } else if (response[i].menuVoteStatus == '0'){
                                html +=
                                    '<div class="expansion-panel list-group-item success-color" >' +
                                    '<a aria-controls="collapse' + response[i].menuVoteId + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapse' + response[i].menuVoteId + '" id="heading' + response[i].menuVoteId + '">' +
                                    response[i].menuVoteName +
                                    '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                    '<span style="color: Dodgerblue;" id="success-icon-' + response[i].menuVoteId + '">' +

                                    '</span>' +
                                    '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                    '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                    '</div>' +
                                    '</a>' +
                                    '<div aria-labelledby="heading' + response[i].menuVoteId + '" class="collapse" data-parent="#accordionOne" id="collapse' + response[i].menuVoteId + '">' +
                                    '<div class="expansion-panel-body">';
                                    //----  BUTTON  ----
                                    //html += '<span style="font-size: 1.7em;"><a title="ดูผลสำรวจ" id="showScoreMenu-' + response[i].menuVoteId + '" href="#" class="f34r-txt-black"><i class="fas fa-chart-bar"></a></i></span>&nbsp;' ;
                                    html += '<span id="buttonHere-'+response[i].menuVoteId+'"></span>';
                                    //----  BUTTON  ----
                                    html+=
                                    '<br>' +
                                    response[i].menuVoteDescription +
                                    '<hr>' +
                                    '<table class="table table-bordered">' +
                                    '<ol id="fieldOlTag-' + response[i].menuVoteId + '">' +

                                    '</ol>' +
                                    '</table>' +
                                    '<button type="button" class="btn btn-info mt-3" id="btnSend-' + response[i].menuVoteId + '"' + '>บันทึกข้อมูล</button>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                            } 
                    }
                }
                $('.showMenuVote').html(html);
                $.each(getMenu, function (i, p) {
                    if (response[i].menuVoteStatus == '0'){
                        showChoice(getMenu[i].menuVoteId);
                        $('#btnSend-' + getMenu[i].menuVoteId).click(function (e) {
                            console.log('RINKAFU - ' + getMenu[i].menuVoteId);
                            radioElement = document.querySelector('input[name="test-' + getMenu[i].menuVoteId + '"]:checked');
                            choiceId = radioElement.value;
                            console.log(choiceId);

                            $.ajax({
                                type: "POST",
                                url: '/' + url[3] + '/Std_subject_vote/insertPoint',
                                data: '&semester=' + semester + '&subject=' + subject_id + '&menuId=' + getMenu[i].menuVoteId + '&choiceId=' + choiceId,
                                success: function () {
                                    SnackCall('บันทึกสำเร็จ');
                                    selectPoint(getMenu[i].menuVoteId);
                                },
                                error: function () {
                                    SnackCall('บันทึกไม่สำเร็จ');
                                }
                            });
                        });
                    }
                });

            }
        });
    }

    function showChoice(mVoteId) {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_vote/showVoteField/' + subject_id + '-' + semester + '-' + mVoteId,
            dataType: "json",
            success: function (response) { 
                var html = "";
                if (!getField[mVoteId]) getField[mVoteId] = []
                getField[mVoteId] = response;
                if (response.length != undefined) {
                    for (i = 0; i < response.length; i++) { 
                        // html += '<h4><li class="">' + response[i].choiceVoteText + '</li></h4>' +
                        //     //'<span style="font-size: 1.5em;"><a href="#" title="เพิ่มตัวเลือกแบบสำรวจ" id="addChoiceVote-' + mVoteId + '-' + response[i].choiceVoteId + '"class="f34r-txt-black"><i class="fas fa-plus-square"></i></a></span>&nbsp;' +
                        //     '<ol id="fieldOlTagChild-' + mVoteId + '-' + response[i].choiceVoteId + '">' +
                        //     '</ol>';
                        html += '<label class="mt-2">' +
                            '<input type="radio" name="test-' + mVoteId + '" class="card-input-element d-none" value="' + response[i].choiceVoteId + '"' + '>' +
                            '<div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center">' +
                            '<h5>' + response[i].choiceVoteText + '</h5>' +
                            '</div>' +
                            '</label>';
                    }
                } else {
                    html += '<h1>NO DATA</h1>'
                }
                $('#fieldOlTag-' + mVoteId).html(html); 
                $.each(getField[mVoteId], function (i, p) {
                    //console.log(mVoteId, getField[mVoteId][i].choiceVoteId);
                    showPoint(mVoteId, getField[mVoteId][i].choiceVoteId);
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }
    ajaxCount = 0;
    $(document).ajaxStop(function () {
        if (ajaxCount == 0) {
            console.log('ajax0');
            $.each(getMenu, function (i, p) {
                selectPoint(getMenu[i].menuVoteId);
            });

        }
        console.log('ajaxStop' + ajaxCount);
        ajaxCount++;
    });

    // function refresherRecipe(){

    // } 

    function refresher(subject_id,semester,menuId){ 
        /////////////////////////////
        // interRefresh = setInterval(function(){
        //////////////////////////////
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Std_subject_vote/refresherOrb/',
            dataType: "json",
            data: {
                semester: semester,
                subject: subject_id,
                menuId: menuId
            },
            success: function (response) { 
                console.log('REFRESH')
                console.log(response);
                console.log('REFRESH')
                if (response.length != undefined) { 
                    rfhStudentMax = response[2][0].studentCount;
                    rfhChoiceText = [];
                    rfhStdVote = [];
                    rfhSum = 0

                    for (i = 0; i < response[0].length; i++) {  
                        rfhChoiceText[i] = response[0][i].choiceVoteText;
                    }

                    for (i = 0; i < response[1].length; i++) {  
                        rfhStdVote[i] = response[1][i].countStd; 
                        rfhSum += response[1][i].countStd*1;
                    }

                    console.log(rfhStdVote);

                        notVote = (rfhStudentMax*1) - (rfhSum*1);

                        char.data.labels = rfhChoiceText;
                        char.data.datasets[0].data = rfhStdVote;
                        // char.addData(rfhStdVote);
                        char.update();
                        $("#studentCount").text(rfhStudentMax);
                        $("#studentVoted").text(rfhStudentMax );
                        $("#notVote").text(notVote);

                    // for (j = 0; j < rfhStdVote.length; j++) {  
                            
                    // }
                    console.log(rfhChoiceText);
                    console.log(rfhStdVote);
                } 
            }
        });
        /////////////////////////////
        // }
        // ,2000);  
        /////////////////////////////
    }

    function selectPoint(thisMenuId) {
        //console.log('selectPoint(thisMenuId)', thisMenuId);
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Std_subject_vote/selectPoint',
            data: '&semester=' + semester + '&subject=' + subject_id + '&menuId=' + thisMenuId,
            dataType: "json",
            success: function (response) { 
                
                html = htmlButton = '';
                if (response.length != undefined) {
                    htmlButton += '<span style="font-size: 1.7em;"><a title="ดูผลสำรวจ" id="showScoreMenu-' + thisMenuId + '" href="#" class="f34r-txt-black"><i class="fas fa-chart-bar"></a></i></span>&nbsp;' ;
                    html += '<i title="โหวดเรียบร้อยแล้ว" class="fas fa-check-circle success-color">โหวดเรียบร้อยแล้ว</i>';
                    $('#btnSend-' + thisMenuId).attr("disabled", true);
                    console.log(response[0].pointVoteChoiceVoteId);
                    $('input[name="test-' + thisMenuId + '"][value="' + response[0].pointVoteChoiceVoteId + '"]').attr('checked', true);
                    $('input[name="test-' + thisMenuId + '"]').attr('disabled', true);
                }
                $('#success-icon-' + thisMenuId).html(html);
                $('#buttonHere-' + thisMenuId).html(htmlButton);
                ////////////////////////////////////////////////////
                chartCheck = 0;
                $('#showScoreMenu-' + thisMenuId).click(function (e) {
                    console.log('#showScoreMenu-' + thisMenuId);
                    chartCheck++;
                            if(chartCheck > 1){
                                char.destroy(); 
                                clearInterval(interRefresh);
                            }
                    $("#showScoreModal").modal('show');
                    $("#scoreModalLabel").text('ผลสำรวจ');
                    
                    //---------------------------------------------------------------
                    //console.log(getField[thisMenuId]);
                    //console.log(getField[thisMenuId].choiceVoteText);
                    if (getField[thisMenuId] != null) {
                        getName = [];
                        for (j = 0; j < getField[thisMenuId].length; j++) {
                            getName[getField[thisMenuId][j].choiceVoteId] = getField[thisMenuId][j].choiceVoteText;
                        } 
                    }
    
                    var newAName = getName.filter(function (el) {
                        return el != null;
                    });
     
                    var newAPoint = getPoint[thisMenuId].filter(function (el) {
                        return el != null;
                    }); 
    
                      console.log(newAName);
                      console.log(newAPoint);
                      console.log('--------');
                    char = new Chart(document.getElementById("score_show"), {
                        "type": "horizontalBar",
                        "data": {
                            //"labels": ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Grey"],
                            "labels": newAName,
                            "datasets": [{
                                "label": "People",
                                "data":  newAPoint,
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
                    studentVoted = 0;
                    for (p = 0; p < newAPoint.length; p++) {
                        studentVoted = studentVoted + (newAPoint[p]*1);
                    }
                    notVote = (studentCount*1) - (studentVoted*1);
    
                    html2 = '<table class="table table-striped mt-2"><tbody>';
                    html2 += '<tr><td>Student</td><td><span id="studentCount">' + studentCount + '</span></td><td>People</td> </tr>'; 
                    html2 += '<tr><td>Voted</td><td><span id="studentVoted">' + studentVoted + '</span></td><td>People</td> </tr>'; 
                    html2 += '<tr><td>No Vote</td><td><span id="notVote">' + notVote + '</span></td><td>People</td> </tr>'; 
                    html2 += '</tbody></table>'
                    $('#f34r-here').html(html2);

                    //var Refresh = setInterval(refresher(subject_id,semester,thisMenuId), 1000); 
                    // refresher(subject_id,semester,thisMenuId);

                    interRefresh = setInterval(function(){
                        refresher(subject_id,semester,thisMenuId);
                    },2000);

                });
                ////////////////////////////////////////////////////
            }
        });
    }

    function showPoint(menuId, fieldId) {
        $.ajax({
            url: '/' + url[3] + '/Std_subject_vote/showPoint/' + subject_id + '-' + semester + '-' + menuId + '-' + fieldId,
            dataType: "json",
            success: function (response) {
                if (!getPoint[menuId]) 
                getPoint[menuId] = []
                var html = ""; 
                if (response.length != undefined) {
                    //html += '[' + response[0].stdCount + '/' + studentCount + ']';
                    getPoint[menuId][fieldId] = response[0].stdCount;
                } else {
                    html += '<h1>NO DATA</h1>'
                }
                $('#fieldOlTagChild-' + menuId + '-' + fieldId).html(html);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }

    function selectStudent() {
        $.ajax({
            url: '/' + url[3] + '/Std_subject_vote/getStudent/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                studentCount = response[0].studentCount;
            }
        });
    }
    /*
html += '<label class="mt-2">' +
                            '<input type="radio" name="test-' + mVoteId + '" class="card-input-element d-none" value="' + i + '"' + disabler + '>' +
                            '<div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center">' +
                            '<h5>' + response[i].choiceQuizText + '</h5>' +
                            '</div>' +
                            '</label>';
    */
});