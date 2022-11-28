sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator, MessageBox) {
        "use strict";

        return Controller.extend("zsap.cubeone.prova.controller.CreaLibro", {
            onInit: function () {
              this.getView().setModel(new JSONModel({
                formCreaLibro: {}
              }), "modelCreaLibro")
            },
            onCreaLibro: function () {
                this.getView().setBusy(true)
                let modelSapSource = this.getOwnerComponent().getModel("pippo")

                let oForm = this.getView().getModel("modelCreaLibro").getProperty("/formCreaLibro")

                let oPayload = {
                    Titolo: oForm.titolo,
                    Autore: oForm.autore,
                    Annopubl: oForm.annopubb,
                    Nrpagine: oForm.nrpagine,
                    Editore: oForm.editore
                }
                modelSapSource.create("/Zlibry03Set", oPayload, {
                    success: (oData) =>{
                        this.getView().setBusy(false)
                        MessageBox.success("Libro creato correttamente")
                    },
                    error: (err) => {
                        this.getView().setBusy(false)
                        MessageBox.error("Errore nella creazione del libro")
                    }
                })
            }
        });
    });
