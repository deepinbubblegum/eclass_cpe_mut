<?php
defined('BASEPATH') or exit('No direct script access allowed');

function convertData($sid)
{
        $str_arr = explode("-", $sid);
        $data = array(
                'subject_id' => $str_arr[0],
                'semester' => $str_arr[1]
        );
        return $data;
}

class Te_select extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                if ($this->session->ses_per_name == 'student') {
                        show_404();
                }
        }

        public function index()
        {
                // $this->load->view('teacher/template_te/header_view', $data);
                // $this->load->view('teacher/template_te/select/side_menu_view');
                // $this->load->view('select_view');
                // $this->load->view('teacher/template_te/footer_te_view');
        }

        // public function index($sid)
        // {
        //         $str_arr = explode ("-", $sid);  
        //         $data = array(
        //                 'subject_id' => $str_arr[0],
        //                 'semester' => $str_arr[1],
        //                 'heading' => 'My Heading',
        //                 'message' => 'My Message'
        //         ); 
        //         $this->load->view('teacher/template_te/header_view', $data);
        //         $this->load->view('teacher/template_te/select/side_menu_view',$data);
        //         $this->load->view('select_view',$data);
        //         $this->load->view('teacher/template_te/footer_te_view');
        // }
        // $this->load->view('teacher/template_te/header_view', $data);
        // $this->load->view('teacher/template_te/side_menu_te_view', $data);
        // $this->load->view('teacher/subject_menu_te_view');
        // $this->load->view('teacher/template_te/footer_te_view');

        public function annouce($sid)
        {
                $data = convertData($sid);
                $this->load->view('teacher/template_te/select/header_view', $data);
                $this->load->view('teacher/template_te/select/side_menu_view', $data);
                $this->load->view('teacher/annouce_view', $data);
                $this->load->view('teacher/template_te/footer_te_view');
        }

        public function score($sid)
        {
                $data = convertData($sid);
                $this->load->view('teacher/template_te/select/header_view', $data);
                $this->load->view('teacher/template_te/select/side_menu_view', $data);
                $this->load->view('teacher/score_view', $data);
                $this->load->view('teacher/template_te/footer_te_view');
        }

        public function uploads($sid)
        {
                $data = convertData($sid);
                $this->load->view('teacher/template_te/select/header_view', $data);
                $this->load->view('teacher/template_te/select/side_menu_view', $data);
                $this->load->view('teacher/uploads_view', $data);
                $this->load->view('teacher/template_te/footer_te_view');
        }

        public function downloads($sid)
        {
                $data = convertData($sid);
                $this->load->view('teacher/template_te/select/header_view', $data);
                $this->load->view('teacher/template_te/select/side_menu_view', $data);
                $this->load->view('teacher/downloads_view', $data);
                $this->load->view('teacher/template_te/footer_te_view');
        }

        public function videos($sid)
        {
                $data = convertData($sid);
                $this->load->view('teacher/template_te/select/header_view', $data);
                $this->load->view('teacher/template_te/select/side_menu_view', $data);
                $this->load->view('teacher/videos_view', $data);
                $this->load->view('teacher/template_te/footer_te_view');
        }

        public function quiz_vote($sid)
        {
                $data = convertData($sid);
                $this->load->view('teacher/template_te/select/header_view', $data);
                $this->load->view('teacher/template_te/select/side_menu_view', $data);
                $this->load->view('teacher/quiz_vote_view', $data);
                $this->load->view('teacher/template_te/footer_te_view');
        }

        public function menu($sid)
        {
                $data = convertData($sid);
                $this->load->view('teacher/template_te/select/header_view', $data);
                $this->load->view('teacher/template_te/select/side_menu_view', $data);
                $this->load->view('teacher/menu_view', $data);
                $this->load->view('teacher/template_te/footer_te_view');
        }

        public function scoreTable($sid)
        {
                $str_arr = explode("-", $sid);
                $data = array(
                        'subject_id' => $str_arr[0],
                        'semester' => $str_arr[1],
                        'point_id' => $str_arr[2]
                );
                $this->load->view('teacher/score_table', $data);
        }

        public function add_student($sid)
        {
                $data = convertData($sid);
                $this->load->view('teacher/template_te/select/header_view', $data);
                $this->load->view('teacher/template_te/select/side_menu_view', $data);
                $this->load->view('teacher/add_student_view', $data);
                $this->load->view('teacher/template_te/footer_te_view');
        }
}
