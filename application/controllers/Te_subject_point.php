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

class Te_subject_point extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_subject_point');
    }
    
    public function genTicket()
    {
        //$salt = $this->input->post('salt');
        $ticketNumber = $this->input->post('ticketNumber');

        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject_id');

        $parentTK = $this->input->post('parentTK');
        $childTK = $this->input->post('childTK');

        $userId = $this->session->ses_id;

        //$result = $this->Model_te_subject_point->printTicket($salt,$ticketNumber,$semester,$subject,$parentTK,$childTK,$userId); 

        $this->load->library('encryption');

        $key = $this->encryption->create_key(16); 
        $config['encryption_key'] = $key;

        $plain_text = $semester.$subject.$parentTK.$childTK.$userId.$salt;
        $ciphertext = $this->encryption->encrypt($plain_text);

        echo $ciphertext;

        $this->Model_te_subject_point->printTicket($salt,$ticketNumber,$semester,$subject,$parentTK,$childTK,$userId);
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

    public function delPoint()
    {//'&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&pointIndex=' + pointIndex + '&stdId=' + stdId,
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $setIdChild = $this->input->post('setIdChild');
        $setIdParent = $this->input->post('setIdParent');
        $pointIndex = $this->input->post('pointIndex');
        $stdId = $this->input->post('stdId'); 
        $result = $this->Model_te_subject_point->deletePoint($semester,$subject_id,$setIdChild,$setIdParent,$pointIndex,$stdId);
        echo json_encode($result);
    }

    public function delField()
    {//'&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&pointIndex=' + pointIndex + '&stdId=' + stdId,
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $setIdChild = $this->input->post('setIdChild');
        $setIdParent = $this->input->post('setIdParent');  
        $result = $this->Model_te_subject_point->deleteField($semester,$subject_id,$setIdChild,$setIdParent);
        echo json_encode($result);
    }

    public function delMenu()
    {//'&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&pointIndex=' + pointIndex + '&stdId=' + stdId,
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $setIdParent = $this->input->post('setIdParent');  
        $result = $this->Model_te_subject_point->deleteMenu($semester,$subject_id,$setIdParent);
        echo json_encode($result);
    }

    public function insertMenuScore()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $Header = $this->input->post('header');
        $Description = $this->input->post('description');
        $StdView = $this->input->post('StdView');
        //$User = $this->input->post('dataUser');
        $this->Model_te_subject_point->insertMenu($semester, $subject, $Header, $Description, $StdView);
    }

    public function insertMenuScoreSpecial()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $Header = $this->input->post('header');
        $Description = $this->input->post('description');
        $StdView = $this->input->post('StdView');
        //$User = $this->input->post('dataUser');
        $result = $this->Model_te_subject_point->insertMenuSpecial($semester, $subject, $Header, $Description, $StdView);
        echo json_encode($result);
    }

    public function editMenuScore()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $Header = $this->input->post('header');
        $Description = $this->input->post('description');
        $StdView = $this->input->post('StdView');
        $editID = $this->input->post('editID'); 
        $this->Model_te_subject_point->editMenu($semester, $subject, $Header, $Description, $editID, $StdView);
    }

    public function insertFieldScore(/*$sid*/)
    {
        //$str_arr = explode("-", $sid);
        // semester + '-' + subject_id + '-' + pointId + '-' + ticket + '-' + fullName + '-' + miniName + '-' + maxPoint;  
        // $data = array(
        //         'semester' => $str_arr[0],
        //         'subject_id' => $str_arr[1], 
        //         'pointId' => $str_arr[2], 
        //         'ticket' => $str_arr[3],
        //         'fullName' => $str_arr[4],
        //         'miniName' => $str_arr[5],
        //         'maxPoint' => $str_arr[6],
        // );
        $semester = $this->input->post('semester');
        $subject_id = $this->input->post('subject_id');
        $pointId = $this->input->post('pointId');
        $ticket = $this->input->post('ticket');
        $fullName = $this->input->post('fullName');
        $miniName = $this->input->post('miniName');
        $maxPoint = $this->input->post('maxPoint');
        $option = $this->input->post('setpoint_option');
        $pointMulti = $this->input->post('pointMulti');
        

        //$User = $this->input->post('dataUser');
        //$this->Model_te_subject_point->insertField($data['semester'], $data['subject_id'], $data['pointId'], $data['ticket'], $data['fullName'], $data['miniName'], $data['maxPoint']);
        $this->Model_te_subject_point->insertField($semester, $subject_id, $pointId, $ticket, $fullName, $miniName, $maxPoint,$option,$pointMulti);
    }

    public function updateFieldScore(/*$sid*/)
        { 
            $semester = $this->input->post('semester');
            $subject_id = $this->input->post('subject_id');
            $pointId = $this->input->post('pointId');
            $pointIdChild = $this->input->post('pointIdChild');
            $setoption = $this->input->post('setpoint_option');
            $ticket = $this->input->post('ticket');
            $fullName = $this->input->post('fullName');
            $miniName = $this->input->post('miniName');
            $maxPoint = $this->input->post('maxPoint'); 
            $pointMulti = $this->input->post('pointMulti');

            $this->Model_te_subject_point->updateField($semester, $subject_id, $pointId,$pointIdChild, $ticket, $fullName, $miniName, $maxPoint,$setoption,$pointMulti);
        }

    public function insertInFieldPoint()
    {//'&semester=' + semester + '&subject_id=' + subject_id + '&setIdChild=' + setIdChild + '&setIdParent=' + setIdParent + '&tPoint=' + tPoint + '&uID=' + uID,
        $point_std_semester = $this->input->post('semester');
        $point_std_subject = $this->input->post('subject_id');
        $point_std_id = $this->input->post('setIdChild');
        $point_std_setpoint_id = $this->input->post('setIdParent');
        $point_std_point = $this->input->post('tPoint'); 
        //$point_std_index = '0';
        $point_std_user_id = $this->input->post('uID');
        //$User = $this->input->post('dataUser');
        $result = $this->Model_te_subject_point->insertPoint($point_std_semester,$point_std_subject,$point_std_id,$point_std_setpoint_id,$point_std_user_id,$point_std_point);
        echo json_encode($result); 
    }

    public function SortIndex()
    {
        $sortArray = $this->input->post('sortArray[]');
        $sortIDArray = $this->input->post('sortIDArray[]');
        $ArraySemester = $this->input->post('ArraySemester[]');
        $ArraySubject = $this->input->post('ArraySubject[]');
        // print_r($sortArray);
        $this->Model_te_subject_point->Index($sortArray, $sortIDArray, $ArraySemester, $ArraySubject);
    }

    public function SortMenu()
    {
        $sortIDArray = $this->input->post('sortIDArray[]');
        $ArraySemester = $this->input->post('ArraySemester[]');
        $ArraySubject = $this->input->post('ArraySubject[]');
        // print_r($sortArray);
        $this->Model_te_subject_point->IndexMenu($sortIDArray, $ArraySemester, $ArraySubject);
    }
}
