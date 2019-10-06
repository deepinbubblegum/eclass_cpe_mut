<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        // $this->input->ip_address();
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/dashboard_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function faculty()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/faculty_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    } 

    public function major()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/major_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function permission()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/permission_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function subsemester()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/subject_semester_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function subject()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/subject_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function student_data()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/student_data_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function teacher_data()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/teacher_data_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function admin_data()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/admin_data_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function semester()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/semester_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function teacher_subject()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/teacher_subject_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function announce()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/announce_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    }
}
