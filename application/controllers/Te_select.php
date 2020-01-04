<?php
defined('BASEPATH') or exit('No direct script access allowed');

// function convertData($sid)
// {
//         $str_arr = explode("-", $sid);
//         $data = array(
//                 'subject_id' => $str_arr[0],
//                 'semester' => $str_arr[1]
//         );
//         return $data;
// }

class Te_select extends MY_Controller
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
                $this->load->view('teacher/template_te/select/header_view', $data);
                $this->load->view('teacher/template_te/select/side_menu_view', $data);
                $this->load->view('teacher/annouce_view', $data);
                $this->load->view('teacher/template_te/footer_te_view');
        }

        public function score($sid)
        {
                $data = $this->convertData($sid);
                $bit = $this->session->ses_permission;
                if (substr($bit, 3, 1) == '1' || $bit == '0') {
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
                $data = $this->convertData($sid);
                $bit = $this->session->ses_permission;
                if (substr($bit, 2, 1) == '1' || $bit == '0') {
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
                $data = $this->convertData($sid);
                $bit = $this->session->ses_permission;
                if (substr($bit, 1, 1) == '1' || $bit == '0') {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/downloads_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
        }

        public function media($sid)
        {
                $data = $this->convertData($sid);
                $bit = $this->session->ses_permission;
                if (substr($bit, 0, 1) == '1' || $bit == '0') {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/media_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
        }

        public function quiz($sid)
        {
                $data = $this->convertData($sid);
                $bit = $this->session->ses_permission;
                if (substr($bit, 5, 1) == '1' || $bit == '0') {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/quiz_vote_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
        }

        public function vote($sid)
        {
                $data = $this->convertData($sid);
                $bit = $this->session->ses_permission;
                if (substr($bit, 4, 1) == '1' || $bit == '0') {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/vote_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
        }

        public function point_request($sid)
        {
                $data = $this->convertData($sid);
                $bit = $this->session->ses_permission;
                if (substr($bit, 6, 1) == '1' || $bit == '0') {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/point_request_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
        }

        public function menu($sid)
        {
                $data = $this->convertData($sid);
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
                $data = $this->convertData($sid);
                $bit = $this->session->ses_permission;
                if (substr($bit, 9, 1) == '1' || $bit == '0') {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/add_student_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
        }

        public function add_teacher_assist($sid)
        {
                $data = $this->convertData($sid);
                $bit = $this->session->ses_permission;
                if (substr($bit, 8, 1) == '1' || $bit == '0') {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/add_teacher_assist_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
        }

        public function add_permission($sid)
        {
                $data = $this->convertData($sid);
                $bit = $this->session->ses_permission;
                if (substr($bit, 7, 1) == '1' || $bit == '0') {
                        $this->load->view('teacher/template_te/select/header_view', $data);
                        $this->load->view('teacher/template_te/select/side_menu_view', $data);
                        $this->load->view('teacher/add_permission_view', $data);
                        $this->load->view('teacher/template_te/footer_te_view');
                } else {
                        show_404();
                }
        }
}
