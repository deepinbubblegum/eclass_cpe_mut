<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Announce_personnel extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('Model_user_announce_personnel');
        }

        public function announce_showdata_ctl()
        {
                $result = $this->Model_user_announce_personnel->announce_showdata_model();
                echo json_encode($result);
        }
}
