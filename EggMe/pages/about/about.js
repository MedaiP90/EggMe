// Per un'introduzione al modello Controllo pagina, vedere la seguente documentazione:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/about/about.html", {
        // La funzione viene chiamata quando un utente passa a questa pagina. Popola
        // gli elementi della pagina con i dati dell'applicazione.
        ready: function (element, options) {
            // TODO: inizializzare la pagina qui.
            var M = Windows.ApplicationModel.Package.current.id.version.major;
            var m = Windows.ApplicationModel.Package.current.id.version.minor;
            var r = Windows.ApplicationModel.Package.current.id.version.revision;
            var b = Windows.ApplicationModel.Package.current.id.version.build;
            var p = ".";

            document.getElementById("versionOf").innerText = M + p + m + p + b + p + r;

            document.getElementById("backAbout").addEventListener('click', function () {
                playOpen();
                WinJS.Navigation.navigate("/pages/home/home.html");
            }, false);

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
