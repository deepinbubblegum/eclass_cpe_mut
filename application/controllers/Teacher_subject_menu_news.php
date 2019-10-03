<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Teacher_subject_menu_news extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_subject_menu');
    }

    public function Show_Data_ctl()
    {
        // $semester = $this->input->post('semester');
        // $subject = $this->input->post('subject');
        // $result = $this->Model_te_subject_menu->Show_Data_subject_menu_model($semester,$subject);
        // echo json_encode($result);
    }

}