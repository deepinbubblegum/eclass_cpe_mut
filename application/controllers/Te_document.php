<?php
defined('BASEPATH') or exit('No direct script access allowed');

use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\TemplateProcessor;
use DocxMerge\DocxMerge;

class Te_document extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
    }


    public function DateThai()
    {
        $thaimonth = array(
            "มกราคม", "กุมภาพันธ์", "มีนาคม",
            "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน",
            "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        );
        $strYear = date("Y") + 543;
        $strDay = date("j");
        $strMonth = date("n");
        return $strDay . ' ' . $thaimonth[$strMonth] . ' ' . $strYear;
    }


    public function index()
    {
        // หน้าแรก
        $this->load->helper('path');
        // $path_msword = APPPATH."msword/";
        $dir = 'office/msword/';
        $title = 'MII-' . date('Y-m-d H:i:s');
        $templateProcessor = new TemplateProcessor($dir . 'template/templates.docx');

        $templateProcessor->setValues(array(
            'Te_name' => 'อาจารย์ยศธร ภูมิสุทธิ์',
            'DateThai' => $this->DateThai(),
            'Semester' => '1/2561',
            'Id_subject-name' => 'CPEN1111 Computer Programming II',
            'Te_signature_name' => 'อาจารย์ศิลปกร  ปิยะปัญญาพงษ์',
            'Club_president_name' => 'นายอภิเชษฐ์ เมืองทรัพย์',
            'Club_president_phone' => '093-145-8777',
            'Club_president_email' => '5911110129@mutacth.com',
            'contact' => '0-2988-3666 ต่อ 1230, 09-1009-9861',
            'Advisor_email' => 'silpakorn@mutacth.com'
        ));

        // header("Content-Description: File Transfer");
        // header('Content-Disposition: attachment; filename="' . $title . '.docx"');
        // header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        // header('Content-Transfer-Encoding: binary');
        // header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        // header('Expires: 0');
        // $templateProcessor->saveAs('php://output');

        $templateProcessor->saveAs($dir . '/tmp/' . $title . '.docx');

        // แผ่นรายชื่อ
        $phpWord = new \PhpOffice\PhpWord\PhpWord();
        $section = $phpWord->addSection();

        $fontStyleName = 'oneUserDefinedStyle';
        $phpWord->addFontStyle(
            $fontStyleName,
            array('name' => 'TH SarabunPSK', 'size' => 14, 'color' => '000000', 'bold' => false),
        );
        $phpWord->addParagraphStyle(
            'p2Style', array('align' => 'center')
        );

        for ($i=0; $i < 80; $i++) { 
            $section->addText(
                '6111110096	นางสาวญานิกา 	ภาคพานิช	5 คะแนน',
                $fontStyleName,
                'p2Style'
            );
        }

        $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
        $objWriter->save($dir . '/tmp/' . $title . '2.docx');

        // รวมเอกสาร
        $dm = new DocxMerge();
        $dm->merge([
            $dir . '/tmp/' . $title . '.docx',
            $dir . '/tmp/' . $title . '2.docx'
        ], $dir .  $title . ".docx");

        unlink($dir . '/tmp/' . $title . '.docx');
        unlink($dir . '/tmp/' . $title . '2.docx');
        // echo '<iframe src="https://docs.google.com/viewer?url=' . base_url('office/msword/') . $title . ".docx" . '&embedded=true"  style="position: absolute;width:100%; height: 100%;border: none;"></iframe>';
    }
}
