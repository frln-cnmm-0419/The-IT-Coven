$(document).ready(e => {
  const buttons = document.getElementsByTagName("button");
  const exit = document.getElementsByClassName('exit');
  const overlay = document.getElementById('overlay');
  const others = document.getElementsByClassName('others');
  const title = document.getElementsByClassName('title');
  const textcont = document.getElementsByClassName('text');

  const order = document.getElementById("order-now");

  for (const button of buttons) {
    button.addEventListener("click", createRipple);
  }

  function createRipple(e) {
    const button = e.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  $(order).click(() => {
    window.location.href = "pages/products.html";
  })

  $(exit).click(() => {
    $(overlay).css('display', 'none');
  });

  $(overlay).click(() => {
    $(overlay).css('display', 'none');
  });

  $(others).click(e => {
    let maps = document.getElementsByClassName("mapouter");

    console.log(maps);

    if (e.target.id === "about") {
      $(title).text("About Us");
      $(overlay).css("display", "flex");
      $(textcont).text("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis fugit id asperiores dolorum consequatur, illum quam sapiente voluptatum temporibus impedit blanditiis doloribus molestiae reiciendis rem repellendus voluptates ipsam necessitatibus inventore dicta maxime magnam labore! Quis dolores voluptates placeat eveniet omnis, accusamus unde exercitationem. Aliquid, est reprehenderit! Porro esse optio nostrum.")
    }

    else if (e.target.id === "faq") {
      $(title).text("Frequently Asked Questions");
      $(overlay).css("display", "flex");
    }

    else if (e.target.id === "stores") {
      $(title).text("Our Locations");
      $(overlay).css("display", "flex");
    }

  });
});