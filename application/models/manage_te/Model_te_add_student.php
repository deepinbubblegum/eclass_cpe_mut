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
                $this->db->select('substd_stdid, std_Tname, std_Ename, substd_subject, substd_sec');
                $this->db->from('subject_student');
                $this->db->join('student', 'substd_stdid = std_code_id', 'left');
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
                // $sql_cmd = $this->db->insert_string('subject_student', $arg);
                // $query = str_replace("INSERT INTO", "INSERT IGNORE INTO", $sql_cmd);
                // $this->db->query($query);
                $this->db->db_debug = false;
                if (!$this->db->insert('subject_student', $arg)) {
                    $error = $this->db->error();
                    return $error;
                } else {
                    return false;
                }
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

        public function Show_Max_Search_Data_model($keyword, $type, $subject_id, $semester)
        {
                $this->db->select('substd_stdid, std_Tname, std_Ename, substd_subject, substd_sec');
                $this->db->from('subject_student');
                $this->db->join('student', 'substd_stdid = std_code_id', 'left');
                if ($type != null) {
                        if ($type == 'substd_stdid') {
                                $searchData = 'substd_stdid';
                        } else if ($type == 'std_Tname') {
                                $searchData = 'std_Tname';
                        } else if ($type == 'std_Ename') {
                                $searchData = 'std_Ename';
                        }else if ($type == 'substd_sec') {
                                $searchData = 'substd_sec';
                        }
                        $this->db->or_like($searchData, $keyword);
                } else {
                        $this->db->group_start();
                        $this->db->like('substd_stdid', $keyword);
                        $this->db->or_like('std_Tname', $keyword);
                        $this->db->or_like('std_Ename', $keyword);
                        $this->db->or_like('substd_sec', $keyword);
                        $this->db->group_end();
                }
                $this->db->where('substd_subject', $subject_id);
                $this->db->where('substd_semester',$semester);
                $query = $this->db->get();
                return $query->num_rows();
        }

        public function Search_data_model($keyword, $type, $subject_id, $semester, $start, $limit)
        {
                $this->db->select('substd_stdid, std_Tname, std_Ename, substd_subject, substd_sec');
                $this->db->from('subject_student');
                $this->db->join('student', 'substd_stdid = std_code_id', 'left');
                if ($type != null) {
                        if ($type == 'substd_stdid') {
                                $searchData = 'substd_stdid';
                        } else if ($type == 'std_Tname') {
                                $searchData = 'std_Tname';
                        } else if ($type == 'std_Ename') {
                                $searchData = 'std_Ename';
                        }else if ($type == 'substd_sec') {
                                $searchData = 'substd_sec';
                        }
                        $this->db->or_like($searchData, $keyword);
                } else {
                        $this->db->group_start();
                        $this->db->like('substd_stdid', $keyword);
                        $this->db->or_like('std_Tname', $keyword);
                        $this->db->or_like('std_Ename', $keyword);
                        $this->db->or_like('substd_sec', $keyword);
                        $this->db->group_end();
                }
                $this->db->where('substd_subject', $subject_id);
                $this->db->where('substd_semester',$semester);
                $this->db->limit($limit, $start);
                $query = $this->db->get();
                if ($query->num_rows() > 0) {
                        return $query->result();
                } else {
                        return 0;
                }
        }
}
