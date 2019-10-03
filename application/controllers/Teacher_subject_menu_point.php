<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Teacher_subject_menu_point extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_subject_menu_point');
    }

    public function Show_Data_ctl()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $menu_id = $this->input->post('menu_id');
        $result = $this->Model_te_subject_menu_point->Show_Data_menu_point_model($semester,$subject,$menu_id);
        echo json_encode($result);
    }

    public function Add_Data_ctl()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $menu_id = $this->input->post('menu_id');
        $FullName = $this->input->post('fullname');
        $MiniName = $this->input->post('mininame');
        $result = $this->Model_te_subject_menu_point->Add_data_model($semester,$subject,$menu_id,$FullName,$MiniName);

    }

}