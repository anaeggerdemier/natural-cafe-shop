document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('#cart tbody');
    const totalCell = document.querySelector('#cart-total');
    const checkoutButton = document.querySelector('.btn-primary');

    function updateCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;
        tbody.innerHTML = '';

        cart.forEach((item, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" min="1" data-index="${index}"></td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" data-index="${index}">Remove</button></td>
            `;

            row.querySelector('input[type="number"]').addEventListener('input', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart[index].quantity = parseInt(e.target.value);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });

            row.querySelector('.btn-danger').addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });

            tbody.appendChild(row);
            total += item.price * item.quantity;
        });

        totalCell.textContent = `$${total.toFixed(2)}`;
    }

    checkoutButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        if (localStorage.getItem('cart') === null || JSON.parse(localStorage.getItem('cart')).length === 0) {
            alert('Your cart is empty. Please add items to the cart before proceeding to checkout.');
        } else {
            window.location.href = 'checkout.html';
        }
    });

    updateCart();
});
