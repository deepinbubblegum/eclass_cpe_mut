<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin_user_data extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_su/Model_su_user_data');
    }

    public function Show_Max_Data_ctl()
    {
        $result = $this->Model_su_user_data->Show_Max_Data_model();
        echo json_encode($result);
    }

    public function Show_Data_ctl()
    {
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_user_data->Show_Data_user_data_model($limit, $start);
        echo json_encode($result);
    }

    public function Add_Data_ctl_csv()
    {
        $config['upload_path'] = '../uploads/Admin/tmp/';
        $config['allowed_types'] = 'csv';
        $config['max_filename'] = '255';
        $config['max_size'] = '2147483648'; //2 GB

        $this->load->library('upload', $config);
        if (!$this->upload->do_upload('file')) {
            echo $this->upload->display_errors();
        } else {
            $filenm = $this->upload->data();
            $file = fopen($config['upload_path'] . $filenm['file_name'], "r");
            $flag = false;
            while (($column = fgetcsv($file, 1024, ",")) !== FALSE) {
                foreach (array_keys($column) as $key) {
                    $current_encoding = mb_detect_encoding($column[$key], "auto");
                    if ($current_encoding != 'UTF-8') {
                        $column[$key] = iconv('TIS-620', 'UTF-8', $column[$key]);
                    }
                }
                if ($flag) {
                    // echo $column[0] . ' ' . $column[2] . ' ' . $column[3] . ' ' . $column[4] . ' ' . $column[6] . '<br>';
                    $salt_rd = bin2hex(openssl_random_pseudo_bytes(2));
                    $arg = array(
                        'user_code_id' => $column[0],
                        'user_Tname' => $column[2],
                        'user_Ename' => $column[3],
                        'user_email' => $column[6],
                        'user_major' => $column[4],
                        'user_permission' => $this->input->post('permission')
                    );
                    $arg2 = array(
                        'username' => $column[0],
                        'data_id_user' => $column[0],
                        'salt' => $salt_rd,
                        'password' => sha1($salt_rd . $column[0])
                    );
                    $this->Model_su_user_data->Add_data_model_csv($arg, $arg2);
                }
                $flag = true;
            }
        }
    }

    public function Add_Data_ctl()
    {
        $salt_rd = bin2hex(openssl_random_pseudo_bytes(2));

        $arg = array(
            'user_code_id' => $this->input->post('user_code_id'),
            'user_Tname' => $this->input->post('user_Tname'),
            'user_Ename' => $this->input->post('user_Ename'),
            'user_email' => $this->input->post('user_email'),
            'user_major' => $this->input->post('user_major'),
            'user_permission' => $this->input->post('user_permission')
        );
        $arg2 = array(
            'username' => $this->input->post('user_code_id'),
            'data_id_user' => $this->input->post('user_code_id'),
            'salt' => $salt_rd,
            'password' => sha1($salt_rd . $this->input->post('user_code_id'))
        );
        $this->Model_su_user_data->Add_data_model($arg, $arg2);
    }

    public function Edit_Data_ctl()
    {
        $org_id = $this->input->post('org_id');
        $data = array(
            'user_code_id' => $this->input->post('user_code_id'),
            'user_Tname' => $this->input->post('user_Tname'),
            'user_Ename' => $this->input->post('user_Ename'),
            'user_email' => $this->input->post('user_email'),
            'user_major' => $this->input->post('user_major'),
            'user_permission' => $this->input->post('user_permission')
        );
        $this->Model_su_user_data->Edit_data_model($org_id, $data);
    }

    public function Delete_Data_ctl()
    {
        $data = $this->input->post('$data[]');
        $this->Model_su_user_data->Delete_Data_model($data);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $result = $this->Model_su_user_data->Search_data_model($keyword, $type);
        echo json_encode($result);
    }
}
