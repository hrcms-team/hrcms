$(function() {
    var I18N = Hrcms.I18N;
    Hrcms.InfoManageView = {};
    Hrcms.InfoManageView.create = function(container) {
        var tThis = Hrcms.ContentView.create(container);
        var rightContentPanel = tThis.getRightPanelElement();
        var indicator;
        var dataGrid;
        var personForm;
        var currentModuleName;
        var SysModuleID = Hrcms.SysModuleID;
        function generateTableDataUrl(tablePath, dataPath) {
            return {
                table: "rest/tables/" + tablePath,
                data: "data/test/" + dataPath + ".json"
            };
        }

        function getTableDataRESTUrl(tablePath, dataPath) {
            return {
                table: "rest/tables/" + tablePath,
                data: "rest/entities/" + dataPath
            };
        }

        tThis.initialize(function(menu) {
            menu.configure(Hrcms.NavMenu_InfoManage_Config);
            menu.onItemClick(function(event) {
                if (Hrcms.debugEnabled)
                    console.log(event);
                if (indicator)
                    indicator.remove();
                if (dataGrid)
                    dataGrid.remove();
                if (personForm)
                    personForm.remove();
                currentModuleName = event.moduleName;
                indicator = Hrcms.NavIndicator.create(rightContentPanel);
                indicator.goTo(currentModuleName);
                dataGrid = Hrcms.DataGrid.create({
                    container: rightContentPanel,
                    offsetHeight: 82
                });
                indicator.configure({
                    toolbar: {barType: Hrcms.Tablebar},
                    tableNavTarget: dataGrid
                });
                var Url;
                // Different module load different table info and data from different URL
                if (SysModuleID.ContentNavMenu_InfoManage_Info_Person === event.moduleID) {
                    Url = generateTableDataUrl("basic/person", "person_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Info_ContactInfo === event.moduleID) {
                    Url = generateTableDataUrl("basic/person_contact", "contact_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Info_PersonNature === event.moduleID) {
                    Url = generateTableDataUrl("basic/person_nature", "person_properties_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Info_Evaluation === event.moduleID) {
                    Url = getTableDataRESTUrl("basic/person_evaluation", "evaluation");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Info_Family === event.moduleID) {
                    Url = getTableDataRESTUrl("basic/person_family", "family");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Records_JobExperience === event.moduleID) {
                    Url = getTableDataRESTUrl("resume/info_before_college", "resume");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Records_Degree === event.moduleID) {
                    Url = getTableDataRESTUrl("resume/education", "education");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Records_TrainingInLand === event.moduleID) {
                    Url = getTableDataRESTUrl("resume/training_inland", "educationinland");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Records_TrainingOutLand === event.moduleID) {
                    Url = getTableDataRESTUrl("resume/training_outland", "educationoutland");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Records_Award === event.moduleID) {
                    Url = getTableDataRESTUrl("resume/award", "award");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Records_Punishment === event.moduleID) {
                    Url = getTableDataRESTUrl("resume/punishment", "punishment");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Records_AnomalyInCollege === event.moduleID) {
                    Url = generateTableDataUrl("resume/anomaly", "anomaly_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Records_InfoToJoinCollege === event.moduleID) {
                    Url = generateTableDataUrl("resume/info2joincollege", "info2joincollege_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Records_QuitCollege === event.moduleID) {
                    Url = generateTableDataUrl("resume/quitcollege", "quitcollege_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_JobInfo_Unit === event.moduleID) {
                    Url = generateTableDataUrl("job/unit", "unit_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_JobInfo_Politics === event.moduleID) {
                    Url = generateTableDataUrl("job/politics", "politics_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_JobInfo_JobOfPolitics === event.moduleID) {
                    Url = generateTableDataUrl("job/jobofpolitics", "jobofpolitics_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_JobInfo_TechnicalTitles === event.moduleID) {
                    Url = generateTableDataUrl("job/technicaltitles", "technicaltitles_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_JobInfo_TechnicalLevel === event.moduleID) {
                    Url = generateTableDataUrl("job/technicallevel", "technicallevel_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Qualification_PostdoctoralTeacher === event.moduleID) {
                    Url = generateTableDataUrl("qualification/postdoctoralteacher", "postdoctoralteacher_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Qualification_VisitingScholarTeacher === event.moduleID) {
                    Url = generateTableDataUrl("qualification/visitingscholarteacher", "visitingscholarteacher_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Qualification_ExpertJob === event.moduleID) {
                    Url = generateTableDataUrl("qualification/expertjob", "expertjob_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Qualification_TalentsFunding === event.moduleID) {
                    Url = generateTableDataUrl("qualification/talentsfunding", "talentsfunding_data");
                } else if (SysModuleID.ContentNavMenu_InfoManage_Contract_EmploymentContract === event.moduleID) {
                    Url = generateTableDataUrl("contact/employmentcontract", "employmentcontract_data");
                }
                // Event function
                function sortup(event) {
                    var column = event ? event.column : null;
                    if (Hrcms.debugEnabled)
                        console.log(column);
                    // Remove all data rows first
                    $.getJSON(Url.data,
                    function(record) {
                        dataGrid.data(record);
                    });
                }
                function sortdown(event) {
                    var column = event ? event.column : null;
                    if (Hrcms.debugEnabled)
                        console.log(column);
                    $.getJSON(Url.data,
                    function(record) {
                        dataGrid.data(record);
                    });
                }
                function rowdblclick(event) {
                    if (Hrcms.debugEnabled)
                        console.log(event);
                    var employeeID = $($(this).find('td[field-name="职工号"]')[0]).find('div').html();
                    if (!employeeID || employeeID === "")
                        return;
                    indicator.toggle();
                    dataGrid.toggle();
                    personForm = Hrcms.PersonForm.create({
                        container: rightContentPanel,
                        navigator: [currentModuleName, employeeID],
                        goBack: function(currentTag) {
                            if (currentTag.html() === currentModuleName && personForm) {
                                indicator.toggle();
                                dataGrid.toggle();
                                personForm.remove();
                                delete personForm;
                            }
                        }
                    });

                    $.ajaxSetup({cache: false});
                    $.ajax({
                        type: "GET",
                        url: "app/html/basic/personInfo.html",
                        dataType: "html",
                        success: function(personInfoTempl) {
                            personForm.configure({
                                personFormTempl: personInfoTempl,
                                reportTemplURL: "app/html/basic/personSummary.html",
                                reportDataURL: "data/test/person_summary.json"
                            });
                        }
                    });
                }
                $.ajaxSetup({cache: false});
                $.getJSON(Url.table,
                function(table) {
                    dataGrid.configure({
                        columns: table.columns,
                        event: {
                            sortup: sortup,
                            sortdown: sortdown,
                            rowdblclick: rowdblclick
                        }
                    });
                    sortdown();
                }).fail(function(result) {
                    if (Hrcms.debugEnabled)
                        console.log(result);
                });
            });
        });

        var __superRemove = tThis.remove;
        tThis.remove = function() {
            if (personForm)
                personForm.remove();
            __superRemove();
        }

        // end
        return tThis;
    }
});