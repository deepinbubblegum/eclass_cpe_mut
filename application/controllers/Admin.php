<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();

        if($this->session->ses_status != 'admin'){
            show_404();
        }
    }

    public function index()
    {
        // $this->input->ip_address();
        // $this->load->view('admin/template_su/header_view');
        // $this->load->view('admin/template_su/side_menu_su_view');
        // $this->load->view('admin/dashboard_su_view');
        // $this->load->view('admin/template_su/footer_su_view');
        redirect('admin/announce');
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

    public function teacher_major_data()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/teacher_major_data_view');
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

    public function announce_personnel()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/announce_su_personnel_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function announce_about_us()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/announce_su_about_us_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function teacher_degree()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/teacher_degree_su_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function course()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/announce_course_view');
        $this->load->view('admin/template_su/footer_su_view');
    }

    public function services()
    {
        $this->load->view('admin/template_su/header_view');
        $this->load->view('admin/template_su/side_menu_su_view');
        $this->load->view('admin/announce_services_view');
        $this->load->view('admin/template_su/footer_su_view');
    }
}
