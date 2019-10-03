<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_add_subject extends CI_Model
{
    public function Show_Data_subject_model($semester, $te_id)
    {

        // $this->db->select('id, name, subject_id, subject_name, id, user_code_id, user_Ename');
        // $this->db->from('teacher_subject');
        // $this->db->where('user_code_id', '25610002');
        // $this->db->join('semester', 'teacher_subject.teasub_semester = semester.id' , 'inner');
        // $this->db->join('subject', 'teacher_subject.teasub_subject = subject.subject_id', 'left');
        // $this->db->join('user_data', 'teacher_subject.teasub_teacher = user_data.user_code_id', 'left');
        // $this->db->where('teacher_subject.teasub_semester', $semester);
        // $query = $this->db->get();

        $query = $this->db->query('SELECT semester_id, semester_name, subject_id, subject_name, user_code_id, user_Ename
            FROM subject_semester 
            INNER JOIN subject
            ON subsem_subject = subject_id
            INNER JOIN semester
            ON subsem_semester = semester.semester_id
            INNER JOIN user_data
            ON subject_teacher = user_code_id
            WHERE semester_id = ' . $semester . ' AND user_code_id = '.$te_id);
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Show_Data_subject_add_model($te_id)
    {
        $query = $this->db->query('SELECT subject_id, subject_name, subject_teacher
            FROM subject
            WHERE subject_teacher = "'.$te_id.'"');
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
}
