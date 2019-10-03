<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Teacher_add_subject extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_add_subject');
    }

    public function Add_Data_ctl()
    {
        $data = array(
            'subsem_semester' => $this->input->post('semester_id'),
            'subsem_subject' => $this->input->post('subject_id'),
        );
        $this->Model_te_add_subject->Add_data_model($data);
        
        $this->genDir($this->input->post('semester_id'),$this->input->post('subject_id'));
    }

    public function Add_Data_ctl_te()
    {
        $data = array(
            'teasub_semester' => $this->input->post('semester'),
            'teasub_subject' => $this->input->post('subject'),
            'teasub_teacher' => $this->input->post('teacher')
        );
        $this->Model_te_add_subject->Add_data_model_subject($data);
    }

    public function Show_Data_ctl()
    {
        $semester = $this->input->post('semester');
        $te_id = $this->session->userdata('ses_id');
        $result = $this->Model_te_add_subject->Show_Data_subject_model($semester, $te_id);
        echo json_encode($result);
    }

    public function Subject_Add_data_ctl()
    {
        $te_id = $this->session->userdata('ses_id');
        $result = $this->Model_te_add_subject->Show_Data_subject_add_model($te_id);
        echo json_encode($result);
    }

    public function getSemester(){
        $result = $this->Model_te_add_subject->selectSemester();
        echo json_encode($result);
    }

    public function Show_Data_ctl_Semester()
    {
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_te_add_subject->Show_Data_Semester_model($limit, $start);
        echo json_encode($result);
    }

    public function Edit_Data_ctl()
    {
        $org_semester_id = $this->input->post('org_semester_id');
        $data = array(
            'semester_year' => $this->input->post('semester_year'),
            'semester_part' => $this->input->post('semester_part'),
            'semester_name' => $this->input->post('semester_name'),
            'semester_id' => $this->input->post('semester_id')
        );
        $this->Model_te_add_subject->Edit_data_model($org_semester_id, $data);
    }
    
}
