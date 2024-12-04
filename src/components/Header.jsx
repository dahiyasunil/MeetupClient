import { NavLink } from "react-router-dom";
import meetupLogo from "../assets/meetup.png";
import { SearchEvents } from "./SearchEvents";

export const Header = ({ events, onEventSearchHandle, showSearch }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <NavLink to="/">
            <img
              src={meetupLogo}
              style={{ width: "100px", height: "auto" }}
              alt="meetup logo"
            />
          </NavLink>

          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <form className="d-flex mt-3" role="search">
              {showSearch && (
                <SearchEvents
                  data={events}
                  onSearchFilter={onEventSearchHandle}
                />
              )}
            </form>
          </div>
        </div>
      </nav>
      <div className="container">
        <hr />
      </div>
    </header>
  );
};
