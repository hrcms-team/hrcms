$(function() {
    var I18N = Hrcms.I18N;
    Hrcms.StatisticsView = {};
    Hrcms.StatisticsView.create = function(container) {
        var tThis = Hrcms.ContentView.create(container);

        tThis.initialize(function(menu) {
            menu.configure(Hrcms.NavMenu_StatisticAnalysisManage_Config);
            menu.onItemClick(function(event) {
                if (Hrcms.debugEnabled)
                    console.log(event);
            });
        });
        // end
        return tThis;
    }
});

