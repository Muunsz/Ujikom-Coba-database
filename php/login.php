<?php
session_start();
require_once '../config/database.php';

class Auth {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function login($username, $password) {
        try {
            $query = "SELECT u.*, 
                        CASE 
                            WHEN a.id IS NOT NULL THEN 'admin'
                            WHEN g.id IS NOT NULL THEN 'guru'
                            WHEN s.id IS NOT NULL THEN 'siswa'
                        END as user_type,
                        COALESCE(a.id, g.id, s.id) as detail_id
                     FROM users u
                     LEFT JOIN admin a ON u.id = a.user_id
                     LEFT JOIN guru g ON u.id = g.user_id
                     LEFT JOIN siswa s ON u.id = s.user_id
                     WHERE u.username = :username";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":username", $username);
            $stmt->execute();
            
            if($stmt->rowCount() > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if(password_verify($password, $row['password'])) {
                    $_SESSION['user_id'] = $row['id'];
                    $_SESSION['role'] = $row['role'];
                    $_SESSION['detail_id'] = $row['detail_id'];
                    $_SESSION['username'] = $row['username'];
                    
                    return [
                        'status' => true,
                        'message' => 'Login successful',
                        'role' => $row['role']
                    ];
                }
            }
            
            return [
                'status' => false,
                'message' => 'Invalid credentials'
            ];
            
        } catch(PDOException $e) {
            return [
                'status' => false,
                'message' => 'Login failed: ' . $e->getMessage()
            ];
        }
    }
}

// Handle login request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $auth = new Auth();
    $result = $auth->login($_POST['username'], $_POST['password']);
    
    if ($result['status']) {
        switch ($result['role']) {
            case 'admin':
                header('Location: ../admin/dashboard.php');
                break;
            case 'guru':
                header('Location: ../guru/dashboard.php');
                break;
            case 'siswa':
                header('Location: ../siswa/raport.php');
                break;
        }
        exit;
    } else {
        $_SESSION['error'] = $result['message'];
        header('Location: ../login.html');
        exit;
    }
}
?>