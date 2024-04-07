console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl =  "https://dog.ceo/api/breeds/list/all";

    //Function to fetch and render the dog breeds based on the selected letter
    function fetchAndRenderBreeds(letter) {

         //Fetch the dog breeds from the API
    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {

        //Parse the response as JSON
        const breeds = Object.keys(data.message);

        //Filter the breeds that start with the selected letter
        const filteredBreeds = breeds.filter(breed => breed.startsWith(letter));

        //Get the <ul> element from the HTML
        const breedList = document.getElementById('dog-breeds');

         //Clear existing list items
         breedList.innerHTML = '';

         
         //Add the filtered breeds to the <ul> element
         filteredBreeds.forEach(breed => {
            const listItem = document.createElement('li');
            listItem.textContent = breed;

            //Add event listener to change the font colour to purple on click
            listItem.addEventListener('click', function() {
                listItem.style.color ='purple';
            });

            breedList.appendChild(listItem);
        });
      })

        .catch(error => {
            console.error('Error fetching images:', error);
        });
     }

     // Initial fetch and render of all dog breeds
     fetchAndRenderBreeds('');
 
     // Event listener for dropdown change
     const dropdown = document.getElementById('breed-dropdown');
     dropdown.addEventListener('change', function(event) {
        const selectedLetter = event.target.value;
        fetchAndRenderBreeds(selectedLetter);
     });

     //Fetch the dog images from the API
     fetch(imgUrl)
     .then(response => response.json())
     .then(data => {

         //Parse the response as JSON
         const images = data.message;

         //Add the image elements to the DOM for each image in the array
         images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            document.body.appendChild(img);  
         });
     })
     
    .catch(error => {
        console.error('Error fetching images', error);
    });
});
