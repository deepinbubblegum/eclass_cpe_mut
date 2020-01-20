<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_teacher extends CI_Model
{

    public function Show_Max_Data_model()
    {
        $query = $this->db->get('teacher');
        return $query->num_rows();
    }

    public function Show_Data_Teacher_model($limit = null, $start = null)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('teacher_code_id, teacher_Tname, teacher_Ename, teacher_email, teacher_username, de_Tname, de_Ename , de_id');
        $this->db->from('teacher');
        $this->db->join('degree', 'teacher.teacher_degree = degree.de_id', 'left');
        $this->db->order_by("de_grade", "asc");
        $this->db->order_by("teacher_Ename", "asc");
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Search_data_model($data, $keyword)
    {
        $this->db->select('*');
        $this->db->from('teacher');
        $this->db->join('degree', 'teacher.teacher_degree = degree.de_id', 'left');
        if ($data != null) {
            $this->db->or_like($data, $keyword);
        } else {
            $this->db->like('teacher_code_id', $keyword);
            $this->db->or_like('teacher_Tname', $keyword);
            $this->db->or_like('teacher_Ename', $keyword);
            $this->db->or_like('teacher_email', $keyword);
            $this->db->or_like('teacher_username', $keyword);
        }
        $this->db->order_by("de_grade", "asc");
        $this->db->order_by("teacher_Ename", "asc");
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Add_data_model($data)
    {
        $this->db->insert('teacher', $data);
    }

    public function Edit_data_model($org_id, $data)
    {
        $this->db->where('teacher_code_id', $org_id);
        $this->db->update('teacher', $data);
    }

    public function Delete_Data_model($data)
    {
        $this->db->where_in('teacher_code_id', $data);
        $this->db->delete('teacher');
    }

    public function Show_Sort_model($data, $sort, $start, $limit)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('teacher_code_id, teacher_Tname, teacher_Ename, teacher_email, teacher_username, de_Tname, de_Ename , de_id');
        $this->db->from('teacher');
        $this->db->join('degree', 'teacher.teacher_degree = degree.de_id', 'left');
        $this->db->order_by($data, $sort);
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
}
