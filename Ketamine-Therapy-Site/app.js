// Grab the form and its fields
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

// Listen for form submission
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default reload

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Basic validation
  if (name === '' || email === '') {
    alert('Please fill in your name and email.');
    return;
  }

  // Log the form data (you could later send this to a server)
  console.log('New Patient Registration:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  // Display success message
  alert('Thank you for registering! We will be in touch soon.');

  // Clear the form
  form.reset();
});

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;

    // Toggle visibility
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';

    // Optionally: collapse other answers
    // faqQuestions.forEach(btn => {
    //   if (btn !== button) {
    //     btn.nextElementSibling.style.display = 'none';
    //   }
    // });
  });
});
