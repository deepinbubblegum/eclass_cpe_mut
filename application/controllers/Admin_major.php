<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin_major extends MY_Controller
{

        public function __construct()
        {
                parent::__construct();
                $this->load->model('manage_su/Model_su_major');
        }

        public function Show_Max_Data_ctl()
        {
                $result = $this->Model_su_major->Show_Max_Data_model();
                echo json_encode($result);
        }

        public function Show_Data_ctl()
        {
                $start = $this->input->post('start');
                $limit = $this->input->post('limit');
                $result = $this->Model_su_major->Show_Data_Major_model($limit, $start);
                echo json_encode($result);
        }

        public function Search_Show_Data_ctl()
        {
                $keyword = $this->input->post('data');
                $type = $this->input->post('search');
                $result = $this->Model_su_major->Search_data_model($keyword,$type);
                echo json_encode($result);
        }

        public function Add_Data_ctl()
        {
                $data = array(
                        'major_id' => $this->input->post('major_ID'),
                        'major_name' => $this->input->post('major_Name'),
                        'major_faculty' => $this->input->post('faculty_id')
                );
                $this->Model_su_major->Add_data_model($data);
        }

        public function Edit_Data_ctl()
        {
                $org_id = $this->input->post('org_id');
                $data = array(
                        'major_id' => $this->input->post('major_ID'),
                        'major_name' => $this->input->post('major_Name'),
                        'major_faculty' => $this->input->post('faculty_id')
                );
                $this->Model_su_major->Edit_data_model($org_id, $data);
        }

        public function Delete_Data_ctl()
        {
                $data = $this->input->post('$data[]');
                $this->Model_su_major->Delete_Data_model($data);
        }

        public function Select_major()
        {
                $major = $this->input->post('datamajor');
                $result = $this->Model_su_major->Select_major_medel($major);
                echo json_encode($result);
        }

        public function Show_Sort_ctl()
        {
                $data = $this->input->post('data');
                $sort = $this->input->post('sort');
                $result = $this->Model_su_major->Show_Sort_ctl_medel($data, $sort);
                echo json_encode($result);
        }
}
