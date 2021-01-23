const express = require('express');
const htmlRoute = require("./routes/htmlRoutes")
const apiRoutes = require("./routes/apiRoutes")
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({extended:true}));
//will find the html in the public folder
app.use(express.static("public"));


app.use("/", apiRoutes);
app.use("/", htmlRoute);


//this starts our server
app.listen(PORT, () => {console.log(`listen on ${PORT}`)});
