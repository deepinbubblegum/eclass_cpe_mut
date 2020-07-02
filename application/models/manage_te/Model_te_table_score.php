<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_table_score extends CI_Model
{

    public function getHeader($subject_id, $semester, $point_id)
    {
        $this->db->select('*');
        $this->db->from('subject_setpoint');
        $this->db->where('setpoint_subject', $subject_id);
        $this->db->where('setpoint_semester', $semester);
        $this->db->where('setpoint_id', $point_id);
        //$this->db->order_by('setpoint_index', 'ASC');
        $this->db->order_by('cast(setpoint_index as int)', 'ASC');
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getOverHeader($subject_id, $semester, $point_id)
    {
        $this->db->select('*');
        $this->db->from('subject_point');
        $this->db->where('point_subject', $subject_id);
        $this->db->where('point_semester', $semester);
        $this->db->where('point_id', $point_id);
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getBody($subject_id, $semester)
    {
        $this->db->select('*');
        $this->db->from('subject_student');
        $this->db->join('student', 'substd_stdid = std_code_id', 'left');
        $this->db->where('substd_subject', $subject_id);
        $this->db->where('substd_semester', $semester);
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getBodyForStd($subject_id, $semester, $point_id, $UserId)
    {
        $StdView = $this->db->query('SELECT point_StdView AS View FROM subject_point WHERE point_semester = "' . $semester . '" AND point_subject = "' . $subject_id . '" AND point_id = "' . $point_id . '" ');
        $View = $StdView->row()->View;

        if ($View == 1) {
            $this->db->select('*');
            $this->db->from('subject_student');
            $this->db->join('student', 'substd_stdid = std_code_id', 'left');
            $this->db->where('substd_subject', $subject_id);
            $this->db->where('substd_semester', $semester);
            //$this->db->order_by('menuDowId', 'DESC');
            $query = $this->db->get();
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return 0;
            }
        }
        else{
            $this->db->select('*');
            $this->db->from('subject_student');
            $this->db->join('student', 'substd_stdid = std_code_id', 'left');
            $this->db->where('substd_subject', $subject_id);
            $this->db->where('substd_semester', $semester);
            $this->db->where('substd_stdid', $UserId);
            //$this->db->order_by('menuDowId', 'DESC');
            $query = $this->db->get();
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return 0;
            }
        }
    }

    public function getPoint($subject_id, $semester, $point_id)
    {
        $this->db->select('*');
        $this->db->from('subject_point_student');
        $this->db->where('point_std_subject', $subject_id);
        $this->db->where('point_std_semester', $semester);
        $this->db->where('point_std_id', $point_id);
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getSum($formula)
    {
        $this->db->select($formula . ' as sum');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
}
