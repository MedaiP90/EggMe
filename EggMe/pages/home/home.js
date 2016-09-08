(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    var contatore;
    var contatoreMais;
    var contatoreMaisSilver;
    var contatoreMaisGold;
    var lvTap;
    var lvMais;

    var vittoria = false;
    var percentage = 0;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // La funzione viene chiamata quando un utente passa a questa pagina. Popola
        // gli elementi della pagina con i dati dell'applicazione.
        ready: function (element, options) {
            // TODO: inizializzare la pagina qui.
            // freeing navigation stack
            WinJS.Navigation.history.backStack = [];

            // This app was newly launched; register it as share source.
            var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
            dataTransferManager.addEventListener("datarequested", doShare);

            if (roamingSettings.values["namePlayer"] != null && roamingSettings.values["namePlayer"] != "") {
                document.getElementById("name").hidden = true;
                console.log(roamingSettings.values["namePlayer"]);
            } else {
                document.getElementById("name").hidden = false;
            }

            document.getElementById("submit").addEventListener('click', function () {
                if (document.getElementById("namePlayer").value == "") { } else {
                    roamingSettings.values["namePlayer"] = document.getElementById("namePlayer").value;
                    document.getElementById("name").hidden = true;
                }
            }, false);

            if (roamingSettings.values["won"] != null) {
                vittoria = roamingSettings.values["won"];
            } else {
                vittoria = false;
            }

            if (!vittoria) {
                document.getElementById("vittoria").hidden = true;
            } else {
                document.getElementById("vittoria").hidden = false;
            }

            document.getElementById("barn").addEventListener('click', function () {
                addScore();
                playOpenBarn();
                WinJS.Navigation.navigate("/pages/shop/barn.html");
            }, false);
            document.getElementById("shop").addEventListener('click', function () {
                addScore();
                playOpenBank();
                WinJS.Navigation.navigate("/pages/shop/shop.html");
            }, false);

            document.getElementById("medals").addEventListener('click', function () {
                addScore();
                playOpen();
                WinJS.Navigation.navigate("/pages/medals/medals.html");
            }, false);
            document.getElementById("score").addEventListener('click', function () {
                addScore();
                playOpen();
                WinJS.Navigation.navigate("/pages/score/score.html");
            }, false);
            document.getElementById("about").addEventListener('click', function () {
                addScore();
                playOpen();
                WinJS.Navigation.navigate("/pages/about/about.html");
            }, false);
            document.getElementById("profile").addEventListener('click', function () {
                addScore();
                playOpen();
                WinJS.Navigation.navigate("/pages/settings/profile.html");
            }, false);
            document.getElementById("share").addEventListener('click', function () {
                addScore();
                showShareUI();
            }, false);

            WinJS.UI.processAll();

            if (roamingSettings.values["lvTap"] != null) {
                lvTap = roamingSettings.values["lvTap"];
            } else {
                lvTap = 1;
            }

            if (roamingSettings.values["lvMais"] != null) {
                lvMais = roamingSettings.values["lvMais"];
            } else {
                lvMais = 0;
            }

            if (roamingSettings.values["contatore"] != null) {
                contatore = roamingSettings.values["contatore"];
            } else {
                contatore = 0;
            }

            if (roamingSettings.values["contatoreMais"] != null) {
                contatoreMais = roamingSettings.values["contatoreMais"];
            } else {
                contatoreMais = 0;
            }

            if (roamingSettings.values["contatoreMaisSilver"] != null) {
                contatoreMaisSilver = roamingSettings.values["contatoreMaisSilver"];
            } else {
                contatoreMaisSilver = 0;
            }

            if (roamingSettings.values["contatoreMaisGold"] != null) {
                contatoreMaisGold = roamingSettings.values["contatoreMaisGold"];
            } else {
                contatoreMaisGold = 0;
            }

            percentage = contatore / 10000;

            document.getElementById("progress").style.width = percentage + "vw";

            document.getElementById("premio").src = roamingSettings.values["last"];
            document.getElementById("nomePremio").innerText = roamingSettings.values["last1"];

            document.getElementById("contatore").innerText = contatore;
            document.getElementById("contatoreMais").innerText = contatoreMais;
            document.getElementById("contatoreMaisSilver").innerText = contatoreMaisSilver;
            document.getElementById("contatoreMaisGold").innerText = contatoreMaisGold;

            //won();

            if (contatore < 100000) {

            } else if (contatore >= 100000 && contatore < 200000) {
                document.getElementById("crack").src = "../../immagini/crack1.png";
            } else if (contatore >= 200000 && contatore < 300000) {
                document.getElementById("crack").src = "../../immagini/crack2.png";
            } else if (contatore >= 300000 && contatore < 400000) {
                document.getElementById("crack").src = "../../immagini/crack3.png";
            } else if (contatore >= 400000 && contatore < 500000) {
                document.getElementById("crack").src = "../../immagini/crack4.png";
            } else if (contatore >= 500000 && contatore < 600000) {
                document.getElementById("crack").src = "../../immagini/crack5.png";
            } else if (contatore >= 600000 && contatore < 700000) {
                document.getElementById("crack").src = "../../immagini/crack6.png";
            } else if (contatore >= 700000 && contatore < 800000) {
                document.getElementById("crack").src = "../../immagini/crack7.png";
            } else if (contatore >= 800000 && contatore < 900000) {
                document.getElementById("crack").src = "../../immagini/crack8.png";
            } else if (contatore >= 900000 && contatore < 1000000) {
                document.getElementById("crack").src = "../../immagini/crack9.png";
            } else {
                document.getElementById("uovo").src = "../../immagini/cracked.png";
                document.getElementById("crack").src = "";
            }

            var mais = 0;
            var maisSilver = 0;
            var maisGold = 0;
            var tap = 0;

            document.getElementById("tapUovo").addEventListener('click', function () {
                contatore += lvTap;

                if (mais == (20 - lvMais)) {
                    contatoreMais++;
                    mais = 0;
                    document.getElementById("contatoreMais").innerText = contatoreMais;
                    roamingSettings.values["contatoreMais"] = contatoreMais;
                }

                if (maisSilver == (201 - ((lvMais + 1) * 10))) {
                    contatoreMaisSilver++;
                    maisSilver = 0;
                    document.getElementById("contatoreMaisSilver").innerText = contatoreMaisSilver;
                    roamingSettings.values["contatoreMaisSilver"] = contatoreMaisSilver;
                }

                if (maisGold == (350 - (lvMais * 10))) {
                    contatoreMaisGold++;
                    maisGold = 0;
                    document.getElementById("contatoreMaisGold").innerText = contatoreMaisGold;
                    roamingSettings.values["contatoreMaisGold"] = contatoreMaisGold;
                }

                mais++;
                maisSilver++;
                maisGold++;

                percentage = contatore / 10000;

                document.getElementById("progress").style.width = percentage + "vw";

                document.getElementById("contatore").innerText = contatore;
                roamingSettings.values["contatore"] = contatore;

                won();

                if (tap == 0) {
                    tap = 1;
                    document.getElementById("uovo").style.transform = "rotate(3deg)";
                    document.getElementById("crack").style.transform = "rotate(3deg)";
                } else {
                    tap = 0;
                    document.getElementById("uovo").style.transform = "rotate(-3deg)";
                    document.getElementById("crack").style.transform = "rotate(-3deg)";
                }
            }, false);

            document.getElementById("play").addEventListener('click', function () {
                document.getElementById("uovo").src = "../../immagini/egg-32865_960_720.png";
                document.getElementById("crack").src = "";

                //mais
                //contatoreMais = 0;
                mais = 0;
                //document.getElementById("contatoreMais").innerText = contatoreMais;
                //roamingSettings.values["contatoreMais"] = contatoreMais;

                //maisSilver
                //contatoreMaisSilver = 0;
                maisSilver = 0;
                //document.getElementById("contatoreMaisSilver").innerText = contatoreMaisSilver;
                //roamingSettings.values["contatoreMaisSilver"] = contatoreMaisSilver;

                //maisGold
                //contatoreMaisGold = 0;
                maisGold = 0;
                //document.getElementById("contatoreMaisGold").innerText = contatoreMaisGold;
                //roamingSettings.values["contatoreMaisGold"] = contatoreMaisGold;

                //tap
                contatore = 0;
                document.getElementById("contatore").innerText = contatore;
                roamingSettings.values["contatore"] = contatore;

                percentage = contatore / 10000;
                document.getElementById("progress").style.width = percentage + "vw";

                //rotazione
                tap = 0;
                document.getElementById("uovo").style.transform = "rotate(0deg)";
                document.getElementById("crack").style.transform = "rotate(0deg)";

                /*
                azzera i bonus
                */
                roamingSettings.values["tapCost"] = null;
                roamingSettings.values["maisCost"] = null;
                roamingSettings.values["lvTap"] = null;
                roamingSettings.values["lvMais"] = null;

                //keep playing
                vittoria = false;
                roamingSettings.values["won"] = null;
                document.getElementById("vittoria").hidden = true;
            });
        }
    });

    function addScore() {
        if (roamingSettings.values["contatore"] != null && roamingSettings.values["contatore"] != 0) {
            httpRequest("http://medaip90.altervista.org/bolzenxl/eggme/leaders.php?text=" + roamingSettings.values["namePlayer"] + ": " + roamingSettings.values["contatore"] + "-");
        }
    }

    function commandInvokedHandler(command) {
        // Display message
        WinJS.log && WinJS.log("The '" + command.label + "' command has been selected.",
        "sample", "status");
    }

    function won() {
        if (contatore < 100000) {

        } else if (contatore >= 100000 && contatore < 200000) {
            document.getElementById("crack").src = "../../immagini/crack1.png";
        } else if (contatore >= 200000 && contatore < 300000) {
            document.getElementById("crack").src = "../../immagini/crack2.png";
        } else if (contatore >= 300000 && contatore < 400000) {
            document.getElementById("crack").src = "../../immagini/crack3.png";
        } else if (contatore >= 400000 && contatore < 500000) {
            document.getElementById("crack").src = "../../immagini/crack4.png";
        } else if (contatore >= 500000 && contatore < 600000) {
            document.getElementById("crack").src = "../../immagini/crack5.png";
        } else if (contatore >= 600000 && contatore < 700000) {
            document.getElementById("crack").src = "../../immagini/crack6.png";
        } else if (contatore >= 700000 && contatore < 800000) {
            document.getElementById("crack").src = "../../immagini/crack7.png";
        } else if (contatore >= 800000 && contatore < 900000) {
            document.getElementById("crack").src = "../../immagini/crack8.png";
        } else if (contatore >= 900000 && contatore < 1000000) {
            document.getElementById("crack").src = "../../immagini/crack9.png";
        } else {
            document.getElementById("uovo").src = "../../immagini/cracked.png";
            document.getElementById("crack").src = "";

            var medagliaPremio = getRandom();

            if (medagliaPremio == 1) {
                roamingSettings.values["last"] = "../../medalsRes/medal1.png";
                roamingSettings.values["last1"] = "Cob Medal";
                document.getElementById("premio").src = "../../medalsRes/medal1.png";
                document.getElementById("nomePremio").innerText = "Cob Medal";
                roamingSettings.values["medal1"] = true;
            } else if (medagliaPremio == 2) {
                roamingSettings.values["last"] = "../../medalsRes/medal2.png";
                roamingSettings.values["last1"] = "Silver Medal";
                document.getElementById("premio").src = "../../medalsRes/medal2.png";
                document.getElementById("nomePremio").innerText = "Silver Medal";
                roamingSettings.values["medal2"] = true;
            } else if (medagliaPremio == 3) {
                roamingSettings.values["last"] = "../../medalsRes/medal3.png";
                roamingSettings.values["last1"] = "Golden Medal";
                document.getElementById("premio").src = "../../medalsRes/medal3.png";
                document.getElementById("nomePremio").innerText = "Golden Medal";
                roamingSettings.values["medal3"] = true;
            } else if (medagliaPremio == 4) {
                roamingSettings.values["last"] = "../../medalsRes/medal4.png";
                roamingSettings.values["last1"] = "Egg Medal";
                document.getElementById("premio").src = "../../medalsRes/medal4.png";
                document.getElementById("nomePremio").innerText = "Egg Medal";
                roamingSettings.values["medal4"] = true;
            } else if (medagliaPremio == 5) {
                roamingSettings.values["last"] = "../../medalsRes/medal5.png";
                roamingSettings.values["last1"] = "Smasher Medal";
                document.getElementById("premio").src = "../../medalsRes/medal5.png";
                document.getElementById("nomePremio").innerText = "Smasher Medal";
                roamingSettings.values["medal5"] = true;
            } else if (medagliaPremio == 6) {
                roamingSettings.values["last"] = "../../medalsRes/medal6.png";
                roamingSettings.values["last1"] = "Chicken Medal";
                document.getElementById("premio").src = "../../medalsRes/medal6.png";
                document.getElementById("nomePremio").innerText = "Chicken Medal";
                roamingSettings.values["medal6"] = true;
            }
            
            roamingSettings.values["won"] = true;

            document.getElementById("vittoria").hidden = false;

            playWin();
        }
    }

    var weights = [0.5, 0.25, 0.1, 0.08, 0.05, 0.02]; // probabilities
    var results = [1, 2, 3, 4, 5, 6]; // values to return

    function getRandom() {
        var num = Math.random(),
            s = 0,
            lastIndex = weights.length - 1;

        for (var i = 0; i < lastIndex; ++i) {
            s += weights[i];
            if (num < s) {
                return results[i];
            }
        }

        return results[lastIndex];
    }

    function showShareUI() {
        Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
    }

    function doShare(e) {
        var request = e.request;
        request.data.properties.title = "EggMe";
        request.data.properties.description = "That's my score on EggMe!";
        request.data.setText("*EggMe*\n\nI've tapped the egg " + contatore + " times, with tap multiplier Lv." + lvTap + " and mais multiplier Lv." + (lvMais + 1) + ".");
    }

    var myRequest = null;

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
            
        } else {
        }
    }

    function httpRequest(variabile) {
        var networkInformation = Windows.Networking.Connectivity.NetworkInformation;
        var internetConnectionProfile = networkInformation.getInternetConnectionProfile();
        myRequest = CreateXmlHttpObject(httpReturnResponse);
        myRequest.open("GET", variabile, true);
        myRequest.send(null);
    }

})();
