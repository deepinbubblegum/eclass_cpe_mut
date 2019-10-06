<?php
defined('BASEPATH') or exit('No direct script access allowed');
class User_uses extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('sign_in/Model_user_uses');
        }

        // public function sign_in()
        // {
        //         $username = $this->input->post('username');
        //         $password = $this->input->post('password');
        //         $sign_status = $this->Model_user_uses->sign_in_ck($username, $password);
        //         if ($sign_status != false) {
        //                 $getpermis = $this->Model_user_uses->get_permis_name($sign_status[0]['user_permission']);
        //                 if ($getpermis != false) {
        //                         $newdata = array(
        //                                 'ses_id' => $sign_status[0]['user_code_id'],
        //                                 'ses_tname' => $sign_status[0]['user_Tname'],
        //                                 'ses_ename' => $sign_status[0]['user_Ename'],
        //                                 'ses_mojor_id' => $sign_status[0]['user_major'],
        //                                 'ses_per' => $sign_status[0]['user_permission'],
        //                                 'ses_major_name' => $sign_status[0]['major_name'],
        //                                 'ses_per_name' => $getpermis
        //                         );
        //                         $this->session->set_userdata($newdata);
        //                         redirect();
        //                 }
        //         }
        //         show_404();
        // }

        public function sign_in()
        {
                $username = $this->input->post('username');
                $password = sha1('7x33gv3a4dfc' . $this->input->post('password'));
                $sign_status = $this->Model_user_uses->sign_in_ck($username, $password);
                if ($sign_status != false) {
                        if ($sign_status[0]['std_code_id'] != '') {
                                $newdata = array(
                                        'ses_id' => $sign_status[0]['std_code_id'],
                                        'ses_tname' => $sign_status[0]['std_Tname'],
                                        'ses_ename' => $sign_status[0]['std_Ename'],
                                        'ses_mojor_id' => $sign_status[0]['std_major'],
                                        'ses_status' => 'student'
                                );
                                $this->session->set_userdata($newdata);
                        } else if ($sign_status[0]['teacher_code_id'] != '') {
                                $newdata = array(
                                        'ses_id' => $sign_status[0]['teacher_code_id'],
                                        'ses_tname' => $sign_status[0]['teacher_Tname'],
                                        'ses_ename' => $sign_status[0]['teacher_Ename'],
                                        'ses_status' => 'teacher'
                                );
                                $this->session->set_userdata($newdata);
                        } else if ($sign_status[0]['admin_id'] != '') {
                                $newdata = array(
                                        'ses_id' => $sign_status[0]['admin_id'],
                                        'ses_tname' => $sign_status[0]['admin_Tname'],
                                        'ses_ename' => $sign_status[0]['admin_Ename'],
                                        'ses_status' => 'admin'
                                );
                                $this->session->set_userdata($newdata);
                        }
                        redirect();
                }else{
                        show_404();
                }
        }

        public function sign_out()
        {
                $this->session->sess_destroy();
                redirect();
        }
}
