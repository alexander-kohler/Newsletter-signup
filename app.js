const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/signup.html')
})

app.post('/signup', (req, res) =>{
    let firstName = req.body.firstname
    let lastName = req.body.lastname
    let email = req.body.email
    
    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }


    let jsonData = JSON.stringify(data)

    const url = "https://us21.api.mailchimp.com/3.0/lists/b52579278a"

    const options = {
        method: "POST",
        auth: "bluetrack:ff30d94a63e3356d7771ea057a4dcbde-us21"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        } else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", (data) =>{
            console.log(JSON.parse(data));
        })
        
    })

    

    request.write(jsonData)
    request.end()


})


app.post("/failure", (req, res) =>{
    res.redirect('/')
})



app.listen(3000, ()=>{
    console.log('Server startet on port 3000');
})

// mailchimp api key: ff30d94a63e3356d7771ea057a4dcbde-us21
// list id: b52579278a

