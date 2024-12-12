document.addEventListener('DOMContentLoaded', () => {
  const quantities = document.querySelectorAll('.quantity');
  const orderTableBody = document.querySelector('#order-summary tbody');
  const totalPriceEl = document.getElementById('total-price');
  const buyNowBtn = document.getElementById('buy-now');
  const saveFavoriteBtn = document.getElementById('save-favorite');
  const applyFavoriteBtn = document.getElementById('apply-favorite');
  
  let orderItems = [];
  
  // Update order summary when quantities change
  quantities.forEach(input => {
    input.addEventListener('input', () => {
      updateOrder();
    });
  });

  function updateOrder() {
    orderItems = [];
    let totalPrice = 0;
    orderTableBody.innerHTML = '';
    
    quantities.forEach(input => {
      const quantity = parseInt(input.value);
      if (quantity > 0) {
        const name = input.dataset.name;
        const price = parseFloat(input.dataset.price);
        const total = quantity * price;
        
        orderItems.push({ name, quantity, price, total });
        
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${name}</td>
          <td>${quantity}</td>
          <td>$${price.toFixed(2)}</td>
          <td>$${total.toFixed(2)}</td>
        `;
        orderTableBody.appendChild(row);
        
        totalPrice += total;
      }
    });
    
    totalPriceEl.textContent = totalPrice.toFixed(2);
  }

  // Save favorite order
  saveFavoriteBtn.addEventListener('click', () => {
    localStorage.setItem('favoriteOrder', JSON.stringify(orderItems));
    alert('Order saved as favorite!');
  });

  // Apply favorite order
  applyFavoriteBtn.addEventListener('click', () => {
    const favoriteOrder = JSON.parse(localStorage.getItem('favoriteOrder'));
    if (favoriteOrder) {
      quantities.forEach(input => {
        const name = input.dataset.name;
        const item = favoriteOrder.find(order => order.name === name);
        input.value = item ? item.quantity : 0;
      });
      updateOrder();
    } else {
      alert('No favorite order found!');
    }
  });

  // Buy now button
  buyNowBtn.addEventListener('click', () => {
    if (orderItems.length === 0) {
      alert('Please add items to your order.');
      return;
    }
    localStorage.setItem('currentOrder', JSON.stringify(orderItems));
    window.location.href = 'checkout.html'; // Redirect to checkout page
  });
});
