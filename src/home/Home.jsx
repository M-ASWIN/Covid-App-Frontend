import "./home.scss";

export const Home = () => {
  return (
    <div className="home">
      <h1 className="h1">
        Welcome to the COVID Vaccination
        <span className="span"> Slot Management System</span>
      </h1>
      <p className="h2">
        This application is designed to help manage COVID vaccination slots for
        various centers. Users can add available slots, and users can register
        or log in to book their vaccination slots.
      </p>
    </div>
  );
};
