<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_permission extends CI_Model
{
        public function Show_Max_Data_model()
        {
                $query = $this->db->get('permission');
                return $query->num_rows();
        }

        public function Show_Data_permission_model($limit = null, $start = null)
        {
                if ($limit == 0 and $start == 0) {
                        $limit = null;
                        $start = null;
                }
                $this->db->select('permission_id, permission_name');
                $this->db->from('permission');
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
                $this->db->select('permission_id, permission_name');
                $this->db->from('permission');

                if ($type != null) {
                        $this->db->like($type, $keyword);
                } else {
                        $this->db->like('permission_id', $keyword);
                        $this->db->or_like('permission_name', $keyword);
                }

                $query = $this->db->get();
                if ($query->num_rows() > 0) {
                        return $query->result();
                } else {
                        return 0;
                }
        }

        public function Add_data_model($data)
        {
                $this->db->insert('permission', $data);
        }

        public function Edit_data_model($org_id, $data)
        {
                $this->db->where('permission_id', $org_id);
                $this->db->update('permission', $data);
        }

        public function Delete_Data_model($data)
        {
                $this->db->where_in('permission_id', $data);
                $this->db->delete('permission');
        }
}
