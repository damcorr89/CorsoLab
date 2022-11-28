sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("zsap.cubeone.prova.controller.Home", {
            onInit: function () {
                let modelSapSource = this.getOwnerComponent().getModel("pippo")
                this.getView().setModel(new JSONModel({
                    table_libri: [],
                    backup_libri: [],
                    form: {
                        autore: "",
                        titolo: "",
                        editore: "FELTRINELLI",
                        jsonProva: {
                            a: "",
                            b: new Date(),
                            c: 1342
                        }
                    }
                }), "modelLibri")

                let aFilters = [new Filter("Autore", FilterOperator.EQ, "STEPHEN KING")]
                let oMLibri = this.getView().getModel("modelLibri")
                var ciccio = oMLibri.getProperty("/form/jsonProva")
                debugger
                modelSapSource.read("/Zlibry03Set", {
                    filters: aFilters,
                    success: (oData) => {
                        let oMLibri = this.getView().getModel("modelLibri")
                        for (let index = 0; index < oData.results.length; index++) {
                            let element = oData.results[index]
                            element.DataCreazione = new Date()
                        }
                        oMLibri.setProperty("/table_libri", oData.results)
                        oMLibri.setProperty("/backup_libri", oData.results)
                    },
                    error: (err) => {
                        debugger
                    }
                })
            },
            navToCrea: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("TargetCreaLibro")
            }
        });
    });
