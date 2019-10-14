<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_subject extends CI_Model
{
    public function Show_Data_subject_model($semester,$userID)
    {
        // $this->db->select('semester_id, semester_name, subject_id, subject_name, user_code_id, user_Ename');
        // $this->db->from('teacher_subject');
        // $this->db->join('semester', 'teacher_subject.teasub_semester = semester.semester_id' , 'inner');
        // $this->db->join('subject', 'teacher_subject.teasub_subject = subject.subject_id', 'left');
        // $this->db->join('user_data', 'teacher_subject.teasub_teacher = user_data.user_code_id', 'left');
        // $this->db->where('teacher_subject.teasub_semester', $semester);
        // $this->db->where('user_code_id', '25610002');
        // $query = $this->db->get();
        
        $query = $this->db->query('SELECT semester_id, semester_name, subject_id, subject_name, user_code_id, user_Ename
            from teacher_subject
            inner join semester 
            ON teacher_subject.teasub_semester = semester.semester_id
            LEFT JOIN subject 
            ON teacher_subject.teasub_subject = subject.subject_id
            LEFT JOIN user_data 
            ON teacher_subject.teasub_teacher = user_data.user_code_id
            where teasub_semester = '.$semester.' AND  user_code_id = "'.$userID.'"');
        if ($query->num_rows() > 0) {
            return $query->result();
        }
    }

    public function selectSubject($data,$userID)
    { 
        $query = $this->db->query('SELECT subsem_subject,subject_name,subsem_semester FROM subject_semester 
        LEFT JOIN subject ON subject_id = subsem_subject 
        WHERE subsem_semester = "'.$data.'" AND subsem_teacher = "'.$userID.'" ');
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function selectSubjectForAssist($data,$userID)
    {
        $query = $this->db->query('SELECT subject_id, subject_name ,teaassist_semester , per_bit FROM teacher_assist 
        LEFT JOIN subject ON subject_id = teaassist_subject
        LEFT JOIN permission ON per_id = teaassist_permission
        WHERE teaassist_semester = "'.$data.'" AND teaassist_teacherid = "'.$userID.'" GROUP BY teaassist_teacherid ');
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Show_Permission_bit($semester,$subject,$userID)
    {
        $query = $this->db->query('SELECT per_bit FROM teacher_assist 
        LEFT JOIN permission ON per_id = teaassist_permission
        WHERE teaassist_semester = "'.$semester.'" AND teaassist_subject = "'.$subject.'" AND teaassist_teacherid = "'.$userID.'" ');
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
    
}