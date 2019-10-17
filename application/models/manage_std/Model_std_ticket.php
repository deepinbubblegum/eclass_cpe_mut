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
                        $this->db->query("
                        insert into subject_point_student 
                        values(
                        '" . $row->semester . "',
                        '" . $row->subject . "',
                        '" . $row->pointMenu . "',
                        '" . $row->pointField . "',
                        '" . $userId . "',
                        '" . $ticket . "',
                        '" . $row->point . 
                        "')");
             
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
