<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_std_select extends CI_Model
{
    // public function selectSemester()
    // {  
    //     $this->db->select('semester_id, semester_year,  semester_part, semester_name');
    //     $this->db->from('semester');
    //     //$this->db->order_by('semester_id', 'DESC');
    //     $query = $this->db->get();
    //     if ($query->num_rows() > 0) {
    //         return $query->result();
    //     }
    // }

    // public function selectSubject($data)
    // {   
    //     // $this->db->select('*');
    //     // $this->db->from('subject_semester');
    //     // $this->db->where('subsem_semester',$data);  
    //     // $query = $this->db->get();
        
    //     // if ($query->num_rows() > 0) {
    //     //     return $query->result();
    //     // }

    //     $query = $this->db->query('select * from subject_semester where subsem_semester = '.$data);
    //     if ($query->num_rows() > 0) {
    //         return $query->result();
    //     }

    // }

    public function Show_Data_Annouce_model($semester,$subject)
    {
        $query = $this->db->query('SELECT * FROM subject_annouce WHERE annouce_semester = "'.$semester.'" AND annouce_subject="'.$subject.'" ORDER BY annouce_time_start DESC ');
        return $query->result();
    }
}