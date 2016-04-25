/**
 * Created by yijuntao on 2016/2/19.
 */
ynUtilsApp
    .directive('ynRoleSelectors', ['dataService', 'gridService', 'roleUtilService', 'dynamicStateService', '$compile',
        function (dataService, gridService, roleUtilService, dynamicStateService, $compile) {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/selector.html',
                scope: {
                    options: '=?'
                },
                controller: function ($scope) {
                    dataService.getHeaderBar($scope.options);
                    $scope.options.systemId = dynamicStateService.getCurrentSystemId();
                    $scope.gridOption = gridService.getGridOption($scope.options);


                    this.refesh = function () {
                        $scope.gridOption.refreshGrid($scope.gridOption.listUrl, $scope.options.getUrl());
                    }

                    this.reSelect = function (oType) {
                        $scope.gridOption.reSelect($scope.options.selected, oType);
                    }

                    $scope.$watch(function () {
                        if ($scope.options.useSingleChoice) {
                            return $scope.gridOption.getSelectedSingle();
                        }else{
                            return $scope.gridOption.getSelectedItems();
                        }
                        return $scope.gridOption.getSelectedItems();
                    }, function (newVal) {
                        if (newVal) {
                            roleUtilService.calculateSelected(newVal, $scope.options.useSingleChoice, $scope.options);
                        }
                    }, true);

                    this.removeSelected = function (index, all) {
                        roleUtilService.removeSelected(index, all, $scope.options, $scope.gridOption);
                    };

                },
                link: function (scope) {
                    var reCompile = function () {
                        angular.element('#ceshi').html('');
                        angular.element('#ceshi').append('<div yn-data-grid-mini grid-options="gridOption"></div>');
                        var template = $compile(angular.element('<div yn-data-grid-mini grid-options="gridOption"></div>'))(scope);
                        angular.element('#ceshi').append(template);
                    }
                    scope.$watch('options.activeBar', function (nv, ov, opts) {
                        if (angular.equals(nv, ov)) {
                            return;
                        }
                        scope.gridOption = gridService.getGridOption(scope.options);
                        reCompile();
                    });
                }
            }
        }
    ])
    .directive('headerBar', ['dataService', 'roleUtilService',
        function (dataService, roleUtilService) {
            return {
                restrict: 'AE',
                require: '^ynRoleSelectors',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/headerBar.html',
                scope: {
                    hoptions : '=?'
                },
                link: {
                    pre: function (scope, element, attrs, ctrl) {
                        scope.clickBar = function (aTeacherBar, aStudentbar, bar) {
                            scope.hoptions.activeBar = roleUtilService.clickHeaderBar(aTeacherBar, aStudentbar, bar);
                        }
                    }
                }
            }
        }
    ])
    .directive('rightSide', [
        function () {
            return {
                restrict: 'AE',
                require: '^ynRoleSelectors',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/rightSide.html',
                scope: {
                    roptions: '=?'
                },
                controller: function ($scope) {},
                link: function (scope, element, attrs, ctrl) {
                    scope.removeSelected = function (index, all) {
                        ctrl.removeSelected(index, all);
                    }
                }
            }
        }
    ])
    .directive('taLeftSide', ['assembleDataService', 'assembleUrlService', 'roleUtilService',
        function (assembleDataService, assembleUrlService, roleUtilService) {
            return {
                restrict: 'AE',
                require: '^ynRoleSelectors',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/taLeftSide.html',
                scope: {
                    toptions: '=?'
                },
                controller: function ($scope) {

                    $scope.selectInfo = assembleDataService.getTaDictionary();
                    $scope.selectInfo.toptions = $scope.toptions;
                    $scope.toptions.selectFlag = false;
                    $scope.toptions.getUrl = function () {
                        $scope.toptions.url = "/userSelector/queryTeacher4Selector.htm?";
                        var postParams = {};
                        assembleUrlService.assembleHeaderBarUrl(postParams, $scope.toptions);
                        assembleUrlService.assembleOrgUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleWorkStatusUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleMainJobCategories(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGenderUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assemblePostUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleJobTitleUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleIsOrganized(postParams, $scope.selectInfo);
                        assembleUrlService.assembleisLeader(postParams, $scope.selectInfo);
                        assembleUrlService.assembleQueryValue(postParams, $scope.selectInfo);
                        return postParams;
                    };

                    $scope.selectAllDatas = function (bSelect) {
                        roleUtilService.selectAllDatas($scope.toptions, bSelect);
                    };
                },
                link: function (scope, element, attrs, ctrl) {
                    scope.refreshGird = function () {
                        ctrl.refesh();
                    };

                    scope.$watch(function(){
                        return scope.toptions.selectFlag;
                    }, function (nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        ctrl.reSelect(nv);
                    });
                }
            }

        }
    ])
    .directive('tbLeftSide', ['assembleDataService', 'assembleUrlService', 'watcherReceivePromise', 'roleUtilService',
        function (assembleDataService, assembleUrlService, watcherReceivePromise, roleUtilService) {
            return {
                restrict: 'AE',
                require: '^ynRoleSelectors',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/tbLeftSide.html',
                scope: {
                    toptions: '=?'
                },
                controller: function ($scope) {

                    $scope.selectInfo = assembleDataService.getTbDictionary();
                    $scope.selectInfo.toptions = $scope.toptions;
                    $scope.toptions.selectFlag = false;
                    $scope.$watch(function () {
                        return $scope.selectInfo.levelId;
                    }, function () {
                        watcherReceivePromise.specialty($scope.selectInfo,'specialtyId');
                    });

                    $scope.$watch(function () {
                        return $scope.selectInfo.orgNo + $scope.selectInfo.gradeId + $scope.selectInfo.levelId
                            + $scope.selectInfo.specialtyId + $scope.selectInfo.enrollTypeId;
                    }, function () {
                        watcherReceivePromise.adminClassOfTea($scope.selectInfo,'adminClassIds');
                    });


                    $scope.toptions.getUrl = function () {
                        $scope.toptions.url = "/userSelector/queryTeacher4Selector.htm?";
                        var postParams = {};
                        assembleUrlService.assembleHeaderBarUrl(postParams, $scope.toptions);
                        assembleUrlService.assembleOrgUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGradeUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleLevelUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleSpecialtyUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleEnrollTypeUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleAdminClassUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGenderUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleQueryValue(postParams, $scope.selectInfo);
                        return postParams;
                    };

                    $scope.selectAllDatas = function (bSelect) {
                        roleUtilService.selectAllDatas($scope.toptions, bSelect);
                    };
                },
                link: function (scope, element, attrs, ctrl) {
                    scope.refreshGird = function () {
                        ctrl.refesh();
                    };

                    scope.$watch(function () {
                        return scope.toptions.selectFlag;
                    }, function (nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        ctrl.reSelect(nv);
                    });
                }
            }
        }
    ])
    .directive('tcLeftSide', ['assembleDataService', 'assembleUrlService', 'watcherReceivePromise', 'roleUtilService',
        function (assembleDataService, assembleUrlService, watcherReceivePromise, roleUtilService) {
            return {
                restrict: 'AE',
                require: '^ynRoleSelectors',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/tcLeftSide.html',
                scope: {
                    toptions: '=?'
                },
                controller: function ($scope) {

                    $scope.selectInfo = assembleDataService.getTcDictionary($scope.toptions);
                    $scope.selectInfo.options = $scope.toptions;
                    $scope.toptions.selectFlag = false;
                    $scope.$watch(function () {
                        return $scope.selectInfo.orgNo + $scope.selectInfo.gradeId
                            + $scope.selectInfo.specialtyId + $scope.selectInfo.enrollTypeId;
                    }, function () {
                        watcherReceivePromise.teachingAdminClass($scope.selectInfo,'adminClassIds');
                    });

                    $scope.toptions.getUrl = function () {
                        $scope.toptions.url = "/userSelector/queryTeacher4Selector.htm?";
                        var postParams = {};
                        assembleUrlService.assembleHeaderBarUrl(postParams, $scope.toptions);
                        assembleUrlService.assembleTermId(postParams, $scope.selectInfo);
                        assembleUrlService.assembleOrgUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGradeUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleSpecialtyUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleEnrollTypeUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleAdminClassUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleCourseId(postParams, $scope.selectInfo);
                        assembleUrlService.assembleTeachType(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGenderUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleQueryValue(postParams, $scope.selectInfo);
                        return postParams;
                    };

                    $scope.selectAllDatas = function (bSelect) {
                        roleUtilService.selectAllDatas($scope.toptions, bSelect);
                    };

                },
                link: function (scope, element, attrs, ctrl) {
                    scope.refreshGird = function () {
                        ctrl.refesh();
                    };

                    scope.$watch(function () {
                        return scope.toptions.selectFlag;
                    }, function (nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        ctrl.reSelect(nv);
                    });
                }
            }
        }
    ])
    .directive('tdLeftSide', ['assembleDataService', 'assembleUrlService', 'watcherReceivePromise', 'roleUtilService',
        function (assembleDataService, assembleUrlService, watcherReceivePromise, roleUtilService) {
            return {
                restrict: 'AE',
                require: '^ynRoleSelectors',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/tdLeftSide.html',
                scope: {
                    toptions: '=?'
                },
                controller: function ($scope) {
                    $scope.selectInfo = assembleDataService.getTdDictionary();
                    $scope.selectInfo.options = $scope.toptions;
                    $scope.toptions.selectFlag = false;
                    $scope.toptions.getUrl = function () {
                        $scope.toptions.url = "/userSelector/queryTeacher4Selector.htm?";
                        var postParams = {};
                        assembleUrlService.assembleHeaderBarUrl(postParams, $scope.toptions);
                        assembleUrlService.assembleTermId(postParams, $scope.selectInfo);
                        assembleUrlService.assembleOrgUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleCourseId(postParams, $scope.selectInfo);
                        assembleUrlService.assembleClassName(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGenderUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleQueryValue(postParams, $scope.selectInfo);
                        return postParams;
                    };

                    $scope.selectAllDatas = function (bSelect) {
                        roleUtilService.selectAllDatas($scope.toptions, bSelect);
                    };
                },
                link: function (scope, element, attrs, ctrl) {
                    scope.refreshGird = function () {
                        ctrl.refesh();
                    };

                    scope.$watch(function () {
                        return scope.toptions.selectFlag;
                    }, function (nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        ctrl.reSelect(nv);
                    });
                }
            }
        }
    ])
    .directive('teLeftSide', ['assembleDataService', 'assembleUrlService', 'watcherReceivePromise', 'roleUtilService',
        function (assembleDataService, assembleUrlService, watcherReceivePromise, roleUtilService) {
            return {
                restrict: 'AE',
                require: '^ynRoleSelectors',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/teLeftSide.html',
                scope: {
                    toptions: '=?'
                },
                controller: function ($scope) {

                    $scope.selectInfo = assembleDataService.getTeDictionary();
                    $scope.selectInfo.treeOption.defaultName = '主管部门';
                    $scope.selectInfo.options = $scope.toptions;
                    $scope.toptions.selectFlag = false;
                    $scope.$watch(function () {
                        return $scope.selectInfo.platformTermId + $scope.selectInfo.activityStatus + $scope.selectInfo.orgNo;
                    }, function () {
                        watcherReceivePromise.activity($scope.selectInfo,'activityIds');
                    });

                    $scope.toptions.getUrl = function () {
                        $scope.toptions.url = "/userSelector/queryTeacher4Selector.htm?";
                        var postParams = {};
                        assembleUrlService.assembleHeaderBarUrl(postParams, $scope.toptions);
                        assembleUrlService.assembleOrgUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assemblePlatformTermId(postParams, $scope.selectInfo);
                        assembleUrlService.assembleActivityStatus(postParams, $scope.selectInfo);
                        assembleUrlService.assembleActivityId(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGenderUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleQueryValue(postParams, $scope.selectInfo);
                        return postParams;
                    };

                    $scope.selectAllDatas = function (bSelect) {
                        roleUtilService.selectAllDatas($scope.toptions, bSelect);
                    };
                },
                link: function (scope, element, attrs, ctrl) {
                    scope.refreshGird = function () {
                        ctrl.refesh();
                    };

                    scope.$watch(function () {
                        return scope.toptions.selectFlag;
                    }, function (nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        ctrl.reSelect(nv);
                    });
                }
            }
        }
    ])
    .directive('tfLeftSide', ['assembleDataService', 'assembleUrlService', 'roleUtilService',
        function (assembleDataService, assembleUrlService, roleUtilService) {
            return {
                restrict: 'AE',
                require: '^ynRoleSelectors',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/tfLeftSide.html',
                scope: {
                    toptions: '=?'
                },
                controller: function ($scope) {

                    $scope.selectInfo = assembleDataService.getTfDictionary();
                    $scope.selectInfo.options = $scope.toptions;
                    $scope.toptions.selectFlag = false;
                    $scope.toptions.getUrl = function () {
                        $scope.toptions.url = "/userSelector/queryTeacher4Selector.htm?";
                        var postParams = {};
                        assembleUrlService.assembleHeaderBarUrl(postParams, $scope.toptions);
                        assembleUrlService.assembleOrgUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGenderUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleBuildingId(postParams, $scope.selectInfo);
                        assembleUrlService.assembleRoomGender(postParams, $scope.selectInfo);
                        assembleUrlService.assembleRoomType(postParams, $scope.selectInfo);
                        assembleUrlService.assembleRoomIdSet(postParams, $scope.selectInfo);
                        assembleUrlService.assembleQueryValue(postParams, $scope.selectInfo);
                        return postParams;
                    };

                    $scope.selectAllDatas = function (bSelect) {
                        roleUtilService.selectAllDatas($scope.toptions, bSelect);
                    };
                },
                link: function (scope, element, attrs, ctrl) {
                    scope.refreshGird = function () {
                        ctrl.refesh();
                    };

                    scope.$watch(function () {
                        return scope.toptions.selectFlag;
                    }, function (nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        ctrl.reSelect(nv);
                    });
                }
            }
        }
    ])
    .directive('saLeftSide', ['assembleDataService', 'assembleUrlService', 'watcherReceivePromise', 'roleUtilService',
        function (assembleDataService, assembleUrlService, watcherReceivePromise, roleUtilService) {
            return {
                restrict: 'AE',
                require: '^ynRoleSelectors',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/saLeftSide.html',
                scope: {
                    soptions: '=?'
                },
                controller: function ($scope) {

                    $scope.selectInfo = assembleDataService.getSaDictionary();
                    $scope.selectInfo.options = $scope.soptions;
                    $scope.soptions.selectFlag = false;
                    $scope.$watch(function () {
                        return $scope.selectInfo.levelId;
                    }, function () {
                        watcherReceivePromise.specialty($scope.selectInfo,'specialtyId');
                    });

                    $scope.$watch(function () {
                        return $scope.selectInfo.orgNo + $scope.selectInfo.gradeId
                            + $scope.selectInfo.levelId + $scope.selectInfo.specialtyId + $scope.selectInfo.enrollTypeId;
                    }, function () {
                        watcherReceivePromise.adminClassOfStu($scope.selectInfo,'adminClassIds');
                    });

                    $scope.soptions.getUrl = function () {
                        $scope.soptions.url = "/userSelector/queryStudent4Selector.htm?";
                        var postParams = {};
                        assembleUrlService.assembleHeaderBarUrl(postParams, $scope.soptions);
                        assembleUrlService.assembleOrgUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGradeUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleLevelUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleSpecialtyUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleEnrollTypeUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleAdminClassUrlOfStu(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGenderUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleIsOrder(postParams, $scope.selectInfo);
                        assembleUrlService.assembleIsDorm(postParams, $scope.selectInfo);
                        assembleUrlService.assembleQueryValue(postParams, $scope.selectInfo);
                        return postParams;
                    };

                    $scope.selectAllDatas = function (bSelect) {
                        roleUtilService.selectAllDatas($scope.soptions, bSelect);
                    };
                },
                link: function (scope, element, attrs, ctrl) {
                    scope.refreshGird = function () {
                        ctrl.refesh();
                    };

                    scope.$watch(function () {
                        return scope.soptions.selectFlag;
                    }, function (nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        ctrl.reSelect(nv);
                    });
                }
            }
        }
    ])
    .directive('sbLeftSide', ['assembleDataService', 'assembleUrlService', 'watcherReceivePromise', 'roleUtilService',
        function (assembleDataService, assembleUrlService, watcherReceivePromise, roleUtilService) {
            return {
                restrict: 'AE',
                require: '^ynRoleSelectors',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/sbLeftSide.html',
                scope: {
                    soptions: '=?'
                },
                controller: function ($scope) {

                    $scope.selectInfo = assembleDataService.getSbDictionary();
                    $scope.selectInfo.options = $scope.soptions;
                    $scope.soptions.selectFlag = false;
                    $scope.$watch(function () {
                        return $scope.selectInfo.termId;
                    }, function () {
                        watcherReceivePromise.course($scope.selectInfo,'courseIds');
                    });

                    $scope.$watch(function () {
                        return $scope.selectInfo.termId + roleUtilService.getvaluesOfArr($scope.selectInfo.courseIds, "id");
                    }, function () {
                        watcherReceivePromise.teachingAdminClassOfStu($scope.selectInfo,'adminClassIds');
                    });

                    $scope.soptions.getUrl = function () {
                        $scope.soptions.url = "/userSelector/queryStudent4Selector.htm?";
                        var postParams = {};
                        assembleUrlService.assembleHeaderBarUrl(postParams, $scope.soptions);
                        assembleUrlService.assembleTermId(postParams, $scope.selectInfo);
                        assembleUrlService.assembleCourseIdSet(postParams, $scope.selectInfo);
                        assembleUrlService.assembleAdminClassOfStu(postParams, $scope.selectInfo);
                        assembleUrlService.assembleQueryValue(postParams, $scope.selectInfo);
                        return postParams;
                    };

                    $scope.selectAllDatas = function (bSelect) {
                        roleUtilService.selectAllDatas($scope.soptions, bSelect);
                    };
                },
                link: function (scope, element, attrs, ctrl) {
                    scope.refreshGird = function () {
                        ctrl.refesh();
                    };

                    scope.$watch(function () {
                        return scope.soptions.selectFlag;
                    }, function (nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        ctrl.reSelect(nv);
                    });
                }
            }
        }
    ])
    .directive('scLeftSide', ['assembleDataService', 'assembleUrlService', 'watcherReceivePromise', 'roleUtilService',
        function (assembleDataService, assembleUrlService, watcherReceivePromise, roleUtilService) {
            return {
                restrict: 'AE',
                require: '^ynRoleSelectors',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/scLeftSide.html',
                scope: {
                    soptions: '=?'
                },
                controller: function ($scope) {

                    $scope.selectInfo = assembleDataService.getScDictionary();
                    $scope.selectInfo.options = $scope.soptions;
                    $scope.soptions.selectFlag = false;
                    $scope.$watch(function () {
                        return $scope.selectInfo.levelId;
                    }, function () {
                        watcherReceivePromise.specialty($scope.selectInfo,'specialtyId');
                    });

                    $scope.$watch(function () {
                        return $scope.selectInfo.orgNo + $scope.selectInfo.gradeId + $scope.selectInfo.levelId
                            + $scope.selectInfo.specialtyId + $scope.selectInfo.enrollTypeId;
                    }, function () {
                        watcherReceivePromise.adminClassOfStu($scope.selectInfo,'adminClassIds');
                    });

                    $scope.$watch(function () {
                        return $scope.selectInfo.building + $scope.selectInfo.roomType;
                    }, function () {
                        watcherReceivePromise.roomNum($scope.selectInfo,'roomIdSet');
                    });


                    $scope.soptions.getUrl = function () {
                        $scope.soptions.url = "/userSelector/queryStudent4Selector.htm?";
                        var postParams = {};
                        assembleUrlService.assembleHeaderBarUrl(postParams, $scope.soptions);
                        assembleUrlService.assembleOrgUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGradeUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleLevelUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleSpecialtyUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleEnrollTypeUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleAdminClassUrlOfStu(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGenderUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleBuilding(postParams, $scope.selectInfo);
                        assembleUrlService.assembleRoomType(postParams, $scope.selectInfo);
                        assembleUrlService.assembleRoomIdSet(postParams, $scope.selectInfo);
                        assembleUrlService.assembleQueryValue(postParams, $scope.selectInfo);
                        return postParams;
                    };

                    $scope.selectAllDatas = function (bSelect) {
                        roleUtilService.selectAllDatas($scope.soptions, bSelect);
                    };
                },
                link: function (scope, element, attrs, ctrl) {
                    scope.refreshGird = function () {
                        ctrl.refesh();
                    };

                    scope.$watch(function () {
                        return scope.soptions.selectFlag;
                    }, function (nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        ctrl.reSelect(nv);
                    });
                }
            }
        }
    ])
    .directive('sdLeftSide', ['assembleDataService', 'assembleUrlService', 'watcherReceivePromise', 'roleUtilService',
        function (assembleDataService, assembleUrlService, watcherReceivePromise, roleUtilService) {
            return {
                restrict: 'AE',
                require: '^ynRoleSelectors',
                replace: true,
                templateUrl: basePath + '/static/yineng/components/27-ynRoleSelector/tpl/sdLeftSide.html',
                scope: {
                    soptions: '=?'
                },
                controller: function ($scope) {

                    $scope.selectInfo = assembleDataService.getSdDictionary();
                    $scope.selectInfo.options = $scope.soptions;
                    $scope.soptions.selectFlag = false;
                    $scope.$watch(function () {
                        return $scope.selectInfo.termId + $scope.selectInfo.activityStatus + $scope.selectInfo.mainOrgSet;
                    }, function () {
                        watcherReceivePromise.activityOfStu($scope.selectInfo,'activityIdSet');
                    });

                    $scope.$watch(function () {
                        return $scope.selectInfo.levelId;
                    }, function () {
                        watcherReceivePromise.specialty($scope.selectInfo,'specialtyId');
                    });

                    $scope.$watch(function () {
                        return $scope.selectInfo.orgNo + $scope.selectInfo.gradeId + $scope.selectInfo.levelId
                            + $scope.selectInfo.specialtyId + $scope.selectInfo.enrollTypeId;
                    }, function () {
                        watcherReceivePromise.adminClassOfStu($scope.selectInfo,'adminClassIds');
                    });

                    $scope.soptions.getUrl = function () {
                        $scope.soptions.url = "/userSelector/queryStudent4Selector.htm?";
                        var postParams = {};
                        assembleUrlService.assembleHeaderBarUrl(postParams, $scope.soptions);
                        assembleUrlService.assembleTermId(postParams, $scope.selectInfo);
                        assembleUrlService.assembleActivityStatus(postParams, $scope.selectInfo);
                        assembleUrlService.asembleMainOrgSet(postParams, $scope.selectInfo);
                        assembleUrlService.assembleActivityIdSetOfStu(postParams, $scope.selectInfo);
                        assembleUrlService.assembleCompanyIdSet(postParams, $scope.selectInfo);
                        assembleUrlService.assembleTeacher(postParams, $scope.selectInfo);
                        assembleUrlService.assembleOrgUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleLevelUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleSpecialtyUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGradeUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleEnrollTypeUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleAdminClassOfStu(postParams, $scope.selectInfo);
                        assembleUrlService.assembleGenderUrl(postParams, $scope.selectInfo);
                        assembleUrlService.assembleQueryValue(postParams, $scope.selectInfo);

                        return postParams;
                    };

                    $scope.selectAllDatas = function (bSelect) {
                        roleUtilService.selectAllDatas($scope.soptions, bSelect);
                    };
                },
                link: function (scope, element, attrs, ctrl) {
                    scope.refreshGird = function () {
                        ctrl.refesh();
                    };

                    scope.$watch(function () {
                        return scope.soptions.selectFlag;
                    }, function (nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        ctrl.reSelect(nv);
                    });
                }
            }
        }
    ]);