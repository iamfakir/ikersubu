const sharp = require("sharp"); sharp("public/assets/images/studiopic/studiop1.JPG").webp({quality: 90}).toFile("public/assets/images/studiopic/studiop1.webp");
