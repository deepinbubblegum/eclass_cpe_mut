<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_std_subject_vote extends CI_Model
{ 
    public function getMenuVote($subjectId, $semesterId)
    {
        $this->db->select('*');
        $this->db->from('menuVote');
        $this->db->where('menuVoteSubject', $subjectId);
        $this->db->where('menuVoteSemester', $semesterId);
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
        //$this->db->order_by('cast(setpoint_index as int)', 'ASC');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getVotePoint($subjectId, $semesterId, $menuId, $userId)
    {
        $this->db->select('*');
        $this->db->from('pointVote');
        $this->db->where('pointVoteSemester', $semesterId);
        $this->db->where('pointVoteSubject', $subjectId);
        $this->db->where('pointVoteMenuVoteId', $menuId);
        $this->db->where('pointVoteUserId', $userId);
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
    
    public function insertPoint($semester, $subject, $menuId, $choiceId, $userId)
    {
        $data = array(
            'pointVoteSemester' => $semester,
            'pointVoteSubject' => $subject,
            'pointVoteMenuVoteId' => $menuId,
            'pointVoteChoiceVoteId' => $choiceId,
            'pointVoteUserId' => $userId,
        );
        $this->db->insert('pointVote', $data);
    }
}
