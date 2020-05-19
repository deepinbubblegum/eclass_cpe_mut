<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Gen_ticket extends MY_Controller
{

        public function __construct()
        {
                parent::__construct();
                if ($this->session->ses_status != 'teacher' && $this->session->ses_status != 'admin') {
                        show_404();
                }
                $this->load->model('manage_te/Model_te_ticket');
        }

        private function code_keygen($length)
        {
                $gencode = strtoupper(substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, $length));
                $gencode = str_split($gencode, 4);
                $keygen = implode("-", $gencode);
                return $keygen;
        }

        private function lot_auto_id()
        {
                return $this->Model_te_ticket->auto_lot_id();
        }

        public function gen_key()
        {
                // for ($i = 0; $i < 10000; $i++) {
                //         echo $this->code_keygen(20);
                //         echo '<br>';
                // }
                $auto_lot_id = $this->lot_auto_id();
                $data_menu_ticket = array(
                        'lot_id' => $auto_lot_id,
                        'lot_semester' => $this->input->post('semester'),
                        'lot_subject' => $this->input->post('subject'),
                        'lot_menu' => $this->input->post('childTK'),
                        'lot_field' => $this->input->post('parentTK'),
                        'lot_description' => $this->input->post('ticket_discrip')
                );
                $this->Model_te_ticket->add_lot($data_menu_ticket);

                $item_num = $this->input->post('ticketNumber');
                $semester = $this->input->post('semester');
                $subject = $this->input->post('subject');
                $parentTK = $this->input->post('childTK');
                $childTK = $this->input->post('parentTK');
                $ticket_point = $this->input->post('ticket_point');
                for ($i = 1; $i <= $item_num; $i++) {
                        $data_ticket = array(
                                'token' => $this->code_keygen(20),
                                'semester' => $semester,
                                'subject' => $subject,
                                'pointMenu' => $parentTK,
                                'pointField' => $childTK,
                                'point' => $ticket_point,
                                'ticketLots' => $auto_lot_id
                        );
                        $this->Model_te_ticket->add_ticket($data_ticket);
                }
                echo json_encode($auto_lot_id);
        }

        public function ticket_and_qrCode($arg = null)
        {
                $ticket_data = $this->Model_te_ticket->get_ticket($arg);


                $this->load->library('Pdf');

                // สร้าง object สำหรับใช้สร้าง pdf 
                $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

                // กำหนดรายละเอียดของ pdf
                $pdf->SetCreator(PDF_CREATOR);
                $pdf->SetAuthor(base_url());
                $pdf->SetTitle(base_url());
                $pdf->SetSubject('Barcode generator');
                $pdf->SetKeywords('Barcode, PDF, generator, IDBarcode, IDGenerator');

                // remove default header/footer
                $pdf->setPrintHeader(false);
                $pdf->setPrintFooter(false);

                // set default font subsetting mode
                $pdf->setFontSubsetting(true);

                // set margins
                $pdf->SetMargins(9, 12, 9);

                // set auto page breaks
                $pdf->SetAutoPageBreak(true, 9);

                // กำหนดฟอนท์ 
                // ฟอนท์ THSarabunnew รองรับภาษาไทย
                $pdf->SetFont('THSarabunnew', '', 16, '', true);

                // สามารถปรับรูปแบบA4
                // $pdf->AddPage('P', 'A4');

                // set cell padding
                $pdf->setCellPaddings(0.5, 0.5, 0.5, 0.5);

                // set cell margins
                $pdf->setCellMargins(0.8, 0.8, 0.8, 0.8);

                // new style
                $style = array(
                        'border' => false,
                        'padding' => 1,
                        'fgcolor' => array(0, 0, 0),
                        'bgcolor' => false
                );

                // set some text for example
                $title = " วิชา " . $ticket_data[0]['lot_subject'] . "\n";
                $name = " ";
                if (strlen($ticket_data[0]['subject_name']) > 25) {
                        $name = $name . substr_replace($ticket_data[0]['subject_name'], '…', 25) . "\n";
                } else {
                        $name = " " . $ticket_data[0]['subject_name'] . "\n";
                }
                $lot_semester = str_split($ticket_data[0]['lot_semester']);

                $semester = " ประจำภาคการศึกษาที่ " . $lot_semester[4] . "/" . substr($ticket_data[0]['lot_semester'], 0, 4) . "\n";
                $lots = " [ชุดที่" . (int) substr($arg, 4) . "] ";
                $tic_point = "[" . number_format((float)$ticket_data[0]['point'], 2, '.', '') . " คะแนน]\n";

                $discript = " " . $ticket_data[0]['lot_description'] . "\n";
                $key = " รหัส [";
                $item = count($ticket_data);
                // $pdf->WriteHTML();
                $tic_count = 0;
                $newpagecount = 0;
                $tic_count_lot = 0;
                $y = 13;
                $pdf->SetLineStyle(array('width' => 0.35, 'cap' => 'butt', 'join' => 'miter', 'dash' => 4, 'color' => array(255, 0, 0)));
                $pdf->AddPage('P', 'A4');
                for ($i = 0; $i < $item; $i++) {
                        $tic_count++;
                        $tic_count_lot++;
                        if ($tic_count == 1) {
                                $pdf->MultiCell(46, 26, $title . $name . $semester . $lots . '[ใบที่ ' . $tic_count_lot . '/' . $item . ']' . $tic_point . $discript . $key . $ticket_data[$i]['token'] . ']', true, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                                $pdf->write2DBarcode($ticket_data[$i]['token'], 'QRCODE,H', 40.5, $y, 15, 15, $style);
                        } else if ($tic_count == 2) {
                                $pdf->MultiCell(46, 26, $title . $name . $semester . $lots . '[ใบที่ ' . $tic_count_lot . '/' . $item . ']' . $tic_point . $discript . $key . $ticket_data[$i]['token'] . ']', true, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                                $pdf->write2DBarcode($ticket_data[$i]['token'], 'QRCODE,H', 88, $y, 15, 15, $style);
                        } else if ($tic_count == 3) {
                                $pdf->MultiCell(46, 26, $title . $name . $semester . $lots . '[ใบที่ ' . $tic_count_lot . '/' . $item . ']' . $tic_point . $discript . $key . $ticket_data[$i]['token'] . ']', true, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                                $pdf->write2DBarcode($ticket_data[$i]['token'], 'QRCODE,H', 135.5, $y, 15, 15, $style);
                        } else if ($tic_count == 4) {
                                $pdf->MultiCell(46, 26, $title . $name . $semester . $lots . '[ใบที่ ' . $tic_count_lot . '/' . $item . ']' . $tic_point . $discript . $key . $ticket_data[$i]['token'] . ']', true, 'L', false, 1, '', '', true, 0, '', true, 0, 'T', true);
                                $pdf->write2DBarcode($ticket_data[$i]['token'], 'QRCODE,H', 183, $y, 15, 15, $style);
                                $tic_count = 0;
                                $y = $y + 27.6;
                        }
                        $newpagecount++;
                        if ($newpagecount % 40 == 0) {
                                $pdf->AddPage('P', 'A4');
                                $y = 13;
                        }
                }
                $pdf->Output('_Ticket_QR.pdf', 'I');
        }
}
