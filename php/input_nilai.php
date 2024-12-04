<?php
session_start();
require_once '../config/database.php';

class NilaiController {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function inputNilai($data) {
        try {
            $query = "INSERT INTO nilai 
                      (siswa_id, mapel_id, guru_id, nilai_pengetahuan, 
                       nilai_keterampilan, semester, tahun_ajaran) 
                      VALUES 
                      (:siswa_id, :mapel_id, :guru_id, :nilai_pengetahuan,
                       :nilai_keterampilan, :semester, :tahun_ajaran)";
            
            $stmt = $this->conn->prepare($query);
            
            $stmt->bindParam(":siswa_id", $data['siswa_id']);
            $stmt->bindParam(":mapel_id", $data['mapel_id']);
            $stmt->bindParam(":guru_id", $_SESSION['detail_id']);
            $stmt->bindParam(":nilai_pengetahuan", $data['nilai_pengetahuan']);
            $stmt->bindParam(":nilai_keterampilan", $data['nilai_keterampilan']);
            $stmt->bindParam(":semester", $data['semester']);
            $stmt->bindParam(":tahun_ajaran", $data['tahun_ajaran']);
            
            if($stmt->execute()) {
                return [
                    'status' => true,
                    'message' => 'Nilai berhasil diinput'
                ];
            }
            
            return [
                'status' => false,
                'message' => 'Gagal menginput nilai'
            ];
            
        } catch(PDOException $e) {
            return [
                'status' => false,
                'message' => 'Error: ' . $e->getMessage()
            ];
        }
    }
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller = new NilaiController();
    $result = $controller->inputNilai($_POST);
    
    header('Content-Type: application/json');
    echo json_encode($result);
    exit;
}
?>