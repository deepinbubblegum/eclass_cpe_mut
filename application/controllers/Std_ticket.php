<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Std_ticket extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manage_std/Model_std_ticket');
    }

    public function getTicket()
    {
        $ticket = $this->input->post('ticket');
        $userId = $this->session->ses_id; 
        $result = $this->Model_std_ticket->checkTicket($ticket,$userId);
        //json_encode($result);
        echo json_encode($result);
    } 
}
