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
            if($row->status == 0){
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
    
                $this->db->set('status', '1');
                $this->db->set('userId', $userId);
                $this->db->where('token', $ticket);
                $this->db->update('ticket');
    
                return '1';
            }else{
                return '-1';
            }  
        } 
        return '0';
    } 
}
