var todo = angular.module('todos',[]);
todo.controller('mainCtrl',['$scope',function($scope){
	// 本地数据加载
	if(angular.fromJson(localStorage.todolist)){
		$scope.todolist = angular.fromJson(localStorage.todolist);
	}else{
		$scope.todolist = [
		{id:1001,
			name:'aabbcc',
			theme:1,
			shixiang:[
			{id:10001,
				name:'bbb',
				state:'true'}
			]}


		]

		localStorage.todolist = angular.toJson($scope.todolist);
	}

	// 保存数据到本地
	var savedata = function(){
			localStorage.todolist = angular.toJson($scope.todolist);
	}


	$scope.currenttodos =$scope.todolist[0];

	 var gxnum = function(){
    	$scope.list = $scope.currenttodos.shixiang.filter(function(v,k){
    	return v.state === 'true';
    })

    $scope.num = $scope.list.length;
    }
    gxnum();


	


	// 值改变时保存
	$scope.save = function(){
		savedata();
	}

	// 添加事项
	
	$scope.addtodos = function(){
		var todos = {id:($scope.todolist.length)?Math.max.apply('',$scope.todolist.map(function(v,k){
			return v.id;
		}))+1:1001,
			name:'',
			theme:Math.ceil(Math.random()*6),
			shixiang:[
			{id:($scope.todolist.length)?Math.max.apply('',$scope.todolist.map(function(v,k){
			return v.id;
		}))+1:10001,
				name:'',
				state:'false'}
			]}

			$scope.todolist.push(todos);
			$scope.currenttodos = todos;
			savedata();
			gxnum();
	}

	// 点击列表 显示列表详细信息
	$scope.currenttodo = function(v){
		$scope.currenttodos = v;
		gxnum();
	}


	// 添加待完成事项
	$scope.newtodos = function(){

	var	newshixiang = {id:($scope.todolist.length)?Math.max.apply('',$scope.todolist.map(function(v,k){
			return v.id;
		}))+1:10001,
				name:'',
				state:'false'};
	$scope.currenttodos.shixiang.push(newshixiang);
	savedata();
	gxnum();
	}



	


	// 状态改变
    $scope.stategb = function(m){
    	

    	$scope.currenttodos.shixiang[m].state = 'true';
    	savedata();
    	gxnum();

    }
     $scope.stategb1 = function(m){
    	

    	$scope.currenttodos.shixiang[m].state = 'false';
    	savedata();
    	gxnum();

    }


    $scope.delete = function(){
    	$scope.currenttodos.shixiang = $scope.currenttodos.shixiang.filter(function(v,k){
				return v.state === 'false';
			})
			savedata();
    }


    $scope.deletetodo = function(){
    	$scope.todolist= $scope.todolist.filter(function(v,k){
				return v.id !== $scope.currenttodos.id;
			})
			savedata();
		$scope.currenttodos = $scope.todolist[0];
    }

   








}])