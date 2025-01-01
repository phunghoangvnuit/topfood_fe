import mapboxgl from "mapbox-gl";

// METHOD: Get delivery fee
export const calculateDeliveryFee = async (userAddress, restaurantAddress) => {
  const route = await calculateRoute(userAddress, restaurantAddress);
  if (route) {return route.distance * 5000};
};

// METHOD: Get delivery time (for example: delivery at 10:00 AM)
export const estimateDuration = async (userAddress, restaurantAddress) => {
  const route = await calculateRoute(userAddress, restaurantAddress);
  if (route) { return route.duration}
}

// METHOD: Get delivery duration (for example: delivery in 15 minutes)
export const estimateTime = async (userAddress, restaurantAddress) => {
  const route = await calculateRoute(userAddress, restaurantAddress);
  if (route) {
    const currentTime = new Date();
    const estimatedTime = new Date(currentTime.getTime() + route.duration * 60000); // Convert minutes to milliseconds
    return `${estimatedTime.getHours().toString().padStart(2, '0')}:${estimatedTime.getMinutes().toString().padStart(2, '0')}`
  }
}

// MapBox Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoicGh1bmdob2FuZ3ZudWl0IiwiYSI6ImNtNTEzbWt4bzF1ajcya29oMDh1bnQ1Mm0ifQ.T_4yhQuJj7E83ALBxpUOcw';

// Convert address to coordinate
async function getCoordinates(address) {
  const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`
  );
  const data = await response.json();
  return data.features[0].center;
}

// Caculate route
async function calculateRoute(userAddress, restaurantAddress) {
  try {
      const mapbox = {
        distance: 0,
        duration: 0
      }

      const startCoords = await getCoordinates(userAddress);
      const endCoords = await getCoordinates(restaurantAddress);

      const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
      );

      const data = await response.json();
      const route = data.routes[0];
      const distance = (route.distance / 1000).toFixed(2); // Convert meters to kilometers
      const duration = (route.duration / 60).toFixed(2); // Convert seconds to minutes
      mapbox.distance = distance;
      mapbox.duration = duration;

      console.log (`Distance: ${distance} km`);
      console.log(`Estimated Time: ${duration} mins`);
      return mapbox;

  } catch (error) {
      console.error('Error:', error);
      console.log('Unable to calculate route. Please try again.');
  }
}
