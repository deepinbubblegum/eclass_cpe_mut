<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_std_subject_quiz extends CI_Model
{
    public function getMenuQuiz($subjectId, $semesterId)
    {
        $this->db->select('*');
        $this->db->from('menuQuiz');
        $this->db->where('menuQuizSubject', $subjectId);
        $this->db->where('menuQuizSemester', $semesterId);
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getQuizField($subjectId, $semesterId, $menuId)
    {
        $this->db->select('*');
        $this->db->from('headerQuiz');
        $this->db->where('headerQuizSemester', $semesterId);
        $this->db->where('headerQuizSubject', $subjectId);
        $this->db->where('headerQuizMenuQuizId', $menuId);
        //$this->db->order_by('cast(setpoint_index as int)', 'ASC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getQuizChoice($subjectId, $semesterId, $menuId, $header)
    {
        $this->db->select('*');
        $this->db->from('choiceQuiz');
        $this->db->where('choiceQuizSemester', $semesterId);
        $this->db->where('choiceQuizSubject', $subjectId);
        $this->db->where('choiceQuizMenuQuizId', $menuId);
        $this->db->where('choiceQuizHeadId', $header);
        //$this->db->order_by('cast(setpoint_index as int)', 'ASC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function randChoice($subjectId, $semesterId, $menuId, $header)
    {
        $this->db->select('*');
        $this->db->from('choiceQuiz');
        $this->db->where('choiceQuizSemester', $semesterId);
        $this->db->where('choiceQuizSubject', $subjectId);
        $this->db->where('choiceQuizMenuQuizId', $menuId);
        $this->db->where('choiceQuizHeadId', $header);
        $this->db->order_by('title', 'RANDOM');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
    /*
SELECT choiceQuizPoint 
FROM pointQuiz , choiceQuiz 
where pointQuizSemester = choiceQuizSemester
and pointQuizSubject = choiceQuizSubject 
and pointQuizMenuQuizId = choiceQuizMenuQuizId 
and pointQuizHeaderQuizId = choiceQuizHeadId 
and pointQuizChoiceQuizId = choiceQuizId  
*/
    public function getScore($subjectId, $semesterId, $userId)
    {
        //$this->db->select('choiceQuizMenuQuizId, choiceQuizHeadId, choiceQuizId, choiceQuizPoint');
        $this->db->select('*');
        $this->db->from('pointQuiz, choiceQuiz');
        //$this->db->from('pointQuiz');


        $this->db->where('pointQuizSubject = choiceQuizSubject');
        $this->db->where('pointQuizSemester = choiceQuizSemester');
        $this->db->where('pointQuizMenuQuizId = choiceQuizMenuQuizId');
        $this->db->where('pointQuizHeaderQuizId = choiceQuizHeadId');
        $this->db->where('pointQuizChoiceQuizId = choiceQuizId');

        $this->db->where('pointQuizSubject ', $subjectId);
        $this->db->where('pointQuizSemester', $semesterId);
        $this->db->where('pointQuizUserId ', $userId);

        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
    
    public function checkMenu($subjectId, $semesterId ,$userId)
    {
        $this->db->select('pointQuizMenuQuizId');
        $this->db->distinct();
        $this->db->from('pointQuiz');
        $this->db->where('pointQuizSemester', $semesterId);
        $this->db->where('pointQuizSubject', $subjectId);
        $this->db->where('pointQuizUserId', $userId);
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function insertPoint($semester, $subject, $menuId, $headId, $pointId, $userId)
    {
        $xheadId = explode(",", $headId);
        $xpointId = explode(",", $pointId);
        for ($x = 0; $x <= count($xheadId) - 1; $x++) {
            $data = array(
                'pointQuizSemester' => $semester,
                'pointQuizSubject' => $subject,
                'pointQuizMenuQuizId' => $menuId,
                'pointQuizHeaderQuizId' => $xheadId[$x],
                'pointQuizChoiceQuizId' => $xpointId[$x],
                'pointQuizUserId' => $userId,
            );
            $this->db->insert('pointQuiz', $data);
        }

        // for ($x = 0; $x <= count($xheadId)-1; $x++) {
        //     $this->db->select('choiceQuizPoint as point');
        //     $this->db->from('choiceQuiz');
        //     $this->db->where('choiceQuizSemester', $semester);
        //     $this->db->where('choiceQuizSubject', $subject);
        //     $this->db->where('choiceQuizMenuQuizId', $menuId);
        //     $this->db->where('choiceQuizHeadId', $xheadId[$x]);
        //     $this->db->where('choiceQuizId', $xpointId[$x]);

        //     $query = $this->db->get();

        //     if ($query->num_rows() > 0) {

        //         $data = array(
        //             'pointQuizSemester' => $semester,
        //             'pointQuizSubject' => $subject,
        //             'pointQuizMenuQuizId' => $menuId,
        //             'pointQuizHeaderQuizId' => $xheadId[$x],
        //             'pointQuizChoiceQuizId' => $query->row()->point,
        //             'pointQuizUserId' => $userId,
        //         );
        //         $this->db->insert('pointQuiz', $data);
        //     } else {
        //         return 0;
        //     } 
        // }


    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //insertQuiz($cquizsemester,$cquizsubject,$menuId,$headId,$choiceQuizText,$choiceQuizPoint)
    public function insertQuiz($semester, $subject, $menuID, $headID, $choiceQuizText, $choiceQuizPoint)
    {
        $maxid = $this->db->query("
            select IFNULL(max(choiceQuizId),0)+1 as newid
            from choiceQuiz
            where choiceQuizSemester = '" . $semester . "' and choiceQuizSubject ='" . $subject . "' and choiceQuizMenuQuizId ='" . $menuID . "' and choiceQuizHeadId ='" . $headID . "';
        ");

        $newid = $maxid->row()->newid;

        $data = array(
            'choiceQuizSemester' => $semester,
            'choiceQuizSubject' => $subject,
            'choiceQuizMenuQuizId' => $menuID,
            'choiceQuizHeadId' => $headID,
            'choiceQuizId' => $newid,
            'choiceQuizText' => $choiceQuizText,
            'choiceQuizPoint' => $choiceQuizPoint
        );

        $this->db->insert('choiceQuiz', $data);
    }

    public function editQuiz($semester, $subject, $menuID, $headID, $choiceQuizText, $choiceQuizPoint, $editId)
    {
        $this->db->set('choiceQuizText', $choiceQuizText);
        $this->db->set('choiceQuizPoint', $choiceQuizPoint);
        $this->db->where('choiceQuizSemester', $semester);
        $this->db->where('choiceQuizSubject', $subject);
        $this->db->where('choiceQuizMenuQuizId', $menuID);
        $this->db->where('choiceQuizHeadId', $headID);
        $this->db->where('choiceQuizId', $editId);
        $this->db->update('choiceQuiz');
    }

    public function insertField($semester, $subject, $quizId, $quizName)
    { //$data['semester'],$data['subject_id'],$data['pointId'],$data['ticket'],$data['fullName'],$data['miniName'],$data['maxPoint']

        $maxid = $this->db->query("
            select IFNULL(max(headerQuizId),0)+1 as newid
            from headerQuiz
            where headerQuizSemester = '" . $semester . "' and headerQuizSubject ='" . $subject . "' and headerQuizMenuQuizId ='" . $quizId . "';
        ");

        $newid = $maxid->row()->newid;

        $data = array(
            'headerQuizSemester' => $semester,
            'headerQuizSubject' => $subject,
            'headerQuizMenuQuizId' => $quizId,
            'headerQuizId' => $newid,
            'headerQuizName' => $quizName
        );

        $this->db->insert('headerQuiz', $data);
    }

    public function updateField($semester, $subject, $quizId, $headId, $headerQuizName)
    {
        $data = [
            'headerQuizName' => $headerQuizName,
        ];

        $this->db->where('headerQuizSemester', $semester);
        $this->db->where('headerQuizSubject', $subject);
        $this->db->where('headerQuizMenuQuizId', $quizId);
        $this->db->where('headerQuizId', $headId);

        $this->db->update('headerQuiz', $data);

        // if ($pointMulti == 0) {
        //     $this->db->query('DELETE FROM menuQuiz_student WHERE point_std_semester = "'.$semester.'" AND point_std_subject = "'.$subject_id.'" 
        //     AND point_std_id = "'.$pointId.'" AND point_std_setmenuQuizId = "'.$pointIdChild.'" AND point_std_index LIKE "no_%" AND point_std_index != "no_001"');
        // }
    }

    public function insertMenu($semester, $subject, $Header, $Description, $Status)
    {
        $maxid = $this->db->query("
            select IFNULL(max(menuQuizId),0)+1 as newid
            from menuQuiz
            where menuQuizSemester = '" . $semester . "' and menuQuizSubject ='" . $subject . "';
        ");

        $newid = $maxid->row()->newid;

        $data = array(
            'menuQuizSemester' => $semester,
            'menuQuizSubject' => $subject,
            'menuQuizId' => $newid,
            'menuQuizName' => $Header,
            'menuQuizDescription' => $Description,
            'menuQuizStatus' => $Status
        );

        $this->db->insert('menuQuiz', $data);

        //$this->db->query('insert into menuQuiz values("' . $semester . '","' . $subject . '","' . $newid . '","' . $Header . '","' . $Description . '" , "'.$StdView.'");');
    }

    public function editMenu($semester, $subject, $Header, $Description, $editID, $menuStatus)
    {
        $this->db->set('menuQuizName', $Header);
        $this->db->set('menuQuizDescription', $Description);
        $this->db->set('menuQuizStatus', $menuStatus);
        $this->db->where('menuQuizSemester', $semester);
        $this->db->where('menuQuizSubject', $subject);
        $this->db->where('menuQuizId', $editID);
        $this->db->update('menuQuiz');
    }
    // select * from menuQuiz_student where point_std_semester='25611' and point_std_subject='CPEN1010' and  point_std_setmenuQuizId='1';
    public function getPoint($semester, $subject, $setId, $id)
    {
        $this->db->select('*');
        $this->db->from('menuQuiz_student');
        $this->db->where('point_std_semester', $semester);
        $this->db->where('point_std_subject', $subject);
        $this->db->where('point_std_setmenuQuizId', $setId);
        $this->db->where('point_std_id', $id);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function deleteKid($semester, $subject_id, $setIdChild, $setIdParent, $setIdKid)
    {
        $this->db->where_in('choiceQuizSemester', $semester);
        $this->db->where_in('choiceQuizSubject', $subject_id);
        $this->db->where_in('choiceQuizMenuQuizId', $setIdParent);
        $this->db->where_in('choiceQuizHeadId', $setIdChild);
        $this->db->where_in('choiceQuizId', $setIdKid);
        $this->db->delete('choiceQuiz');
    }

    public function deleteField($semester, $subject_id, $setIdChild, $setIdParent)
    {
        $this->db->where_in('headerQuizSemester', $semester);
        $this->db->where_in('headerQuizSubject', $subject_id);
        $this->db->where_in('headerQuizMenuQuizId', $setIdParent);
        $this->db->where_in('headerQuizId', $setIdChild);
        $this->db->delete('headerQuiz');
    }

    public function deleteMenu($semester, $subject_id, $setIdParent)
    {
        $this->db->where_in('menuQuizSemester', $semester);
        $this->db->where_in('menuQuizSubject', $subject_id);
        $this->db->where_in('menuQuizId', $setIdParent);
        $this->db->delete('menuQuiz');
    }
}
