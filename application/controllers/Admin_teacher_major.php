<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin_teacher_major extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_su/Model_su_teacher_major');
    }

    public function Show_Max_Data_ctl()
    {
        $result = $this->Model_su_teacher_major->Show_Max_Data_model();
        echo json_encode($result);
    }

    public function Show_Data_ctl()
    {
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_teacher_major->Show_Data_Teacher_model($limit, $start);
        echo json_encode($result);
    }

    public function Add_Data_ctl()
    {
        // $data = array(
        //     'teamaj_teacherid' => $this->input->post('teacher_id'),
        //     'teamaj_majorid' => $this->input->post('major_id'),
        // );
        $teacher =  $this->input->post('data1');
        $major = $this->input->post('arr_major');
        $result = $this->Model_su_teacher_major->Add_data_model($teacher, $major);
        echo json_encode($result);
    }

    public function Edit_Data_ctl()
    {
        $org_teacher = $this->input->post('iddata');
        // $org_major = $this->input->post('org_major');
        // $data = array(
        //     'teamaj_teacherid' => $this->input->post('teacher_id'),
        //     'teamaj_majorid' => $this->input->post('major_id'),
        // );
        $teacher =  $this->input->post('data1');
        $major = $this->input->post('arr_major');
        $result = $this->Model_su_teacher_major->Edit_data_model($org_teacher, $teacher, $major);
        echo json_encode($result);
    }

    public function Delete_Data_ctl()
    {
        $data_teacher = $this->input->post('$data[]');
        $data_major = $this->input->post('$data2[]');
        // print_r($data_teacher);
        // print_r($data_major);
        $this->Model_su_teacher_major->Delete_Data_model($data_teacher, $data_major);
    }

    public function Show_Max_Search_Data_ctl()
    {
        $data = $this->input->post('data');
        $keyword = $this->input->post('search');
        $result = $this->Model_su_teacher_major->Show_Max_Search_Data_model($data, $keyword);
        echo json_encode($result);
    }

    public function Search_Show_Data_ctl()
    {
        $data = $this->input->post('data');
        $keyword = $this->input->post('search');
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_teacher_major->Search_data_model($data, $keyword, $start, $limit);
        echo json_encode($result);
    }

    public function Show_Sort_ctl()
    {
        $data = $this->input->post('data');
        $sort = $this->input->post('sort');
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_teacher_major->Show_Sort_model($data, $sort, $start, $limit);
        echo json_encode($result);
    }

    public function Show_MajorAll_Data_ctl()
    {
        $result = $this->Model_su_teacher_major->Show_MajorAll_Data_model();
        echo json_encode($result);
    }
}
