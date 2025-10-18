
angular.module('nfcKioskApp', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    })
    .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'MenuController'
    })
    .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartController'
    })
    .when('/payment', {
        templateUrl: 'views/payment.html',
        controller: 'PaymentController'
    })
    .when('/receipt', {
        templateUrl: 'views/receipt.html',
        controller: 'ReceiptController'
    })
    .otherwise({
        redirectTo: '/'
    });
})
.run(function($rootScope, $location) {
    // 7. Extra: Store NFC Icon in localStorage (as a simple text/emoji for demonstration)
    if (!localStorage.getItem('nfcIcon')) {
        localStorage.setItem('nfcIcon', ''); // Use a chicken leg icon
    }
    $rootScope.nfcIcon = localStorage.getItem('nfcIcon');

    // Initialize cart and related variables on the root scope
    $rootScope.cart = [];
    $rootScope.TAX_RATE = 0.05; // 5% tax

    // Function to calculate cart totals (accessible across controllers)
    $rootScope.calculateTotals = function() {
        let subtotal = 0;
        $rootScope.cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        $rootScope.subtotal = subtotal;
        $rootScope.taxAmount = subtotal * $rootScope.TAX_RATE;
        $rootScope.totalAmount = $rootScope.subtotal + $rootScope.taxAmount;
    };

    // Initialize totals on load
    $rootScope.calculateTotals();

    // Track current route so views outside ng-view can react (e.g., show header only on home)
    $rootScope.currentPath = $location.path();
    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.currentPath = $location.path();
    });

    // Quick handler for take-away action (navigates to menu by default)
    $rootScope.takeAway = function() {
        $location.path('/menu');
    };
});