// Show modal and switch forms based on the clicked link
document.getElementById("login-link").addEventListener("click", function(event) {
  event.preventDefault();
  showModal('login');
});

document.getElementById("signup-link").addEventListener("click", function(event) {
  event.preventDefault();
  showModal('signup');
});

function showModal(formType) {
  var modal = document.getElementById("loginSignupModal");
  var loginForm = document.getElementById("login");
  var signupForm = document.getElementById("signup");
  
  // Display appropriate form and set active tab
  if (formType === 'login') {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
    document.getElementById("signup-tab").classList.remove('active');
    document.getElementById("login-tab").classList.add('active');
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    document.getElementById("login-tab").classList.remove('active');
    document.getElementById("signup-tab").classList.add('active');
  }

  modal.style.display = "block";
}

// Close the modal if clicking outside of it
window.onclick = function(event) {
  var modal = document.getElementById("loginSignupModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Handle input field interaction (active/highlight classes on focus and blur)
document.querySelectorAll('.form input, .form textarea').forEach(function(input) {
  input.addEventListener('keyup', handleLabel);
  input.addEventListener('blur', handleLabel);
  input.addEventListener('focus', handleLabel);
});

function handleLabel(e) {
  var label = e.target.previousElementSibling;

  if (e.type === 'keyup') {
    if (e.target.value === '') {
      label.classList.remove('active', 'highlight');
    } else {
      label.classList.add('active', 'highlight');
    }
  } else if (e.type === 'blur') {
    if (e.target.value === '') {
      label.classList.remove('active', 'highlight');
    } else {
      label.classList.remove('highlight');
    }
  } else if (e.type === 'focus') {
    if (e.target.value === '') {
      label.classList.remove('highlight');
    } else if (e.target.value !== '') {
      label.classList.add('highlight');
    }
  }
}

// Handle tab switching inside the modal
document.querySelectorAll('.tab').forEach(function(tab) {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
  
      // Set the clicked tab as active
      var parentLi = tab.parentNode;
      console.log('Activating tab:', parentLi); // Debugging line
  
      parentLi.classList.add('active');
      parentLi.parentNode.querySelectorAll('li').forEach(function(sibling) {
        if (sibling !== parentLi) {
          sibling.classList.remove('active');
        }
      });
  
      // Show the associated content
      var target = document.querySelector(tab.querySelector('a').getAttribute('href'));
      document.querySelectorAll('.tab-content > div').forEach(function(content) {
        content.style.display = 'none';
      });
      target.style.display = 'block';
    });
  });

    // Function to display the toast
    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
    
        // Hide the toast after 3 seconds
        setTimeout(() => {
          toast.classList.remove("show");
        }, 3000);
    }
    
    // if (successMessage) {
    //   showToast(successMessage); // Call the toast function if there's a success message
    // }
  