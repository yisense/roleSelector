/**
 * Created by yijuntao on 2016/2/19.
 * 版本特性：
 * 一、新增特性：
 * a、使用指令分块分装，方便后期功能扩展；
 * b、合并http请求，减少请求次数；
 * c、查询sql优化；
 * d、业务权限配置；
 * e、grid默认配置每页显示15条；
 * f、开放选择全部查询结果按钮；
 * 二、业务功能范围：
 * a、选择老师：1-组织机构教职工，2-班主任，3-任课老师（教务），4-任课老师（教学），5-实习指导老师，6-宿管员
 * b、选择学生：1-行政班学生，2-教学班学生（教学），3-寝室学生，4-实习活动学生
 * 使用说明：
 * 在业务controller中注入roleSelectorService服务，调用方法：roleSelectorService.select(callback,option);
 * callback :回调函数，返回已选中人员数组；
 * option:业务配置
 * 示例地址：
 * V8项目启动之后访问：/ynedut/static/yineng/components/27-ynRoleSelector/index.html，
 * 选择人员后，按F12，已选人员在控制台显示，开发人员可参考人员对象属性结构；
 * 项目实例地址：
 * 消息管理系统>我发布的通知公告>发布通知公告>按人员>选择
 */
ynUtilsApp
    .factory('roleSelectorService', ['ynModal', '$rootScope', 'ynNotification',
        function (ynModal, $rootScope, ynNotification) {
            return {
                select: function (callBack, option) {
                    var $scope = $rootScope.$new();
                    var _options = {
                        //默认回填数组
                        selected:[],
                        //选择教师：1-组织机构教职工，2-班主任，3-任课老师（教务），4-任课老师（教学），5-实习指导老师，6-宿管员
                        aTea : ['1','2','3','4','5','6'],
                        //选择学生：1-行政班学生，2-教学班学生（教学），3-寝室学生，4-实习活动学生
                        aStu : ['1','2','3','4'],
                        selectFlag : false,
                        //默认单选配置1
                        singleSelect : false,
                        //默认单选配置2
                        useSingleChoice : false,
                        //管理域
                        isManage : false
                    }
                    $scope.options = angular.extend(_options, option);

                    $scope.options.selected = angular.copy($scope.options.selected);

                    var config = {
                        id: 'role',
                        title: '选择人员',
                        quickClose: false,
                        width: 1000,
                        button: [{
                            value: '完成选择',
                            callback: function () {
                                if (!$scope.options.isEmpty) {
                                    if (!$scope.options.selected || $scope.options.selected.length == 0) {
                                        ynNotification.notify('error', '请至少勾选一项！');
                                        return false;
                                    }
                                }
                                callBack($scope.options.selected);
                                return true;
                            },
                            autofocus: true
                        }, {
                            value: '取消',
                            callback: function () {
                                return true;
                            }
                        }]
                    };
                    var url = "<yn-role-selectors options=\"options\"></yn-role-selectors>";
                    ynModal.showModal(url, config, $scope);
                }
            }
        }
    ])
    .factory('ztreeOptionsService', ['$http',
        function ($http) {
            return {
                getTaOptionsForDimensions: function (datas) {
                    datas.treeOption = {
                        selectStyle: "checkBox",
                        viewStyle: "tree",
                        useSearch: true,
                        defaultName: "组织机构",
                        showKey: "name",
                        requestUrl: "/dimension/findAllNotPage.htm?",
                        treeConfig: {
                            url: "/userSelector/queryPlatformSysOrg.htm?",
                            name: "name",
                            idKey: "orgNo",
                            pIdKey: "parentNo",
                            requestParamKey: "dimensionId",
                            requestParamValue: "id",
                            chkboxType: {
                                "Y": "",
                                "N": ""
                            }
                        }
                    }
                },
                getTbOptionsForDimensions : function(datas){
                    datas.treeOption = {
                        selectStyle: "checkBox",
                        viewStyle: "tree",
                        useSearch: true,
                        defaultName: "组织机构",
                        showKey: "name",
                        disabledDimension:true,
                        requestUrl: "/dimension/findAllNotPage.htm?",
                        treeConfig: {
                            url: "/org/findAllOrgByDimensionId.htm?dimensionId=1&isRelease=true",
                            name: "name",
                            idKey: "orgNo",
                            pIdKey: "parentNo",
                            requestParam: "id"
                        }
                    }
                },
                getTcOptionsForDimensions : function(datas){
                    datas._treeOption = {
                        selectStyle: "checkBox",
                        viewStyle: "tree",
                        useSearch: true,
                        defaultName: "主管部门",
                        showKey: "name",
                        disabledDimension:true,
                        requestUrl: "/dimension/findAllNotPage.htm?",
                        treeConfig: {
                            url: "/org/findAllOrgByDimensionId.htm?dimensionId=1&isRelease=true",
                            name: "name",
                            idKey: "orgNo",
                            pIdKey: "parentNo",
                            requestParam: "id"
                        }
                    }
                }
            }
        }
    ]);
