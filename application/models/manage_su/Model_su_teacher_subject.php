<?php

class Model_su_teacher_subject extends CI_Model
{

    public function Show_Max_Data_model()
    {
        $query = $this->db->get('teacher_subject');
        return $query->num_rows();
    }

    public function Show_Data_Teacher_Subject_model($limit = null, $start = null)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('semester_id,semester_name,subject_id, subject_name,user_code_id,user_Ename');
        $this->db->from('teacher_subject');
        $this->db->join('semester', 'teacher_subject.teasub_semester = semester.semester_id', 'inner');
        $this->db->join('subject', 'teacher_subject.teasub_subject = subject.subject_id', 'left');
        $this->db->join('user_data', 'teacher_subject.teasub_teacher = user_data.user_code_id', 'left');
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }


    public function Add_data_model($data)
    {
        $this->db->insert('teacher_subject', $data);
    }


    public function Edit_data_model($org_semester, $org_subject, $user_data, $data)
    {
        $this->db->where('teasub_semester', $org_semester);
        $this->db->where('teasub_subject', $org_subject);
        $this->db->where('teasub_teacher', $user_data);
        $this->db->update('teacher_subject', $data);
    }


    public function Delete_Data_model($data_semester, $data_subject, $data_teacher)
    {
        $this->db->where_in('teasub_semester', $data_semester);
        $this->db->where_in('teasub_subject', $data_subject);
        $this->db->where_in('teasub_teacher', $data_teacher);
        $this->db->delete('teacher_subject');
    }


    public function Search_data_model($keyword, $type)
    {
        $this->db->select('semester_id,semester_name,subject_id, subject_name,user_code_id,user_Ename , teasub_subject');
        $this->db->from('teacher_subject');
        $this->db->join('semester', 'teacher_subject.teasub_semester = semester.semester_id', 'inner');
        $this->db->join('subject', 'teacher_subject.teasub_subject = subject.subject_id', 'left');
        $this->db->join('user_data', 'teacher_subject.teasub_teacher = user_data.user_code_id', 'left');
        if ($type != null) {

            $this->db->like($type, $keyword);
        } else {
            $this->db->like('semester_name', $keyword);
            $this->db->or_like('subject_name', $keyword);
            $this->db->or_like('user_Ename', $keyword);
        }
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Show_Data_Semester_model()
    {
        $this->db->select('distinct(subject_semester.subsem_semester),semester_name');
        $this->db->from('subject_semester');
        $this->db->join('semester', 'subject_semester.subsem_semester = semester.semester_id', 'inner');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Show_Data_Subject_model($data)
    {
        $this->db->select('subsem_subject,subject_name');
        $this->db->from('subject_semester');
        $this->db->join('subject', 'subject_semester.subsem_subject = subject.subject_id', 'inner');
        $this->db->where('subsem_semester', $data);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
}
