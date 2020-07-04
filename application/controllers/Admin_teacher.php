<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin_teacher extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_su/Model_su_teacher');
        $this->load->model('manage_su/Model_su_teacher_major');
    }

    public function Show_Max_Data_ctl()
    {
        $result = $this->Model_su_teacher->Show_Max_Data_model();
        echo json_encode($result);
    }

    public function Show_Data_ctl()
    {
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_teacher->Show_Data_Teacher_model($limit, $start);
        echo json_encode($result);
    }

    public function Add_Data_ctl()
    {
        if ($this->check_duplicate($this->input->post('teacher_username')) && $this->check_duplicate($this->input->post('teacher_email'))) {
            $data = array(
                'teacher_code_id' => $this->input->post('teacher_code_id'),
                'teacher_Tname' => $this->input->post('teacher_Tname'),
                'teacher_Ename' => $this->input->post('teacher_Ename'),
                'teacher_email' => $this->input->post('teacher_email'),
                'teacher_username' => $this->input->post('teacher_username'),
                'teacher_password' => $this->encryption_pass($this->input->post('teacher_username')),
                'teacher_admin' => '0',
                'teacher_degree' => $this->input->post('degree'),
                //'teacher_major' => $this->input->post('major_id'),
            );
            $this->Model_su_teacher->Add_data_model($data);
            $this->Add_Data_TeacherMajor();
        } else {
            show_error('Duplicate', 409, 'An Error Was Encountered Value is Duplicate');
        }
    }

    public function Add_Data_TeacherMajor()
    {
        $data = array(
            'teamaj_teacherid' => $this->input->post('teacher_code_id'),
            'teamaj_majorid' => $this->input->post('major_id'),
        );
        $this->Model_su_teacher_major->Add_data_model($data);
    }

    public function Edit_Data_ctl()
    {
        $org_id = $this->input->post('org_id');
        $data = array(
            'teacher_code_id' => $this->input->post('teacher_code_id'),
            'teacher_Tname' => $this->input->post('teacher_Tname'),
            'teacher_Ename' => $this->input->post('teacher_Ename'),
            'teacher_email' => $this->input->post('teacher_email'),
            'teacher_username' => $this->input->post('teacher_username'),
            'teacher_degree' => $this->input->post('degree'),
        );
        $this->Model_su_teacher->Edit_data_model($org_id, $data);
    }

    public function Delete_Data_ctl()
    {
        $data = $this->input->post('$data[]');
        $this->Model_su_teacher->Delete_Data_model($data);
    }

    public function Passwdre_Data_ctl()
    {
        $this->load->model('sign_in/Model_user_uses');
        $data = $this->input->post('$data[]');
        foreach ($data as $value) {
            $result = $this->Model_user_uses->reset_get_te($value);
            if($result){
                $passwd = $this->encryption_pass($result);
                $this->Model_user_uses->reset_passwd_te($value, $passwd);
            }
        }
        echo json_encode(true);
    }

    public function Show_Max_Search_Data_ctl()
    {
        $data = $this->input->post('data');
        $keyword = $this->input->post('search');
        $result = $this->Model_su_teacher->Show_Max_Search_Data_model($data, $keyword);
        echo json_encode($result);
    }

    public function Search_Show_Data_ctl()
    {
        $data = $this->input->post('data');
        $keyword = $this->input->post('search');
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_teacher->Search_data_model($data, $keyword, $start, $limit);
        echo json_encode($result);
    }

    public function Show_Sort_ctl()
    {
        $data = $this->input->post('data');
        $sort = $this->input->post('sort');
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_teacher->Show_Sort_model($data, $sort, $start, $limit);
        echo json_encode($result);
    }
}
