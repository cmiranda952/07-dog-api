// Get elements from the page
const breedSelect = document.getElementById("breed-select");
const gallery = document.getElementById("gallery");

// Fetch all breeds from the Dog API
fetch("https://dog.ceo/api/breeds/list/all")
  .then((response) => response.json())
  .then((data) => {
    // The breed names are the keys inside data.message
    const breeds = Object.keys(data.message);

    // Sort breed names alphabetically so the menu is easier to use
    breeds.sort();

    // Add one <option> per breed
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed;
      option.textContent = breed;
      breedSelect.appendChild(option);
    });
  });

// When the user picks a breed, fetch and show 9 random images
breedSelect.addEventListener("change", () => {
  const selectedBreed = breedSelect.value;

  // If user selects the placeholder option, clear the gallery
  if (selectedBreed === "") {
    gallery.innerHTML = "";
    return;
  }

  // Build the API URL using the selected breed
  const imageUrl = `https://dog.ceo/api/breed/${selectedBreed}/images/random/9`;

  fetch(imageUrl)
    .then((response) => response.json())
    .then((data) => {
      // Clear previous images
      gallery.innerHTML = "";

      // data.message is an array of image URLs
      data.message.forEach((imageSrc) => {
        // Create a wrapper that matches the CSS card style
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        // Create the image element
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = `A ${selectedBreed} dog`;

        // Put image inside the wrapper, then add to gallery
        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
      });
    });
});