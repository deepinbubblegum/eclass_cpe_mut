<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Countdown extends MY_Controller {

	public function index()
	{
		$this->load->view('template/header_view');
		$this->load->view('countdown_view');
	}
}