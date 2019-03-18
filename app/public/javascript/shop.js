$(document).ready(function() {

        let products;
        let shopContainer = $('.shop-page-content-container');
        let singleProductContainer = $('.single-product-page-content-container');;
        let cartDropDownContainer = $('.nav-cart-dropdown-menu');
        let checkoutCartList = $('.checkout-cart-list');
        let storageData = JSON.parse(localStorage.getItem('item'));
        let cartTotals = 0;
        let cartTotalPrice = 0;
        let adjustedCartTotal;

        let stripeTotal;
        
        let cartItems = [];
        let itemToAdd = {
                name: '',
                price: '',
                quantity: '',
                size: '',
                totalPrice: ''
        };


        if (storageData == null) {
                cartItems = [];
                cartTotals = 0;
        } else {
                cartItems = storageData;
                cartTotals = storageData.length;
        }

        $('.nav-cart-btn').text(`CART [ ${cartTotals} ]`);

        // ADD ITEMS TO CART - FUNCTION
        $(document).on('click', 'button.add-to-cart', function() {
                let itemName = $(this).parent().parent().find('.shop-item-name').text();
                let itemPrice = $(this).parent().parent().find('.shop-item-price').text();
                let itemQuantity = $(this).parent().find("input[name='item-quantity']").val();
                let itemSize = $(this).parent().find('select.size-control').val();
                let itemStock = $(this).parent().parent().find('.shop-item-stock').text();
                let itemId = $(this).parent().parent().find('.shop-item-id').text();
                let itemImgSource = $(this).parent().parent().find('img').attr('src');

                //grabbing total price by multiply item's price by the quantity selected
                let priceInteger = parseFloat(itemPrice.slice(1));
                let quantityInteger = parseInt(itemQuantity);
                let totalPrice = (priceInteger * quantityInteger).toFixed(2);

                itemToAdd = {
                        name: `${itemName}`,
                        price: `${itemPrice}`,
                        quantity: `${itemQuantity}`,
                        size: `${itemSize}`,
                        totalPrice: `${totalPrice}`,
                        stock: `${itemStock}`,
                        id: `${itemId}`,
                        image_source: `${itemImgSource}`
                };

                if (itemToAdd.size == 'undefined') {
                        itemToAdd.size = ' ';
                }

                cartItems.push(itemToAdd);
        
                localStorage.setItem('item', JSON.stringify(cartItems));
                
                // adding item quantity to cartTotal
                cartTotals = cartTotals + parseInt(itemToAdd.quantity);

                itemToAdd = {
                        name: '',
                        price: '',
                        quantity: '',
                        size: '',
                        totalPrice: '',
                        stock: '',
                        id: '',
                        image_source: ''
                };

                $('.nav-cart-btn').text(`CART [ ${cartTotals} ]`);

              
        });     
        
        //Creating html template for the Item Row that will be displayed in the cart
        function createCartRow(item) {
                let cartRow = $('<div>');
                cartRow.addClass('dropdown-item');
                
                cartRow.html(`
                        <div class='cart-item'>
                                <img src='${item.image_source}' class='cart-item-img'/>
                                <div class='cart-item-info'>
                                        <p class='cart-item-name'>${item.name} </p>
                                        <p class='cart-item-price'>${item.price}</p>
                                        <p class='cart-item-size'>${item.size} </p>
                                        <p class='cart-item-quantity'>Quantity: ${item.quantity}</p>
                                </div>
                        </div>
                        <div class="dropdown-divider"></div>
                `)
                
                return cartRow;
        }
        
        //On-Click fn to handle user checking the cart for their items
        $('.nav-cart').on('click', function() {


                let items = JSON.parse(localStorage.getItem('item'));

                let itemToAddToCart = [];
                        
                for (let i = 0; i < items.length; i++) {
                        itemToAddToCart.push(createCartRow(items[i]));
                }
                
                cartDropDownContainer.append(itemToAddToCart);

        });

        //using jQuery to render html elements for each product
        function createNewDataContainer(product) {

                let productContainer = $('<div>');
                productContainer.addClass('shop-item');

                productContainer.html(`
                
                        <div class="card" style="width: 100%; height: 100%;">
                                <img class="card-img-top" src=${product.image_source} alt="Card image cap">
                                <div class="card-body">
                                        <h5 class="card-title shop-item-name">${product.product_name}</h5>
                                        <p class="card-text shop-item-price">$${product.price}</p>
                                        <p class="card-text shop-item-stock">${product.stock}</p>
                                        <p class="card-text shop-item-id">${product.id}</p>
                                </div>
                                <div class="card-body second-c-body">
                                        <div class='btn-group' role='group' aria-label='Button group with nested dropdown'>
                                                <div class='input-group'>
                                                        <div class='input-group-prepend'>
                                                                <div class='input-group-text shop-item-btn item-quantity' id='btnGroupAddon'>Qty</div>
                                                        </div>
                                                        <input type='number' min="1" max=${product.stock} class='form-control shop-item-qty-text' name='item-quantity' aria-label='Input group example' aria-describedby='btnGroupAddon' value="1">
                                                </div>
                                        </div>
                                        <div class='btn-group size-control-div' role='group'>
                                                
                                        </div>
                                        <button  class=' shop-item-btn add-to-cart'  value=${product.id}>Add To Cart</button>
                                </div>
                        </div>

                `)
                        
                return productContainer;

        }


        function createNewSizedDataContainer(product) {

                let productContainer = $('<div>');
                productContainer.addClass('shop-item');

                // console.log(product);

                productContainer.html(`
                
                        <div class="card" style="width: 100%; height: 100%;">
                                <img class="card-img-top" src=${product.image_source} alt="Card image cap">
                                <div class="card-body">
                                        <h5 class="card-title shop-item-name">${product.product_name}</h5>
                                        <p class="card-text shop-item-price">$${product.price}</p>
                                        <p class="card-text shop-item-stock">${product.stock}</p>
                                        <p class="card-text shop-item-id">${product.id}</p>
                                </div>
                                <div class="card-body second-c-body">
                                        <div class='btn-group' role='group' aria-label='Button group with nested dropdown'>
                                                <div class='input-group'>
                                                        <div class='input-group-prepend'>
                                                                <div class='input-group-text shop-item-btn item-quantity' id='btnGroupAddon'>Qty</div>
                                                        </div>
                                                        <input type='number' min="1" max=${product.stock} class='form-control shop-item-qty-text' name='item-quantity' aria-label='Input group example' aria-describedby='btnGroupAddon' value="1">
                                                </div>
                                        </div>
                                        <div class='btn-group size-control-div' role='group'>
                                                <div class="form-group" value="">
                                                        <select class="form-control size-control" id="exampleFormControlSelect1">
                                                                <option class="size-option" value="Small">Small</option>
                                                                <option class="size-option" value="Medium">Medium</option>
                                                                <option class="size-option" value="Large">Large</option>
                                                                <option class="size-option" value="X-Large">X-Large</option>
                                                                <option class="size-option" value="XX-Large">XX-Large</option>
                                                        </select>
                                                </div>
                                        </div>
                                        <button  class='shop-item-btn add-to-cart'  value=${product.id}>Add To Cart</button>
                                </div>
                        </div>

                `)

                return productContainer;

        }

        function outOfStockSizedDataContainer(product) {

                let productContainer = $('<div>');
                productContainer.addClass('shop-item');

                productContainer.html(`
                
                        <div class="card" style="width: 100%; height: 100%;">
                                <img class="card-img-top" src="${product.image_source}" alt="Card image cap">
                                <div class="card-body">
                                        <h5 class="card-title shop-item-name">${product.product_name}</h5>
                                        <p class="card-text shop-item-price">$${product.price}</p>
                                        <p class="card-text shop-item-stock">${product.stock}</p>
                                        <p class="card-text shop-item-id">${product.id}</p>
                                        <div  class='shop-item-btn sized-out-of-stock-div'  value=${product.id}>Out Of Stock</div>
                                </div>
                        </div>

                `)

                return productContainer;

        }

        function outOfStockDataContainer(product) {

                let productContainer = $('<div>');
                productContainer.addClass('shop-item');

                productContainer.html(`
                
                        <div class="card" style="width: 100%; height: 100%;">
                                <img class="card-img-top" src="${product.image_source}" alt="Card image cap">
                                <div class="card-body">
                                        <h5 class="card-title shop-item-name">${product.product_name}</h5>
                                        <p class="card-text shop-item-price">$${product.price}</p>
                                        <p class="card-text shop-item-stock">${product.stock}</p>
                                        <p class="card-text shop-item-id">${product.id}</p>
                                        <div  class=' shop-item-btn out-of-stock-div'  value=${product.id}>Out Of Stock</div>
                                </div>
                        </div>

                `)

                return productContainer;

        }

        function initializeDataContainers() {
                let productsToAdd = [];
                shopContainer.empty();


                for(let i = 0; i < products.length; i++) {
                        if ( products[i].size == false && products[i].stock <= 0) {
                                productsToAdd.push(outOfStockDataContainer(products[i]));
                        } else if (products[i].size == true && products[i].stock <= 0) {
                                productsToAdd.push(outOfStockSizedDataContainer(products[i]));
                        } else if (products[i].size == false) {
                                productsToAdd.push(createNewDataContainer(products[i]));
                        } else if (products[i].size == true) {
                                productsToAdd.push(createNewSizedDataContainer(products[i]));
                        }
                }

                shopContainer.append(productsToAdd);
        }

        // $(document).on('click', 'button.add-to-cart', function() {
        //         let itemName = $(this).parent().parent().find('.shop-item-name').text();
        //         let itemPrice = $(this).parent().parent().find('.shop-item-price').text();
        //         let itemQuantity = $(this).parent().find("input[name='item-quantity']").val();
        //         let itemSize = $(this).parent().find('select.size-control').val();
        //         let itemStock = $(this).parent().parent().find('.shop-item-stock').text();
        //         let itemId = $(this).parent().parent().find('.shop-item-id').text();

        //         //grabbing total price by multiply item's price by the quantity selected
        //         let priceInteger = parseFloat(itemPrice.slice(1));
        //         let quantityInteger = parseInt(itemQuantity);
        //         let totalPrice = (priceInteger * quantityInteger).toFixed(2);

        //         itemToAdd = {
        //                 name: `${itemName}`,
        //                 price: `${itemPrice}`,
        //                 quantity: `${itemQuantity}`,
        //                 size: `${itemSize}`,
        //                 totalPrice: `${totalPrice}`,
        //                 stock: `${itemStock}`,
        //                 id: `${itemId}`
        //         };

        //         if (itemToAdd.size == 'undefined') {
        //                 itemToAdd.size = ' ';
        //         }

        //         cartItems.push(itemToAdd);
        
        //         localStorage.setItem('item', JSON.stringify(cartItems));
                
        //         // adding item quantity to cartTotal
        //         // cartTotals = cartTotals + parseInt(itemToAdd.quantity);

        //         itemToAdd = {
        //                 name: '',
        //                 price: '',
        //                 quantity: '',
        //                 size: '',
        //                 totalPrice: '',
        //                 stock: '',
        //                 id: ''
        //         };

        //         $('.nav-cart-btn').text(`CART [ ${cartTotals} ]`);

              
        // });    

        // Creating template for Checkout Cart Item Row 
        function createCheckoutCartRow(items) {

                let cartRow = $('<li>');
                cartRow.addClass('list-group-item d-flex justify-content-between lh-condensed');

                cartRow.html(`
                                <div>
                                        <h6 class="my-0">${items.name}</h6>
                                        <small class="text-muted">${items.size} | </small>
                                        <small class="text-muted">Quantity: ${items.quantity} | </small>
                                        <span class="text-muted">Price: ${items.price}</span>
                                </div>
                                <span class="text-muted">Total Item Price: $${items.totalPrice}</span>
                `)

                //generating total cart price by adding current cartTotalPrice value to 'this' item's totalPrice
                cartTotalPrice += parseFloat(items.totalPrice);

                return cartRow;
        }

        function initializeCheckoutCartRows() {
                let items = JSON.parse(localStorage.getItem('item'));
                let totalPriceCartRow = $('<li>');
                totalPriceCartRow.addClass('list-group-item d-flex justify-content-between lh-condensed');

                let itemToAddToCheckout = [];
                        
                for (let i = 0; i < items.length; i++) {
                        itemToAddToCheckout.push(createCheckoutCartRow(items[i]));
                }
                
                checkoutCartList.append(itemToAddToCheckout);

                console.log(cartTotalPrice);

                //Some Cart Totals are not displaying the extra '0' at the end since the float number is being rounded. Fixing it down here.
                let splitCartTotal = cartTotalPrice.toString().split('.');
                let cartTotalDollars = splitCartTotal[0];
                let cartTotalCents = splitCartTotal[1];

                if (cartTotalCents.length == 1) {
                        cartTotalCents += '0';
                }

                //Some Cart Totals have too many characters and it is affectting the total price sent to Stripe. Fixing it down here.
                let adjustedCartCents;

                if (cartTotalCents.length > 2) {
                        //grabbing the first two characters in the 'cents' portion of the total
                        adjustedCartCents = cartTotalCents.slice(0, 2);
                        cartTotalCents = adjustedCartCents;
                }
                console.log(adjustedCartCents);

                adjustedCartTotal = cartTotalDollars + cartTotalCents;
                cartTotalPrice = `${cartTotalDollars}.${cartTotalCents}`;

                totalPriceCartRow.html(`
                                <div>
                                        <h5 class="my-1">Total Price: $${cartTotalPrice}</h6>
                                </div>
                `);

                checkoutCartList.append(totalPriceCartRow);

                stripeTotal = adjustedCartTotal
                console.log(stripeTotal);

                localStorage.setItem('cartTotal', stripeTotal);
                
        }
        
        if (window.location.pathname === '/checkout') {
                initializeCheckoutCartRows();

                $("#stripe-form").html(
                        `<script 
                                src="https://checkout.stripe.com/checkout.js" 
                                class="stripe-button" 
                                data-key="pk_test_fHYWvPPZvMWJQ8YZKvOYafuY" 
                                data-amount="${stripeTotal}"
                                data-zip-code="true" 
                                data-currency="usd" 
                                data-billing-address="true" 
                                data-shipping-address="true" 
                                data-name="Stache Barbers" 
                                data-description="Stache Shop" 
                                data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
                                data-locale="auto">
                        </script>`
                );

                $('#stripe-form').append(`<input name='coKey' value ='${stripeTotal}' class="d-none"/>`)
        }

        if (window.location.pathname !== '/checkout') {
                localStorage.removeItem('cartTotal');
        }

        //handler to clear localStorage after charge has been made
        const handlePostCheckoutClear = () => {
                localStorage.clear();
        } 

        //once 'Back To Home" button on success-page is clicked, localStorage is cleared by calling handlePostCheckoutClear()
        $('#success-page-btn').on('click', handlePostCheckoutClear);

        //UPDATING DB ONCE ORDER IS PROCESSED
        if (window.location.pathname == "/charge") {
                let items = JSON.parse(localStorage.getItem('item'))
                console.log(items.length);


                for (let i =0; i < items.length; i++) {
                        let itemRouteId = parseInt(items[i].id);
                        let itemRouteStock = parseInt(items[i].stock);
                        let itemRouteQty = parseInt(items[i].quantity);
                        let itemNewStock = (itemRouteStock - itemRouteQty);

                        $.ajax({
                                method: "PUT",
                                url: `/products/checkout/update/${itemRouteId}/${itemNewStock}`,
                                data: items
                        })
                        .then(function() {
                                console.log("ran function: update on checkout");
                        });
                }
        }

        function singleProductElements(product) {
                let singleProductDiv = $('<div>');

                singleProductDiv.html(`
                        <img src="${product.image_source}" class="single-product-img" />

                        <p class="single-product-name">${product.product_name}</p>
                        <p class="single-product-price">${product.price}</p>
                        <div class='btn-group size-control-div' role='group'>
                                <div class="form-group" value="">
                                        <select class="form-control size-control" id="exampleFormControlSelect1">
                                                <option class="size-option single-product-s" value="Small">Small</option>
                                                <option class="size-option single-product-m" value="Medium">Medium</option>
                                                <option class="size-option single-product-l" value="Large">Large</option>
                                                <option class="size-option single-product-xl" value="X-Large">X-Large</option>
                                        </select>
                                </div>
                        </div>
                `)

                return singleProductDiv;
        }

        // adding information into SINGLE PRODUCT PAGE elements.
        function initializeSingleProductElements(product) {

                singleProductContainer.empty();

                singleProductContainer.append(singleProductElements(product));

                // singleProductContainer.append(productToAdd);
                console.log(product);
        }


// ~~~~~~~~~~~~~~~~~~~HANDLING ALL DATA REQUESTS / FILTERING OF DATA SETS FROM DB~~~~~~~~~~~~~~~~~~
        //get all products from DB
        $.get('/products/all', function(data) {
                products = data;
                initializeDataContainers();
        });

        //get single product from DB
        $.get('/single-item/:routeName', function(data) {
                product = data;
                console.log(data);
                initializeSingleProductElements(product);
        });

        // on click event handlers to request data from DB based off category/brand name
        $('#filter-stache').on('click', function(e) {
                e.preventDefault();
                
                $.get('/products/brand/stache', (data) => {
                        products = data;
                        initializeDataContainers();
                        console.log(data);
                })
        })

        $('#filter-capes').on('click', function(e) {
                e.preventDefault();

                $.get('/products/category/capes', (data) => {
                        products = data;
                        initializeDataContainers();
                        console.log(data);
                })
        })

        $('#filter-tShirts').on('click', function(e) {
                e.preventDefault();

                $.get('/products/category/t-shirts', (data) => {
                        products = data;
                        initializeDataContainers();
                        console.log(data);
                })
        })

        $('#filter-hairStyling').on('click', function(e) {
                e.preventDefault();

                $.get('/products/category/hair-styling', (data) => {
                        products = data;
                        initializeDataContainers();
                        console.log(data);
                })
        })

        $('#filter-beardShaveMustache').on('click', function(e) {
                e.preventDefault();

                $.get('/products/category/beard-shave-mustache', (data) => {
                        products = data;
                        initializeDataContainers();
                        console.log(data);
                })
        })

        $('#filter-facialBody').on('click', function(e) {
                e.preventDefault();

                $.get('/products/category/facial-body', (data) => {
                        products = data;
                        initializeDataContainers();
                        console.log(data);
                })
        })

        $('#filter-razors').on('click', function(e) {
                e.preventDefault();

                $.get('/products/category/razors', (data) => {
                        products = data;
                        initializeDataContainers();
                        console.log(data);
                })
        })

        // $('#filter-snapbacks').on('click', function(e) {
        //         e.preventDefault();

        //         $.get('/products/category/snapbacks', (data) => {
        //                 products = data;
        //                 initializeDataContainers();
        //                 console.log(data);
        //         })
        // })

        $('#filter-modernMale').on('click', function(e) {
                e.preventDefault();

                $.get('/products/brand/modern-male', (data) => {
                        products = data;
                        initializeDataContainers();
                        console.log(data);
                })
        })

        $('#filter-slickGorilla').on('click', function(e) {
                e.preventDefault();

                $.get('/products/brand/slick-gorilla', (data) => {
                        products = data;
                        initializeDataContainers();
                        console.log(data);
                })
        })

        $('#filter-victoryCrown').on('click', function(e) {
                e.preventDefault();

                $.get('/products/brand/victory-crown', (data) => {
                        products = data;
                        initializeDataContainers();
                        console.log(data);
                })
        })

        $('#filter-xotics').on('click', function(e) {
                e.preventDefault();

                $.get('/products/brand/xotics', (data) => {
                        products = data;
                        initializeDataContainers();
                        console.log(data);
                })
        })

});