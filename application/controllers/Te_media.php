<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Te_media extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('model_center/Model_media');
        }

        private function auto_id($semester, $subject_id)
        {
                return $this->Model_media->get_auto_id($semester, $subject_id);
        }

        private function generateRandomString($length = 10)
        {
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $charactersLength = strlen($characters);
                $randomString = '';
                for ($i = 0; $i < $length; $i++) {
                        $randomString .= $characters[rand(0, $charactersLength - 1)];
                }
                return $randomString;
        }

        public function show_media()
        {
                $res = $this->Model_media->get_data($this->input->post('subject_id'), $this->input->post('semester'));
                echo json_encode($res);
        }

        public function media_name_dup()
        {
                echo json_encode($this->Model_media->check_name_dup(
                        $this->input->post('semester'),
                        $this->input->post('subject_id'),
                        $this->input->post('name_menu'),
                ));
        }

        public function upload_video_ctl()
        {
                $new_name = $this->generateRandomString(20) . time();
                $type_file = $_FILES['file']['name'];
                $typefile = explode(".", $type_file);
                $typefile = end($typefile);
                // if($typefile != 'mp4'){
                //         $dir = 'media_uploads/video/tmp_video';
                // }else{
                //         $dir = 'media_uploads/video/souce_video';
                // }
                // $dir_video = 'media_uploads/video/souce_video/';
                $dir = 'media_uploads/video/souce_video';
                $config['upload_path'] = $dir;
                $config['allowed_types'] = '*';
                $config['file_name'] = $new_name;
                $config['max_filename'] = '255';
                $config['max_size'] = '2147483648'; //2 GB  
                $config['overwrite'] = TRUE;

                $this->load->library('upload', $config);

                if (!$this->upload->do_upload('file')) {
                        $error = array('error' => $this->upload->display_errors());
                        // echo json_encode($error);
                } else {
                        $data = array('upload_data' => $this->upload->data());
                        // echo json_encode($data);
                }

                // if($typefile != 'mp4'){
                //         shell_exec('ffmpeg -i  '.$dir.'/'.$new_name.'.'.$typefile.' '.$dir_video.$new_name.'.mp4 2>&1');
                //         unlink($dir.'/'.$new_name.'.'.$typefile);
                // }

                $data_media = array(
                        'media_id' => $this->auto_id($this->input->post('semester'), $this->input->post('subject_id')),
                        'media_semester' => $this->input->post('semester'),
                        'media_subject' => $this->input->post('subject_id'),
                        'media_show_name' => $this->input->post('video_name'),
                        'media_detail_txt' => $this->input->post('discription_video'),
                        'media_real_name' => $new_name . '.' . $typefile,
                        'media_type' => 'video'
                );
                $datareturn = $this->Model_media->media_add($data_media);
                echo json_encode($datareturn);

                // $data['ffmpeg'] =  shell_exec('ffmpeg -i '.$dir.'/'.$new_name.'.'.$typefile.' 2>&1');
                // preg_match('/Duration:([^,]+)/',$data['ffmpeg'],$matches);
                // preg_match('/bitrate:([^,]+)/',$data['ffmpeg'],$matches_bitrate);
                // $duration = $matches[1];
                // $data_bitrate = $matches_bitrate[0];
                // $data_video =  explode(':', $duration);
                // $bitrate =  explode(':', $data_bitrate);
                // $bitrate =  explode(' ', $data_bitrate);
                // $seconds = $data_video[0]*3600 + $data_video[1]*60 + $data_video[2];
                // $_data['size'] = (($bitrate[1] * $seconds) / 8) *1024;
                // echo json_encode($_data);
                // $semester = $this->input->post('semester');
                // $subject_id = $this->input->post('subject_id');
                // $_mediaID = $this->auto_id($semester, $subject_id);     
        }

        public function upload_audio_ctl()
        {
                $new_name = $this->generateRandomString(20) . time();
                $type_file = $_FILES['file']['name'];
                $typefile = explode(".", $type_file);
                $typefile = end($typefile);
                // if($typefile != 'mp3'){
                //         $dir = 'media_uploads/audio/tmp_audio';
                // }else{
                //         $dir = 'media_uploads/audio/souce_audio';
                // }
                // $dir_audio = 'media_uploads/audio/souce_audio/';
                $dir = 'media_uploads/audio/souce_audio';
                $config['upload_path'] = $dir;
                $config['allowed_types'] = '*';
                $config['file_name'] = $new_name;
                $config['max_filename'] = '255';
                $config['max_size'] = '2147483648'; //2 GB  
                $config['overwrite'] = TRUE;

                $this->load->library('upload', $config);

                if (!$this->upload->do_upload('file')) {
                        $error = array('error' => $this->upload->display_errors());
                        // echo json_encode($error);
                } else {
                        $data = array('upload_data' => $this->upload->data());
                        // echo json_encode($data);
                }

                // if($typefile != 'mp3'){
                //         shell_exec('ffmpeg -i  '.$dir.'/'.$new_name.'.'.$typefile.' '.$dir_audio.$new_name.'.mp3 2>&1');
                //         unlink($dir.'/'.$new_name.'.'.$typefile);
                // }

                $data_media = array(
                        'media_id' => $this->auto_id($this->input->post('semester'), $this->input->post('subject_id')),
                        'media_semester' => $this->input->post('semester'),
                        'media_subject' => $this->input->post('subject_id'),
                        'media_show_name' => $this->input->post('audio_name'),
                        'media_detail_txt' => $this->input->post('discription_audio'),
                        'media_real_name' => $new_name . '.' . $typefile,
                        'media_type' => 'audio'
                );
                $datareturn = $this->Model_media->media_add($data_media);
                echo json_encode($datareturn);
        }

        public function upload_image_ctl()
        {
                $new_name = $this->generateRandomString(20) . time();
                $type_file = $_FILES['file']['name'];
                $typefile = explode(".", $type_file);
                $typefile = end($typefile);
                // if($typefile != 'jpg'){
                //         $dir = 'media_uploads/image/tmp_image';
                // }else{
                //         $dir = 'media_uploads/image/souce_image';
                // }
                $dir = 'media_uploads/Image/souce_image';
                // $dir_image = 'media_uploads/image/souce_image/';
                $config['upload_path'] = $dir;
                $config['allowed_types'] = '*';
                $config['file_name'] = $new_name;
                $config['max_filename'] = '255';
                $config['max_size'] = '2147483648'; //2 GB  
                $config['overwrite'] = TRUE;

                $this->load->library('upload', $config);

                if (!$this->upload->do_upload('file')) {
                        $error = array('error' => $this->upload->display_errors());
                        // echo json_encode($error);
                } else {
                        $data = array('upload_data' => $this->upload->data());
                        // echo json_encode($data);
                }

                // if($typefile != 'jpg'){
                //         shell_exec('ffmpeg -i  '.$dir.'/'.$new_name.'.'.$typefile.' '.$dir_image.$new_name.'.jpg 2>&1');
                //         unlink($dir.'/'.$new_name.'.'.$typefile);
                // }

                $data_media = array(
                        'media_id' => $this->auto_id(
                                $this->input->post('semester'),
                                $this->input->post('subject_id')
                        ),
                        'media_semester' => $this->input->post('semester'),
                        'media_subject' => $this->input->post('subject_id'),
                        'media_show_name' => $this->input->post('image_name'),
                        'media_detail_txt' => $this->input->post('discription_image'),
                        'media_real_name' => $new_name . '.' . $typefile,
                        'media_type' => 'image'
                );
                $datareturn = $this->Model_media->media_add($data_media);
                echo json_encode($datareturn);
        }

        public function del_media_ctl()
        {
                $datareturn = $this->Model_media->media_del($this->input->post('delete_id'));
                echo json_encode($datareturn);
        }


        public function get_edit()
        {
                $return_media = $this->Model_media->get_data_edit(
                        $this->input->post('edit_id'),
                        $this->input->post('semester'),
                        $this->input->post('subject_id')
                );
                echo json_encode($return_media);
        }

        public function edit_update_data()
        {
                $data_edit = array(
                        'media_show_name' =>  $this->input->post('edit_name'),
                        'media_detail_txt' =>  $this->input->post('discription'),
                );
                $return_media_edit = $this->Model_media->edit_update_md(
                        $this->input->post('edit_id'),
                        $this->input->post('semester'),
                        $this->input->post('subject_id'),
                        $data_edit
                );
                echo json_encode($return_media_edit);
        }
}