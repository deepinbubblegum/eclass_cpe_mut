<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin_student_data extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_su/Model_su_student_data');
    }

    public function Show_Max_Data_ctl()
    {
        $result = $this->Model_su_student_data->Show_Max_Data_model();
        echo json_encode($result);
    }

    public function Show_Data_faculty(){
        $result = $this->Model_su_student_data->Show_Data_faculty_model();
        echo json_encode($result);
    }

    public function Show_Data_Major(){
        $facuty = $this->input->post('facultySelect');
        $result = $this->Model_su_student_data->Show_Data_Major_model($facuty);
        echo json_encode($result);
    }

    public function Show_Data_ctl()
    {
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_student_data->Show_Data_student_data_model($limit, $start);
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
            while (($column = fgetcsv($file, 2048, ",")) !== FALSE) {
                foreach (array_keys($column) as $key) {
                    $current_encoding = mb_detect_encoding($column[$key], "auto");
                    if ($current_encoding != 'UTF-8') {
                        $column[$key] = iconv('TIS-620', 'UTF-8', $column[$key]);
                    }
                }
                if ($flag) {
                    //echo $column[0] . ' ' . $column[2] . ' ' . $column[3] . ' ' . $column[4] . ' ' . $column[6] . '<br>';
                    $arg = array(
                        'std_code_id' => $column[0],
                        'std_Tname' => $column[2],
                        'std_Ename' => $column[3],
                        'std_email' => $column[6],
                        'std_major' => $column[4],
                        'std_password' => $this->encryption_pass($column[0])
                    );
                    $this->Model_su_student_data->Add_data_model_csv($arg);
                }
                $flag = true;
            }
            fclose($file);
        }
    }

    public function Add_Data_ctl()
    {
        $arg = array(
            'std_code_id' => $this->input->post('std_code_id'),
            'std_Tname' => $this->input->post('std_Tname'),
            'std_Ename' => $this->input->post('std_Ename'),
            'std_email' => $this->input->post('std_email'),
            'std_major' => $this->input->post('majorSelect'),
            'std_password' => $this->encryption_pass($this->input->post('std_code_id'))
        );
        $this->Model_su_student_data->Add_data_model($arg);
    }

    public function Edit_Data_ctl()
    {
        $org_id = $this->input->post('org_id');
        $data = array(
            'std_code_id' => $this->input->post('std_code_id'),
            'std_Tname' => $this->input->post('std_Tname'),
            'std_Ename' => $this->input->post('std_Ename'),
            'std_email' => $this->input->post('std_email'),
            'std_major' => $this->input->post('majorSelect'),
        );
        $this->Model_su_student_data->Edit_data_model($org_id, $data);
    }

    public function Delete_Data_ctl()
    {
        $data = $this->input->post('$data[]');
        $this->Model_su_student_data->Delete_Data_model($data);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $result = $this->Model_su_student_data->Search_data_model($keyword, $type);
        echo json_encode($result);
    }
}
