<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_point_student extends CI_Model
{
    public function Show_Data_point_student_model()
    {  

    }

    public function Add_data_model($semester,$subject,$menu_id,$pointid,$is_std,$point)
    {
        $this->db->query('INSERT INTO point_student (point_std_semester , point_std_subject , point_std_id , point_std_id_point , point_std_user_id, point_std_point) 
        VALUES ("'.$semester.'" , "'.$subject.'" , "'.$menu_id.'" , "'.$pointid.'" , "'.$is_std.'" , "'.$point.'") ');
    }

    public function Show_Point_In_MenuPoint($semester,$subject,$menu_id,$pointid)
    {
        $query = $this->db->query('SELECT point_std_user_id , point_std_point FROM point_student 
        WHERE point_std_semester = "'.$semester.'" AND point_std_subject = "'.$subject.'" AND point_std_id = "'.$menu_id.'" AND point_std_id_point = "'.$pointid.'"');
        if ($query->num_rows() > 0) {
            return $query->result();
        }
    } 
    
}