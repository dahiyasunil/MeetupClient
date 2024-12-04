import { Link } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";
import { Header } from "../components/Header.jsx";
import { useEvents } from "../hooks/useEvents.jsx";
import { formatDateToIST } from "../utils/dateUtils.js";
import { transformCloudinaryUrl } from "../utils/transformCloudinaryImg.js";
import { FilterEvents } from "../components/FilterEvents.jsx";
import { useState, useEffect } from "react";

export const Events = () => {
  const serverURL = import.meta.env.VITE_APP_SERVER;
  const [eventsData, setEventsData] = useState();

  const {
    data,
    loading,
    error,
    fetchData: refetchData,
  } = useEvents(serverURL + `/events`);

  useEffect(() => {
    if (data) {
      setEventsData(data);
    }
  }, [data]);

  const handleFilterChange = (filteredData) => {
    setEventsData(filteredData);
  };

  const handleSearchEvent = (filteredData) => {
    setEventsData(filteredData);
  };

  const eventDate = (dateTime) => {
    const { formattedDate: date, formattedTime: time } =
      formatDateToIST(dateTime);
    return (
      <span>
        {date}
        <span className="fs-5"> &middot; </span>
        {time}
        {` IST`}
      </span>
    );
  };

  const eventDetails = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center mt-5 pt-5">
          <div
            className="spinner-border text-secondary"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-danger text-center">
          <p>{error}</p>
        </div>
      );
    }

    return (
      <div>
        <div className="row row-cols-lg-3 row-cols-2 g-4">
          {eventsData?.map((event) => (
            <div className="col py-2 px-4" key={event._id}>
              <Link
                to={`/eventDetails/${event._id}`}
                className="btn btn-sm btn-outline-warning border-0 rounded-3"
              >
                <div className="card text-bg-light border-0 d-flex flex-column">
                  <img
                    src={transformCloudinaryUrl(
                      event.eventImage,
                      "700",
                      "16:9",
                      "fill",
                      "auto",
                      "good",
                      "90"
                    )}
                    className="card-img-top rounded-2"
                    alt={event.title || `Event Image`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <span className="text-secondary">
                    <small>{eventDate(event.dateDetails.startDateTime)}</small>
                  </span>
                  <h5 className="card-title">{event.title}</h5>
                  <div className="card-img-overlay">
                    <div className="d-flex justify-content-start">
                      <span className="badge text-bg-light p-2 fw-light">
                        {event.type !== `Both` ? event.type : `Online/Offline`}
                        {` Event`}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <body className="bg-light">
      <Header
        events={data}
        onEventSearchHandle={handleSearchEvent}
        showSearch={true}
      />
      <main className="container">
        <section>
          <div className="row">
            <div className="col-12 d-flex justify-content-center justify-content-lg-between align-items-center flex-column flex-lg-row">
              <h1 className="display-5 fw-semibold text-center text-lg-left">
                Meetup Events
              </h1>
              <FilterEvents events={data} onFilterChange={handleFilterChange} />
            </div>
          </div>
        </section>
        <section className="pt-5">{eventDetails()}</section>
      </main>
      <Footer />
    </body>
  );
};
