<?php
defined('BASEPATH') or exit('No direct script access allowed');



function code_keygen($length)
{
    $gencode = strtoupper(base_convert(sha1(uniqid(mt_rand())), 16, 36));
    $gencode = str_split($gencode, 4);

    $keygen = implode("-", $gencode);
    return $keygen;
}

class Model_te_subject_point extends CI_Model
{
    public function getMenuPoint($subjectId, $semesterId)
    {
        $this->db->select('*');
        $this->db->from('subject_point');
        $this->db->where('point_subject', $subjectId);
        $this->db->where('point_semester', $semesterId);
        $this->db->order_by('cast(point_Index as int)', 'ASC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getPointField($subjectId, $semesterId, $menuId)
    {
        $this->db->select('*');
        $this->db->from('subject_setpoint');
        $this->db->where('setpoint_subject', $subjectId);
        $this->db->where('setpoint_semester', $semesterId);
        $this->db->where('setpoint_id', $menuId);
        $this->db->order_by('cast(setpoint_index as int)', 'ASC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function insertPoint($semester, $subject, $id, $setpoint_id, $user_id, $point)
    {
        $qIndex = $this->db->query("
        select IFNULL(lpad(lpad(max(substr(point_std_index,4,3))+1,3,'0'),6,'no_'),'no_001') as newIndex
        from subject_point_student
        where point_std_user_id='" . $user_id . "' and point_std_semester = '" . $semester . "' and point_std_subject='" . $subject . "' and point_std_setpoint_id = '" . $setpoint_id . "' 
        and point_std_id = '" . $id . "' AND point_std_index LIKE 'no_%' ;
        ");
        $newIndex = $qIndex->row()->newIndex;

        $this->db->query("insert into subject_point_student values('" . $semester . "','" . $subject . "','" . $id . "','" . $setpoint_id . "','" . $user_id . "','" . $newIndex . "','" . $point . "')");
        return 'เพิ่มคะแนนแล้ว';

        // $chkMulyi = $this->db->query('SELECT setpoint_multi AS multi FROM `subject_setpoint` WHERE setpoint_semester = "' . $semester . '" AND setpoint_subject = "' . $subject . '" 
        // AND setpoint_id = "' . $id . '" AND setpoint_setpoint_id = "' . $setpoint_id . '" ');
        // $multi = $chkMulyi->row()->multi;

        // $qIndex = $this->db->query("
        // select IFNULL(lpad(lpad(max(substr(point_std_index,4,3))+1,3,'0'),6,'no_'),'no_001') as newIndex
        // from subject_point_student
        // where point_std_user_id='" . $user_id . "' and point_std_semester = '" . $semester . "' and point_std_subject='" . $subject . "' and point_std_setpoint_id = '" . $setpoint_id . "' 
        // and point_std_id = '" . $id . "' AND point_std_index LIKE 'no_%' ;
        // ");
        // $newIndex = $qIndex->row()->newIndex;

        // if ($multi == 0) {
        //     $stdchk = $this->db->query('SELECT point_std_user_id AS std FROM subject_point_student WHERE point_std_semester = "' . $semester . '" AND point_std_subject = "' . $subject . '" 
        //     AND point_std_id = "' . $id . '" AND point_std_setpoint_id = "' . $setpoint_id . '" AND point_std_user_id = "' . $user_id . '" AND point_std_index LIKE "no_%" ');
        //     // $std = $stdchk->row()->std;
        //     if ($stdchk->num_rows() > 0) {
        //         return 'รหัสนักศึกษาซ้ำ';
        //     } else {
        //         $this->db->query("insert into subject_point_student values('" . $semester . "','" . $subject . "','" . $id . "','" . $setpoint_id . "','" . $user_id . "','" . $newIndex . "','" . $point . "')");
        //         return 'เพิ่มคะแนนแล้ว';
        //     }
        // } else {
        //     $this->db->query("insert into subject_point_student values('" . $semester . "','" . $subject . "','" . $id . "','" . $setpoint_id . "','" . $user_id . "','" . $newIndex . "','" . $point . "')");
        //     return 'เพิ่มคะแนนแล้ว';
        // }
    }

    public function insertField($semester, $subject_id, $pointId, $ticket, $fullName, $miniName, $maxPoint, $option, $pointMulti)
    { //$data['semester'],$data['subject_id'],$data['pointId'],$data['ticket'],$data['fullName'],$data['miniName'],$data['maxPoint']

        $maxid = $this->db->query("
        select lpad(IFNULL(max(setpoint_setpoint_id),0)+1,4,0) as newid
        from subject_setpoint
        where setpoint_semester = '" . $semester . "' and setpoint_subject='" . $subject_id . "' and setpoint_id = '" . $pointId . "'; ");
        $newid = $maxid->row()->newid;

        $maxindex = $this->db->query("
        select IFNULL(max(CAST(setpoint_index AS int)),0)+1 as newindex
        from subject_setpoint
        where setpoint_semester = '" . $semester . "' and setpoint_subject='" . $subject_id . "' and setpoint_id = '" . $pointId . "'; ");
        $maxindex = $maxindex->row()->newindex;

        $this->db->query("insert into subject_setpoint values('" . $semester . "','" . $subject_id . "','" . $pointId . "','" . $newid . "','" . $maxindex . "','" . $ticket . "','" . $fullName . "','" . $miniName . "','" . $maxPoint . "','" . $option . "','" . $pointMulti . "');");
    }

    public function updateField($semester, $subject_id, $pointId, $pointIdChild, $ticket, $fullName, $miniName, $maxPoint, $setOption, $pointMulti)
    {
        $data = [
            'setpoint_ticket' => $ticket,
            'setpoint_fullname' => $fullName,
            'setpoint_mininame' => $miniName,
            'setpoint_maxpoint' => $maxPoint,
            'setpoint_option' => $setOption,
            'setpoint_multi' => $pointMulti,
        ];

        $this->db->where('setpoint_semester', $semester);
        $this->db->where('setpoint_subject', $subject_id);
        $this->db->where('setpoint_id', $pointId);
        $this->db->where('setpoint_setpoint_id', $pointIdChild);

        $this->db->update('subject_setpoint', $data);

        // if ($pointMulti == 0) {
        //     $this->db->query('DELETE FROM subject_point_student WHERE point_std_semester = "'.$semester.'" AND point_std_subject = "'.$subject_id.'" 
        //     AND point_std_id = "'.$pointId.'" AND point_std_setpoint_id = "'.$pointIdChild.'" AND point_std_index LIKE "no_%" AND point_std_index != "no_001"');
        // }
    }

    public function insertMenu($semester, $subject, $Header, $Description, $StdView)
    {
        $MaxIndex = $this->db->query('SELECT IFNULL(max(CAST(point_Index AS int))+1,"1") AS newIndex FROM subject_point where point_semester = "' . $semester . '" and point_subject="' . $subject . '" ');
        $newindex = $MaxIndex->row()->newIndex;

        $maxid = $this->db->query("
            select IFNULL(max(CAST(point_id AS int)),0)+1 as newid
            from subject_point
            where point_semester = '" . $semester . "' and point_subject='" . $subject . "';
        ");
        $newid = $maxid->row()->newid;
        // $this->db->query('insert into subject_point values("' . $semester . '","' . $subject . '","' . $newid . '","' . $Header . '","' . $Description . '" , "' . $StdView . '" , "' . $newindex . '");');
        $data = array(
            'point_semester' => $semester,
            'point_subject' => $subject,
            'point_id' => $newid,
            'point_name' => $Header,
            'point_discription' => $Description,
            'point_StdView' => $StdView,
            'point_Index' => $newindex,
        );
        $this->db->insert('subject_point', $data);
    }

    public function insertMenuSpecial($semester, $subject, $Header, $Description, $StdView)
    {
        $chkMenu = $this->db->query('SELECT * FROM `subject_point` WHERE point_semester = "' . $semester . '" AND point_subject = "' . $subject . '" ');
        if ($chkMenu->num_rows() > 0) {
            return 0;
        } else {
            $MaxIndex = $this->db->query('SELECT IFNULL(max(CAST(point_Index AS int))+1,"1") AS newIndex FROM subject_point where point_semester = "' . $semester . '" and point_subject="' . $subject . '" ');
            $newindex = $MaxIndex->row()->newIndex;

            $maxid = $this->db->query(" select IFNULL(max(CAST(point_id AS int)),0)+1 as newid
                from subject_point
                where point_semester = '" . $semester . "' and point_subject='" . $subject . "' ");
            $newid = $maxid->row()->newid;
            // $this->db->query('insert into subject_point values("' . $semester . '","' . $subject . '","' . $newid . '","' . $Header . '","' . $Description . '" , "' . $StdView . '" , "' . $newindex . '");');
            $data = array(
                'point_semester' => $semester,
                'point_subject' => $subject,
                'point_id' => $newid,
                'point_name' => $Header,
                'point_discription' => $Description,
                'point_StdView' => $StdView,
                'point_Index' => $newindex,
            );
            $this->db->insert('subject_point', $data);
            return 1;
        }
    }

    public function editMenu($semester, $subject, $Header, $Description, $editID, $StdView)
    {
        $this->db->set('point_name', $Header);
        $this->db->set('point_discription', $Description);
        $this->db->set('point_StdView', $StdView);
        $this->db->where('point_semester', $semester);
        $this->db->where('point_subject', $subject);
        $this->db->where('point_id', $editID);
        $this->db->update('subject_point');
    }
    // select * from subject_point_student where point_std_semester='25611' and point_std_subject='CPEN1010' and  point_std_setpoint_id='1';
    public function getPoint($semester, $subject, $setId, $id)
    {
        $this->db->select('*');
        $this->db->from('subject_point_student');
        $this->db->where('point_std_semester', $semester);
        $this->db->where('point_std_subject', $subject);
        $this->db->where('point_std_setpoint_id', $setId);
        $this->db->where('point_std_id', $id);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function deletePoint($semester, $subject_id, $setIdChild, $setIdParent, $pointIndex, $stdId)
    {
        // $this->db->where('point_std_semester', $semester);
        // $this->db->where('point_std_subject', $subject_id);
        // $this->db->where('point_std_id', $setIdChild);
        // $this->db->where('point_std_setpoint_id', $setIdParent);
        // $this->db->where('point_std_user_id', $stdId);
        // $this->db->where('point_std_index', $pointIndex);
        // $this->db->delete('subject_point_student');
        $this->db->query('DELETE FROM subject_point_student WHERE point_std_semester = "' . $semester . '" AND point_std_subject = "' . $subject_id . '" AND point_std_id = "' . $setIdChild . '" AND
        point_std_setpoint_id = "' . $setIdParent . '" AND point_std_user_id = "' . $stdId . '" AND point_std_index = "' . $pointIndex . '" ');
    }

    public function deleteField($semester, $subject_id, $setIdChild, $setIdParent)
    {
        $this->db->where_in('setpoint_semester', $semester);
        $this->db->where_in('setpoint_subject', $subject_id);
        $this->db->where_in('setpoint_id', $setIdChild);
        $this->db->where_in('setpoint_setpoint_id', $setIdParent);
        $this->db->delete('subject_setpoint');
    }

    public function deleteMenu($semester, $subject_id, $setIdParent)
    {
        $this->db->where_in('point_semester', $semester);
        $this->db->where_in('point_subject', $subject_id);
        $this->db->where_in('point_id', $setIdParent);
        $this->db->delete('subject_point');
    }

    public function printTicket($salt, $ticketNumber, $semester, $subject, $parentTK, $childTK, $userId)
    {
        code_keygen(16);
        //return $key;
    }

    public function Index($sortArray, $sortIDArray, $ArraySemester, $ArraySubject)
    {
        $num = count($sortArray);
        for ($i = 0; $i < $num; $i++) {
            $newIndex = $i + 1;
            $this->db->query('UPDATE subject_setpoint SET setpoint_index = "' . $newIndex . '" WHERE setpoint_semester = "' . $ArraySemester[$i] . '" 
            AND setpoint_subject = "' . $ArraySubject[$i] . '" AND setpoint_id = "' . $sortIDArray[$i] . '" AND setpoint_setpoint_id = "' . $sortArray[$i] . '"');
            // echo $sortArray[$i];
        }
    }

    public function IndexMenu($sortIDArray, $ArraySemester, $ArraySubject)
    {
        $num = count($sortIDArray);
        for ($i = 0; $i < $num; $i++) {
            $newIndex = $i + 1;
            $this->db->query('UPDATE subject_point SET point_Index = "' . $newIndex . '" WHERE point_semester = "' . $ArraySemester[$i] . '" 
            AND point_subject = "' . $ArraySubject[$i] . '" AND point_id = "' . $sortIDArray[$i] . '" ');
            // echo $sortArray[$i];
        }
    }

    public function checkMaxpointSTD_modal($point_std_semester,$point_std_subject,$point_std_id,$point_std_setpoint_id,$point_std_user_id)
    {
        $query = $this->db->query('SELECT * FROM subject_point_student  WHERE point_std_semester = "' . $point_std_semester . '" AND point_std_subject = "' . $point_std_subject . '" AND point_std_id = "' . $point_std_id . '" AND
        point_std_setpoint_id = "' . $point_std_setpoint_id . '" AND point_std_user_id = "' . $point_std_user_id . '" ');
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function GetAll_std_modal($semester,$subject)
    {
        $this->db->select('*');
        $this->db->from('subject_student');
        $this->db->where('substd_semester', $semester);
        $this->db->where('substd_subject', $subject);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function CheckMaxEditField_modal($semester, $subject, $point_id, $point_setpoint_id)
    {
        $this->db->select('*');
        $this->db->from('subject_point_student');
        $this->db->where('point_std_semester', $semester);
        $this->db->where('point_std_subject', $subject);
        $this->db->where('point_std_id', $point_id);
        $this->db->where('point_std_setpoint_id', $point_setpoint_id);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
}
