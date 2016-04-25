/**
 * Created by yijuntao on 2016/3/17.
 */
ynUtilsApp
    .factory('assembleUrlService', ['roleUtilService',
        function (roleUtilService) {
            return {
                assembleHeaderBarUrl: function (postParams, option) {
                    if (option.isManage && option.systemId) {
                        postParams.systemId = option.systemId;
                    }
                    if (option.activeBar) {
                        postParams.queryType = option.activeBar.barId;
                    } else {
                        postParams.queryType = 1;
                    }
                },
                assembleOrgUrl: function (postParams, selectInfo) {
                    var sOrg = roleUtilService._getOrgNos(selectInfo.orgNo);
                    postParams.orgSet = sOrg;
                },
                asembleMainOrgSet: function (postParams, selectInfo) {
                    var sOrg = roleUtilService._getOrgNos(selectInfo.mainOrgSet);
                    postParams.mainOrgSet = sOrg;
                },
                assembleCompanyIdSet: function (postParams, selectInfo) {
                    if (selectInfo.companyIdSet) {
                        postParams.companyIdSet = roleUtilService.getvaluesOfArr(selectInfo.companyIdSet, 'id');
                    }
                },
                assembleWorkStatusUrl: function (postParams, selectInfo) {
                    if (selectInfo.workingStatusIdList) {
                        postParams.statusSet = roleUtilService.getvaluesOfArr(selectInfo.workingStatusIdList, 'dictCode');
                    }
                },
                assembleGenderUrl: function (postParams, selectInfo) {
                    if (selectInfo.gender) {
                        postParams.gender = selectInfo.gender;
                    }
                },
                assembleRoomGender : function(postParams, selectInfo){
                    if (selectInfo.roomGender) {
                        postParams.roomGender = selectInfo.roomGender;
                    }
                },
                assemblePostUrl: function (postParams, selectInfo) {
                    if (selectInfo.postIds) {
                        postParams.post = roleUtilService.getvaluesOfArr(selectInfo.postIds, 'dictCode');
                    }
                },
                assembleJobTitleUrl: function (postParams, selectInfo) {
                    if (selectInfo.jobTitleIds) {
                        postParams.jobTitle = roleUtilService.getvaluesOfArr(selectInfo.jobTitleIds, 'dictCode');
                    }
                },
                assembleMainJobCategories: function (postParams, selectInfo) {
                    if (selectInfo.mainJobCategorieIds) {
                        postParams.mainJobCategories = roleUtilService.getvaluesOfArr(selectInfo.mainJobCategorieIds, 'mainJobCategories');
                    }
                },
                assembleIsOrganized: function (postParams, selectInfo) {
                    if (selectInfo.isOrganized) {
                        postParams.isOrganized = selectInfo.isOrganized;
                    }
                },
                assembleisLeader: function (postParams, selectInfo) {
                    if (selectInfo.isLeader) {
                        postParams.isLeader = selectInfo.isLeader;
                    }
                },
                assembleGradeUrl: function (postParams, selectInfo) {
                    if (selectInfo.gradeId) {
                        postParams.gradeId = selectInfo.gradeId;
                    }
                },
                assembleLevelUrl: function (postParams, selectInfo) {
                    if (selectInfo.levelId) {
                        postParams.levelId = selectInfo.levelId;
                    }
                },
                assembleSpecialtyUrl: function (postParams, selectInfo) {
                    if (selectInfo.specialtyId) {
                        postParams.specialtyId = selectInfo.specialtyId;
                    }
                },
                assembleEnrollTypeUrl: function (postParams, selectInfo) {
                    if (selectInfo.enrollTypeId) {
                        postParams.enrollType = selectInfo.enrollTypeId;
                    }
                },
                assembleAdminClassUrl: function (postParams, selectInfo) {
                    if (selectInfo.adminClassIds) {
                        postParams.adminClassIdSet = roleUtilService.getvaluesOfArr(selectInfo.adminClassIds, 'id');
                    }
                },
                assembleAdminClassUrlOfStu: function (postParams, selectInfo) {
                    if (selectInfo.adminClassIds) {
                        postParams.classIdSet = roleUtilService.getvaluesOfArr(selectInfo.adminClassIds, 'id');
                    }
                },
                assembleQueryValue: function (postParams, selectInfo) {
                    if (selectInfo.queryValue) {
                        postParams.queryValue = selectInfo.queryValue;
                    }
                },
                assembleTeacher: function (postParams, selectInfo) {
                    if (selectInfo.teacher) {
                        postParams.teacher = selectInfo.teacher;
                    }
                },
                assemblePlatformTermId: function (postParams, selectInfo) {
                    if (selectInfo.platformTermId) {
                        postParams.termId = selectInfo.platformTermId;
                    }
                },
                assembleActivityStatus: function (postParams, selectInfo) {
                    if (selectInfo.activityStatus) {
                        postParams.activityStatus = selectInfo.activityStatus;
                    }
                },
                assembleActivityId: function (postParams, selectInfo) {
                    if (selectInfo.activityIds) {
                        postParams.activityIds = roleUtilService.getvaluesOfArr(selectInfo.activityIds, 'id');
                    }
                },
                assembleActivityIdSetOfStu: function (postParams, selectInfo) {
                    if (selectInfo.activityIdSet) {
                        postParams.activityIdSet = roleUtilService.getvaluesOfArr(selectInfo.activityIdSet, 'id');
                    }
                },
                assembleIsOrder: function (postParams, selectInfo) {
                    if (selectInfo.isOrder) {
                        postParams.isOrder = selectInfo.isOrder;
                    }
                },
                assembleIsDorm: function (postParams, selectInfo) {
                    if (selectInfo.isDorm) {
                        postParams.isDorm = selectInfo.isDorm;
                    }
                },
                assembleTermId: function (postParams, selectInfo) {
                    if (selectInfo.termId) {
                        postParams.termId = selectInfo.termId;
                    }
                },
                assembleCourseIdSet: function (postParams, selectInfo) {
                    if (selectInfo.courseIds) {
                        postParams.courseIdSet = roleUtilService.getvaluesOfArr(selectInfo.courseIds, 'id');
                    }
                },
                assembleCourseId: function (postParams, selectInfo) {
                    if (selectInfo.course) {
                        postParams.courseId = selectInfo.course.id;
                    }
                },
                assembleTeachType: function (postParams, selectInfo) {
                    if (selectInfo.teachType) {
                        postParams.teachType = selectInfo.teachType;
                    }
                },
                assembleAdminClassOfStu: function (postParams, selectInfo) {
                    if (selectInfo.adminClassIds) {
                        postParams.classIdSet = roleUtilService.getvaluesOfArr(selectInfo.adminClassIds, 'id');
                    }
                },
                assembleBuildingId : function (postParams, selectInfo) {
                    if (selectInfo.building) {
                        postParams.buildingId = selectInfo.building;
                    }
                },
                assembleBuilding: function (postParams, selectInfo) {
                    if (selectInfo.building) {
                        postParams.building = selectInfo.building;
                    }
                },
                assembleRoomType: function (postParams, selectInfo) {
                    if (selectInfo.roomType) {
                        postParams.roomType = selectInfo.roomType;
                    }
                },
                assembleRoomIdSet: function (postParams, selectInfo) {
                    if (selectInfo.roomIdSet) {
                        postParams.roomIdSet = roleUtilService.getvaluesOfArr(selectInfo.roomIdSet, 'id');
                    }
                },
                assembleClassName: function (postParams, selectInfo) {
                    if (selectInfo.className) {
                        postParams.className = selectInfo.className;
                    }
                }
            }
        }
    ]);