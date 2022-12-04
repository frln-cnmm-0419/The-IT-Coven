$(document).ready(() => {
  var sortingbtn = document.getElementsByClassName("sorting-btn");
  var almusalLS = document.getElementsByClassName("almusal");
  var meryendaLS = document.getElementsByClassName("meryenda");
  var pulutanLS = document.getElementsByClassName("pulutan");
  var sbpr = document.getElementById("snackbar");

  var notif = (product) => {
    $(sbpr).text("SORTED TO " + product + " ONLY");
    sbpr.className = "show";
    setTimeout(() => { sbpr.className = sbpr.className.replace("show", ""); }, 3000);
  }

  var sorting = (targetSort) => {
    $(almusalLS).css("display", "none");
    $(meryendaLS).css("display", "none");
    $(pulutanLS).css("display", "none");

    if (targetSort == "ALMUSAL") {
      $(almusalLS).css("display", "flex");
      notif(targetSort);
    }
    else if (targetSort == "MERYENDA") {
      $(meryendaLS).css("display", "flex");
      notif(targetSort);
    }
    else if (targetSort == "PULUTAN") {
      $(pulutanLS).css("display", "flex");
      notif(targetSort);
    }
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