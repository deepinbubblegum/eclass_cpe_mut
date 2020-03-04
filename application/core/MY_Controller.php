<?php
defined('BASEPATH') or exit('No direct script access allowed');

class MY_Controller extends CI_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->changeLang();
                $this->lang->load('language');
        }

        public function changeLang()
        {
                $segs = $this->uri->uri_string();
                if ($this->uri->segment(1) == 'en' || $this->uri->segment(1) == 'th') {
                        $this->session->set_userdata("lang", $this->uri->segment(1));
                } else {
                        if ($this->session->lang == 'en') {
                                redirect('en/' . $segs);
                        } else {
                                redirect('th/' . $segs);
                        }
                }

                if ($this->session->lang == 'en') {
                        $this->config->set_item('language', 'english');
                } else {
                        $this->config->set_item('language', 'thailand');
                }
        }

        public function genDir($semester_id, $subject_id)
        {
                $this->load->helper('path');
                $dir = '/Eclass/uploads/file/' . $semester_id . $subject_id;
                if (!is_dir($dir)) {
                        mkdir($dir, 0700, true);
                        chmod($dir, 0700);

                        mkdir($dir . '/Downloads', 0700, true);
                        chmod($dir . '/Downloads', 0700);

                        mkdir($dir . '/Uploads', 0700, true);
                        chmod($dir . '/Uploads', 0700);

                        mkdir($dir . '/Img', 0700, true);
                        chmod($dir . '/Img', 0700);

                        mkdir($dir . '/CSV', 0700, true);
                        chmod($dir . '/CSV', 0700);
                }
        }

        public function encryption_pass($password)
        {
                $key_get = $this->config->item('encryption_password');
                return sha1($key_get.$password);
        }

        public function check_duplicate($data_check)
        {
                $this->load->model('sign_in/Model_user_uses');
                return $this->Model_user_uses->check_duplicate_model($data_check);
        }

        public function sys_log($u_id = null, $log_head = null, $log_txt = null)
        {
                $this->load->model('log/Model_log');
                $data = array(
                        'log_userid' => $u_id,
                        'log_header' => $log_head,
                        'log_txt' => $log_txt,
                        'log_time' => date("Y-m-d H:i:s")
                );
                $this->Model_log->log_s($data);
        }
}
