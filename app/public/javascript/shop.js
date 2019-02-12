$(document).ready(function() {

        let products;
        let shopContainer = $('.shop-page-content-container');
        let cartDropDownContainer = $('.nav-cart-dropdown-menu');
        let checkoutCartList = $('.checkout-cart-list');
        let cartTotals = 0;

        let cartItems = [];
        let itemToAdd = {
                name: '',
                price: '',
                quantity: '',
                size: ''
        };

        // ADD ITEMS TO CART - FUNCTION
        $(document).on('click', 'button.add-to-cart', function() {
                let itemName = $(this).parent().find('p.shop-item-name').text();
                let itemPrice = $(this).parent().find('p.shop-item-price').text();
                let itemQuantity = $(this).parent().find("input[name='item-quantity']").val();
                let itemSize = $(this).parent().find('select.size-control').val();

                itemToAdd = {
                        name: `${itemName}`,
                        price: `${itemPrice}`,
                        quantity: `${itemQuantity}`,
                        size: `${itemSize}`
                };

                // console.log(itemToAdd);
                // console.log("~~~~~~~~~~~~~~~~~~~~~");

                cartItems.push(itemToAdd);
                // console.log(cartItems);
                localStorage.setItem('item', JSON.stringify(cartItems));
                
                // adding item quantity to cartTotal
                cartTotals = cartTotals + parseInt(itemToAdd.quantity);

                itemToAdd = {
                        name: '',
                        price: '',
                        quantity: '',
                        size: ''
                };

                // console.log('Second:');
                // console.log(itemToAdd);
                // console.log("~~~~~~~~~~~~~~~~~~~~~");

                $('.nav-cart-btn').text(`CART [ ${cartTotals} ]`);

              
        });     
        
        //Creating html template for the Item Row that will be displayed in the cart
        function createCartRow(item) {
                let cartRow = $('<div>');
                cartRow.addClass('dropdown-item');
                
                cartRow.html(`
                <div class='cart-item'>
                <img src='https://via.placeholder.com/300' class='cart-item-img'/>
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

                // console.log(items);

                let itemToAddToCart = [];
                        
                for (let i = 0; i < items.length; i++) {
                        itemToAddToCart.push(createCartRow(items[i]));
                }
                
                cartDropDownContainer.append(itemToAddToCart);

        })

        //using jQuery to render html elements for each product
        function createNewDataContainer(product) {

                let productContainer = $('<div>');
                productContainer.addClass('shop-item');

                productContainer.html(`
                        <img src='https://via.placeholder.com/300' />
                        <p class='shop-item-name'>${product.product_name} </p>
                        <p class='shop-item-price'>$${product.price}</p>

                        <div class='btn-group' role='group' aria-label='Button group with nested dropdown'>
                                <div class='input-group'>
                                        <div class='input-group-prepend'>
                                                <div class='input-group-text shop-item-btn item-quantity' id='btnGroupAddon'>Qty</div>
                                        </div>
                                        <input type='number' min="1" max="100" class='form-control shop-item-qty-text' name='item-quantity' aria-label='Input group example' aria-describedby='btnGroupAddon' value="1">
                                </div>
                        </div>
                                        
                        <div class='btn-group' role='group'>
                                <div class="form-group" value="">
                                        <select class="form-control size-control" id="exampleFormControlSelect1">
                                                <option class="size-option" value="Small">Small</option>
                                                <option class="size-option" value="Medium">Medium</option>
                                                <option class="size-option" value="Large">Large</option>
                                                <option class="size-option" value="X-Large">X-Large</option>
                                        </select>
                                </div>
                        </div>
                        <button  class=' shop-item-btn add-to-cart'  value=${product.id}>Add To Cart</button>
                `)

                // <div class="card" style="width: 18rem;">
                //         <img class="card-img-top" src="https://via.placeholder.com/300" alt="Card image cap">
                //         <div class="card-body">
                //                 <h5 class="card-title">Card title</h5>
                //                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                //         </div>
                //                 <ul class="list-group list-group-flush">
                //                 <li class="list-group-item">Cras justo odio</li>
                //                 <li class="list-group-item">Dapibus ac facilisis in</li>
                //                 <li class="list-group-item">Vestibulum at eros</li>
                //         </ul>
                //         <div class="card-body">
                //                 <a href="#" class="card-link">Card link</a>
                //                 <a href="#" class="card-link">Another link</a>
                //         </div>
                // </div>
                

                // console.log(product);

                return productContainer;

        }

        function initializeDataContainers() {
                let productsToAdd = [];

                shopContainer.empty();

                for(let i = 0; i < products.length; i++) {
                        productsToAdd.push(createNewDataContainer(products[i]));
                }

                shopContainer.append(productsToAdd);
        }

        // Creating template for Checkout Cart Item Row 
        function createCheckoutCartRow(items) {
                // <li class="list-group-item d-flex justify-content-between lh-condensed">
                //         <div>
                //                 <h6 class="my-0">Product name</h6>
                //                 <small class="text-muted">Brief description</small>
                //         </div>
                //         <span class="text-muted">$12</span>
                // </li>

                let cartRow = $('<li>');
                cartRow.addClass('list-group-item d-flex justify-content-between lh-condensed');

                cartRow.html(`
                                <div>
                                        <h6 class="my-0">${items.name}</h6>
                                        <small class="text-muted">${items.size}</small>
                                        <small class="text-muted">${items.quantity}</small>
                                </div>
                                <span class="text-muted">${items.price}</span>
                `)

                return cartRow;
        }

        function initializeCheckoutCartRows() {
                let items = JSON.parse(localStorage.getItem('item'));

                let itemToAddToCheckout = [];
                        
                for (let i = 0; i < items.length; i++) {
                        itemToAddToCheckout.push(createCheckoutCartRow(items[i]));
                }
                
                checkoutCartList.append(itemToAddToCheckout);
                
        }
        
        if (window.location.pathname === '/checkout') {
                initializeCheckoutCartRows();
        }


// ~~~~~~~~~~~~~~~~~~~HANDLING ALL DATA REQUESTS / FILTERING OF DATA SETS FROM DB~~~~~~~~~~~~~~~~~~
        //get all products from DB
        $.get('/products/all', function(data) {
                products = data;
                initializeDataContainers();
                // console.log(data);
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

        $('#filter-snapbacks').on('click', function(e) {
                e.preventDefault();

                $.get('/products/category/snapbacks', (data) => {
                        products = data;
                        initializeDataContainers();
                        console.log(data);
                })
        })

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