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

        public function getSubject(){
            $data = $this->input->post('data'); 
            //echo $semester; 
            $result = $this->Model_std_subject->selectSubject($data);
            echo json_encode($result);
        }
         
}
