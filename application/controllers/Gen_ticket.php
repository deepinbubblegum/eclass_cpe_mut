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
                for ($i = 0; $i < 10000; $i++) {
                        echo $this->code_keygen(20);
                        echo '<br>';
                }
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

                // กำหนดฟอนท์ 
                // ฟอนท์ THSarabunnew รองรับภาษาไทย
                $pdf->SetFont('THSarabunnew', '', 12, '', true);

                // สามารถปรับรูปแบบA4
                $pdf->AddPage('P', 'A4');

                // set cell padding
                $pdf->setCellPaddings(0.5, 0.5, 0.5, 0.5);

                // set cell margins
                $pdf->setCellMargins(0.5, 0.8, 0.5, 0.75);

                // $code,
                // $type,
                // $x = '',
                // $y = '',
                // $w = '',
                // $h = '',
                // $style = array(),
                // $align = '',
                // $distort = false
                // QRCODE,H : QR-CODE Best error correction

                // set some text for example
                $title = " วิชา EECP0101\n";
                $name = " Introductioon to Computer...\n";
                $semester = " ประจำภาคการศึกษาที่1/2562\n";
                $lots = " [ชุดที่1]     [1คะแนน]\n";
                $discript = " ทดสอบ\n";
                $key = " รหัส[";
                $pdf->SetLineStyle(array('width' => 0.5, 'cap' => 'butt', 'join' => 'miter', 'dash' => 4, 'color' => array(255, 0, 0)));
                // Multicell test

                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '1KOC-ED9S-BLTW-G4S4-K0OW]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '36DQ-C7VN-OBOK-0WCW-O4OC]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . 'J74O-PUL1-93C4-W4W8-OG8W]', 1, 'L', false, 1, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '430N-10U5-35OG-S04G-C80W]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '2QQA-ROIH-AIUC-O484-W44G]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . 'EPFG-0RWS-QQGC-8G48-G40C]', 1, 'L', false, 1, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . 'QE0O-CSDB-BK0W-K0G4-SWK4]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . 'KAUP-F9X3-A800-WKGO-OOG0]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '3XC3-N8CF-KQYO-SSS8-GG8K]', 1, 'L', false, 1, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '3LPQ-VAYI-KPC0-CG8G-08OK]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '9DE0-G1T4-VDC8-CO4G-48KC]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '8M7K-9SVM-57OK-0O0S-KK4C]', 1, 'L', false, 1, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '2ETN-6OIP-60W0-GW0G-WK0C]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '70E3-OQ6G-NWG0-0OCO-SCW0]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '16MU-TTU6-456O-WOGC-SWWO]', 1, 'L', false, 1, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '25EZ-O8MR-603O-K0G4-SO0O]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '6E83-4UCM-P4SG-O0OG-WK8S]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . 'TN15-9JES-QXCC-0O8O-CW8S]', 1, 'L', false, 1, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . 'PHYN-0LDX-OY88-KG40-K0G4]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . 'PXBK-QRBN-HUOG-KOKK-08KO]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . 'MKYH-AMYQ-B5WK-0GW4-0OSK]', 1, 'L', false, 1, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '4JJA-268N-R3SW-G44K-G40G]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . 'DDPR-9HLG-XU88-O0WO-44W4]', 1, 'L', false, 0, '', '', true, 0, '', true, 0, 'T', true);
                $pdf->MultiCell(63, 32, $title . $name . $semester . $lots . $discript . $key . '8EIR-2ENJ-TK4K-4OCC-C4S4]', 1, 'L', false, 1, '', '', true, 0, '', true, 0, 'T', true);

                // new style
                $style = array(
                        'border' => false,
                        'padding' => 1,
                        'fgcolor' => array(0, 0, 0),
                        'bgcolor' => false
                );
                $pdf->write2DBarcode('1KOC-ED9S-BLTW-G4S4-K0OW', 'QRCODE,H', 48, 11, 25, 25, $style, 'N');
                $pdf->write2DBarcode('36DQ-C7VN-OBOK-0WCW-O4OC', 'QRCODE,H', 112, 11, 25, 25, $style, 'N');
                $pdf->write2DBarcode('J74O-PUL1-93C4-W4W8-OG8W', 'QRCODE,H', 176, 11, 25, 25, $style, 'N');
                $pdf->write2DBarcode('430N-10U5-35OG-S04G-C80W', 'QRCODE,H', 48, 45, 25, 25, $style, 'N');
                $pdf->write2DBarcode('2QQA-ROIH-AIUC-O484-W44G', 'QRCODE,H', 112, 45, 25, 25, $style, 'N');
                $pdf->write2DBarcode('EPFG-0RWS-QQGC-8G48-G40C', 'QRCODE,H', 176, 45, 25, 25, $style, 'N');
                $pdf->write2DBarcode('QE0O-CSDB-BK0W-K0G4-SWK4', 'QRCODE,H', 48, 79, 25, 25, $style, 'N');
                $pdf->write2DBarcode('KAUP-F9X3-A800-WKGO-OOG0', 'QRCODE,H', 112, 79, 25, 25, $style, 'N');
                $pdf->write2DBarcode('3XC3-N8CF-KQYO-SSS8-GG8K', 'QRCODE,H', 176, 79, 25, 25, $style, 'N');
                $pdf->write2DBarcode('3LPQ-VAYI-KPC0-CG8G-08OK', 'QRCODE,H', 48, 112, 25, 25, $style, 'N');
                $pdf->write2DBarcode('9DE0-G1T4-VDC8-CO4G-48KC', 'QRCODE,H', 112, 112, 25, 25, $style, 'N');
                $pdf->write2DBarcode('8M7K-9SVM-57OK-0O0S-KK4C', 'QRCODE,H', 176, 112, 25, 25, $style, 'N');
                $pdf->write2DBarcode('2ETN-6OIP-60W0-GW0G-WK0C', 'QRCODE,H', 48, 145, 25, 25, $style, 'N');
                $pdf->write2DBarcode('70E3-OQ6G-NWG0-0OCO-SCW0', 'QRCODE,H', 112, 145, 25, 25, $style, 'N');
                $pdf->write2DBarcode('16MU-TTU6-456O-WOGC-SWWO', 'QRCODE,H', 176, 145, 25, 25, $style, 'N');
                $pdf->write2DBarcode('25EZ-O8MR-603O-K0G4-SO0O', 'QRCODE,H', 48, 179, 25, 25, $style, 'N');
                $pdf->write2DBarcode('6E83-4UCM-P4SG-O0OG-WK8S', 'QRCODE,H', 112, 179, 25, 25, $style, 'N');
                $pdf->write2DBarcode('TN15-9JES-QXCC-0O8O-CW8S', 'QRCODE,H', 176, 179, 25, 25, $style, 'N');
                $pdf->write2DBarcode('PHYN-0LDX-OY88-KG40-K0G4', 'QRCODE,H', 48, 213, 25, 25, $style, 'N');
                $pdf->write2DBarcode('PXBK-QRBN-HUOG-KOKK-08KO', 'QRCODE,H', 112, 213, 25, 25, $style, 'N');
                $pdf->write2DBarcode('MKYH-AMYQ-B5WK-0GW4-0OSK', 'QRCODE,H', 176, 213, 25, 25, $style, 'N');
                $pdf->write2DBarcode('4JJA-268N-R3SW-G44K-G40G', 'QRCODE,H', 48, 246, 25, 25, $style, 'N');
                $pdf->write2DBarcode('DDPR-9HLG-XU88-O0WO-44W4', 'QRCODE,H', 112, 246, 25, 25, $style, 'N');
                $pdf->write2DBarcode('8EIR-2ENJ-TK4K-4OCC-C4S4', 'QRCODE,H', 176, 246, 25, 25, $style, 'N');


                $pdf->Output('_Ticket_QR.pdf', 'I');
        }
}
