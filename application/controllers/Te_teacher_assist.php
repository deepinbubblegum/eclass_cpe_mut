<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Te_teacher_assist extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_assist');
    }

    public function Show_Max_Data_ctl()
    {
        $subject_id = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $result = $this->Model_te_assist->Show_Max_Data_model($subject_id, $semester);
        echo json_encode($result);
    }

    public function Show_Data_ctl()
    {
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $subject_id = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $result = $this->Model_te_assist->Show_Data_user_data_model($limit, $start, $subject_id, $semester);
        echo json_encode($result);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $subject_id = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $result = $this->Model_te_assist->Search_data_model($keyword,$type,$subject_id,$semester);
        echo json_encode($result);
    }

    public function Teacher_Data_Add()
    {
        $subject_id = $this->input->post('subject_id');
        $result = $this->Model_te_assist->Teacher_Add($subject_id);
        echo json_encode($result);
    }

    public function Teacher__Special_Data_Add()
    {
        $result = $this->Model_te_assist->Teacher__Specail_Add();
        echo json_encode($result);
    }

    public function Permission_Data_Add()
    {
        $subject_id = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $result = $this->Model_te_assist->Permission_Add($subject_id,$semester);
        echo json_encode($result);
    }

    public function Add_Data_ctl()
    {
        // $subject = $this->input->post('subject_id');
        // $semester = $this->input->post('semester');
        // $teacher = $this->input->post('teacher');
        // $permission = $this->input->post('permission');
        $data = array(
            'teaassist_semester' => $this->input->post('semester'),
            'teaassist_subject' => $this->input->post('subject_id'),
            'teaassist_teacherid' => $this->input->post('teacher'),
            'teaassist_permission' => $this->input->post('permission')
        );
        $this->Model_te_assist->Add_data_model($data);
    }

    public function Edit_Data_ctl()
    {
        $teacher_org = $this->input->post('teacher_org');
        $permission_org = $this->input->post('permission_org');
        $data = array(
            'teaassist_semester' => $this->input->post('semester'),
            'teaassist_subject' => $this->input->post('subject_id'),
            'teaassist_teacherid' => $this->input->post('teacher'),
            'teaassist_permission' => $this->input->post('permission')
        );
        $this->Model_te_assist->Edit_data_model($teacher_org,$permission_org,$data);
    }

    public function Delete_Data_ctl()
    {
        $datatea = $this->input->post('$data[]');
        $dataper = $this->input->post('$data[]');
        $subject = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $this->Model_te_assist->Delete_Data_model($datatea,$dataper,$subject,$semester);
    }
    
}