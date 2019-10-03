<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_teacher extends CI_Model
{

    public function Show_Max_Data_model()
    {
        $query = $this->db->get('user_data');
        return $query->num_rows();
    }

    public function Show_Data_Teacher_model($limit = null, $start = null)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('user_code_id, user_Ename, ,user_email,major_id,major_name, permission_id,permission_name');
        $this->db->from('user_data');
        $this->db->join('major', 'user_major = major_id', 'left');
        $this->db->join('permission', 'user_permission = permission_id', 'left');
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Search_data_model($keyword)
    {
        $this->db->select('user_code_id, user_Ename, user_email,major_id,major_name, permission_id,permission_name');
        $this->db->from('user_data');
        $this->db->join('major', 'user_major = major_id', 'left');
        $this->db->join('permission', 'user_permission = permission_id', 'left');
        $this->db->like('user_code_id', $keyword);
        $this->db->or_like('user_Ename', $keyword);
        $this->db->or_like('user_email', $keyword);
        $this->db->or_like('major_name', $keyword);
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
        $this->db->insert('user_data', $data);
    }

    public function Edit_data_model($org_id, $data)
    {
        $this->db->where('user_code_id', $org_id);
        $this->db->update('user_data', $data);
    }

    public function Delete_Data_model($data)
    {
        $this->db->where_in('user_code_id', $data);
        $this->db->delete('user_data');
    }
}
