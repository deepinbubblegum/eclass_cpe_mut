<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Teacher_add_student extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_te/Model_te_add_student');
    }

    public function Show_Max_Data_ctl()
    {
        $subject_id = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $result = $this->Model_te_add_student->Show_Max_Data_model($subject_id, $semester);
        echo json_encode($result);
    }

    public function Show_Data_ctl()
    {
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $subject_id = $this->input->post('subject_id');
        $semester = $this->input->post('semester');
        $result = $this->Model_te_add_student->Show_Data_user_data_model($limit, $start, $subject_id, $semester);
        echo json_encode($result);
    }

    public function Add_Data_ctl_csv()
    {
        $dir = '../uploads/file/'.$this->input->post('semester').$this->input->post('subject_id'); 
        $config['upload_path'] = $dir.'/CSV/';
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
                    echo $column[0] . ' ' . $column[2] . ' ' . $column[3] . ' ' . $column[4] . ' ' . $column[6] . '<br>';
                    $data = array(
                        'substd_stdid' => $column[0],
                        'substd_semester' => $this->input->post('semester'),
                        'substd_subject'=> $this->input->post('subject_id'),
                        'substd_sec' => $column[5]
                    );
                    $this->Model_te_add_student->Add_data_model_csv($data);
                }
                $flag = true;
            }
        }
    }

    public function Add_Data_ctl()
    {
        $arg = array(
                'substd_stdid' => $this->input->post('substd_stdid'),
                'substd_semester' => $this->input->post('semester'),
                'substd_subject'=> $this->input->post('subject_id'),
                'substd_sec' => $this->input->post('substd_sec')
        );
        $this->Model_te_add_student->Add_data_model($arg);
    }

    public function Delete_Data_ctl()
    {
        $data = $this->input->post('_deldata[]');
        $data2 = $this->input->post('subject_id[]');
        $data3 = $this->input->post('semester[]');
        $this->Model_te_add_student->Delete_Data_model($data,$data2,$data3);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('search');
        $type = $this->input->post('select_search');
        $result = $this->Model_te_add_student->Search_data_model($keyword, $type);
        echo json_encode($result);
    }
}
