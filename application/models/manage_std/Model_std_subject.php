<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_std_subject extends CI_Model
{
    public function selectSemester()
    {
        $this->db->select('semester_id, semester_year,  semester_part, semester_name');
        $this->db->from('semester');
        $this->db->order_by('semester_id', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function selectSubjectCoop($data)
    {
        $query = $this->db->query('SELECT subcoop_supsub,subject_name,subcoop_semester,subcoop_mainsub  FROM subject_coop 
        LEFT JOIN subject ON subject_id = subcoop_supsub
        LEFT JOIN subject_semester ON subsem_subject = subcoop_mainsub
        WHERE subcoop_semester = "'.$data.'" ');
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function selectSubject($data,$userID)
    {
        $query = $this->db->query('SELECT subject_name,subsem_subject, subsem_semester FROM subject_semester 
        LEFT JOIN subject ON subsem_subject = subject_id 
        LEFT JOIN subject_student ON subsem_subject = substd_subject 
<<<<<<< HEAD
<<<<<<< HEAD
        WHERE substd_stdid = "'.$userID.'" AND substd_semester = "'.$data.'" ');
=======
        WHERE subsem_semester = "'.$data.'" AND substd_stdid = "'.$userID.'"  ');
>>>>>>> parent of 525b38a... Merge pull request #76 from deepinbubblegum/ZUKA_RUNFI
=======
        WHERE subsem_semester = "'.$data.'" AND substd_stdid = "'.$userID.'"  ');
>>>>>>> parent of 525b38a... Merge pull request #76 from deepinbubblegum/ZUKA_RUNFI
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function selectSubject_special($data)
    {
        $query = $this->db->query('SELECT * FROM subject_semester 
        LEFT JOIN subject ON subject_id = subsem_subject 
        WHERE subsem_semester = "'.$data.'" AND subject_major = "MUT" ');
         if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

}
