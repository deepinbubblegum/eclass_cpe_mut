<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Gen_ticket extends MY_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->model('manage_te/Model_te_ticket');
        }

        public function index(){

        }
}