const EventDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:5000/events/${id}`,
  );

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!data) return <p>No event found.</p>;

  return (
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

          <div className="row">
            {data.speakers?.map((speaker) => (
              <div className="col-6" key={speaker._id}>
                <div className="card p-2 text-center">
                  <img
                    src={speaker.imageUrl}
                    alt={speaker.name}
                    className="rounded-circle mx-auto"
                    width="70"
                    height="70"
                  />
                  <strong>{speaker.name}</strong>
                  <small>{speaker.designation}</small>
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-danger w-100 mt-4">RSVP</button>
        </aside>
      </div>
    </main>
  );
};

export default EventDetails;
