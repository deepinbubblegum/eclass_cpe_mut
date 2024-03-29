<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_std_ticket extends CI_Model
{
    //insert into ticket values('963258741','25611','CPEN1010','1','1','0','','5');
    public function checkTicket($ticket,$userId)
    { 
        $this->db->select('*');
        $this->db->from('ticket');
        $this->db->where('token', $ticket);
        //$this->db->where('userId', $userId);
        $query = $this->db->get(); 
        // if ($query->num_rows() > 0) {
        //     return $query->result();
        // } else {
        //     return 0;
        // }

        foreach ($query->result() as $row)
        { 
            $this->db->select('*');
            $this->db->from('subject_setpoint');
            $this->db->where('setpoint_semester', $row->semester);
            $this->db->where('setpoint_subject', $row->subject);
            $this->db->where('setpoint_id', $row->pointMenu);
            $this->db->where('setpoint_setpoint_id', $row->pointField);
            //$this->db->where('userId', $userId);
            $query2 = $this->db->get(); 
            foreach ($query2->result() as $row2){ 
                if($row2->setpoint_ticket == 0){
                    return '-2';
                }else if($row2->setpoint_ticket == 1){
                    if($row->userId == null){

                        $chkMulyi = $this->db->query('SELECT setpoint_multi AS multi FROM `subject_setpoint` WHERE setpoint_semester = "' . $row->semester . '" AND setpoint_subject = "' . $row->subject . '" 
                        AND setpoint_id = "' . $row->pointMenu . '" AND setpoint_setpoint_id = "' . $row->pointField . '" ');
                        $multi = $chkMulyi->row()->multi;

                        if ($multi == 0) {
                            $stdchk = $this->db->query('SELECT point_std_user_id AS std FROM subject_point_student WHERE point_std_semester = "' . $row->semester . '" AND point_std_subject = "' . $row->subject . '" 
                            AND point_std_id = "' . $row->pointMenu . '" AND point_std_setpoint_id = "' . $row->pointField . '" AND point_std_user_id = "' . $userId . '" AND point_std_index NOT LIKE "no_%" ');
                            // $std = $stdchk->row()->std;
                            if ($stdchk->num_rows() > 0) {
                                return '-3';
                            } else {
                                $this->db->query("insert into subject_point_student 
                                values('" . $row->semester . "','" . $row->subject . "','" . $row->pointMenu . "','" . $row->pointField . "','" . $userId . "','" . $ticket . "','" . $row->point . "')");
                            }
                        } else {
                            $this->db->query("insert into subject_point_student 
                            values('" . $row->semester . "','" . $row->subject . "','" . $row->pointMenu . "','" . $row->pointField . "','" . $userId . "','" . $ticket . "','" . $row->point . "')");
                        }

                        // $this->db->query("
                        // insert into subject_point_student 
                        // values(
                        // '" . $row->semester . "',
                        // '" . $row->subject . "',
                        // '" . $row->pointMenu . "',
                        // '" . $row->pointField . "',
                        // '" . $userId . "',
                        // '" . $ticket . "',
                        // '" . $row->point . 
                        // "')");
             
                        $this->db->set('userId', $userId);
                        $this->db->where('token', $ticket);
                        $this->db->update('ticket');
            
                        return '1';
                    }else{
                        return '-1';
                    }  
                }
            }

            
        } 
        return '0';
    } 
}
