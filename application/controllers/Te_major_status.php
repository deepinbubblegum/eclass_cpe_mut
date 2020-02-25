<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Te_major_status extends MY_Controller
{
        public function __construct()
        {
            parent::__construct(); 
            $this->load->model('manage_te/Model_te_major_status');
        }

        public function te_major_status_show()
        {
            $result = $this->Model_te_major_status->te_major_show($this->session->ses_id);
            echo json_encode($result);
        }
}