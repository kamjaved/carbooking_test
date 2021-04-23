
//-----TO START PROJECT------

STEP-1:   fist run command   npm i

STEP-2:   create a .env file if not avilable in code and paste the below value

          PORT=5000
          SLOT=5

STEP-3:  run command npm run start  

THE SERVER WILL START AT PORT 5000



         //---------MAKE PARKING REQUEST-----------

for book a car parking "http://localhost:5000/book-parking" use this route 
 and inside JSON Content make request like below:-

 {
      "carNo":"WB6677" 
 }

 then a response will show with the alloted parking slot no.
 "WB6677 Parking Booked at SLOT1"


         //---------MAKE UNPARKING REQUEST-----------

for book a car parking "http://localhost:5000/unpark" use this route 
 and inside JSON Content make request like below:-

{
    "slotNo":"SLOT1"
}

 then a response will show with the alloted parking slot no.
 "Your Car WB6678 is Unparked from the Slot SLOT1"


         //---------KNOW YOUR CARS POSITION-----------

for knowing your car position with SLOTNO or CARNO "http://localhost:5000/getCar" use this route 

 and inside JSON Content make request like below:-


      // by using slotNo
            {
              "slotNo":"SLOT1"        
            }
      // OR by using carNo
            {
              "carNo":"WB6677"
            }

 then a response will show with the alloted parking slot no.
 "Your Car WB6677 is parked at SLOT1"



