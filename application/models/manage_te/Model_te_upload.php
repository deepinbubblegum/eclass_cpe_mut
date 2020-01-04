<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_upload extends CI_Model
{
    public function insertUpload($data, $semester, $subject, $DowId)
    { 
        $this->db->where('fileName', $data['fileName']);
        $this->db->delete('fileDownload');

        $maxIndex = $this->db->query('SELECT ifnull(max(CAST(fileIndex AS int))+1,"1") AS newIndex FROM fileDownload WHERE fileSemesterId = "'.$semester.'" AND fileSubjectId = "'.$subject.'" AND fileMenuDowId = "'.$DowId.'" ');
        $newIndex = $maxIndex->row()->newIndex;

        $this->db->set('fileTimestamp', 'NOW()', FALSE);
        $this->db->set('fileIndex', $newIndex);
        $this->db->insert('fileDownload', $data);
    }

    public function getMenuUpload($subjectId,$semesterId)
    {
        $this->db->select('*');
        $this->db->from('menuDownload');
        $this->db->where('menuDowSubjectId',$subjectId); 
        $this->db->where('menuDowSemesterId',$semesterId);
        $this->db->order_by('menuDowIndex', 'ASC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        }
    }

    public function dow_auto_id($arg, $arg2)
    {
        $query = $this->db->query(
            'SELECT CONCAT("DOW",LPAD(SUBSTRING(IFNULL(MAX(menuDowId), "0"), 4,6)+1, 6,"0")) as auto_id 
            FROM menuDownload
            WHERE menuDowSemesterId = \''.$arg.'\' and menuDowSubjectId = \''.$arg2.'\';'
        );
        if ($query->num_rows() > 0) {
            $row = $query->row_array();
            return $row['auto_id'];
        }
    }

    public function dow_add_menu($arg){
        $this->db->insert('menuDownload', $arg);
    }

    public function editUpMenu($semester,$subject,$menuDowId,$menuDowName,$descript)
    { 
        $this->db->set('menuDowName', $menuDowName);
        $this->db->set('menuDowDescrpition', $descript);

        $this->db->where('menuDowSemesterId', $semester);
        $this->db->where('menuDowSubjectId', $subject);
        $this->db->where('menuDowId', $menuDowId);
        $this->db->update('menuDownload'); 
    }

    public function deleteMenu($semester,$subject,$menuID){
        $this->db->where_in('menuDowSemesterId', $semester);
        $this->db->where_in('menuDowSubjectId', $subject); 
        $this->db->where_in('menuDowId', $menuID);
        $this->db->delete('menuDownload');
    }

    public function IndexMenu($sortMenuIDArray, $ArraySemester, $ArraySubject)
    {
        $num = count($sortMenuIDArray);
        for ($i = 0; $i < $num; $i++) {
            $newIndex = $i + 1;
            $this->db->query('UPDATE menuDownload SET menuDowIndex = "' . $newIndex . '" WHERE menuDowSemesterId = "' . $ArraySemester[$i] . '" 
            AND menuDowSubjectId = "' . $ArraySubject[$i] . '" AND menuDowId = "' . $sortMenuIDArray[$i] . '" ');
            // echo $sortNameArray[$i];
            // echo "<br>";
        }
    }
}