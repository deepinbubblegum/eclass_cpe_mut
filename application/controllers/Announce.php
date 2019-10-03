<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Announce extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('Model_user_announce');
        }

        public function announce_showdata_ctl()
        {
                $result = $this->Model_user_announce->announce_showdata_model();
                echo json_encode($result);
        }
}
