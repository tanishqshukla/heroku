var express = require('express')

var bodyParser = require('body-parser')

var request = require('request')

var app = express()

 

app.set('port', (process.env.PORT || 5000))

 

// Process application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: false}))

 

// Process application/json

app.use(bodyParser.json())

 

// Index route

app.get('/', function (req, res) {

    res.send('I wish I knew more about it .But I’ll work on it. In the mean time would you like to head back to the Main Menu?‘)

})

 

// for Facebook verification

app.get('/webhook/', function (req, res) {

    if (req.query['hub.verify_token'] === ITSVITS') {

        res.send(req.query['hub.challenge'])

    }

    res.send('Error, wrong token')

})

 

// Spin up the server

app.listen(app.get('port'), function() {

    console.log('running on port', app.get('port'))

})

 

 

// API End Point - added by Shreya

 

app.post('/webhook/', function (req, res) {

    messaging_events = req.body.entry[0].messaging

    for (i = 0; i < messaging_events.length; i++) {

        event = req.body.entry[0].messaging[i]

        sender = event.sender.id

        if (event.message && event.message.text) {

            text = event.message.text

            if (text === 'hi') {

                sendGenericMessage(sender)

                continue

            }

           

        if (event.postback) {

            text = JSON.stringify(event.postback)

            sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)

            continue

        }

    }

    res.sendStatus(200)

})


 

 

function sendTextMessage(sender, text) {

    messageData = {

        text:text

    }

    request({

        url: 'https://graph.facebook.com/v2.6/me/messages',

        qs: {access_token:token},

        method: 'POST',

        json: {

            recipient: {id:sender},

            message: messageData,

        }

    }, function(error, response, body) {

        if (error) {

            console.log('Error sending messages: ', error)

        } else if (response.body.error) {

            console.log('Error: ', response.body.error)

        }

    })

}

 

 

 

 

function sendGenericMessage(sender) {

    messageData = {

        "attachment": {

            "type": "template",

            "payload": {

                "template_type": "generic",

                "elements": [{

                    "title": "Hello {{firstname}} you're interacting with SVVV's Information portal.",

                    "subtitle": "We're still in development phase so keep supporting!",

                    "image_url": https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwig9qz5raDhAhXJMo8KHSdiAUwQjRx6BAgBEAU&url=https%3A%2F%2Fcollegedunia.com%2Funiversity%2F58562-shri-vaishnav-vidyapeeth-vishwavidyalaya-svvv-indore%2Fgallery&psig=AOvVaw1zvChhzFjPoLx79k65up8D&ust=1553708596242090",

                    "buttons": [{

                        "type": "postback",

                        "title": "Ready!"

                        "payload": "We provide you with a host of services.You can access any one of them below!",

                    },

                  , {

                    "title": "News | Notices | Events",

                    "subtitle": " ",

                    "image_url": " https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiKuuPEr6DhAhVf8HMBHUKwAsMQjRx6BAgBEAU&url=http%3A%2F%2Ffis-cal.com%2Fevents%2F&psig=AOvVaw3mGne1B5eSbzLzjV48ftq3&ust=1553709086536635",

                    "buttons": [{

                        "type": "postback",

                        "title": "Tell me more!",

                        "payload": "Please select event genre-",

                              {

                        "type": "postback",

                        "title": "Technical Event",

                        "payload": " We have following technical events lined up!",

                    },

 

                         {   

                        "buttons": [{

                        "type": "src.url",

                        "title": "SAJAG",

                        "url : "http://www.svvv.edu.in/uploaded_files/SAJAG_2018.pdf",

                        },

                        {

                        "type": "src.url",

                        "title": "TEXCON",

                       "url : "http://www.svvv.edu.in/uploaded_files/11.03.2018_Dainik_Bhaskar_Date.pdf",

                        },

                        {

                        "type": "src.url",

                        "title": "Navyantram",

                       "url : "http://www.svvv.edu.in/uploaded_files/Navyantram_v8.pdf",

                        }]                    

                        }

 

                        {

                        "type": "postback",

                        "title": "Management Event ",

                        "payload": "We have following details",

 

                        {   

                        "buttons": [{

                        "type": "src.url",

                        "title": "Vishwankan",

                        "url : "http://www.svvv.edu.in/uploaded_files/vishwankan_2019.pdf",

                        },

                        {

                        "type": "src.url",

                        "title": "Nirmiti",

                       "url : "http://www.svvv.edu.in/uploaded_files/Nirmiti_30.11.2018_(Patrika).jpg",

                        }]

                  

                   }, {

                        "type": "postback",

                        "title": "Annual Fest -  Spandan",

                         image_url": "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiy8vD0uaDhAhUIeisKHXF8B3UQjRx6BAgBEAU&url=https%3A%2F%2Fwww.facebook.com%2FSpandanSVVV%2F&psig=AOvVaw39JTG1S7mk0DcksJIjVSQT&ust=1553711874178420

                        "payload": " Register yourself at!",

                         "buttons": [{

                        "type": "src.url",

                        "title": "Official Website",

                        "url : "http://spandan.svvv.edu.in/#0",

                        }]              

                        "payload": "Follow us on ",

                         "buttons": [{

                        "type": "src.url",

                        "title": "Instagram",

                        "url : "https://www.instagram.com/spandan_2019/",

                        },

                        "type": "src.url",

                        "title": "Facebook",

                        "url : " https://www.facebook.com/SpandanSVVV/",

 

                        }]

                    }],

                },  {

                   title": "Bus Routes!",

                    "subtitle": " ",

                    "image_url": " https://www.google.com/url?sa=BUSROUTE&cd=&ved=2ahUKEwiKuuPEr6DhAhVf8HMBHUKwAsMQjRx6BAgBEAU&url=http%3A%2F%2Ffis-cal.com%2Fevents%2F&psig=AOvVaw3mGne1B5eSbzLzjV48ftq3&ust=1553709086536635",

                    "buttons": [{

                        "type": "postback",

                        "title": "Tell me more!",

                        "payload": "Please enter the location or place you wish to go!",

                        var express    = require("git.status.add");

 var mysql      = require('mysql');

 var connection = mysql.createConnection({

   host     : 'master',

   user     : 'root',

   password : '1234',

   database : 'Busroute'

 });

 var app = express();

 

 connection.connect(function(err){

 if(!err) {

     console.log("Database is connected ... \n\n"); 

 } else {

     console.log("Error connecting database ... \n\n"); 

 }

 });

 

 app.get("/",function(req,res){

 connection.query('SELECT * from user Busroute’, function(err, busno, busroute) {

 connection.end();

   if (!err)

     console.log('Bus Number is :', rows);

   else

     console.log('I wish I knew more about it .But I’ll work on it. In the mean time would you like to head back to the Main Menu?');


"buttons": [{

                        "type": "postback",

                        "title": "Yep!",

                        "payload": We provide you with a host of services.You can access any one of them below!",

   });   
 });
buttons": [{

                        "type": "postback",

                        "title": "Naah!",

                        "payload": Thanks for using SVVV Mbot. We hope we came of any use to you🙂", 

 },

                        "type": "postback",

                        "title": "Menu!",

                          "payload": We provide you with a host of services.You can access  any one of them below!",

},

                        "type": "postback",

                        "title": "Bye",

                          "payload": Have a Great Day {{firstname}}!",

 

}],

             

                    "title": Class schedule and update",

                    "subtitle": "",

                    "image_url": https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiek9ysyaDhAhWbeisKHQubB30QjRx6BAgBEAU&url=https%3A%2F%2Fwww.canva.com%2Ftemplates%2Fclass-schedules%2F&psig=AOvVaw3DfLN9t89jT_6AiCZaqlGi&ust=1553716009954203",

                    "buttons": [{

                        "type": "postback",

                        "title": "Yes Please"

                        “payload”:” Welcome to Class Schedule section.”

                        "payload": “Please select your category ",

 

                             {

                        "type": "postback",

                        "title": "Student"

                          "payload": “Hello, please enter your details in the following format.",

                         "payload": ” Branch Section Semester. Eg- IT C 8th "

                          webHooks.trigger(‘IT B 8th’, { “image_url”:” https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiu_LbtyaHhAhWA4XMBHZu0ADUQjRx6BAgBEAU&url=https%3A%2F%2Fsummerinoxford.com%2Fcourse-         timetable%2F2018-sio-timetable%2F&psig=AOvVaw0jXCfotmupImbc4e9nG9fO&ust=1553750512778222”} )

                         webHooks.trigger(‘IT C 6th’, { “image_url” : ” https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjNn_qpy6HhAhWf6XMBHWLqAYYQjRx6BAgBEAU&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fmy-school-timetable-16355533&psig=AOvVaw0jXCfotmupImbc4e9nG9fO&ust=1553750512778222 ”

} )

                        "type": "postback",

                        "title": "Teacher"

                        "payload": ” Hello and welcome to schedule section of SVVV MBot.Please enter your teacher ID to access your time table. ",

                            }

  }]  

 

             "title": Auditorium Status",

             "subtitle": "Need to know what's going on at the auditorium?",

            "image_url": “https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiiwquhzaHhAhVBKY8KHYOvBREQjRx6BAgBEAU&url=http%3A%2F%2Fwww.svvv.edu.in%2FUserPanel%2FDisplayPage.aspx%3Fpage%3Dcaage%26ItemID%3Dko&psig=AOvVaw3a8IjXuKoDIgDwYyICuzQr&ust=1553751423487233”,

              "buttons": [{

                   "type": "postback",

               "title": "Sure!"

                        “payload”:” So you are intrested in the auditorium. No issues!.”

                         “payload”:” Please provide your email or contact number!.”

            }] 

           “payload”:” Got that,what would you like to know about the auditorium?.”

        } 

     }

  }

    request({

        url: 'https://graph.facebook.com/v2.6/me/messages',

        qs: {access_token:token},

        method: 'POST',

        json: {

            recipient: {id:sender},

            message: messageData,

        }

    }, function(error, response, body) {

        if (error) {

            console.log('Error sending messages: ', error)

        } else if (response.body.error) {

            console.log('Error: ', response.body.error)

        }

    })

}