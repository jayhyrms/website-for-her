// Get the button elements
const noButton = document.getElementById('no-button');
const yesButton = document.getElementById('yes-button');

// Add event listeners to the buttons
noButton.addEventListener('click', () => {
  // When the No button is clicked, move it around the screen
  noButton.style.position = 'absolute';
  noButton.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  noButton.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
});

yesButton.addEventListener('click', () => {
  // When the Yes button is clicked, trigger some action (e.g., display a message)
  alert('yayyyy, love u too ><');
  // Tambahkan kode untuk membuat tombol Yes ter-triggered
  yesButton.style.backgroundColor = 'green';
  yesButton.style.color = 'white';
  yesButton.style.border = 'none';
  yesButton.style.padding = '10px 20px';
  yesButton.style.borderRadius = '5px';
  yesButton.style.cursor = 'pointer';
  yesButton.innerHTML = 'Yessss!';
});