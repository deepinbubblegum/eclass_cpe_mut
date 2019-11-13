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
                $this->load->model('manage_te/Model_te_subject');
                $this->load->model('manage_te/Model_te_annouce');
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
                $data = convertData($sid);
                $this->Model_te_annouce->Permission_Medel($data);
                $this->load->view('teacher/template_te/select/header_view', $data);
                $this->load->view('teacher/template_te/select/side_menu_view', $data);
                $this->load->view('teacher/annouce_view', $data);
                $this->load->view('teacher/template_te/footer_te_view');
        }

        public function score($sid)
        {
                $data = convertData($sid);
                $bit = $this->chkPermis($data);
                if (substr($bit, 3, 1) == '1' || $bit == '0' ) {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/score_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
        }

        public function uploads($sid)
        {
                $data = convertData($sid);
                $bit = $this->chkPermis($data);
                if (substr($bit, 2, 1) == '1' || $bit == '0' ) {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/uploads_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
        }

        public function downloads($sid)
        {
                $data = convertData($sid);
                $bit = $this->chkPermis($data);
                if (substr($bit, 1, 1) == '1' || $bit == '0' ) {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/downloads_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
        }

        public function videos($sid)
        {
                $data = convertData($sid);
                $bit = $this->chkPermis($data);
                if (substr($bit, 0, 1) == '1' || $bit == '0' ) {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/videos_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
        }

        public function quiz_vote($sid)
        {
                $data = convertData($sid);
                $bit = $this->chkPermis($data);
                if (substr($bit, 4, 1) == '1' || $bit == '0') {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/quiz_vote_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
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

        public function add_teacher_assist($sid)
        {
                $data = convertData($sid);
                $this->load->view('teacher/template_te/select/header_view', $data);
                $this->load->view('teacher/template_te/select/side_menu_view', $data);
                $this->load->view('teacher/add_teacher_assist_view', $data);
                $this->load->view('teacher/template_te/footer_te_view');
        }

        public function add_permission($sid)
        {
                $data = convertData($sid);
                $this->load->view('teacher/template_te/select/header_view', $data);
                $this->load->view('teacher/template_te/select/side_menu_view', $data);
                $this->load->view('teacher/add_permission_view', $data);
                $this->load->view('teacher/template_te/footer_te_view');
        }
}
