<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Announce_about_us extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('Model_user_announce_about_us');
        }

        public function announce_showdata_ctl()
        {
                $result = $this->Model_user_announce_about_us->announce_showdata_model();
                echo json_encode($result);
        }
}
