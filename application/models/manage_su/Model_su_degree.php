<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_degree extends CI_Model
{
    public function Show_Max_Data_model()
    {
        $query = $this->db->get('permission');
        return $query->num_rows();
    }

    public function Show_Data_degree_model()
    {
        $this->db->select('*');
        $this->db->from('degree');
        $this->db->order_by("de_grade", "asc");
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        }
    }

    public function Search_data_model($keyword, $type)
    {
        $this->db->select('*');
        $this->db->from('degree');
        if ($type != null) {
            $this->db->like($type, $keyword);
        } else {
            $this->db->like('de_grade', $keyword);
            $this->db->or_like('de_Tname', $keyword);
            $this->db->or_like('de_Ename', $keyword);
        }
        $this->db->order_by("de_grade", "asc");
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        }
    }

    public function Add_Data_model($Grade, $Degree_TName, $Degree_EName)
    {
        $maxid = $this->db->query('SELECT IFNULL(LPAD(LPAD(MAX(SUBSTR(de_id,2,4))+1,4,"0"),5,"D"),"D0001") AS newid FROM degree');
        $newid = $maxid->row()->newid;

        $data = array(
            "de_id" => $newid,
            "de_grade" => $Grade,
            "de_Tname" => $Degree_TName,
            "de_Ename" => $Degree_EName
        );

        $this->db->insert('degree', $data);
    }

    public function Edit_Data_model($org_id, $data)
    {
        $this->db->where('de_id', $org_id);
        $this->db->update('degree', $data);
    }

    public function Delete_Data_model($data)
    {
        $this->db->where_in('de_id', $data);
        $this->db->delete('degree');
    }
}
