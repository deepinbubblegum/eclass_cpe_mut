<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin_degree extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_su/Model_su_degree');
    }

    public function Show_Data_ctl()
    {
        $result = $this->Model_su_degree->Show_Data_degree_model();
        echo json_encode($result);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $result = $this->Model_su_degree->Search_Data_model($keyword, $type);
        echo json_encode($result);
    }

    public function Add_Data_ctl()
    {
        // $data = array(
        //     "de_grade" => $this->input->post('Grade'),
        //     "degree_tname" => $this->input->post('Degree_TName'),
        //     "degree_tname" => $this->input->post('Degree_EName')
        // );

        $Grade = $this->input->post('Grade');
        $Degree_TName = $this->input->post('Degree_TName');
        $Degree_EName = $this->input->post('Degree_EName');
        $this->Model_su_degree->Add_Data_model($Grade, $Degree_TName, $Degree_EName);
    }

    public function Edit_Data_ctl()
    {
        $org_id = $this->input->post('org_id');
        $data = array(
            "de_grade" => $this->input->post('Grade'),
            "de_Tname" => $this->input->post('Degree_TName'),
            "de_Ename" => $this->input->post('Degree_EName')
        );
        $this->Model_su_degree->Edit_Data_model($org_id, $data);
    }

    public function Delete_Data_ctl()
    {
        $data = $this->input->post('$data[]');
        $this->Model_su_degree->Delete_Data_model($data);
    }
}
