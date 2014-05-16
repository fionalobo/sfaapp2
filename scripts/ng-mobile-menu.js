angular.module('shoppinpal.mobile-menu', [])
    .run(['$rootScope', '$spMenu', function($rootScope, $spMenu){
        $rootScope.$spMenu = $spMenu;
    }])
    .provider("$spMenu", function(){
        this.$get = [function(){
          alert('Hello this is provider');
           var menu = {};

           menu.show = function show(){
               var menu = angular.element(document.querySelector('#sp-nav'));
               console.log(menu);
               menu.addClass('show');
           };

           menu.hide = function hide(){
               var menu = angular.element(document.querySelector('#sp-nav'));
               menu.removeClass('show');
           };

           menu.toggle = function toggle() {
              alert('Hello, you have entered the toggle function');
               var menu = angular.element(document.querySelector('#sp-nav'));
               menu.toggleClass('show');
           };

           return menu;
        }];
    });