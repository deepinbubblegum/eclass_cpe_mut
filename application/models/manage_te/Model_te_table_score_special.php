<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_table_score_special extends CI_Model
{


    public function getBody($subject_id, $semester)
    {
        $query = $this->db->query('SELECT std_code_id , std_Ename , std_Tname FROM student 
        LEFT JOIN subject_point_student ON std_code_id = point_std_user_id
        WHERE point_std_semester = "'.$semester.'" AND point_std_subject = "'.$subject_id.'" GROUP BY std_code_id');
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getBodyForStd_Special($subject_id, $semester, $point_id, $UserId)
    {
        $StdView = $this->db->query('SELECT point_StdView AS View FROM subject_point WHERE point_semester = "' . $semester . '" AND point_subject = "' . $subject_id . '" AND point_id = "' . $point_id . '" ');
        $View = $StdView->row()->View;

        if ($View == 1) {
            $query = $this->db->query('SELECT std_code_id, std_Tname FROM student
            LEFT JOIN subject_point_student ON std_code_id = point_std_user_id
            WHERE point_std_semester = "'. $semester.'" AND point_std_subject = "'.$subject_id.'" GROUP BY std_code_id ');
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return 0;
            }
        }
        else{
             $query = $this->db->query('SELECT std_code_id , std_Tname , std_Ename FROM student WHERE std_code_id = "'.$UserId.'" ');
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return 0;
            }
        }
    }

}
