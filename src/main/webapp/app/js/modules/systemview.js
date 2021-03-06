$(function() {
    var I18N = Hrcms.I18N;
    Hrcms.SystemView = {};
    Hrcms.SystemView.create = function(container) {
        var tThis = Hrcms.ContentView.create(container);
        var rightPanel = tThis.getRightPanelElement();
        // Override function which is used by parent ContentView
        tThis.initialize(function(menu) {
            menu.configure(Hrcms.NavMenu_SystemManage_Config);
            menu.onItemClick(function(event) {
                if (Hrcms.debugEnabled)
                    console.log(event);
                var dictForm = Hrcms.DictForm.create({
                    container: rightPanel,
                    navigator: [event.moduleName]
                });
                $.ajaxSetup({cache: false});
                $.ajax({
                    type: "GET",
                    url: "app/html/dict/dictform.html",
                    dataType: "html",
                    success: function(dictFormTempl) {
                        dictForm.configure({
                            dictFormTempl: dictFormTempl,
                        });
                    }
                });
            });
        });

        // end
        return tThis;
    }
});
