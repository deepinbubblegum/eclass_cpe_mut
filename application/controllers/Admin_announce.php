<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin_announce extends MY_Controller
{
        public function __construct()
        {
                parent::__construct();
                $this->load->model('manage_su/Model_su_announce');
        }

        private function auto_id()
        {
                return $this->Model_su_announce->announce_id_auto_model();
        }

        public function Add_Data_ctl()
        {
                // echo $this->input->post('content',false);
                $data = array(
                        'anc_id' => $this->auto_id(),
                        'title' => $this->input->post('title'),
                        'content' => $this->input->post('content',false),
                        'uid_anc_id' => $this->session->ses_id,
                        's_time' => date("Y-m-d H:i:s"),
                        'e_time' => $this->input->post('e_date') .' '. date("H:i:s")
                );
                $this->Model_su_announce->announce_add_model($data);
                echo json_encode(true);
        }

        public function del_data_ctl(){
                $data = $this->input->post('del_anc');
                $this->Model_su_announce->announce_del_model($data);
                echo json_encode(true);
        }

        public function announce_showdata_ctl()
        {
                $result = $this->Model_su_announce->announce_showdata_model();
                echo json_encode($result);
        }

        public function edit_data_ctl()
        {
                $dataid = $this->input->post('dataid');
                $data = array(
                        'title' => $this->input->post('datatitle'),
                        'content' => $this->input->post('content',false),
                        'uid_anc_id' => $this->session->ses_id,
                        'e_time' => $this->input->post('e_date') .' '. date("H:i:s")
                );
                $this->Model_su_announce->announce_edit_model($dataid, $data);
                echo json_encode(true);
        }
}
