<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Te_document extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library('Pdf');
    }

    private function _conversion($val, $unitCV)
    {
        $unitCV = strtolower($unitCV);
        $arrFactor = array(
            "px-cm" => 0.02645833, "px-mm" => 0.264583, "px-in" => 0.01041667, "px-pt" => 0.75,
            "cm-px" => 37.795276, "cm-mm" => 10, "cm-in" => 0.393701, "cm-pt" => 28.346457,
            "mm-cm" => 0.1, "mm-px" => 3.779528, "mm-in" => 0.03937008, "mm-pt" => 2.834646,
            "in-cm" => 2.54, "in-mm" => 25.4, "in-px" => 96, "in-pt" => 72,
            "pt-cm" => 0.03527778, "pt-mm" => 0.352778, "pt-in" => 0.01388889, "pt-px" => 1.333333,
        );
        return $val * $arrFactor[$unitCV];
    }

    private function _hex2rgb($color)
    {
        $color = str_replace('#', '', $color);
        if (strlen($color) != 6) {
            return array(0, 0, 0);
        }
        $rgb = array();
        for ($x = 0; $x < 3; $x++) {
            $rgb[$x] = hexdec(substr($color, (2 * $x), 2));
        }
        return $rgb;
    }

    public function index()
    {
        // กำหนดตัวแปรค่าคงที่สำหรับการจัดค่าหน้ากระดาษ
        define('MYPDF_MARGIN_LEFT', $this->_conversion(1, 'in-mm'));
        define('MYPDF_MARGIN_TOP', $this->_conversion(1.5, 'in-mm'));
        define('MYPDF_MARGIN_RIGHT', $this->_conversion(1, 'in-mm'));
        define('MYPDF_MARGIN_HEADER', $this->_conversion(0.5, 'in-mm'));
        define('MYPDF_MARGIN_FOOTER', $this->_conversion(0.5, 'in-mm'));
        define('MYPDF_MARGIN_BOTTOM', $this->_conversion(0.5, 'in-mm'));

        // กำหนดข้อความส่วนแสดง header
        define('MYPDF_HEADER_LOGO', 'MII_icon.png');
        define('MYPDF_HEADER_LOGO_WIDTH', 29);
        define('MYPDF_HEADER_TITLE', "MAHANAKORN Institute of Innovation Club                                       MII-01");
        define('MYPDF_HEADER_STRING', "Mahanakorn University of Technology (MUT)\n140 ChueamSamphan Rd., NongChok, BKK 10530 Tel 02-988-3666 ext 1230");

        // สร้าง object สำหรับใช้สร้าง pdf 
        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

        // กำหนดรายละเอียดของ pdf
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor('Bubblegum');
        $pdf->SetTitle('document');
        $pdf->SetSubject('document');
        $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
        $pdf->SetFont('THSarabunnew', '', 14, '', true);
        // กำหนดข้อมูลที่จะแสดงในส่วนของ header
        $pdf->SetHeaderData(
            MYPDF_HEADER_LOGO, // โลโก้ กำหนดค่าในไฟล์  tcpdf_config.php 
            MYPDF_HEADER_LOGO_WIDTH,
            MYPDF_HEADER_TITLE,
            MYPDF_HEADER_STRING, // กำหนดเพิ่มเติมในไฟล์  tcpdf_config.php 
            array(139, 139, 139),  // กำหนดสีของข้อความใน header rgb 
            array(139, 139, 139)   // กำหนดสีของเส้นคั่นใน header rgb 
        );

        // กำหนดรูปแบบของฟอนท์และขนาดฟอนท์ที่ใช้ใน header และ footer
        $pdf->setHeaderFont(array('THSarabunnew', '', 14));

        // กำหนด margins
        $pdf->SetMargins(MYPDF_MARGIN_LEFT, MYPDF_MARGIN_TOP, MYPDF_MARGIN_RIGHT);
        $pdf->SetHeaderMargin(MYPDF_MARGIN_HEADER);

        // กำหนดการแบ่งหน้าอัตโนมัติ
        $pdf->SetAutoPageBreak(TRUE, MYPDF_MARGIN_BOTTOM);

        // ---------------------------------------------------------

        // set default font subsetting mode
        $pdf->setFontSubsetting(true);

        // กำหนดฟอนท์ 
        $pdf->SetFont('THSarabunnew', '', 14, '', true);

        // เพิ่มหน้า pdf
        $pdf->AddPage('P', 'A4');
        $pdf->SetFont('THSarabunnew', '', 14, '', true);
        $pdf->Cell(0, 0, 'ที่ชมรม สนก. 62/8001', 0, 1, 'L', 0, '', 0);
        $pdf->Ln(2);
        $pdf->Cell(0, 0, '26 กันยายน 2562', 0, 1, 'C', 0, '', 0);
        $pdf->Ln(2);
        $pdf->Cell(0, 0, 'เรื่อง  ขอความอนุเคราะห์แลกคะแนนกิจกรรมประจำเทอมศึกษาที่ 1/2562', 0, 1, 'L', 0, '', 0);
        $pdf->Ln(2);
        $pdf->Cell(0, 0, 'เรียน  อาจารย์ยศธร ภูมิสุทธิ์ อาจารย์ประจำวิชา CPEN1111 Computer Programming II', 0, 1, 'L', 0, '', 0);
        $pdf->Ln(2);


        $txt = '            เนื่องด้วย สถาบันนวัฒกรรมมหานคร ได้มีนโยบายการจัดโครงการแลกคะแนนกิจกรรมเพื่อเป็นแรงจูงใจให้ นักศึกษาเข้าร่วมทำกิจกรรมของสถาบันฯ บัดนี้คณะกรรมการกิจการนักศึกษาของสถาบันนวัตกรรมมหานครได้ดำเนินการ ประกอบกิจกรรมและตรวจสอบการเข้าร่วมกิจกรรมของนักศึกษาประจำเทอม 1/2562 เสร็จสิ้นแล้ว';
        $txt2 = '           โดยทางคณะกรรมการกิจการนักศึกษาสถาบันนวัฒกรรมมหานคร จึงใคร่ขอความอนุเคราะห์ อาจารย์ยศธร ภูมิสุทธิ์ อาจารย์ประจำวิชา CPEN1111 Computer Programming II ในการให้นักศึกษาแลกคะแนนกิจกรรม และขอขอบคุณเป็นอย่างสูงสำหรับความร่วมมือในการสนับสนุนการพัฒนาด้านศักยภาพทางด้านสังคมการเรียนรู้และการทำงานของนักศึกษา โดยมีรายชื่อนักศึกษาดังนี้';
        $pdf->MultiCell(0, 5, $txt, 0, 'L', 0, 1, '', '', true);
        $pdf->Ln(2);
        $pdf->MultiCell(0, 5, $txt2, 0, 'L', 0, 1, '', '', true);
        $pdf->Ln(2);

        // จบการทำงานและแสดงไฟล์ pdf
        // การกำหนดในส่วนนี้ สามารถปรับรูปแบบต่างๆ ได้ เช่นให้บันทึกเป้นไฟล์ หรือให้แสดง pdf เลย ดูวิธีใช้งานที่คู่มือของ tcpdf เพิ่มเติม
        $pdf->Output('document.pdf', 'I');
    }
}
