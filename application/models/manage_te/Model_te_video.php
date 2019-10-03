<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_video extends CI_Model
{
        public function auto_id_ml($arg, $arg2)
        {
                $query = $this->db->query(
                        'SELECT CONCAT("VD-",LPAD(SUBSTRING(IFNULL(MAX(video_id), "0"), 4,5)+1, 5,"0")) AS VD_auto FROM subject_video WHERE video_semester = \'' . $arg . '\' and video_subject = \'' . $arg2 . '\';');
                if ($query->num_rows() > 0) {
                        $row = $query->row_array();
                        return $row['VD_auto'];
                }
        }

        public function add_menu_ml($arg)
        {
                $this->db->insert('subject_video', $arg);
        }

        public function get_data_menu($arg, $arg2)
        {
                $query = $this->db->query(
                        'SELECT video_id, video_name, video_discription, video_timestamp
                        FROM subject_video
                        WHERE video_semester = \''.$arg.'\' and video_subject = \''.$arg2.'\';'
                );
                if ($query->num_rows() > 0) {
                        return $query->result();
                } else {
                        return false;
                }
        }
}
