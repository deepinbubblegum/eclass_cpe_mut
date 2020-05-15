<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Services extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('template/header_view');
		$this->load->view('template/side_menu_view');
		$this->load->view('student/services_view');
		$this->load->view('template/footer_view');
	}
}
