$(document).ready(function() {
    var url = $(location).attr('href').split("/");
    var getField = [];
    var getUnit = [];
    var randChoice = [];
    var checkMenu = [];
    var menuStatus = [];
    selectCheck();
    showMenuQuiz();
    $('#btnModalSave').click(function(e) {
        var test = document.querySelector('input[name="test"]:checked').value;
        //console.log(test);
    });

    function selectCheck() {
        $.ajax({
            url: '/' + url[3] + '/Std_subject_quiz/selectCheck/' + subject_id + '-' + semester,
            dataType: "json",
            success: function(response) {
                checkMenu = response;
                console.log(response);
            }
        });
    }

    function showMenuQuiz() {
        $.ajax({
            url: '/' + url[3] + '/Std_subject_quiz/showMenuQuiz/' + subject_id + '-' + semester,
            dataType: "json",
            success: function(response) {
                getMenu = response;
                var html = '';
                
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        disabler1 = disabler2 = '';
                        if (response[i].menuQuizStatus.substr(1, 1) == '1') {
                            disabler1 = '*แบบทดสอบถูกปิดแล้ว';
                            disabler2 = 'disabled';
                        } else if (response[i].menuQuizStatus.substr(1, 1) == '0'){ 
                            disabler1 = disabler2 = '';
                            html +=
                            '<div class="expansion-panel list-group-item success-color" >' +
                            '<a aria-controls="collapse' + getMenu[i].menuQuizId + '" aria-expanded="true" class="sortableMenu expansion-panel-toggler collapsed" data1="' + response[i].menuQuizId + '" data-toggle="collapse" href="#collapse' + getMenu[i].menuQuizId + '" id="heading' + getMenu[i].menuQuizId + '">' +
                            response[i].menuQuizName +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>' +
                            '<div aria-labelledby="heading' + getMenu[i].menuQuizId + '" class="collapse" data-parent="#accordionOne" id="collapse' + getMenu[i].menuQuizId + '">' +
                            '<div class="expansion-panel-body">' +
                            /* --------BTN-------- */
                            // '<span style="font-size: 1.7em;"><a title="สร้างหัวข้อแบบทดสอบ" id="addInMenu-' + response[i].menuQuizId + '" href="#" class="f34r-txt-black"><i class="fas fa-plus-square"></a></i></span>&nbsp;' +
                            // '<span style="font-size: 1.7em;"><a title="ลบเมนูแบบทดสอบ" id="delMenu-' + response[i].menuQuizId + '" href="#" class="f34r-txt-black"><i class="fas fa-trash-alt"></a></i></span>&nbsp;' +
                            // '<span style="font-size: 1.7em;"><a title="แก้ไขเมนูแบบทดสอบ" id="editMenu-' + response[i].menuQuizId + '" href="#" class="f34r-txt-black"><i class="fas fa-edit"></a></i></span>&nbsp;' +
                            // '<span style="font-size: 1.7em;"><a title="่ส่งออกคะแนน" id="exportMenu-' + response[i].menuQuizId + '" href="#" class="f34r-txt-black"><i class="fas fa-share-square"></a></i></span>&nbsp;' +
                            // '<span style="font-size: 1.7em;"><a title="ดูคะแนนแบบทดสอบ" id="showScoreMenu-' + response[i].menuQuizId + '" href="#" class="f34r-txt-black"><i class="fas fa-star"></a></i></span>&nbsp;' +
                            /* --------BTN-------- */
                            '<br>' +
                            response[i].menuQuizDescription +
                            '<hr>' +
                            '<table class="table table-bordered">' +
                            '<ol id="fieldOlTag-' + response[i].menuQuizId + '">' +

                            '</ol>' +
                            '</table>' +

                            '</div>' +
                            '</div>' +
                            '</div>';
                        } 

                        
                    }
                }
                $('.showMenuQuiz').html(html);
                $.each(getMenu, function(i, p) {
                    //console.log(getMenu[i].menuQuizStatus.substr(0, 1), '0-1');
                    //console.logg(getMenu[i].menuQuizStatus.substr(1, 1), '1-1');
                    //console.logg(getMenu[i].menuQuizStatus.substr(2, 1), '2-1');
                    //console.logg(getMenu[i].menuQuizStatus.substr(3, 1), '3-1');
                    if (getMenu[i].menuQuizStatus.substr(1, 1) == '0') {
                        menuStatus[getMenu[i].menuQuizId] = getMenu[i].menuQuizStatus;

                        randChoice[getMenu[i].menuQuizId] = '';
                        if (getMenu[i].menuQuizStatus.substr(0, 1) == '1') { //check rand
                            randChoice[getMenu[i].menuQuizId] = 'randQuizChoice';
                        } else {
                            randChoice[getMenu[i].menuQuizId] = 'showQuizChoice';
                        }
                    //if (getMenu[i].menuQuizStatus.substr(0, 1) == '1') { console.log('randQuizChoice'); } else { console.log('showQuizChoice'); }
                        showHeader(getMenu[i].menuQuizId);
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
            success: function(response) {
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
                $.each(getField[mQuizId], function(i, p) {
                    showChoice(mQuizId, getField[mQuizId][i].headerQuizId);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
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
            success: function(response) {
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
                            '<input type="radio" name="test-' + CMenuID + '-' + CHeaderID + '" class="card-input-element d-none" value="' + i + '"' + disabler + '>' +
                            '<div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center">' +
                            '<h5>' + response[i].choiceQuizText + '</h5>' +
                            '</div>' +
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
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }
    ajaxCount = 0;
    $(document).ajaxStop(function() {
        //console.log('AJAX HAS BEEN STOPPED-' + ajaxCount);
        if (ajaxCount <= 0) {
            showScore();
            $.each(getMenu, function(i, p) {

                for (f34r = 0; f34r < checkMenu.length; f34r++) {
                    if (checkMenu[f34r].pointQuizMenuQuizId * 1 == getMenu[i].menuQuizId * 1) {
                        $('#btnSend-' + getMenu[i].menuQuizId).parent().parent().parent().hide();
                    }
                }

                $('#btnSend-' + getMenu[i].menuQuizId).click(function(e) {
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
                            k = radioElement.value;
                            getPoint[j] = getUnit[getMenu[i].menuQuizId][getField[getMenu[i].menuQuizId][j].headerQuizId][k].choiceQuizId;
                        }
                        //console.log(getPoint[j]);

                    }
                    //console.log('----');
                    //console.logg(getPoint);
                    //console.logg(getChoice); 
                    //console.log('#btnSend-' + getMenu[i].menuQuizId);

                    result = getPoint.filter((getPoint) => { return getPoint == '-1'; });
                    if (result.length > 0) {
                        if (confirm('ท่านยังทำไม่ครบทุกข้อ จะยืนยันการส่งหรือไม่?')) {
                            //console.log('saved');
                            f34check = true;
                        } else {
                            //console.log('close');
                            f34check = false;
                        }
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
                            success: function() {
                                alert('บันทึกสำเร็จ');
                                $('#btnSend-' + getMenu[i].menuQuizId).parent().parent().parent().hide();
                            },
                            error: function() {
                                alert('บันทึกไม่สำเร็จ');
                            }
                        });
                    }

                });
            });
        }
        ajaxCount++;
    });

    function showScore() {
        $.ajax({
            url: '/' + url[3] + '/Std_subject_quiz/showScore/' + subject_id + '-' + semester,
            dataType: "json",
            success: function(response) {
                //console.log('showScore');
                //console.log(response);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }
});