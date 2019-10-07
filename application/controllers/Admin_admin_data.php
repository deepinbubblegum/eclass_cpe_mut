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

    // public function Add_Data_ctl_csv()
    // {
    //     $config['upload_path'] = '../uploads/Admin/tmp/';
    //     $config['allowed_types'] = 'csv';
    //     $config['max_filename'] = '255';
    //     $config['max_size'] = '2147483648'; //2 GB

    //     $this->load->library('upload', $config);
    //     if (!$this->upload->do_upload('file')) {
    //         echo $this->upload->display_errors();
    //     } else {
    //         $filenm = $this->upload->data();
    //         $file = fopen($config['upload_path'] . $filenm['file_name'], "r");
    //         $flag = false;
    //         while (($column = fgetcsv($file, 1024, ",")) !== FALSE) {
    //             foreach (array_keys($column) as $key) {
    //                 $current_encoding = mb_detect_encoding($column[$key], "auto");
    //                 if ($current_encoding != 'UTF-8') {
    //                     $column[$key] = iconv('TIS-620', 'UTF-8', $column[$key]);
    //                 }
    //             }
    //             if ($flag) {
    //                 // echo $column[0] . ' ' . $column[2] . ' ' . $column[3] . ' ' . $column[4] . ' ' . $column[6] . '<br>';
    //                 $salt_rd = bin2hex(openssl_random_pseudo_bytes(2));
    //                 $arg = array(
    //                     'admin_id' => $column[0],
    //                     'admin_Tname' => $column[2],
    //                     'admin_Ename' => $column[3],
    //                     'admin_email' => $column[6],
    //                 );
    //                 $arg2 = array(
    //                     'adminname' => $column[0],
    //                     'data_id_admin' => $column[0],
    //                     'salt' => $salt_rd,
    //                     'password' => sha1($salt_rd . $column[0])
    //                 );
    //                 $this->Model_su_admin_data->Add_data_model_csv($arg, $arg2);
    //             }
    //             $flag = true;
    //         }
    //     }
    // }

    public function Add_Data_ctl()
    {
        // $salt_rd = bin2hex(openssl_random_pseudo_bytes(2));
        if ($this->check_duplicate($this->input->post('admin_id')) && $this->check_duplicate($this->input->post('admin_email'))){
            $arg = array(
                'admin_id' => $this->input->post('admin_id'),
                'admin_password' => $this->encryption_pass($this->input->post('admin_id')),
                'admin_Tname' => $this->input->post('admin_Tname'),
                'admin_Ename' => $this->input->post('admin_Ename'),
                'admin_email' => $this->input->post('admin_email')
            );
            $this->Model_su_admin_data->Add_data_model($arg);
        }else{
            show_error('Duplicate', 409, 'An Error Was Encountered Value is Duplicate');
        }
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
        $data = $this->input->post('$data[]');
        $this->Model_su_admin_data->Delete_Data_model($data);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $result = $this->Model_su_admin_data->Search_data_model($keyword, $type);
        echo json_encode($result);
    }
}
