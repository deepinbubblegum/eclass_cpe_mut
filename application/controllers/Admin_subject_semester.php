<?php
defined('BASEPATH') or exit('No direct script access allowed');
function rrmdir($dir) { 
    if (is_dir($dir)) { 
      $objects = scandir($dir); 
      foreach ($objects as $object) { 
        if ($object != "." && $object != "..") { 
          if (filetype($dir."/".$object) == "dir") rrmdir($dir."/".$object); else unlink($dir."/".$object); 
        } 
      } 
      reset($objects); 
      rmdir($dir); 
    } 
 }
class Admin_subject_semester extends MY_Controller
{
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_su/Model_su_subject_semester');
    }

    public function Show_Max_Data_ctl()
    {
        $result = $this->Model_su_subject_semester->Show_Max_Data_model();
        echo json_encode($result);
    }

    public function Show_Data_ctl()
    {
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_subject_semester->Show_Data_Subject_Semester_model($limit,$start);
        echo json_encode($result);
    }

    public function Add_Data_ctl()
    {
        $data = array(
            'subsem_semester' => $this->input->post('semester_id'),
            'subsem_subject' => $this->input->post('subject_id'),
            'subsem_teacher' => $this->input->post('teacher_id'),
        );
        $this->Model_su_subject_semester->Add_data_model($data);
        
        $this->genDir($this->input->post('semester_id'),$this->input->post('subject_id'));
    }

    public function Edit_Data_ctl()
    {
        $org_id = $this->input->post('org_id');
        $org_sub = $this->input->post('org_sub');
        $data = array(
            'subsem_semester' => $this->input->post('semester_id'),
            'subsem_subject' => $this->input->post('subject_id'),
            'subsem_teacher' => $this->input->post('teacher_id'),
        );
        $this->Model_su_subject_semester->Edit_data_model($org_id, $org_sub, $data);
        
        $dir = '../uploads/file/'.$this->input->post('org_id').$this->input->post('org_sub');
        $ndir = '../uploads/file/'.$this->input->post('semester_id').$this->input->post('subject_id');
        if (is_dir($dir)) {
            //mkdir('../uploads/file/' . $this->input->post('semester_id').$this->input->post('subject_id'), 0777);
            //rename($oldname, $newname);
            rename($dir, $ndir); 
        }
    } 

    public function Delete_Data_ctl()
    {
        $data_semester = $this->input->post('data_semester[]');
        $data_subject = $this->input->post('data_subject[]');
        
        $this->Model_su_subject_semester->Delete_Data_model($data_semester, $data_subject);

        for($i = 0 ; $i < count($data_semester) ; $i++){
            $dir = '../uploads/file/'.$data_semester[$i].$data_subject[$i]; 
            rrmdir($dir);
        }
         
    }

    public function showTeacher()
    { 
        $result = $this->Model_su_subject_semester->getTeacher();
        echo json_encode($result);
    }

    public function takeTeacher()
    { 
        $subjectId = $this->input->post('subject');
        $result = $this->Model_su_subject_semester->selectTeacher($subjectId);
        echo json_encode($result);
    }

    public function takeSubject()
    { 
        $subjectId = $this->input->post('teacher');
        $result = $this->Model_su_subject_semester->selectSubject($subjectId);
        echo json_encode($result);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $result = $this->Model_su_subject_semester->Search_data_model($keyword,$type);
        echo json_encode($result);
    }

    public function get_teacher()
    {
        $selectAddSemester = $this->input->post('selectAddSemester');
        $this->Model_su_subject_semester->get_sub_teacher($selectAddSemester);
    }
}
