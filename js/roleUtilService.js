/**
 * Created by yijuntao on 2016/3/17.
 */
ynUtilsApp
    .factory('roleUtilService', ['dataService',

        function (dataService) {
            var setClickStatus = function (arr, a) {
                angular.forEach(arr, function (t) {
                    t.isSelect = false;
                    if (t.barId === a.barId && t.type === a.type) {
                        t.isSelect = true;
                    }
                });
            };

            var getOrgs = function (arr, orgs) {
                if (Object.prototype.toString.apply(arr) === '[object Array]' && arr.length > 0) {
                    for (var i = 0, nLen = arr.length; i < nLen; i++) {
                        orgs.push(arr[i].orgNo);
                    }
                }
            };
            return {
                clickHeaderBar: function (aTeacherBar, aStudentBar, bar) {
                    setClickStatus(aTeacherBar, bar);
                    setClickStatus(aStudentBar, bar);
                    return bar;
                },
                _getOrgNos: function (arr) {
                    var orgNos = [];
                    getOrgs(arr, orgNos);
                    return orgNos;
                },
                getvaluesOfArr: function (arr, name) {
                    var aIds = [];
                    if (Object.prototype.toString.apply(arr) === "[object Array]" && arr.length > 0 && name) {
                        angular.forEach(arr, function (a) {
                            aIds.push(a[name]);
                        });
                    }
                    return aIds;
                },
                calculateSelected: function (nv, type, options) {
                    if (!type) {
                        if (nv.length > options.selected.length) {
                            for (var i = options.selected.length; i < nv.length; i++) {
                                options.selected.push(nv[i].item);
                            }
                        } else {
                            for (var i = 0, j = options.selected.length - nv.length; i < options.selected.length; i++) {
                                if (j <= 0) {
                                    break;
                                }
                                if (nv[i]) {
                                    if (options.selected[i].id != nv[i].item.id) {
                                        options.selected.splice(i, 1);
                                        j--;
                                        i--;
                                    }
                                } else {
                                    options.selected.splice(i, options.selected.length - i);
                                }
                            }
                        }
                    } else {
                        if (options.singleSelect) {
                            var i = 0;
                            angular.forEach(options.selected, function () {
                                i++;
                            });
                            options.selected.splice(i - 1, 1, nv);
                        } else {
                            options.selected.splice(0, 0, nv);
                            options.singleSelect = nv;
                        }
                    }
                },
                removeSelected: function (index, all, options, gridOption) {
                    if (all) {
                        var ids = [];
                        angular.forEach(options.selected, function (item) {
                            ids.push(item.id);
                        });
                        gridOption.uncheckOption(ids);
                        options.selected = [];
                        options.selectFlag = false;
                    } else {
                        gridOption.uncheckOption(options.selected[index].id);
                        options.selected.splice(index, 1);
                    }
                },
                selectAllDatas: function (options, bSelect) {
                    var aTeachers = [],
                        _promise;
                    if (options.activeBar.type === '1') {
                        _promise = dataService.sendPromiseForPost('allTeachers',options.getUrl());
                    }
                    if (options.activeBar.type === '2') {
                        _promise = dataService.sendPromiseForPost('allStudents',options.getUrl());
                    }
                    _promise.then(
                        function (data) {
                            if (Object.prototype.toString.apply(data.result.content) !== "[object Array]") {
                                return aTeachers;
                            }
                            aTeachers = data.result.content;
                            var arr = [];
                            if (bSelect) {
                                arr = _.union(aTeachers, options.selected);
                                options.selected = _.uniq(arr, false, 'id');
                            } else {
                                var aIds = _.pluck(aTeachers,'id');
                                var sIds = _.pluck(options.selected,'id');
                                arr = _.difference(sIds,aIds);
                                options.selected = _.reject(options.selected,function(o){
                                    return !_.contains(arr, o.id);
                                });
                            }
                            options.selectFlag = bSelect;
                        }
                    );
                },
                clearRepeatData: function (list) {
                    var temp = new Array();
                    if (!list) {
                        return temp;
                    }
                    for (var i = 0; i < list.length; i++) {
                        if (angular.equals(list[i], list[i + 1])) {
                            continue;
                        }
                        temp[temp.length] = list[i];
                    }
                    return temp;
                }
            }

        }
    ]);