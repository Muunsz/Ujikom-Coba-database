<?php
session_start();
require_once '../config/database.php';

class RaportController {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function getSiswaDetail($siswa_id) {
        try {
            $query = "SELECT * FROM siswa WHERE id = :siswa_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":siswa_id", $siswa_id);
            $stmt->execute();
            
            return $stmt->fetch(PDO::FETCH_ASSOC);
            
        } catch(PDOException $e) {
            return null;
        }
    }
    
    public function getNilaiRaport($siswa_id, $semester, $tahun_ajaran) {
        try {
            $query = "SELECT 
                        mp.nama_mapel,
                        mp.kkm,
                        n.nilai_pengetahuan,
                        n.nilai_keterampilan,
                        g.nama_lengkap as guru_pengajar
                      FROM nilai n
                      JOIN mata_pelajaran mp ON n.mapel_id = mp.id
                      JOIN guru g ON n.guru_id = g.id
                      WHERE n.siswa_id = :siswa_id 
                      AND n.semester = :semester
                      AND n.tahun_ajaran = :tahun_ajaran
                      ORDER BY mp.nama_mapel";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":siswa_id", $siswa_id);
            $stmt->bindParam(":semester", $semester);
            $stmt->bindParam(":tahun_ajaran", $tahun_ajaran);
            $stmt->execute();
            
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            
        } catch(PDOException $e) {
            return [];
        }
    }
    
    public function getAbsensi($siswa_id, $semester, $tahun_ajaran) {
        try {
            $query = "SELECT * FROM absensi 
                      WHERE siswa_id = :siswa_id 
                      AND semester = :semester
                      AND tahun_ajaran = :tahun_ajaran";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":siswa_id", $siswa_id);
            $stmt->bindParam(":semester", $semester);
            $stmt->bindParam(":tahun_ajaran", $tahun_ajaran);
            $stmt->execute();
            
            return $stmt->fetch(PDO::FETCH_ASSOC);
            
        } catch(PDOException $e) {
            return null;
        }
    }
}

// Get student's report card data
$controller = new RaportController();
$siswa = $controller->getSiswaDetail($_SESSION['detail_id']);

// Get current semester and tahun_ajaran (you might want to make this dynamic)
$semester = '1';
$tahun_ajaran = '2023/2024';

$nilai_raport = $controller->getNilaiRaport($_SESSION['detail_id'], $semester, $tahun_ajaran);
$absensi = $controller->getAbsensi($_SESSION['detail_id'], $semester, $tahun_ajaran);
?>