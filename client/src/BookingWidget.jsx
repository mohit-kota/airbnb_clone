import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from 'date-fns'
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
export default function BookingWidget({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(()=>{
      if(user){
        setName(user.name);
      }
    },user)

    let numberOfDays = 0;
    if(checkIn && checkOut)
    {
      numberOfDays = differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }

    async function bookThisPlace(){
      
      const bookData = { price:numberOfDays*place.price , place:place._id, checkIn, checkOut, numberOfGuests, name, phone}
      // console.log('test')
      
      const response = await axios.post('/booking',bookData);
      const bookingId = response.data._id;
      setRedirect('/account/bookings/'+bookingId);
    }

    if(redirect){
      return <Navigate to={redirect} />
    }

   
    return (
        <div className="bg-white shadow  p-4 rounded-2xl ">
        <div className="text-2xl text-center">
          {" "}
          Price: ${place.price} / per night{" "}
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="   py-3 px-4 ">
              <label>Check in:</label>
              <input type="date" 
              value={checkIn}
              onChange={ev=>setCheckIn(ev.target.value)}/>
            </div>
            <div className=" py-3 px-4 border-l">
              <label>Check out:</label>
              <input type="date"
              value={checkOut}
              onChange={ev=>setCheckOut(ev.target.value)} />
            </div>
          </div>
          <div className=" py-3 px-4 border-t">
              <label>Number of guests</label>
              <input type="number"  value={numberOfGuests}
              onChange={ev=>setNumberOfGuests(ev.target.value)}/>
            </div>
            {numberOfDays>0 && (
              <div className=" py-3 px-4 border-t">
              <label>Your full name:</label>
              <input type="text"  value={name}
              placeholder="John Doe"
              onChange={ev=>setName(ev.target.value)}/>
                <label>Phone Number:</label>
              <input type="tel"  value={phone}
              placeholder="+91.."
              onChange={ev=>setPhone(ev.target.value)}/>
            </div>

            )}
        </div>
        <button onClick={bookThisPlace} className="primary mt-4">Book this place
        {numberOfDays>0 && (
          <>
          <span> ${numberOfDays*place.price}</span>
          </>
        )}
        </button>
      </div>
    )
}