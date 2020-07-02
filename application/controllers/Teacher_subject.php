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

    public function getSubject_Coop()
    {
        $data = $this->input->post('data');
        $userID = $this->session->ses_id;
        $result = $this->Model_te_subject->selectSubjectCoop($data,$userID);
        echo json_encode($result);
    }

    public function getSubject(){
        $data = $this->input->post('data');
        $userID = $this->session->ses_id;
        $result = $this->Model_te_subject->selectSubject($data,$userID);
        echo json_encode($result);
    }

    public function getSubject_Assist()
    {
        $data = $this->input->post('data');
        $userID = $this->session->ses_id;
        $result = $this->Model_te_subject->selectSubjectForAssist($data,$userID);
        echo json_encode($result);
    }

    public function Hide_menu()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $userID = $this->session->ses_id;
        $result = $this->Model_te_subject->Show_Permission_bit($semester,$subject,$userID);
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

    public function getSubject_Special()
    {
        $data = $this->input->post('data');
        $userID = $this->session->ses_id;
        $result = $this->Model_te_subject->selectSubject_Special($data,$userID);
        echo json_encode($result);
    }

    public function getSubject_Alert()
    {
        $semester = $this->input->post('data');
        $result = $this->Model_te_subject->getSubject_Alert_model($semester);
        echo json_encode($result);
    }
}
