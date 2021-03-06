$(document).ready(function() {
	$.get("/keys/all", function(data) {
		console.log(data);
		let keysObj = data;
		console.log(keysObj);
		Stripe.setPublishableKey(keysObj.STRIPE_PUB_KEY);
		// console.log(keysObj.STRIPE_PUB_KEY);
	});

	//grabbing elements
	let $form = $("#checkout-form");
	let ccNumber = $("#cc-number");
	let ccName = $("#cc-name");
	let expMonth = $("#cc-expiration-month");
	let expYear = $("#cc-expiration-year");
	let ccCvv = $("#cc-cvv");

	$form.submit(function(event) {
		$form.find("button").attr("disabled", true);

		$form.find("#payment-errors").addClass(".d-none");

		// Get the Stripe token:
		Stripe.card.createToken(
			{
				number: ccNumber.val(),
				cvc: ccCvv.val(),
				exp_month: expMonth.val(),
				exp_year: expYear.val(),
				name: ccName.val()
			},
			stripeResponseHandler
		);
		return false;
	});

	function stripeResponseHandler(status, response) {
		if (response.error) {
			//PROBLEM!

			//show the errors on the form
			$form.find("#payment-errors").text(
				response.error.message
			);
			$form.find("#payment-errors").removeClass(".d-none");
			$form.find("button").attr("disabled", false); //re-enable button submission
		} else {
			//Token was created!

			//grab token id
			let token = response.id;

			//insert token into the form so it gets sent to the server
			$form.append(
				$(
					"<input type='hidden' name='stripeToken' />"
				).val(token)
			);

			//submit the form
			$form.get(0).submit();
		}
	}
});
