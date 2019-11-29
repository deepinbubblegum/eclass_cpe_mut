<?php
defined('BASEPATH') or exit('No direct script access allowed');
class User_uses extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('sign_in/Model_user_uses');
        }

        public function sign_in()
        {
                $username = $this->input->post('username');
                $password = $this->encryption_pass($this->input->post('password'));
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
                        } else if ($sign_status[0]['teacher_code_id'] != '' && $sign_status[0]['teacher_admin'] == '0') {
                                $newdata = array(
                                        'ses_id' => $sign_status[0]['teacher_code_id'],
                                        'ses_tname' => $sign_status[0]['teacher_Tname'],
                                        'ses_ename' => $sign_status[0]['teacher_Ename'],
                                        'ses_status' => 'teacher'
                                );
                                $this->session->set_userdata($newdata);
                        } else if ($sign_status[0]['teacher_code_id'] != '' && $sign_status[0]['teacher_admin'] == '1') {
                                $newdata = array(
                                        'ses_id' => $sign_status[0]['teacher_code_id'],
                                        'ses_tname' => $sign_status[0]['teacher_Tname'],
                                        'ses_ename' => $sign_status[0]['teacher_Ename'],
                                        'ses_status' => 'admin'
                                );
                                $this->session->set_userdata($newdata);
                        }
                        redirect();
                } else {
                        show_404();
                }
        }

        public function sign_out()
        {
                $this->session->sess_destroy();
                redirect();
        }

        public function password_change()
        {
                $passwd = $this->encryption_pass($this->input->post('passwd'));
                $this->Model_user_uses->update_password($this->session->ses_status, $this->session->ses_id, $passwd);
        }
}
