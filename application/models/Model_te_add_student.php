<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_add_student extends CI_Model
{
        public function Show_Max_Data_model($arg)
        {
                $this->db->select('substd_subject');
                $this->db->from('subject_student');
                $this->db->where('substd_subject = \'' . $arg . '\'');
                $query = $this->db->get();
                return $query->num_rows();
        }

        public function Show_Data_user_data_model($limit = null, $start = null, $arg)
        {
                if ($limit == 0 and $start == 0) {
                        $limit = null;
                        $start = null;
                }
                $this->db->select('substd_stdid, user_Tname, user_Ename, substd_subject, substd_sec');
                $this->db->from('subject_student');
                $this->db->join('user_data', 'substd_stdid = user_code_id', 'left');
                $this->db->where('substd_subject = \'' . $arg . '\'');
                $this->db->limit($limit, $start);
                $query = $this->db->get();
                if ($query->num_rows() > 0) {
                        return $query->result();
                } else {
                        return 0;
                }
        }

        public function Add_data_model_csv($arg)
        {
                $sql_cmd = $this->db->insert_string('subject_student', $arg);
                $query = str_replace("INSERT INTO", "INSERT IGNORE INTO", $sql_cmd);
                $this->db->query($query);
        }

        public function Add_data_model($arg)
        {
                $this->db->insert('subject_student', $arg);
        }

        public function Delete_Data_model($data, $data2, $data3)
        {

                $this->db->where_in('substd_stdid', $data);
                $this->db->where_in('substd_subject', $data2);
                $this->db->where_in('substd_subject', $data3);
                $this->db->delete('subject_student');
        }


        // ทำ Search ไม่เป็น
        // public function Search_data_model($keyword, $type)
        // {
        //         $this->db->select('user_code_id, user_Tname, user_Ename, user_email, major_id, major_name, permission_id, permission_name');
        //         $this->db->from('user_data');
        //         $this->db->join('major', 'user_major = major_id', 'left');
        //         $this->db->join('permission', 'user_permission = permission_id', 'left');
        //         if ($type != null) {
        //                 if ($type == 'user_permission') {
        //                         $searchData = 'permission_name';
        //                 } else if ($type == 'user_major') {
        //                         $searchData = 'major_name';
        //                 }
        //                 $this->db->or_like($searchData, $keyword);
        //         } else {
        //                 $this->db->like('user_code_id', $keyword);
        //                 $this->db->or_like('user_Tname', $keyword);
        //                 $this->db->or_like('user_Ename', $keyword);
        //                 $this->db->or_like('user_email', $keyword);
        //                 $this->db->or_like('major_name', $keyword);
        //                 $this->db->or_like('permission_name', $keyword);
        //         }
        //         $query = $this->db->get();
        //         if ($query->num_rows() > 0) {
        //                 return $query->result();
        //         } else {
        //                 return 0;
        //         }
        // }
}
