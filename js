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
---------------------------------------------------------------
    function ajaxRequest(url, method = "GET", data = {}, callbackSuccess, callbackError) {
    let options = {
        method: method.toUpperCase(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    if (method.toUpperCase() === "POST") {
        options.body = new URLSearchParams(data).toString();
    } else if (method.toUpperCase() === "GET") {
        url += "?" + new URLSearchParams(data).toString();
    }

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (callbackSuccess) {
                callbackSuccess(data);
            }
        })
        .catch(error => {
            if (callbackError) {
                callbackError(error);
            } else {
                console.error("Erreur AJAX:", error);
            }
        });
}

-----------------------------------------------------------
    document.addEventListener("DOMContentLoaded", function () {
    let serialInput = document.getElementById("serial_number");

    serialInput.addEventListener("blur", function () {
        let serialNumber = serialInput.value.trim();

        if (serialNumber !== "") {
            ajaxRequest(
                "plugins/monplugin/ajax/check_serial.php", // URL du script PHP
                "POST", // Méthode
                { serial: serialNumber }, // Données à envoyer
                function (data) { // Callback en cas de succès
                    if (data.exists) {
                        alert("Ce numéro de série existe déjà !");
                        serialInput.style.border = "2px solid red";
                    } else {
                        serialInput.style.border = "";
                    }
                },
                function (error) { // Callback en cas d'erreur
                    console.error("Erreur AJAX :", error);
                }
            );
        }
    });
});
---------------------------------------------------------
ajaxRequest(
    "plugins/monplugin/ajax/get_items.php",
    "GET",
    { category: "moniteurs" },
    function (data) {
        console.log("Données reçues :", data);
    }
);
-----------------------------------------------------------------
    ajaxRequest(
    "plugins/monplugin/ajax/add_user.php",
    "POST",
    { username: "Edison", email: "edison@example.com" },
    function (data) {
        alert("Utilisateur ajouté avec succès !");
    },
    function (error) {
        alert("Erreur lors de l'ajout de l'utilisateur !");
    }
);
-------------------------------------------------------------------
