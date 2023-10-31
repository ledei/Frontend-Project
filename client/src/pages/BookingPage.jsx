import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SeatPicker from "../components/SeatPicker";
import TicketSelector from "../components/TicketSelector";
import { Col, Container, Row } from "react-bootstrap";
import '../styling/components/_bookingPage.scss'
import PriceSummary from "../components/PriceSummary";
import useEventSource from "../hooks/useEventSource";
import BookingForm from "../components/BookingPage/BookingForm";

/**
 * @author Oliver Andersson
 * @description Page for chosing tickets, selecting seats and booking a screening
 */

function BookingPage() {
  
  const { screeningId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [sum,setSum] = useState(0)
  const [maxSeats, setMaxSeats] = useState(2);
  const { err, screeningData } = useEventSource("http://localhost:3050/api/movies/screenings/" + screeningId )

  // State variable to control the visibility of BookingForm
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({tickets: []})

  // Keys are the Ticket_Type_id and the values are how many tickets are chosen for that ticket type 
  const [tickets, setTickets] = useState({
    1: 0,
    2: 0,
    3: 2
  });

  function addOneSeat(seat) {
    if(selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((x) => x !== seat))
    } else {

      if (selectedSeats.length >= maxSeats) {
        const updatedSeats = selectedSeats.slice(1);
        setSelectedSeats([...updatedSeats, seat]);
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  }

  function addSeveralSeats(seats) {
    setSelectedSeats(seats);
  }

  // Runs when + or - in ticketSelector gets pressed
  function handleTicketChange(action, type) {
    let newTickets = tickets;
    let ticketCount = 0;

    if(action == "+") {
      newTickets = {...tickets, [type]: tickets[type] + 1}
    } else if (action === "-" && tickets[type] > 0) {
      newTickets = {...tickets, [type]: tickets[type] - 1}
    }

    for (const [key, value] of Object.entries(newTickets)) {
      ticketCount += value;
    }

    setTickets(newTickets)
    setMaxSeats(ticketCount)
    setSelectedSeats([])
  }

  // Runs when "book" button gets pressed
  function handleBookingClick() {

    // Put ticket and seat data into correct structure for post request
    for (const [key, value] of Object.entries(tickets)) {
      for (let i = 0; i < value; i++) {
        if (selectedSeats[i] === undefined) return
    
        bookingInfo.tickets.push({
          Screening_id: screeningId,
          Ticket_Type_id: key,
          Seat_id: selectedSeats[i].Seat_id
        })
      } 
    }
    setShowBookingForm(true);
  }


  return (
    <Container fluid className="booking-page-wrapper p-4">
    {showBookingForm ? (
      <BookingForm bookingInfo={bookingInfo} sum={sum} />
    ) : (
      <>
        <PriceSummary {...{ handleBookingClick, tickets, setSum, sum }} />
        <h5 className="line pb-1">Välj antal biljetter</h5>
        <TicketSelector {...{ tickets, handleTicketChange }} />
        <h5 className="line pb-1">Välj platser</h5>
        {err && <p>err</p> || <SeatPicker {...{ screeningData, addOneSeat, addSeveralSeats, selectedSeats, maxSeats }} />}
      </>
    )}
    </Container>
  )
}

export default BookingPage;