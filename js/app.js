/**
 * Created by yijuntao on 2016/2/19.
 */
angular.module("ynedut8App")
    .controller('demoCtrl',['$scope','roleSelectorService',function($scope,roleSelectorService){
        $scope.clickFn = function(){
            roleSelectorService.select(function(users){
                console.log(users);
            },{
                selected : [],
                aTea : ['1','2','3','4','5','6'],
                aStu : ['1','2','3','4']
            });
        };
    }]);

