<?php
defined('BASEPATH') or exit('No direct script access allowed');

class MY_Controller extends CI_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->changeLang();
        }

        public function changeLang()
        {
                $segs = $this->uri->uri_string();
                if ($this->uri->segment(1) == 'en' || $this->uri->segment(1) == 'th') {
                        $this->session->set_userdata("lang", $this->uri->segment(1));
                }else {
                        if($this->session->lang == 'en'){
                                redirect('en/'.$segs);
                        }else {
                                redirect('th/'.$segs);
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
                $dir = '../uploads/file/'.$semester_id.$subject_id; 
                if (!is_dir($dir)) {
                    mkdir($dir, 0777, true); 
                    chmod($dir, 0777);
        
                    mkdir($dir.'/Downloads', 0777, true); 
                    chmod($dir.'/Downloads', 0777);
        
                    mkdir($dir.'/Uploads', 0777, true); 
                    chmod($dir.'/Uploads', 0777); 
        
                    mkdir($dir.'/CSV', 0777, true); 
                    chmod($dir.'/CSV', 0777);
                }
        }

        public function encryption_pass($password){
                return sha1($this->config->item['encryption_password'].$password);
        }

        public function check_duplicate($data_check){
                $this->load->model('sign_in/Model_user_uses');
                return $this->Model_user_uses->check_duplicate_model($data_check);
         }
}
