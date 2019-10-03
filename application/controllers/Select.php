<?php
defined('BASEPATH') or exit('No direct script access allowed');

function convertData($sid)
{
        $str_arr = explode("-", $sid);
        $data = array(
                'subject_id' => $str_arr[0],
                'semester' => $str_arr[1],
                'heading' => 'My Heading',
                'message' => 'My Message'
        );
        return $data;
}

class select extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                if(!isset($this->session->ses_per_name)){
                        show_404();
                }
        }

        public function index()
        {
                // $this->load->view('template/select/header_view', $data);
                // $this->load->view('template/select/side_menu_view');
                // $this->load->view('select_view');
                // $this->load->view('template/footer_view');
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
        //         $this->load->view('template/select/header_view', $data);
        //         $this->load->view('template/select/side_menu_view',$data);
        //         $this->load->view('select_view',$data);
        //         $this->load->view('template/footer_view');
        // }

        public function annouce($sid)
        {
                $data = convertData($sid);
                $this->load->view('template/select/header_view', $data);
                $this->load->view('template/select/side_menu_view', $data);
                $this->load->view('student/select_view', $data);
                $this->load->view('template/footer_view');
        }

        public function score($sid)
        {
                $data = convertData($sid);
                $this->load->view('template/select/header_view', $data);
                $this->load->view('template/select/side_menu_view', $data);
                $this->load->view('student/score_view', $data);
                $this->load->view('template/footer_view');
        }

        public function downloads($sid)
        {
                $data = convertData($sid);
                $this->load->view('template/select/header_view', $data);
                $this->load->view('template/select/side_menu_view', $data);
                $this->load->view('student/downloads_view', $data);
                $this->load->view('template/footer_view');
        }

        public function uploads($sid)
        {
                $data = convertData($sid);
                $this->load->view('template/select/header_view', $data);
                $this->load->view('template/select/side_menu_view', $data);
                $this->load->view('student/uploads_view', $data);
                $this->load->view('template/footer_view');
        }

        public function videos($sid)
        {
                $data = convertData($sid);
                $this->load->view('template/select/header_view', $data);
                $this->load->view('template/select/side_menu_view', $data);
                $this->load->view('student/videos_view', $data);
                $this->load->view('template/footer_view');
        }

        public function quiz_vote($sid)
        {
                $data = convertData($sid);
                $this->load->view('template/select/header_view', $data);
                $this->load->view('template/select/side_menu_view', $data);
                $this->load->view('student/quiz_vote_view', $data);
                $this->load->view('template/footer_view');
        }

        public function scoreTable($sid)
        {
                $str_arr = explode("-", $sid);
                $data = array(
                        'subject_id' => $str_arr[0],
                        'semester' => $str_arr[1],
                        'point_id' => $str_arr[2]
                );
                $this->load->view('student/score_table', $data);
        }
}
