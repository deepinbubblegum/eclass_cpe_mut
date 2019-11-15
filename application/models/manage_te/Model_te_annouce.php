<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_annouce extends CI_Model
{
    public function Show_Data_Annouce_model($semester, $subject)
    {
        // $userID = $this->session->ses_id;
        // $queryPer = $this->db->query('SELECT per_semester, per_subject ,per_bit  FROM permission 
        // LEFT JOIN teacher_assist ON teaassist_permission = per_id
        // WHERE per_semester = "' . $semester . '" AND per_subject = "' . $subject . '" AND teaassist_teacherid = "' . $userID . '" GROUP BY per_subject ');
        // if ($queryPer->num_rows() > 0) {
        //     foreach ($queryPer->result() as $row) {
        //         $per_bit = $row->per_bit;
        //         $newdata = array(
        //             'ses_permission' => $per_bit
        //         );
        //         $this->session->set_userdata($newdata);
        //     }
        // }else
        // {
        //     $newdata = array(
        //         'ses_permission' => 0
        //     );
        //     $this->session->set_userdata($newdata);
        // }

        // $this->Show_Data_Annouce_model_2($semester, $subject);
        $query = $this->db->query('SELECT * FROM subject_annouce WHERE annouce_semester = "' . $semester . '" AND annouce_subject="' . $subject . '" ORDER BY annouce_time_start DESC ');
        return $query->result();
    }

    public function Show_Data_Annouce_model_2($semester, $subject)
    {
        $query = $this->db->query('SELECT * FROM subject_annouce WHERE annouce_semester = "' . $semester . '" AND annouce_subject="' . $subject . '" ORDER BY annouce_time_start DESC ');
        return $query->result();
    }

    public function Permission_Medel($data)
    {
        $userID = $this->session->ses_id;
        $queryPer = $this->db->query('SELECT teaassist_semester, teaassist_subject, teaassist_teacherid , per_bit  FROM teacher_assist 
        LEFT JOIN permission ON teacher_assist.teaassist_permission = permission.per_id 
        WHERE teaassist_semester = "'.$data['semester'].'" AND teaassist_subject = "'.$data['subject_id'].'" AND teaassist_teacherid = "'.$userID.'" 
        AND per_semester = "'.$data['semester'].'" AND per_subject = "'.$data['subject_id'].'"
        GROUP BY teaassist_teacherid');
        if ($queryPer->num_rows() > 0) {
            foreach ($queryPer->result() as $row) {
                $per_bit = $row->per_bit;
                $newdata = array(
                    'ses_permission' => $per_bit
                );
                $this->session->set_userdata($newdata);
                return true;
            }
        }else{
            $newdata = array(
                'ses_permission' => 0
            );
            $this->session->set_userdata($newdata);
            return false;
        }
    }

    public function Add_Data_Annouce_model($semester, $subject, $Header, $Annouce, $Sdata, $Edate, $User)
    {
        $maxid = $this->db->query('SELECT ifnull(lpad(lpad(max(substr(annouce_id,15,4))+1,4,"0"),18,"' . $semester . $subject . '_"),"' . $semester . $subject . '_0001") as newid
        from subject_annouce
        WHERE annouce_semester = "' . $semester . '" AND annouce_subject = "' . $subject . '" ');
        $newid = $maxid->row()->newid;

        $this->db->query('INSERT INTO subject_annouce(annouce_semester,annouce_subject,annouce_id,annouce_name,annouce_discription,annouce_time_start,annouce_time_end,annouce_user_id)
        VALUES("' . $semester . '" , "' . $subject . '" , "' . $newid . '" , "' . $Header . '" , "' . $Annouce . '" , NOW() , "' . $Edate . '" , "' . $User . '")');
    }

    public function Edit_Data_Annouce_model($semester, $subject, $id, $Header, $Annouce, $Sdata, $Edate, $User)
    {
        $this->db->query('UPDATE subject_annouce SET annouce_name="' . $Header . '" , annouce_discription="' . $Annouce . '" , annouce_time_start=NOW() , 
        annouce_time_end="' . $Edate . '" , annouce_user_id="' . $User . '" 
        WHERE annouce_semester="' . $semester . '" AND annouce_subject = "' . $subject . '" AND annouce_id="' . $id . '" ');
    }

    public function Delete_Data_Annouce_model($semester, $subject, $id)
    {
        $this->db->query('Delete FROM subject_annouce WHERE annouce_semester="' . $semester . '" AND annouce_subject = "' . $subject . '" AND annouce_id="' . $id . '" ');
    }
}
