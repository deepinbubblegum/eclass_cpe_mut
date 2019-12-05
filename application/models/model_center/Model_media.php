<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_media extends CI_Model
{
        public function get_auto_id($arg, $arg2)
        {
                $query = $this->db->query(
                        'SELECT CONCAT("MD-",LPAD(SUBSTRING(IFNULL(MAX(media_id), "0"), 4,7)+1, 7,"0")) as auto_id
                        FROM media_data
                        WHERE media_semester = \'' . $arg . '\' AND media_subject = \'' . $arg2 . '\';'
                );
                if ($query->num_rows() > 0) {
                        $row = $query->row_array();
                        return $row['auto_id'];
                }
        }

        public function get_data($subjectId, $semesterId)
        {
                $this->db->select('*');
                $this->db->from('media_data');
                $this->db->where('media_subject', $subjectId);
                $this->db->where('media_semester', $semesterId);
                $query = $this->db->get();
                if ($query->num_rows() > 0) {
                    return $query->result();
                } else {
                    return false;
                }
        }

        public function media_add($data_media)
        {
                if ($this->db->insert('media_data', $data_media)) {
                        return true;
                }else{
                        return false;
                }
        }
}
