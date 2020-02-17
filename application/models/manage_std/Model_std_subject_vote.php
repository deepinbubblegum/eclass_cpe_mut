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
        $this->db->order_by('menuVoteIndex', 'ASC');
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

    public function refreshed($semester, $subject, $menuId){ 
        $this->db->select('choiceVoteId ,choiceVoteText');
        $this->db->from('choiceVote');
        $this->db->where('choiceVoteSemester', $semester);
        $this->db->where('choiceVoteSubject', $subject);
        $this->db->where('choiceVoteMenuId', $menuId);
        $this->db->order_by('cast(choiceVoteId as int)', 'ASC');
        $query0 = $this->db->get();
        if ($query0->num_rows() > 0) {
            $this->db->select('pointVoteChoiceVoteId ,COUNT(pointVoteUserId) as countStd');
            $this->db->from('pointVote');
            $this->db->where('pointVoteSemester', $semester);
            $this->db->where('pointVoteSubject', $subject);
            $this->db->where('pointVoteMenuVoteId', $menuId);
            $this->db->group_by('pointVoteChoiceVoteId'); 
            $this->db->order_by('cast(pointVoteChoiceVoteId as int)', 'ASC');
            $query1 = $this->db->get();
            if ($query1->num_rows() > 0) {
                $this->db->select('count(substd_stdid) as studentCount');
                $this->db->from('subject_student');
                $this->db->where('substd_semester', $semester);
                $this->db->where('substd_subject', $subject);
                $query2 = $this->db->get();
                if ($query2->num_rows() > 0) {
                    $mold = array($query0->result(), $query1->result(), $query2->result());
                    return $mold;
                } else {
                    return 2;
                }
            } else {
                return 1;
            }
        } else {
            return 0;
        }
    } 
}
