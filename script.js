// In game.js

// Select all HTML-based ingredients and the mixing bowl
const ingredients = document.querySelectorAll('.ingredient');
const mixingBowl = document.getElementById('mixingBowl');
let draggedElement = null;

// Mouse Down to Start Dragging
ingredients.forEach(ingredient => {
  ingredient.addEventListener('mousedown', (e) => {
    console.log(`Picked up ${ingredient.id}`);
    draggedElement = ingredient;
    ingredient.style.cursor = 'grabbing';
  });
});

// Mouse Move to Drag
document.addEventListener('mousemove', (e) => {
  if (draggedElement) {
    draggedElement.style.position = 'absolute';
    draggedElement.style.left = `${e.clientX - draggedElement.offsetWidth / 2}px`;
    draggedElement.style.top = `${e.clientY - draggedElement.offsetHeight / 2}px`;
  }
});

// Mouse Up to Drop
document.addEventListener('mouseup', (e) => {
  if (draggedElement) {
    const bowlRect = mixingBowl.getBoundingClientRect();
    const ingredientRect = draggedElement.getBoundingClientRect();

    // Check Collision
    const isCollision = (
      ingredientRect.left < bowlRect.right &&
      ingredientRect.right > bowlRect.left &&
      ingredientRect.top < bowlRect.bottom &&
      ingredientRect.bottom > bowlRect.top
    );

    if (isCollision) {
      console.log(`${draggedElement.id} added to the bowl!`);
      const message = document.createElement('p');
      message.textContent = `${draggedElement.id} Added!`;
      mixingBowl.appendChild(message);
      draggedElement.style.display = 'none'; // Remove ingredient
    } else {
      console.log("Ingredient not dropped in the bowl.");
    }
    draggedElement.style.cursor = 'grab';
    draggedElement = null;
  }
});
