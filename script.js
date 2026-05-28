let cart = [];
let total = 0;
let locationLink = "";

// Function: Add item to cart
function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateUI();
}

// Function: Remove item from cart
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateUI();
}

// Function: Refresh UI
function updateUI() {
    const list = document.getElementById('cart-items');
    const count = document.getElementById('cart-count');
    const totalDisp = document.getElementById('cart-total');

    count.innerText = cart.length;
    totalDisp.innerText = total;
    
    list.innerHTML = '';
    if (cart.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#888;">Cart khali hai</p>';
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <span>${item.name} - ₹${item.price}</span>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            `;
            list.appendChild(li);
        });
    }
}

// Function: GPS Location
function getLocation() {
    const status = document.getElementById('gps-status');
    const addressBox = document.getElementById('user-address');

    if (!navigator.geolocation) {
        status.innerText = "GPS not supported by your browser.";
        return;
    }

    status.innerText = "Locating... Please wait.";
    
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        locationLink = `https://www.google.com/maps?q=${lat},${lon}`;
        addressBox.value = `📍 Location: ${locationLink}`;
        status.innerText = "Location successfully fetched!";
    }, () => {
        status.innerText = "Permission denied. Please type manually.";
        addressBox.readOnly = false;
    });
}

// Function: WhatsApp Send
function sendToWhatsApp() {
    const name = document.getElementById('user-name').value;
    const address = document.getElementById('user-address').value;

    if (!name || !address || cart.length === 0) {
        alert("Please details bharein aur cart mein items add karein!");
        return;
    }

    const phoneNumber = "9664464919"; // <-- Apna WhatsApp number yahan likhein (91 ke saath)
    
    let message = `*NAYA ORDER - HARDWARE HUB*%0a%0a`;
    message += `*Customer:* ${name}%0a`;
    message += `*Delivery Address/Location:* ${address}%0a%0a`;
    message += `*Items List:*%0a`;
    
    cart.forEach((item, i) => {
        message += `${i + 1}. ${item.name} - ₹${item.price}%0a`;
    });
    
    message += `%0a*Total Bill: ₹${total}*`;

    const whatsappURL = `https://wa.me/${9664464919}?text=${message}`;
    window.open(whatsappURL, '_blank').focus();
}