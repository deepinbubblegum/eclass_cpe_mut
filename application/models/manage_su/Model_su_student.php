<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_student extends CI_Model
{
    public function Show_Max_Data_model()
    {
        $query = $this->db->get('student');
        return $query->num_rows();
    }

    public function Show_Data_Student_model($limit = null, $start = null)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('student_id, student_name, student_lastname,student_email,major_id,major_name,student_username,permission_id,permission_name');
        $this->db->from('student');
        $this->db->join('major', 'student_major = major_id', 'left');
        $this->db->join('permission', 'student_permission = permission_id', 'left');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Search_data_model($keyword)
    {
        $this->db->select('student_id, student_name, student_lastname,student_email,major_id,major_name,student_username,permission_id,permission_name');
        $this->db->from('student');
        $this->db->join('major', 'student_major = major_id', 'left');
        $this->db->join('permission', 'student_permission = permission_id', 'left');
        $this->db->like('student_id', $keyword);
        $this->db->or_like('student_name', $keyword);
        $this->db->or_like('student_lastname', $keyword);
        $this->db->or_like('student_email', $keyword);
        $this->db->or_like('major_name', $keyword);
        $this->db->or_like('student_username', $keyword);
        $this->db->or_like('permission_name', $keyword);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Add_data_model($data)
    {
        $this->db->insert('student', $data);
    }

    public function Edit_data_model($org_id, $data)
    {
        $this->db->where('student_id', $org_id);
        $this->db->update('student', $data);
    }

    public function Delete_Data_model($data)
    {
        $this->db->where_in('student_id', $data);
        $this->db->delete('student');
    }
}
