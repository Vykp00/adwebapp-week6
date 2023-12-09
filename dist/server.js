"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
// add express.json middleware to get req.body
app.use(express_1.default.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Specify host
const port = 3000;
const host = 'localhost';
// Define a GET route for "/"
app.get('/', (req, res) => {
    res.send("Hello World from Typescript - I want cookies");
});
// Define a GET route for "/"
app.get('/hello', (req, res) => {
    res.send("Hello world");
});
// create vehicle list to store vehicle
const vehicleList = [];
// Define a POST route for "/vehicle/add"
app.post('/vehicle/add', (req, res) => {
    try {
        // create new vehicle
        if (req.body.bodyType) {
            // create new Car if bodyType exist
            const newCar = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
                bodyType: req.body.bodyType,
                wheelCount: req.body.wheelCount,
            };
            vehicleList.push(newCar);
        }
        else if (req.body.draft) {
            // create new Boat if draft exist
            const newBoat = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
                draft: req.body.draft,
            };
            vehicleList.push(newBoat);
        }
        else if (req.body.wingspan) {
            // create new Plane if draft exist
            const newPlane = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
                wingspan: req.body.wingspan,
            };
            vehicleList.push(newPlane);
        }
        else {
            // create new Generic one if no optional var exist
            const newVehicle = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
            };
            vehicleList.push(newVehicle);
        }
        // Response with status code and message "Vehicle added"
        console.log(vehicleList);
        res.status(201).send('Vehicle added');
    }
    catch (error) { // Catch error
        console.error('Error adding vehicle to the list:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Define GET route to search for vehicle models
app.get('/vehicle/search/:model', (req, res) => {
    try {
        const modelName = req.params.model;
        // Find the vehicle in the vehicleList based on the model
        const foundVehicle = vehicleList.find((vehicle) => vehicle.model === modelName);
        if (foundVehicle) {
            // If the vehicle is found, response with the vehicle data. 
            // Use let to modify responseVehicle from conditions if else
            let responseVehicle;
            // if foundVehicle has bodyType == Car
            if (foundVehicle.bodyType) {
                // If it's a Car, exclude other property
                responseVehicle = {
                    model: foundVehicle.model,
                    color: foundVehicle.color,
                    year: foundVehicle.year,
                    power: foundVehicle.power,
                    bodyType: foundVehicle.bodyType,
                    wheelCount: foundVehicle.wheelCount,
                };
            }
            else if (foundVehicle.draft) {
                // If it's a Boat
                responseVehicle = {
                    model: foundVehicle.model,
                    color: foundVehicle.color,
                    year: foundVehicle.year,
                    power: foundVehicle.power,
                    draft: foundVehicle.draft,
                };
            }
            else if (foundVehicle.wingspan) {
                // If it's a Plane
                responseVehicle = {
                    model: foundVehicle.model,
                    color: foundVehicle.color,
                    year: foundVehicle.year,
                    power: foundVehicle.power,
                    wingspan: foundVehicle.wingspan
                };
            }
            else {
                // If itäs a Generic vehicle,
                responseVehicle = {
                    model: foundVehicle.model,
                    color: foundVehicle.color,
                    year: foundVehicle.year,
                    power: foundVehicle.power,
                };
                res.status(200).json(foundVehicle);
            }
        }
        else {
            // If the vehicle is not found, send a 404 response
            res.status(404).send('Vehicle is not found');
        }
    }
    catch (error) {
        // Catch Error
        console.error('Error searching for vehicle: ', error);
        res.status(500).send('Internal Server Error');
    }
});
// Start the server
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
