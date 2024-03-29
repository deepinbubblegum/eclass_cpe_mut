<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_user_uses extends CI_Model
{
        public function sign_in_ck($username, $password)
        {
                // $this->db->select('admin_id, admin_Tname, admin_Ename');
                // $this->db->from('admin');
                // $this->db->where('admin_id', $username);
                // $this->db->where('admin_password', $password);
                // $this->db->or_where('admin_email', $username);
                // $this->db->where('admin_password', $password);
                // $query_admin = $this->db->get();
                // if ($query_admin->num_rows() == 1) {
                //         return $query_admin->result_array();
                // } else {
                //         $this->db->select('teacher_code_id, teacher_Tname, teacher_Ename');
                //         $this->db->from('teacher');
                //         $this->db->where('teacher_username', $username);
                //         $this->db->where('teacher_password', $password);
                //         $this->db->or_where('teacher_email', $username);
                //         $this->db->where('teacher_password', $password);
                //         $query_teacher = $this->db->get();
                //         if ($query_teacher->num_rows() == 1) {
                //                 return $query_teacher->result_array();
                //         } else {
                //                 $this->db->select('std_code_id, std_Tname, std_Ename, std_major');
                //                 $this->db->from('student');
                //                 $this->db->where('std_code_id', $username);
                //                 $this->db->where('std_password', $password);
                //                 $this->db->or_where('std_email', $username);
                //                 $this->db->where('std_password', $password);
                //                 $query_student = $this->db->get();
                //                 if ($query_student->num_rows() == 1) {
                //                         return $query_student->result_array();
                //                 } else {
                //                         return false;
                //                 }
                //         }
                // }
                $this->db->select('teacher_code_id, teacher_Tname, teacher_Ename, teacher_admin, de_Tname, de_Ename');
                $this->db->from('teacher');
                $this->db->join('degree', 'teacher_degree = de_id', 'left');
                $this->db->where('teacher_username', $username);
                $this->db->where('teacher_password', $password);
                $this->db->or_where('teacher_email', $username);
                $this->db->where('teacher_password', $password);
                $query_teacher = $this->db->get();
                if ($query_teacher->num_rows() == 1) {
                        return $query_teacher->result_array();
                } else {
                        $this->db->select('std_code_id, std_Tname, std_Ename, std_major');
                        $this->db->from('student');
                        $this->db->where('std_code_id', $username);
                        $this->db->where('std_password', $password);
                        $this->db->or_where('std_email', $username);
                        $this->db->where('std_password', $password);
                        $query_student = $this->db->get();
                        if ($query_student->num_rows() == 1) {
                                return $query_student->result_array();
                        } else {
                                return false;
                        }
                }
        }

        public function check_duplicate_model($data_check)
        {
                // $this->db->select('admin_id, admin_email');
                // $this->db->from('admin');
                // $this->db->where('admin_id', $data_check);
                // $this->db->or_where('admin_email', $data_check);
                // $query_admin = $this->db->get();
                // if ($query_admin->num_rows() == 0) {
                //         $this->db->select('teacher_username, teacher_email');
                //         $this->db->from('teacher');
                //         $this->db->where('teacher_username', $data_check);
                //         $this->db->or_where('teacher_email', $data_check);
                //         $query_teacher = $this->db->get();
                //         if ($query_teacher->num_rows() == 0) {
                //                 $this->db->select('std_code_id, std_email');
                //                 $this->db->from('student');
                //                 $this->db->where('std_code_id', $data_check);
                //                 $this->db->or_where('std_email', $data_check);
                //                 $query_student = $this->db->get();
                //                 if ($query_student->num_rows() == 0) {
                //                         return true;
                //                 }
                //         }
                // }
                // return false;

                $this->db->select('teacher_username, teacher_email');
                $this->db->from('teacher');
                $this->db->where('teacher_username', $data_check);
                $this->db->or_where('teacher_email', $data_check);
                $query_teacher = $this->db->get();
                if ($query_teacher->num_rows() == 0) {
                        $this->db->select('std_code_id, std_email');
                        $this->db->from('student');
                        $this->db->where('std_code_id', $data_check);
                        $this->db->or_where('std_email', $data_check);
                        $query_student = $this->db->get();
                        if ($query_student->num_rows() == 0) {
                                return true;
                        }
                }
                return false;
        }


        // public function get_permis_name($arg)
        // {
        //         $this->db->select('permission_name');
        //         $this->db->from('permission');
        //         $this->db->where('permission_id', $arg);
        //         $query = $this->db->get();
        //         if ($query->num_rows() > 0) {
        //                 foreach ($query->result() as $row)
        //                 {
        //                      $permission_name = $row->permission_name;
        //                 }
        //                 return  $permission_name;
        //         } else {
        //                 return false;
        //         }
        // }

        private function check_old_password($ses_status, $ses_id, $old_password){
                if($ses_status == 'student')
                {
                        $this->db->select('std_code_id, std_password');
                        $this->db->from('student');
                        $this->db->where('std_code_id', $ses_id);
                        $this->db->where('std_password', $old_password);
                        $query = $this->db->get();
                        if ($query->num_rows() > 0) {
                                return true;
                        }
                }else{
                        $this->db->select('teacher_code_id, teacher_password');
                        $this->db->from('teacher');
                        $this->db->where('teacher_code_id', $ses_id);
                        $this->db->where('teacher_password', $old_password);
                        $query = $this->db->get();
                        if ($query->num_rows() > 0) {
                                return true;
                        }
                }
                return false;
        }

        public function update_password($arg, $arg2, $arg3, $old_password)
        {
                if ($this->check_old_password($arg, $arg2, $old_password)) {
                        if ($arg == 'student') {
                                $this->db->where('std_code_id', $arg2);
                                $this->db->update('student', array('std_password' => $arg3));
                                return true;
                        } else {
                                $this->db->where('teacher_code_id', $arg2);
                                $this->db->update('teacher', array('teacher_password' => $arg3));
                                return true;
                        }
                }
                return false;
        }

        public function reset_passwd($ID, $IDcyp)
        {
                $this->db->where('std_code_id', $ID);
                $this->db->update('student', array('std_password' => $IDcyp));
                return true;
        }

        public function reset_get_te($ID)
        {
                $this->db->select('teacher_username');
                $this->db->from('teacher');
                $this->db->where('teacher_code_id', $ID);
                $query = $this->db->get();
                if ($query->num_rows() == 1) {
                        $row = $query->row();
                        return $row->teacher_username;
                }else{
                        return false;
                }
        }

        public function reset_passwd_te($ID, $IDcyp)
        {
                $this->db->where('teacher_code_id', $ID);
                $this->db->update('teacher', array('teacher_password' => $IDcyp));
                return true;
        }
}
