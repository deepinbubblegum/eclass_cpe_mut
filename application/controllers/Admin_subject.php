<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin_subject extends MY_Controller
{

        public function __construct()
        {
                parent::__construct();
                $this->load->model('manage_su/Model_su_subject');
        }

        public function Show_Max_Data_ctl(){
                $result = $this->Model_su_subject->Show_Max_Data_model();
                echo json_encode($result);
        }

        public function Show_Data_ctl()
        {
                $start = $this->input->post('start');
                $limit = $this->input->post('limit');
                $result = $this->Model_su_subject->Show_Data_subject_model($limit,$start);
                echo json_encode($result);
        }

        public function Search_Show_Data_ctl()
        {
                $keyword = $this->input->post('data');
                $type = $this->input->post('search');
                $result = $this->Model_su_subject->Search_data_model($keyword,$type);
                echo json_encode($result);
        }

        public function Add_Data_ctl()
        {
                $data = array(
                        'subject_id' => $this->input->post('subject_id'),
                        'subject_name' => $this->input->post('subject_name'),
                        'subject_major' => $this->input->post('major_id'),
                );
                $this->Model_su_subject->Add_data_model($data);
        }

        public function Edit_Data_ctl(){
                $org_id = $this->input->post('org_id');
                $data = array(
                        'subject_id' => $this->input->post('subject_id'),
                        'subject_name' => $this->input->post('subject_name'),
                        'subject_major' => $this->input->post('major_id'),
                );
                $this->Model_su_subject->Edit_data_model($org_id,$data);
        }

        public function Delete_Data_ctl(){
                $data = $this->input->post('$data[]');
                $this->Model_su_subject->Delete_Data_model($data);
        }

        public function Show_Data_user()
        { 
                $result = $this->Model_su_subject->Show_Data_user_data_model();
                echo json_encode($result);
        }

}
