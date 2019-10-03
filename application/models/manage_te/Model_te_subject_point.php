<?php
defined('BASEPATH') or exit('No direct script access allowed');



function code_keygen($length)
{
   $gencode = strtoupper(substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, $length));
   $gencode = str_split($gencode,4);
   
   $keygen = implode("-",$gencode);
   return $keygen; 
}

class Model_te_subject_point extends CI_Model
{
    public function getMenuPoint($subjectId, $semesterId)
    {
        $this->db->select('*');
        $this->db->from('subject_point');
        $this->db->where('point_subject', $subjectId);
        $this->db->where('point_semester', $semesterId);
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getPointField($subjectId, $semesterId, $menuId)
    {
        $this->db->select('*');
        $this->db->from('subject_setpoint');
        $this->db->where('setpoint_subject', $subjectId);
        $this->db->where('setpoint_semester', $semesterId);
        $this->db->where('setpoint_id', $menuId);
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
    
    public function insertPoint($semester, $subject, $id, $setpoint_id, $user_id, $point)
    {
        $qIndex = $this->db->query("
        select IFNULL(max(point_std_index),0)+1 as newIndex
        from subject_point_student
        where point_std_user_id='" . $user_id . "' and point_std_semester = '" . $semester . "' and point_std_subject='" . $subject . "' and point_std_setpoint_id = '" . $setpoint_id . "' and point_std_id = '" . $id . "';
        ");
        $newIndex = $qIndex->row()->newIndex;

        $this->db->query("insert into subject_point_student values('" . $semester . "','" . $subject . "','" . $id . "','" . $setpoint_id . "','" . $user_id . "','" . $newIndex . "','" . $point . "')");
    }

    public function insertField($semester, $subject_id, $pointId, $ticket, $fullName, $miniName, $maxPoint)
    { //$data['semester'],$data['subject_id'],$data['pointId'],$data['ticket'],$data['fullName'],$data['miniName'],$data['maxPoint']

        $maxid = $this->db->query("
        select IFNULL(max(setpoint_setpoint_id),0)+1 as newid
        from subject_setpoint
        where setpoint_semester = '" . $semester . "' and setpoint_subject='" . $subject_id . "' and setpoint_id = '" . $pointId . "';
    ");
        $newid = $maxid->row()->newid;

        $maxindex = $this->db->query("
        select IFNULL(max(setpoint_index),0)+1 as newindex
        from subject_setpoint
        where setpoint_semester = '" . $semester . "' and setpoint_subject='" . $subject_id . "' and setpoint_id = '" . $pointId . "';
    ");
        $maxindex = $maxindex->row()->newindex;

        $this->db->query("insert into subject_setpoint values('" . $semester . "','" . $subject_id . "','" . $pointId . "','" . $newid . "','" . $maxindex . "','" . $ticket . "','" . $fullName . "','" . $miniName . "','" . $maxPoint . "');");
    }

    public function updateField($semester, $subject_id, $pointId,$pointIdChild, $ticket, $fullName, $miniName, $maxPoint)
    {  
        $data = [
            'setpoint_ticket' => $ticket,
            'setpoint_fullname' => $fullName,
            'setpoint_mininame' => $miniName,
            'setpoint_maxpoint' => $maxPoint,
        ];

        $this->db->where('setpoint_semester', $semester);
        $this->db->where('setpoint_subject', $subject_id);
        $this->db->where('setpoint_id', $pointId);
        $this->db->where('setpoint_setpoint_id', $pointIdChild);

        $this->db->update('subject_setpoint', $data);
    }

    public function insertMenu($semester, $subject, $Header, $Description)
    {
        $maxid = $this->db->query("
            select IFNULL(max(point_id),0)+1 as newid
            from subject_point
            where point_semester = '" . $semester . "' and point_subject='" . $subject . "';
        ");
        $newid = $maxid->row()->newid;
        $this->db->query('insert into subject_point values("' . $semester . '","' . $subject . '","' . $newid . '","' . $Header . '","' . $Description . '");');
    }

    public function editMenu($semester, $subject, $Header, $Description,$editID)
    { 
        $this->db->set('point_name', $Header);
        $this->db->set('point_discription', $Description);
        $this->db->where('point_semester', $semester);
        $this->db->where('point_subject', $subject);
        $this->db->where('point_id', $editID);
        $this->db->update('subject_point'); 
    }
    // select * from subject_point_student where point_std_semester='25611' and point_std_subject='CPEN1010' and  point_std_setpoint_id='1';
    public function getPoint($semester, $subject, $setId, $id)
    {
        $this->db->select('*');
        $this->db->from('subject_point_student');
        $this->db->where('point_std_semester', $semester);
        $this->db->where('point_std_subject', $subject);
        $this->db->where('point_std_setpoint_id', $setId);
        $this->db->where('point_std_id', $id); 
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function deletePoint($semester,$subject_id,$setIdChild,$setIdParent,$pointIndex,$stdId){
        $this->db->where_in('point_std_semester', $semester);
        $this->db->where_in('point_std_subject', $subject_id);
        $this->db->where_in('point_std_id', $setIdChild);
        $this->db->where_in('point_std_setpoint_id', $setIdParent);
        $this->db->where_in('point_std_user_id', $stdId);
        $this->db->where_in('point_std_index', $pointIndex);
        $this->db->delete('subject_point_student');
    }

    public function deleteField($semester,$subject_id,$setIdChild,$setIdParent){
        $this->db->where_in('setpoint_semester', $semester);
        $this->db->where_in('setpoint_subject', $subject_id);
        $this->db->where_in('setpoint_id', $setIdChild);
        $this->db->where_in('setpoint_setpoint_id', $setIdParent);
        $this->db->delete('subject_setpoint');
    }

    public function deleteMenu($semester,$subject_id,$setIdParent){
        $this->db->where_in('point_semester', $semester);
        $this->db->where_in('point_subject', $subject_id); 
        $this->db->where_in('point_id', $setIdParent);
        $this->db->delete('subject_point');
    }

    public function printTicket($salt,$ticketNumber,$semester,$subject,$parentTK,$childTK,$userId){
        code_keygen(16);
        //return $key;
    }
}
