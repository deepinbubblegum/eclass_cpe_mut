<?php  
defined('BASEPATH') OR exit('No direct script access allowed');
class Teacher extends MY_Controller {  
     
    public function __construct()
    {
        parent::__construct();
    }  
 
    public function index()
    {
        $this->load->view('teacher/template_te/header_view');
        $this->load->view('teacher/template_te/side_menu_te_view');
        $this->load->view('teacher/subject_te_view');
        $this->load->view('teacher/template_te/footer_te_view');
    }

    public function subject_menu($data=null)
    {
        $this->load->view('teacher/template_te/header_view');
        $this->load->view('teacher/template_te/side_menu_te_view');
        $this->load->view('teacher/subject_menu_te_view');
        $this->load->view('teacher/template_te/footer_te_view');
    }

    public function add_teacher_subject($data=null)
    {
        $this->load->view('teacher/template_te/header_view');
        $this->load->view('teacher/template_te/side_menu_te_view');
        $this->load->view('teacher/add_teacher_subject_te_view');
        $this->load->view('teacher/template_te/footer_te_view');
    }

    // public function add_subject($data=null)
    // {
    //     $this->load->view('teacher/template_te/header_view');
    //     $this->load->view('teacher/template_te/side_menu_te_view');
    //     $this->load->view('teacher/add_subject_te_view');
    //     $this->load->view('teacher/template_te/footer_te_view');
    // }

    // public function add_subject($data=null){
        
    // }
}