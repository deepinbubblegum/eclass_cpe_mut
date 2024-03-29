<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Teacher_add_subject extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_add_subject');
    }

    public function Add_Data_ctl_te()
    {
        $data = array(
            'subsem_semester' => $this->input->post('semester_id'),
            'subsem_subject' => $this->input->post('subject_id'),
            'subsem_teacher' => $this->session->userdata('ses_id')
        );
        $this->Model_te_add_subject->Add_data_model_subject($data);
        $this->genDir($this->input->post('semester_id'),$this->input->post('subject_id'));

        if($this->input->post('img_data') == ''){
            $data_img = 'iVBORw0KGgoAAAANSUhEUgAAAPoAAAC0CAMAAACKYMETAAAAA1BMVEWu1ee2vQsxAAAAQ0lEQVR4nO3BgQAAAADDoPlT3+AEVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzwCwfAAB3a7udgAAAABJRU5ErkJggg==';
            $img_decode = base64_decode($data_img);
            $path_full = FCPATH.'Img_sem/'.$this->input->post('semester_id').$this->input->post('subject_id');
            $image = $path_full.'.png';
            file_put_contents($image, $img_decode);
        }else{
            $data_img = $this->input->post('img_data');
            $img_array = explode("[removed]", $data_img);
            $img_decode = base64_decode($img_array[1]);
            $path_full =  FCPATH.'Img_sem/'.$this->input->post('semester_id').$this->input->post('subject_id');
            $image = $path_full.'.png';
            file_put_contents($image, $img_decode);
        }

    }

    public function Change_image_ctl_te()
    {
        if($this->input->post('img_data') == ''){
            $data_img = 'iVBORw0KGgoAAAANSUhEUgAAAPoAAAC0CAMAAACKYMETAAAAA1BMVEWu1ee2vQsxAAAAQ0lEQVR4nO3BgQAAAADDoPlT3+AEVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzwCwfAAB3a7udgAAAABJRU5ErkJggg==';
            $img_decode = base64_decode($data_img);
            $path_full = FCPATH.'Img_sem/'.$this->input->post('semester_id').$this->input->post('subject_id');
            $image = $path_full.'.png';
            file_put_contents($image, $img_decode);
        }else{
            $data_img = $this->input->post('img_data');
            $img_array = explode("[removed]", $data_img);
            $img_decode = base64_decode($img_array[1]);
            $path_full =  FCPATH.'Img_sem/'.$this->input->post('semester_id').$this->input->post('subject_id');
            $image = $path_full.'.png';
            file_put_contents($image, $img_decode);
        }
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

    public function Add_SubJoin_Data_ctl_te()
    {
        $semes = $this->input->post('$semes[]');
        $sub = $this->input->post('$sub[]');
        $subjoin = $this->input->post('$subjoin[]');
        // print_r($semes);
        // $arrayLength = count($semes);
        // for ($i = 0; $i < $arrayLength; $i++)  {
        //     echo $semes[$i] ."<br />";
        // }
        $this->Model_te_add_subject->Add_Subject_Join($semes,$sub,$subjoin);
    }

    public function Edit_SubJoin_Data_ctl_te()
    {
        $semester_edit = $this->input->post('semester_edit');
        $subject_edit = $this->input->post('subject_edit');
        $subjoin = $this->input->post('subjoin[]');
        $this->Model_te_add_subject->Edit_Subject_Join($semester_edit, $subject_edit, $subjoin);
    }

    public function Edit_NoSubJoin_Data_ctl_te()
    {
        $semester_edit = $this->input->post('semester_edit');
        $subject_edit = $this->input->post('subject_edit');
        $this->Model_te_add_subject->Edit_NoSubject_Join($semester_edit, $subject_edit);
    }

    public function getOnwer_teacher()
    {
        $user = $this->session->userdata('ses_id');
        $result = $this->Model_te_add_subject->getOnwer_teacher_model($user);
        echo json_encode($result);
    }

    public function getSubjectCopy()
    {
        $semester = $this->input->post('semester');
        $te_id = $this->session->userdata('ses_id');
        $result = $this->Model_te_add_subject->SubjectCopy($semester, $te_id);
        echo json_encode($result);
    }

    public function Add_SubCopy()
    {
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $SemCopy = $this->input->post('SemCopy');
        $SubCopy = $this->input->post('SubCopy');
        $te_id = $this->session->userdata('ses_id');
        $this->Model_te_add_subject->Add_Data_Subject_Copy($semester, $subject_id, $SemCopy, $SubCopy, $te_id);
    }

    public function Preview_Anc()
    {
        $SemCopy = $this->input->post('SemCopy');
        $SubCopy = $this->input->post('SubCopy');
        $result = $this->Model_te_add_subject->Preview_Anc_model($SemCopy, $SubCopy);
        echo json_encode($result);
    }

    public function Preview_HeadScore()
    {
        $SemCopy = $this->input->post('SemCopy');
        $SubCopy = $this->input->post('SubCopy');
        $result = $this->Model_te_add_subject->Preview_HeadScore_model($SemCopy, $SubCopy);
        echo json_encode($result);
    }

    public function Preview_Score()
    {
        $SemCopy = $this->input->post('SemCopy');
        $SubCopy = $this->input->post('SubCopy');
        $socre_id = $this->input->post('score_id');
        $result = $this->Model_te_add_subject->Preview_Score_model($SemCopy, $SubCopy, $socre_id);
        echo json_encode($result);
    }

    public function Preview_HeadDownload()
    {
        $SemCopy = $this->input->post('SemCopy');
        $SubCopy = $this->input->post('SubCopy');
        $result = $this->Model_te_add_subject->Preview_HeadDownload_model($SemCopy, $SubCopy);
        echo json_encode($result);
    }

    public function Preview_Dow()
    {
        $SemCopy = $this->input->post('SemCopy');
        $SubCopy = $this->input->post('SubCopy');
        $dow_id = $this->input->post('dow_id');
        $result = $this->Model_te_add_subject->Preview_Dow_model($SemCopy, $SubCopy, $dow_id);
        echo json_encode($result);
    }

    public function Preview_upload()
    {
        $SemCopy = $this->input->post('SemCopy');
        $SubCopy = $this->input->post('SubCopy');
        $result = $this->Model_te_add_subject->Preview_upload_model($SemCopy, $SubCopy);
        echo json_encode($result);
    }

    public function Preview_media()
    {
        $SemCopy = $this->input->post('SemCopy');
        $SubCopy = $this->input->post('SubCopy');
        $result = $this->Model_te_add_subject->Preview_media_model($SemCopy, $SubCopy);
        echo json_encode($result);
    }

    public function Preview_HeadQuiz()
    {
        $SemCopy = $this->input->post('SemCopy');
        $SubCopy = $this->input->post('SubCopy');
        $result = $this->Model_te_add_subject->Preview_HeadQuiz_model($SemCopy, $SubCopy);
        echo json_encode($result);
    }

    public function Preview_Quiz()
    {
        $SemCopy = $this->input->post('SemCopy');
        $SubCopy = $this->input->post('SubCopy');
        $Quiz_id = $this->input->post('Quiz_id');
        $result = $this->Model_te_add_subject->Preview_Quiz_model($SemCopy, $SubCopy, $Quiz_id);
        echo json_encode($result);
    }

    public function Preview_vote()
    {
        $SemCopy = $this->input->post('SemCopy');
        $SubCopy = $this->input->post('SubCopy');
        $result = $this->Model_te_add_subject->Preview_vote_model($SemCopy, $SubCopy);
        echo json_encode($result);
    }
    
}
