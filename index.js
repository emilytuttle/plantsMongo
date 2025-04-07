document.addEventListener("DOMContentLoaded", () => {
    const plantListElement = document.getElementById("plantList");
    const addPlantForm = document.getElementById("addPlantForm");
    const editPlantForm = document.getElementById("editPlantForm");
  
    // URL of the API backend
    const apiUrl = 'http://localhost:3000/plants';
  
    // Fetch and display all plants
    const fetchPlants = async () => {
      try {
        const response = await fetch(apiUrl);
        const plants = await response.json();
        displayPlants(plants);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
  
    // Display plants in the list
    const displayPlants = (plants) => {
      plantListElement.innerHTML = '';
      plants.forEach(plant => {
        const plantItem = document.createElement('li');
        plantItem.innerHTML = `
          <strong>${plant.name}</strong> (${plant.type})<br>
          Water Frequency: ${plant.waterFrequency}<br>
          Light Requirement: ${plant.lightRequirement}<br>
          Description: ${plant.description || 'No description'}<br>
          <div id='buttons-container'><button onclick="deletePlant('${plant._id}')">Delete</button>
          <button onclick="editPlant('${plant._id}')">Edit</button></div>
          
          <hr>
        `;
        plantListElement.appendChild(plantItem);
      });
    };
  
    // Add a new plant
    addPlantForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newPlant = {
        name: document.getElementById("name").value,
        type: document.getElementById("type").value,
        waterFrequency: document.getElementById("waterFrequency").value,
        lightRequirement: document.getElementById("lightRequirement").value,
        description: document.getElementById("description").value
      };
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPlant)
        });
  
        const addedPlant = await response.json();
        console.log('New plant added:', addedPlant);
        fetchPlants();  // Re-fetch the plants to update the list
      } catch (error) {
        console.error('Error adding plant:', error);
      }
    });
    // Delete a plant
    window.deletePlant = async (plantId) => {
      try {
        await fetch(`${apiUrl}/${plantId}`, { method: 'DELETE' });
        console.log('Plant deleted:', plantId);
        fetchPlants();  // Re-fetch the plants to update the list
      } catch (error) {
        console.error('Error deleting plant:', error);
      }
    };
  
    // Show the edit form with the plant's data
    window.editPlant = async (plantId) => {
      const response = await fetch(`${apiUrl}/${plantId}`);
      const plant = await response.json();
  
      // Populate the edit form with the plant's data
      document.getElementById("editPlantId").value = plant._id;
      document.getElementById("editName").value = plant.name;
      document.getElementById("editType").value = plant.type;
      document.getElementById("editWaterFrequency").value = plant.waterFrequency;
      document.getElementById("editLightRequirement").value = plant.lightRequirement;
      document.getElementById("editDescription").value = plant.description || '';
  
      // Show the edit form
      editPlantForm.style.display = "block";
    };
  
    // Update an existing plant
    editPlantForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const plantId = document.getElementById("editPlantId").value;
      const updatedPlant = {
        name: document.getElementById("editName").value,
        type: document.getElementById("editType").value,
        waterFrequency: document.getElementById("editWaterFrequency").value,
        lightRequirement: document.getElementById("editLightRequirement").value,
        description: document.getElementById("editDescription").value
      };
  
      try {
        const response = await fetch(`${apiUrl}/${plantId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPlant)
        });
  
        const updatedPlantData = await response.json();
        console.log('Plant updated:', updatedPlantData);
        fetchPlants();  // Re-fetch the plants to update the list
        editPlantForm.style.display = "none"; // Hide the edit form after updating
      } catch (error) {
        console.error('Error updating plant:', error);
      }
    });
  
    // Initial fetch to display all plants when the page loads
    document.getElementById("getPlants").addEventListener('click', fetchPlants);
  });
  