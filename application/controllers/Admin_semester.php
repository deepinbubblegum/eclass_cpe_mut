<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Admin_semester extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_su/Model_su_semester');
    }

    public function Show_Max_Data_ctl()
    {
        $result = $this->Model_su_semester->Show_Max_Data_model();
        echo json_encode($result);
    }

    public function Show_Max_Data_Search_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $result = $this->Model_su_semester->Show_Max_Search_Data_model($keyword, $type);
        echo json_encode($result);
    }

    public function Show_Data_ctl()
    {
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_semester->Show_Data_Semester_model($limit, $start);
        echo json_encode($result);
    }

    public function Add_Data_ctl()
    {
        $dataInsert = array(
            'semester_year' => $this->input->post('semester_year'),
            'semester_part' => $this->input->post('semester_part'),
            'semester_name' => $this->input->post('semester_name'),
            'semester_id' => $this->input->post('semester_id')
        );
        $err_code = $this->Model_su_semester->Add_data_model($dataInsert);
        echo json_encode($err_code);
    }

    public function Delete_Data_ctl()
    {
        $data = $this->input->post('$data[]');
        $err_code = $this->Model_su_semester->Delete_Data_model($data);
        echo json_encode($err_code);
    }

    public function Edit_Data_ctl()
    {
        $org_semester_id = $this->input->post('org_semester_id');
        $data = array(
            'semester_year' => $this->input->post('semester_year'),
            'semester_part' => $this->input->post('semester_part'),
            'semester_name' => $this->input->post('semester_name'),
            'semester_id' => $this->input->post('semester_id')
        );
        $err_code = $this->Model_su_semester->Edit_data_model($org_semester_id, $data);
        echo json_encode($err_code);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_semester->Search_data_model($keyword, $type, $limit, $start);
        echo json_encode($result);
    }

    public function Show_Sort_ctl()
    {
        $data = $this->input->post('data');
        $sort = $this->input->post('sort');
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_semester->Show_Sort_model($data, $sort, $limit, $start);
        echo json_encode($result);
    }
}
