<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_std_upload extends CI_Model
{
    public function insertUpload($data)
    {
        $this->db->where('fileName', $data['fileName']);
        $this->db->delete('fileUpload');

        $this->db->insert('fileUpload', $data);
    }

    public function getMenuUpload($subjectId, $semesterId)
    {
        $this->db->select('*');
        $this->db->from('menuUpload');
        $this->db->where('menuUpSubjectId', $subjectId);
        $this->db->where('menuUpSemesterId', $semesterId);
        //$this->db->order_by('menuUpId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function ck_late_model($semester,$subject_id,$menuId)
    {
        $this->db->select('menuUpTimeEnd');
        $this->db->from('menuUpload');
        $this->db->where('menuUpSemesterId',$semester);
        $this->db->where('menuUpSubjectId',$subject_id);
        $this->db->where('menuUpId',$menuId);
        $this->db->where('menuUpTimeEnd >=', date("Y-m-d H:i:s"));
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
}
