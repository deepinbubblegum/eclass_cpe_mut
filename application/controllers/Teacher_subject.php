<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Teacher_subject extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_subject');
    }

    public function Show_Data_ctl()
    {
        $semester = $this->input->post('semester');
        $userID = $this->session->ses_id;
        $result = $this->Model_te_subject->Show_Data_subject_model($semester,$userID);
        echo json_encode($result);
    }

    public function getSubject(){
        $data = $this->input->post('data');
        $userID = $this->session->ses_id;
        $result = $this->Model_te_subject->selectSubject($data,$userID);
        echo json_encode($result);
    }

    public function subject_menu_news($data = null)
    {
        // $data = $this->input->get('semesterdata');
        $this->load->view('teacher/template_te/header_view');
        $this->load->view('teacher/template_te/side_menu_te_view');
        $this->load->view('teacher/subject_menu_news_te_view');
        $this->load->view('teacher/template_te/footer_te_view');
    }

    public function subject_menu_point()
    {
        // $data = $this->input->get('semesterdata');
        $this->load->view('teacher/template_te/header_view');
        $this->load->view('teacher/template_te/side_menu_te_view');
        $this->load->view('teacher/subject_menu_point_te_view');
        $this->load->view('teacher/template_te/footer_te_view');
    }
}
