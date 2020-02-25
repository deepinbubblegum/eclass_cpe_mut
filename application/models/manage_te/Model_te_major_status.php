<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_major_status extends CI_Model
{
    public function te_major_show($sesid)
    {
        $this->db->select('major_id, major_name');
        $this->db->from('major');
        $this->db->join('teacher_major', 'major.major_id = teacher_major.teamaj_majorid','left');
        $this->db->where('teamaj_teacherid', $sesid);
        $query = $this->db->get();

        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
}
