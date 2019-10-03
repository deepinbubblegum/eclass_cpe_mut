<?php
defined('BASEPATH') or exit('No direct script access allowed');

function convertData($sid)
{
    $str_arr = explode("-", $sid);
    $data = array(
        'subject_id' => $str_arr[0],
        'semester' => $str_arr[1],
        //'menuId' => $str_arr[3],
        //'heading' => 'My Heading',
        //'message' => 'My Message'
    );
    return $data;
}

class Std_score extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_subject_point');
    }

    public function showMenuPoint($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            //'menuId' => $str_arr[3],
            //'heading' => 'My Heading',
            //'message' => 'My Message'
        );
        $result = $this->Model_te_subject_point->getMenuPoint($data['subject_id'], $data['semester']);
        echo json_encode($result);
    }

    public function showPointField($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            'menuId' => $str_arr[2],
            //'heading' => 'My Heading',
            //'message' => 'My Message'
        );
        $result = $this->Model_te_subject_point->getPointField($data['subject_id'], $data['semester'], $data['menuId']);
        echo json_encode($result);
    }

    public function showPoint()
    {
        $point_std_semester = $this->input->post('semester');
        $point_std_subject = $this->input->post('subject_id');
        $point_std_id = $this->input->post('setIdParent');
        $point_std_setpoint_id = $this->input->post('setIdChild');
        $result = $this->Model_te_subject_point->getPoint($point_std_semester, $point_std_subject, $point_std_setpoint_id, $point_std_id);
        echo json_encode($result);
    }
}
