<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_admin_data extends CI_Model
{
    public function Show_Max_Data_model()
    {
        $query = $this->db->get('admin');
        return $query->num_rows();
    }

    public function Show_Data_admin_data_model($limit = null, $start = null)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('*');
        $this->db->from('admin');
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Search_data_model($keyword, $type)
    {
        $this->db->select('*');
        $this->db->from('admin');
        if ($type != null) {
            if ($type == 'admin_id') {
                $searchData = 'admin_id';
            } else if ($type == 'admin_Tname') {
                $searchData = 'admin_Tname';
            } else if ($type == 'admin_Ename') {
                $searchData = 'admin_Ename';
            } else if ($type == 'admin_email') {
                $searchData = 'admin_email';
            }
            $this->db->or_like($searchData, $keyword);
        } else {
            $this->db->like('admin_id', $keyword);
            $this->db->or_like('admin_Tname', $keyword);
            $this->db->or_like('admin_Ename', $keyword);
            $this->db->or_like('admin_email', $keyword); 
        }
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Add_data_model($arg, $arg2)
    {
        $this->db->insert('admin', $arg);
    }

    public function Add_data_model_csv($arg, $arg2)
    {
        $sql_cmd = $this->db->insert_string('admin_data', $arg);
        $query = str_replace("INSERT INTO","INSERT IGNORE INTO",$sql_cmd);
        $this->db->query($query);

        $sql_cmd2 = $this->db->insert_string('sign_in', $arg2);
        $query = str_replace("INSERT INTO","INSERT IGNORE INTO",$sql_cmd2);
        $this->db->query($query);
    }

    public function Edit_data_model($org_id, $data)
    {
        $this->db->where('admin_id', $org_id);
        $this->db->update('admin', $data);
    }

    public function Delete_Data_model($data)
    {
        $this->db->where_in('admin_id', $data);
        $this->db->delete('admin');
    }
}
