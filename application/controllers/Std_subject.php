<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Std_subject extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('manage_std/Model_std_subject');
        }

        public function getSemester(){
            $result = $this->Model_std_subject->selectSemester();
            echo json_encode($result);
        }

        public function getSubject_Coop()
        {
            $data = $this->input->post('data');
            $result = $this->Model_std_subject->selectSubjectCoop($data);
            echo json_encode($result);
        }

        public function getSubject(){
            $data = $this->input->post('data'); 
            $userID = $this->session->ses_id;
            //echo $semester; 
            $result = $this->Model_std_subject->selectSubject($data,$userID);
            echo json_encode($result);
        }

        public function getSubject_special()
        {
            $data = $this->input->post('data');
            $result = $this->Model_std_subject->selectSubject_special($data);
            echo json_encode($result);
        }
         
}
