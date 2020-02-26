<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Admin_teacher_subject extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_su/Model_su_teacher_subject');
    }

    public function Show_All_teacher_ctl()
    {
        $result = $this->Model_su_teacher_subject->Show_All_teacher_model();
        echo json_encode($result);
    }

    public function Show_Max_Data_ctl()
    {
        $result = $this->Model_su_teacher_subject->Show_Max_Data_model();
        echo json_encode($result);
    }

    public function Show_Data_ctl()
    {
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_teacher_subject->Show_Data_Teacher_Subject_model($limit, $start);
        echo json_encode($result);
    }

    public function Select_Teacher_Add_ctl()
    {
        $data = $this->input->post('data');
        $result = $this->Model_su_teacher_subject->Select_teacher_medel($data);
        echo json_encode($result);
    }

    public function Select_Subject_Add_ctl()
    {
        $data = $this->input->post('data');
        $result = $this->Model_su_teacher_subject->Select_subject_medel($data);
        echo json_encode($result);
    }

    public function Add_Data_ctl()
    {
        // $data = array(
        //     'teasub_subjectid' => $this->input->post('subject'),
        //     'teasub_teacherid' => $this->input->post('teacher')
        // );
        // $this->Model_su_teacher_subject->Add_data_model($data);
        $subject = $this->input->post('data_subject');
        $teacher = $this->input->post('arr_teacher');
        $result = $this->Model_su_teacher_subject->Add_data_model($subject, $teacher);
        echo json_encode($result);
    }

    public function Edit_Data_ctl()
    {
        $org_subject = $this->input->post('iddata');
        // $org_teacher = $this->input->post('org_teacher');
        $subject = $this->input->post('data_subject');
        $teacher = $this->input->post('arr_teacher');
        // $data = array(
        //     'teasub_subjectid' => $this->input->post('subject'),
        //     'teasub_teacherid' => $this->input->post('teacher')
        // );
        $result = $this->Model_su_teacher_subject->Edit_data_model($org_subject, $subject, $teacher);
        echo json_encode($result);
    }

    public function Delete_Data_ctl()
    {
        $data_subject = $this->input->post('data_subject[]');
        $data_teacher = $this->input->post('data_teacher[]');
        $this->Model_su_teacher_subject->Delete_Data_model($data_subject, $data_teacher);
    }

    public function Show_Max_Search_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $result = $this->Model_su_teacher_subject->Show_Max_Search_Data_model($keyword, $type);
        echo json_encode($result);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_teacher_subject->Search_data_model($keyword, $type, $start, $limit);
        echo json_encode($result);
    }

    public function Select_Data_Semester()
    {
        $result = $this->Model_su_teacher_subject->Show_Data_Semester_model();
        echo json_encode($result);
    }

    public function Select_Data_Subject()
    {
        $data = $this->input->post('semester');
        $result = $this->Model_su_teacher_subject->Show_Data_Subject_model($data);
        echo json_encode($result);
    }

    public function Select_Edit_Faculty()
    {
        $data = $this->input->post('datamajor');
        $result = $this->Model_su_teacher_subject->Select_Faculty($data);
        echo json_encode($result);
    }

    public function Show_Sort_ctl()
    {
        $data = $this->input->post('data');
        $sort = $this->input->post('sort');
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_teacher_subject->Show_Sort_model($data, $sort, $start, $limit);
        echo json_encode($result);
    }
}
