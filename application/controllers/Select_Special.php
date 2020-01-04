<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Select_Special extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('manage_te/Model_te_annouce');
                $this->load->model('manage_te/Model_te_subject');
        }

        private function convertData($sid)
        {
                $str_arr = explode("-", $sid);
                $data = array(
                        'subject_id' => $str_arr[0],
                        'semester' => $str_arr[1],
                        'heading' => 'My Heading',
                        'message' => 'My Message'
                );
                if ($this->Model_te_subject->check_subject_semester($data))
                {
                        return $data;
                }else{
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
                echo $result[0]->per_bit;
                if ($result !== 0) {
                        return $result[0]->per_bit;
                }
                return 0;
        }

        public function annouce($sid)
        {
                $data = $this->convertData($sid);
                $this->Model_te_annouce->Permission_Medel($data);
                $this->load->view('template/select/header_special_view', $data);
                $this->load->view('template/select/side_menu_special_view', $data);
                $this->load->view('student/select_view', $data);
                $this->load->view('template/footer_view');
        }

        public function score($sid)
        {
                $data = $this->convertData($sid);
                $this->load->view('template/select/header_special_view', $data);
                $this->load->view('template/select/side_menu_special_view', $data);
                $this->load->view('student/score_special_view', $data);
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
                if ($this->Model_te_subject->check_subject_semester($data))
                {
                        $this->load->view('student/score_table_special', $data);
                }else{
                        show_404();
                }
        }

        public function score_special($sid)
        {
                $data = $this->convertData($sid);
                $this->load->view('template/select/header_special_view', $data);
                $this->load->view('template/select/side_menu_special_view', $data);
                $this->load->view('student/score_request_view', $data);
                $this->load->view('template/footer_view');
        }
}
