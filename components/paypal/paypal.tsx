import { useEffect } from 'react';
declare global {
	const paypal: any;
}

const PayPal = () => {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://www.paypal.com/sdk/js?client-id=test&currency=USD&intent=capture&enable-funding=venmo';
		script.onload = () => {
			const paypalButtonsComponent = paypal.Buttons({
				// optional styling for buttons
				// https://developer.paypal.com/docs/checkout/standard/customize/buttons-style-guide/
				style: {
					color: 'gold',
					shape: 'pill',
					layout: 'vertical',
				},

				// set up the transaction
				createOrder: (
					data: any,
					actions: { order: { create: (arg0: { purchase_units: { amount: { value: string } }[] }) => any } }
				) => {
					console.log({ data, actions });
					// pass in any options from the v2 orders create call:
					// https://developer.paypal.com/api/orders/v2/#orders-create-request-body
					const createOrderPayload = {
						purchase_units: [
							{
								amount: {
									value: '88.44',
								},
							},
						],
					};

					return actions.order.create(createOrderPayload);
				},

				// finalize the transaction
				onApprove: (data: any, actions: { order: { capture: () => Promise<any> } }) => {
					console.log({ data, actions });
					const captureOrderHandler = (details: { payer: { name: { given_name: any } } }) => {
						const payerName = details.payer.name.given_name;
						console.log('Transaction completed');
					};

					return actions.order.capture().then(captureOrderHandler);
				},

				// handle unrecoverable errors
				onError: (err: any) => {
					console.error('An error prevented the buyer from checking out with PayPal');
				},
			});

			paypalButtonsComponent.render('#paypal-button-container').catch((err: any) => {
				console.error('PayPal Buttons failed to render');
			});
		};
		document.body.appendChild(script);
	}, []);
	return <div id="paypal-button-container"></div>;
};

export default PayPal;
