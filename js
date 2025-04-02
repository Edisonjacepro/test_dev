document.addEventListener("DOMContentLoaded", function () {
    let serialInput = document.getElementById("serial_number"); // Remplace par l'ID exact de ton champ

    serialInput.addEventListener("blur", function () {
        let serialNumber = serialInput.value;

        if (serialNumber.trim() !== "") {
            fetch("plugins/monplugin/ajax/check_serial.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: "serial=" + encodeURIComponent(serialNumber),
            })
            .then(response => response.json())
            .then(data => {
                if (data.exists) {
                    alert("Ce numéro de série existe déjà !");
                    serialInput.style.border = "2px solid red"; // Ajoute une indication visuelle
                } else {
                    serialInput.style.border = ""; // Réinitialise si valide
                }
            })
            .catch(error => console.error("Erreur AJAX:", error));
        }
    });
});
