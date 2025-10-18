angular.module('nfcKioskApp')

.controller('HomeController', function($scope, $location, $rootScope, $timeout) {
    $scope.startOrder = function() {
        $location.path('/menu');
    };

    $scope.promotions = [
        {
            title: 'Feast Combo!',
            subtitle: 'Get 6 pc Hot Wings FREE on Bucket Orders',
            color: 'bg-danger text-white'
        },
        {
            title: 'Super Saver Meal',
            subtitle: 'Zinger Supreme + Fries + Drink for only ₹349',
            color: 'bg-warning text-dark'
        },
        {
            title: 'Student Discount',
            subtitle: 'Show ID and get 10% off any single item!',
            color: 'bg-info text-white'
        }
    ];

    $scope.cartCount = $rootScope.cart.length; 

    // Initialize Bootstrap carousel after the view has rendered so the active class set by Angular is present
    $timeout(function() {
        var el = document.getElementById('promoCarousel');
        if (el && typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
            try {
                // Re-init carousel with 3s interval and autoplay; do not pause on hover
                new bootstrap.Carousel(el, { interval: 3000, ride: 'carousel', pause: false, wrap: true, touch: true });
            } catch (e) {
                console.warn('Carousel init failed', e);
            }
        }
    }, 150);
})

.controller('MenuController', function($scope, $location, $rootScope) {
    $scope.menuItems = NFC_MENU_ITEMS;

    $scope.categories = ['All Items'];
    $scope.menuItems.forEach(item => {
        if ($scope.categories.indexOf(item.category) === -1) {
            $scope.categories.push(item.category);
        }
    });

    $scope.selectedCategory = 'All Items';

    $scope.filterByCategory = function(item) {
        if ($scope.selectedCategory === 'All Items') {
            return true;
        }
        return item.category === $scope.selectedCategory;
    };

    $scope.selectCategory = function(category) {
        $scope.selectedCategory = category;
    };

    $scope.addToCart = function(item) {
        const existingItem = $rootScope.cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            $rootScope.cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
                imageUrl: item.imageUrl
            });
        }
        
        $rootScope.calculateTotals();
        
        console.log(`${item.name} added to cart! Total items: ${$rootScope.cart.length}`);
    };

    $scope.goToCart = function() {
        $location.path('/cart');
    };
})

.controller('CartController', function($scope, $location, $rootScope) {
    $scope.changeQuantity = function(item, delta) {
        item.quantity += delta;
        
        if (item.quantity <= 0) {
            $scope.removeItem(item);
        }
        
        $rootScope.calculateTotals();
    };

    $scope.removeItem = function(itemToRemove) {
        $rootScope.cart = $rootScope.cart.filter(item => item.id !== itemToRemove.id);
        $rootScope.calculateTotals();
    };

    $scope.addMoreItems = function() {
        $location.path('/menu');
    };

    $scope.proceedToPayment = function() {
        if ($rootScope.cart.length > 0) {
            $rootScope.finalOrder = {
                items: angular.copy($rootScope.cart),
                subtotal: $rootScope.subtotal,
                tax: $rootScope.taxAmount,
                total: $rootScope.totalAmount,
                orderDate: new Date()
            };
            $location.path('/payment');
        } else {
            alert('Please add items to your cart before proceeding to payment.');
            $location.path('/menu');
        }
    };

    $rootScope.calculateTotals();
})

.controller('PaymentController', function($scope, $location, $rootScope, $timeout) {
    
    if (!$rootScope.finalOrder) {
        $location.path('/cart');
        return;
    }

    $scope.order = $rootScope.finalOrder;

    const qrData = `NFC Order: #TEMP-${$scope.order.total.toFixed(2)}`;

    $timeout(function() {
        if (document.getElementById('qrcode') && typeof QRCode !== 'undefined') {
            document.getElementById("qrcode").innerHTML = ""; 
            
            new QRCode(document.getElementById("qrcode"), {
                text: qrData,
                width: 256,
                height: 256,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        }
    }, 100); 

    $scope.simulatePayment = function() {
        $rootScope.receiptData = {
            ...$rootScope.finalOrder,
            orderNumber: Math.floor(100 + Math.random() * 900),
            paymentMode: 'QR Payment',
            transactionTime: new Date()
        };
        
        $rootScope.cart = [];
        $rootScope.calculateTotals();

        $location.path('/receipt');
    };
})

.controller('ReceiptController', function($scope, $location, $rootScope) {
    
    if (!$rootScope.receiptData) {
        $location.path('/'); 
        return;
    }

    $scope.receipt = $rootScope.receiptData;

    $scope.formatDate = function(date) {
        return new Date(date).toLocaleString();
    };

    $scope.printReceipt = function() {
        window.print();
    };

    $scope.backToHome = function() {
        $rootScope.receiptData = null; 
        $location.path('/');
    };
});