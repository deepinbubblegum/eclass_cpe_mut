<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_announce_about_us extends CI_Model
{
        public function announce_id_auto_model()
        {
                $query = $this->db->query('SELECT CONCAT("ANC-",LPAD(SUBSTRING(IFNULL(MAX(anc_id), "0"), 5,6)+1, 6,"0")) as anc_id FROM announce_su_about_us;');
                if ($query->num_rows() > 0) {
                        $row = $query->row_array();
                        return $row['anc_id'];
                }
        }
        
        public function announce_add_model($args)
        {
                $this->db->insert('announce_su_about_us', $args);
        }

        public function announce_showdata_model()
        {
                $query = $this->db->query('SELECT anc_id, title, content, e_time FROM announce_su_about_us ORDER BY s_time DESC');
                if ($query->num_rows() > 0) {
                        return $query->result();
                } else {
                        return 0;
                }
        }

        public function announce_del_model($args)
        {
                $this->db->where_in('anc_id', $args);
                $this->db->delete('announce_su_about_us');
        }

        public function announce_edit_model($arg, $arg2)
        { 
                $this->db->where('anc_id', $arg);
                $this->db->update('announce_su_about_us', $arg2);
        }
}
