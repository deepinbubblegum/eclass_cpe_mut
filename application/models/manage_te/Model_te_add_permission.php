<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_add_permission extends CI_Model
{
        public function Show_Max_Data_model($arg, $arg2)
        {
                $this->db->select('*');
                $this->db->from('permission');
                $this->db->where('per_subject', $arg);
                $this->db->where('per_semester',$arg2);
                $query = $this->db->get();
                return $query->num_rows();
        }

        public function Show_Data_user_data_model($limit = null, $start = null, $arg, $arg2)
        {
                if ($limit == 0 and $start == 0) {
                        $limit = null;
                        $start = null;
                }
                $this->db->select('*');
                $this->db->from('permission');
                $this->db->where('per_subject', $arg);
                $this->db->where('per_semester',$arg2);
                $this->db->limit($limit, $start);
                $query = $this->db->get();
                if ($query->num_rows() > 0) {
                        return $query->result();
                } else {
                        return 0;
                }
        }

        public function Search_data_model($keyword,$type, $subject_id, $semester)
        {
                $this->db->select('*');
                $this->db->from('permission');
                if ($type != null) {
                        $this->db->or_like($type, $keyword);
                } else {
                        $this->db->group_start();
                        $this->db->like('per_name', $keyword);
                        $this->db->or_like('per_bit', $keyword);
                        $this->db->or_like('per_id', $keyword);
                        $this->db->group_end();
                }
                $this->db->where('per_subject', $subject_id);
                $this->db->where('per_semester',$semester);
                $query = $this->db->get();
                if ($query->num_rows() > 0) {
                        return $query->result();
                } else {
                        return 0;
                }
        }

        public function Add_Data_model($name,$bit,$subject,$semester)
        {
                $maxid = $this->db->query('SELECT ifnull(lpad(lpad(max(substr(per_id,2,3))+1,3,"0"),4,"P"),"P001") as newid
                FROM permission
                WHERE per_semester = "'.$semester.'" AND per_subject = "'.$subject.'" ');
                $newid = $maxid->row()->newid;
                
                $this->db->query('INSERT INTO permission(per_id,per_name,per_bit,per_semester,per_subject)
                VALUES("'.$newid.'" , "'.$name.'" , "'.$bit.'" , "'.$semester.'" , "'.$subject.'" )');
        }

        public function Edit_data_model($id,$name,$bit,$subject,$semester)
        {
                $this->db->query('UPDATE permission SET per_name="'.$name.'" , per_bit="'.$bit.'" 
                WHERE per_id="'.$id.'" AND per_semester = "'.$semester.'" AND per_subject="'.$subject.'" ');
        }

        public function Delete_Data_model($data,$subject,$semester)
        {
                $this->db->where_in('per_id', $data);
                $this->db->group_start();
                $this->db->where('per_semester', $semester);
                $this->db->where('per_subject', $subject);
                $this->db->group_end();
                $this->db->delete('permission');
        }
}