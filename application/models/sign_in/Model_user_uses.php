<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_user_uses extends CI_Model
{
        // public function sign_in_ck($username, $password)
        // {
        //         $this->db->select('salt');
        //         $this->db->from('sign_in');
        //         $this->db->where('username', $username);
        //         $get_salt = $this->db->get();
        //         if ($get_salt->num_rows() > 0) {
        //                 $salt = $get_salt->result_array();
        //                 $password = sha1($salt[0]['salt'] . $password);

        //                 $this->db->select('data_id_user');
        //                 $this->db->from('sign_in');
        //                 $this->db->where('username', $username);
        //                 $this->db->where('password', $password);
        //                 $ck_signin = $this->db->get();
        //                 if ($ck_signin->num_rows() == 1) {
        //                         $data_id = $ck_signin->result_array();
        //                         $this->db->select('user_code_id, user_Tname, user_Ename, user_major, user_permission, major_name');
        //                         $this->db->from('user_data');
        //                         $this->db->join('major', 'major_id = user_major', 'left');
        //                         $this->db->where('user_code_id',  $data_id[0]['data_id_user']);
        //                         $query = $this->db->get();
        //                         if ($query->num_rows() > 0) {
        //                                 return $query->result_array();
        //                         }
        //                 }
        //         }
        //         return false;
        // }

        public function sign_in_ck($username, $password){
                $this->db->select('admin_id, admin_Tname, admin_Ename');
                $this->db->from('admin');
                $this->db->where('admin_username', $username);
                $this->db->where('admin_password', $password);
                $query_admin = $this->db->get();
                if ($query_admin->num_rows() == 1) {
                       return $query_admin->result_array();
                }else{
                        $this->db->select('teacher_code_id, teacher_Tname, teacher_Ename, teacher_major');
                        $this->db->from('teacher');
                        $this->db->where('teacher_username', $username);
                        $this->db->where('teacher_password', $password);
                        $this->db->or_where('teacher_email',$username);
                        $this->db->where('teacher_password', $password);
                        $query_teacher = $this->db->get();
                        if ($query_teacher->num_rows() == 1) {
                                return $query_teacher->result_array();
                        }else{
                                $this->db->select('std_code_id, std_Tname, std_Ename, std_major');
                                $this->db->from('student');
                                $this->db->where('std_code_id', $username);
                                $this->db->where('std_password', $password);
                                $this->db->or_where('std_email',$username);
                                $this->db->where('std_password', $password);
                                $query_student = $this->db->get();
                                if ($query_student->num_rows() == 1) {
                                        return $query_student->result_array();
                                }else{
                                        return false;
                                }
                        }
                }
        }


        public function get_permis_name($arg)
        {
                $this->db->select('permission_name');
                $this->db->from('permission');
                $this->db->where('permission_id', $arg);
                $query = $this->db->get();
                if ($query->num_rows() > 0) {
                        foreach ($query->result() as $row)
                        {
                             $permission_name = $row->permission_name;
                        }
                        return  $permission_name;
                } else {
                        return false;
                }
        }
}
