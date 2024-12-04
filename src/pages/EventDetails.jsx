import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { formatDateToIST } from "../utils/dateUtils.js";
import useRandomUser from "../hooks/useRandomUser.jsx";
import { transformCloudinaryUrl } from "../utils/transformCloudinaryImg.js";

export const EventDetails = () => {
  const serverURL = import.meta.env.VITE_APP_SERVER;
  const randomUserApi = import.meta.env.VITE_APP_RANDOMUSER;
  const [isLoaded, setIsLoaded] = useState(false);

  const params = useParams();
  const eventId = params.eventId;

  const {
    data: eventDetails,
    loading,
    error,
    fetchData,
  } = useEvents(serverURL + `/events/eventDetails/${eventId}`);

  const { speakersData, speakersDataLoading, speakersDataError } =
    useRandomUser(randomUserApi + `/?results=5&inc=name,picture`);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const eventDates = (dateTime) => {
    const { formattedDate: date, formattedTime: time } =
      formatDateToIST(dateTime);

    return `${date} at ${time}`;
  };

  const getSpeaker = (speakers) => {
    if (speakersDataLoading) {
      return (
        <div className="d-flex justify-content-center mt-5 pt-5">
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (speakersDataError) {
      return (
        <div className="d-flex align-items-center">
          <i className="bi bi-exclamation-triangle"></i>
          <p className="ms-3 pt-3">
            <small>Unable to load speaker details at the moment.</small>
          </p>
        </div>
      );
    }

    return (
      <div className="d-flex flex-column flex-lg-row">
        {speakers.map((speaker, index) => (
          <div
            className="flex-grow-1 p-2"
            style={{ maxWidth: "50%" }}
            key={index}
          >
            <div className="bg-white rounded-2 pt-3">
              <div className="text-center">
                <img
                  src={speakersData[index].picture.large}
                  alt={`${speakersData[index].name.first} ${speakersData[index].name.last}`}
                  className="rounded-circle"
                  style={{ maxWidth: "80px" }}
                />
                <p className="m-0">
                  <span>
                    <small>{`${speakersData[index].name.first} ${speakersData[index].name.last}`}</small>
                  </span>
                  <br />
                  <span>
                    <small>{speaker.designation}</small>
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const speakerDetails = (speakers) => {
    return (
      <div className="mt-5">
        <h5>Speakers: ({speakers.length})</h5>
        {getSpeaker(speakers)}
      </div>
    );
  };

  const displayEventDetails = () => {
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
      <>
        {eventDetails && (
          <div className="d-flex flex-column flex-lg-row justify-content-lg-between mx-4">
            <section className="flex-grow-1 p-3" style={{ maxWidth: "70%" }}>
              <h2>{eventDetails.title}</h2>
              <div className="mt-4">
                <p>
                  <small>Hosted By:</small>
                  <br />
                  <span className="fw-semibold">{eventDetails.hostedBy}</span>
                </p>
              </div>
              <div className="mt-4">
                {!isLoaded && (
                  <div className="placeholder-glow rounded-2">
                    <div
                      className="placeholder"
                      style={{
                        maxWidth: "700px",
                        height: "400px",
                        width: "100%",
                        backgroundColor: "#e9ecef",
                      }}
                    ></div>
                  </div>
                )}
                <img
                  src={transformCloudinaryUrl(
                    eventDetails.eventImage,
                    "1000",
                    "16:9",
                    "fill",
                    "auto",
                    "good",
                    "90"
                  )}
                  onLoad={handleImageLoad}
                  className="card-img-top rounded-2 img-fluid"
                  alt={eventDetails.title || `Event Image`}
                  style={{
                    display: isLoaded ? "block" : "none",
                    maxWidth: "700px",
                    minWidth: "300px",
                  }}
                />
              </div>
              <div className="mt-4">
                <h3>Details:</h3>
                <p className="">{eventDetails.eventDetails}</p>
              </div>
              {/* // todo: Add additional info section */}
              {eventDetails.tags && eventDetails.tags.length > 0 && (
                <div className="mt-4">
                  <h3>Event tags:</h3>
                  {eventDetails.tags.map((tag, index) => (
                    <span
                      className="badge px-2 py-1 me-2 bg-danger"
                      key={index}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </section>

            <section className="flex-grow-1 p-3" style={{ minWidth: "30%" }}>
              <div className="bg-white rounded-3 px-5 py-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-clock"></i>
                  <p className="ms-3 pt-3">
                    <small>
                      <span>
                        {eventDates(eventDetails.dateDetails.startDateTime)}
                      </span>
                      <span>{` to `}</span>
                      <br />
                      <span>
                        {eventDates(eventDetails.dateDetails.endDateTime)}
                      </span>
                    </small>
                  </p>
                </div>
                {eventDetails.location ? (
                  <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt"></i>
                    <p className="ms-3 pt-3">
                      <small>{eventDetails.location.address}</small>
                    </p>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <i className="bi bi-laptop"></i>
                    <p className="ms-3 pt-3">
                      <small>Online</small>
                    </p>
                  </div>
                )}

                {Number(eventDetails.price) > 0 && (
                  <div className="d-flex align-items-center">
                    <i className="bi bi-currency-rupee"></i>
                    <p className="ms-3 pt-3">
                      <small>{eventDetails.price}</small>
                    </p>
                  </div>
                )}
              </div>
              {eventDetails.speakers.length > 0 &&
                speakerDetails(eventDetails.speakers)}
            </section>
          </div>
        )}
      </>
    );
  };

  return (
    <body className="bg-light">
      <Header showSearch={false} />
      <main className="container mt-5">{displayEventDetails()}</main>
      <Footer />
    </body>
  );
};
