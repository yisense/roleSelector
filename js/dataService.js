/**
 * Created by yijuntao on 2016/3/17.
 */
ynUtilsApp
    .factory('dataService', ['$q', '$http',
        function ($q, $http) {

            var sendPromise = function (config) {
                var deffered = $q.defer(),
                    promise;
                var bIsString = Object.prototype.toString.apply(config.type) === "[object String]";
                if (bIsString && config.type === 'GET') {
                    promise = $http.get(config.url);
                }
                if (bIsString && config.type === 'POST') {
                    promise = $http.post(config.url, config.postParams);
                }
                promise.then(
                    function (response) {
                        deffered.resolve(response.data);
                    },
                    function (response) {
                        deffered.reject(response.data);
                    }
                );
                return deffered.promise;
            };

            var oUrl = {
                term: basePath + '/userSelector/getTerm.htm',
                allTeachers: basePath + "/userSelector/queryTeacher4Selector.htm?pageSize=99999&pageNumber=0",
                allStudents: basePath + "/userSelector/queryStudent4Selector.htm?pageSize=99999&pageNumber=0",
                getTaDictionary: basePath + "/userSelector/getTaDictionary.htm",
                getTbDictionary: basePath + "/userSelector/getTbDictionary.htm",
                getTcDictionary: basePath + "/userSelector/getTcDictionary.htm",
                getTdDictionary: basePath + "/userSelector/getTdDictionary.htm",
                getTfDictionary: basePath + "/userSelector/getTfDictionary.htm",
                getSaDictionary: basePath + "/userSelector/getSaDictionary.htm",
                getSbDictionary: basePath + "/userSelector/getSbDictionary.htm",
                getScDictionary: basePath + "/userSelector/getScDictionary.htm",
                getSdDictionary: basePath + "/userSelector/getSdDictionary.htm"

            };

            return {
                sendPromiseForGet: function (attr) {
                    return sendPromise({
                        type: 'GET',
                        url: oUrl[attr]
                    });
                },
                sendPromiseForPost: function (attr, params) {
                    return sendPromise({
                        type: 'POST',
                        url: oUrl[attr],
                        postParams: params
                    });
                },
                getHeaderBar: function (options) {
                    options.aTeacherNavBar = [], options.aStudentNavBar = [];
                    if (Object.prototype.toString.apply(options.aTea) === "[object Array]" && options.aTea.length > 0) {
                        for (var i = 0, nLen = options.aTea.length; i < nLen; i++) {
                            switch (options.aTea[i]) {
                                case '1':
                                    options.aTeacherNavBar.push({
                                        barName: '组织机构教职工',
                                        barId: '1',
                                        type: '1',
                                        isSelect: false
                                    });
                                    break;
                                case '2':
                                    options.aTeacherNavBar.push({
                                        barName: '班主任',
                                        barId: '2',
                                        type: '1',
                                        isSelect: false
                                    });
                                    break;
                                case '3':
                                    options.aTeacherNavBar.push({
                                        barName: '任课教师（教务）',
                                        barId: '3',
                                        type: '1',
                                        isSelect: false
                                    });
                                    break;
                                case '4':
                                    options.aTeacherNavBar.push({
                                        barName: '任课教师（教学）',
                                        barId: '4',
                                        type: '1',
                                        isSelect: false
                                    });
                                    break;
                                case '5':
                                    options.aTeacherNavBar.push({
                                        barName: '实习指导老师',
                                        barId: '5',
                                        type: '1',
                                        isSelect: false
                                    });
                                    break;
                                case '6':
                                    options.aTeacherNavBar.push({
                                        barName: '宿管员',
                                        barId: '6',
                                        type: '1',
                                        isSelect: false
                                    });
                                    break;

                            }
                        }
                    }
                    if (Object.prototype.toString.apply(options.aStu) === "[object Array]" && options.aStu.length > 0) {
                        for (var i = 0, nLen = options.aStu.length; i < nLen; i++) {
                            switch (options.aStu[i]) {
                                case '1':
                                    options.aStudentNavBar.push({
                                        barName: '行政班学生',
                                        barId: '1',
                                        type: '2',
                                        isSelect: false
                                    });
                                    break;
                                case '2':
                                    options.aStudentNavBar.push({
                                        barName: '教学班学生',
                                        barId: '2',
                                        type: '2',
                                        isSelect: false
                                    });
                                    break;
                                case '3':
                                    options.aStudentNavBar.push({
                                        barName: '寝室学生',
                                        barId: '3',
                                        type: '2',
                                        isSelect: false
                                    });
                                    break;
                                case '4':
                                    options.aStudentNavBar.push({
                                        barName: '实习活动学生',
                                        barId: '4',
                                        type: '2',
                                        isSelect: false
                                    });
                                    break;
                            }
                        }
                    }
                    if (options.aTeacherNavBar.length > 0) {
                        options.aTeacherNavBar[0].isSelect = true;
                        options.activeBar = options.aTeacherNavBar[0];
                    }
                    if (options.aTeacherNavBar.length === 0 && options.aStudentNavBar.length > 0) {
                        options.aStudentNavBar[0].isSelect = true;
                        options.activeBar = options.aStudentNavBar[0];
                    }
                }
            }
        }
    ]);