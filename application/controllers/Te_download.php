<?php
defined('BASEPATH') or exit('No direct script access allowed');

function convertData($sid)
{
        $str_arr = explode("-", $sid);
        $data = array(
                'subject_id' => $str_arr[0],
                'semester' => $str_arr[1],
                'fileName' => substr($sid, 15),
                'heading' => 'My Heading',
                'message' => 'My Message'
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

class Te_download extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->helper('download');
                $this->load->library('zip');
                $this->load->model('manage_te/Model_te_download');
        }

        public function showMenuDownload($sid)
        {
                $str_arr = explode("-", $sid);
                $data = array(
                        'subject_id' => $str_arr[0],
                        'semester' => $str_arr[1],
                );
                $result = $this->Model_te_download->getMenuDownload($data['subject_id'], $data['semester']);
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
                $result = $this->Model_te_download->getData($data['subject_id'], $data['semester'], $data['menu_id']);
                echo json_encode($result);
        }


        public function dowZip($sid)
        {
                $str_arr = explode("-", $sid);
                $data = array(
                        'subject_id' => $str_arr[0],
                        'semester' => $str_arr[1],
                        'menuId' => $str_arr[2],
                );

                $dir = '/Eclass/uploads/file/' . $data['semester'] . $data['subject_id'] . '/' . 'Uploads' . '/' . $data['menuId'] . '/';
                //$path = '/path/to/your/directory/';

                $this->zip->read_dir($dir, FALSE);
                $this->zip->download('Uploads_' . $data['menuId'] . '.zip');
        }

        public function download($sid)
        {
                $str_arr = explode("-", $sid);
                $count = strlen($str_arr[0] . "-" . $str_arr[1] . "-" . $str_arr[2] . "-");
                $userID = explode("_", $str_arr[3]);
                $data = array(
                        'subject_id' => $str_arr[0],
                        'semester' => $str_arr[1],
                        'menu_id' => $str_arr[2],
                        'fileName' => substr($sid, $count),
                        'userID' => $userID[0]
                );
                $re_lete = $this->Model_te_download->check_file_late($data['semester'], $data['subject_id'], $data['menu_id'], $data['fileName']);
                if ($re_lete) {
                        $filePath = '/Eclass/uploads/file/' . $data['semester'] . $data['subject_id'] . '/' . 'Uploads' . '/' . $data['menu_id'] . '/late//' . $data['userID'] . '/' . $data['fileName'];
                } else {
                        $filePath = '/Eclass/uploads/file/'
                                . $data['semester'] . $data['subject_id'] . '/' . 'Uploads' . '/' . $data['menu_id'] . '/' . $data['userID'] . '/' . $data['fileName'];
                }

                // $getFile = file_get_contents('/Eclass/uploads/file/' . $data['semester'] . $data['subject_id'] . '/' . 'Uploads' . '/' . $data['menu_id'] . '/' . $data['fileName']);
                force_download($data['fileName'], file_get_contents($filePath));
        }

        public function delete($sid)
        {
                $str_arr = explode("-", $sid);
                $count = strlen($str_arr[0] . "-" . $str_arr[1] . "-" . $str_arr[2] . "-");
                $userID = explode("_", $str_arr[3]);
                $data = array(
                        'subject_id' => $str_arr[0],
                        'semester' => $str_arr[1],
                        'menu_id' => $str_arr[2],
                        'fileName' => substr($sid, $count),
                        'userID' => $userID[0]
                );
                // print_r($str_name_arr);
                $re_lete = $this->Model_te_download->check_file_late($data['semester'], $data['subject_id'], $data['menu_id'], $data['fileName']);
                if ($re_lete) {
                        $filePath = '/Eclass/uploads/file/' . $data['semester'] . $data['subject_id'] . '/' . 'Uploads' . '/' . $data['menu_id'] . '/late//' . $data['userID'] . '/' . $data['fileName'];
                } else {
                        $filePath = '/Eclass/uploads/file/' . $data['semester'] . $data['subject_id'] . '/' . 'Uploads' . '/' . $data['menu_id'] . '/' . $data['userID'] . '/' . $data['fileName'];
                }
                if (unlink($filePath)) {
                        $this->Model_te_download->fileDelete($data['subject_id'], $data['semester'], $data['menu_id'], $data['fileName']);
                        return 'deleted successfully';
                } else {
                        return 'errors occured';
                }
                //$getFile = file_get_contents('/Eclass/uploads/file/' . $data['semester'] . $data['subject_id'] . '/' . 'Uploads' . '/' . $data['menu_id'] . '/' . $data['fileName']);
                //force_download($data['fileName'], $getFile);
        }

        private function auto_id_ctl($arg, $arg2)
        {
                return $this->Model_te_download->up_auto_id($arg, $arg2);
        }

        public function create_menu()
        {
                $data = array(
                        'menuUpSemesterId' => $this->input->post('semester'),
                        'menuUpSubjectId' => $this->input->post('subject_id'),
                        'menuUpId' => $this->auto_id_ctl($this->input->post('semester'), $this->input->post('subject_id')),
                        'menuUpName' => $this->input->post('namemenu'),
                        'menuUpDescripition' => $this->input->post('discrip', false),
                        'menuUpTimeStart' => date("Y-m-d H:i:s"),
                        'menuUpTimeEnd' => $this->input->post('date') . ' ' . $this->input->post('time')
                );
                $this->Model_te_download->up_add_menu($data);
        }

        public function editMenu()
        {
                $menuUpSemesterId = $this->input->post('semester');
                $menuUpSubjectId = $this->input->post('subject_id');
                $menuUpId = $this->input->post('editId');
                $menuUpName = $this->input->post('namemenu');
                $menuUpDescripition = $this->input->post('discrip', false);
                $menuUpTimeEnd = $this->input->post('date') . ' ' . $this->input->post('time');

                $this->Model_te_download->editUpMenu($menuUpSemesterId, $menuUpSubjectId, $menuUpId, $menuUpName, $menuUpDescripition, $menuUpTimeEnd);

                $this->update_path_files($menuUpSemesterId, $menuUpSubjectId, $menuUpId);
        }

        private function update_path_files($semester, $subject_id, $editId)
        {
                // echo '<pre>';
                date_default_timezone_set("Asia/Bangkok");
                $time_end = strtotime($this->Model_te_download->update_path_time_end($semester, $subject_id, $editId));
                $all_file = $this->Model_te_download->getData($subject_id, $semester,  $editId);
                foreach ($all_file as $key => $value_file) {
                        echo $value_file->fileTimestamp;
                        // late -> not_late
                        if ($time_end > strtotime($value_file->fileTimestamp)) {
                                if ($value_file->fileLate) {
                                        $dir_old = '/Eclass/uploads/file/' . $semester . $subject_id . '/' . 'Uploads/' . $editId . '/late' . '/' . $value_file->fileUserId;
                                        $dir_new = '/Eclass/uploads/file/' . $semester . $subject_id . '/' . 'Uploads/' . $editId . '/' . $value_file->fileUserId;
                                        if (!is_dir($dir_new)) {
                                                mkdir($dir_new, 0700, true);
                                                chmod($dir_new, 0700);
                                        }
                                        $fileMoved = rename($dir_old.'/'.$value_file->fileName, $dir_new.'/'.$value_file->fileName);

                                        if ($fileMoved) {
                                                $this->Model_te_download->update_status_late($value_file->fileSemesterId, $value_file->fileSubjectId, $value_file->fileMenuUpId, $value_file->fileName, 0);
                                        }
                                }
                        } else {
                                if (!$value_file->fileLate) {
                                        $dir_new  = '/Eclass/uploads/file/' . $semester . $subject_id . '/' . 'Uploads/' . $editId . '/late' . '/' . $value_file->fileUserId;
                                        $dir_old = '/Eclass/uploads/file/' . $semester . $subject_id . '/' . 'Uploads/' . $editId . '/' . $value_file->fileUserId;
                                        if (!is_dir($dir_new)) {
                                                mkdir($dir_new, 0700, true);
                                                chmod($dir_new, 0700);
                                        }
                                        $fileMoved = rename($dir_old.'/'.$value_file->fileName, $dir_new.'/'.$value_file->fileName);

                                        if ($fileMoved) {
                                                $this->Model_te_download->update_status_late($value_file->fileSemesterId, $value_file->fileSubjectId, $value_file->fileMenuUpId, $value_file->fileName, 1);
                                        }
                                }
                        }
                }
                // echo '</pre>';
        }

        public function delMenu()
        { //'&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&pointIndex=' + pointIndex + '&stdId=' + stdId,
                $semester = $this->input->post('semester');
                $subject = $this->input->post('subject');
                $menuID = $this->input->post('menuID');
                $this->Model_te_download->deleteMenu($semester, $subject, $menuID);
                $filePath = '/Eclass/uploads/file/' . $semester . $subject . '/' . 'Uploads' . '/' . $menuID;
                rrmdir($filePath);
        }
}
