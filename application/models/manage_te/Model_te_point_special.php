<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_point_special extends CI_Model
{

    public function getMenu($semester, $subject)
    {
        $query = $this->db->query('
        SELECT menuPS_semester, menuPS_subject, menuPS_pointID, menuPS_setpointID, menuPS_id, menuPS_header, menuPS_num_subject, menuPS_date, setpoint_fullname 
        FROM menuPointSpecial 
        LEFT JOIN subject_setpoint ON menuPS_pointID = setpoint_id AND menuPS_setpointID = setpoint_setpoint_id AND 
        menuPS_semester = setpoint_semester AND menuPS_subject = setpoint_subject
        WHERE menuPS_semester = "' . $semester . '" AND menuPS_subject = "' . $subject . '" ');
        return $query->result();
    }

    public function getSubSem($semester)
    {
        $query = $this->db->query('SELECT * FROM subject_semester WHERE subsem_semester = "' . $semester . '" ');
        return $query->result();
    }

    public function getFaculty()
    {
        $query = $this->db->query('SELECT * FROM faculty WHERE faculty_id != "MUT" ');
        return $query->result();
    }

    public function getMajor($faculty)
    {
        $query = $this->db->query('SELECT * FROM major WHERE major_faculty = "' . $faculty . '" ');
        return $query->result();
    }

    public function getSubject($major)
    {
        $query = $this->db->query('SELECT * FROM subject WHERE subject_major = "' . $major . '" ');
        return $query->result();
    }

    public function getSetpoint($semester, $subject)
    {
        $query = $this->db->query('SELECT * FROM subject_setpoint WHERE setpoint_semester = "' . $semester . '" AND setpoint_subject = "' . $subject . '" AND setpoint_option = "2" ');
        return $query->result();
    }

    public function getSubjectAdd($semester, $subject, $menuId)
    {
        $query = $this->db->query('SELECT * FROM ps_subject 
        LEFT JOIN subject ON subject_id = PS_sub_subadd
        WHERE PS_sub_semester = "' . $semester . '" AND PS_sub_subject= "' . $subject . '" AND PS_sub_menuid = "' . $menuId . '" ');
        return $query->result();
    }

    public function ADDmenuSpecialPoint($semester, $subject, $pointID, $SetpointID, $header, $num, $date)
    {
        $maxid = $this->db->query('SELECT IFNULL(lpad(lpad(max(SUBSTR(menuPS_id,3,3))+1,3,"0"),5,"PS"),"PS001") AS newid
        FROM menuPointSpecial WHERE menuPS_semester = "' . $semester . '" AND menuPS_subject = "' . $subject . '" ');
        $newid = $maxid->row()->newid;

        $this->db->query('INSERT INTO menuPointSpecial VALUES("' . $semester . '", "' . $subject . '", "' . $pointID . '", "' . $SetpointID . '" , "' . $newid . '", "' . $header . '", "' . $num . '" , "' . $date . '" )');
        return $newid;
    }

    public function EditmenuSpecialPoint($semester, $subject, $pointID, $SetpointID, $header, $num, $date, $menuID)
    {
        $this->db->query('UPDATE menuPointSpecial
        SET menuPS_pointID = "' . $pointID . '", menuPS_setpointID = "' . $SetpointID . '", menuPS_header = "' . $header . '", menuPS_num_subject = "' . $num . '", menuPS_date = "' . $date . '" 
        WHERE menuPS_semester = "' . $semester . '" AND menuPS_subject = "' . $subject . '" AND menuPS_id = "' . $menuID . '" ');
    }

    public function DELmenuSpecialPoint($semester, $subject, $memuId)
    {
        $this->db->query('DELETE FROM menuPointSpecial WHERE menuPS_semester = "' . $semester . '" AND menuPS_subject = "' . $subject . '" AND menuPS_id = "' . $memuId . '" ');
    }

    public function AddSubjectSpecialPoint($semester, $subject, $subjectAdd, $PSid)
    {
        $this->db->query('DELETE FROM ps_subject WHERE PS_sub_semester = "' . $semester . '" AND PS_sub_subject= "' . $subject . '" AND PS_sub_menuid = "' . $PSid . '" ');

        $count = count($subjectAdd);
        for ($i = 0; $i < $count; $i++) {
            $this->db->query('INSERT INTO ps_subject VALUES("' . $semester . '", "' . $subject . '", "' . $PSid . '", "' . $subjectAdd[$i] . '") ');
        }
    }

    public function getMenuStdRequest($semester, $subject)
    {
        $query = $this->db->query('SELECT * FROM menuPointSpecial WHERE menuPS_semester = "' . $semester . '" AND menuPS_subject = "' . $subject . '" ');
        return $query->result();
    }

    public function getStdRequest($semester, $subject, $menuID)
    {
        $query = $this->db->query('SELECT DISTINCT ps_std_semester, ps_std_subject, ps_std_psID, ps_std_subAdd, ps_std_stdID, std_Tname, std_Ename, ps_std_point, ps_std_status, subject_name, ps_tea_confirm FROM ps_student 
        LEFT JOIN subject ON subject_id = ps_std_subAdd
        LEFT JOIN student on ps_std_stdID = std_code_id
        LEFT JOIN ps_teacher ON ps_std_semester = ps_tea_semester AND ps_std_subject = ps_tea_subject AND ps_std_psID = ps_tea_menu AND ps_std_subAdd = ps_tea_subAdd AND ps_std_stdID = ps_tea_std
        WHERE ps_std_semester = "' . $semester . '" AND ps_std_subject = "' . $subject . '" AND ps_std_psID = "' . $menuID . '" order by ps_std_stdID  ');
        return $query->result();
    }


    public function delPointStdRequest($semester, $subject, $memuId, $std, $subAdd)
    {
        $this->db->query('DELETE FROM ps_student WHERE ps_std_semester = "' . $semester . '" AND ps_std_subject = "' . $subject . '" AND ps_std_psID = "' . $memuId . '" AND ps_std_subAdd = "' . $subAdd . '" AND ps_std_stdID = "' . $std . '" ');
    }

    public function getSubjectOption($semester, $subject, $menuID)
    {
        $query = $this->db->query('SELECT ps_std_subAdd , subject_name , subject_id FROM ps_student 
        LEFT JOIN subject ON subject_id = ps_std_subAdd
        WHERE ps_std_semester = "' . $semester . '" AND ps_std_subject = "' . $subject . '" AND ps_std_psID = "' . $menuID . '"
        GROUP BY ps_std_subAdd ');
        return $query->result();
    }

    public function getMenuStdRequestSelect($semester, $subject, $menuID, $option)
    {
        if ($option == 'all') {
            $query = $this->db->query('SELECT DISTINCT ps_std_semester, ps_std_subject, ps_std_psID, ps_std_subAdd, ps_std_stdID, std_Tname, std_Ename, ps_std_point, ps_std_status, subject_name, ps_tea_confirm FROM ps_student 
            LEFT JOIN subject ON subject_id = ps_std_subAdd
            LEFT JOIN student on ps_std_stdID = std_code_id
            LEFT JOIN ps_teacher ON ps_std_semester = ps_tea_semester AND ps_std_subject = ps_tea_subject AND ps_std_psID = ps_tea_menu AND ps_std_subAdd = ps_tea_subAdd AND ps_std_stdID = ps_tea_std
            WHERE ps_std_semester = "' . $semester . '" AND ps_std_subject = "' . $subject . '" AND ps_std_psID = "' . $menuID . '" order by ps_std_stdID ');
            return $query->result();
        } else {
            $query = $this->db->query('SELECT DISTINCT ps_std_semester, ps_std_subject, ps_std_psID, ps_std_subAdd, ps_std_stdID, std_Tname, std_Ename, ps_std_point, ps_std_status, subject_name, ps_tea_confirm FROM ps_student 
            LEFT JOIN subject ON subject_id = ps_std_subAdd
            LEFT JOIN student on ps_std_stdID = std_code_id
            LEFT JOIN ps_teacher ON ps_std_semester = ps_tea_semester AND ps_std_subject = ps_tea_subject AND ps_std_psID = ps_tea_menu AND ps_std_subAdd = ps_tea_subAdd AND ps_std_stdID = ps_tea_std
            WHERE ps_std_semester = "' . $semester . '" AND ps_std_subject = "' . $subject . '" AND ps_std_psID = "' . $menuID . '" AND ps_std_subAdd = "' . $option . '" order by ps_std_stdID ');
            return $query->result();
        }
    }

    public function ConfirmStdRequest($semester, $subject, $memuId, $std, $subAdd, $point_std)
    {
        $checkSubject = $this->db->query('SELECT * FROM subject_semester WHERE subsem_semester = "' . $semester . '" AND subsem_subject = "' . $subAdd . '" ');
        if ($checkSubject->num_rows() > 0) {
            $this->db->query('INSERT INTO ps_teacher VALUES("' . $semester . '", "' . $subject . '", "' . $subAdd . '", "' . $memuId . '" ,  "' . $std . '" , "' . $point_std . '", "0" , "0" )');
        } else {
            $this->db->query('INSERT INTO ps_teacher VALUES("' . $semester . '", "' . $subject . '", "' . $subAdd . '", "' . $memuId . '" ,  "' . $std . '" , "' . $point_std . '", "1" , "1" )');
        }

        $this->db->query('UPDATE ps_student SET ps_std_status = "1" 
        WHERE ps_std_semester = "' . $semester . '" AND ps_std_subject = "' . $subject . '" AND ps_std_psID = "' . $memuId . '" AND ps_std_subAdd = "' . $subAdd . '" AND ps_std_stdID = "' . $std . '"  ');
    }

    public function ConfirmStdRequestAll($semester, $subject, $memuId, $StdAll, $subAddAll, $PointAll, $idMenu)
    {
        $count = count($StdAll);
        for ($i = 0; $i < $count; $i++) {

            $checkSubject = $this->db->query('SELECT * FROM subject_semester WHERE subsem_semester = "' . $semester . '" AND subsem_subject = "' . $subAddAll[$i] . '" ');
            if ($checkSubject->num_rows() > 0) {
                $this->db->query('INSERT IGNORE INTO ps_teacher VALUES("' . $semester . '", "' . $subject . '", "' . $subAddAll[$i] . '" , "' . $idMenu . '" , "' . $StdAll[$i] . '" , "' . $PointAll[$i] . '" , "0" , "0" )');
            }else{
                $this->db->query('INSERT IGNORE INTO ps_teacher VALUES("' . $semester . '", "' . $subject . '", "' . $subAddAll[$i] . '" , "' . $idMenu . '" , "' . $StdAll[$i] . '" , "' . $PointAll[$i] . '" , "1" , "1" )');
            }

            $this->db->query('UPDATE ps_student SET ps_std_status = "1" 
            WHERE ps_std_semester = "' . $semester . '" AND ps_std_subject = "' . $subject . '" AND ps_std_psID = "' . $idMenu . '" AND ps_std_subAdd = "' . $subAddAll[$i] . '" 
            AND ps_std_stdID = "' . $StdAll[$i] . '"  ');
        }
    }

    public function getTeacherOwner($semester)
    {
        $query = $this->db->query('SELECT subsem_semester , subsem_subject , teacher_code_id , teacher_Ename , teacher_Tname , de_Ename , de_Tname , subject_id , subject_name FROM subject_semester
        LEFT JOIN teacher ON subsem_teacher = teacher_code_id
        LEFT JOIN degree ON teacher_degree = de_id
        LEFT JOIN subject ON subsem_subject = subject_id
        WHERE subsem_semester = "' . $semester . '" ');
        return $query->result();
    }

    public function getTeacher($semester, $subject)
    {
        $query = $this->db->query('SELECT teacher_Ename, teacher_Tname , de_Ename , de_Tname FROM subject_semester
        LEFT JOIN teacher ON subsem_teacher = teacher_code_id
        LEFT JOIN degree ON teacher_degree = de_id
        WHERE subsem_semester = "' . $semester . '" AND subsem_subject = "' . $subject . '" ');
        return $query->result();
    }

    public function getNumberDoc($semester)
    {
        $maxdoc = $this->db->query("SELECT IFNULL(lpad(lpad(max(CAST(substr(doc_no,3,2)AS int))+1,2,'0'),4,'80'),'8001') as newNO FROM no_doc WHERE doc_semester = '" . $semester . "'  ");
        $newdoc = $maxdoc->row()->newNO;
        // return $query->result();
        $this->db->query('INSERT INTO no_doc VALUES("' . $semester . '" , "' . $newdoc . '")');
        return $newdoc;
    }
}
