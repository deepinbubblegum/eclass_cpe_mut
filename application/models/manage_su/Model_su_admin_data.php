<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_su_admin_data extends CI_Model
{
    public function Show_Max_Data_model()
    {
        $query = $this->db->query('SELECT * FROM teacher WHERE teacher_admin = "1" ');
        return $query->num_rows();
    }

    public function Show_Data_admin_data_model($limit = null, $start = null)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('*');
        $this->db->from('teacher');
        $this->db->join('degree', 'teacher.teacher_degree = degree.de_id', 'left');
        $this->db->where('teacher_admin', '1');
        $this->db->order_by("de_grade", "asc");
        $this->db->order_by("teacher_Ename", "asc");
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Show_Max_Search_Data_model($keyword, $type)
    {
        $this->db->select('*');
        $this->db->from('teacher');
        $this->db->group_start();
        if ($type != null) {
            if ($type == 'teacher_code_id') {
                $searchData = 'teacher_code_id';
            } else if ($type == 'teacher_Tname') {
                $searchData = 'teacher_Tname';
            } else if ($type == 'teacher_Ename') {
                $searchData = 'teacher_Ename';
            } else if ($type == 'teacher_email') {
                $searchData = 'teacher_email';
            }
            $this->db->or_like($searchData, $keyword);
        } else {
            $this->db->like('teacher_code_id', $keyword);
            $this->db->or_like('teacher_Tname', $keyword);
            $this->db->or_like('teacher_Ename', $keyword);
            $this->db->or_like('teacher_email', $keyword); 
        }
        $this->db->group_end();
        $this->db->join('degree', 'teacher.teacher_degree = degree.de_id', 'left');
        $this->db->where('teacher_admin', '1');
        $this->db->order_by("de_grade", "asc");
        $this->db->order_by("teacher_Ename", "asc");
        $query = $this->db->get();
        return $query->num_rows();
    }

    public function Search_data_model($keyword, $type, $start, $limit)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('*');
        $this->db->from('teacher');
        $this->db->group_start();
        if ($type != null) {
            if ($type == 'teacher_code_id') {
                $searchData = 'teacher_code_id';
            } else if ($type == 'teacher_Tname') {
                $searchData = 'teacher_Tname';
            } else if ($type == 'teacher_Ename') {
                $searchData = 'teacher_Ename';
            } else if ($type == 'teacher_email') {
                $searchData = 'teacher_email';
            }
            $this->db->or_like($searchData, $keyword);
        } else {
            $this->db->like('teacher_code_id', $keyword);
            $this->db->or_like('teacher_Tname', $keyword);
            $this->db->or_like('teacher_Ename', $keyword);
            $this->db->or_like('teacher_email', $keyword); 
        }
        $this->db->group_end();
        $this->db->join('degree', 'teacher.teacher_degree = degree.de_id', 'left');
        $this->db->where('teacher_admin', '1');
        $this->db->order_by("de_grade", "asc");
        $this->db->order_by("teacher_Ename", "asc");
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Add_data_model($data,$arg)
    {
        $this->db->where('teacher_code_id',$data);
        $this->db->update('teacher', $arg);
    }

    public function Add_data_model_csv($arg, $arg2)
    {
        $sql_cmd = $this->db->insert_string('admin_data', $arg);
        $query = str_replace("INSERT INTO","INSERT IGNORE INTO",$sql_cmd);
        $this->db->query($query);

        $sql_cmd2 = $this->db->insert_string('sign_in', $arg2);
        $query = str_replace("INSERT INTO","INSERT IGNORE INTO",$sql_cmd2);
        $this->db->query($query);
    }

    public function Edit_data_model($org_id, $data)
    {
        $this->db->where('admin_id', $org_id);
        $this->db->update('admin', $data);
    }

    public function Delete_Data_model($data,$arg)
    {
        $arrayLength = count($data);
        for ($i = 0; $i < $arrayLength; $i++)  {
            $this->db->where('teacher_code_id',$data[$i]);
            $this->db->update('teacher', $arg);
        }
    }

    public function Show_Sort_model($data, $sort, $start, $limit)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('*');
        $this->db->from('teacher');
        $this->db->join('degree', 'teacher.teacher_degree = degree.de_id', 'left');
        $this->db->where('teacher_admin', '1');
        $this->db->order_by($data, $sort);
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }
}
