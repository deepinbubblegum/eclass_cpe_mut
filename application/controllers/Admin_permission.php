<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin_permission extends MY_Controller
{

        public function __construct()
        {
                parent::__construct();
                $this->load->model('manage_su/Model_su_permission');
        }

        public function Show_Max_Data_ctl(){
                $result = $this->Model_su_permission->Show_Max_Data_model();
                echo json_encode($result);
        }

        public function Show_Data_ctl()
        {
                $start = $this->input->post('start');
                $limit = $this->input->post('limit');
                $result = $this->Model_su_permission->Show_Data_permission_model($limit,$start);
                echo json_encode($result);
        }

        public function Search_Show_Data_ctl()
        {
                $keyword = $this->input->post('data');
                $type = $this->input->post('search');
                $result = $this->Model_su_permission->Search_data_model($keyword,$type);
                echo json_encode($result);
        }

        public function Add_Data_ctl()
        {
                $data = array(
                        'permission_id' => $this->input->post('permission_ID'),
                        'permission_name' => $this->input->post('permission_Name')
                );
                $this->Model_su_permission->Add_data_model($data);
        }

        public function Edit_Data_ctl(){
                $org_id = $this->input->post('org_id');
                $data = array(
                        'permission_id' => $this->input->post('permission_ID'),
                        'permission_name' => $this->input->post('permission_Name')
                );
                $this->Model_su_permission->Edit_data_model($org_id,$data);
        }

        public function Delete_Data_ctl(){
                $data = $this->input->post('$data[]');
                $this->Model_su_permission->Delete_Data_model($data);
        }

}
