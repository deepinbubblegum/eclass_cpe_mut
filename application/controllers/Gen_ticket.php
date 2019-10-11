<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Gen_ticket extends MY_Controller
{

        public function __construct()
        {
                parent::__construct();
                $this->load->model('manage_te/Model_te_ticket');
        }

        private function code_keygen($length)
        {
                $gencode = strtoupper(substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, $length));
                $gencode = str_split($gencode, 4);
                $keygen = implode("-", $gencode);
                return $keygen;
        }

        public function gen_key()
        {
                // for ($i = 0; $i < 10000; $i++) {
                //         echo $this->code_keygen(20);
                //         echo '<br>';
                // }

                
        }

        public function ticket_and_qrCode()
        {
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
                $pdf->SetFont('THSarabunnew', '', 12, '', true);

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
                $title = " วิชา EECP0101\n";
                $name = " Introductioon to Computer...\n";
                $semester = " ประจำภาคการศึกษาที่1/2562\n";
                $lots = " [ชุดที่1]     [1คะแนน]\n";
                $discript = " ทดสอบ\n";
                $key = " รหัส[";
                $item = 27;

                $tic_count = 0;
                $newpagecount = 0;
                $y = 13;
                $pdf->SetLineStyle(array('width' => 0.35, 'cap' => 'butt', 'join' => 'miter', 'dash' => 4, 'color' => array(255, 0, 0)));
                $pdf->AddPage('P', 'A4');
                for ($i = 0; $i < $item; $i++) {
                        $tic_count++;
                        if ($tic_count == 1) {
                                $pdf->MultiCell(62.5, 32, $title . $name . $semester . $lots . $discript . $key . '1KOC-ED9S-BLTW-G4S4-K0OW]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                                $pdf->write2DBarcode('1KOC-ED9S-BLTW-G4S4-K0OW', 'QRCODE,H', 47, $y, 25, 25, $style);
                        } else if ($tic_count == 2) {
                                $pdf->MultiCell(62.5, 32, $title . $name . $semester . $lots . $discript . $key . '1KOC-ED9S-BLTW-G4S4-K0OW]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                                $pdf->write2DBarcode('36DQ-C7VN-OBOK-0WCW-O4OC', 'QRCODE,H', 111, $y, 25, 25, $style);
                        } else if ($tic_count == 3) {
                                $pdf->MultiCell(62.5, 32, $title . $name . $semester . $lots . $discript . $key . 'J74O-PUL1-93C4-W4W8-OG8W]', 1, 'L', false, 1, '', '', true, 0, '', true, 0, 'T', true);
                                $pdf->write2DBarcode('J74O-PUL1-93C4-W4W8-OG8W', 'QRCODE,H', 175, $y, 25, 25, $style);
                                $tic_count = 0;
                                $y = $y + 33.6;
                        }
                        $newpagecount++;
                        if ($newpagecount % 24 == 0) {
                                $pdf->AddPage('P', 'A4');
                                $y = 13;
                        }
                }
                $pdf->Output('_Ticket_QR.pdf', 'I');
        }
}
