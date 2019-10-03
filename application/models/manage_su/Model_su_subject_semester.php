<?php

class Model_su_subject_semester extends CI_Model
{

    public function Show_Max_Data_model()
    {
        $query = $this->db->get('subject_semester');
        return $query->num_rows();
    }

    public function Show_Data_Subject_Semester_model($limit = null, $start = null)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('semester_id,semester_name,subject_id, subject_name, subject_teacher');
        $this->db->from('subject_semester');
        $this->db->join('semester', 'subject_semester.subsem_semester = semester.semester_id', 'inner');
        $this->db->join('subject', 'subject_semester.subsem_subject = subject.subject_id', 'left');
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
        $this->db->insert('subject_semester', $data);
    }


    public function Edit_data_model($org_id, $org_sub, $data)
    {
        $this->db->where('subsem_semester', $org_id);
        $this->db->where('subsem_subject', $org_sub);
        $this->db->update('subject_semester', $data);
    }


    public function Delete_Data_model($data_semester, $data_subject)
    {
        $this->db->where_in('subsem_semester', $data_semester);
        $this->db->where_in('subsem_subject', $data_subject);
        $this->db->delete('subject_semester');
    }


    public function Search_data_model($keyword, $type)
    {
        $this->db->select('semester_id,semester_name,subject_id, subject_name');
        $this->db->from('subject_semester');
        $this->db->join('semester', 'subject_semester.subsem_semester = semester.semester_id', 'inner');
        $this->db->join('subject', 'subject_semester.subsem_subject = subject.subject_id', 'left');
        if ($type != null) {
            $this->db->like($type, $keyword);
        } else {
            $this->db->like('semester_name', $keyword);
            $this->db->or_like('subject_name', $keyword);
        }
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
}
