// Per un'introduzione al modello Controllo pagina, vedere la seguente documentazione:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    WinJS.UI.Pages.define("/pages/settings/profile.html", {
        // La funzione viene chiamata quando un utente passa a questa pagina. Popola
        // gli elementi della pagina con i dati dell'applicazione.
        ready: function (element, options) {
            // TODO: inizializzare la pagina qui.
            document.getElementById("backProfile").addEventListener('click', function () {
                playOpen();
                WinJS.Navigation.navigate("/pages/home/home.html");
            }, false);

            document.getElementById("editBtn").addEventListener('click', function () {
                edit();
            }, false);

            updateProfile();
        },

        unload: function () {
            // TODO: rispondere alle navigazioni all'esterno di questa pagina.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: rispondere alle modifiche nel layout.
        }
    });

    function edit() {
        console.log("Edit pressed");
        document.getElementById("name1").hidden = false;
        document.getElementById("namePlayer1").value = roamingSettings.values["namePlayer"];
        document.getElementById("submit1").addEventListener('click', function () {
            var previous = roamingSettings.values["namePlayer"];
            if (document.getElementById("namePlayer1").value == "" || document.getElementById("namePlayer1").value == roamingSettings.values["namePlayer"]) { } else {
                roamingSettings.values["namePlayer"] = document.getElementById("namePlayer1").value;
                document.getElementById("name1").hidden = true;
                httpRequest("http://medaip90.altervista.org/bolzenxl/eggme/replace.php?pre=" + previous + "&new=" + roamingSettings.values["namePlayer"]);
            }
            updateProfile();
        }, false);
    }

    function updateProfile() {
        var contatore;
        if (roamingSettings.values["contatore"] != null) {
            contatore = roamingSettings.values["contatore"];
        } else {
            contatore = 0;
        }
        var percentage = contatore / 10000;
        document.getElementById("nameProfile").innerText = roamingSettings.values["namePlayer"];
        document.getElementById("cScore").innerText = contatore;
        document.getElementById("pScore").innerText = percentage;
        document.getElementById("medalsNo").innerText = verifyMedals();
        currentRank();
        document.getElementById("rank").innerText = cr;
    }

    var cr;

    function currentRank() {
        httpRequest("http://medaip90.altervista.org/bolzenxl/eggme/search.php?key=" + roamingSettings.values["namePlayer"]);
    }

    var myRequest = null;
    var readText = "";

    function CreateXmlHttpObject(myFunction) {
        var xmlhttpObject = null;
        try {
            xmlhttpObject = new XMLHttpRequest();
        } catch (e1) {
            try {
                xmlhttpObject = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e2) {
                xmlhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        xmlhttpObject.onreadystatechange = myFunction;
        return xmlhttpObject;
    }

    function httpReturnResponse() {
        if (myRequest.readyState == 4 && myRequest.status == 200) {
            var results = myRequest.responseText;

            var safeData = window.toStaticHTML(results);

            readText = readText + safeData;
            document.getElementById("temp1").innerHTML = readText;

            var mvar = "";

            mvar = $("div").filter("#sres").find("td").html();
            mvar = mvar.replace(")", "");
            document.getElementById("rank").innerHTML = mvar;

            $("div").filter("#temp1").empty();
        } else {

        }
    }

    function httpRequest(variabile) {
        var networkInformation = Windows.Networking.Connectivity.NetworkInformation;
        var internetConnectionProfile = networkInformation.getInternetConnectionProfile();
        if (internetConnectionProfile != null) {
            var networkConnectivityLevel = internetConnectionProfile.getNetworkConnectivityLevel();
            if (networkConnectivityLevel == Windows.Networking.Connectivity.NetworkConnectivityLevel.internetAccess) {

            } else {
                document.getElementById("rank").innerHTML = "CONNECT TO INTERNET!";
                return;
            }
        } else {
            document.getElementById("rank").innerHTML = "CONNECT TO INTERNET!";
            return;
        }
        myRequest = CreateXmlHttpObject(httpReturnResponse);
        myRequest.open("GET", variabile, true);
        myRequest.send(null);
    }

    function verifyMedals() {
        var number = 0;

        if (roamingSettings.values["medal1"]) {
            number++;
        }
        if (roamingSettings.values["medal2"]) {
            number++;
        }
        if (roamingSettings.values["medal3"]) {
            number++;
        }
        if (roamingSettings.values["medal4"]) {
            number++;
        }
        if (roamingSettings.values["medal5"]) {
            number++;
        }
        if (roamingSettings.values["medal6"]) {
            number++;
        }

        return number;
    }

})();
