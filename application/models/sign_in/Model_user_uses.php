<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_user_uses extends CI_Model
{
        public function sign_in_ck($username, $password)
        {
                $this->db->select('salt');
                $this->db->from('sign_in');
                $this->db->where('username', $username);
                $get_salt = $this->db->get();
                if ($get_salt->num_rows() > 0) {
                        $salt = $get_salt->result_array();
                        $password = sha1($salt[0]['salt'] . $password);

                        $this->db->select('data_id_user');
                        $this->db->from('sign_in');
                        $this->db->where('username', $username);
                        $this->db->where('password', $password);
                        $ck_signin = $this->db->get();
                        if ($ck_signin->num_rows() == 1) {
                                $data_id = $ck_signin->result_array();
                                $this->db->select('user_code_id, user_Tname, user_Ename, user_major, user_permission, major_name');
                                $this->db->from('user_data');
                                $this->db->join('major', 'major_id = user_major', 'left');
                                $this->db->where('user_code_id',  $data_id[0]['data_id_user']);
                                $query = $this->db->get();
                                if ($query->num_rows() > 0) {
                                        return $query->result_array();
                                }
                        }
                }
                return false;
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
