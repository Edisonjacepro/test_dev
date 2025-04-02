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
