<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_subject extends CI_Model
{
        public function Show_Max_Data_model()
        {
                $query = $this->db->get('subject');
                return $query->num_rows();
        }

        public function Show_Data_user_data_model()
        { 
            $this->db->select('user_code_id, user_Tname, user_Ename,user_email,major_id,major_name,permission_id,permission_name');
            $this->db->from('user_data');
            $this->db->join('major', 'user_major = major_id', 'left');
            $this->db->join('permission', 'user_permission = permission_id', 'left');
            $this->db->where('permission_id = "11102"'); 
            $query = $this->db->get();
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return 0;
            }
        }

        public function Show_Data_subject_model($limit = null, $start = null)
        {
                if ($limit == 0 and $start == 0) {
                        $limit = null;
                        $start = null;
                }
                $this->db->select('subject_id, subject_name, major_name, subject_teacher, user_Ename');
                $this->db->from('subject');
                $this->db->join('major', 'subject_major = major_id', 'left');
                $this->db->join('user_data', 'subject_teacher = user_code_id', 'left');
                $this->db->limit($limit, $start);
                $query = $this->db->get();
                if ($query->num_rows() > 0) {
                        return $query->result();
                } else {
                        return 0;
                }
                // Prints string: SELECT subject_id, subject_name, major_name
                //                FROM mytable
                //                LEFT JOIN major ON subject_major = major_id;
        }

        public function Search_data_model($keyword, $type)
        {
                $this->db->select('subject_id, subject_name, major_name, subject_teacher, user_Ename');
                $this->db->from('subject');
                $this->db->join('major', 'subject_major = major_id', 'left');
                $this->db->join('user_data', 'subject_teacher = user_code_id', 'left');
                if ($type != null) {
                        $this->db->or_like($type, $keyword);
                } else {

                        $this->db->like('subject_id', $keyword);
                        $this->db->or_like('subject_name', $keyword);
                        $this->db->or_like('user_Ename', $keyword);
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
                $this->db->insert('subject', $data);
                // Prints string: INSERT INTO subject (subject_id, subject_name, subject_major) 
                //                VALUES ('$subject_id', '$subject_name','$subject_major');
        }

        public function Edit_data_model($org_id, $data)
        {
                $this->db->where('subject_id', $org_id);
                $this->db->update('subject', $data);
                // Produces:
                //
                // UPDATE `mytable`
                // SET `title` = '{$title}', `name` = '{$name}', `date` = '{$date}'
                // WHERE id = `$id`
        }

        public function Delete_Data_model($data)
        {
                $this->db->where_in('subject_id', $data);
                $this->db->delete('subject');
        }
}
