document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
  
    // Here you would normally send the data to a server
    console.log('Email:', email);
    console.log('Message:', message);
  
    // Clear the form fields
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  
    alert('Thank you for your message!');
  });
  