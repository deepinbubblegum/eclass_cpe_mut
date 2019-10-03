<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_major extends CI_Model
{

        public function Show_Max_Data_model()
        {
                $query = $this->db->get('major');
                return $query->num_rows();
        }

        public function Show_Data_Major_model($limit = null, $start = null)
        {
                if ($limit == 0 and $start == 0) {
                        $limit = null;
                        $start = null;
                }
                $this->db->select('major_id, major_name, faculty_name ,faculty_id');
                $this->db->from('major');
                $this->db->join('faculty', 'major_faculty = faculty_id', 'left');
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
                $this->db->select('major_id, major_name, faculty_name');
                $this->db->from('major');
                $this->db->join('faculty', 'major_faculty = faculty_id', 'left');
                if ($type != null) {
                        $this->db->like($type, $keyword);
                } else {
                        $this->db->like('major_id', $keyword);
                        $this->db->or_like('major_name', $keyword);
                        $this->db->or_like('faculty_name', $keyword);
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
                $this->db->insert('major', $data);
        }

        public function Edit_data_model($org_id, $data)
        {
                $this->db->where('major_id', $org_id);
                $this->db->update('major', $data);
        }

        public function Delete_Data_model($data)
        {
                $this->db->where_in('major_id', $data);
                $this->db->delete('major');
        }
}
