<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_user_announce_personnel extends CI_Model
{
        public function announce_showdata_model(){
                $query = $this->db->query('select anc_id, title, content, s_time, e_time from announce_su_personnel where e_time >= DATE(now()) or e_time = \'0000-00-00\'  
                ORDER BY s_time DESC ;');
                if ($query->num_rows() > 0) {
                        return $query->result();
                }else{
                        return 0;
                }
        }
}