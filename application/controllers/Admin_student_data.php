<?php
defined('BASEPATH') or exit('No direct script access allowed');

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

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

    public function Show_Data_faculty()
    {
        $result = $this->Model_su_student_data->Show_Data_faculty_model();
        echo json_encode($result);
    }

    public function Show_Data_Major()
    {
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
        $config['upload_path'] = '/Eclass/uploads/Admin/tmp/';
        $config['allowed_types'] = 'xlsx|csv|xls';
        $config['max_filename'] = '255';
        $config['max_size'] = '2147483648'; //2 GB

        $this->load->library('upload', $config);
        if (!$this->upload->do_upload('file')) {
            echo $this->upload->display_errors();
        } else {
            $filenm = $this->upload->data();
            // $file = fopen($config['upload_path'] . $filenm['file_name'], "r");
            // $flag = false;

            // while (($column = fgetcsv($file, 2048, ",")) !== FALSE) {
            //     foreach (array_keys($column) as $key) {
            //         $current_encoding = mb_detect_encoding($column[$key], "auto");
            //         if ($current_encoding != 'UTF-8') {
            //             $column[$key] = iconv('TIS-620', 'UTF-8', $column[$key]);
            //         }
            //     }
            //     if ($flag) {
            //         //echo $column[0] . ' ' . $column[2] . ' ' . $column[3] . ' ' . $column[4] . ' ' . $column[6] . '<br>';
            //         if ($this->check_duplicate($column[0]) && $this->check_duplicate($column[6])) {
            //             $arg = array(
            //                 'std_code_id' => $column[0],
            //                 'std_Tname' => $column[2],
            //                 'std_Ename' => $column[3],
            //                 'std_email' => $column[6],
            //                 'std_major' => $column[4],
            //                 'std_password' => $this->encryption_pass($column[0])
            //             );
            //             $this->Model_su_student_data->Add_data_model_csv($arg);
            //         }
            //     }
            //     $flag = true;
            // }
            // fclose($file);

            //    $inputFileType = 'Xls';
            //    $inputFileType = 'Xlsx';
            //    $inputFileType = 'Xml';
            //    $inputFileType = 'Ods';
            //    $inputFileType = 'Slk';
            //    $inputFileType = 'Gnumeric';
            //    $inputFileType = 'Csv';

            $inputFileName = $config['upload_path'] . $filenm['file_name'];

            if ($filenm['file_type'] == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                $filetype = 'Xlsx';
            } else if ($filenm['file_type'] == 'application/vnd.ms-excel') {
                $filetype = 'Xls';
            } else if ($filenm['file_type'] == 'text/plain') {
                $filetype = 'Csv';
            } else {
                echo 'Error unknown file_type';
                exit();
            }

            $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($filetype);
            $reader->setReadDataOnly(true);
            $worksheetData = $reader->listWorksheetInfo($inputFileName);
            $spreadsheet = $reader->load($inputFileName);
            $worksheet = $spreadsheet->getActiveSheet();
            $sheet_data = $worksheet->toArray();
            $index_ST_CODE = array_search('ST_CODE', $sheet_data[0]);
            $index_TNAME = array_search('TNAME', $sheet_data[0]);
            $index_ENAME = array_search('ENAME', $sheet_data[0]);
            $index_CRSE_CODE = array_search('CRSE_CODE', $sheet_data[0]);
            $index_EMAIL = array_search('EMAIL', $sheet_data[0]);
            $totalRows = $worksheetData[0]['totalRows'];
            $data_import = [];
            foreach (array_keys($sheet_data) as $key) {
                $arg = array(
                    'std_code_id' => @$sheet_data[$key + 1][$index_ST_CODE],
                    'std_Tname' => @$sheet_data[$key + 1][$index_TNAME],
                    'std_Ename' => @$sheet_data[$key + 1][$index_ENAME],
                    'std_email' => @$sheet_data[$key + 1][$index_EMAIL],
                    'std_major' => @$sheet_data[$key + 1][$index_CRSE_CODE],
                    'std_password' => $this->encryption_pass(@$sheet_data[$key + 1][$index_ST_CODE])
                );
                $res = $this->Model_su_student_data->Add_data_model_csv($arg);
                if ($res) {
                    if ($totalRows == $key + 1) {
                        break;
                    }
                    $arg['line_error'] = $key + 1;
                    $arg['log_error'] = $res;
                    unset($arg['std_password']);
                    array_push($data_import, $arg);
                }
            }
            echo json_encode($data_import);
        }
    }

    public function Add_Data_ctl()
    {
        if ($this->check_duplicate($this->input->post('std_code_id')) && $this->check_duplicate($this->input->post('std_email'))) {
            $arg = array(
                'std_code_id' => $this->input->post('std_code_id'),
                'std_Tname' => $this->input->post('std_Tname'),
                'std_Ename' => $this->input->post('std_Ename'),
                'std_email' => $this->input->post('std_email'),
                'std_major' => $this->input->post('majorSelect'),
                'std_password' => $this->encryption_pass($this->input->post('std_code_id'))
            );
            $this->Model_su_student_data->Add_data_model($arg);
        } else {
            show_error('Duplicate', 409, 'An Error Was Encountered Value is Duplicate');
        }
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

    public function Show_Max_Search_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $result = $this->Model_su_student_data->Show_Max_Search_Data_model($keyword, $type);
        echo json_encode($result);
    }

    public function Search_Show_Data_ctl()
    {
        $keyword = $this->input->post('data');
        $type = $this->input->post('search');
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_student_data->Search_data_model($keyword, $type, $start, $limit);
        echo json_encode($result);
    }

    public function Show_Sort_ctl()
    {
        $data = $this->input->post('data');
        $sort = $this->input->post('sort');
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $result = $this->Model_su_student_data->Show_Sort_model($data, $sort, $start, $limit);
        echo json_encode($result);
    }
}
