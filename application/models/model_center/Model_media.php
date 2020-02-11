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
                } else {
                        return false;
                }
        }

        public function media_del($id)
        {
                $this->db->where('media_id', $id);
                $this->db->delete('media_data');
                if (!$this->db->affected_rows()) {
                        return 'Error! ID [' . $id . '] not found';
                } else {
                        return true;
                }
        }

        public function get_data_edit($id, $semesterId, $subjectId)
        {
                $this->db->select('*');
                $this->db->from('media_data');
                $this->db->where('media_semester', $semesterId);
                $this->db->where('media_subject', $subjectId);
                $this->db->where('media_id', $id);
                $query = $this->db->get();
                if ($query->num_rows() > 0) {
                        return $query->result();
                } else {
                        return false;
                }
        }

        public function edit_update_md($id, $semesterId, $subjectId, $data)
        {
                $this->db->where('media_semester', $semesterId);
                $this->db->where('media_subject', $subjectId);
                $this->db->where('media_id', $id);
                $this->db->update('media_data', $data);
                $this->db->trans_complete();
                if ($this->db->trans_status()) {
                        return true;
                } else {
                        return false;
                }
        }

        public function check_name_dup($semester, $subject_id, $video_name)
        {
                $this->db->select('*');
                $this->db->from('media_data');
                $this->db->where('media_semester', $semester);
                $this->db->where('media_subject', $subject_id);
                $this->db->where('media_show_name', $subject_id);
                $query = $this->db->get();
                if ($query->num_rows() > 0) {
                        return false;
                } else {
                        return true;
                }
        }
}
