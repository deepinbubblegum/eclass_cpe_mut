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

class Te_subject_quiz extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_subject_quiz');
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
        $result = $this->Model_te_subject_quiz->getMenuQuiz($data['subject_id'], $data['semester']);
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
        $result = $this->Model_te_subject_quiz->getQuizField($data['subject_id'], $data['semester'], $data['menuId']);
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
        $result = $this->Model_te_subject_quiz->getQuizChoice($data['subject_id'], $data['semester'], $data['menuId'], $data['header']);
        echo json_encode($result);
    }

    public function exportPoint()
    {
        // data: '&semester=' + semester + '&subject=' + subject_id + '&menuPoint=' + menuPointId + '&menuQuiz=' + exportMenuQuiz + '&exportText=' + exportText + '&exportMax=' + exportMax,
                        
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $menuPoint = $this->input->post('menuPoint');
        $menuQuiz = $this->input->post('menuQuiz');
        $menuName = $this->input->post('exportText');
        $maxPoint = $this->input->post('exportMax');
        $result = $this->Model_te_subject_quiz->exportPoint($semester, $subject, $menuPoint, $menuQuiz,$menuName,$maxPoint);
        echo json_encode($result);
    }

    public function showquiz()
    {
        $quiz_std_semester = $this->input->post('semester');
        $quiz_std_subject = $this->input->post('subject_id');
        $quiz_std_id = $this->input->post('setIdParent');
        $quiz_std_setquiz_id = $this->input->post('setIdChild');
        $result = $this->Model_te_subject_quiz->getquiz($quiz_std_semester, $quiz_std_subject, $quiz_std_setquiz_id, $quiz_std_id);
        echo json_encode($result);
    }

    public function delquiz()
    {//'&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&quizIndex=' + quizIndex + '&stdId=' + stdId,
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $setIdChild = $this->input->post('setIdChild');
        $setIdParent = $this->input->post('setIdParent');
        $quizIndex = $this->input->post('quizIndex');
        $stdId = $this->input->post('stdId'); 
        $result = $this->Model_te_subject_quiz->deletequiz($semester,$subject_id,$setIdChild,$setIdParent,$quizIndex,$stdId);
        return json_encode($result);
    }

    public function delChoice()
    {//'&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&quizIndex=' + quizIndex + '&stdId=' + stdId,
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $setIdChild = $this->input->post('setIdChild');
        $setIdParent = $this->input->post('setIdParent');
        $setIdKid = $this->input->post('setIdKid');  
        $result = $this->Model_te_subject_quiz->deleteKid($semester,$subject_id,$setIdChild,$setIdParent,$setIdKid);
        echo json_encode($result);
    }

    public function delField()
    {//'&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&quizIndex=' + quizIndex + '&stdId=' + stdId,
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $setIdChild = $this->input->post('setIdChild');
        $setIdParent = $this->input->post('setIdParent');  
        $result = $this->Model_te_subject_quiz->deleteField($semester,$subject_id,$setIdChild,$setIdParent);
        echo json_encode($result);
    }

    public function delMenu()
    {//'&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&quizIndex=' + quizIndex + '&stdId=' + stdId,
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $setIdParent = $this->input->post('setIdParent');  
        $result = $this->Model_te_subject_quiz->deleteMenu($semester,$subject_id,$setIdParent);
        echo json_encode($result);
    }

    public function insertMenuQuiz()///////////////////////////////////////////////////////////////////////////////
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $Header = $this->input->post('header');
        $Description = $this->input->post('description',false);
        $menuStatus = $this->input->post('status');
        //$User = $this->input->post('dataUser');
        $this->Model_te_subject_quiz->insertMenu($semester, $subject, $Header, $Description, $menuStatus);
    }

    public function editMenuQuiz()///////////////////////////////////////////////////////////////////////////////
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $Header = $this->input->post('header');
        $Description = $this->input->post('description',false);
        $menuStatus = $this->input->post('status');
        $editID = $this->input->post('editID'); 
        $this->Model_te_subject_quiz->editMenu($semester, $subject, $Header, $Description, $editID, $menuStatus);
    }

    public function insertFieldQuiz(/*$sid*/)
    {
        //$str_arr = explode("-", $sid);
        // semester + '-' + subject_id + '-' + quizId + '-' + ticket + '-' + fullName + '-' + miniName + '-' + maxquiz;  
        // $data = array(
        //         'semester' => $str_arr[0],
        //         'subject_id' => $str_arr[1], 
        //         'quizId' => $str_arr[2], 
        //         'ticket' => $str_arr[3],
        //         'fullName' => $str_arr[4],
        //         'miniName' => $str_arr[5],
        //         'maxquiz' => $str_arr[6],
        // );
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $quizId = $this->input->post('quizId');
        $quizName = $this->input->post('headerQuizName');
        

        //$User = $this->input->post('dataUser');
        //$this->Model_te_subject_quiz->insertField($data['semester'], $data['subject_id'], $data['quizId'], $data['ticket'], $data['fullName'], $data['miniName'], $data['maxquiz']);
        $this->Model_te_subject_quiz->insertField($semester, $subject_id, $quizId, $quizName);
    }

    public function updateFieldQuiz(/*$sid*/)
    { 
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject_id');
        $quizId = $this->input->post('quizId'); 
        $headId = $this->input->post('headId');
        $headerQuizName = $this->input->post('headerQuizName'); 

        $this->Model_te_subject_quiz->updateField($semester, $subject, $quizId, $headId, $headerQuizName);
    }
// data: '&semester=' + semester + '&subject_id=' + subject_id + '&menuId=' + getMId + '&headId=' + getHId + '&choiceQuizText=' + qText + '&choiceQuizPoint=' + qPoint,
    public function insertInFieldChoiceQuiz()
    {
        $cquizsemester = $this->input->post('semester');
        $cquizsubject = $this->input->post('subject_id');
        $menuId = $this->input->post('menuId');
        $headId = $this->input->post('headId');
        $choiceQuizText = $this->input->post('choiceQuizText');  
        $choiceQuizPoint = $this->input->post('choiceQuizPoint');
        //$User = $this->input->post('dataUser');
        $result = $this->Model_te_subject_quiz->insertQuiz($cquizsemester,$cquizsubject,$menuId,$headId,$choiceQuizText,$choiceQuizPoint);
        echo json_encode($result); 
    }

    public function editChoiceQuiz()
    {
        $cquizsemester = $this->input->post('semester');
        $cquizsubject = $this->input->post('subject_id');
        $menuId = $this->input->post('menuId');
        $headId = $this->input->post('headId');
        $editId = $this->input->post('editId');
        $choiceQuizText = $this->input->post('choiceQuizText');  
        $choiceQuizPoint = $this->input->post('choiceQuizPoint');
        //$User = $this->input->post('dataUser');
        $result = $this->Model_te_subject_quiz->editQuiz($cquizsemester,$cquizsubject,$menuId,$headId,$choiceQuizText,$choiceQuizPoint,$editId);
        echo json_encode($result); 
    }

    public function SortIndex()
    {
        $sortArray = $this->input->post('sortArray[]');
        $sortIDArray = $this->input->post('sortIDArray[]');
        $ArraySemester = $this->input->post('ArraySemester[]');
        $ArraySubject = $this->input->post('ArraySubject[]');
        // print_r($sortArray);
        $this->Model_te_subject_quiz->Index($sortArray, $sortIDArray, $ArraySemester, $ArraySubject);
    }
}
