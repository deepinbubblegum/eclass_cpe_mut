<?php

class Model_su_subject_semester extends CI_Model
{

    public function Show_Max_Data_model()
    {
        $query = $this->db->get('subject_semester');
        return $query->num_rows();
    }

    public function Show_Data_Subject_Semester_model($limit = null, $start = null)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('*');
        $this->db->from('subject_semester');
        $this->db->join('semester', 'subject_semester.subsem_semester = semester.semester_id', 'inner');
        $this->db->join('subject', 'subject_semester.subsem_subject = subject.subject_id', 'left');
        $this->db->join('teacher', 'subject_semester.subsem_teacher = teacher.teacher_code_id', 'inner');
        $this->db->order_by("semester_id", "DESC");
        $this->db->order_by("subject_id", "ASC");
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }


    public function Add_data_model($data)
    {
        $this->db->insert('subject_semester', $data);
    }


    public function Edit_data_model($org_id, $org_sub, $data)
    {
        $this->db->where('subsem_semester', $org_id);
        $this->db->where('subsem_subject', $org_sub);
        $this->db->update('subject_semester', $data);
    }


    public function Delete_Data_model($data_semester, $data_subject)
    {
        $this->db->where_in('subsem_semester', $data_semester);
        $this->db->where_in('subsem_subject', $data_subject);
        $this->db->delete('subject_semester'); 
    }


    public function Search_data_model($keyword, $type)
    {
        $this->db->select('*');
        $this->db->from('subject_semester');
        $this->db->join('semester', 'subject_semester.subsem_semester = semester.semester_id', 'inner');
        $this->db->join('subject', 'subject_semester.subsem_subject = subject.subject_id', 'left');
        $this->db->join('teacher', 'subject_semester.subsem_teacher = teacher.teacher_code_id', 'inner');
        if ($type != null) {
            $this->db->like($type, $keyword);
            // var dropSearchValue = [
            //     //[VALUE,TEXT]
            //     ['semester_name', 'เทอม'],
            //     ['subject_id', 'รหัสวิชา'],
            //     ['subject_name', 'ชื่อวิชา'],
            //     ['teacher_code_id', 'รหัสอาจารย์'],
            //     ['teacher_Ename', 'ชื่ออาจารย์']
            // ];
        } else {
            $this->db->like('semester_name', $keyword);
            $this->db->or_like('subject_id', $keyword);
            $this->db->or_like('subject_name', $keyword);
            $this->db->or_like('teacher_code_id', $keyword);
            $this->db->or_like('teacher_Ename', $keyword);
        }
        $this->db->order_by("semester_id", "DESC");
        $this->db->order_by("subject_id", "ASC");
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function getTeacher()
    { 
        $this->db->select('*');
        $this->db->from('teacher');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function selectTeacher($subjectId){
        $this->db->select('*');
        $this->db->from('teacher_subject');
        $this->db->join('teacher', 'teacher_subject.teasub_teacherid = teacher.teacher_code_id', 'left');
        $this->db->like('teasub_subjectid', $subjectId);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function selectSubject($teacherId){
        $this->db->select('*');
        $this->db->from('teacher_subject');
        $this->db->join('subject', 'teacher_subject.teasub_subjectid = subject.subject_id', 'left');
        $this->db->like('teasub_teacherid', $teacherId);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function get_sub_teacher($selectAddSemester)
    {
        $this->db->select('*');
        $this->db->from('teacher_subject');
        $this->db->join('teacher_subject');
        $this->db->where('teasub_subjectid', $selectAddSemester);
    }
}
