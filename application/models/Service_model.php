<?php
class Service_model extends CI_Model {
 
    public function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
        $this->form_validation->set_error_delimiters('<div class="bg-danger" style="padding:3px 10px;">', '</div>');
        $this->load->library('upload');
    }
     
    public function getlist(){
        $query = $this->db->get('tbl_service');
        return $query->result_array();
    }    
     
    public function create(){
        $config['upload_path'] = './upload/';  // โฟลเดอร์ ตำแหน่งเดียวกับ root ของโปรเจ็ค
        $config['allowed_types'] = 'gif|jpg|png'; // ปรเเภทไฟล์ 
        $config['max_size']     = '0';  // ขนาดไฟล์ (kb)  0 คือไม่จำกัด ขึ้นกับกำหนดใน php.ini ปกติไม่เกิน 2MB
        $config['max_width'] = '1024';  // ความกว้างรูปไม่เกิน
        $config['max_height'] = '768'; // ความสูงรูปไม่เกิน
        $config['file_name'] = 'mypicture';  // ชื่อไฟล์ ถ้าไม่กำหนดจะเป็นตามชื่อเพิม
 
        $this->upload->initialize($config);    // เรียกใช้การตั้งค่า  
        $this->upload->do_upload('service_image'); // ทำการอัพโหลดไฟล์จาก input file ชื่อ service_image
         
        $file_upload="";  // กำหนดชื่อไฟล์เป็นค่าว่าง 
        if(!$this->upload->display_errors()){ // ถ้าไม่มี error อัพไฟล์ได้ ให้เอาใช้ไฟล์ใส่ตัวแปร ไว้บันทึกลงฐานข้อมูล
            $file_upload=$this->upload->data('file_name');
        }
        $newdata = array(
            'service_id' => NULL,
            'service_title' => $this->input->post('service_title'),
            'service_detail' => $this->input->post('service_detail'),
            'service_img' => $file_upload,
            'service_update' => date("Y-m-d H:i:s")
        );
        return $this->db->insert('tbl_service', $newdata);                
    }
     
    public function view($id){  // มี $id เป็น parameter ไว้กำหนดเงื่อนไข
        $query = $this->db->get_where('tbl_service',array('service_id'=>$id));
        return $query->row_array(); // ส่งข้อมูลผลัพธ์กลับเป็น array แถวข้อมูล
    }    
     
    public function edit($id){
        $config['upload_path'] = './upload/';  // โฟลเดอร์ ตำแหน่งเดียวกับ root ของโปรเจ็ค
        $config['allowed_types'] = 'gif|jpg|png'; // ปรเเภทไฟล์ 
        $config['max_size']     = '0';  // ขนาดไฟล์ (kb)  0 คือไม่จำกัด ขึ้นกับกำหนดใน php.ini ปกติไม่เกิน 2MB
        $config['max_width'] = '1024';  // ความกว้างรูปไม่เกิน
        $config['max_height'] = '768'; // ความสูงรูปไม่เกิน
        $config['file_name'] = 'mypicture';  // ชื่อไฟล์ ถ้าไม่กำหนดจะเป็นตามชื่อเพิม
 
        $this->upload->initialize($config);    // เรียกใช้การตั้งค่า  
        $this->upload->do_upload('service_image'); // ทำการอัพโหลดไฟล์จาก input file ชื่อ service_image
         
        $file_upload=$this->input->post('h_service_image');  // เก็บชื่อไฟล์เพิมถ้ามี
        if(!$this->upload->display_errors()){ // ถ้าไม่มี error อัพไฟล์ได้ ให้เอาใช้ไฟล์ใส่ตัวแปร ไว้บันทึกลงฐานข้อมูล
            $file_upload=$this->upload->data('file_name');  // เก็บชื่อไฟล์ใหม่           
        }else{
            // ถ้า error ในกรณีเลือกไฟล์แล้วไม่ผ่าน
            if($this->upload->data('file_type')){ // เช่น ประเภทไม่ถูกต้อง
                return; // ต้อง return เพื่อให้แสดง error
            }
        }
        $newdata = array(
            'service_title' => $this->input->post('service_title'),
            'service_detail' => $this->input->post('service_detail'),
            'service_img' => $file_upload,
            'service_update' => date("Y-m-d H:i:s")
        );
        return $this->db->update('tbl_service', $newdata,array('service_id'=>$id));
    }  
     
    public function delete($id){
        return $this->db->delete('tbl_service', array('service_id' =>$id)); 
        // คืนค่าผลการคิวรี่
    }
 
}