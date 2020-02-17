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

class Std_subject_vote extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_std/Model_std_subject_vote');
        $this->load->model('manage_te/Model_te_subject_vote');
    }

    public function showMenuVote($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            //'menuId' => $str_arr[3],
            //'heading' => 'My Heading',
            //'message' => 'My Message'
        );
        $result = $this->Model_std_subject_vote->getMenuVote($data['subject_id'], $data['semester']);
        echo json_encode($result);
    }

    public function showVoteField($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            'menuId' => $str_arr[2], 
        );
        $result = $this->Model_std_subject_vote->getVoteField($data['subject_id'], $data['semester'], $data['menuId']);
        echo json_encode($result);
    } 

    public function showPoint($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            'menuId' => $str_arr[2],
            'fieldId' => $str_arr[3],
        );
        $result = $this->Model_te_subject_vote->getVotePoint($data['subject_id'], $data['semester'], $data['menuId'], $data['fieldId']);
        echo json_encode($result);
    }

    public function getStudent($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            //'menuId' => $str_arr[3],
            //'heading' => 'My Heading',
            //'message' => 'My Message'
        );
        $result = $this->Model_te_subject_vote->getStudent($data['subject_id'], $data['semester']);
        echo json_encode($result);
    }

    public function selectPoint()
    { 
        $subject = $this->input->post('subject');
        $semester = $this->input->post('semester');
        $menuId = $this->input->post('menuId'); 

        $userId = $this->session->ses_id; 

        $result = $this->Model_std_subject_vote->getVotePoint($subject, $semester, $menuId, $userId);
        echo json_encode($result);
    } 

    public function insertPoint()//data: '&semester=' + semester + '&subject=' + subject_id + '&menuId=' + getMenu[i].menuVoteId + '&choiceId=' + choiceId,
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $menuId = $this->input->post('menuId');
        $choiceId = $this->input->post('choiceId');
        $userId = $this->session->ses_id; 
        $result = $this->Model_std_subject_vote->insertPoint($semester, $subject, $menuId, $choiceId, $userId);
        // echo json_encode($result);
    }

    public Function refresherOrb(){
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $menuId = $this->input->post('menuId');
        $result = $this->Model_std_subject_vote->refreshed($semester, $subject, $menuId);
        echo json_encode($result);
    }
}
