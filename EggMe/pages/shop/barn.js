// Per un'introduzione al modello Controllo pagina, vedere la seguente documentazione:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    var lvTap;
    var lvMais;

    var tapCost;
    var maisCost;

    WinJS.UI.Pages.define("/pages/shop/barn.html", {
        // La funzione viene chiamata quando un utente passa a questa pagina. Popola
        // gli elementi della pagina con i dati dell'applicazione.
        ready: function (element, options) {
            // TODO: inizializzare la pagina qui.
            // freeing navigation stack

            if (roamingSettings.values["tapCost"] != null) {
                tapCost = roamingSettings.values["tapCost"];
            } else {
                tapCost = 4;
            }

            if (roamingSettings.values["maisCost"] != null) {
                maisCost = roamingSettings.values["maisCost"];
            } else {
                maisCost = 4;
            }

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

            if (lvMais >= 19) {
                document.getElementById("maisBtn").disabled = true;
                document.getElementById("maisBtnSilver").disabled = true;
                document.getElementById("maisBtnGold").disabled = true;
            }

            var tmp = lvMais + 1;

            updateMais();

            document.getElementById("lvTap").innerText = "Lv." + lvTap;
            document.getElementById("lvMais").innerText = "Lv." + tmp;

            document.getElementById("tapCost").innerText = Math.pow(3, (tapCost));
            document.getElementById("maisCost").innerText = Math.pow(3, (maisCost));

            document.getElementById("tapCostSilver").innerText = Math.pow(2, (tapCost + 1));
            document.getElementById("maisCostSilver").innerText = Math.pow(2, (maisCost + 1));

            document.getElementById("tapCostGold").innerText = Math.pow(2, (tapCost));
            document.getElementById("maisCostGold").innerText = Math.pow(2, (maisCost));

            var w = document.getElementById("maisTd").offsetWidth / 20;
            var actualProgress = w * (lvMais + 1);

            document.getElementById("progressLv").style.width = actualProgress + "px";
            
            document.getElementById("backBarn").addEventListener('click', function () {
                playOpen();
                WinJS.Navigation.navigate("/pages/home/home.html");
            }, false);

            document.getElementById("infoTap").addEventListener('click', function () {
                // Create the message dialog and set its content
                var msg = new Windows.UI.Popups.MessageDialog("Buy this to increase Taps rate");

                // Add commands and set their command handlers
                msg.commands.append(
                    new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

                // Set the command that will be invoked by default
                msg.defaultCommandIndex = 0;

                // Set the command to be invoked when escape is pressed
                msg.cancelCommandIndex = 1;

                // Show the message dialog
                msg.showAsync();
            }, false);

            document.getElementById("infoMais").addEventListener('click', function () {
                // Create the message dialog and set its content
                var msg = new Windows.UI.Popups.MessageDialog("Buy this to increase Corn, Silver Corn, Golden Corn earning (max Lv. 20)");

                // Add commands and set their command handlers
                msg.commands.append(
                    new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

                // Set the command that will be invoked by default
                msg.defaultCommandIndex = 0;

                // Set the command to be invoked when escape is pressed
                msg.cancelCommandIndex = 1;

                // Show the message dialog
                msg.showAsync();
            }, false);

            document.getElementById("infoSilver").addEventListener('click', function () {
                // Create the message dialog and set its content
                var msg = new Windows.UI.Popups.MessageDialog("Buy this to add 20 Silver cobs");

                // Add commands and set their command handlers
                msg.commands.append(
                    new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

                // Set the command that will be invoked by default
                msg.defaultCommandIndex = 0;

                // Set the command to be invoked when escape is pressed
                msg.cancelCommandIndex = 1;

                // Show the message dialog
                msg.showAsync();
            }, false);

            document.getElementById("infoGold").addEventListener('click', function () {
                // Create the message dialog and set its content
                var msg = new Windows.UI.Popups.MessageDialog("Buy this to add 10 Golden cobs");

                // Add commands and set their command handlers
                msg.commands.append(
                    new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

                // Set the command that will be invoked by default
                msg.defaultCommandIndex = 0;

                // Set the command to be invoked when escape is pressed
                msg.cancelCommandIndex = 1;

                // Show the message dialog
                msg.showAsync();
            }, false);

            document.getElementById("silvermaisBtn").addEventListener('click', function () {
                playCobs();
                if (roamingSettings.values["contatoreMais"] >= 250) {
                    roamingSettings.values["contatoreMais"] = roamingSettings.values["contatoreMais"] - 250;
                    roamingSettings.values["contatoreMaisSilver"] = roamingSettings.values["contatoreMaisSilver"] + 20;
                    updateMais();
                } else {
                    maisError();
                }
            }, false);

            document.getElementById("goldmaisBtn").addEventListener('click', function () {
                playCobs();
                if (roamingSettings.values["contatoreMais"] >= 450) {
                    roamingSettings.values["contatoreMais"] = roamingSettings.values["contatoreMais"] - 450;
                    roamingSettings.values["contatoreMaisGold"] = roamingSettings.values["contatoreMaisGold"] + 10;
                    updateMais();
                } else {
                    maisError();
                }
            }, false);

            document.getElementById("goldmaisBtnSilver").addEventListener('click', function () {
                playCobs();
                if (roamingSettings.values["contatoreMaisSilver"] >= 100) {
                    roamingSettings.values["contatoreMaisSilver"] = roamingSettings.values["contatoreMaisSilver"] - 100;
                    roamingSettings.values["contatoreMaisGold"] = roamingSettings.values["contatoreMaisGold"] + 10;
                    updateMais();
                } else {
                    maisError();
                }
            }, false);

            document.getElementById("tap").addEventListener('click', function () {
                playCobs();
                if (roamingSettings.values["contatoreMais"] >= Math.pow(3, (tapCost))) {
                    lvTap++;
                    roamingSettings.values["lvTap"] = lvTap;
                    document.getElementById("lvTap").innerText = "Lv." + lvTap;
                    roamingSettings.values["contatoreMais"] = roamingSettings.values["contatoreMais"] - Math.pow(3, (tapCost));
                    tapCost++;
                    roamingSettings.values["tapCost"] = tapCost;
                    document.getElementById("tapCost").innerText = Math.pow(3, (tapCost));
                    document.getElementById("tapCostSilver").innerText = Math.pow(2, (tapCost + 1));
                    document.getElementById("tapCostGold").innerText = Math.pow(2, (tapCost));
                    updateMais();
                } else {
                    maisError();
                }
            }, false);

            document.getElementById("tapSilver").addEventListener('click', function () {
                playCobs();
                if (roamingSettings.values["contatoreMaisSilver"] >= Math.pow(2, (tapCost + 1))) {
                    lvTap++;
                    roamingSettings.values["lvTap"] = lvTap;
                    document.getElementById("lvTap").innerText = "Lv." + lvTap;
                    roamingSettings.values["contatoreMaisSilver"] = roamingSettings.values["contatoreMaisSilver"] - Math.pow(2, (tapCost + 1));
                    tapCost++;
                    roamingSettings.values["tapCost"] = tapCost;
                    document.getElementById("tapCost").innerText = Math.pow(3, (tapCost));
                    document.getElementById("tapCostSilver").innerText = Math.pow(2, (tapCost + 1));
                    document.getElementById("tapCostGold").innerText = Math.pow(2, (tapCost));
                    updateMais();
                } else {
                    maisError();
                }
            }, false);

            document.getElementById("tapGold").addEventListener('click', function () {
                playCobs();
                if (roamingSettings.values["contatoreMaisGold"] >= Math.pow(2, (tapCost))) {
                    lvTap++;
                    roamingSettings.values["lvTap"] = lvTap;
                    document.getElementById("lvTap").innerText = "Lv." + lvTap;
                    roamingSettings.values["contatoreMaisGold"] = roamingSettings.values["contatoreMaisGold"] - Math.pow(2, (tapCost));
                    tapCost++;
                    roamingSettings.values["tapCost"] = tapCost;
                    document.getElementById("tapCost").innerText = Math.pow(3, (tapCost));
                    document.getElementById("tapCostSilver").innerText = Math.pow(2, (tapCost + 1));
                    document.getElementById("tapCostGold").innerText = Math.pow(2, (tapCost));
                    updateMais();
                } else {
                    maisError();
                }
            }, false);

            document.getElementById("maisBtn").addEventListener('click', function () {
                playCobs();
                if (roamingSettings.values["contatoreMais"] >= Math.pow(3, (maisCost))) {

                    lvMais++;
                    if (lvMais < 19) {
                        roamingSettings.values["lvMais"] = lvMais;
                        tmp = lvMais + 1;
                        document.getElementById("lvMais").innerText = "Lv." + tmp;
                        roamingSettings.values["contatoreMais"] = roamingSettings.values["contatoreMais"] - Math.pow(3, (maisCost));
                        maisCost++;
                        roamingSettings.values["maisCost"] = maisCost;
                        document.getElementById("maisCost").innerText = Math.pow(3, roamingSettings.values["maisCost"]);
                        document.getElementById("maisCostSilver").innerText = Math.pow(2, (roamingSettings.values["maisCost"] + 1));
                        document.getElementById("maisCostGold").innerText = Math.pow(2, roamingSettings.values["maisCost"]);
                        updateMais();
                        actualProgress = w * (lvMais + 1);
                        document.getElementById("progressLv").style.width = actualProgress + "px";
                    } else if (lvMais == 19) {
                        roamingSettings.values["lvMais"] = lvMais;
                        tmp = lvMais + 1;
                        document.getElementById("lvMais").innerText = "Lv." + tmp;
                        roamingSettings.values["contatoreMais"] = roamingSettings.values["contatoreMais"] - Math.pow(3, (maisCost));
                        maisCost++;
                        roamingSettings.values["maisCost"] = maisCost;
                        document.getElementById("maisCost").innerText = Math.pow(3, roamingSettings.values["maisCost"]);
                        document.getElementById("maisCostSilver").innerText = Math.pow(2, (roamingSettings.values["maisCost"] + 1));
                        document.getElementById("maisCostGold").innerText = Math.pow(2, roamingSettings.values["maisCost"]);
                        updateMais();
                        actualProgress = w * (lvMais + 1);
                        document.getElementById("progressLv").style.width = actualProgress + "px";
                        // Create the message dialog and set its content
                        var msg = new Windows.UI.Popups.MessageDialog("No more levels!");

                        // Add commands and set their command handlers
                        msg.commands.append(
                            new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

                        // Set the command that will be invoked by default
                        msg.defaultCommandIndex = 0;

                        // Set the command to be invoked when escape is pressed
                        msg.cancelCommandIndex = 1;

                        // Show the message dialog
                        msg.showAsync();
                        document.getElementById("maisBtn").disabled = true;
                    } else {
                        document.getElementById("maisBtn").disabled = true;
                    }

                } else {
                    maisError();
                }
            }, false);

            document.getElementById("maisBtnSilver").addEventListener('click', function () {
                playCobs();
                if (roamingSettings.values["contatoreMaisSilver"] >= Math.pow(2, (maisCost + 1))) {

                    lvMais++;
                    if (lvMais < 19) {
                        roamingSettings.values["lvMais"] = lvMais;
                        tmp = lvMais + 1;
                        document.getElementById("lvMais").innerText = "Lv." + tmp;
                        roamingSettings.values["contatoreMaisSilver"] = roamingSettings.values["contatoreMaisSilver"] - Math.pow(2, (maisCost + 1));
                        maisCost++;
                        roamingSettings.values["maisCost"] = maisCost;
                        document.getElementById("maisCost").innerText = Math.pow(3, roamingSettings.values["maisCost"]);
                        document.getElementById("maisCostSilver").innerText = Math.pow(2, (roamingSettings.values["maisCost"] + 1));
                        document.getElementById("maisCostGold").innerText = Math.pow(2, roamingSettings.values["maisCost"]);
                        updateMais();
                        actualProgress = w * (lvMais + 1);
                        document.getElementById("progressLv").style.width = actualProgress + "px";
                    } else if (lvMais == 19) {
                        roamingSettings.values["lvMais"] = lvMais;
                        tmp = lvMais + 1;
                        document.getElementById("lvMais").innerText = "Lv." + tmp;
                        roamingSettings.values["contatoreMaisSilver"] = roamingSettings.values["contatoreMaisSilver"] - Math.pow(2, (maisCost + 1));
                        maisCost++;
                        roamingSettings.values["maisCost"] = maisCost;
                        document.getElementById("maisCost").innerText = Math.pow(3, roamingSettings.values["maisCost"]);
                        document.getElementById("maisCostSilver").innerText = Math.pow(2, (roamingSettings.values["maisCost"] + 1));
                        document.getElementById("maisCostGold").innerText = Math.pow(2, roamingSettings.values["maisCost"]);
                        updateMais();
                        actualProgress = w * (lvMais + 1);
                        document.getElementById("progressLv").style.width = actualProgress + "px";
                        // Create the message dialog and set its content
                        var msg = new Windows.UI.Popups.MessageDialog("No more levels!");

                        // Add commands and set their command handlers
                        msg.commands.append(
                            new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

                        // Set the command that will be invoked by default
                        msg.defaultCommandIndex = 0;

                        // Set the command to be invoked when escape is pressed
                        msg.cancelCommandIndex = 1;

                        // Show the message dialog
                        msg.showAsync();
                        document.getElementById("maisBtnSilver").disabled = true;
                    } else {
                        document.getElementById("maisBtnSilver").disabled = true;
                    }

                } else {
                    maisError();
                }
            }, false);

            document.getElementById("maisBtnGold").addEventListener('click', function () {
                playCobs();
                if (roamingSettings.values["contatoreMaisGold"] >= Math.pow(2, (maisCost))) {

                    lvMais++;
                    if (lvMais < 19) {
                        roamingSettings.values["lvMais"] = lvMais;
                        tmp = lvMais + 1;
                        document.getElementById("lvMais").innerText = "Lv." + tmp;
                        roamingSettings.values["contatoreMaisGold"] = roamingSettings.values["contatoreMaisGold"] - Math.pow(2, (maisCost));
                        maisCost++;
                        roamingSettings.values["maisCost"] = maisCost;
                        document.getElementById("maisCost").innerText = Math.pow(3, roamingSettings.values["maisCost"]);
                        document.getElementById("maisCostSilver").innerText = Math.pow(2, (roamingSettings.values["maisCost"] + 1));
                        document.getElementById("maisCostGold").innerText = Math.pow(2, roamingSettings.values["maisCost"]);
                        updateMais();
                        actualProgress = w * (lvMais + 1);
                        document.getElementById("progressLv").style.width = actualProgress + "px";
                    } else if (lvMais == 19) {
                        roamingSettings.values["lvMais"] = lvMais;
                        tmp = lvMais + 1;
                        document.getElementById("lvMais").innerText = "Lv." + tmp;
                        roamingSettings.values["contatoreMaisGold"] = roamingSettings.values["contatoreMaisGold"] - Math.pow(2, (maisCost));
                        maisCost++;
                        roamingSettings.values["maisCost"] = maisCost;
                        document.getElementById("maisCost").innerText = Math.pow(3, roamingSettings.values["maisCost"]);
                        document.getElementById("maisCostSilver").innerText = Math.pow(2, (roamingSettings.values["maisCost"] + 1));
                        document.getElementById("maisCostGold").innerText = Math.pow(2, roamingSettings.values["maisCost"]);
                        updateMais();
                        actualProgress = w * (lvMais + 1);
                        document.getElementById("progressLv").style.width = actualProgress + "px";
                        // Create the message dialog and set its content
                        var msg = new Windows.UI.Popups.MessageDialog("No more levels!");

                        // Add commands and set their command handlers
                        msg.commands.append(
                            new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

                        // Set the command that will be invoked by default
                        msg.defaultCommandIndex = 0;

                        // Set the command to be invoked when escape is pressed
                        msg.cancelCommandIndex = 1;

                        // Show the message dialog
                        msg.showAsync();
                        document.getElementById("maisBtnGold").disabled = true;
                    } else {
                        document.getElementById("maisBtnGold").disabled = true;
                    }

                } else {
                    maisError();
                }
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

    function maisError () {
        // Create the message dialog and set its content
        var msg = new Windows.UI.Popups.MessageDialog("You don't have enough corn to level up this item! Need more cobs? Ask for a loan in the bank section!");

        // Add commands and set their command handlers
        msg.commands.append(
            new Windows.UI.Popups.UICommand("Go to Bank", commandInvokedHandler));

        msg.commands.append(
            new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

        // Set the command that will be invoked by default
        msg.defaultCommandIndex = 0;

        // Set the command to be invoked when escape is pressed
        msg.cancelCommandIndex = 1;

        // Show the message dialog
        msg.showAsync();
    }

    function commandInvokedHandler(command) {
        // Display message
        WinJS.log && WinJS.log("The '" + command.label + "' command has been selected.",
        "sample", "status");

        if (command.label == "Close") {

        } else {
            playOpenBank();
            WinJS.Navigation.navigate("/pages/shop/shop.html");
        }
    }

    function updateMais() {
        if (roamingSettings.values["contatoreMais"] != null) {
            document.getElementById("contatoreMaisB").innerText = roamingSettings.values["contatoreMais"];
        } else {
            document.getElementById("contatoreMaisB").innerText = 0;
        }

        if (roamingSettings.values["contatoreMaisSilver"] != null) {
            document.getElementById("contatoreMaisSilverB").innerText = roamingSettings.values["contatoreMaisSilver"];
        } else {
            document.getElementById("contatoreMaisSilverB").innerText = 0;
        }

        if (roamingSettings.values["contatoreMaisGold"] != null) {
            document.getElementById("contatoreMaisGoldB").innerText = roamingSettings.values["contatoreMaisGold"];
        } else {
            document.getElementById("contatoreMaisGoldB").innerText = 0;
        }
    }

})();
