<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Notfound extends MY_Controller
{
	public function index()
	{
		$this->load->view('notfound_view');
	}
}
