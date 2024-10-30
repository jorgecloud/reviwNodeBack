const express = require('express');
const router = express.Router();
const {getAllGoogleReviews} = require('./services')


router.get('/reviews', async(req, res)=>{
    const {placeId} = req.query;
    console.log(placeId)

    if(!placeId){
        return res.status(400).json({eror: 'place ID is rrequired'})

    }

    try{
        const reviews = await getAllGoogleReviews(placeId)
        console.log(`Total reviews fetched: ${reviews.length}`); // Imprime el total de reseñas obtenidas
        res.json(reviews)

    }catch(error){
        res.status(500).json({error:"Failed to fetch reviews"})

    }



})

module.exports = router;