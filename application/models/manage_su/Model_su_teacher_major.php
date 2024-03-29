<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_teacher_major extends CI_Model
{

    public function Show_Max_Data_model()
    {
        // $query = $this->db->get('teacher');
        // return $query->num_rows();
        $this->db->select('teacher_code_id, teacher_Tname, teacher_Ename, major_id, major_name,major_faculty, de_Tname, de_Ename , de_id');
        $this->db->from('teacher_major');
        $this->db->join('major', 'teamaj_majorid = major_id', 'left');
        $this->db->join('teacher', 'teamaj_teacherid = teacher_code_id', 'left');
        $this->db->join('degree', 'teacher.teacher_degree = degree.de_id', 'left');
        $this->db->group_by('teacher_code_id');
        $query = $this->db->get();
        return $query->num_rows();
    }

    public function Show_Data_Teacher_model($limit = null, $start = null)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('teacher_code_id, teacher_Tname, teacher_Ename, major_id, major_name,major_faculty, de_Tname, de_Ename , de_id');
        $this->db->from('teacher_major');
        $this->db->join('major', 'teamaj_majorid = major_id', 'left');
        $this->db->join('teacher', 'teamaj_teacherid = teacher_code_id', 'left');
        $this->db->join('degree', 'teacher.teacher_degree = degree.de_id', 'left');
        $this->db->group_by('teacher_code_id');
        $this->db->order_by("major_name", "asc");
        $this->db->order_by("de_grade", "asc");
        $this->db->order_by("teacher_Tname", "asc");
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Show_Max_Search_Data_model($data, $keyword)
    {
        $this->db->select('teacher_code_id, teacher_Tname, teacher_Ename, major_id, major_name,major_faculty, de_Tname, de_Ename , de_id');
        $this->db->from('teacher_major');
        $this->db->join('major', 'teamaj_majorid = major_id', 'left');
        $this->db->join('teacher', 'teamaj_teacherid = teacher_code_id', 'left');
        $this->db->join('degree', 'teacher.teacher_degree = degree.de_id', 'left');
        if ($data != null) {
            $this->db->or_like($data, $keyword);
        } else {
            $this->db->like('teacher_code_id', $keyword);
            $this->db->or_like('teacher_Tname', $keyword);
            $this->db->or_like('teacher_Ename', $keyword);
            $this->db->or_like('major_name', $keyword);
        }
        $this->db->group_by('teacher_code_id');
        $this->db->order_by("major_name", "asc");
        $this->db->order_by("de_grade", "asc");
        $this->db->order_by("teacher_Tname", "asc");
        $query = $this->db->get();
        return $query->num_rows();
    }

    public function Search_data_model($data, $keyword, $start, $limit)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('teacher_code_id, teacher_Tname, teacher_Ename, major_id, major_name,major_faculty, de_Tname, de_Ename , de_id');
        $this->db->from('teacher_major');
        $this->db->join('major', 'teamaj_majorid = major_id', 'left');
        $this->db->join('teacher', 'teamaj_teacherid = teacher_code_id', 'left');
        $this->db->join('degree', 'teacher.teacher_degree = degree.de_id', 'left');
        if ($data != null) {
            $this->db->or_like($data, $keyword);
        } else {
            $this->db->like('teacher_code_id', $keyword);
            $this->db->or_like('teacher_Tname', $keyword);
            $this->db->or_like('teacher_Ename', $keyword);
            $this->db->or_like('major_name', $keyword);
        }
        $this->db->group_by('teacher_code_id');
        $this->db->order_by("major_name", "asc");
        $this->db->order_by("de_grade", "asc");
        $this->db->order_by("teacher_Tname", "asc");
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Add_data_model($teacher, $major)
    {
        // $this->db->insert('teacher_major', $data);
        $check = $this->db->query('SELECT * FROM teacher_major WHERE teamaj_teacherid = "' . $teacher.'"');
        if ($check->num_rows() > 0) {
            return 0;
        } else {
            $this->db->query('DELETE FROM teacher_major WHERE teamaj_teacherid = "' . $teacher.'"');
            $count = count($major);
            for ($i = 0; $i < $count; $i++) {
                $this->db->query('INSERT INTO teacher_major VALUES("' . $teacher . '", "' . $major[$i] . '" ) ');
            }
            return 1;
        }
    }

    public function Edit_data_model($org_teacher, $teacher, $major)
    {
        // $this->db->where_in('teamaj_teacherid', $org_teacher);
        // $this->db->where_in('teamaj_majorid', $org_major);
        // $this->db->update('teacher_major', $data);
        // echo $org_teacher .'!='. $teacher;
        if ($org_teacher != $teacher) {
            $check = $this->db->query('SELECT * FROM teacher_major WHERE teamaj_teacherid = "' . $teacher.'"');
            if ($check->num_rows() > 0) {
                return -2;
            } else {
                $this->db->query('DELETE FROM teacher_major WHERE teamaj_teacherid = "' . $teacher.'"');
                $count = count($major);
                for ($i = 0; $i < $count; $i++) {
                    $this->db->query('INSERT INTO teacher_major VALUES("' . $teacher . '", "' . $major[$i] . '" ) ');
                }
                return 2;
            }
        } else {
            $this->db->query('DELETE FROM teacher_major WHERE teamaj_teacherid = "' . $teacher.'" ');
            $count = count($major);
            for ($i = 0; $i < $count; $i++) {
                $this->db->query('INSERT INTO teacher_major VALUES("' . $teacher . '", "' . $major[$i] . '" ) ');
            }
            return 2;
        }
    }

    public function Delete_Data_model($data_teacher, $data_major)
    {
        $this->db->where_in('teamaj_teacherid', $data_teacher);
        // $this->db->where_in('teamaj_majorid', $data_major);
        $this->db->delete('teacher_major');
        //$this->db->query('DELETE from teacher_major WHERE teamaj_majorid = "'.$data_major.'" AND teamaj_teacherid="'.$data_teacher.'" ');
    }

    public function Show_Sort_model($data, $sort, $start, $limit)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('teacher_code_id, teacher_Tname, teacher_Ename, major_id, major_name,major_faculty, de_Tname, de_Ename , de_id');
        $this->db->from('teacher_major');
        $this->db->join('major', 'teamaj_majorid = major_id', 'left');
        $this->db->join('teacher', 'teamaj_teacherid = teacher_code_id', 'left');
        $this->db->join('degree', 'teacher.teacher_degree = degree.de_id', 'left');
        $this->db->group_by('teacher_code_id');
        $this->db->order_by($data, $sort);
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Show_MajorAll_Data_model()
    {
        $this->db->select('*');
        $this->db->from('teacher_major');
        $this->db->join('major', 'teamaj_majorid = major_id', 'left');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
}
