$(document).ready(function() {

    var a;
    var datatable_semester;
    var datatable_subject;
    var data_semester;
    showSemester();

    function showSemester() {
        $.ajax({
            url: "../Teacher_add_subject/getSemester",
            dataType: "json",
            success: function(response) {
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].semester_id + '" id="' + response[i].semester_id + '">' + response[i].semester_name + '</option>';
                    }
                }
                $('#yearterm').html(html);
                showSubject();
            }
        });
    }

    function showSubject() {
        var url = $(location).attr('href').split("/");
        semesterSelected = $("#yearterm :selected").val();
        console.log('\'' + semesterSelected + '\'');
        $.ajax({
            type: "POST",
            url: "../" + url[3] + "/Teacher_subject/getSubject",
            data: "data=" + semesterSelected,
            dataType: "json",
            success: function(response) {
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += //'<a class="card" style="min-width: 300px; max-width : 310px;" id="' + response[i].subsem_subject + '" href="../select/subject/' + response[i].subsem_subject + '-' + response[i].subsem_semester + '" >' +
                            '<a class="card" style="min-width: 300px; max-width : 310px;" id="' + response[i].subsem_subject + '" href="../' + url[3] + '/te_select/annouce/' + response[i].subsem_subject + '-' + response[i].subsem_semester + '" >' +
                            '<img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYZXAH2gX3tc7LJpgr0GaPOYnys6MkCpPi6VRmN6We88Uaq8wi" alt="Card image cap">' +
                            '<div class="card-body">' +
                            '<h5 class="card-title">' + response[i].subsem_subject + '</h5>' +
                            '<p class="card-text">' + response[i].subject_name + '</p>' +
                            '</div>' +
                            '</a>';
                    }
                }
                $('#showSubject').html(html);
                $.each(response, function(i, v) {
                    $('#' + response[i].subsem_subject + ' a').click(function() {
                        alert(response[i].subsem_subject);
                        //window.location.href = '../Std_download/download/' + response[i].fileName;

                        // console.log(response[i].filePath, response[i].fileName);
                        // $.ajax({
                        //     type: "POST",
                        //     url: "../Std_download/download",
                        //     data: "&data1=" + response[i].fileName + "&data2=" + response[i].filePath,
                        //     //data: "&data1=" + getFile,
                        //     dataType: "json",
                        //     success: function(response) {
                        //         alert("Success!");
                        //     }
                        // });
                    });
                });
            }
        });
    }

    $('#yearterm').change(function(e) {
        e.preventDefault();
        showSubject();
    });


    var iurl;
    var url = $(location).attr('href').split("/");

    add_modal_data();

    function add_modal_data() {
        iurl = "/" + url[3] + "/Teacher_add_subject/Add_Data_ctl_te";
        $('#Modal').find('.modal-title').text('เพิ่มข้อมูลวิชาประจำปีการศึกษา');
        $('#Modal').modal('show');
        $.ajax({
            url: "../Teacher_add_subject/getSemester",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].semester_id + '">' + response[i].semester_name + '</option>';
                    }
                }
                $('#Semester_Form_add_option').html(html);
            }
        });
        $.ajax({
            url: "/" + url[3] + "/Teacher_add_subject/Subject_Add_data_ctl",
            dataType: "json",
            success: function(response) {
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].subject_id + '" data-2="' + response[i].subject_teacher + '">' + response[i].subject_name + ' </option>';
                    }
                }
                $('#Subject_Form_add_option').html(html);
            }
        });
    }

    $('#btnSave').click(function(e) {
        e.preventDefault();
        if (iurl == "/" + url[3] + '/Teacher_add_subject/Add_Data_ctl_te') {
            txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
        } else {
            txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
        }
        data = $("#Semester_Form_add_option :selected").val();
        data2 = $("#Subject_Form_add_option :selected").val();
        //update_teasub = $("#Subject_Form_add_option").find(':selected').data('2');
        $.ajax({
            type: "POST",
            url: iurl,
            data: '&semester_id=' + data + '&subject_id=' + data2,
            success: function() {
                $('#Modal_add').modal('hide');
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: txtsnack
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: txtsnackerr + errorThrown + ' )'
                });
            }
        });
        showSemester();
    });
});