$(document).ready(function() {
	let products;
	let shopContainer = $(".shop-page-content-container");
	let singleProductContainer = $(
		".single-product-page-content-container"
	);
	let cartDropDownContainer = $(".nav-cart-dropdown-menu");
	let checkoutCartList = $(".checkout-cart-list");
	let storageData = JSON.parse(localStorage.getItem("item"));
	let cartTotals = 0;
	let cartTotalPrice = 0;
	let adjustedCartTotal;
	let windowPath = window.location.pathname;

	let singleItemRoute;

	let stripeTotal;

	let cartItems = [];
	let itemToAdd = {
		name: "",
		price: "",
		quantity: "",
		size: "",
		totalPrice: ""
	};

	if (storageData == null) {
		cartItems = [];
		cartTotals = 0;
	} else {
		cartItems = storageData;
		cartTotals = storageData.length;
	}

	$(".nav-cart-btn").text(`CART [ ${cartTotals} ]`);

	// ADD SINGLE PAGE SIZED ITEMS TO CART - FUNCTION
	$(document).on("click", "button.single-add-to-cart", function() {
		let currentIndex;
		let currentSize = "";

		let indexPath = windowPath.split("/")[2].split("-");

		if (indexPath[indexPath.length - 1] == "small") {
			currentIndex = 0;
			currentSize = "Small";
		} else if (indexPath[indexPath.length - 1] == "medium") {
			currentIndex = 1;
			currentSize = "Medium";
		} else if (
			indexPath[indexPath.length - 1] == "large" &&
			indexPath[indexPath.length - 2] !== "x" &&
			indexPath[indexPath.length - 2] !== "xx"
		) {
			currentIndex = 2;
			currentSize = "Large";
		} else if (indexPath[indexPath.length - 2] == "x") {
			currentIndex = 3;
			currentSize = "X-Large";
		} else if (indexPath[indexPath.length - 2] == "xx") {
			currentIndex = 4;
			currentSize = "XX-Large";
		}

		console.log(currentIndex, currentSize);

		let itemName = $(this)
			.parent()
			.parent()
			.parent()
			.find(".single-product-name")
			.text();
		let itemPrice = $(this)
			.parent()
			.parent()
			.parent()
			.find(".single-product-price")
			.text();
		let itemQuantity = $(this)
			.parent()
			.parent()
			.parent()
			.find("input[name='item-quantity']")
			.val();

		let itemSize = currentSize;

		let itemStock = $(this)
			.parent()
			.parent()
			.parent()
			.find(".single-product-stock")
			.text();

		let itemId = $(this).val();

		console.log(itemId);

		let itemImgSource = $(this)
			.parent()
			.parent()
			.parent()
			.parent()
			.find("img")
			.attr("src");

		//grabbing total price by multiply item's price by the quantity selected
		let priceInteger = parseFloat(itemPrice.slice(0));
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

		if (itemToAdd.size == "undefined") {
			itemToAdd.size = " ";
		}

		cartItems.push(itemToAdd);

		localStorage.setItem("item", JSON.stringify(cartItems));

		// adding item quantity to cartTotal
		cartTotals = cartTotals + parseInt(itemToAdd.quantity);

		itemToAdd = {
			name: "",
			price: "",
			quantity: "",
			size: "",
			totalPrice: "",
			stock: "",
			id: "",
			image_source: ""
		};

		$(".nav-cart-btn").text(`CART [ ${cartTotals} ]`);
	});

	// ADD NON-SIZED ITEMS TO CART - FUNCTION
	$(document).on("click", "button.add-to-cart", function() {
		let itemName = $(this)
			.parent()
			.parent()
			.find(".shop-item-name")
			.text();
		let itemPrice = $(this)
			.parent()
			.parent()
			.find(".shop-item-price")
			.text();
		let itemQuantity = $(this)
			.parent()
			.find("input[name='item-quantity']")
			.val();
		let itemSize = $(this)
			.parent()
			.find("select.size-control")
			.val();
		let itemStock = $(this)
			.parent()
			.parent()
			.find(".shop-item-stock")
			.text();
		let itemId = $(this)
			.parent()
			.parent()
			.find(".shop-item-id")
			.text();
		let itemImgSource = $(this)
			.parent()
			.parent()
			.find("img")
			.attr("src");

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

		if (itemToAdd.size == "undefined") {
			itemToAdd.size = " ";
		}

		cartItems.push(itemToAdd);

		localStorage.setItem("item", JSON.stringify(cartItems));

		// adding item quantity to cartTotal
		cartTotals = cartTotals + parseInt(itemToAdd.quantity);

		itemToAdd = {
			name: "",
			price: "",
			quantity: "",
			size: "",
			totalPrice: "",
			stock: "",
			id: "",
			image_source: ""
		};

		$(".nav-cart-btn").text(`CART [ ${cartTotals} ]`);
	});

	//Creating html template for the Item Row that will be displayed in the cart
	function createCartRow(item) {
		let cartRow = $("<div>");
		cartRow.addClass("dropdown-item");

		cartRow.html(`
                        <div class='cart-item'>
                                <img src='${
					item.image_source
				}' class='cart-item-img'/>
                                <div class='cart-item-info'>
                                        <p class='cart-item-name'>${
						item.name
					} </p>
                                        <p class='cart-item-price'>${
						item.price
					}</p>
                                        <p class='cart-item-size'>${
						item.size
					} </p>
                                        <p class='cart-item-quantity'>Quantity: ${
						item.quantity
					}</p>
                                </div>
                        </div>
                        <div class="dropdown-divider"></div>
                `);

		return cartRow;
	}

	//On-Click fn to handle user checking the cart for their items
	$(".nav-cart").on("click", function() {
		let items = JSON.parse(localStorage.getItem("item"));
		let itemToAddToCart = [];

		let checkoutLink = $("<a>")
			.addClass("btn btn-outline-dark btn-block")
			.attr("href", "/checkout")
			.text("Checkout!");

		for (let i = 0; i < items.length; i++) {
			itemToAddToCart.push(createCartRow(items[i]));
		}

		cartDropDownContainer.append(itemToAddToCart);
		cartDropDownContainer.append(checkoutLink);
	});

	//using jQuery to render html elements for each product
	function createNewDataContainer(product) {
		let productContainer = $("<div>");
		productContainer.addClass(
			"shop-item col-10 col-sm-5 col-md-3 offset-md-1 col-lg-3 col-xl-3 justify-content-between"
		);

		productContainer.html(`
                
                        <div class="card" style="width: 100%; height: 100%;">
                                <img class="card-img-top" src=${
					product.image_source
				} alt="Card image cap">
                                <div class="card-body">
                                        <h5 class="card-title shop-item-name">${
						product.product_name
					}</h5>
                                        <p class="card-text shop-item-price">$${
						product.price
					}</p>
                                        <p class="card-text shop-item-stock">${
						product.stock
					}</p>
                                        <p class="card-text shop-item-id">${
						product.id
					}</p>
                                </div>
                                <div class="card-body second-c-body">
                                        <div class='btn-group' role='group' aria-label='Button group with nested dropdown'>
                                                <div class='input-group'>
                                                        <div class='input-group-prepend'>
                                                                <div class='input-group-text shop-item-btn item-quantity' id='btnGroupAddon'>Qty</div>
                                                        </div>
                                                        <input type='number' min="1" max=${
								product.stock
							} class='form-control shop-item-qty-text' name='item-quantity' aria-label='Input group example' aria-describedby='btnGroupAddon' value="1">
                                                </div>
                                        </div>
                                        <div class='btn-group size-control-div' role='group'>
                                                
                                        </div>
                                        <button  class=' shop-item-btn add-to-cart btn btn-outline-dark btn-block'  value=${
						product.id
					}>Add To Cart</button>
                                </div>
                        </div>

                `);

		return productContainer;
	}

	function createNewSizedDataContainer(product) {
		let productContainer = $("<div>");
		productContainer.addClass(
			"shop-item col-10 col-sm-5 col-md-3 offset-md-1 col-lg-3 col-xl-3 justify-content-between"
		);

		// console.log(product);

		productContainer.html(`
                
                        <div class="card" style="width: 100%; height: 100%;">
                                <img class="card-img-top" src=${
					product.image_source
				} alt="Card image cap">
                                <div class="card-body">
                                        <h5 class="card-title shop-item-name">${
						product.product_name
					}</h5>
                                        <p class="card-text shop-item-price">$${
						product.price
					}</p>
                                        <p class="card-text shop-item-stock">${
						product.stock
					}</p>
                                        <p class="card-text shop-item-id">${
						product.id
					}</p>
                                </div>
                                <div class="card-body second-c-body">
                                        <a class="view-item-a-tag" value="${
						product.route_name
					}" href="/single-item/${product.route_name}"><button  class='shop-item-btn view-item btn btn-outline-dark btn-block'  value=${product.route_name}>View Item</button></a>
                                </div>
                        </div>

                `);

		return productContainer;
	}

	function outOfStockSizedDataContainer(product) {
		let productContainer = $("<div>");
		productContainer.addClass(
			"shop-item col-10 col-sm-5 col-md-3 offset-md-1 col-lg-3 col-xl-3 justify-content-between"
		);

		productContainer.html(`
                
                        <div class="card" style="width: 100%; height: 100%;">
                                <img class="card-img-top" src="${
					product.image_source
				}" alt="Card image cap">
                                <div class="card-body">
                                        <h5 class="card-title shop-item-name">${
						product.product_name
					}</h5>
                                        <p class="card-text shop-item-price">$${
						product.price
					}</p>
                                        <p class="card-text shop-item-stock">${
						product.stock
					}</p>
                                        <p class="card-text shop-item-id">${
						product.id
					}</p>
                                        <div  class='shop-item-btn sized-out-of-stock-div btn btn-outline-dark btn-block'  value=${
						product.id
					}>Out Of Stock</div>
                                </div>
                        </div>

                `);

		return productContainer;
	}

	function outOfStockDataContainer(product) {
		let productContainer = $("<div>");
		productContainer.addClass(
			"shop-item col-10 col-sm-5 col-md-3 offset-md-1 col-lg-3 col-xl-3 justify-content-between"
		);

		productContainer.html(`
                
                        <div class="card" style="width: 100%; height: 100%;">
                                <img class="card-img-top" src="${
					product.image_source
				}" alt="Card image cap">
                                <div class="card-body">
                                        <h5 class="card-title shop-item-name">${
						product.product_name
					}</h5>
                                        <p class="card-text shop-item-price">$${
						product.price
					}</p>
                                        <p class="card-text shop-item-stock">${
						product.stock
					}</p>
                                        <p class="card-text shop-item-id">${
						product.id
					}</p>
                                        <div  class=' shop-item-btn out-of-stock-div btn btn-outline-dark btn-block' value=${
						product.id
					}>Out Of Stock</div>
                                </div>
                        </div>

                `);

		return productContainer;
	}

	function initializeDataContainers() {
		let productsToAdd = [];
		shopContainer.empty();

		for (let i = 0; i < products.length; i++) {
			if (
				products[i].size == false &&
				products[i].stock <= 0
			) {
				productsToAdd.push(
					outOfStockDataContainer(products[i])
				);
			} else if (
				products[i].size == true &&
				products[i].stock <= 0
			) {
				productsToAdd.push(
					outOfStockSizedDataContainer(
						products[i]
					)
				);
			} else if (products[i].size == false) {
				productsToAdd.push(
					createNewDataContainer(products[i])
				);
			} else if (products[i].size == true) {
				productsToAdd.push(
					createNewSizedDataContainer(products[i])
				);
			}
		}

		shopContainer.append(productsToAdd);
	}

	// Creating template for Checkout Cart Item Row
	function createCheckoutCartRow(items) {
		let cartRow = $("<li>");
		cartRow.addClass(
			"list-group-item d-flex justify-content-between lh-condensed"
		);

		cartRow.html(`
                                <div>
                                        <h6 class="my-0">${items.name}</h6>
                                        <small class="text-muted">${
						items.size
					} | </small>
                                        <small class="text-muted">Quantity: ${
						items.quantity
					} | </small>
                                        <span class="text-muted">Price: ${
						items.price
					}</span>
                                </div>
                                <span class="text-muted">Total Item Price: $${
					items.totalPrice
				}</span>
                `);

		//generating total cart price by adding current cartTotalPrice value to 'this' item's totalPrice
		cartTotalPrice += parseFloat(items.totalPrice);

		return cartRow;
	}

	function initializeCheckoutCartRows() {
		let items = JSON.parse(localStorage.getItem("item"));
		let totalPriceCartRow = $("<li>");
		totalPriceCartRow.addClass(
			"list-group-item d-flex justify-content-between lh-condensed"
		);

		let itemToAddToCheckout = [];

		for (let i = 0; i < items.length; i++) {
			itemToAddToCheckout.push(
				createCheckoutCartRow(items[i])
			);
		}

		checkoutCartList.append(itemToAddToCheckout);

		console.log(cartTotalPrice);

		//Some Cart Totals are not displaying the extra '0' at the end since the float number is being rounded. Fixing it down here.
		let splitCartTotal = cartTotalPrice.toString().split(".");
		let cartTotalDollars = splitCartTotal[0];
		let cartTotalCents = splitCartTotal[1];

		if (cartTotalCents.length == 1) {
			cartTotalCents += "0";
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

		stripeTotal = adjustedCartTotal;
		console.log(stripeTotal);

		localStorage.setItem("cartTotal", stripeTotal);
	}

	if (window.location.pathname === "/checkout") {
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

		$("#stripe-form").append(
			`<input name='coKey' value ='${stripeTotal}' class="d-none"/>`
		);
	}

	if (window.location.pathname !== "/checkout") {
		localStorage.removeItem("cartTotal");
	}

	//handler to clear localStorage after charge has been made
	const handlePostCheckoutClear = () => {
		localStorage.clear();
	};

	//once 'Back To Home" button on success-page is clicked, localStorage is cleared by calling handlePostCheckoutClear()
	$("#success-page-btn").on("click", handlePostCheckoutClear);

	//UPDATING DB ONCE ORDER IS PROCESSED
	if (window.location.pathname == "/charge") {
		let items = JSON.parse(localStorage.getItem("item"));
		console.log(items.length);

		for (let i = 0; i < items.length; i++) {
			let itemRouteId = parseInt(items[i].id);
			let itemRouteStock = parseInt(items[i].stock);
			let itemRouteQty = parseInt(items[i].quantity);
			let itemNewStock = parseInt(
				itemRouteStock - itemRouteQty
			);

			$.ajax({
				method: "PUT",
				url: `/products/checkout/update/${itemRouteId}/${itemNewStock}`,
				data: items
			}).then(function() {
				console.log("ran function: update on checkout");
			});
		}
	}

	$("button.view-item").on("click", function(e) {
		e.preventDefault();

		singleItemRoute = $(this)
			.parent()
			.attr("value");
		console.log(singleItemRoute);
	});

	// ~~~~~~~~~~~~~~~~~~~HANDLING ALL DATA REQUESTS / FILTERING OF DATA SETS FROM DB~~~~~~~~~~~~~~~~~~
	//get all products from DB
	$.get("/products/all", function(data) {
		products = data;
		initializeDataContainers();
	});

	$("button.view-item").on("click", function(e) {
		e.preventDefault();
		console.log("hello");
	});

	//get single product from DB
	if (windowPath.split("/")[1] == "single-item") {
		$.get("/api/" + windowPath.split("/")[2], function(allData) {
			console.log(allData);
			product = allData;
			console.log(product);

			let currentIndex;

			let indexPath = windowPath.split("/")[2].split("-");

			if (indexPath[indexPath.length - 1] == "small") {
				currentIndex = 0;
			} else if (
				indexPath[indexPath.length - 1] == "medium"
			) {
				currentIndex = 1;
			} else if (indexPath[indexPath.length - 1] == "large") {
				currentIndex = 2;
			} else if (indexPath[indexPath.length - 1] == "x") {
				currentIndex = 3;
			} else if (indexPath[indexPath.length - 1] == "xx") {
				currentIndex = 4;
			}

			// initializeSingleProductElements();
			singleProductContainer.empty();

			singleProductContainer.html(
				`
			        <img src="${product[0].image_source}" class="single-product-img" />

				<div class="single-product-info-container">
					<p class="single-product-name">${product[0].product_name}</p>
					<p class="single-product-price">${product[0].price}</p>
					<p class="single-product-stock" value="${product[currentIndex].stock}">${
					product[currentIndex].stock
				}</p>
					<div class='btn-group size-control-div' role='group'>
						<div class="form-group single-item-size-form" value="${
							windowPath
								.split("/")[2]
								.split("-")[4]
						}">
							<a class="btn btn-outline-dark" href="/single-item/${
								product[0]
									.route_name
							}">S</a>
							<a class="btn btn-outline-dark" href="/single-item/${
								product[1]
									.route_name
							}">M</a>
							<a class="btn btn-outline-dark" href="/single-item/${
								product[2]
									.route_name
							}">L</a>
							<a class="btn btn-outline-dark" href="/single-item/${
								product[3]
									.route_name
							}">XL</a>
							<a class="btn btn-outline-dark" href="/single-item/${
								product[4]
									.route_name
							}">XXL</a>
							<button  class='shop-item-btn single-add-to-cart btn btn-dark'  value=${
								product[
									currentIndex
								].id
							}>Add To Cart</button>
						</div>
					</div>
					<input type='number' min="1" max=${
						product[currentIndex].stock
					} class='form-control shop-item-qty-text' name='item-quantity' aria-label='Quantity Input' aria-describedby='btnGroupAddon' value="1">
				</div>
			        `
			);
			return singleProductContainer;
		});
	}

	// on click event handlers to request data from DB based off category/brand name
	$("#filter-stache").on("click", function(e) {
		e.preventDefault();

		$.get("/products/brand/stache", data => {
			products = data;
			initializeDataContainers();
			console.log(data);
		});
	});

	$("#filter-capes").on("click", function(e) {
		e.preventDefault();

		$.get("/products/category/capes", data => {
			products = data;
			initializeDataContainers();
			console.log(data);
		});
	});

	$("#filter-tShirts").on("click", function(e) {
		e.preventDefault();

		$.get("/products/category/t-shirts", data => {
			products = data;
			initializeDataContainers();
			console.log(data);
		});
	});

	$("#filter-hairStyling").on("click", function(e) {
		e.preventDefault();

		$.get("/products/category/hair-styling", data => {
			products = data;
			initializeDataContainers();
			console.log(data);
		});
	});

	$("#filter-beardShaveMustache").on("click", function(e) {
		e.preventDefault();

		$.get("/products/category/beard-shave-mustache", data => {
			products = data;
			initializeDataContainers();
			console.log(data);
		});
	});

	$("#filter-facialBody").on("click", function(e) {
		e.preventDefault();

		$.get("/products/category/facial-body", data => {
			products = data;
			initializeDataContainers();
			console.log(data);
		});
	});

	$("#filter-razors").on("click", function(e) {
		e.preventDefault();

		$.get("/products/category/razors", data => {
			products = data;
			initializeDataContainers();
			console.log(data);
		});
	});

	$("#filter-modernMale").on("click", function(e) {
		e.preventDefault();

		$.get("/products/brand/modern-male", data => {
			products = data;
			initializeDataContainers();
			console.log(data);
		});
	});

	$("#filter-slickGorilla").on("click", function(e) {
		e.preventDefault();

		$.get("/products/brand/slick-gorilla", data => {
			products = data;
			initializeDataContainers();
			console.log(data);
		});
	});

	$("#filter-victoryCrown").on("click", function(e) {
		e.preventDefault();

		$.get("/products/brand/victory-crown", data => {
			products = data;
			initializeDataContainers();
			console.log(data);
		});
	});

	$("#filter-xotics").on("click", function(e) {
		e.preventDefault();

		$.get("/products/brand/xotics", data => {
			products = data;
			initializeDataContainers();
			console.log(data);
		});
	});
});
