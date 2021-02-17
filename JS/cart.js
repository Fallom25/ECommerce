if(document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready);
}else{
	ready();
}

function ready(){
	var removeButtons = document.getElementsByClassName('btn-danger');
	for(var i = 0; i < removeButtons.length; i++){
		var button = removeButtons[i];
		button.addEventListener('click',removeCartItem); 
	}

	var quantityInputs = document.getElementsByClassName('cart-item__quantity--input');
	for(var i = 0; i < quantityInputs.length; i++){
		var input = quantityInputs[i];
		input.addEventListener('change', quantityChanged);
	}

	var addToCartButton = document.getElementsByClassName('shop-item__button');
	for(var i = 0; i < addToCartButton.length; i++){
		var button = addToCartButton[i];
		button.addEventListener('click', addToCartClick);
	}

	document.getElementsByClassName('cart-total__button')[0].addEventListener('click', purchasseClicked);
}


function purchasseClicked(){
	alert("I am very tired right now");
	var cartItems = document.getElementsByClassName('cart-items')[0];
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild);
	}
	updateTotal();
}


function removeCartItem(event){
	var buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.remove();
	updateTotal();
}



function quantityChanged(event){
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0){
		input.value = 1;
	}
	updateTotal();
}



function addToCartClick(event){
	var button = event.target;
	var shopItem = button.parentElement.parentElement;
	var title = shopItem.getElementsByClassName('shop-item__title')[0].innerText;
	var price = shopItem.getElementsByClassName('shop-item__price')[0].innerText;
	var imgsrc = shopItem.getElementsByClassName('shop-item__img')[0].src;

	addItemtoCart(title, price, imgsrc);
	updateTotal();
}

function addItemtoCart(title, price, imgsrc){
	var cartRow = document.createElement('div');
	cartRow.classList.add('row');
	var cartItems = document.getElementsByClassName('cart-items')[0];

	var cartItemTitle = cartItems.getElementsByClassName('cart-item__title');
	for(var i = 0; i < cartItemTitle.length; i++ ){
		if (cartItemTitle[i].innerText === title){
			alert('This item is already in the cart');
			return;
		}
	}

	var cartRowContents = `
	<div class="cart-item col">
		<img class="cart-item__img" src="${imgsrc}" width="100" height="100">
		<span class="cart-item__title font-weight-bold">${title}</span>
	</div>
	<span class="cart-item__price text-center col">${price}</span>
	<div class="cart-item__quantity col">
		<input class="cart-item__quantity--input" type="number" value="1">
		<button class="btn btn-danger" type="button">REMOVE</button>
	</div>`

	cartRow.innerHTML = cartRowContents;
	cartItems.append(cartRow);

	cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
	cartRow.getElementsByClassName('cart-item__quantity--input')[0].addEventListener('change', quantityChanged);
}

function updateTotal(){
	var cartContainer = document.getElementsByClassName('cart-items')[0];
	var cartRows = cartContainer.getElementsByClassName('row');

	var total = 0;

	for(var i = 0; i < cartRows.length; i++ ){
		var cartRow = cartRows[i];

		var priceElement = cartRow.getElementsByClassName('cart-item__price')[0];
		var quantityElement = cartRow.getElementsByClassName('cart-item__quantity--input')[0];

		var price = parseFloat(priceElement.innerText.replace('$',''));
		var quantity = quantityElement.value;

		total = total + (price * quantity);
	}
	document.getElementsByClassName('cart-total__price')[0].innerText = '$' + total.toFixed(2);
	console.log(price, quantity, total);
}