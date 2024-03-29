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
    var element = document.getElementById("quiz");
    element.classList.add("bg-info");
    var element = document.getElementById("side_quiz");
    element.classList.add("bg-info");
    /******************************************************************** */


    var url = $(location).attr('href').split("/");
    var getField = [];
    var getUnit = [];
    var randChoice = [];
    var checkMenu = [];
    var menuStatus = [];
    var getMenu = [];
    selectCheck();
    showMenuQuiz();
    $('#btnModalSave').click(function (e) {
        var test = document.querySelector('input[name="test"]:checked').value;
        //console.log(test);
    });

    function selectCheck() {
        $.ajax({
            url: '/' + url[3] + '/Std_subject_quiz/selectCheck/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                checkMenu = response;
                console.log(response);
            }
        });
    }

    function showMenuQuiz() {
        $.ajax({
            url: '/' + url[3] + '/Std_subject_quiz/showMenuQuiz/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                getMenu = response;
                var html = '';

                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        footerText = '';
                        if (response[i].menuQuizTime == "0000-00-00 00:00:00") {
                            footerText = "ไม่กำหนดเวลา";
                        } else {
                            footerText = response[i].menuQuizTime;
                        }

                        disabler1 = disabler2 = '';
                        if (response[i].tnow > response[i].menuQuizTime) {
                            console.log(response[i].menuQuizName, 'Overtime');
                        }
                        if (response[i].menuQuizStatus.substr(1, 1) == '1') {
                            disabler1 = '<span class="text-danger">- แบบทดสอบถูกปิด -</span>';
                            disabler2 = 'disabled';
                        } else if (getMenu[i].menuQuizTime != "0000-00-00 00:00:00") {

                            // if (response[i].menuQuizName == 'Quiz5') console.log('STAGE 1', response[i].menuQuizStatus.substr(1, 1)); //checked
                            if (response[i].tnow > response[i].menuQuizTime) {
                                // if (response[i].menuQuizName == 'Quiz5') console.log('STAGE 2', getMenu[i].menuQuizTime, response[i].tnow);

                                // if (response[i].menuQuizName == 'Quiz5') console.log('STAGE 3');
                                disabler1 = '<span class="text-danger">- แบบทดสอบถูกปิด(เวลาเกิน) -</span>';
                                disabler2 = 'disabled';
                            }

                        }
                        // } else if (response[i].menuQuizStatus.substr(1, 1) == '0'){ 
                        //     disabler1 = disabler2 = '';
                        html +=
                            '<div class="expansion-panel list-group-item">' +
                            '<a aria-controls="collapse' + getMenu[i].menuQuizId + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapse' + getMenu[i].menuQuizId + '" id="heading' + getMenu[i].menuQuizId + '">' +
                            response[i].menuQuizName + disabler1 +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<span style="color: Dodgerblue;" id="success-icon-' + response[i].menuQuizId + '">' +

                            '</span>' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>' +
                            '<div aria-labelledby="heading' + getMenu[i].menuQuizId + '" class="collapse" data-parent="#accordionOne" id="collapse' + getMenu[i].menuQuizId + '">' +
                            '<div class="expansion-panel-body">' +
                            '<h3>' + response[i].menuQuizDescription + '</h3><hr>' +

                            '<span id="headerHere-' + getMenu[i].menuQuizId + '">' +

                            '</span>';

                        // '<span id="choiceHere-' + getMenu[i].menuQuizId + '">' +
                        // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                        // '<label class="mt-2">' +
                        // '<input type="radio" name="test-' + response[i].menuQuizId + '" class="card-input-element d-none" value="1">' +
                        // '<div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center">' +
                        // '<h5>2 ขา</h5>' +
                        // '</div>' +
                        // '</label>' +

                        // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                        // '</span>' +
                        if ((getMenu[i].menuQuizStatus.substr(1, 1) == '0')) {
                            if ((getMenu[i].tnow < getMenu[i].menuQuizTime) || (getMenu[i].menuQuizTime == '0000-00-00 00:00:00')) {
                                html += '<button type="button" class="btn btn-info mt-3" id="btnSend-' + response[i].menuQuizId + '"' + disabler2 + '>บันทึกข้อมูล</button>';
                            }
                        }

                        html += '</div>';
                        if ((getMenu[i].menuQuizStatus.substr(1, 1) == '0')) {
                            if ((getMenu[i].tnow < getMenu[i].menuQuizTime) || (getMenu[i].menuQuizTime == '0000-00-00 00:00:00')) {

                                html += '<div class="navdrawer-divider"></div>' +
                                    '<div class="d-flex text-muted">' +
                                    '<div class="p-2"> <small class="ml-2 my-1"></small> </div>' +
                                    '<div class="ml-auto p-2"> <small class="mr-2 my-1"> สิ้นสุดเวลาทำแบบทดสอบ : ' + footerText + '</small> </div>' +
                                    '</div>';
                            }
                        }
                        html += '</div>' +
                            '</div>';
                        // } 
                    }
                }
                $('.showMenuQuiz').html(html);
                console.log('---');
                $.each(getMenu, function (i, p) {
                    //console.log(getMenu[i].menuQuizStatus.substr(0, 1), '0-1');
                    //console.logg(getMenu[i].menuQuizStatus.substr(1, 1), '1-1');
                    //console.logg(getMenu[i].menuQuizStatus.substr(2, 1), '2-1');
                    //console.logg(getMenu[i].menuQuizStatus.substr(3, 1), '3-1');
                    if ((getMenu[i].menuQuizStatus.substr(1, 1) == '0')) {
                        if ((getMenu[i].tnow < getMenu[i].menuQuizTime) || (getMenu[i].menuQuizTime == '0000-00-00 00:00:00')) {
                            menuStatus[getMenu[i].menuQuizId] = getMenu[i].menuQuizStatus;

                            randChoice[getMenu[i].menuQuizId] = '';
                            if (getMenu[i].menuQuizStatus.substr(0, 1) == '1') { //check rand
                                randChoice[getMenu[i].menuQuizId] = 'randQuizChoice';
                            } else {
                                randChoice[getMenu[i].menuQuizId] = 'showQuizChoice';
                            }
                            if (getMenu[i].menuQuizStatus.substr(0, 1) == '1') {
                                console.log('randQuizChoice');
                            } else {
                                console.log('showQuizChoice');
                            }
                            showHeader(getMenu[i].menuQuizId);
                        }
                    }
                    // $('#btnSend-' + getMenu[i].menuQuizId).click(function(e) {
                    //     var test = document.querySelector('input[name="test-' + response[i].menuQuizId + '"]:checked').value;
                    // //console.log(test);
                    // });
                });
            }
        });
    }

    function showHeader(mQuizId) {
        $.ajax({
            url: '/' + url[3] + '/Std_subject_quiz/showQuizField/' + subject_id + '-' + semester + '-' + mQuizId,
            dataType: "json",
            success: function (response) {
                var html = "";
                if (!getField[mQuizId]) getField[mQuizId] = []
                getField[mQuizId] = response;
                if (response.length != undefined) {
                    if (menuStatus[mQuizId].substr(1, 1) == '1') { //check disable
                        disabler = '*แบบทดสอบนี้จะไม่ถูกบันทึกคะแนน';
                    } else {
                        disabler = '';
                    }
                    for (i = 0; i < response.length; i++) {
                        html += '<h4>' + (i * 1 + 1) + ') ' + response[i].headerQuizName + disabler + '</h4>' +
                            '<span id="choiceHere-' + mQuizId + '-' + response[i].headerQuizId + '"></span>';
                    }
                } else {
                    html += '<h1>NO DATA</h1>'
                }
                $('#headerHere-' + mQuizId).html(html);
                $.each(getField[mQuizId], function (i, p) {
                    showChoice(mQuizId, getField[mQuizId][i].headerQuizId);
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }

    function showChoice(CMenuID, CHeaderID) {
        //console.log('headerQuizName');
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Std_subject_quiz/' + randChoice[CMenuID] + '/' + subject_id + '-' + semester + '-' + CMenuID + '-' + CHeaderID,
            dataType: "json",
            success: function (response) {
                if (!getUnit[CMenuID]) getUnit[CMenuID] = []
                if (!getUnit[CMenuID][CHeaderID]) getUnit[CMenuID][CHeaderID] = []
                getUnit[CMenuID][CHeaderID] = response;
                var html = "";
                //console.log(response.length, '#choiceHere-' + CMenuID + '-' + CHeaderID);
                if (response.length != undefined) {
                    if (menuStatus[CMenuID].substr(1, 1) == '1') { //check disable
                        disabler = 'disabled';
                    } else {
                        disabler = '';
                    }
                    for (i = 0; i < response.length; i++) {
                        html += '<label class="mt-2">' +
                            '<input type="radio" name="test-' + CMenuID + '-' + CHeaderID + '" class="card-input-element d-none" value="' + response[i].choiceQuizId + '"' + disabler + '>' +
                            '<div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center">' +
                            '<h5>' + response[i].choiceQuizText;
                        // html += ' ['+response[i].choiceQuizPoint+']';
                        if (menuStatus[CMenuID].substr(2, 1) == '1') { //check enable
                            html += '[' + response[i].choiceQuizPoint + ']';
                        }

                        html += '</h5></div>' +
                            '</label>';
                    }
                } else {
                    html += '<div>[ NO DATA ]</div>'
                }
                html += '<hr>';
                $('#choiceHere-' + CMenuID + '-' + CHeaderID).html(html);

                // if (menuStatus[CMenuID].substr(1, 1) == '0') { //check disable
                // //console.log('disabled:true', menuStatus[CMenuID].substr(1, 1));
                //     $('input[name="test-' + CMenuID + '-' + CHeaderID + '"]').attr('disabled', true);
                // } else {
                // //console.log('disabled:false', menuStatus[CMenuID].substr(1, 1));
                //     $('input[name="test-' + CMenuID + '-' + CHeaderID + '"]').attr('disabled', false);
                // }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }
    ajaxCount = 0;
    $(document).ajaxStop(function () {
        //console.log('AJAX HAS BEEN STOPPED-' + ajaxCount);
        if (ajaxCount <= 0) { 
            $.each(getMenu, function (i, p) {
                for (f34r = 0; f34r < checkMenu.length; f34r++) {
                    if (checkMenu[f34r].pointQuizMenuQuizId * 1 == getMenu[i].menuQuizId * 1) {
                        showScore(getMenu[i].menuQuizId);
                    }
                }

                $('#btnSend-' + getMenu[i].menuQuizId).click(function (e) {
                    var k = '';
                    var getPoint = [];
                    var getChoice = [];
                    //console.logg(getField[getMenu[i].menuQuizId]);
                    for (j = 0; j < getField[getMenu[i].menuQuizId].length; j++) {
                        getChoice[j] = getField[getMenu[i].menuQuizId][j].headerQuizId;
                        getPoint[j] = "-1";
                        //console.log('name="test-' + getMenu[i].menuQuizId + '-' + getField[getMenu[i].menuQuizId][j].headerQuizId + '"');
                        //test = document.querySelector('input[name="test-' + getMenu[i].menuQuizId + '-' + getField[getMenu[i].menuQuizId][j].headerQuizId + '"]:checked').value;
                        radioElement = document.querySelector('input[name="test-' + getMenu[i].menuQuizId + '-' + getField[getMenu[i].menuQuizId][j].headerQuizId + '"]:checked');
                        if (radioElement != null) {
                            // k = radioElement.value;
                            // getPoint[j] = getUnit[getMenu[i].menuQuizId][getField[getMenu[i].menuQuizId][j].headerQuizId][k].choiceQuizId;
                            getPoint[j] = radioElement.value;
                        }
                        //console.log(getPoint[j]);

                    }
                    //console.log('----');
                    //console.logg(getPoint);
                    //console.logg(getChoice); 
                    //console.log('#btnSend-' + getMenu[i].menuQuizId);

                    result = getPoint.filter((getPoint) => {
                        return getPoint == '-1';
                    });
                    if (result.length > 0) {
                        // if (confirm('ท่านยังทำไม่ครบทุกข้อ จะยืนยันการส่งหรือไม่?')) {
                        //     //console.log('saved');
                        //     f34check = true;
                        // } else {
                        //     //console.log('close');
                        //     f34check = false;
                        // }
                        alert('ท่านยังทำไม่ครบทุกข้อ');
                        f34check = false;
                    } else {
                        f34check = true;
                    }

                    if (getMenu[i].menuQuizStatus.substr(1, 1) == '1') { //check disable
                        alert('แบบทดสอบถูกปิดแล้ว');
                        f34check = false;
                    }

                    if (f34check) {
                        $.ajax({
                            type: "POST",
                            url: '/' + url[3] + '/Std_subject_quiz/insertPoint',
                            data: '&semester=' + semester + '&subject=' + subject_id + '&menuId=' + getMenu[i].menuQuizId + '&headId=' + getChoice + '&pointId=' + getPoint,
                            success: function () {
                                alert('บันทึกสำเร็จ');
                                showScore(getMenu[i].menuQuizId);
                            },
                            error: function () {
                                alert('บันทึกไม่สำเร็จ');
                            }
                        });
                    }

                });
            });
        }
        ajaxCount++;
    });

    function showScore(thisMenuId) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Std_subject_quiz/showScore',
            data: '&semester=' + semester + '&subject=' + subject_id + '&menuId=' + thisMenuId,
            dataType: "json",
            success: function (response) {
                console.log('showScore');
                console.log(response);
                html = '';
                if (response.length != undefined) {
                    html += '<i title="ทำควิซเรียบร้อยแล้ว" class="fas fa-check-circle success-color">ทำควิซเรียบร้อยแล้ว</i>';
                    $('#btnSend-' + thisMenuId).attr("disabled", true);

                    for (i = 0; i < response.length; i++) {  
                        $('input[name="test-' + thisMenuId +'-'+response[i].pointQuizHeaderQuizId+ '"][value="' + response[i].pointQuizChoiceQuizId + '"]').attr('checked', true);
                        $('input[name="test-' + thisMenuId +'-'+response[i].pointQuizHeaderQuizId+ '"]').attr('disabled', true);
                    }

                }
                $('#success-icon-' + thisMenuId).html(html);
            }
        });
    }
});