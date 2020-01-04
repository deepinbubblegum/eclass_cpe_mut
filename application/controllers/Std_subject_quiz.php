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

class Std_subject_quiz extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_std/Model_std_subject_quiz');
    }

    public function showMenuQuiz($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            //'menuId' => $str_arr[3],
            //'heading' => 'My Heading',
            //'message' => 'My Message'
        );
        $result = $this->Model_std_subject_quiz->getMenuQuiz($data['subject_id'], $data['semester']);
        echo json_encode($result);
    }

    public function selectCheck($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            'user_id' => $this->session->ses_id,
        );
        $result = $this->Model_std_subject_quiz->checkMenu($data['subject_id'], $data['semester'], $data['user_id']);
        echo json_encode($result);
    }

    public function showQuizField($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            'menuId' => $str_arr[2], 
        );
        $result = $this->Model_std_subject_quiz->getQuizField($data['subject_id'], $data['semester'], $data['menuId']);
        echo json_encode($result);
    }

    public function showQuizChoice($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            'menuId' => $str_arr[2], 
            'header' => $str_arr[3], 
        );
        $result = $this->Model_std_subject_quiz->getQuizChoice($data['subject_id'], $data['semester'], $data['menuId'], $data['header']);
        echo json_encode($result);
    }

    public function randQuizChoice($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            'menuId' => $str_arr[2], 
            'header' => $str_arr[3], 
        );
        $result = $this->Model_std_subject_quiz->randChoice($data['subject_id'], $data['semester'], $data['menuId'], $data['header']);
        echo json_encode($result);
    }

    public function showScore($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            'user_id' => $this->session->ses_id,
        );
        $result = $this->Model_std_subject_quiz->getScore($data['subject_id'], $data['semester'], $data['user_id']);
        echo json_encode($result);
    }

//  data: '&semester=' + semester + '&subject=' + subject_id + '&menuId=' + getMenu[i].menuQuizId + '&headId=' + getChoice + '&pointId=' + getPoint,
    public function insertPoint()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $menuId = $this->input->post('menuId');
        $headId = $this->input->post('headId');
        $pointId = $this->input->post('pointId');
        $userId = $this->session->ses_id; 
        $result = $this->Model_std_subject_quiz->insertPoint($semester, $subject, $menuId, $headId, $pointId, $userId);
        // echo json_encode($result);
    }
}
