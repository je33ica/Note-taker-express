const express = require('express');
const htmlRoute = require("./routes/htmlroutes")
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({extended:true}));
//will find the html in the public folder
app.use(express.static("public"));
app.use("/", htmlRoute);


app.listen(PORT, () => {console.log(`listen on ${PORT}`)});
