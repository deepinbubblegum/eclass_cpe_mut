<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_add_student extends CI_Model
{
        public function Show_Max_Data_model($arg, $arg2)
        {
                $this->db->select('substd_subject');
                $this->db->from('subject_student');
                $this->db->where('substd_subject', $arg);
                $this->db->where('substd_semester',$arg2);
                $query = $this->db->get();
                return $query->num_rows();
        }

        public function Show_Data_user_data_model($limit = null, $start = null, $arg, $arg2)
        {
                if ($limit == 0 and $start == 0) {
                        $limit = null;
                        $start = null;
                }
                $this->db->select('substd_stdid, user_Tname, user_Ename, substd_subject, substd_sec');
                $this->db->from('subject_student');
                $this->db->join('user_data', 'substd_stdid = user_code_id', 'left');
                $this->db->where('substd_subject', $arg);
                $this->db->where('substd_semester',$arg2);
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

        public function Search_data_model($keyword, $type)
        {
                $this->db->select('substd_stdid, user_Tname, user_Ename, substd_subject, substd_sec');
                $this->db->from('subject_student');
                $this->db->join('user_data', 'substd_stdid = user_code_id', 'left');
                if ($type != null) {
                        if ($type == 'substd_stdid') {
                                $searchData = 'substd_stdid';
                        } else if ($type == 'user_Tname') {
                                $searchData = 'user_Tname';
                        } else if ($type == 'user_Ename') {
                                $searchData = 'user_Ename';
                        }else if ($type == 'substd_sec') {
                                $searchData = 'substd_sec';
                        }
                        $this->db->or_like($searchData, $keyword);
                } else {
                        $this->db->like('substd_stdid', $keyword);
                        $this->db->or_like('user_Tname', $keyword);
                        $this->db->or_like('user_Ename', $keyword);
                        $this->db->or_like('substd_sec', $keyword);
                }
                $query = $this->db->get();
                if ($query->num_rows() > 0) {
                        return $query->result();
                } else {
                        return 0;
                }
        }
}
