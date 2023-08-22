const port = 3000;

// login credentials
const username = "admin";
const password = "admin";

// modules
import express from 'express';
import ejs from 'ejs';

// other imports
import Entry from './models/tableDataModel.js'
import DB from './classes/database.js';
import CurrentTime from './classes/dateTimeHelper.js';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));  // for parsing form data, replaces body-parser

// Creating bike object to work with
app.get('/newBike', (req, res) => {
    res.render('newBike');
});
app.post('/newBike', (req, res) => {
    const bikeMake =  req.body.bikeMake;
    const bkeModel =  req.body.bkeModel;
    const bikeYear =  req.body.bikeYear;
    let newBike = null;

    let SQLstring = `INSERT INTO bike (bike_make, bike_model, bike_year) VALUES ('${bikeMake}', '${bkeModel}', '${bikeYear}')`;

    res.render('index', {
        bikeData: newBike,
        tableData: []
    });
});

// selecting the bike
app.get('/selectBike', (req, res) => {
    let SQLstring = "SELECT * FROM bike";

    res.render('selectBike', {
        bikes: bikes
    });
});
app.post('/selectBike', (req, res) => {
    // take the bike id and use it to get its seasons, parse them to next page
    const bikeID = req.body.bikeID;
    let bikeName = null;

    let seasons = [];
    seasons.push({ seasonId: "10", seasonName: "2021", bikeId: 0 });
    seasons.push({ seasonId: "11", seasonName: "2020", bikeId: 1 });
    seasons.push({ seasonId: "12", seasonName: "2019", bikeId: 2 });
    seasons.push({ seasonId: "13", seasonName: "2018", bikeId: 3 });

    let bikes = [];
    bikes.push({ name: "Trek", model: "4300", year: 2009, id: 0 });
    bikes.push({ name: "Scott", model: "Aspect 902", year: 2013, id: 1 });
    bikes.push({ name: "Cannondale", model: "4300", year: 2020, id: 2 });
    bikes.push({ name: "Ortleib", model: "4300", year: 2019, id: 3 });

    bikes.forEach(element => {
        if(element.id == bikeID){
            bikeName = element.name + " " + element.model + " " + element.year;
        }
    });

    res.render('selectSeason', {
        seasons: seasons,
        bikeName: bikeName
    });
});

// selecting the bike's season
app.post('/selectSeason', (req, res) => {
    // take the bike and season id and choose the season table

});

// adding data to season 
app.get('/addDataToSeason', (req, res) => {
    res.render('addData');
});
app.post('/postData', (req, res) => {
    // rewrite date so that it would be uniform like 02.02.2003, not 2.2.2003
    const d = new Date(req.body.date);
    let date = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
    let odo = req.body.odo;
    let work = req.body.work;
    let cost = req.body.cost;
    let time = req.body.time;
    let next = req.body.next;

    res.render('index', {
        data1: {
            season: "2021",
            make: "Trek",
            model: "4300",
            releaseDate: 2009,
            mileage: 25000
        },
        tableData: []
    });
});

// login and logout for wep app
app.post('/login', (req, res) => {
    // refactor this so that it would use proper checking mechanism check for credentials
    if(req.body.password == password && req.body.username == username){

        let bike = [];

        res.render('index', {
            bikeData: bike,
            tableData: []
        });      
    } else {
        res.redirect('/');
    }  
});
app.post('/logout', (req, res) => {
    res.redirect('/');
});

// redirect to homepage
app.post('/homepage', (req, res) => {

    let bike = [];
    res.render('index', {
        bikeData: bike,
        tableData: []
    });
});

// intro
app.get('/', (req, res) => {  
    res.render('login', {correctCredentials: true});
});

app.listen(port, () => {
    console.log(`${CurrentTime} - Server is running on port: ${port}\n`);

    // Setup database if it does not exist and connect to it

    // Checks if the tables have been made before in database, if not, then creates them
    /*DB.SerializeQuery([
        "CREATE TABLE [IF NOT EXISTS] bike ( bike_id INTEGER PRIMARY KEY NOT NULL UNIQUE, bike_make TEXT, bike_model TEXT, bike_year INGETER, bike_odo INTEGER ) [WITHOUT ROWID]",
        "CREATE TABLE [IF NOT EXISTS] season ( bike_id INTEGER, season_id INTEGER PRIMARY KEY, season_name TEXT ) [WITHOUT ROWID]",
        "CREATE TABLE [IF NOT EXISTS] season_data ( bike_id INTEGER, season_id INTEGER, date TEXT, odometer INTEGER, work_done TEXT, cost REAL, time_spent INTEGER, next_work TEXT) [WITHOUT ROWID]"
    ]);*/
});