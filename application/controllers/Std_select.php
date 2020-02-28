<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Std_select extends MY_Controller
{
        public function __construct()
        {
            parent::__construct(); 
            if ($this->session->ses_status != 'student') {
                redirect();
            }
            $this->load->model('manage_std/Model_std_select');
        }

        public function select() { 
            $this->load->view('template/select/header_view');
            $this->load->view('template/select/side_menu_view');
            $this->load->view('student/select_view');
            $this->load->view('template/footer_view'); 
        }

        public function Show_Data_ctl(/*$sid*/)
        {
            // $str_arr = explode("-", $sid);
            // $data = array(
            //         'subject_id' => $str_arr[0],
            //         'semester' => $str_arr[1], 
            // );
            $semester = $this->input->post('semester');
            $subject = $this->input->post('subject');
            
            //$result = $this->Model_std_select->Show_Data_Annouce_model($data['semester'],$data['subject_id']);
            $result = $this->Model_std_select->Show_Data_Annouce_model($semester,$subject);
            echo json_encode($result);
        }
}
