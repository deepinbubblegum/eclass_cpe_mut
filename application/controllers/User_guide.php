<?php
defined('BASEPATH') or exit('No direct script access allowed');
class User_guide extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        // $this->load->view('admin/template_su/header_view');
        // $this->load->view('admin/template_su/side_menu_su_view');
        // $this->load->view('admin/faculty_su_view');
        // $this->load->view('admin/template_su/footer_su_view');
        $this->load->view('user_guide/index');
    }
}
