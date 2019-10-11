<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_ticket extends CI_Model
{
        public function add_lot($arg){
                $this->db->insert('lot_ticket', $arg);
        }

        public function add_ticket($arg)
        {
                $this->db->insert('ticket', $arg);
        }

        public function auto_lot_id()
        {
                $query = $this->db->query('SELECT CONCAT("TCK-",LPAD(SUBSTRING(IFNULL(MAX(lot_Id), "0"), 5,6)+1, 6,"0")) as tick_id FROM lot_ticket;');
                if ($query->num_rows() > 0) {
                        $row = $query->row_array();
                        return $row['tick_id'];
                }
        }
}
