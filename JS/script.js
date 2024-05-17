
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('myModal');
    const openButtons = document.querySelectorAll('[target="_blank"]');
    const closeBtn = document.querySelector('.close');
  
    openButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        modal.style.display = 'block';
      });
    });
  
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  