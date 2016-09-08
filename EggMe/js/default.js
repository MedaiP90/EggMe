// Per un'introduzione al modello di navigazione, vedere la seguente documentazione:
// http://go.microsoft.com/fwlink/?LinkID=329110
(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: questa applicazione è stata appena avviata. Inizializzare
                // l'applicazione qui.
                /*document.getElementById("barn").addEventListener('click', function () {
                    WinJS.Navigation.navigate("/pages/shop/barn.html");
                }, false);
                document.getElementById("shop").addEventListener('click', function () {
                    WinJS.Navigation.navigate("/pages/shop/shop.html");
                }, false);*/
            } else {
                // TODO: questa applicazione è stata sospesa e quindi terminata.
                // Per creare un'esperienza utente uniforme, ripristinare qui lo stato dell'applicazione in modo che risulti come se l'app fosse sempre rimasta in esecuzione.
            }

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Ottimizzare il carico dell'applicazione e, con la schermata iniziale visualizzata, eseguire il lavoro pianificato in alta priorità.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: questa applicazione sta per essere sospesa. Salvare qui eventuali stati
        // che devono persistere attraverso le sospensioni. Se è necessario 
        // completare un'operazione asincrona prima che l'applicazione 
        // venga sospesa, chiamare args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
