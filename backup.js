// Import dependencies
const express = require("express");
const fs = require('fs')
const rateLimit = require("express-rate-limit");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT;


var SLOT = process.env.SLOT

var slotValue = []
for (let i = 1; i <= SLOT; i++) {
    slotValue.push(`SLOT${i}`)
}

let Parking = []


var map = {};

console.log(slotValue);



const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10, // Limit each IP to 100 requests per windowMs
    message: "Parking Full,",
});

// Apply to all requests
app.use(limiter); // app.use("/api/", limiter);
//body parser, reading data into req.body
app.use(express.json({ limit: "10kb" }));


//  BOOK PARKING
app.post("/book-parking", limiter, function (req, res) {

    const carNo = req.body.carNo
    if (carNo && carNo !== '') {
        Parking.push({ carNo: carNo, slotNo: 6 })
        res.send(`${carNo} Parking Booked at SLOT =`)
    }
    console.log(Parking);

})


// UN-PARKING
app.post("/unpark", limiter, function (req, res) {

    const SlotNo = req.body.slotNo
    const result = Parking.filter(x => x.slotNo == SlotNo)
    if (result.length == 0) {
        res.send(`No Car is Parked in Slot ${SlotNo}`)
    }
    else {
        res.send(`Your Car ${result.map(i => i.carNo)} is Unparked from the Slot ${SlotNo}`)
    }
})


// KNOW YOUR CAR PARKING
app.post("/getCar", limiter, function (req, res) {

    const SlotNo = req.body.slotNo
    const CarNo = req.body.carNo

    if (SlotNo) {
        const result = Parking.filter(x => x.slotNo == SlotNo)
        if (result.length == 0) {
            res.send(`No Car Found with given Slot No`)
        }
        else {
            res.send(`Your Car ${result.map(i => i.carNo)} is Parked at Slot ${SlotNo}`)
        }
    }
    else if (CarNo) {
        const result = Parking.filter(x => x.carNo == CarNo)
        if (result.length == 0) {
            res.send(`No Slot Found with given Car No`)
        }
        else {
            res.send(`Your Car ${CarNo} is Parked at Slot ${result.map(i => i.slotNo)} `)
        }
    }

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));