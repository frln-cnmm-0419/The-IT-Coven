$(document).ready(() => {
  var price = 0;
  var count = 0;
  var product = document.getElementsByClassName("products");
  var cartcount = document.getElementsByClassName("content");
  var toast = document.getElementById("snackbar");
  console.log(cartcount);

  $(product).click((e) => {
    price += 100;
    //console.log(price);
    // Get the snackbar DIV

    // Add the "show" class to DIV
    toast.innerText = "Added to Cart!";
    toast.className = "show";



    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);

    count++;
    console.log(count);
    cartcount[0].innerText = count;
    $(e).css("scale", "1.2");
    $(cartcount).css("width", "1.8rem");
    $(cartcount).css("height", "1.8rem");
  })
});