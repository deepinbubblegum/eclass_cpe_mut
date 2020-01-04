<?php
defined('BASEPATH') or exit('No direct script access allowed');

function convertData($sid)
{
    $str_arr = explode("-", $sid);
    $data = array(
        'subject_id' => $str_arr[0],
        'semester' => $str_arr[1],
        'point_id' => $str_arr[2]
    );
    return $data;
}

class Te_table_score_special extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_table_score_special');
    }

    public function showTableBodySpecial()
    {
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        //$point_id = $this->input->post('parent_id');
        $result = $this->Model_te_table_score_special->getBody($subject_id, $semester/*, $point_id*/);
        echo json_encode($result);
    }

}
