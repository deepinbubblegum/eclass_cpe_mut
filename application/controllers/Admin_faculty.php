<?php  
defined('BASEPATH') OR exit('No direct script access allowed');
class Admin_faculty extends MY_Controller {  
     
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_su/Model_su_faculty');
    } 

    public function Show_Data_ctl()
    {
        $result = $this->Model_su_faculty->Show_Data_faculty_model();
	    echo json_encode($result);
    }

    public function Search_Show_Data_ctl(){
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $result = $this->Model_su_faculty->Search_Data_model($keyword,$type);
	    echo json_encode($result);
    }

    public function Add_Data_ctl(){
        $data = array(
            "faculty_id" => $this->input->post('faculty_ID'),
            "faculty_name" => $this->input->post('faculty_Name')
        );
        $this->Model_su_faculty->Add_Data_model($data);
    }

    public function Edit_Data_ctl(){
        $org_id = $this->input->post('org_id');
        $data = array(
            "faculty_id" => $this->input->post('faculty_ID'),
            "faculty_name" => $this->input->post('faculty_Name')
        );
        $this->Model_su_faculty->Edit_Data_model($org_id,$data);
    }

    public function Delete_Data_ctl(){
        $data = $this->input->post('$data[]');
        $this->Model_su_faculty->Delete_Data_model($data);
    }
}