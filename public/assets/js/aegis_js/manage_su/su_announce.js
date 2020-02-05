$(document).ready(function () {
        showdata();

        var getdate;

        $('#summernote').summernote({
                placeholder: 'รายละเอียดเนื้อหาประกาศ',
                // tabsize: 1,
                height: 250,
                toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        // ['table', ['table']],
                        ['insert', ['link', 'picture', 'video']],
                        ['view', ['fullscreen', 'codeview', 'help']]
                ]
        });

        $('#summernoteEdit').summernote({
                placeholder: 'รายละเอียดเนื้อหาประกาศ',
                // tabsize: 1,
                height: 250,
                toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        // ['table', ['table']],
                        ['insert', ['link', 'picture', 'video']],
                        ['view', ['fullscreen', 'codeview', 'help']]
                ]
        });

        $('#summernote').summernote('code', '');

        $('#save').click(function (e) {
                e.preventDefault();
                titlename = $('#Titlename').val();
                // content = $('#textareacontent').val();
                content = $('#summernote').summernote('code');
                contentEncode = escape(content);
                e_date = $('#set_e_date').val();
                console.log(contentEncode);
                if (titlename === '') {
                        $('#Titlename').addClass('is-invalid');
                        return false;
                } else {
                        $('#Titlename').removeClass('is-invalid');
                }

                // if (content === '') {
                //         Snackbar.show({
                //                 actionText: 'close',
                //                 pos: 'top-center',
                //                 actionTextColor: '#da0041',
                //                 backgroundColor: '#323232',
                //                 width: 'auto',
                //                 text: 'กรุณากรอกข้อมูลเนื้อหาประกาศ'
                //         });
                //         return false;
                // }
                if ($('#summernote').summernote('isEmpty')) {
                        Snackbar.show({
                                actionText: 'close',
                                pos: 'top-center',
                                actionTextColor: '#da0041',
                                backgroundColor: '#323232',
                                width: 'auto',
                                text: 'กรุณากรอกข้อมูลเนื้อหาประกาศ'
                        });
                        return false;
                }

                var form_data = new FormData();
                form_data.append('title', titlename);
                form_data.append('content', content);
                form_data.append('e_date', e_date);

                $.ajax({
                        type: "POST",
                        url: "../admin_announce/add_data_ctl",
                        // data: "&title=" + titlename + "&content=" + contentEncode + "&e_date=" + e_date,
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        dataType: "json",
                        success: function (response) {
                                if (response == true) {
                                        $('#Titlename').val('');
                                        $('#textareacontent').val('');
                                        $('#set_e_date').val('');
                                        $('#summernote').summernote('code', '');
                                        Snackbar.show({
                                                actionText: 'close',
                                                pos: 'top-center',
                                                actionTextColor: '#4CAF50',
                                                backgroundColor: '#323232',
                                                width: 'auto',
                                                text: 'บันทึกข้อมูลเรียบร้อย'
                                        });
                                        showdata();
                                }
                        }
                });
        });

        function showdata() {
                $.ajax({
                        type: "POST",
                        url: "../admin_announce/announce_showdata_ctl",
                        dataType: "json",
                        success: function (response) {
                                getdate = response;
                                html = '';
                                for (i = 0; i < response.length; i++) {
                                        textContext = unescape(response[i]['content']);
                                        // AA = summernote('code', response[i]['content']);
                                        if (i == 0) {
                                                html += '<div class="expansion-panel list-group-item show">';
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
                                                html += '<div aria-labelledby="headingOne" class="collapse show" data-parent="#accordionOne" id="' + response[i]['anc_id'] + '">';
                                        } else {
                                                html += '<div aria-labelledby="headingOne" class="collapse" data-parent="#accordionOne" id="' + response[i]['anc_id'] + '">';
                                        }
                                        html += '<div class="expansion-panel-body">' +
                                                response[i]['content'] +
                                                '<div class="mt-2 text-right">' +
                                                '<button class="btn btn-warning my-1 mr-1 ml-1" name="edit" posi="' + i + '" id="edit' + response[i]['anc_id'] + '" value="' + response[i]['anc_id'] + '" type="button">แก้ไข</button>' +
                                                '<button class="btn btn-danger my-1 mr-1 ml-1" title="' + response[i]['title'] + '" value="' + response[i]['anc_id'] + '" name="del" id="del' + response[i]['anc_id'] + '" type="button">ลบประกาศ</button>' +
                                                '</div>' +
                                                '</div>' +
                                                '</div>' +
                                                '</div>';
                                }
                                $('#show_data_announce').html(html);

                                for (i = 0; i < response.length; i++) {
                                        $('#del' + response[i]['anc_id']).click(function (e) {
                                                e.preventDefault();
                                                dataid = $(this).attr('value');
                                                datatitle = $(this).attr('title');
                                                $('#title_anc').text('ยืนยันการลบข้อมูล (' + datatitle + ')');
                                                $('#del_anc').val(dataid);
                                                $('#and_delModal').modal('toggle');
                                        });

                                        $('#edit' + response[i]['anc_id']).click(function (e) {
                                                e.preventDefault();
                                                dataid = $(this).attr('value');
                                                dataindex = $(this).attr('posi');
                                                $('#anc_edit_btn').val(dataid);
                                                $('#Titlename_edit').val(response[dataindex]['title']);
                                                // $('#textareacontent_edit').val(response[dataindex]['content']);
                                                $('#summernoteEdit').summernote('code', unescape(response[dataindex]['content']));
                                                $('#and_editModal').modal('toggle');
                                        });
                                }
                        }
                });
        }

        $('#del_anc').click(function (e) {
                e.preventDefault();
                dataid = $(this).attr('value');
                $.ajax({
                        type: "POST",
                        url: "../admin_announce/del_data_ctl",
                        data: "&del_anc=" + dataid,
                        dataType: "json",
                        success: function (response) {
                                if (response == true) {
                                        $('#and_delModal').modal('toggle');
                                        showdata();
                                        console.log(response);
                                        Snackbar.show({
                                                actionText: 'close',
                                                pos: 'top-center',
                                                actionTextColor: '#4CAF50',
                                                backgroundColor: '#323232',
                                                width: 'auto',
                                                text: 'ลบข้อมูลเรียบร้อย'
                                        });
                                }
                        }
                });
        });

        $('#anc_edit_btn').click(function (e) {
                e.preventDefault();
                dataid = $(this).attr('value');
                title = $('#Titlename_edit').val();
                // content = $('#textareacontent_edit').val();
                // content = $('#summernoteEdit').summernote('code');
                content = $('#summernoteEdit').summernote('code');
                contentEncode = escape(content);
                e_date = $('#set_e_date_edit').val();
                if (title == '') {
                        $('#Titlename_edit').addClass('is-invalid');
                        return false;
                } else {
                        $('#Titlename_edit').removeClass('is-invalid');
                }

                if (content === '') {
                        Snackbar.show({
                                actionText: 'close',
                                pos: 'top-center',
                                actionTextColor: '#da0041',
                                backgroundColor: '#323232',
                                width: 'auto',
                                text: 'กรุณากรอกข้อมูลเนื้อหาประกาศ'
                        });
                        return false;
                }

                var form_data = new FormData();
                form_data.append('dataid', dataid);
                form_data.append('datatitle', title);
                form_data.append('content', content);
                form_data.append('e_date', e_date);

                $.ajax({
                        type: "post",
                        url: "../admin_announce/edit_data_ctl",
                        // data: "&dataid=" + dataid + "&datatitle=" + title + "&content=" + content + "&e_date=" + e_date,
                        dataType: "json",
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        success: function (response) {
                                if (response == true) {
                                        showdata();
                                        $('#Titlename_edit').val('');
                                        $('#textareacontent_edit').val('');
                                        $('#set_e_date_edit').val('');
                                        $('#and_editModal').modal('toggle');
                                        Snackbar.show({
                                                actionText: 'close',
                                                pos: 'top-center',
                                                actionTextColor: '#4CAF50',
                                                backgroundColor: '#323232',
                                                width: 'auto',
                                                text: 'บันทึกข้อมูลเรียบร้อย'
                                        });
                                }
                        }
                });
        });

        $('input[name^="pickdatelabel"]').pickdate({
                cancel: 'Clear',
                closeOnCancel: true,
                // containerHidden: 'body',
                format: 'yyyy-mm-dd',
                formatSubmit: 'yyyy-mm-dd',
                selectMonths: true,
                selectYears: true,
        });
});