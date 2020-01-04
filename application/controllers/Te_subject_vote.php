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

class Te_subject_vote extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
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
        $result = $this->Model_te_subject_vote->getMenuVote($data['subject_id'], $data['semester']);
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

    public function showVoteField($sid)
    {
        $str_arr = explode("-", $sid);
        $data = array(
            'subject_id' => $str_arr[0],
            'semester' => $str_arr[1],
            'menuId' => $str_arr[2],
        );
        $result = $this->Model_te_subject_vote->getVoteField($data['subject_id'], $data['semester'], $data['menuId']);
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

    public function insertMenuVote() ///////////////////////////////////////////////////////////////////////////////
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $Header = $this->input->post('header');
        $Description = $this->input->post('description');
        $menuStatus = $this->input->post('status');
        //$User = $this->input->post('dataUser');
        $this->Model_te_subject_vote->insertMenu($semester, $subject, $Header, $Description, $menuStatus);
    }

    public function insertFieldVote(/*$sid*/)
    {
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $menuId = $this->input->post('menuId');
        $voteName = $this->input->post('choiceTxt');

        $this->Model_te_subject_vote->insertField($semester, $subject_id, $menuId, $voteName);
    }

    public function updateFieldVote(/*$sid*/)
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject_id');
        $menuId = $this->input->post('menuId');
        $choiceId = $this->input->post('headId');
        $choiceTxt = $this->input->post('choiceTxt');

        $this->Model_te_subject_vote->updateField($semester, $subject, $menuId, $choiceId, $choiceTxt);
    }

    public function editMenuVote()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $Header = $this->input->post('header');
        $Description = $this->input->post('description');
        $menuStatus = $this->input->post('status');
        $editID = $this->input->post('editID');

        $this->Model_te_subject_vote->editMenu($semester, $subject, $Header, $Description, $editID, $menuStatus);
    }
    /////////////////////////////

    public function delChoice()
    { //'&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&voteIndex=' + voteIndex + '&stdId=' + stdId,
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $setIdChild = $this->input->post('setIdChild');
        $setIdParent = $this->input->post('setIdParent');
        $setIdKid = $this->input->post('setIdKid');
        $result = $this->Model_te_subject_vote->deleteKid($semester, $subject_id, $setIdChild, $setIdParent, $setIdKid);
        echo json_encode($result);
    }

    public function delField()
    { //'&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&voteIndex=' + voteIndex + '&stdId=' + stdId,
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $setIdChild = $this->input->post('setIdChild');
        $setIdParent = $this->input->post('setIdParent');
        $result = $this->Model_te_subject_vote->deleteField($semester, $subject_id, $setIdChild, $setIdParent);
        echo json_encode($result);
    }

    public function delMenu()
    { //'&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&voteIndex=' + voteIndex + '&stdId=' + stdId,
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $setIdParent = $this->input->post('setIdParent');
        $result = $this->Model_te_subject_vote->deleteMenu($semester, $subject_id, $setIdParent);
        echo json_encode($result);
    }
}
