document.addEventListener("DOMContentLoaded", function () {
  const home_img = document.getElementById("home_img");
  const new_src = home_img.getAttribute("data-new-src");
  home_img.src = new_src;
});
