import { cart, removeProductFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

let summeryHTML = '';

cart.forEach((cartItem) => {
  let productId = cartItem.productId;
  let matchItemProduct;
  products.forEach((product) => {
    if (productId === product.id) {
      matchItemProduct = product;
    }
  });
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === cartItem.deliveryOptionId) {
      deliveryOption = option;
    }
  });
  const today = dayjs();
  const deliveryDay = today.add(deliveryOption.deliveryDays, 'days');
  const stringDay = deliveryDay.format('dddd, MMMM D');
  summeryHTML += `<div class="cart-item-container 
	js-cart-item-container-${matchItemProduct.id}">
	<div class="delivery-date">
		Delivery date: ${stringDay}
	</div>

	<div class="cart-item-details-grid">
		<img class="product-image"
			src="${matchItemProduct.image}">

		<div class="cart-item-details">
			<div class="product-name">
				${matchItemProduct.name}
			</div>
			<div class="product-price">
			$${formatCurrency(matchItemProduct.priceCents)}
			</div>
			<div class="product-quantity">
				<span>
					Quantity: <span class="quantity-label">${cartItem.quantity}</span>
				</span>
				<span class="update-quantity-link link-primary">
					Update
				</span>
				<span class="delete-quantity-link link-primary js-delete-product" 
				data-product-id="${matchItemProduct.id}">
					Delete
				</span>
			</div>
		</div>

		<div class="delivery-options">
			<div class="delivery-options-title">
				Choose a delivery option:
			</div>
		${deliveryOptionsHTML(matchItemProduct, cartItem)}

		</div>
	</div>
</div>`;
});

function deliveryOptionsHTML(matchItemProduct, cartItem) {
  let deliveryHTML = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDay = today.add(deliveryOption.deliveryDays, 'days');
    const stringDay = deliveryDay.format('dddd, MMMM D');

    const priceDelivery =
      deliveryOption.priceCents === 0 ? 'Free' : `${formatCurrency(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    deliveryHTML += `<div class="delivery-option js-delivery-option"
		 data-product-id="${matchItemProduct.id}"
		 data-delivery-option-id="${deliveryOption.id}">
		<input type="radio"
		${isChecked ? 'checked' : ''}
			class="delivery-option-input"
			name="${matchItemProduct.id}">
		<div>
			<div class="delivery-option-date">
				${stringDay}
			</div>
			<div class="delivery-option-price">
				$${priceDelivery} - Shipping
			</div>
		</div>
	</div>`;
  });
  return deliveryHTML;
}

document.querySelector('.js-order-summary').innerHTML = summeryHTML;
document.querySelectorAll('.js-delete-product').forEach((link) => {
  let productId = link.dataset.productId;
  link.addEventListener('click', () => {
    removeProductFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
