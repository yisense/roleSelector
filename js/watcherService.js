/**
 * Created by yijuntao on 2016/3/29.
 */
ynUtilsApp
    .factory('watcherSendPromise', ['$q', '$http',
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
                adminClassOfTea: basePath + "/orgClassSelector/queryAdminClass.htm?pageNumber=0&pageSize=9999",
                adminClassOfStu: basePath + "/userSelector/queryAdminClassByEnrollType.htm?",
                activity: basePath + "/userSelector/queryActivityCasCade.htm",
                specialty: basePath + "/majorSet/searchMajor.htm?&status=-1&pageNumber=0&pageSize=9999",
                teachingAdminClass: basePath + "/userSelector/queryTeachingAdminClass.htm",
                teachingAdminClassOfStu: basePath + "/userSelector/findLmsTeachingAdminClassByCourseAndTerm.htm",
                course: basePath + "/userSelector/findLmsCourseByTerm.htm",
                roomNum: basePath + "/userSelector/queryDormitoryRoomOfSelector.htm"
            };

            return {
                send: function (params, attr) {
                    return sendPromise({
                        type: 'POST',
                        url: oUrl[attr],
                        postParams: params
                    });
                }
            }
        }
    ])
    .factory('watcherAssembleParams', ['roleUtilService',
        function (roleUtilService) {
            return {
                assembleSystem: function (postParmas, selectInfo) {
                    if (selectInfo.options.systemId) {
                        postParmas.systemId = selectInfo.options.systemId;
                    }
                },
                assembleOrgNo: function (postParmas, selectInfo) {
                    var orgNos = roleUtilService._getOrgNos(selectInfo.orgNo);
                    orgNos.join(",");
                    postParmas.orgNo = orgNos;
                },
                assembleGrade: function (postParmas, selectInfo) {
                    postParmas.gradeId = selectInfo.gradeId;
                },
                assembleLevel: function (postParmas, selectInfo) {
                    postParmas.levelId = selectInfo.levelId;
                },
                assembleSpecialTy: function (postParmas, selectInfo) {
                    postParmas.specialTyId = selectInfo.specialtyId;
                },
                assembleSpecialty: function (postParmas, selectInfo) {
                    postParmas.specialtyId = selectInfo.specialtyId;
                },
                assembleEnrollType: function (postParmas, selectInfo) {
                    postParmas.enrollType = selectInfo.enrollTypeId;
                },
                assemblePlatformTermId: function (postParmas, selectInfo) {
                    postParmas.platformTermId = selectInfo.platformTermId;
                },
                assemblePlatformTermIdOfStu: function (postParmas, selectInfo) {
                    postParmas.platformTermId = selectInfo.termId;
                },
                assembleTermId: function (postParmas, selectInfo) {
                    postParmas.termId = selectInfo.termId;
                },
                assembleStatus: function (postParmas, selectInfo) {
                    postParmas.status = selectInfo.activityStatus;
                },
                assembleOrgList: function (postParmas, selectInfo) {
                    postParmas.orgList = roleUtilService._getOrgNos(selectInfo.orgNo);
                },
                assembleMainOrgSet: function (postParmas, selectInfo) {
                    postParmas.orgList = roleUtilService._getOrgNos(selectInfo.mainOrgSet);
                },
                assembleOrgSet: function (postParmas, selectInfo) {
                    postParmas.orgSet = roleUtilService._getOrgNos(selectInfo.orgNo);
                },
                assembleSchoolLevelId: function (postParmas, selectInfo) {
                    postParmas.schoolLevelId = selectInfo.levelId;
                },
                assembleCourseIds: function (postParmas, selectInfo) {
                    postParmas.courseIds = roleUtilService.getvaluesOfArr(selectInfo.courseIds, "id");
                },
                assembleBuildId: function (postParmas, selectInfo) {
                    postParmas.buildId = selectInfo.building;
                },
                assembleType: function (postParmas, selectInfo) {
                    postParmas.type = selectInfo.roomType;
                }

            };
        }
    ])
    .factory('watcherReceivePromise', ['watcherSendPromise', 'watcherAssembleParams',
        function (watcherSendPromise, watcherAssembleParams) {
            var receivePromise = function (promise, selectInfo, attr) {
                promise.then(
                    function (data) {
                        if (Object.prototype.toString.apply(data.result.content) === "[object Array]") {
                            selectInfo[attr] = data.result.content;
                        }
                        if (Object.prototype.toString.apply(data.result) === "[object Array]") {
                            selectInfo[attr] = data.result;
                        }
                    }
                );
            }

            return {
                adminClassOfTea: function (selectInfo,attr) {
                    selectInfo[attr] = [];
                    var postParmas = {};
                    watcherAssembleParams.assembleOrgNo(postParmas, selectInfo);
                    watcherAssembleParams.assembleGrade(postParmas, selectInfo);
                    watcherAssembleParams.assembleLevel(postParmas, selectInfo);
                    watcherAssembleParams.assembleSpecialTy(postParmas, selectInfo);
                    watcherAssembleParams.assembleEnrollType(postParmas, selectInfo);
                    var promise = watcherSendPromise.send(postParmas, 'adminClassOfTea');
                    receivePromise(promise, selectInfo, 'adminClasss');
                },
                adminClassOfStu: function (selectInfo,attr) {
                    selectInfo[attr] = [];
                    var postParmas = {};
                    watcherAssembleParams.assembleOrgNo(postParmas, selectInfo);
                    watcherAssembleParams.assembleGrade(postParmas, selectInfo);
                    watcherAssembleParams.assembleLevel(postParmas, selectInfo);
                    watcherAssembleParams.assembleSpecialTy(postParmas, selectInfo);
                    watcherAssembleParams.assembleEnrollType(postParmas, selectInfo);
                    var promise = watcherSendPromise.send(postParmas, 'adminClassOfStu');
                    receivePromise(promise, selectInfo, 'adminClasss');
                },
                activity: function (selectInfo,attr) {
                    selectInfo[attr] = [];
                    var postParmas = {};
                    watcherAssembleParams.assemblePlatformTermId(postParmas, selectInfo);
                    watcherAssembleParams.assembleStatus(postParmas, selectInfo);
                    watcherAssembleParams.assembleOrgList(postParmas, selectInfo);
                    var promise = watcherSendPromise.send(postParmas, 'activity');
                    receivePromise(promise, selectInfo, 'activityList');
                },
                activityOfStu: function (selectInfo,attr) {
                    selectInfo[attr] = [];
                    var postParmas = {};
                    watcherAssembleParams.assemblePlatformTermIdOfStu(postParmas, selectInfo);
                    watcherAssembleParams.assembleStatus(postParmas, selectInfo);
                    watcherAssembleParams.assembleMainOrgSet(postParmas, selectInfo);
                    var promise = watcherSendPromise.send(postParmas, 'activity');
                    receivePromise(promise, selectInfo, 'activityList');
                },
                specialty: function (selectInfo,attr) {
                    selectInfo[attr] = '';
                    var postParmas = {};
                    watcherAssembleParams.assembleSchoolLevelId(postParmas, selectInfo);
                    var promise = watcherSendPromise.send(postParmas, 'specialty');
                    receivePromise(promise, selectInfo, 'specialtys');
                },
                course: function (selectInfo,attr) {
                    selectInfo[attr] = [];
                    var postParmas = {};
                    watcherAssembleParams.assembleTermId(postParmas, selectInfo);
                    var promise = watcherSendPromise.send(postParmas, 'course');
                    receivePromise(promise, selectInfo, 'courses');
                },
                teachingAdminClass: function (selectInfo,attr) {
                    selectInfo[attr] = [];
                    var postParmas = {};
                    watcherAssembleParams.assembleSystem(postParmas, selectInfo);
                    watcherAssembleParams.assembleOrgSet(postParmas, selectInfo);
                    watcherAssembleParams.assembleGrade(postParmas, selectInfo);
                    watcherAssembleParams.assembleSpecialty(postParmas, selectInfo);
                    watcherAssembleParams.assembleEnrollType(postParmas, selectInfo);
                    var promise = watcherSendPromise.send(postParmas, 'teachingAdminClass');
                    receivePromise(promise, selectInfo, 'adminClasss');
                },
                teachingAdminClassOfStu: function (selectInfo,attr) {
                    selectInfo[attr] = [];
                    var postParmas = {};
                    watcherAssembleParams.assembleTermId(postParmas, selectInfo);
                    watcherAssembleParams.assembleCourseIds(postParmas, selectInfo);
                    var promise = watcherSendPromise.send(postParmas, 'teachingAdminClassOfStu');
                    receivePromise(promise, selectInfo, 'adminClasses');
                },
                roomNum: function (selectInfo,attr) {
                    selectInfo[attr] = [];
                    var postParmas = {};
                    watcherAssembleParams.assembleBuildId(postParmas, selectInfo);
                    watcherAssembleParams.assembleType(postParmas, selectInfo);
                    var promise = watcherSendPromise.send(postParmas, 'roomNum');
                    receivePromise(promise, selectInfo, 'roomNums');
                }

            };
        }
    ]);