<?php
defined('BASEPATH') or exit('No direct script access allowed');

function convertData($sid)
{
        $str_arr = explode("-", $sid);
        $data = array(
                'subject_id' => $str_arr[0],
                'semester' => $str_arr[1],
                //'menuId' => $str_arr[3],
                //'heading' => 'My Heading',
                //'message' => 'My Message'
        );
        return $data;
}

class Std_upload extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('manage_std/Model_std_upload');
        }
        public function Upload(/*$sid*/)
        {
                // $result = $this->check_late($this->input->post('data7'),$this->input->post('data6'),$this->input->post('data5'));
                // if($result){
                //         $late = 1;
                // }else{
                //         $late = 0;
                // }
                //$data2 = convertData($sid);
                // $data = array(
                //         "fileName" => $this->session->ses_id.'_'.$this->input->post('data1'),
                //         "fileSize" => $this->input->post('data2'),
                //         //"filePath" => $this->input->post('data3'),
                //         "fileType" => $this->input->post('data4'),
                //         "fileMenuUpId" => $this->input->post('data5'),
                //         "fileUserId" => $this->session->ses_id,
                //         "fileSubjectId" => $this->input->post('data6'),
                //         "fileSemesterId" => $this->input->post('data7'),
                //         "fileTimestamp" => date("Y-m-d H:i:s"),
                //         "fileLate" => $late
                // );    
                // fileSubjectId char(10) NOT NULL,
                // fileSemesterId char(5) NOT NULL, 
                // fileMenuUpId char(10) NOT NULL,
                // fileName varchar(255) NOT NULL,
                // fileSize varchar(255) NOT NULL,
                // fileType varchar(255),
                // filePath varchar(255) NOT NULL,
                
               
        }

        public function showMenuUpload($sid)
        {
                $str_arr = explode("-", $sid);
                $data = array(
                        'subject_id' => $str_arr[0],
                        'semester' => $str_arr[1],
                        //'menuId' => $str_arr[3],
                        //'heading' => 'My Heading',
                        //'message' => 'My Message'
                );
            $result = $this->Model_std_upload->getMenuUpload($data['subject_id'],$data['semester']);
            echo json_encode($result);
        }
        
        private function check_late($semester,$subject_id,$menuId)
        {
                $result = $this->Model_std_upload->ck_late_model($semester,$subject_id,$menuId);
                return $result;
        }

        public function UploadFile($sid)
        {
                $str_arr = explode("-", $sid);
                $data2 = array(
                        'subject_id' => $str_arr[0],
                        'semester' => $str_arr[1],
                        'menuId' => $str_arr[2],
                        //'heading' => 'My Heading',
                        //'message' => 'My Message'
                );
                 
                $result = $this->check_late($data2['semester'],$data2['subject_id'],$data2['menuId']);
                if($result){
                        $dir ='/Eclass/uploads/file/'.$data2['semester'].$data2['subject_id'].'/'.'Uploads/'.$data2['menuId'].'/'.$this->session->ses_id;
                        if (!is_dir($dir)) {
                                mkdir($dir, 0700, true); 
                                chmod($dir, 0700); 
                        }
                        $late = 0;
                }else{
                        $dir ='/Eclass/uploads/file/'.$data2['semester'].$data2['subject_id'].'/'.'Uploads/'.$data2['menuId'].'/late'.'/'.$this->session->ses_id;
                        if (!is_dir($dir)) {
                                mkdir($dir, 0700, true); 
                                chmod($dir, 0700);
                        }
                        $late = 1;
                }
                //$config['upload_path'] = '/Eclass/uploads/file/25611CPEN1010/Uploads/';
                //echo $data2['semester'].$data2['subject_id'];
                $config['upload_path'] = $dir;
                $config['allowed_types'] = '*';
                $config['max_filename'] = '255';
                $config['max_size'] = '2147483648'; //2 GB  
                $config['overwrite'] = false;
                $this->load->library('upload', $config); 
                $count = count($_FILES['file']['name']);
                for ($i = 0; $i < $count; $i++) {
                    //$udata = null;
                    $pseudo_field_name = '_psuedo_'. 'file' .'_'. $i;
                    $_FILES[$pseudo_field_name] = array(
                        'name' => $this->session->ses_id.'_'.str_replace(" ","_",$_FILES['file']['name'][$i]),
                        'size' => $_FILES['file']['size'][$i], 
                        'type' => $_FILES['file']['type'][$i],
                        'tmp_name' => $_FILES['file']['tmp_name'][$i],
                        'error' => $_FILES['file']['error'][$i]
                    );

                    if ( ! $this->upload->do_upload($pseudo_field_name) ) {
                        //     echo $pseudo_field_name;
                        $this->upload->display_errors();
                    } else {
                        $upload_data = $this->upload->data();
                        $file_name = $upload_data['file_name'];
                        // echo $file_name;
                        $database = array(
                                "fileName" => $file_name,
                                "fileSize" => $this->input->post('data2'),
                                //"filePath" => $this->input->post('data3'),
                                "fileType" => $this->input->post('data4'),
                                "fileMenuUpId" => $this->input->post('data5'),
                                "fileUserId" => $this->session->ses_id,
                                "fileSubjectId" => $this->input->post('data6'),
                                "fileSemesterId" => $this->input->post('data7'),
                                "fileTimestamp" => date("Y-m-d H:i:s"),
                                "fileLate" => $late
                        );
                        $this->Model_std_upload->insertUpload($database);
                    } 
                } 
        }

        public function showMenuUpload_files($sid)
        {
                $str_arr = explode("-", $sid);
                $data = array(
                        'subject_id' => $str_arr[0],
                        'semester' => $str_arr[1],
                );
                $result = $this->Model_std_upload->getMenuUpload_files($data['subject_id'], $data['semester']);
                echo json_encode($result);
        }

        public function showDownloadList($sid)
        {
                $str_arr = explode("-", $sid);
                $data = array(
                        'subject_id' => $str_arr[0],
                        'semester' => $str_arr[1],
                'menu_id' => $str_arr[2]
                );
                $result = $this->Model_std_upload->getData($data['subject_id'], $data['semester'], $data['menu_id'], $this->session->ses_id);
                echo json_encode($result);
        }
}
