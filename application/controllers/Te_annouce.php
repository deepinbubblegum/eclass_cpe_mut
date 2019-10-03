<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Te_annouce extends MY_Controller
{
        public function __construct()
        {
            parent::__construct(); 
            $this->load->model('manage_te/Model_te_annouce');
        }

        public function select() { 
            $this->load->view('template/select/header_view');
            $this->load->view('template/select/side_menu_view');
            $this->load->view('student/select_view');
            $this->load->view('template/footer_view'); 
        }

        public function Show_Data_ctl()
        {
            $semester = $this->input->post('semester');
            $subject = $this->input->post('subject');
            
            $result = $this->Model_te_annouce->Show_Data_Annouce_model($semester,$subject);
            echo json_encode($result);
        }

        public function Add_Data_ctl()
        {
            $semester = $this->input->post('semester');
            $subject = $this->input->post('subject');
            $Header = $this->input->post('Headtext');
            $Annouce = $this->input->post('dataAnnouce');
            $Sdata = $this->input->post('dataStart');
            $Edate = $this->input->post('dateEnd');
            $User = $this->session->ses_id;
            $this->Model_te_annouce->Add_Data_Annouce_model($semester,$subject,$Header,$Annouce,$Sdata,$Edate,$User);
        }

        public function Edit_Data_ctl()
        {
            $semester = $this->input->post('semester');
            $subject = $this->input->post('subject');
            $id = $this->input->post('AnnouceId');
            $Header = $this->input->post('Headtext');
            $Annouce = $this->input->post('dataAnnouce');
            $Sdata = $this->input->post('dataStart');
            $Edate = $this->input->post('dateEnd');
            $User = $this->session->ses_id;
            $this->Model_te_annouce->Edit_Data_Annouce_model($semester,$subject,$id,$Header,$Annouce,$Sdata,$Edate,$User);
        }

        public function Del_Data_ctl()
        {
            $semester = $this->input->post('semester');
            $subject = $this->input->post('subject');
            $id = $this->input->post('AnnouceId');
            $this->Model_te_annouce->Delete_Data_Annouce_model($semester,$subject,$id);
        }
}