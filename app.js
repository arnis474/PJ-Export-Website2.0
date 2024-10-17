// JavaScript for hamburger menu
document.addEventListener('DOMContentLoaded', function () {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('#navbarNavAltMarkup');

  if (navbarToggler) {
    navbarToggler.addEventListener('click', function () {
      navbarCollapse.classList.toggle('show');
    });
  }
});
