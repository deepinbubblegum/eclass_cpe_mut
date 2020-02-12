<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_add_subject extends CI_Model
{
    public function Show_Data_subject_model($semester, $te_id)
    {

        // $this->db->select('id, name, subject_id, subject_name, id, user_code_id, user_Ename');
        // $this->db->from('teacher_subject');
        // $this->db->where('user_code_id', '25610002');
        // $this->db->join('semester', 'teacher_subject.teasub_semester = semester.id' , 'inner');
        // $this->db->join('subject', 'teacher_subject.teasub_subject = subject.subject_id', 'left');
        // $this->db->join('user_data', 'teacher_subject.teasub_teacher = user_data.user_code_id', 'left');
        // $this->db->where('teacher_subject.teasub_semester', $semester);
        // $query = $this->db->get();

        $query = $this->db->query('SELECT semester_id, semester_name, subject_id, subject_name, user_code_id, user_Ename
            FROM subject_semester 
            INNER JOIN subject
            ON subsem_subject = subject_id
            INNER JOIN semester
            ON subsem_semester = semester.semester_id
            INNER JOIN user_data
            ON subject_teacher = user_code_id
            WHERE semester_id = ' . $semester . ' AND user_code_id = ' . $te_id);
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Show_Data_subject_add_model($te_id)
    {
        $query = $this->db->query('SELECT subject_id, subject_name
            FROM teacher_subject
            LEFT JOIN subject
            ON teasub_subjectid = subject_id
            WHERE teasub_teacherid = "' . $te_id . '"');
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function selectSemester()
    {

        $this->db->select('semester_id, semester_year, semester_part, semester_name');
        $this->db->from('semester');
        $this->db->order_by("semester_id", "DESC");
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Add_data_model_subject($data)
    {
        $this->db->insert('subject_semester', $data);
    }

    public function Add_Subject_Join($semes, $sub, $subjoin)
    {
        //print_r($semes);
        $arrayLength = count($semes);
        for ($i = 0; $i < $arrayLength; $i++) {
            $this->db->query('INSERT INTO subject_coop(subcoop_semester,subcoop_mainsub,subcoop_supsub) VALUES("' . $semes[$i] . '"  ,"' . $sub[$i] . '" , "' . $subjoin[$i] . '") ');
        }
    }

    public function Edit_Subject_Join($semester_edit, $subject_edit, $subjoin)
    {
        $this->db->query('DELETE FROM subject_coop WHERE subcoop_semester = "' . $semester_edit . '" AND subcoop_mainsub = "' . $subject_edit . '" ');
        $arrayLength = count($subjoin);
        for ($i = 0; $i < $arrayLength; $i++) {
            $this->db->query('INSERT INTO subject_coop(subcoop_semester,subcoop_mainsub,subcoop_supsub) VALUES("' . $semester_edit . '"  ,"' . $subject_edit . '" , "' . $subjoin[$i] . '") ');
        }
    }

    public function Edit_NoSubject_Join($semester_edit, $subject_edit)
    {
        $this->db->query('DELETE FROM subject_coop WHERE subcoop_semester = "' . $semester_edit . '" AND subcoop_mainsub = "' . $subject_edit . '" ');
    }

    public function SubjectCopy($semester, $te_id)
    {
        $query = $this->db->query('SELECT subsem_semester , subject_id , subject_name , subsem_teacher FROM subject_semester 
        LEFT JOIN subject ON subsem_subject = subject_id
        WHERE subsem_semester = "' . $semester . '"');
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Add_Data_Subject_Copy($semester, $subject_id, $SemCopy, $SubCopy, $te_id)
    {
        $dataPoint_id = array();
        $queryPoint = $this->db->query('SELECT * FROM subject_point WHERE point_semester = "' . $SemCopy . '" AND point_subject = "' . $SubCopy . '"');
        if ($queryPoint->num_rows() > 0) {
            foreach ($queryPoint->result_array() as $row) {
                $dataPoint_id[] = $row['point_id'];
                $this->db->query('INSERT INTO subject_point(point_semester, point_subject, point_id,point_name, point_discription, point_StdView, point_Index)
                VALUES ("' . $semester . '", "' . $subject_id . '", "' . $row['point_id'] . '", "' . $row['point_name'] . '" , "' . $row['point_discription'] . '" , "' . $row['point_StdView'] . '" , "' . $row['point_Index'] . '") ');
            }
            if (count($dataPoint_id) != 0) {
                for ($i = 0; $i <  count($dataPoint_id); $i++) {
                    $querySetPoint = $this->db->query('SELECT * FROM subject_setpoint WHERE setpoint_semester = "' . $SemCopy . '" AND setpoint_subject = "' . $SubCopy . '" AND setpoint_id = "' . $dataPoint_id[$i] . '"');
                    if ($querySetPoint->num_rows() > 0) {
                        foreach ($querySetPoint->result_array() as $row) {
                            $this->db->query('INSERT INTO subject_setpoint(setpoint_semester, setpoint_subject, setpoint_id, setpoint_setpoint_id, setpoint_index, setpoint_ticket, setpoint_fullname, setpoint_mininame, setpoint_maxpoint, setpoint_option, setpoint_multi)
                                VALUES ("' . $semester . '", "' . $subject_id . '", "' . $dataPoint_id[$i] . '", "' . $row['setpoint_setpoint_id'] . '" , "' . $row['setpoint_index'] . '" , "' . $row['setpoint_ticket'] . '" 
                                , "' . $row['setpoint_fullname'] . '" , "' . $row['setpoint_mininame'] . '" , "' . $row['setpoint_maxpoint'] . '" , "' . $row['setpoint_option'] . '" , "' . $row['setpoint_multi'] . '" ) ');
                        }
                    }
                }
            }
        }

        $dataDowload = array();
        $queryDow = $this->db->query('SELECT * FROM menuDownload WHERE menuDowSemesterId = "' . $SemCopy . '" AND menuDowSubjectId = "' . $SubCopy . '"');
        if ($queryDow->num_rows() > 0) {
            foreach ($queryDow->result_array() as $row) {
                $dataDowload[] = $row['menuDowId'];
                $this->db->query('INSERT INTO menuDownload(menuDowSemesterId,menuDowSubjectId,menuDowId,menuDowName,menuDowDescrpition,menuDowIndex)
                VALUES ("' . $semester . '", "' . $subject_id . '", "' . $row['menuDowId'] . '", "' . $row['menuDowName'] . '" , "' . $row['menuDowDescrpition'] . '" , "' . $row['menuDowIndex'] . '") ');
            }
            if (count($dataDowload) != 0) {
                for ($i = 0; $i <  count($dataDowload); $i++) {
                    $queryFileDow = $this->db->query('SELECT * FROM fileDownload WHERE fileSemesterId = "' . $SemCopy . '" AND fileSubjectId = "' . $SubCopy . '" AND fileMenuDowId = "' . $dataDowload[$i] . '"');
                    if ($queryFileDow->num_rows() > 0) {
                        foreach ($queryFileDow->result_array() as $row) {
                            $this->db->query('INSERT INTO fileDownload(fileSemesterId, fileSubjectId, fileMenuDowId, fileUserId, fileName, fileSize, fileType, fileTimestamp, fileIndex) 
                            VALUES("' . $semester . '", "' . $subject_id . '" , "' . $dataDowload[$i] . '" , "' . $te_id . '" , 
                            "' . $row['fileName'] . '" , "' . $row['fileSize'] . '" , "' . $row['fileType'] . '" , NOW() , "' . $row['fileIndex'] . '") ');
                        }
                    }
                    // $getFile = file_get_contents('/Eclass/uploads/file/' . $data['semester'] . $data['subject_id'] . '/' . 'Uploads' . '/' . $data['menu_id'] . '/' . $data['fileName']);
                    $src = '/Eclass/uploads/file/' . $SemCopy . $SubCopy . '/' . 'Downloads' . '/' . $dataDowload[$i];
                    $dest = '/Eclass/uploads/file/' . $semester . $subject_id . '/' . 'Downloads' . '/';
                    shell_exec("cp -r $src $dest");
                }
            }
        }

        // $dataUpload = array();
        $queryUp = $this->db->query('SELECT * FROM menuUpload WHERE menuUpSemesterId = "' . $SemCopy . '" AND menuUpSubjectId = "' . $SubCopy . '"');
        if ($queryUp->num_rows() > 0) {
            foreach ($queryUp->result_array() as $row) {
                // $dataUpload[] = $row['menuUpId'];
                $this->db->query('INSERT INTO menuUpload(menuUpSemesterId,menuUpSubjectId,menuUpId,menuUpName,menuUpDescripition, menuUpTimeStart, menuUpTimeEnd)
                VALUES ("' . $semester . '", "' . $subject_id . '", "' . $row['menuUpId'] . '", "' . $row['menuUpName'] . '" , "' . $row['menuUpDescripition'] . '" ,  NOW() , "' . $row['menuUpTimeEnd'] . '" ) ');
            }
        }

        $queryAnnouce = $this->db->query('SELECT * FROM subject_annouce WHERE annouce_semester = "' . $SemCopy . '" AND annouce_subject = "' . $SubCopy . '" ORDER BY annouce_time_start DESC ');
        if ($queryAnnouce->num_rows() > 0) {
            foreach ($queryAnnouce->result_array() as $row) {
                // $dataUpload[] = $row['menuUpId'];
                $this->db->query('INSERT INTO subject_annouce(annouce_semester,annouce_subject,annouce_id,annouce_name,annouce_discription, annouce_time_start, annouce_time_end, annouce_user_id)
                VALUES ("' . $semester . '", "' . $subject_id . '", "' . $row['annouce_id'] . '", "' . $row['annouce_name'] . '" , "' . $row['annouce_discription'] . '" ,  NOW() , "' . $row['annouce_time_end'] . '" , "' . $te_id . '" ) ');
            }
        }

        $dataVote = [];
        $queryVote = $this->db->query('SELECT * FROM menuVote WHERE menuVoteSemester = "' . $SemCopy . '" AND menuVoteSubject = "' . $SubCopy . '" ');
        if ($queryVote->num_rows() > 0) {
            foreach ($queryVote->result_array() as $rowVote) {
                $dataVote[] = $rowVote['menuVoteId'];
                $this->db->query('INSERT INTO menuVote(menuVoteSemester,menuVoteSubject,menuVoteId,menuVoteName,menuVoteDescription,menuVoteStatus)
                VALUES("' . $semester . '", "' . $subject_id . '", "' . $rowVote['menuVoteId'] . '", "' . $rowVote['menuVoteName'] . '" , "' . $rowVote['menuVoteDescription'] . '" , "' . $rowVote['menuVoteStatus'] . '" ) ');
            }
            if (count($dataVote) != 0) {
                for ($i = 0; $i <  count($dataVote); $i++) {
                    $queryChoiceVote = $this->db->query('SELECT * FROM choiceVote WHERE choiceVoteSemester = "' . $SemCopy . '" AND choiceVoteSubject = "' . $SubCopy . '" AND choiceVoteMenuId = "' . $dataVote[$i] . '"  ');
                    if ($queryChoiceVote->num_rows() > 0) {
                        foreach ($queryChoiceVote->result_array() as $rowChoiceVote) {
                            $this->db->query('INSERT INTO choiceVote(choiceVoteSemester, choiceVoteSubject, choiceVoteMenuId, choiceVoteId, choiceVoteText)
                                VALUES ("' . $semester . '", "' . $subject_id . '", "' . $dataVote[$i] . '", "' . $rowChoiceVote['choiceVoteId'] . '" , "' . $rowChoiceVote['choiceVoteText'] . '" ) ');
                        }
                    }
                }
            }
        }

        $dataQuiz = [];
        $queryQuiz = $this->db->query('SELECT * FROM menuQuiz WHERE menuQuizSemester = "' . $SemCopy . '" AND menuQuizSubject = "' . $SubCopy . '" ');
        if ($queryQuiz->num_rows() > 0) {
            foreach ($queryQuiz->result_array() as $rowQuiz) {
                $dataQuiz[] = $rowQuiz['menuQuizId'];
                $this->db->query('INSERT INTO menuQuiz(menuQuizSemester,menuQuizSubject,menuQuizId,menuQuizName,menuQuizDescription,menuQuizStatus)
                VALUES("' . $semester . '", "' . $subject_id . '", "' . $rowQuiz['menuQuizId'] . '", "' . $rowQuiz['menuQuizName'] . '" , "' . $rowQuiz['menuQuizDescription'] . '" , "' . $rowQuiz['menuQuizStatus'] . '" ) ');
            }
            if (count($dataQuiz) != 0) {
                for ($i = 0; $i < count($dataQuiz); $i++) {
                    $dataHeaderQuiz = [];
                    $queryheaderQuiz = $this->db->query('SELECT * FROM headerQuiz WHERE headerQuizSemester = "' . $SemCopy . '" AND headerQuizSubject = "' . $SubCopy . '" AND headerQuizMenuQuizId = "' . $dataQuiz[$i] . '" ');
                    if ($queryheaderQuiz->num_rows() > 0) {
                        foreach ($queryheaderQuiz->result_array() as $rowheaderQuiz) {
                            $dataHeaderQuiz[] = $rowheaderQuiz['headerQuizId'];
                            $this->db->query('INSERT INTO headerQuiz(headerQuizSemester,headerQuizSubject,headerQuizMenuQuizId,headerQuizId,headerQuizName) 
                            VALUES("' . $semester . '", "' . $subject_id . '", "' . $rowheaderQuiz['headerQuizMenuQuizId'] . '", "' . $rowheaderQuiz['headerQuizId'] . '" , "' . $rowheaderQuiz['headerQuizName'] . '" ) ');
                        }
                        if (count($dataHeaderQuiz) != 0) {
                            for ($a = 0; $a < count($dataHeaderQuiz); $a++) {
                                $queryChoiceQuiz = $this->db->query('SELECT * FROM choiceQuiz WHERE choiceQuizSemester = "' . $SemCopy . '" AND choiceQuizSubject = "' . $SubCopy . '" AND choiceQuizMenuQuizId = "' . $dataQuiz[$i] . '" AND choiceQuizHeadId = "' . $dataHeaderQuiz[$a] . '" ');
                                if ($queryChoiceQuiz->num_rows() > 0) {
                                    foreach ($queryChoiceQuiz->result_array() as $rowChoiceQuiz) {
                                        $this->db->query('INSERT INTO choiceQuiz(choiceQuizSemester,choiceQuizSubject,choiceQuizMenuQuizId,choiceQuizHeadId,choiceQuizId,choiceQuizText,choiceQuizPoint)
                                        VALUES("' . $semester . '", "' . $subject_id . '", "' . $dataQuiz[$i] . '", "' . $dataHeaderQuiz[$a] . '" , "' . $rowChoiceQuiz['choiceQuizId'] . '" , "' . $rowChoiceQuiz['choiceQuizText'] . '" , "' . $rowChoiceQuiz['choiceQuizPoint'] . '" ) ');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
         // $dataMedia = [];
         $queryMedia = $this->db->query('SELECT * FROM media_data WHERE  media_semester = "'.$SemCopy.'" and media_subject="'.$SubCopy.'" ');
         if ($queryMedia->num_rows() > 0) {
             foreach ($queryQuiz->result_array() as $rowMedia) {
                 $this->db->query('INSERT INTO media_data(media_id, media_semester, media_subject, media_show_name, media_detail_txt, media_real_name, media_type, media_index)
                 VALUES("' . $rowMedia['media_id'] . '", "' . $semester . '", "' . $subject_id . '", "' . $rowMedia['media_show_name'] . '" , "' . $rowMedia['media_detail_txt'] . '" ,
                  "' . $rowMedia['media_real_name'] . '" , "' . $rowMedia['media_type'] . '" , "' . $rowMedia['media_index'] . '"  ) ');
             }
         }
    }
}
