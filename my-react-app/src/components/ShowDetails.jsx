

import React, { useState,useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import LocalStorage from "../assets/utils/localStorage";
import '../styles/showDetails.css'

const ShowDetails = () => {
const { id } = useParams();
const [show, setShow] = useState(null);
const [showForm, setShowForm] = useState(false);

useEffect(() => {
  fetch(`https://api.tvmaze.com/shows/${id}`)
    .then((response) => response.json())
    .then((data) => setShow(data));
}, [id]);

const handleBookTicket = () => {
  setShowForm(!showForm);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const userName = e.target.elements.userName.value;
  const userEmail = e.target.elements.userEmail.value;

  // Save user details to local storage
  LocalStorage.setItem("userName", userName);
  LocalStorage.setItem("userEmail", userEmail);

  setShowForm(false);
};

if (!show) {
  return <div>Loading...</div>; // or any loading indicator
}


  return (
    <div className="show-details-container">
      <h1>Show Details</h1>
      <h2>{show.name}</h2>
      <div dangerouslySetInnerHTML={{ __html: show.summary }} />
      <div className="postioning">
        <button onClick={handleBookTicket}>Book Ticket</button>
        <Link to="/" className="backLink">
          Back to Show List
        </Link>
      </div>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <h2>Booking Form</h2>
          <p className="movie-name">Movie Name: {show.name}</p>
          <label htmlFor="userName">Name:</label>
          <input type="text" id="userName" name="userName" required />
          <label htmlFor="userEmail">Email:</label>
          <input type="email" id="userEmail" name="userEmail" required />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ShowDetails;
