<?php
defined('BASEPATH') or exit('No direct script access allowed');

function code_keygen($length)
{
   $gencode = strtoupper(substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, $length));
   $gencode = str_split($gencode,4);
   
   $keygen = implode("-",$gencode);
   return $keygen; 
}

class Model_std_score extends CI_Model
{
    public function getMenuPoint($subjectId, $semesterId)
    {
        $this->db->select('*');
        $this->db->from('subject_point');
        $this->db->where('point_subject', $subjectId);
        $this->db->where('point_semester', $semesterId);
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getPointField($subjectId, $semesterId, $menuId)
    {
        $this->db->select('*');
        $this->db->from('subject_setpoint');
        $this->db->where('setpoint_subject', $subjectId);
        $this->db->where('setpoint_semester', $semesterId);
        $this->db->where('setpoint_id', $menuId);
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getPoint($semester, $subject, $setId, $id)
    {
        $this->db->select('*');
        $this->db->from('subject_point_student');
        $this->db->where('point_std_semester', $semester);
        $this->db->where('point_std_subject', $subject);
        $this->db->where('point_std_setpoint_id', $setId);
        $this->db->where('point_std_id', $id); 
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
}
