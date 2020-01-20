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

function rrmdir($dir)
{
        if (is_dir($dir)) {
                $objects = scandir($dir);
                foreach ($objects as $object) {
                        if ($object != "." && $object != "..") {
                                if (filetype($dir . "/" . $object) == "dir") rrmdir($dir . "/" . $object);
                                else unlink($dir . "/" . $object);
                        }
                }
                reset($objects);
                rmdir($dir);
        }
}

class Te_upload extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('manage_te/Model_te_upload');
        }

        public function check_fileindex(){
                $semester = $this->input->post('data7');
                $subject = $this->input->post('data6');
                $DowId = $this->input->post('data5');
                $_maxIndex = $this->Model_te_upload->maxIndex($semester, $subject, $DowId);
                echo json_encode($_maxIndex);
        }

        public function Upload(/*$sid*/)
        {
                //$data2 = convertData($sid);
                $semester = $this->input->post('data7');
                $subject = $this->input->post('data6');
                $DowId = $this->input->post('data5');
                $data = array(
                        "fileName" => $this->input->post('data1'),
                        "fileSize" => $this->input->post('data2'),
                        //"filePath" => $this->input->post('data3'),
                        "fileType" => $this->input->post('data4'),
                        "fileMenuDowId" => $this->input->post('data5'),
                        "fileSubjectId" => $this->input->post('data6'),
                        "fileSemesterId" => $this->input->post('data7'),
                        "fileUserId" => $this->session->ses_id,
                        "fileIndex" => $this->input->post('data8')
                );
                $this->Model_te_upload->insertUpload($data);
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
                $result = $this->Model_te_upload->getMenuUpload($data['subject_id'], $data['semester']);
                echo json_encode($result);
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
                //$config['upload_path'] = '/Eclass/uploads/file/25611CPEN1010/Uploads/';
                //echo $data2['semester'].$data2['subject_id'];
                $dir = '/Eclass/uploads/file/' . $data2['semester'] . $data2['subject_id'] . '/' . 'Downloads/' . $data2['menuId'];
                if (!is_dir($dir)) {
                        mkdir($dir, 0700, true);
                        chmod($dir, 0700);
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

        private function auto_id_ctl($arg, $arg2)
        {
                return $this->Model_te_upload->dow_auto_id($arg, $arg2);
        }

        public function create_menu()
        {
                $data = array(
                        'menuDowSemesterId' => $this->input->post('semester'),
                        'menuDowSubjectId' => $this->input->post('subject_id'),
                        'menuDowId' => $this->auto_id_ctl($this->input->post('semester'), $this->input->post('subject_id')),
                        'menuDowName' => $this->input->post('menuname'),
                        'menuDowDescrpition' => $this->input->post('descrip')
                );
                $this->Model_te_upload->dow_add_menu($data);
        }

        public function editMenu()
        {
                $menuUpSemesterId = $this->input->post('semester');
                $menuUpSubjectId = $this->input->post('subject_id');
                $menuUpId = $this->input->post('editId');
                $menuUpName = $this->input->post('menuname');
                $menuUpDescripition = $this->input->post('descrip');

                $this->Model_te_upload->editUpMenu($menuUpSemesterId, $menuUpSubjectId, $menuUpId, $menuUpName, $menuUpDescripition);
        }

        public function delMenu()
        { //'&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&pointIndex=' + pointIndex + '&stdId=' + stdId,
                $semester = $this->input->post('semester');
                $subject = $this->input->post('subject');
                $menuID = $this->input->post('menuID');
                $this->Model_te_upload->deleteMenu($semester, $subject, $menuID);
                $filePath = '/Eclass/uploads/file/' . $semester . $subject . '/' . 'Downloads' . '/' . $menuID;
                rrmdir($filePath);
        }

        public function SortMenu()
        {
                $sortMenuIDArray = $this->input->post('sortMenuIDArray[]');
                $ArraySemester = $this->input->post('ArraySemester[]');
                $ArraySubject = $this->input->post('ArraySubject[]');
                // print_r($sortArray);
                $this->Model_te_upload->IndexMenu($sortMenuIDArray, $ArraySemester, $ArraySubject);
        }
}
