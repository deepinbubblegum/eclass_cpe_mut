<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin_teacher extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_su/Model_su_teacher');
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
        $result = $this->Model_su_teacher->Show_Data_Teacher_model($limit,$start);
        echo json_encode($result);
    }

    public function Add_Data_ctl()
    {
        $data = array(
            'teacher_id' => $this->input->post('id_teacher'),
            'teacher_name' => $this->input->post('name_teacher'),
            'teacher_lastname' => $this->input->post('lastname_teacher'),
            'teacher_email' => $this->input->post('email_teacher'),
            'teacher_username' => $this->input->post('username_teacher'),
            'teacher_major' => $this->input->post('major_id'),
            'teacher_permission' => $this->input->post('permission_id')
        );
        $this->Model_su_teacher->Add_data_model($data);
    }

    public function Edit_Data_ctl()
    {
        $org_id = $this->input->post('org_id');
        $data = array(
            'teacher_id' => $this->input->post('id_teacher'),
            'teacher_name' => $this->input->post('name_teacher'),
            'teacher_lastname' => $this->input->post('lastname_teacher'),
            'teacher_email' => $this->input->post('email_teacher'),
            'teacher_username' => $this->input->post('username_teacher'),
            'teacher_major' => $this->input->post('major_id'),
            'teacher_permission' => $this->input->post('permission_id')
        );
        $this->Model_su_teacher->Edit_data_model($org_id, $data);
    }

    public function Delete_Data_ctl()
    {
        $data = $this->input->post('$data[]');
        $this->Model_su_teacher->Delete_Data_model($data);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $result = $this->Model_su_teacher->Search_data_model($keyword);
        echo json_encode($result);
    }
}
