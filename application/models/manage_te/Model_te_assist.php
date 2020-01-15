<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Model_te_assist extends CI_Model
{
    public function Show_Max_Data_model($arg, $arg2)
    {
        $this->db->select('*');
        $this->db->from('teacher_assist');
        $this->db->where('teaassist_subject', $arg);
        $this->db->where('teaassist_semester', $arg2);
        $query = $this->db->get();
        return $query->num_rows();
    }

    public function Show_Data_user_data_model($limit = null, $start = null, $arg, $arg2)
    {
        if ($limit == 0 and $start == 0) {
            $limit = null;
            $start = null;
        }
        $this->db->select('teacher_code_id, teacher_Ename, teacher_Tname, per_name, per_bit, per_id');
        $this->db->from('teacher_assist');
        $this->db->join('teacher', 'teaassist_teacherid = teacher_code_id', 'left');
        $this->db->join('permission', 'per_id = teaassist_permission', 'left');
        $this->db->where('teaassist_subject', $arg);
        $this->db->where('teaassist_semester', $arg2);
        $this->db->where('per_subject', $arg);
        $this->db->where('per_semester', $arg2);
        $this->db->group_by('teaassist_teacherid');
        $this->db->limit($limit, $start);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Search_data_model($keyword, $type, $subject_id, $semester)
    {
        $this->db->select('teacher_code_id, teacher_Ename, teacher_Tname, per_name, per_bit, per_id');
        $this->db->from('teacher_assist');
        $this->db->join('teacher', 'teaassist_teacherid = teacher_code_id', 'left');
        $this->db->join('permission', 'per_id = teaassist_permission', 'left');
        $this->db->where('teaassist_subject', $subject_id);
        $this->db->where('teaassist_semester', $semester);
        if ($type != null) {
            $this->db->like($type, $keyword);
        } else {
            $this->db->group_start();
            $this->db->like('teacher_code_id', $keyword);
            $this->db->or_like('teacher_Tname', $keyword);
            $this->db->or_like('teacher_Ename', $keyword);
            $this->db->or_like('per_name', $keyword);
            $this->db->group_end();
        }
        $this->db->group_by('teaassist_teacherid');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Teacher_Add($subject_id)
    {
        $Index = $this->db->query(' SELECT major_id FROM subject LEFT JOIN major ON subject_major = major_id WHERE subject_id = "' . $subject_id . '"  ');
        foreach ($Index->result() as $row) {
            $data[] = $row->major_id;
        }
        //print_r($data);
        $count =  count($data);
        $ssn = $this->session->ses_id;

        $this->db->select('teacher_code_id, teacher_Tname, teacher_Ename');
        $this->db->from('teacher_major');
        $this->db->join('teacher', 'teamaj_teacherid = teacher_code_id', 'left');
        $this->db->where('teamaj_teacherid !=', $ssn);
        $this->db->group_start();
        for ($i = 0; $i < $count; $i++) {
            $this->db->or_where('teamaj_majorid', $data[$i]);
        }
        $this->db->group_end();
        $query = $this->db->get();

        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Teacher__Specail_Add()
    {
        $ssn = $this->session->ses_id;

        $this->db->select('teacher_code_id, teacher_Tname, teacher_Ename');
        $this->db->from('teacher');
        $this->db->where('teacher_code_id !=', $ssn);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Permission_Add($subject_id, $semester)
    {
        $this->db->select('per_name , per_id');
        $this->db->from('permission');
        $this->db->where('per_subject', $subject_id);
        $this->db->where('per_semester', $semester);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return 0;
        }
    }

    public function Add_data_model($data)
    {
        $this->db->insert('teacher_assist', $data);
    }

    public function Edit_data_model($teacher_org, $permission_org, $data)
    {
        $this->db->where('teaassist_teacherid', $teacher_org);
        $this->db->where('teaassist_permission', $permission_org);
        $this->db->update('teacher_assist', $data);
    }

    public function Delete_Data_model($datatea, $dataper, $subject, $semester)
    {
        // $this->db->where_in('teaassist_teacherid', $datatea);
        // $this->db->where_in('teaassist_permission', $dataper);
        // $this->db->where('teaassist_semester', $semester);
        // $this->db->where('teaassist_subject', $subject);
        // $this->db->delete('teacher_assist');

        // echo count($datatea);
        for ($i = 0; $i < count($datatea); $i++) {
            $this->db->where('teaassist_teacherid', $datatea[$i]);
            $this->db->where('teaassist_permission', $dataper[$i]);
            $this->db->where('teaassist_semester', $semester);
            $this->db->where('teaassist_subject', $subject);
            $this->db->delete('teacher_assist');
        }
    }
}
