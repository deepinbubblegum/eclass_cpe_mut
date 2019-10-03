<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_annouce extends CI_Model
{
    public function Show_Data_Annouce_model($semester,$subject)
    {
        $query = $this->db->query('SELECT * FROM subject_annouce WHERE annouce_semester = "'.$semester.'" AND annouce_subject="'.$subject.'" ORDER BY annouce_time_start DESC ');
        return $query->result();
    }

    public function Add_Data_Annouce_model($semester,$subject,$Header,$Annouce,$Sdata,$Edate,$User)
    {
        $maxid = $this->db->query('SELECT ifnull(lpad(lpad(max(substr(annouce_id,15,4))+1,4,"0"),18,"'.$semester.$subject.'_"),"'.$semester.$subject.'_0001") as newid
        from subject_annouce
        WHERE annouce_semester = "'.$semester.'" AND annouce_subject = "'.$subject.'" ');
        $newid = $maxid->row()->newid;
        
        $this->db->query('INSERT INTO subject_annouce(annouce_semester,annouce_subject,annouce_id,annouce_name,annouce_discription,annouce_time_start,annouce_time_end,annouce_user_id)
        VALUES("'.$semester.'" , "'.$subject.'" , "'.$newid.'" , "'.$Header.'" , "'.$Annouce.'" , NOW() , "'.$Edate.'" , "'.$User.'")');
    }

    public function Edit_Data_Annouce_model($semester,$subject,$id,$Header,$Annouce,$Sdata,$Edate,$User)
    {
        $this->db->query('UPDATE subject_annouce SET annouce_name="'.$Header.'" , annouce_discription="'.$Annouce.'" , annouce_time_start=NOW() , 
        annouce_time_end="'.$Edate.'" , annouce_user_id="'.$User.'" 
        WHERE annouce_semester="'.$semester.'" AND annouce_subject = "'.$subject.'" AND annouce_id="'.$id.'" ');
    }

    public function Delete_Data_Annouce_model($semester,$subject,$id)
    {
        $this->db->query('Delete FROM subject_annouce WHERE annouce_semester="'.$semester.'" AND annouce_subject = "'.$subject.'" AND annouce_id="'.$id.'" ');
    }

}