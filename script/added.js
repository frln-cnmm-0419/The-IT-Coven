$(document).ready(() => {
  var sortingbtn = document.getElementsByClassName("sorting-btn");
  var almusalLS = document.getElementsByClassName("almusal");
  var meryendaLS = document.getElementsByClassName("meryenda");
  var pulutanLS = document.getElementsByClassName("pulutan");
  const sbpr = document.getElementById("snackbar");
  const paynowBTN = document.getElementsByClassName('pn-btn');
  const cartCont = document.getElementById('cart-float');
  const closebtn = document.getElementsByClassName('close-cart');

  $(paynowBTN).click(() => {
    $(cartCont).css("display", "flex");
  });

  $(cartCont, closebtn).click(e => {
    $(cartCont).css("display", "none");
  })


  var notif = (product) => {
    $(sbpr).text("SORTED TO " + product + " ONLY");
    sbpr.className = "show";
    setTimeout(() => { sbpr.className = sbpr.className.replace("show", ""); }, 3000);
  }

  var sorting = (targetSort) => {
    $(almusalLS).css("display", "none");
    $(meryendaLS).css("display", "none");
    $(pulutanLS).css("display", "none");
    notif(targetSort);
    targetSort == "ALMUSAL" ? $(almusalLS).css("display", "flex") : targetSort == "MERYENDA" ? $(meryendaLS).css("display", "flex") : $(pulutanLS).css("display", "flex");
  }

  $(sortingbtn).click(e => {
    setTimeout(() => {
      sorting(e.target.innerText);
    }, 3500);
    $(sbpr).text("SORTING...");
    sbpr.className = "show";
    setTimeout(() => { sbpr.className = sbpr.className.replace("show", ""); }, 3000);
  });
})