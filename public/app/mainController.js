angular.module('mainCtrl', [])
.controller('MainController', MainController)

MainController.$inject = ['$state', '$rootScope']

function MainController($state, $rootScope){
	var vm = this
	vm.user = {}
	vm.loggedIn = null
	vm.signup = signup
	vm.login = login
	// vm.logout = logout
	// vm.getUser = getUser
	// vm.updateUser = updateUser
	vm.error = null

	// check to see if a user is logged in on every request. $rootScope is a service of angular
	// $rootScope.$on('$stateChangeStart', function() {
	// 	vm.loggedIn = authFactory.isLoggedIn()
	// 	vm.getUser()
	// 	vm.error = null
	// })

	// function logout(){
	// 	console.log('trigger from frontend')
	// 	authFactory.logout()
	// 	$state.go('loggedout')
	// }

	// function getUser(){
	// 	authFactory.getUser() //$http.get('/api/me')
	// 	.then(function(response){
	// 		console.log("GETUSER RESPONSE =====",response)
	// 		vm.user = response.data

			//for the progress bar
			// $('#example6')
			//   .progress({
			//     label: 'ratio',
			//     text: {
			//       ratio: 'vm.user.climbs.length de {total}'
			//     }
			//   })
	// 		$('#example6')
	// 		.progress({
	// 			value: vm.user.climbs.length
	// 		})
	// 		parseInt("10")
	// 		console.log(vm.user.climbs)
	// 		var grades = []
	//
	// 		grades = vm.user.climbs.map(function(climb){return parseInt(climb.grade.slice(1))})
	// 		console.log(grades)
	//
	// 	})
	// }

	function updateUser(){
		console.log('updateUser function hitting')
		authFactory.updateUser(vm.user)
		.then(function(response){
			if(response.data.success){
				// vm.getUser()
				console.log('update user success')
				$state.go('user-home')
			} else{
				// console.log('update did not work')
				vm.error = response.data.message
			}
		})
	}

	function signup(){
		authFactory.signup(vm.user.name, vm.user.email, vm.user.password, vm.user.experience, vm.user.gyms)
		.then(function(response){
			if(response.data.success){
				// console.log(vm.user)
				vm.login()
			} else {
				console.log('sign up did not work')
				vm.error = response.data.message
			}
		})
	}

	function login(){
		authFactory.login(vm.user.email, vm.user.password)
		.then(function(response){
			if(response.data.success){
				//upon successful login redirect user to user-home page
				$state.go("user-home")
			} else {
				vm.error = response.data.message
			}
		})
	}

}
