<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Std_point_request extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_std/Medel_std_point_request');
    }

    public function showMenu()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject_id');
        $result = $this->Medel_std_point_request->getMenu($semester,$subject);
        echo json_encode($result);
    }

    public function showSubjectMain()
    {
        $semester = $this->input->post('semester');
        $result = $this->Medel_std_point_request->getSubjectMain($semester);
        echo json_encode($result);
    }

    public function showSubjectAdd()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject_id');
        $menuId = $this->input->post('menuId');
        $result = $this->Medel_std_point_request->getSubjectAdd($semester, $subject, $menuId);
        echo json_encode($result);
    }

    public function showStd()
    {
        $User = $this->session->ses_id;
        $result = $this->Medel_std_point_request->getStd($User);
        echo json_encode($result);
    }

    public function showTableHeader()
    {
        // $data = convertData($sid);
        // $result = $this->Model_te_table_score->getHeader($data['subject_id'], $data['semester'], $data['point_id']);
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $point_id = $this->input->post('parent_id');
        $setpointID = $this->input->post('setpointID');
        $result = $this->Medel_std_point_request->getHeader($subject_id, $semester, $point_id);
        echo json_encode($result);
    }

    public function AddSubStd()
    {
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $menu_id = $this->input->post('menu_id');
        $std_sub = $this->input->post('std_sub');
        $std_point = $this->input->post('std_point');
        $User = $this->session->ses_id;
        $result = $this->Medel_std_point_request->AddSubjectRequest($subject_id, $semester, $std_sub, $std_point, $User, $menu_id);
        echo json_encode($result);
    }

}
