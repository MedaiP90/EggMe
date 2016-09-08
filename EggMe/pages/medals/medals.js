// Per un'introduzione al modello Controllo pagina, vedere la seguente documentazione:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    WinJS.UI.Pages.define("/pages/medals/medals.html", {
        // La funzione viene chiamata quando un utente passa a questa pagina. Popola
        // gli elementi della pagina con i dati dell'applicazione.
        ready: function (element, options) {
            // TODO: inizializzare la pagina qui.

            document.getElementById("backMedals").addEventListener('click', function () {
                playOpen();
                WinJS.Navigation.navigate("/pages/home/home.html");
            }, false);

            if (roamingSettings.values["medal1"]) {
                document.getElementById("m1").src = "../../medalsRes/medal1.png";
                document.getElementById("m1Name").innerText = "Cob Medal";
            }
            if (roamingSettings.values["medal2"]) {
                document.getElementById("m2").src = "../../medalsRes/medal2.png";
                document.getElementById("m2Name").innerText = "Silver Medal";
            }
            if (roamingSettings.values["medal3"]) {
                document.getElementById("m3").src = "../../medalsRes/medal3.png";
                document.getElementById("m3Name").innerText = "Golden Medal";
            }
            if (roamingSettings.values["medal4"]) {
                document.getElementById("m4").src = "../../medalsRes/medal4.png";
                document.getElementById("m4Name").innerText = "Egg Medal";
            }
            if (roamingSettings.values["medal5"]) {
                document.getElementById("m5").src = "../../medalsRes/medal5.png";
                document.getElementById("m5Name").innerText = "Smasher Medal";
            }
            if (roamingSettings.values["medal6"]) {
                document.getElementById("m6").src = "../../medalsRes/medal6.png";
                document.getElementById("m6Name").innerText = "Chicken Medal";
            }

            WinJS.UI.processAll();

        },

        unload: function () {
            // TODO: rispondere alle navigazioni all'esterno di questa pagina.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: rispondere alle modifiche nel layout.
        }
    });
})();
