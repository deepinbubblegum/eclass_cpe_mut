<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_uploaded extends CI_Model
{
    public function getMenuDownload($subjectId, $semesterId)
    {
        $this->db->select('*');
        $this->db->from('menuDownload');
        $this->db->where('menuDowSubjectId', $subjectId);
        $this->db->where('menuDowSemesterId', $semesterId);
        $this->db->order_by('CAST(menuDowIndex AS int)', 'ASC');
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
        $this->db->where('fileMenuDowId', $menuId);
        $this->db->where('fileName', $fileName);  
        $this->db->delete('fileDownload');
        //$this->db->order_by('fileTimestamp', 'DESC'); 
    }

    public function getData($subjectId, $semesterId, $menuId)
    {
        $this->db->select('*');
        $this->db->from('fileDownload');
        $this->db->where('fileSubjectId', $subjectId);
        $this->db->where('fileSemesterId', $semesterId);
        $this->db->where('fileMenuDowId', $menuId);
        $this->db->order_by('CAST(fileIndex AS int) ', 'ASC ');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        }
    }

    public function up_auto_id($arg, $arg2)
    {
        $query = $this->db->query(
            'SELECT CONCAT("UPL",LPAD(SUBSTRING(IFNULL(MAX(menuDowId), "0"), 4,6)+1, 6,"0")) as auto_id 
            FROM menuDownload
            WHERE menuDowSemesterId = \''.$arg.'\' and menuDowSubjectId = \''.$arg2.'\';'
        );
        if ($query->num_rows() > 0) {
            $row = $query->row_array();
            return $row['auto_id'];
        }
    }

    public function up_add_menu($arg){
        $this->db->insert('menuDownload', $arg);
    }

    public function editUpMenu($semester,$subject,$menuDowId,$menuDowName,$descript,$tend)
    { 
        $this->db->set('menuDowName', $menuDowName);
        $this->db->set('menuDowDescrpition', $descript);
        $this->db->set('menuUpTimeEnd', $tend);

        $this->db->where('menuDowSemesterId', $semester);
        $this->db->where('menuDowSubjectId', $subject);
        $this->db->where('menuDowId', $menuDowId);
        $this->db->update('menuDownload'); 
    }


    /*
    $semester = $this->input->post('semester');
            $subject = $this->input->post('subject');
            $setIdParent = $this->input->post('menuID');  
            $this->Model_te_download->deleteMenu($semester,$subject,$setIdParent);
    */
    public function deleteMenu($semester,$subject,$menuID){
        $this->db->where_in('menuDowSemesterId', $semester);
        $this->db->where_in('menuDowSubjectId', $subject); 
        $this->db->where_in('menuDowId', $menuID);
        $this->db->delete('menuDownload');
    }

    public function IndexFile($sortIDArray, $sortNameArray, $ArraySemester, $ArraySubject)
    {
        $num = count($sortIDArray);
        for ($i = 0; $i < $num; $i++) {
            $newIndex = $i + 1;
            $this->db->query('UPDATE fileDownload SET fileIndex = "' . $newIndex . '" WHERE fileSemesterId = "' . $ArraySemester[$i] . '" 
            AND fileSubjectId = "' . $ArraySubject[$i] . '" AND fileMenuDowId = "' . $sortIDArray[$i] . '" AND fileName = "' . $sortNameArray[$i] . '"');
            // echo $sortNameArray[$i];
            // echo "<br>";
        }
    }

}
