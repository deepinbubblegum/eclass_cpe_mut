<?php

class Model_su_teacher_subject extends CI_Model
{

    public function Show_Max_Data_model()
    {
        $query = $this->db->get('teacher_subject');
        return $query->num_rows();
    }

    public function Show_Data_Teacher_Subject_model($limit = null, $start = null)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('subject_id, subject_name,teacher_code_id,teacher_Ename,subject_major');
        $this->db->from('teacher_subject');
        $this->db->join('subject', 'teacher_subject.teasub_subjectid = subject.subject_id', 'left');
        $this->db->join('teacher', 'teacher_subject.teasub_teacherid = teacher.teacher_code_id', 'left');
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Select_teacher_medel($data)
    {
        $this->db->select('teacher_code_id,teacher_Ename');
        $this->db->from('teacher_major');
        $this->db->join('teacher', 'teacher_major.teamaj_teacherid = teacher.teacher_code_id', 'left');
        $this->db->where('teamaj_majorid', $data);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Select_subject_medel($data)
    {
        $this->db->select('subject_id,subject_name');
        $this->db->from('subject');
        $this->db->where('subject_major', $data);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Add_data_model($data)
    {
        $this->db->insert('teacher_subject', $data);
    }


    public function Edit_data_model($org_subject, $user_data, $data)
    {
        $this->db->where('teasub_subjectid', $org_subject);
        $this->db->where('teasub_teacherid', $user_data);
        $this->db->update('teacher_subject', $data);
    }


    public function Delete_Data_model($data_subject, $data_teacher)
    {
        $this->db->where_in('teasub_subjectid', $data_subject);
        $this->db->where_in('teasub_teacherid', $data_teacher);
        $this->db->delete('teacher_subject');
    }


    public function Search_data_model($keyword, $type)
    {
        $this->db->select('subject_id, subject_name,teacher_code_id,teacher_Ename,subject_major');
        $this->db->from('teacher_subject');
        $this->db->join('subject', 'teacher_subject.teasub_subjectid = subject.subject_id', 'left');
        $this->db->join('teacher', 'teacher_subject.teasub_teacherid = teacher.teacher_code_id', 'left');
        if ($type != null) {

            $this->db->like($type, $keyword);
        } else {
            $this->db->or_like('subject_name', $keyword);
            $this->db->or_like('subject_id', $keyword);
            $this->db->or_like('teacher_Ename', $keyword);
        }
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Show_Data_Semester_model()
    {
        $this->db->select('distinct(subject_semester.subsem_semester),semester_name');
        $this->db->from('subject_semester');
        $this->db->join('semester', 'subject_semester.subsem_semester = semester.semester_id', 'inner');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Show_Data_Subject_model($data)
    {
        $this->db->select('subsem_subject,subject_name');
        $this->db->from('subject_semester');
        $this->db->join('subject', 'subject_semester.subsem_subject = subject.subject_id', 'inner');
        $this->db->where('subsem_semester', $data);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Select_Faculty($data)
    {
        //$query = $this->db->query('SELECT DISTINCT  faculty_id ,faculty_name FROM major left join faculty on major_faculty = faculty_id WHERE major_id="'.$data.'" ');
        $this->db->select('faculty_id ,faculty_name');
        $this->db->from('major');
        $this->db->join('faculty', 'major_faculty = faculty_id', 'left');
        $this->db->where('major_id', $data);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
}
