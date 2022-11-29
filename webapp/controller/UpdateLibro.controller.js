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

        return Controller.extend("zsap.cubeone.prova.controller.UpdateLibro", {
            onInit: function () {
              this.getView().setModel(new JSONModel({
                formUpdateLibro: {}
              }), "modelUpdateLibro")
              const oRouter = this.getOwnerComponent().getRouter()
              oRouter.getRoute("TargetUpdateLibro").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function (oEvent) {
                const oUrlParameters = oEvent.getParameter("arguments")
                let modelSapSource = this.getOwnerComponent().getModel("pippo")
                let sUrl = `/Zlibry03Set(Mandt='${oUrlParameters.Mandt}',Titolo='${oUrlParameters.Titolo}')`
                sUrl = encodeURI(sUrl)
                modelSapSource.read(sUrl, {
                    success: (odata) => {
                        this.getView().getModel("modelUpdateLibro").setProperty("/formUpdateLibro", odata)
                    },
                    error: (err) => {

                    }
                })
            },
            onModifyLibro: function () {
                let oModifyItem = this.getView().getModel("modelUpdateLibro").getProperty("/formUpdateLibro")
                let modelSapSource = this.getOwnerComponent().getModel("pippo")

                const sUrl = "/" + oModifyItem.__metadata.uri.split("/")[oModifyItem.__metadata.uri.split("/").length - 1]

                let oPayload = {
                    ...oModifyItem
                }
                oPayload.Nrpagine = Number(oPayload.Nrpagine)
                
                modelSapSource.update(sUrl, oPayload, {
                    success: (odata) =>{
                        MessageBox.success("Salvataggio effettuato correttamente")
                    },
                    error: (res) => {
                        MessageBox.error("Errore")
                    }
                })

            }
        });
    });
