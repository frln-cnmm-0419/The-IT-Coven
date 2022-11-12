$(document).ready( e => {
  const order = document.getElementById('order-now');

  console.log("hello world");
  $('#order-now').click(x => {
    location.href = 'pages/products.html';
  });
});