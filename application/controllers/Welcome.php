<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Welcome extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->lang->load('header');
		$this->lang->load('welcome');
	}

	public function index()
	{
		$this->load->view('template/header_view');
		$this->load->view('template/side_menu_view');
		$this->load->view('student/welcome_view');
		$this->load->view('template/footer_view');
	}
}
