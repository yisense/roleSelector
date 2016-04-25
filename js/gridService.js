/**
 * Created by yijuntao on 2016/3/17.
 */
ynUtilsApp
.factory('gridService', [
        function () {

            var getOptionOfTeacher = function(options){
                switch (options.activeBar.barId)
                {
                    case '1' :
                        return {
                            primaryKey: "id",
                            pageSize: 15,
                            listUrl: "/userSelector/queryTeacher4Selector.htm?queryType=1",
                            columnDefs: [{
                                field: function (item) {
                                    return item.name + "(" + (item.alias ? (item.alias + ",") : "") + (item.genderName ? (item.genderName + ",") : "") + (item.userNumber ? (item.userNumber) : "") + ")";
                                }, displayName: "姓名/工号"
                            }, {
                                field: "post",
                                displayName: "职务"
                            }, {
                                field: "jobTitle",
                                displayName: "职称"
                            }, {
                                field: "status",
                                displayName: "在职状态"
                            }],
                            getSelectedSingle: function () {},
                            getSelectedItems: function () {},
                            setSelectedItems: function () {
                                return options.selected;
                            },
                            useAbovePagination: true,
                            useSingleChoice: options.useSingleChoice,
                            disableSelect: options.disableSelect,
                            fixPageSize: false,
                            useLeftCheckbox: true
                        }
                        break;
                    case '2' :
                        return {
                            primaryKey:"id",
                            pageSize:15,
                            listUrl: "/userSelector/queryTeacher4Selector.htm?queryType=2",
                            columnDefs:[
                                {field:function(item){return item.name+"("+(item.alias?(item.alias+","):"")+(item.genderName ? (item.genderName + ",") : "")+(item.userNumber ? (item.userNumber) : "")+")";},displayName: "姓名/工号"},
                                {field:"className", displayName:"班级"}
                            ],
                            getSelectedItems:function(){},
                            getSelectedSingle:function(){},
                            setSelectedItems:function(){
                                return options.selected;
                            },
                            useAbovePagination:true,
                            useSingleChoice:options.useSingleChoice,
                            disableSelect:options.disableSelect,
                            fixPageSize:false,
                            useLeftCheckbox:true
                        }
                        break;
                    case '3' :
                        return {
                            primaryKey:"id",
                            pageSize:15,
                            listUrl: "/userSelector/queryTeacher4Selector.htm?queryType=3",
                            columnDefs:[
                                {field:function(item){return item.name+"("+(item.alias?(item.alias+","):"")+(item.genderName ? (item.genderName + ",") : "")+(item.userNumber ? (item.userNumber) : "")+")";},displayName: "姓名/工号"},
                                {field:"className", displayName:"课程"}
                            ],
                            getSelectedItems:function(){},
                            getSelectedSingle:function(){},
                            setSelectedItems:function(){
                                return options.selected;
                            },
                            useAbovePagination:true,
                            useSingleChoice:options.useSingleChoice,
                            disableSelect:options.disableSelect,
                            fixPageSize:false,
                            useLeftCheckbox:true
                        }
                        break;
                    case '4' :
                        return {
                            primaryKey:"id",
                            pageSize:15,
                            listUrl: "/userSelector/queryTeacher4Selector.htm?queryType=4",
                            columnDefs:[
                                {field:function(item){return item.name+"("+(item.alias?(item.alias+","):"")+(item.genderName ? (item.genderName + ",") : "")+(item.userNumber ? (item.userNumber) : "")+")";},displayName: "姓名/工号"},
                                {field:"className", displayName:"课程"}
                            ],
                            getSelectedItems:function(){},
                            getSelectedSingle:function(){},
                            setSelectedItems:function(){
                                return options.selected;
                            },
                            useAbovePagination:true,
                            useSingleChoice:options.useSingleChoice,
                            disableSelect:options.disableSelect,
                            fixPageSize:false,
                            useLeftCheckbox:true
                        }
                        break;
                    case '5' :
                        return {
                            primaryKey:"id",
                            pageSize:15,
                            listUrl: "/userSelector/queryTeacher4Selector.htm?queryType=5",
                            columnDefs:[
                                {field:function(item){return item.name+"("+(item.alias ?(item.alias+","):"")+(item.genderName ? (item.genderName + ",") : "")+(item.userNumber ? (item.userNumber) : "")+")";},displayName: "姓名/工号"},
                                {field:"dgActivityName", displayName:"实习活动"},
                                {field:"phoneNumber", displayName:"手机号"}
                            ],
                            getSelectedItems:function(){},
                            getSelectedSingle:function(){},
                            setSelectedItems:function(){
                                return options.selected;
                            },
                            useAbovePagination:true,
                            useSingleChoice:options.useSingleChoice,
                            disableSelect:options.disableSelect,
                            fixPageSize:false,
                            useLeftCheckbox:true
                        }
                        break;
                    case '6' :
                        return {
                            primaryKey:"id",
                            pageSize:15,
                            listUrl: "/userSelector/queryTeacher4Selector.htm?queryType=6",
                            columnDefs:[
                                {field:function(item){return item.name+"("+(item.alias?(item.alias+","):"")+(item.genderName ? (item.genderName + ",") : "")+(item.userNumber ? (item.userNumber) : "")+")";},displayName: "姓名/工号"},
                                {field:"phoneNumber", displayName:"手机号"}
                            ],
                            getSelectedItems:function(){},
                            getSelectedSingle:function(){},
                            setSelectedItems:function(){
                                return options.selected;
                            },
                            useAbovePagination:true,
                            useSingleChoice:options.useSingleChoice,
                            disableSelect:options.disableSelect,
                            fixPageSize:false,
                            useLeftCheckbox:true
                        }
                        break;
                }
            };

            var getOptionOfStudent = function(options){
                switch (options.activeBar.barId)
                {
                    case '1' :
                        return {
                            primaryKey:"id",
                            pageSize:15,
                            listUrl: "/userSelector/queryStudent4Selector.htm?queryType=1",
                            columnDefs:[
                                {field:function(item){return item.name+"("+(item.alias?(item.alias+","):"")+(item.genderName ? (item.genderName + ",") : "")+(item.userNumber ? (item.userNumber) : "")+")";},displayName: "姓名/学号"},
                                {field:"className", displayName:"班级名称"},
                                {field:"phoneNumber", displayName:"手机号",columnSelectFlag :'no'},
                                {field:"homeAddress", displayName:"家庭地址",columnSelectFlag :'no'}
                            ],
                            getSelectedItems:function(){},
                            getSelectedSingle:function(){},
                            setSelectedItems:function(){
                                return options.selected;
                            },
                            useAbovePagination:true,
                            useSingleChoice:options.useSingleChoice,
                            disableSelect:options.disableSelect,
                            fixPageSize:false,
                            useLeftCheckbox:true
                        }
                        break;
                    case '2' :
                        return {
                            primaryKey:"id",
                            pageSize:15,
                            listUrl: "/userSelector/queryStudent4Selector.htm?queryType=2",
                            columnDefs:[
                                {field:function(item){return item.name+"("+(item.alias?(item.alias+","):"")+(item.genderName ? (item.genderName + ",") : "")+(item.userNumber ? (item.userNumber) : "")+")";},displayName: "姓名/学号"},
                                {field:"className", displayName:"课程"}
                            ],
                            getSelectedItems:function(){},
                            getSelectedSingle:function(){},
                            setSelectedItems:function(){
                                return options.selected;
                            },
                            useAbovePagination:true,
                            useSingleChoice:options.useSingleChoice,
                            disableSelect:options.disableSelect,
                            fixPageSize:false,
                            useLeftCheckbox:true
                        }
                        break;
                    case '3' :
                        return {
                            primaryKey:"id",
                            pageSize:15,
                            listUrl: "/userSelector/queryStudent4Selector.htm?queryType=3",
                            columnDefs:[
                                {field:function(item){return item.name+"("+(item.alias?(item.alias+","):"")+(item.genderName ? (item.genderName + ",") : "")+(item.userNumber ? (item.userNumber) : "")+")";},displayName: "姓名/学号"},
                                {field:"className", displayName:"班级"},
                                {field:"dormitoryRoom", displayName:"寝室"}
                            ],
                            getSelectedItems:function(){},
                            getSelectedSingle:function(){},
                            setSelectedItems:function(){
                                return options.selected;
                            },
                            useAbovePagination:true,
                            useSingleChoice:options.useSingleChoice,
                            disableSelect:options.disableSelect,
                            fixPageSize:false,
                            useLeftCheckbox:true
                        }
                        break;
                    case '4' :
                        return {
                            primaryKey:"id",
                            pageSize:15,
                            listUrl: "/userSelector/queryStudent4Selector.htm?queryType=4",
                            columnDefs:[
                                {field:function(item){return item.name+"("+(item.alias?(item.alias+","):"")+(item.genderName ? (item.genderName + ",") : "")+item.userNumber+")";},displayName: "姓名/学号"},
                                {field:"className", displayName:"班级"},
                                {field:"phoneNumber", displayName:"手机号",columnSelectFlag :'no'},
                                {field:"homeAddress", displayName:"家庭地址",columnSelectFlag :'no'}
                            ],
                            getSelectedItems:function(){},
                            getSelectedSingle:function(){},
                            setSelectedItems:function(){
                                return options.selected;
                            },
                            useAbovePagination:true,
                            useSingleChoice:options.useSingleChoice,
                            disableSelect:options.disableSelect,
                            fixPageSize:false,
                            useLeftCheckbox:true
                        }
                        break;
                }
            }



            return {
                getGridOption: function (options) {
                    switch (options.activeBar.type)
                    {
                        case '1' :
                            return getOptionOfTeacher(options);
                            break;
                        case '2' :
                            return getOptionOfStudent(options);
                            break;
                    }

                }
            }
        }
    ]);