<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_point_request extends CI_Model
{
    public function getPointRequest($semester,$subject)
    {
        $this->db->query('UPDATE ps_teacher SET ps_tea_read = "1" WHERE ps_tea_semester = "'.$semester.'" AND ps_tea_subAdd = "'.$subject.'" ');

        $query = $this->db->query('SELECT ps_tea_semester, ps_tea_subAdd, std_code_id, std_Ename , std_Tname, ps_tea_point FROM ps_teacher 
        LEFT JOIN student ON ps_tea_std = std_code_id
        WHERE ps_tea_semester = "'.$semester.'" AND ps_tea_subAdd = "'.$subject.'"');
        return $query->result();
    }

    public function getRead($semester,$subject)
    {
        $query = $this->db->query('SELECT * FROM ps_teacher WHERE ps_tea_semester = "'.$semester.'" AND ps_tea_subAdd = "'.$subject.'" AND ps_tea_read = "0" ');
        return $query->result();
    }

}
