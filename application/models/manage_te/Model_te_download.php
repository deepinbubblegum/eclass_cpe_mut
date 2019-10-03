<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_download extends CI_Model
{
    public function getMenuDownload($subjectId, $semesterId)
    {
        $this->db->select('*');
        $this->db->from('menuUpload');
        $this->db->where('menuUpSubjectId', $subjectId);
        $this->db->where('menuUpSemesterId', $semesterId);
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function fileDelete($subjectId, $semesterId, $menuId,$fileName)
    {
        $this->db->where('fileSubjectId', $subjectId);
        $this->db->where('fileSemesterId', $semesterId);
        $this->db->where('fileMenuUpId', $menuId);
        $this->db->where('fileName', $fileName);  
        $this->db->delete('fileUpload');
        //$this->db->order_by('fileTimestamp', 'DESC'); 
    }

    public function getData($subjectId, $semesterId, $menuId)
    {
        $this->db->select('*');
        $this->db->from('fileUpload');
        $this->db->where('fileSubjectId', $subjectId);
        $this->db->where('fileSemesterId', $semesterId);
        $this->db->where('fileMenuUpId', $menuId);
        //$this->db->order_by('fileTimestamp', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        }
    }

    public function up_auto_id($arg, $arg2)
    {
        $query = $this->db->query(
            'SELECT CONCAT("UPL",LPAD(SUBSTRING(IFNULL(MAX(menuUpId), "0"), 4,6)+1, 6,"0")) as auto_id 
            FROM menuUpload
            WHERE menuUpSemesterId = \''.$arg.'\' and menuUpSubjectId = \''.$arg2.'\';'
        );
        if ($query->num_rows() > 0) {
            $row = $query->row_array();
            return $row['auto_id'];
        }
    }

    public function up_add_menu($arg){
        $this->db->insert('menuUpload', $arg);
    }

    public function editUpMenu($semester,$subject,$menuUpId,$menuUpName,$descript,$tend)
    { 
        $this->db->set('menuUpName', $menuUpName);
        $this->db->set('menuUpDescripition', $descript);
        $this->db->set('menuUpTimeEnd', $tend);

        $this->db->where('menuUpSemesterId', $semester);
        $this->db->where('menuUpSubjectId', $subject);
        $this->db->where('menuUpId', $menuUpId);
        $this->db->update('menuUpload'); 
    }


    /*
    $semester = $this->input->post('semester');
            $subject = $this->input->post('subject');
            $setIdParent = $this->input->post('menuID');  
            $this->Model_te_download->deleteMenu($semester,$subject,$setIdParent);
    */
    public function deleteMenu($semester,$subject,$menuID){
        $this->db->where_in('menuUpSemesterId', $semester);
        $this->db->where_in('menuUpSubjectId', $subject); 
        $this->db->where_in('menuUpId', $menuID);
        $this->db->delete('menuUpload');
    }

}
