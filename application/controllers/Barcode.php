<?php  
defined('BASEPATH') OR exit('No direct script access allowed');
class Barcode extends MY_Controller {  
     
    public function __construct()
    {
        parent::__construct();
        if ($this->session->ses_status != 'student') {
            show_404();
        }
        $this->load->library('Pdf');
    }  
 
    public function index()
    {
        // สร้าง object สำหรับใช้สร้าง pdf 
        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
        

        $data = array($this->session->ses_tname,$this->session->ses_id,$this->session->ses_mojor_id);
        // กำหนดรายละเอียดของ pdf
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor($data[0]);
        $pdf->SetTitle($data[0]);
        $pdf->SetSubject('Barcode generator');
        $pdf->SetKeywords('Barcode, PDF, generator, IDBarcode, IDGenerator');

        // กำหนดค่าเริ่มต้นของฟอนท์แบบ monospaced 
        // $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

        // กำหนด margins
        // $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
        // $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
        // $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

        // กำหนดการแบ่งหน้าอัตโนมัติ
        $pdf->SetAutoPageBreak(TRUE);

        // remove default header/footer
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        // set default font subsetting mode
        $pdf->setFontSubsetting(true);
    
        // กำหนดฟอนท์ 
        // ฟอนท์ THSarabunnew รองรับภาษาไทย
        $pdf->SetFont('THSarabunnew', '', 14, '', true);

        // เพิ่มหน้า pdf
        // กำหนดในส่วนนี้ สามารถปรับรูปแบบต่างๆ
        // $pdf->AddPage();
        // CODE 128 A

        // define barcode style
        $style = array(
            'position' => '',
            'align' => '',
            'stretch' => true,
            'fitwidth' => true,
            'cellfitalign' => 'C',
            'border' => false,
            'hpadding' => 'auto',
            'vpadding' => 'auto',
            'fgcolor' => array(0,0,0),
            'bgcolor' => false, //array(255,255,255),
            'text' => true,
            'font' => 'helvetica',
            'fontsize' => 8,
            'stretchtext' => 6
        );

        $txt = array(' ชื่อ-สกุล',' รหัสประจำตัวนักศึกษา',' หลักสูตร');
        $pdf->AddPage('P','A4');
        for ($j=0; $j < 7; $j++) { 
            for($l=0; $l < 3; $l++){
                $pdf->MultiCell(62.5, 0, ''.$txt[$l].'  '.$data[$l], 0, 'L', 0, 0, '', '', true, 0, false, true, 40, 'T');
                $pdf->MultiCell(62.5, 0, ''.$txt[$l].'  '.$data[$l], 0, 'L', 0, 0, '', '', true, 0, false, true, 40, 'T');
                $pdf->MultiCell(62.5, 0, ''.$txt[$l].'  '.$data[$l], 0, 'L', 0, 1, '', '', true, 0, false, true, 40, 'T');
            }
            for ($k=0; $k < 3; $k++) { 
                $x = $pdf->GetX(); 
                $y = $pdf->GetY();   
                $pdf->write1DBarcode(''.$data[1].'', 'C128A', $x-18.5, $y, 100, 18, 0.4, $style, 'M');
                $pdf->SetXY($x,$y);
                $pdf->Cell(62.5, 22, '', 0, 0, 'C', FALSE, '', 0, false, 'C');
            }
            $pdf->Ln();  
        }
    $pdf->Output($data[1].'_Barcode.pdf', 'I');
    }
}