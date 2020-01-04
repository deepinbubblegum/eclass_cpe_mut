<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Std_media extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('model_center/Model_media');
        }

        public function show_media()
        {
                $res = $this->Model_media->get_data($this->input->post('subject_id'), $this->input->post('semester'));
                echo json_encode($res);
        }

}