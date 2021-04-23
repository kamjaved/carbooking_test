// Import dependencies
const express = require("express");
const rateLimit = require("express-rate-limit");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT;


var SLOT = process.env.SLOT
var parkingSlot = new Map();


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: "Parking Full  from--Limiter,",
});

// Apply to all requests
app.use(limiter);

//body parser, reading data into req.body
app.use(express.json({ limit: "10kb" }));




//  BOOK PARKING
app.post("/book-parking", function (req, res) {
    const carNo = req.body.carNo

    if (carNo && carNo !== '') {

        console.log(parkingSlot.size)
        var count = parkingSlot.size;

        if (count == SLOT) {
            res.send('Parking Full Please Wait');
        }
        else {
            parkingSlot.set(`SLOT${count + 1}`, carNo)
        }

        console.log(parkingSlot);
        res.send(`${carNo} Parking Booked at SLOT${count + 1}`)

    }
})


// UN-PARKING
app.post("/unpark", function (req, res) {

    const SlotNo = req.body.slotNo

    if (parkingSlot.has(SlotNo)) {
        res.send(`Your Car ${parkingSlot.get(SlotNo)} is Unparked from the Slot ${SlotNo}`)
        parkingSlot.delete(SlotNo)
    }

    else {
        res.send(`No Car is Parked in Slot ${SlotNo}`)
    }
    console.log(parkingSlot);
})





function getkeyByValue(obj, val) {
    console.log(val);
    return Object.keys(obj).find(key => obj[key] === val)
}


// KNOW YOUR CAR PARKING
app.post("/getCar", function (req, res) {

    const SlotNo = req.body.slotNo
    const CarNo = req.body.carNo

    if (SlotNo) {

        if (parkingSlot.has(SlotNo)) {
            res.send(`Your Car ${parkingSlot.get(SlotNo)} is parked at ${SlotNo}`)
        }
        else {
            res.send(`No Car is Found in ${SlotNo}`)
        }
    }


    else if (CarNo) {

        // function which return key from value
        let getSlotNo = [...parkingSlot.entries()]
            .filter(({ 1: val }) => val === CarNo)
            .map(([key]) => key);
        const getSlotNoStr = getSlotNo.toString();

        if (parkingSlot.has(getSlotNoStr)) {
            res.send(`Your Car ${CarNo} is parked at ${getSlotNoStr}`)
        }
        else {
            res.send(`No Car with ${CarNo} No. is Parked `)
        }
    }

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));