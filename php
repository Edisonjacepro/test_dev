<?php
// Inclure la configuration de GLPI
include('../../../inc/includes.php');

if (isset($_POST['serial'])) {
    global $DB;
    $serial = $DB->escape($_POST['serial']);

    // Vérifier si le numéro de série existe déjà
    $query = "SELECT COUNT(*) as count FROM glpi_monitors WHERE serial = '$serial'";
    $result = $DB->query($query);
    $data = $DB->fetch_assoc($result);

    echo json_encode(["exists" => $data['count'] > 0]);
}
?>
-----------------------------------------------
<?php
require '../../../inc/includes.php'; // Inclure GLPI

// Vérifier si un numéro de série est envoyé
if (!isset($_POST['serial'])) {
    echo json_encode(["error" => "Numéro de série manquant"]);
    exit;
}

$serial = $_POST['serial']; // Récupération du numéro de série

global $DB;
$query = "SELECT COUNT(*) as count FROM glpi_monitors WHERE serial = :serial AND is_deleted = 0";
$stmt = $DB->prepare($query);
$stmt->bindValue(":serial", $serial, PDO::PARAM_STR);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

// Vérifier si le numéro de série existe déjà
if ($result['count'] > 0) {
    echo json_encode(["exists" => true]);
} else {
    echo json_encode(["exists" => false]);
}
exit;
?>
