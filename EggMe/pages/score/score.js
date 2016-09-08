// Per un'introduzione al modello Controllo pagina, vedere la seguente documentazione:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var requestType = "l";

    WinJS.UI.Pages.define("/pages/score/score.html", {
        // La funzione viene chiamata quando un utente passa a questa pagina. Popola
        // gli elementi della pagina con i dati dell'applicazione.
        ready: function (element, options) {
            // TODO: inizializzare la pagina qui.
            requestType = "l";

            document.getElementById("backScore").addEventListener('click', function () {
                playOpen();
                WinJS.Navigation.navigate("/pages/home/home.html");
            }, false);

            document.getElementById("scores").addEventListener('click', function () {
                document.getElementById("sModule").hidden = false;
                document.getElementById("rModule").hidden = true;
            }, false);

            document.getElementById("search").addEventListener('click', function () {
                var key = document.getElementById("key").value;

                requestType = "s";
                readText = "";

                document.getElementById("sModule").hidden = true;
                document.getElementById("rModule").hidden = false;

                document.getElementById("rModule").innerHTML = "<td colspan=\"2\">I'm loading scores...</td>"

                httpRequest("http://medaip90.altervista.org/bolzenxl/eggme/search.php?key=" + key);

                /*var s = "<td colspan=\"2\">Score not found</td>";

                $("tr").each(function () {
                    var n = $(this).html().search(key);
                    
                    if (n != -1) {
                        s = $(this).html();
                    }
                });

                document.getElementById("rModule").innerHTML = s;*/
            }, false);

            readText = "";
            document.getElementById("scores").innerHTML = "I'm loading scores...";
            httpRequest("http://medaip90.altervista.org/bolzenxl/eggme/show.php");
        },

        unload: function () {
            // TODO: rispondere alle navigazioni all'esterno di questa pagina.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: rispondere alle modifiche nel layout.
        }
    });

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
            document.getElementById("temp").innerHTML = readText;

            var mvar = "";

            if (requestType == "l") {
                $("div").each(function () {
                    mvar = $(this).html();
                });

                document.getElementById("scores").innerHTML = mvar;
            } else {
                $("tr").each(function () {
                    mvar = $(this).html();
                });

                document.getElementById("rModule").innerHTML = mvar;
            }

            $("div").filter("#temp").empty();
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
                document.getElementById("scores").innerHTML = "CONNECT TO INTERNET!";
                return;
            }
        } else {
            document.getElementById("scores").innerHTML = "CONNECT TO INTERNET!";
            return;
        }
        myRequest = CreateXmlHttpObject(httpReturnResponse);
        myRequest.open("GET", variabile, true);
        myRequest.send(null);
    }
})();
