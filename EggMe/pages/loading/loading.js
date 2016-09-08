// Per un'introduzione al modello Controllo pagina, vedere la seguente documentazione:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var p = 0;

    WinJS.UI.Pages.define("/pages/loading/loading.html", {
        // La funzione viene chiamata quando un utente passa a questa pagina. Popola
        // gli elementi della pagina con i dati dell'applicazione.
        ready: function (element, options) {
            // TODO: inizializzare la pagina qui.
            p = 0;

            suggestion();

            WinJS.Promise.timeout(100).then(function (complete) {
                loading();
            }, function (error) {
                // code that takes care of the canceled promise. 
                // Note that .then rather than .done should be used in this case.
            });
        },

        unload: function () {
            // TODO: rispondere alle navigazioni all'esterno di questa pagina.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: rispondere alle modifiche nel layout.
        }
    });

    function loading() {
        if (p < 100) {
            p += 5;
            var incr = (70 * p) / 100;
            document.getElementById("loading").style.width = incr + "vw";
            WinJS.Promise.timeout(100).then(function (complete) {
                loading();
            }, function (error) {
                // code that takes care of the canceled promise. 
                // Note that .then rather than .done should be used in this case.
            });
        } else {
            WinJS.Navigation.navigate("/pages/home/home.html");
        }
    }

    function suggestion() {
        var suggestions = new Array("Use cobs to boost your speed", "In the barn section you can spend your cobs", "The bank section give you a huge powerup", "There are 6 medals, collect them all", "See other players' score in leaderboard section", "Shere your score with your friends", "Cobs are good ;)", "More cobs = more power", "Rare medals make you cool!");
        var sugg = suggestions[Math.ceil(Math.random() * 1000) % 9];
        document.getElementById("sugg").innerHTML = sugg;
    }

})();
