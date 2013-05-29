$(function() {
    if (!window.Hrcms)
        window.Hrcms = {};
    var I18N = Hrcms.I18N;
    Hrcms.StatisticsView = {};
    Hrcms.StatisticsView.create = function(container) {
        var tThis = Hrcms.ContentView.create(container);
        tThis.loadLeftNavMenu = function(menu) {
            menu.configure(Hrcms.NavMenu_StatisticAnalysisManage_Config);
            menu.onItemClick(function(event) {
                if (Hrcms.debugEnabled)
                    console.log(event);
            });
        }

        tThis.initialize();
        // end
        return tThis;
    }
});

