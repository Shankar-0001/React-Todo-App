var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var conStr = "mongodb+srv://Shekhar123:Shekhar123@cluster0.dyoi4ck.mongodb.net";

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


//GET USERS

app.get("/get-users", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("calendardb");
        database.collection("users").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.get("/get-appointments/:userid", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("calandardb");
        database.collection("appointments").find({ UserId: req.params.userid })
            .toArray().then(documents => {
                res.send(documents);
                res.end();
            });
    });
});

//REGISTER USERS

app.post("/register-user", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("calendardb");
        var user = {
            UserId: req.body.UserId,
            UserName: req.body.UserName,
            Password: req.body.Password,
            Email: req.body.Email,
            Mobile: req.body.Mobile
        };
        database.collection("users").insertOne(user).then(() => {
            console.log("User Registered..");
        });
    });
});

//Add Task

app.post("/add-task", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("calendardb");

        var appointment = {
            Appointment_Id: parseInt(req.body.Appointment_Id),
            Title: req.body.Title,
            Description: req.body.Description,
            Date: new Date(req.body.Date),
            UserId: req.body.UserId
        };

        database.collection("appointments").insertOne(appointment).then(() => {
            console.log("Task Added Successfully...");
        });

    });
});


//EDIT/UPDATE
app.put("/edit-task/:id", (req, res) => {
    var id = parseInt(req.params.id);
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("calendardb");

        var appointment = {
            Appointment_Id: parseInt(id),
            Title: req.body.Title,
            Description: req.body.Description,
            Date: new Date(req.body.Date),
            UserId: req.body.UserId
        };

        database.collection("appointments").updateOne({ Appointment_Id: id }, { $set: appointment }).then(() => {
            console.log("Task Updated");
            res.end();
        });


    });
});

//Delete

app.delete("/remove-task/:id", (req, res) => {

    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("calendardb");

        database.collection("appointments").deleteOne({ Appointment_Id: parseInt(req.params.id) })
            .then(() => {
                console.log("Task Deleted..");
                res.end();
            });
    });
});

app.listen(3300);
console.log("Server Started: http://127.0.0.1:3300");