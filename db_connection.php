<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "electron";

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
  die("Erro de conexão com o banco de dados: " . $conn->connect_error);
}

?>
