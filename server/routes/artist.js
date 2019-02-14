const express = require('express');
const router = express.Router();

router.get('/artist', (req, res, next) => {
  res.render('artist/artist');
})


module.exports = router;
