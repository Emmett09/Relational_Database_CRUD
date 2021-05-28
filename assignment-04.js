//taken from CS230 examples and modified to add the extra functionality

// Load the NodeJS modules required

var http = require("http"); // creating an API using http
var url = require("url"); // using url to extract the route (e.g. /, /api/user)
var querystring = require("querystring"); // this will contain the body of the POST request
var fs = require("fs"); // file handling to read the index.html served for / route
var port = 8000; // port the server with listen on

var server = http.createServer(); // create the server

//
// This is the new section that manages a relational (mysql) database connection
//
var mysql = require("mysql");
// credentials for my database on phpmyadmin
var con = mysql.createConnection({
    host: "webcourse.cs.nuim.ie",
    user: "p210160",
    password: "oPo5eich2ahtiNuM",
    database: "cs230_p210160",
});


// forms the connection - re-used later
con.connect(function (err) {
    if (err) throw err;
    console.log("Database (cs230_p210160): Connected!");
});

// watch for Ctrl-C and then close database connection!
process.on("SIGINT", function () {
    con.end(function (err) {
        if (err) {
            return console.log("error:" + err.message);
        }
        console.log("\nDatabase (cs230_p210160): Disconnected!");
        process.exit();
    });
});

// listen for requests from clients
server.on("request", function (request, response) {
    var currentRoute = url.format(request.url); // get the route (/ or /api/user)
    var currentMethod = request.method; // get the HTTP request type (POST - Create; GET - Retrieve)
    var requestBody = ""; // will contain the extracted POST data later

    // determine the route (/ or /api/user)
    switch (currentRoute) {
        //
        // If no API call made then the default route is / so
        // just return the default index.html file to the user.
        // This contains the forms, etc. for making the CRUD
        // requests
        //
        case "/":
            fs.readFile(__dirname + "/index.html", function (err, data) {
                // get the file and add to data
                var headers = {
                    // set the appropriate headers
                    "Content-Type": "text/html",
                };
                response.writeHead(200, headers);
                response.end(data); // return the data (index.html)
            }); // as part of the response

            break;

        //
        // Handle the requests from client made using the route /api/user
        // These come via AJAX embedded in the earlier served index.html
        // There will be a single route (/api/user) but two HTTP request methods
        // POST (for Create) and GET (for Retrieve)
        //
        //previous attempt at delete function not being used, kept for my own reference, logic from stackoverflow
        /*case "/api/deleteUser":
            console.log("string");
            if (currentMethod === "DELETE") {
                console.log("here");
                // read the body of the POST request
                request.on("data", function (chunk) {
                    requestBody = chunk.toString();
                });

                // determine the POST request Content-type (and log to console)
                // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
                const { headers } = request;
                let ctype = headers["content-type"];
                console.log("RECEIVED Content-Type: " + ctype + "\n");

                // finished reading the body of the request
                request.on("end", function () {
                    var userData = "";
                    // saving the user from the body to the database
                    if (ctype.match(new RegExp("^application/x-www-form-urlencoded"))) {
                        userData = querystring.parse(requestBody);
                    } else {
                        userData = JSON.parse(requestBody);
                    }
                    // log the user data to console
                    console.log(
                        "USER DATA RECEIVED: \n\n" +
                        JSON.stringify(userData, null, 2) +
                        "\n"
                    );
                    // we have the data supplied so make the database connection and
                    // the (unvalidated) data. Without validation we just hope everything
                    // works out okay - for production we would need to perform validation
                    var sql = "DELETE FROM USERS ORDER BY Customer_ID DESC LIMIT 1";
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(
                            `USER RECORD INSERTED: ['${userData.title}','${userData.firstname}','${userData.surname}','${userData.mobile}','${userData.email}']\n`
                        );
                        // respond to the user with confirmation message
                        var headers = {
                            "Content-Type": "text/plain",
                        };
                        // handle the responses here after the database query completes!
                        response.writeHead(200, headers);
                        response.end(
                            "User (" +
                            userData.firstname +
                            " " +
                            userData.surname +
                            ") data added to the Database!"
                        );
                    });
                });
            }*/
            //delete and update taken from mozilla docs and the logic worked into the CS230 CREATE examples
            //https://developer.mozilla.org/en-US/docs/Glossary/CRUD
            //https://developer.mozilla.org/en-US/docs/Glossary/SQL_Injection
            // and this video https://www.youtube.com/watch?v=4fWWn2Pe2Mk
        case "/api/deleteUser":
            console.log("string");
            if (currentMethod === "POST") {
                var sql = "DELETE FROM USERS ORDER BY Customer_ID DESC LIMIT 1";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                });
            }
            break;

            //followed logic employed for DELETE
        case "/api/updateUser":
            console.log("string");
            if (currentMethod === "POST") {
                var sql = "UPDATE USERS SET Title = 'Dr', Mobile = '0874125874', Email = 'drluser@gmail.ie' WHERE Customer_ID = (SELECT Customer_ID FROM USERS ORDER BY Customer_ID DESC LIMIT 1)";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                });
                sql = "UPDATE Home_Address SET Eircode = 'FF11KKII' WHERE Home_Address_ID = (SELECT Home_Address_ID FROM Home_Address ORDER BY Home_Address_ID DESC LIMIT 1)";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");
                });
                sql = "UPDATE Shipping_Address SET Eircode = 'FF11KKII' WHERE Ship_Address_ID = (SELECT Ship_Address_ID FROM Shipping_Address ORDER BY Ship_Address_ID DESC LIMIT 1)";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");
                });
            }
            break;

        case "/api/user":
            // Handle a POST request;  the user is sending user data via AJAX!
            // This is the CRUD (C)reate request. These data need to be
            // extracted from the POST request and saved to the database!



            if (currentMethod === "POST") {
                // read the body of the POST request
                request.on("data", function (chunk) {
                    requestBody = chunk.toString();
                });

                // determine the POST request Content-type (and log to console)
                // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
                const { headers } = request;
                let ctype = headers["content-type"];
                console.log("RECEIVED Content-Type: " + ctype + "\n");

                // finished reading the body of the request
                request.on("end", function () {
                    var userData = "";
                    // saving the user from the body to the database
                    if (ctype.match(new RegExp("^application/x-www-form-urlencoded"))) {
                        userData = querystring.parse(requestBody);
                    } else {
                        userData = JSON.parse(requestBody);
                    }
                    // log the user data to console
                    console.log(
                        "USER DATA RECEIVED: \n\n" +
                        JSON.stringify(userData, null, 2) +
                        "\n"
                    );
                    // we have the data supplied so make the database connection and
                    // the (unvalidated) data. Without validation we just hope everything
                    // works out okay - for production we would need to perform validation
                    var sql = `INSERT INTO USERS (Title, FName, LName, Mobile, Email) VALUES ('${userData.title}','${userData.firstname}','${userData.surname}','${userData.mobile}','${userData.email}')`;
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(
                            `USER RECORD INSERTED: ['${userData.title}','${userData.firstname}','${userData.surname}','${userData.mobile}','${userData.email}']\n`
                        );
                        // respond to the user with confirmation message
                        var headers = {
                            "Content-Type": "text/plain",
                        };
                        // handle the responses here after the database query completes!
                        response.writeHead(200, headers);
                        response.end(
                            "User (" +
                            userData.firstname +
                            " " +
                            userData.surname +
                            ") data added to the Database!"
                        );
                    });
                });
            }

        // Handle the requests from client made using the route /api/user
        // These come via AJAX embedded in the earlier served index.html
        // There will be a single route (/api/user) but two HTTP request methods
        // POST (for Create) and GET (for Retrieve)
        //
        //case "/api/home":
            // Handle a POST request;  the user is sending user data via AJAX!
            // This is the CRUD (C)reate request. These data need to be
            // extracted from the POST request and saved to the database!


                // Handle a GET request;  the user is requesting user data via AJAX!
                // This is the CRUD (R)etrieve request. These data need to be
            // extracted from the database and returned to the user as JSON!
            else if (currentMethod === "GET") {
                var headers = {
                    "Content-Type": "application/json",
                };
                // make the database query using the connection created earlier
                con.query(
                    "SELECT Title, FName, LName, Mobile, Email FROM USERS",
                    function (err, result, fields) {
                        if (err) throw err;
                        //output details to the console
                        console.log(
                            "USER DATABASE REQUESTED: \n\n" +
                            JSON.stringify(result, null, 2) +
                            "\n"
                        );
                        // notice we include the processing in here so that is processed as part
                        // of the callback - if it is outside this function then it could progress
                        // before the data are returned from the database.
                        response.writeHead(200, headers); // return headers for everything okay!
                        response.end(JSON.stringify(result)); // return unprocessed result from SQL Query
                    }
                );
            }
            break;

            //reiterated logic used to get USERS table
        case "/api/homeaddress":
            if (currentMethod === "POST") {
                // read the body of the POST request
                request.on("data", function (chunk) {
                    requestBody = chunk.toString();
                });

                // determine the POST request Content-type (and log to console)
                // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
                const { headers } = request;
                let ctype = headers["content-type"];
                console.log("RECEIVED Content-Type: " + ctype + "\n");

                // finished reading the body of the request
                request.on("end", function () {
                    var homeData = "";
                    // saving the user from the body to the database
                    if (ctype.match(new RegExp("^application/x-www-form-urlencoded"))) {
                        homeData = querystring.parse(requestBody);
                    } else {
                        homeData = JSON.parse(requestBody);
                    }
                    // log the user data to console
                    console.log(
                        "USER DATA RECEIVED: \n\n" +
                        JSON.stringify(homeData, null, 2) +
                        "\n"
                    );
                    // we have the data supplied so make the database connection and
                    // the (unvalidated) data. Without validation we just hope everything
                    // works out okay - for production we would need to perform validation
                    var sql = `INSERT INTO Home_Address (Line1, Line2, Town, County, Eircode) VALUES ('${homeData.line1}','${homeData.line2}','${homeData.town}','${homeData.county}','${homeData.eircode}')`;
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(
                            `USER RECORD INSERTED: ['${homeData.line1}','${homeData.line2}','${homeData.town}','${homeData.county}','${homeData.eircode}']\n`
                        );
                        // respond to the user with confirmation message
                        var headers = {
                            "Content-Type": "text/plain",
                        };
                        // handle the responses here after the database query completes!
                        response.writeHead(200, headers);
                        response.end(
                            "Address at (" +
                            homeData.line1 +
                            " " +
                            homeData.line2 +
                            ") data added to the Database!"
                        );
                    });
                });
            }
            else if (currentMethod === "GET") {
                var headers = {
                    "Content-Type": "application/json",
                };
                // make the database query using the connection created earlier
                con.query(
                    "SELECT Line1, Line2, Town, County, Eircode FROM Home_Address",
                    function (err, result, fields) {
                        if (err) throw err;
                        //output details to the console
                        console.log(
                            "Home DATABASE REQUESTED: \n\n" +
                            JSON.stringify(result, null, 2) +
                            "\n"
                        );
                        // notice we include the processing in here so that is processed as part
                        // of the callback - if it is outside this function then it could progress
                        // before the data are returned from the database.
                        response.writeHead(200, headers); // return headers for everything okay!
                        response.end(JSON.stringify(result)); // return unprocessed result from SQL Query
                    }
                );
            }
            break;

            //again reiterated logic from previous GET functions
        case "/api/shippingaddress":
            if (currentMethod === "POST") {
                // read the body of the POST request
                request.on("data", function (chunk) {
                    requestBody = chunk.toString();
                });

                // determine the POST request Content-type (and log to console)
                // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
                const { headers } = request;
                let ctype = headers["content-type"];
                console.log("RECEIVED Content-Type: " + ctype + "\n");

                // finished reading the body of the request
                request.on("end", function () {
                    var shipData = "";
                    // saving the user from the body to the database
                    if (ctype.match(new RegExp("^application/x-www-form-urlencoded"))) {
                        shipData = querystring.parse(requestBody);
                    } else {
                        shipData = JSON.parse(requestBody);
                    }
                    // log the user data to console
                    console.log(
                        "USER DATA RECEIVED: \n\n" +
                        JSON.stringify(shipData, null, 2) +
                        "\n"
                    );
                    // we have the data supplied so make the database connection and
                    // the (unvalidated) data. Without validation we just hope everything
                    // works out okay - for production we would need to perform validation
                    var sql = `INSERT INTO Shipping_Address (Line1, Line2, Town, County, Eircode) VALUES ('${shipData.sline1}','${shipData.sline2}','${shipData.stown}','${shipData.scounty}','${shipData.seircode}')`;
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(
                            `USER RECORD INSERTED: ['${shipData.sline1}','${shipData.sline2}','${shipData.stown}','${shipData.scounty}','${shipData.seircode}']\n`
                        );
                        // respond to the user with confirmation message
                        var headers = {
                            "Content-Type": "text/plain",
                        };
                        // handle the responses here after the database query completes!
                        response.writeHead(200, headers);
                        response.end(
                            "Address at (" +
                            shipData.sline1 +
                            " " +
                            shipData.sline2 +
                            ") data added to the Database!"
                        );
                    });
                });
            }
            else if (currentMethod === "GET") {
                var headers = {
                    "Content-Type": "application/json",
                };
                // make the database query using the connection created earlier
                con.query(
                    "SELECT Line1, Line2, Town, County, Eircode FROM Shipping_Address",
                    function (err, result, fields) {
                        if (err) throw err;
                        //output details to the console
                        console.log(
                            "Home DATABASE REQUESTED: \n\n" +
                            JSON.stringify(result, null, 2) +
                            "\n"
                        );
                        // notice we include the processing in here so that is processed as part
                        // of the callback - if it is outside this function then it could progress
                        // before the data are returned from the database.
                        response.writeHead(200, headers); // return headers for everything okay!
                        response.end(JSON.stringify(result)); // return unprocessed result from SQL Query
                    }
                );
            }
            break;
    }


});

// Set up the HTTP server and listen on port 8000
server.listen(port, function () {
    console.log("\nAJAX - API - Database Demo");
    console.log("CS230 - Emmett Mulroy\nAssignment 4\n");
    console.log("AJAX (HTTP) API server running on port: " + port + "\n");
});