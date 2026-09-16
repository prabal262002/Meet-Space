import Header from "./Header";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
const EventDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `https://events-backend-taupe.vercel.app/events/${id}`,
  );

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!data) return <p>No event found.</p>;

  return (
    <>
    <Header></Header>
    <main className="container py-4">
      <h1>{data.title}</h1>

      <div className="row mt-4">
        <section className="col-md-7">
          <p>Hosted by:</p>
          <strong>{data.topic}</strong>

          <img
            src={data.thumbnailUrl}
            alt={data.title}
            className="img-fluid mt-4"
          />

          <h2 className="mt-4">Details:</h2>
          <p>{data.description}</p>

          <h2>Additional Information:</h2>
          <p>
            <strong>Dress Code:</strong>{" "}
            {data.additionalInfo?.dressCode || "Not specified"}
          </p>
          <p>
            <strong>Age Restrictions:</strong>{" "}
            {data.additionalInfo?.ageRestrictions || "Not specified"}
          </p>

          <h2>Event Tags:</h2>
          {data.tags?.map((tag) => (
            <span className="badge bg-danger me-2" key={tag}>
              {tag}
            </span>
          ))}
        </section>

        <aside className="col-md-5">
          <div className="card p-4">
            <p>
              {new Date(data.date).toLocaleDateString()} at{" "}
              {data.sessionTimings}
            </p>
            <p>{data.venue?.name}</p>
            <p>{data.venue?.address}</p>
            <p>₹ {data.price}</p>
          </div>

          <h2 className="mt-4">Speakers: ({data.speakers?.length || 0})</h2>

          <div className="speaker-list mt-3">
            {data.speakers?.length ? (
              data.speakers.map((speaker) => (
                <div key={speaker.name} className="speaker-item d-flex align-items-center mb-3">
                  <img
                    src={speaker.imageUrl || "https://via.placeholder.com/60?text=Speaker"}
                    alt={speaker.name}
                    className="speaker-avatar"
                  />
                  <div className="ms-3 text-start">
                    <div className="fw-semibold text-dark">{speaker.name}</div>
                    <small className="text-muted">{speaker.designation}</small>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted mb-0">No speakers listed.</p>
            )}
          </div>
        </aside>
      </div>
    </main>
    </>
  );
};

export default EventDetails;
