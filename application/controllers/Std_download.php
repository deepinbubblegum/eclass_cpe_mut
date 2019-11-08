<?php
defined('BASEPATH') or exit('No direct script access allowed');

function convertData($sid)
{
        $str_arr = explode("-", $sid);
        $data = array(
                'subject_id' => $str_arr[0],
                'semester' => $str_arr[1],
                'fileName' => substr($sid,15),
                'heading' => 'My Heading',
                'message' => 'My Message'
        );
        return $data;
}

class Std_download extends MY_Controller
{
        public function __construct()
        {
            parent::__construct(); 
            $this->load->model('manage_std/Model_std_download');
        }
        
        public function showMenuDownload($sid)
        {
                $str_arr = explode("-", $sid);
                $data = array(
                        'subject_id' => $str_arr[0],
                        'semester' => $str_arr[1], 
                );
                $result = $this->Model_std_download->getMenuDownload($data['subject_id'],$data['semester']);
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
            $result = $this->Model_std_download->getData($data['subject_id'],$data['semester'],$data['menu_id']);
            echo json_encode($result);
        }

        public function download ($sid) {
            $str_arr = explode("-", $sid);
            $count = strlen($str_arr[0]."-".$str_arr[1]."-".$str_arr[2]."-");
            $data = array(
                    'subject_id' => $str_arr[0],
                    'semester' => $str_arr[1],
                    'menu_id' => $str_arr[2],
                    'fileName' => substr($sid,$count),  
            ); 
            $this->load->helper('download'); 
            $this->load->library('zip'); 
            $getFile = file_get_contents('/Eclass/uploads/file/'.$data['semester'].$data['subject_id'].'/'.'Downloads'.'/'.$data['menu_id'].'/'.$data['fileName']);
            force_download($data['fileName'], $getFile); 
        }  
}
