document.addEventListener('DOMContentLoaded', () => {
    const orderTableBody = document.querySelector('#order-summary tbody');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutForm = document.getElementById('checkout-form');
  
    // Load order from localStorage
    const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
  
    if (!currentOrder || currentOrder.length === 0) {
      alert('No items found in your order!');
      window.location.href = 'index.html'; // Redirect to the main page
      return;
    }
  
    // Populate order summary
    let totalPrice = 0;
    currentOrder.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${item.total.toFixed(2)}</td>
      `;
      orderTableBody.appendChild(row);
      totalPrice += item.total;
    });
    totalPriceEl.textContent = totalPrice.toFixed(2);
  
    // Handle form submission
    checkoutForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Basic validation
      const fullName = document.getElementById('full-name').value.trim();
      const contactNumber = document.getElementById('contact-number').value.trim();
      const email = document.getElementById('email').value.trim();
      const address = document.getElementById('address').value.trim();
      const deliveryDate = document.getElementById('delivery-date').value.trim();
      const cardNumber = document.getElementById('card-number').value.trim();
      const expiryDate = document.getElementById('expiry-date').value.trim();
      const cvv = document.getElementById('cvv').value.trim();
  
      if (!fullName || !contactNumber || !email || !address || !deliveryDate || !cardNumber || !expiryDate || !cvv) {
        alert('Please fill out all the fields.');
        return;
      }
  
      // Simulate successful payment
      const deliveryDateObj = new Date(deliveryDate);
      alert(`Thank you for your purchase, ${fullName}!\nYour order will be delivered on ${deliveryDateObj.toDateString()}.`);
      
      // Clear localStorage and redirect
      localStorage.removeItem('currentOrder');
      window.location.href = 'index.html'; // Redirect to homepage
    });
  });
  