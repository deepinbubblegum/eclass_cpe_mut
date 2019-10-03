<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Te_video extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('manage_te/Model_te_video');
        }

        private function auto_id_ctl($arg, $arg2)
        {
                return $this->Model_te_video->auto_id_ml($arg, $arg2);
        }

        public function addmenu_video()
        {
                $data = array(
                        'video_semester' => $this->input->post('semester'),
                        'video_subject' => $this->input->post('subject_id'),
                        'video_id' => $this->auto_id_ctl($this->input->post('semester'), $this->input->post('subject_id')),
                        'video_name' => $this->input->post('menu_video'),
                        'video_discription' => $this->input->post('discrip'),
                        'video_timestamp' => date("Y-m-d H:i:s")
                );
                $this->Model_te_video->add_menu_ml($data);
        }

        public function show_menu_video_up()
        {
                $semester = $this->input->post('semester');
                $subject_id = $this->input->post('subject_id');
                $result = $this->Model_te_video->get_data_menu($semester, $subject_id);
                echo json_encode($result);
        }

        public function Upload($sid)
        {
                $data2 = convertData($sid);
                $data = array(
                        "fileName" => $this->input->post('data1'),
                        "fileSize" => $this->input->post('data2'),
                        "filePath" => $this->input->post('data3'),
                        "fileType" => $this->input->post('data4'),
                        "fileMenuDowId" => $this->input->post('data5'),
                        "fileSubjectId" => $this->input->post('data6'),
                        "fileSemesterId" => $this->input->post('data7'),
                );
                $this->Model_te_upload->insertUpload($data);
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
                //$config['upload_path'] = '../uploads/file/25611CPEN1010/Uploads/';
                //echo $data2['semester'].$data2['subject_id'];
                $dir = '../uploads/file/' . $data2['semester'] . $data2['subject_id'] . '/' . 'Downloads/' . $data2['menuId'];
                if (!is_dir($dir)) {
                        mkdir($dir, 0777, true);
                        chmod($dir, 0777);
                }
                $config['upload_path'] = $dir;
                $config['allowed_types'] = '*';
                $config['max_filename'] = '255';
                $config['max_size'] = '2147483648'; //2 GB  
                $config['overwrite'] = TRUE;

                $this->load->library('upload', $config);
                $count = count($_FILES['file']['name']);
                for ($i = 0; $i < $count; $i++) {
                        //$udata = null;
                        $pseudo_field_name = '_psuedo_' . 'file' . '_' . $i;
                        $_FILES[$pseudo_field_name] = array(
                                'name' => str_replace(" ", "_", $_FILES['file']['name'][$i]),
                                'size' => $_FILES['file']['size'][$i],
                                'type' => $_FILES['file']['type'][$i],
                                'tmp_name' => $_FILES['file']['tmp_name'][$i],
                                'error' => $_FILES['file']['error'][$i]
                        );


                        if (!$this->upload->do_upload($pseudo_field_name)) {
                                $this->upload->display_errors();
                        } else {
                                $this->upload->data();
                        }
                }
        }
}
