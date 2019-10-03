<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_subject_menu extends CI_Model
{
    public function Show_Data_subject_menu_model($semester,$subject)
    {  
        $query = $this->db->query('SELECT * FROM subject_menu WHERE submenu_semester = "'.$semester.'" AND submenu_subject = "'.$subject.'"');
        if ($query->num_rows() > 0) {
            return $query->result();
        }
    }
    
}