/**
 * Created by yijuntao on 2016/3/17.
 */
ynUtilsApp
    .factory('assembleDataService', ['dataService', 'ztreeOptionsService', 'roleUtilService',
        function (dataService, ztreeOptionsService, roleUtilService) {
            return {
                getTaDictionary: function () {
                    var taDictionary = {};
                    var _promise = dataService.sendPromiseForGet('getTaDictionary');
                    _promise.then(
                        function (data) {
                            taDictionary.jobTitles = data.result.jobTitles;
                            taDictionary.mainJobCategories = roleUtilService.clearRepeatData(data.result.mainJobCategories);
                            taDictionary.posts = data.result.posts;
                            taDictionary.workingStatus = data.result.workingStatus;
                        }
                    );
                    ztreeOptionsService.getTaOptionsForDimensions(taDictionary);
                    return taDictionary;
                },
                getTbDictionary: function () {
                    var tbDictionary = {};
                    var _promise = dataService.sendPromiseForGet('getTbDictionary');
                    _promise.then(
                        function (data) {
                            tbDictionary.grades = data.result.grades;
                            tbDictionary.levels = data.result.levels.content;
                            tbDictionary.specialtys = data.result.specialtys.content;
                            tbDictionary.enrollTypes = data.result.enrollTypes;
                            tbDictionary.adminClasss = data.result.adminClasss.content;
                        }
                    );
                    ztreeOptionsService.getTbOptionsForDimensions(tbDictionary);
                    return tbDictionary;
                },
                getTcDictionary: function (options) {
                    var tcDictionary = {};
                    var _promise = dataService.sendPromiseForPost('getTcDictionary', options.getUrl());
                    _promise.then(
                        function (data) {
                            tcDictionary.terms = data.result.terms.reverse();
                            tcDictionary.courses = data.result.courses;
                            tcDictionary.adminClasss = data.result.adminClasss;
                            tcDictionary.enrollTypes = data.result.enrollTypes;
                            tcDictionary.specialtys = data.result.specialtys.content;
                            tcDictionary.grades = data.result.grades;
                        }
                    );
                    ztreeOptionsService.getTbOptionsForDimensions(tcDictionary);
                    return tcDictionary;
                },
                getTdDictionary: function () {
                    var tdDictionary = {};
                    var _promise = dataService.sendPromiseForGet('getTdDictionary');
                    _promise.then(
                        function (data) {
                            tdDictionary.terms = data.result.terms.reverse();
                            tdDictionary.courses = data.result.courses;
                            tdDictionary.adminClasses = data.result.adminClasses;
                        }
                    );
                    ztreeOptionsService.getTaOptionsForDimensions(tdDictionary);
                    return tdDictionary;

                },
                getTeDictionary: function () {
                    var teDictionary = {};
                    var _promise = dataService.sendPromiseForGet('term');
                    _promise.then(
                        function (data) {
                            teDictionary.terms = data.result.reverse();
                        }
                    );
                    ztreeOptionsService.getTbOptionsForDimensions(teDictionary);
                    return teDictionary;
                },
                getTfDictionary: function () {
                    var tfDictionary = {};
                    var _promise = dataService.sendPromiseForGet('getTfDictionary');
                    _promise.then(
                        function (data) {
                            tfDictionary.buildings = data.result.buildings;
                            tfDictionary.roomTypes = data.result.roomTypes.content;
                            tfDictionary.roomNums = data.result.roomNums;
                        }
                    );
                    ztreeOptionsService.getTbOptionsForDimensions(tfDictionary);
                    return tfDictionary;
                },
                getSaDictionary: function () {
                    var saDictionary = {};
                    var _promise = dataService.sendPromiseForGet('getSaDictionary');
                    _promise.then(
                        function (data) {
                            saDictionary.grades = data.result.grades;
                            saDictionary.levels = data.result.levels.content;
                            saDictionary.specialtys = data.result.specialtys.content;
                            saDictionary.enrollTypes = data.result.enrollTypes;
                            saDictionary.adminClasss = data.result.adminClasss;
                        }
                    );
                    ztreeOptionsService.getTbOptionsForDimensions(saDictionary);
                    return saDictionary;

                },
                getSbDictionary: function () {
                    var sbDictionary = {};
                    var _promise = dataService.sendPromiseForGet('getSbDictionary');
                    _promise.then(
                        function (data) {
                            sbDictionary.terms = data.result.terms.reverse();
                            sbDictionary.courses = data.result.courses;
                            sbDictionary.adminClasses = data.result.adminClasses;
                        }
                    );
                    return sbDictionary;

                },
                getScDictionary: function () {
                    var scDictionary = {};
                    var _promise = dataService.sendPromiseForGet('getScDictionary');
                    _promise.then(
                        function (data) {
                            scDictionary.grades = data.result.grades;
                            scDictionary.levels = data.result.levels.content;
                            scDictionary.specialtys = data.result.specialtys.content;
                            scDictionary.enrollTypes = data.result.enrollTypes;
                            scDictionary.adminClasss = data.result.adminClasss;
                            scDictionary.buildings = data.result.buildings;
                            scDictionary.roomTypes = data.result.roomTypes.content;
                            scDictionary.roomNums = data.result.roomNums;
                        }
                    );
                    ztreeOptionsService.getTbOptionsForDimensions(scDictionary);
                    return scDictionary;

                },
                getSdDictionary: function () {
                    var sdDictionary = {};
                    var _promise = dataService.sendPromiseForGet('getSdDictionary');
                    _promise.then(
                        function (data) {
                            sdDictionary.grades = data.result.grades;
                            sdDictionary.levels = data.result.levels.content;
                            sdDictionary.specialtys = data.result.specialtys.content;
                            sdDictionary.enrollTypes = data.result.enrollTypes;
                            sdDictionary.adminClasss = data.result.adminClasss;
                            sdDictionary.terms = data.result.terms;
                            sdDictionary.companys = data.result.companys;
                            sdDictionary.activityList = data.result.activityList;
                        }
                    );
                    ztreeOptionsService.getTbOptionsForDimensions(sdDictionary);
                    ztreeOptionsService.getTcOptionsForDimensions(sdDictionary);
                    return sdDictionary;

                }
            }
        }
    ]);