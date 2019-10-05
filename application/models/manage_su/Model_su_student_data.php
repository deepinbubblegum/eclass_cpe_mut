<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_student_data extends CI_Model
{
    public function Show_Max_Data_model()
    {
        $query = $this->db->get('student');
        return $query->num_rows();
    }

    public function Show_Data_student_data_model($limit = null, $start = null)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('std_code_id, std_Tname, std_Ename, std_email, faculty_name, major_name');
        $this->db->from('student');
        $this->db->join('major', 'std_major = major_id', 'left');
        $this->db->join('faculty', 'major_faculty = faculty_id', 'left');
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Show_Data_faculty_model()
    {
        $this->db->select('*');
        $this->db->from('faculty');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }

    public function Show_Data_Major_model($arg)
    {
        $this->db->select('major_id, major_name');
        $this->db->from('major');
        $this->db->where('major_faculty', $arg);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }

    public function Search_data_model($keyword, $type)
    {
        $this->db->select('std_code_id, std_Tname, std_Ename, std_email, faculty_name, major_name');
        $this->db->from('student');
        $this->db->join('major', 'std_major = major_id', 'left');
        $this->db->join('faculty', 'major_faculty = faculty_id', 'left');
        if ($type != null) {
            if ($type == 'std_major') {
                $searchData = 'std_major';
            }
            $this->db->or_like($searchData, $keyword);
        } else {
            $this->db->like('std_code_id', $keyword);
            $this->db->or_like('std_Tname', $keyword);
            $this->db->or_like('std_Ename', $keyword);
            $this->db->or_like('std_email', $keyword);
            $this->db->or_like('faculty_name', $keyword);
            $this->db->or_like('std_major', $keyword);
        }
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Add_data_model($arg)
    {
        $this->db->insert('student', $arg);
        return true;
    }

    public function Add_data_model_csv($arg)
    {
        $sql_cmd = $this->db->insert_string('student', $arg);
        $query = str_replace("INSERT INTO", "INSERT IGNORE INTO", $sql_cmd);
        $this->db->query($query);
    }

    public function Edit_data_model($org_id, $data)
    {
        $this->db->where('std_code_id', $org_id);
        $this->db->update('student', $data);
    }

    public function Delete_Data_model($data)
    {
        $this->db->where_in('std_code_id', $data);
        $this->db->delete('student');
    }
}
