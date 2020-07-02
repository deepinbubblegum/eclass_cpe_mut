<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_log extends CI_Model
{
        public function log_s($arg)
        {
                $insert_query = $this->db->insert_string('log', $arg);
                $insert_query = str_replace('INSERT INTO','INSERT IGNORE INTO',$insert_query);
                $this->db->query($insert_query);
        }
}
