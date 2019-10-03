<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Teacher_point_student extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_point_student');
    }

    public function Show_Data_ctl()
    {
        // $semester = $this->input->post('semester');
        // $subject = $this->input->post('subject');
        // $menu_id = $this->input->post('menu_id');
        // $result = $this->Model_te_subject_menu_point->Show_Data_menu_point_model($semester,$subject,$menu_id);
        // echo json_encode($result);
    }

    public function Add_Data_ctl()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $menu_id = $this->input->post('menu_id');
        $pointid = $this->input->post('point_id');
        $is_std = $this->input->post('id_std');
        $point = $this->input->post('point');
        $this->Model_te_point_student->Add_data_model($semester,$subject,$menu_id,$pointid,$is_std,$point);

    }

    public function Show_point_In_MenuPoint()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $menu_id = $this->input->post('menu_id');
        $pointid = $this->input->post('point_id');

        $result = $this->Model_te_point_student->Show_Point_In_MenuPoint($semester,$subject,$menu_id,$pointid);
        echo json_encode($result);
    }

}