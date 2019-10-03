<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_subject_menu_point extends CI_Model
{
    public function Show_Data_menu_point_model($semester,$subject,$menu_id)
    {  
        $query = $this->db->query('SELECT * FROM subject_menu_point 
        WHERE menu_point_semester = "'.$semester.'" AND menu_point_subject = "'.$subject.'" AND menu_point_id="'.$menu_id.'" ORDER BY menu_point_fullname ASC');
        if ($query->num_rows() > 0) {
            return $query->result();
        }
    }

    public function Add_data_model($semester,$subject,$menu_id,$FullName,$MiniName)
    {
        $this->db->query('INSERT INTO subject_menu_point (menu_point_semester , menu_point_subject , menu_point_id , menu_point_id_point , menu_point_fullname, menu_point_mininame) 
        VALUES ("'.$semester.'" , "'.$subject.'" , "'.$menu_id.'" , "'.$FullName.'" , "'.$FullName.'" , "'.$MiniName.'") ');
    }
    
}