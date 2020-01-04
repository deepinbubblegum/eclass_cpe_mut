<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Te_special_point extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_point_special');
    }


    public function ShowMenu()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $result = $this->Model_te_point_special->getMenu($semester,$subject);
        echo json_encode($result);
    }

    public function ShowSubjectSemester()
    {
        $semester = $this->input->post('semester');
        $result = $this->Model_te_point_special->getSubSem($semester);
        echo json_encode($result);
    }

    public function ShowFaculty()
    {
        $result = $this->Model_te_point_special->getFaculty();
        echo json_encode($result);
    }

    public function ShowMajor()
    {
        $faculty = $this->input->post('faculty');
        $result = $this->Model_te_point_special->getMajor($faculty);
        echo json_encode($result);
    }

    public function ShowSubject()
    {
        $major = $this->input->post('major');
        $result = $this->Model_te_point_special->getSubject($major);
        echo json_encode($result);
    }

    public function ShowSetpoint()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $result = $this->Model_te_point_special->getSetpoint($semester,$subject);
        echo json_encode($result);
    }

    public function AddMenuPointSpecial()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $pointID = $this->input->post('pointID');
        $SetpointID = $this->input->post('SetpointID');
        $header = $this->input->post('header');
        $num = $this->input->post('num');
        $date = $this->input->post('date');
        $result = $this->Model_te_point_special->ADDmenuSpecialPoint($semester, $subject, $pointID, $SetpointID, $header, $num, $date);
        echo json_encode($result);
    }

    public function EditMenuPointSpecial()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $pointID = $this->input->post('pointID');
        $SetpointID = $this->input->post('SetpointID');
        $header = $this->input->post('header');
        $num = $this->input->post('num');
        $date = $this->input->post('date');
        $menuID = $this->input->post('menuID');
        $result = $this->Model_te_point_special->EditmenuSpecialPoint($semester, $subject, $pointID, $SetpointID, $header, $num, $date, $menuID);
        echo json_encode($result);
    }

    public function DeleteMenu()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $memuId = $this->input->post('memuId');
        $this->Model_te_point_special->DELmenuSpecialPoint($semester, $subject, $memuId);
    }

    public function AddSub()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject_id');
        $subjectAdd = $this->input->post('subjectAdd');
        $PSid = $this->input->post('PSid');
        $this->Model_te_point_special->AddSubjectSpecialPoint($semester, $subject, $subjectAdd, $PSid);
        // print_r($subjectAdd);
    }

    public function ShowSubjectAdd()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject_id');
        $menuId = $this->input->post('menuId');
        $result = $this->Model_te_point_special->getSubjectAdd($semester, $subject, $menuId);
        echo json_encode($result);
    }

    public function ShowMenuStdRequest()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $result = $this->Model_te_point_special->getMenuStdRequest($semester,$subject);
        echo json_encode($result);
    }

    public function ShowStdRequest()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $menuID = $this->input->post('menuID');
        $result = $this->Model_te_point_special->getStdRequest($semester,$subject,$menuID);
        echo json_encode($result);
    }

    public function DeletePointStd()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $memuId = $this->input->post('memuId');
        $std = $this->input->post('std');
        $subAdd = $this->input->post('subAdd');
        $this->Model_te_point_special->delPointStdRequest($semester, $subject, $memuId, $std, $subAdd);
    }


    public function ShowSubjectOption()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $menuID = $this->input->post('menuID');
        $result = $this->Model_te_point_special->getSubjectOption($semester,$subject,$menuID);
        echo json_encode($result);
    }

    public function ShowStdRequestSelect()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $menuID = $this->input->post('menuID');
        $option = $this->input->post('option');
        // echo $menuID.'++'.$option;
        $result = $this->Model_te_point_special->getMenuStdRequestSelect($semester,$subject,$menuID,$option);
        echo json_encode($result);
    }

    public function ConfirmStd()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject');
        $memuId = $this->input->post('memuId');
        $std = $this->input->post('std');
        $subAdd = $this->input->post('subAdd');
        $point_std = $this->input->post('point_std');
        $this->Model_te_point_special->ConfirmStdRequest($semester, $subject, $memuId, $std, $subAdd, $point_std);
    }

    public function ConfirmStdAll()
    {
        $semester = $this->input->post('semester');
        $subject = $this->input->post('subject_id');
        $memuId = $this->input->post('idMenu');
        $StdAll = $this->input->post('StdAll');
        $subAddAll = $this->input->post('subAddAll');
        $PointAll = $this->input->post('PointAll');
        $idMenu = $this->input->post('idMenu');
        $this->Model_te_point_special->ConfirmStdRequestAll($semester, $subject, $memuId, $StdAll, $subAddAll, $PointAll, $idMenu);
    }

}
