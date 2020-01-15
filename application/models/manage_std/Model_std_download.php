<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_std_download extends CI_Model
{
    public function getMenuDownload($subjectId, $semesterId)
    {
        $this->db->select('*');
        $this->db->from('menuDownload');
        $this->db->where('menuDowSubjectId', $subjectId);
        $this->db->where('menuDowSemesterId', $semesterId);
        $this->db->order_by('CAST(menuDowIndex AS int)', 'ASC');
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getData($subjectId, $semesterId, $menuId)
    {
        $this->db->select('*');
        $this->db->from('fileDownload');
        $this->db->where('fileSubjectId', $subjectId);
        $this->db->where('fileSemesterId', $semesterId);
        $this->db->where('fileMenuDowId', $menuId);
        $this->db->order_by('CAST(fileIndex AS int) ', 'ASC ');
        //$this->db->order_by('fileTimestamp', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
}
