import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar"; // Import the new Navbar component
import "./Events.css";
import { Link } from "react-router-dom";
import UserProfileModel from "./UserProfileModel";

function Events() {
  const [events, setEvents] = useState([]);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [user, setUser] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const Events = () => {
    return (
      <div>
        <Navbar /> {/* Use the same Navbar here */}
        <div className="events">
          {/* Events Page Content */}
        </div>
      </div>
    );
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEvents();
  }, []);

  const openUserProfileModal = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    setShowUserProfileModal(true);
  };

  const closeUserProfileModal = () => {
    setShowUserProfileModal(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const fetchEvents = async () => {
    try {
      const response = await fetch("https://ticket-a8ez.onrender.com/event/all", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        // 15 events with relevant public images
        const sampleEvents = [
          {
            _id: "1",
            name: "Tech Conference 2025",
            date: "2025-06-15",
            image: "https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg",
            description: "Join industry experts discussing the latest trends in technology.",
          },
          {
            _id: "2",
            name: "Music Fest 2025",
            date: "2025-07-20",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            description: "A spectacular music festival featuring top artists from around the world.",
          },
          {
            _id: "3",
            name: "Food Carnival",
            date: "2025-08-10",
            image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
            description: "Taste delicious cuisines from different cultures in one place.",
          },
          {
            _id: "4",
            name: "Startup Meetup",
            date: "2025-09-05",
            image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
            description: "Network with entrepreneurs and investors to share innovative ideas.",
          },
          {
            _id: "5",
            name: "Sports Championship",
            date: "2025-10-12",
            image: "https://images.pexels.com/photos/945471/pexels-photo-945471.jpeg",
            description: "Watch thrilling matches and cheer for your favorite teams.",
          },
          {
            _id: "6",
            name: "Art Exhibition",
            date: "2025-11-25",
            image: "https://images.pexels.com/photos/1293126/pexels-photo-1293126.jpeg",
            description: "Explore stunning artworks and interact with talented artists.",
          },
          {
            _id: "7",
            name: "Coding Hackathon",
            date: "2025-12-10",
            image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
            description: "Compete with the best developers to solve challenging problems.",
          },
          {
            _id: "8",
            name: "Gaming Tournament",
            date: "2026-01-15",
            image: "https://images.pexels.com/photos/7862518/pexels-photo-7862518.jpeg",
            description: "Battle it out in a high-stakes gaming competition.",
          },
          {
            _id: "9",
            name: "Fashion Show 2025",
            date: "2025-09-22",
            image: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg",
            description: "Witness stunning fashion trends by top designers worldwide.",
          },
          {
            _id: "10",
            name: "Comedy Night",
            date: "2025-07-15",
            image: "https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg",
            description: "Laugh out loud with famous stand-up comedians.",
          },
          {
            _id: "11",
            name: "Health & Wellness Expo",
            date: "2025-05-28",
            image: "https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg",
            description: "Explore the latest in fitness, wellness, and mental health.",
          },
          {
            _id: "12",
            name: "Car Show 2025",
            date: "2025-06-30",
            image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
            description: "Showcasing the most luxurious and powerful cars of the year.",
          },
          {
            _id: "13",
            name: "Photography Workshop",
            date: "2025-08-05",
            image: "https://images.pexels.com/photos/752525/pexels-photo-752525.jpeg",
            description: "Learn photography techniques from professionals.",
          },
          {
            _id: "14",
            name: "Science Fair",
            date: "2025-10-20",
            image: "https://images.pexels.com/photos/3735769/pexels-photo-3735769.jpeg",
            description: "Innovative projects and experiments from students and researchers.",
          },
          {
            _id: "15",
            name: "Film Festival",
            date: "2025-11-18",
            image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg",
            description: "Celebrate cinematic excellence with screenings and discussions.",
          },
        ];

        setEvents(sampleEvents);
      } else {
        console.error("Failed to fetch events.");
      }
    } catch (error) {
      console.error("Error during fetchEvents:", error);
    }
  };

  return (
    <div className="events">
      {/* Navbar */}
      <nav className="navbar">
        <div className="left">
          <Link to={"/dashboard"}>
          <img src="https://assets.reviews.omr.com/s2wg6gmpurzbf4z5jks6kgplpw3i" alt="Logo" className="logo" />

          </Link>
        </div>
        <div className="right">
          <button className="profile-btn" onClick={toggleDropdown}>Profile ▼</button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={openUserProfileModal}>View Profile</button>
              <button onClick={() => localStorage.clear()}>Logout</button>
            </div>
          )}
        </div>
      </nav>

      {/* Events Section */}
      <div className="events-container">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <img src={event.image} alt={event.name} className="event-image" />
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>Date: {formatDate(event.date)}</p>
              <button onClick={() => alert(`Booked: ${event.name}`)}>Book Now</button>
            </div>
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>

      {showUserProfileModal && <UserProfileModel user={user} onClose={closeUserProfileModal} />}
    </div>
  );
}

export default Events;
