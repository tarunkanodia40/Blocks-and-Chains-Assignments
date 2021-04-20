var express = require("express");
const crypto = require('crypto');
const bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/',(req,res) => {
	console.log(req.body.name);
	const name= req.body.name;
	if(name===undefined){
		res.send("Input field is empty");
	} 
	else{
		var i=0;
		var final_hash="";
		for(i=0;;i++)
		{
			var temporary_string=name+i;
			const hash = crypto.createHash('sha256').update(temporary_string).digest('hex');
			if(hash.substring(0,4)==="0000")
			{
				final_hash=hash;
				break;
			}
		}
		res.send({'Integer':i,"Hash":final_hash, "Required String": temporary_string})
	}
})

app.listen(5000, () => {

    console.log("Listening on port 5000");
});