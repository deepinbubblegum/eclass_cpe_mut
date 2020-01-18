<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_faculty extends CI_Model
{
    public function Show_Max_Data_model()
    {
        $query = $this->db->get('permission');
        return $query->num_rows();
    }

    public function Show_Data_faculty_model()
    {
        $this->db->select('faculty_id, faculty_name');
        $this->db->from('faculty');
        $this->db->order_by("faculty_name", "asc");
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        }
    }

    public function Search_data_model($keyword,$type)
    {
        $this->db->select('faculty_id, faculty_name');
        $this->db->from('faculty');
        if($type != null){
            $this->db->like($type, $keyword);
        }else{
            $this->db->like('faculty_id', $keyword);
            $this->db->or_like('faculty_name', $keyword);
        }
        $this->db->order_by("faculty_name", "asc");
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        }
    }

    public function Add_Data_model($data)
    {
        $this->db->db_debug = false;
        if (!$this->db->insert('faculty', $data))
        {
            $error = $this->db->error();
            return $error;
        }else{
            return true;
        }
    }

    public function Edit_Data_model($org_id, $data)
    {
        $this->db->db_debug = false;
        $this->db->where('faculty_id', $org_id);
        if (!$this->db->update('faculty', $data))
        {
            $error = $this->db->error();
            return $error;
        }else{
            return true;
        }
    }

    public function Delete_Data_model($data)
    {
        $this->db->db_debug = false;
        $this->db->where_in('faculty_id', $data);
        if (!$this->db->delete('faculty')){
            $error = $this->db->error();
            return $error;
        }else{
            return true;
        }
    }
}
