<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Te_point_request extends MY_Controller
{
        public function __construct()
        {
            parent::__construct(); 
            $this->load->model('manage_te/Model_te_point_request');
        }

        public function Show_Data_ctl()
        {
            $semester = $this->input->post('semester');
            $subject = $this->input->post('subject');
            
            $result = $this->Model_te_point_request->getPointRequest($semester,$subject);
            echo json_encode($result);
        }

        public function Show_Data_Read_ctl()
        {
            $semester = $this->input->post('semester');
            $subject = $this->input->post('subject');
            
            $result = $this->Model_te_point_request->getRead($semester,$subject);
            echo json_encode($result);
        }

}