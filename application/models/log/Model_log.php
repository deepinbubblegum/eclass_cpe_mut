<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_log extends CI_Model
{
        public function log_s($arg)
        {
                $this->db->insert('log', $arg);
        }
}
