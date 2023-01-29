const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function isValid({ id, name, meaning, quadrant, starsWithPlanets }) {
  return id && name && meaning && quadrant && starsWithPlanets;
}

async function update(constellation) {
  try {
    const id = constellation.id;
    const url = `${BASE_URL}/constellations/${id}`;
    const result = await axios.put(url, constellation);
    return await result;
  }
  catch(error) {
    return 'Updating constellation (id: ${id}) failed.';
  }
}


// should update multiple constellations by making multiple PUT requests
// should reject if anything but an array is passed in to it
// should reject if any of the constellations are missing a property
// should include update() error messages if something goes wrong in the request
async function bulkImport(constellations) {
  try {
    if (!Array.isArray(constellations)) {
    throw "Inputted argument must be an array.";      
    }
    if(constellations.every((constellation) => isValid(constellation))) {
      return Promise.allSettled(
      constellations.map((constellation) => update(constellation)))
    } else {
      throw "All constellations must include relevant fields.";
    }
  }
  catch(error) {
    console.log(error);
  }
};





module.exports = { bulkImport, update };





























