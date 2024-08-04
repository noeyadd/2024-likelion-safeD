document.addEventListener("DOMContentLoaded", function () {
  const law_img = document.getElementById("law_img");
  const new_src = law_img.getAttribute("data-new-src");
  law_img.src = new_src;
});
