// src/services.js
const axios = require('axios');

const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
const apiKey = process.env.GOOGLE_API_KEY;

async function getAllGoogleReviews(placeId) {
  let reviews = [];
  let nextPageToken = null;

  do {
    try {
      const { data } = await axios.get(GOOGLE_API_URL, {
        params: {
          place_id: placeId,
          key: apiKey,
          fields: 'reviews',
         pagetoken : nextPageToken || '',
          maxresults: 20, // Limitar resultados por página
        },
      });

      // Verifica si existen reseñas y las agrega al array principal
      if (data.result && data.result.reviews) {
        reviews = reviews.concat(data.result.reviews);
      }
      console.log("data",data.html_attributions.length)

      // Actualiza el `nextPageToken`
      nextPageToken = data.next_page_token;

      // Verificación de `nextPageToken` y pausa
      if (nextPageToken) {
        console.log(`Esperando el próximo token...`);
        await new Promise(resolve => setTimeout(resolve, 60000));
      }

    } catch (error) {
      console.error("Error al obtener las reseñas:", error.response ? error.response.data : error.message);
      throw new Error('Error al obtener reseñas de Google Places API');
    }
  } while (nextPageToken);

  return reviews;
}

module.exports = { getAllGoogleReviews };
