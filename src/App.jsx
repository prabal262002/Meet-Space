import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import useFetch from "./useFetch";
import {Link} from "react-router-dom";
function App() {
  const [eventType, setEventType] = useState("All Events");
  const { data, loading, error } = useFetch(
    "https://events-backend-taupe.vercel.app/events",
  );
  console.log(data);

  const filteredEvents = data
    ? data.filter((event) => {
        if (eventType === "All Events") return true;
        if (eventType === "Online Event") return event.eventType === "Online";
        if (eventType === "Offline Event") return event.eventType === "Offline";
        return true;
      })
    : [];

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col">
              <h1 className="display-4 mb-0">Meetup Events</h1>
            </div>
            <div className="col-auto">
              <select
                className="form-select"
                style={{ border: "none", backgroundColor: "#f5f5f5" }}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option>Select Event Type</option>
                <option>Online Event</option>
                <option>Offline Event</option>
              </select>
            </div>
          </div>
        </div>

        {loading && <p>Loading events...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        {data && (
          <div className="row g-4">
            {filteredEvents.map((event) => (
              
              <div key={event._id} className="col-md-4"
              onClick={()=>console.log(`Navigating to event details for event ID: ${event._id}`)}
              style={{ cursor: "pointer" }}>
                <Link to={`/events/${event._id}`}>
                <div className="card h-100" style={{ backgroundColor: "#f8f8f8", border: "none" }}>
                  <img
                    src={event.thumbnailUrl}
                    alt={event.title}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <span
                    className="badge bg-info"
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                    }}
                  >
                    {event.eventType}
                  </span>
                  <div className="card-body">
                    <p className="text-muted small">
                      {event.date.toLocaleString()}
                    </p>
                    <h5 className="card-title">{event.title}</h5>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
          
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
