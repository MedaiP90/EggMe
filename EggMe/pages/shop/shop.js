// Per un'introduzione al modello Controllo pagina, vedere la seguente documentazione:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    var currentApp = Windows.ApplicationModel.Store.CurrentApp;
    var licenseInformation = currentApp.licenseInformation;

    WinJS.UI.Pages.define("/pages/shop/shop.html", {
        // La funzione viene chiamata quando un utente passa a questa pagina. Popola
        // gli elementi della pagina con i dati dell'applicazione.
        ready: function (element, options) {
            // TODO: inizializzare la pagina qui.
            // freeing navigation stack

            document.getElementById("backBank").addEventListener('click', function () {
                playOpen();
                WinJS.Navigation.navigate("/pages/home/home.html");
            }, false);

            document.getElementById("infoLittle").addEventListener('click', function () {
                // Create the message dialog and set its content
                var msg = new Windows.UI.Popups.MessageDialog("+450 Cobs, +75 Silver Cobs, +45 Golden Cobs.");

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

            document.getElementById("buy1").addEventListener('click', function () {
                playCoins();
                buyThis("LittleBasket");
            }, false);

            document.getElementById("infoMedium").addEventListener('click', function () {
                // Create the message dialog and set its content
                var msg = new Windows.UI.Popups.MessageDialog("+900 Cobs, +150 Silver Cobs, +90 Golden Cobs.");

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

            document.getElementById("buy2").addEventListener('click', function () {
                playCoins();
                buyThis("MediumBasket");
            }, false);

            document.getElementById("infoLarge").addEventListener('click', function () {
                // Create the message dialog and set its content
                var msg = new Windows.UI.Popups.MessageDialog("+1800 Cobs, +300 Silver Cobs, +180 Golden Cobs.");

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

            document.getElementById("buy3").addEventListener('click', function () {
                playCoins();
                buyThis("LargeBasket");
            }, false);

            document.getElementById("infoSilo").addEventListener('click', function () {
                // Create the message dialog and set its content
                var msg = new Windows.UI.Popups.MessageDialog("+6000 Cobs, +1200 Silver Cobs, +600 Golden Cobs.");

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

            document.getElementById("buy4").addEventListener('click', function () {
                playCoins();
                buyThis("CobsSilo");
            }, false);

            document.getElementById("infoBarn").addEventListener('click', function () {
                // Create the message dialog and set its content
                var msg = new Windows.UI.Popups.MessageDialog("+15000 Cobs, +3000 Silver Cobs, +1500 Golden Cobs.");

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

            document.getElementById("buy5").addEventListener('click', function () {
                playCoins();
                buyThis("Barn");
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

    function buyThis(product) {
        if (!licenseInformation.productLicenses.lookup(product).isActive) {
            WinJS.log && WinJS.log("Buying ...", "sample", "status");
            currentApp.requestProductPurchaseAsync(product).done(function () {
                    if (licenseInformation.productLicenses.lookup(product).isActive) {
                        WinJS.log && WinJS.log("You bought " + product, "sample", "status");

                        //purchase section

                        if (product == "LittleBasket") {
                            roamingSettings.values["contatoreMais"] = roamingSettings.values["contatoreMais"] + 450;
                            roamingSettings.values["contatoreMaisSilver"] = roamingSettings.values["contatoreMaisSilver"] + 75;
                            roamingSettings.values["contatoreMaisGold"] = roamingSettings.values["contatoreMaisGold"] + 45;
                        } else if (product == "MediumBasket") {
                            roamingSettings.values["contatoreMais"] = roamingSettings.values["contatoreMais"] + 900;
                            roamingSettings.values["contatoreMaisSilver"] = roamingSettings.values["contatoreMaisSilver"] + 150;
                            roamingSettings.values["contatoreMaisGold"] = roamingSettings.values["contatoreMaisGold"] + 90;
                        } else if (product == "LaegeBasket") {
                            roamingSettings.values["contatoreMais"] = roamingSettings.values["contatoreMais"] + 1800;
                            roamingSettings.values["contatoreMaisSilver"] = roamingSettings.values["contatoreMaisSilver"] + 300;
                            roamingSettings.values["contatoreMaisGold"] = roamingSettings.values["contatoreMaisGold"] + 180;
                        } else if (product == "CobsSilo") {
                            roamingSettings.values["contatoreMais"] = roamingSettings.values["contatoreMais"] + 6000;
                            roamingSettings.values["contatoreMaisSilver"] = roamingSettings.values["contatoreMaisSilver"] + 1200;
                            roamingSettings.values["contatoreMaisGold"] = roamingSettings.values["contatoreMaisGold"] + 600;
                        } else if (product == "Barn") {
                            roamingSettings.values["contatoreMais"] = roamingSettings.values["contatoreMais"] + 15000;
                            roamingSettings.values["contatoreMaisSilver"] = roamingSettings.values["contatoreMaisSilver"] + 3000;
                            roamingSettings.values["contatoreMaisGold"] = roamingSettings.values["contatoreMaisGold"] + 1500;
                        }

                        //end of section

                        // Create the message dialog and set its content
                        var msg = new Windows.UI.Popups.MessageDialog("You bought " + product);

                        // Add commands and set their command handlers
                        msg.commands.append(
                            new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

                        // Set the command that will be invoked by default
                        msg.defaultCommandIndex = 0;

                        // Set the command to be invoked when escape is pressed
                        msg.cancelCommandIndex = 1;

                        // Show the message dialog
                        msg.showAsync();

                    } else {
                        WinJS.log && WinJS.log(product + " was not purchased.", "sample", "status");

                        // Create the message dialog and set its content
                        var msg = new Windows.UI.Popups.MessageDialog(product + " was not purchased.");

                        // Add commands and set their command handlers
                        msg.commands.append(
                            new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

                        // Set the command that will be invoked by default
                        msg.defaultCommandIndex = 0;

                        // Set the command to be invoked when escape is pressed
                        msg.cancelCommandIndex = 1;

                        // Show the message dialog
                        msg.showAsync();

                    }
                }, function () {
                    WinJS.log && WinJS.log("Unable to buy " + product, "sample", "error");

                    // Create the message dialog and set its content
                    var msg = new Windows.UI.Popups.MessageDialog("Unable to buy " + product);

                    // Add commands and set their command handlers
                    msg.commands.append(
                        new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

                    // Set the command that will be invoked by default
                    msg.defaultCommandIndex = 0;

                    // Set the command to be invoked when escape is pressed
                    msg.cancelCommandIndex = 1;

                    // Show the message dialog
                    msg.showAsync();

                });
        } else {
            WinJS.log && WinJS.log("You already own " + product, "sample", "error");

            // Create the message dialog and set its content
            var msg = new Windows.UI.Popups.MessageDialog("You already own " + product);

            // Add commands and set their command handlers
            msg.commands.append(
                new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

            // Set the command that will be invoked by default
            msg.defaultCommandIndex = 0;

            // Set the command to be invoked when escape is pressed
            msg.cancelCommandIndex = 1;

            // Show the message dialog
            msg.showAsync();

        }
    }

    function commandInvokedHandler(command) {
        // Display message
        WinJS.log && WinJS.log("The '" + command.label + "' command has been selected.",
        "sample", "status");
    }

})();
