<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Teacher_add_permission extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_add_permission');
    }

    public function Show_Max_Data_ctl()
    {
        $subject_id = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $result = $this->Model_te_add_permission->Show_Max_Data_model($subject_id, $semester);
        echo json_encode($result);
    }

    public function Show_Data_ctl()
    {
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $subject_id = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $result = $this->Model_te_add_permission->Show_Data_user_data_model($limit, $start, $subject_id, $semester);
        echo json_encode($result);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $subject_id = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $result = $this->Model_te_add_permission->Search_data_model($keyword,$type, $subject_id, $semester);
        echo json_encode($result);
    }

    public function Add_Data_ctl()
    {
        $name = $this->input->post('namepermis');
        $bit = $this->input->post('bit');
        $subject = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $this->Model_te_add_permission->Add_data_model($name,$bit,$subject,$semester);
    }

    public function Edit_Data_ctl()
    {
        $id = $this->input->post('id');
        $name = $this->input->post('namepermis');
        $bit = $this->input->post('bit');
        $subject = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $this->Model_te_add_permission->Edit_data_model($id,$name,$bit,$subject,$semester);
    }

    public function Delete_Data_ctl()
    {
        $data = $this->input->post('$data[]');
        $subject = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $this->Model_te_add_permission->Delete_Data_model($data,$subject,$semester);
    }

}