<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_subject_vote extends CI_Model
{
    public function insertMenu($semester, $subject, $Header, $Description, $Status)
    {
        $maxid = $this->db->query("
            select IFNULL(max(cast(menuVoteId as int)),0)+1 as newid
            from menuVote
            where menuVoteSemester = '" . $semester . "' and menuVoteSubject ='" . $subject . "';
        ");

        $newid = $maxid->row()->newid;

        $maxindexMenu = $this->db->query("
		select IFNULL(max(menuVoteIndex),0)+1 as newIndex
        from menuVote
        where menuVoteSemester = '".$semester."' and menuVoteSubject = '".$subject."' ");

        $indexMenu = $maxindexMenu->row()->newIndex;

        $data = array(
            'menuVoteSemester' => $semester,
            'menuVoteSubject' => $subject,
            'menuVoteId' => $newid,
            'menuVoteName' => $Header,
            'menuVoteDescription' => $Description,
            'menuVoteStatus' => $Status,
            'menuVoteIndex' => $indexMenu
        );

        $this->db->insert('menuVote', $data);

        //$this->db->query('insert into menuVote values("' . $semester . '","' . $subject . '","' . $newid . '","' . $Header . '","' . $Description . '" , "'.$StdView.'");');
    }

    public function insertField($semester, $subject, $menuId, $quizName)
    { //$data['semester'],$data['subject_id'],$data['pointId'],$data['ticket'],$data['fullName'],$data['miniName'],$data['maxPoint']

        $maxid = $this->db->query("
            select IFNULL(max(cast(choiceVoteId as int)),0)+1 as newid
            from choiceVote
            where choiceVoteSemester = '" . $semester . "' and choiceVoteSubject ='" . $subject . "' and choiceVoteMenuId ='" . $menuId . "';
        ");

        $newid = $maxid->row()->newid;

        $data = array(
            'choiceVoteSemester' => $semester,
            'choiceVoteSubject' => $subject,
            'choiceVoteMenuId' => $menuId,
            'choiceVoteId' => $newid,
            'choiceVoteText' => $quizName
        );

        $this->db->insert('choiceVote', $data);
    }

    public function getMenuVote($subjectId, $semesterId)
    {
        $this->db->select('*');
        $this->db->from('menuVote');
        $this->db->where('menuVoteSubject', $subjectId);
        $this->db->where('menuVoteSemester', $semesterId);
        $this->db->order_by('menuVoteIndex', 'ASC');
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function IndexMenu($sortMenuIDArray, $ArraySemester, $ArraySubject)
    {
        $num = count($sortMenuIDArray);
        for ($i = 0; $i < $num; $i++) {
            $newIndex = $i + 1;
            $this->db->query('UPDATE menuVote SET menuVoteIndex = "' . $newIndex . '" WHERE menuVoteSemester = "' . $ArraySemester[$i] . '" 
            AND menuVoteSubject = "' . $ArraySubject[$i] . '" AND menuVoteId = "' . $sortMenuIDArray[$i] . '" ');
            // echo $sortMenuIDArray[$i];
            // echo "<br>";
        }
    }

    public function getStudent($subjectId, $semesterId)
    {
        $this->db->select('count(substd_stdid) as studentCount');
        $this->db->from('subject_student');
        $this->db->where('substd_subject', $subjectId);
        $this->db->where('substd_semester', $semesterId);
        //$this->db->order_by('menuDowId', 'DESC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getVoteField($subjectId, $semesterId, $menuId)
    {
        $this->db->select('*');
        $this->db->from('choiceVote');
        $this->db->where('choiceVoteSemester', $semesterId);
        $this->db->where('choiceVoteSubject', $subjectId);
        $this->db->where('choiceVoteMenuId', $menuId);
        $this->db->order_by('cast(choiceVoteId as int)', 'ASC');
        //$this->db->order_by('cast(setpoint_index as int)', 'ASC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getVotePoint($subjectId, $semesterId, $menuId, $fieldId)
    {
        $this->db->select('count(pointVoteUserId) as stdCount');
        $this->db->from('pointVote');
        $this->db->where('pointVoteSemester', $semesterId);
        $this->db->where('pointVoteSubject', $subjectId);
        $this->db->where('pointVoteMenuVoteId', $menuId);
        $this->db->where('pointVoteChoiceVoteId', $fieldId);
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

    //////////////////////////

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
        $this->db->where_in('choiceVoteSemester', $semester);
        $this->db->where_in('choiceVoteSubject', $subject_id);
        $this->db->where_in('choiceVoteMenuId', $setIdParent);
        $this->db->where_in('choiceVoteId', $setIdChild);
        $this->db->delete('choiceVote');
    }

    public function deleteMenu($semester, $subject_id, $setIdParent)
    {
        $this->db->where_in('menuVoteSemester', $semester);
        $this->db->where_in('menuVoteSubject', $subject_id);
        $this->db->where_in('menuVoteId', $setIdParent);
        $this->db->delete('menuVote');
    }

    public function editMenu($semester, $subject, $Header, $Description, $editID, $menuStatus)
    {
        $this->db->set('menuVoteName', $Header);
        $this->db->set('menuVoteDescription', $Description);
        $this->db->set('menuVoteStatus', $menuStatus);
        $this->db->where('menuVoteSemester', $semester);
        $this->db->where('menuVoteSubject', $subject);
        $this->db->where('menuVoteId', $editID);
        $this->db->update('menuVote');
    }

    public function updateField($semester, $subject, $menuId, $choiceId, $choiceTxt)
    {
        $data = [
            'choiceVoteText' => $choiceTxt,
        ];
        
        $this->db->where('choiceVoteSemester', $semester);
        $this->db->where('choiceVoteSubject', $subject);
        $this->db->where('choiceVoteMenuId', $menuId);
        $this->db->where('choiceVoteId', $choiceId);

        $this->db->update('choiceVote', $data); 
    }
}
