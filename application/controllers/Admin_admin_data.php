<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin_admin_data extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_su/Model_su_admin_data');
    }

    public function Show_Max_Data_ctl()
    {
        $result = $this->Model_su_admin_data->Show_Max_Data_model();
        echo json_encode($result);
    }

    public function Show_Data_ctl()
    {
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_admin_data->Show_Data_admin_data_model($limit, $start);
        echo json_encode($result);
    }

    public function Add_Data_ctl()
    {
        // $salt_rd = bin2hex(openssl_random_pseudo_bytes(2));
        // if ($this->check_duplicate($this->input->post('admin_id')) && $this->check_duplicate($this->input->post('admin_email'))){
        //     $arg = array(
        //         'admin_id' => $this->input->post('admin_id'),
        //         'admin_password' => $this->encryption_pass($this->input->post('admin_id')),
        //         'admin_Tname' => $this->input->post('admin_Tname'),
        //         'admin_Ename' => $this->input->post('admin_Ename'),
        //         'admin_email' => $this->input->post('admin_email')
        //     );
        //     $this->Model_su_admin_data->Add_data_model($arg);
        // }else{
        //     show_error('Duplicate', 409, 'An Error Was Encountered Value is Duplicate');
        // }
        $data = $this->input->post('data');
        $arg = array(
            'teacher_admin' => '1',
        );
        $this->Model_su_admin_data->Add_data_model($data, $arg);
    }

    public function Edit_Data_ctl()
    {
        $org_id = $this->input->post('org_id');
        $data = array(
            'admin_id' => $this->input->post('admin_id'),
            'admin_password' => $this->encryption_pass($this->input->post('admin_id')),
            'admin_Tname' => $this->input->post('admin_Tname'),
            'admin_Ename' => $this->input->post('admin_Ename'),
            'admin_email' => $this->input->post('admin_email')
        );
        $this->Model_su_admin_data->Edit_data_model($org_id, $data);
    }

    public function Delete_Data_ctl()
    {
        $arg = array(
            'teacher_admin' => '0',
        );
        $data = $this->input->post('$data[]');
        $this->Model_su_admin_data->Delete_Data_model($data, $arg);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $result = $this->Model_su_admin_data->Search_data_model($keyword, $type);
        echo json_encode($result);
    }

    public function Show_Sort_ctl()
    {
        $data = $this->input->post('data');
        $sort = $this->input->post('sort');
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_admin_data->Show_Sort_model($data, $sort, $start, $limit);
        echo json_encode($result);
    }
}
