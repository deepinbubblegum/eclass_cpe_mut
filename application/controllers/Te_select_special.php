<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Te_select_special extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        if ($this->session->ses_status != 'teacher' && $this->session->ses_status != 'admin') {
            show_404();
        }
        $this->load->model('manage_te/Model_te_subject');
        $this->load->model('manage_te/Model_te_annouce');
    }

    private function convertData($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1]
        );
        if ($this->Model_te_subject->check_subject_semester($data)) {
            return $data;
        } else {
            show_404();
        }
    }

    public function index()
    {
        show_404();
    }

    public function chkPermis($data)
    {
        $userID = $this->session->ses_id;
        // $data['semester'];
        $result = $this->Model_te_subject->Show_Permission_bit($data['semester'], $data['subject_id'], $userID);
        //echo $result[0]->per_bit;
        if ($result !== 0) {
            return $result[0]->per_bit;
        }
        return 0;
    }

    public function annouce($sid)
    {
        $data = $this->convertData($sid);
        $this->Model_te_annouce->Permission_Medel($data);
        $this->load->view('teacher/template_te/select/header_special_view', $data);
        $this->load->view('teacher/template_te/select/side_menu_special_view', $data);
        $this->load->view('teacher/annouce_view', $data);
        $this->load->view('teacher/template_te/footer_te_view');
    }

    public function score($sid)
    {
        $data = $this->convertData($sid);
        $bit = $this->session->ses_permission;
        if (substr($bit, 0, 1) == '1' || $bit == '0') {
            $this->load->view('teacher/template_te/select/header_special_view', $data);
            $this->load->view('teacher/template_te/select/side_menu_special_view', $data);
            $this->load->view('teacher/special_score_view', $data);
            $this->load->view('teacher/template_te/footer_te_view');
        } else {
            show_404();
        }
    }

    public function special_point($sid)
    {
        $data = $this->convertData($sid);
        $bit = $this->session->ses_permission;
        if (substr($bit, 1, 1) == '1' || $bit == '0') {
            $this->load->view('teacher/template_te/select/header_special_view', $data);
            $this->load->view('teacher/template_te/select/side_menu_special_view', $data);
            $this->load->view('teacher/special_point_view', $data);
            $this->load->view('teacher/template_te/footer_te_view');
        } else {
            show_404();
        }
    }

    public function scoreTable($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            'point_id' => $str_arr[2]
        );
        $this->load->view('teacher/score_table_special', $data);
    }

    public function add_teacher_assist($sid)
    {
        $data = $this->convertData($sid);
        $bit = $this->session->ses_permission;
        if (substr($bit, 3, 1) == '1' || $bit == '0') {
            $this->load->view('teacher/template_te/select/header_special_view', $data);
            $this->load->view('teacher/template_te/select/side_menu_special_view', $data);
            $this->load->view('teacher/add_teacher_assist_special_view', $data);
            $this->load->view('teacher/template_te/footer_te_view');
        } else {
            show_404();
        }
    }

    public function add_permission($sid)
    {
        $data = $this->convertData($sid);
        $bit = $this->session->ses_permission;
        if (substr($bit, 2, 1) == '1' || $bit == '0') {
            $this->load->view('teacher/template_te/select/header_special_view', $data);
            $this->load->view('teacher/template_te/select/side_menu_special_view', $data);
            $this->load->view('teacher/add_permission_special_view', $data);
            $this->load->view('teacher/template_te/footer_te_view');
        } else {
            show_404();
        }
    }
}
