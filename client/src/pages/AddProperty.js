import React, { useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Data } from "../Context";

export default function PropertyForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const PlayerId = location.state?.id;

  const [propertyDetails, setPropertyDetails] = useState({
    propertyName: "",
    Rent: "",
    House1Rent: "",
    House2Rent: "",
    House3Rent: "",
    Hotel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://monopoly-backend-8omq.onrender.com/players/properties_Buying${PlayerId}`,
        { property: propertyDetails }
      );
      console.log("Property Added:", response.data);
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleViewProperty = () => {
    navigate("/view_property", { state: { id: PlayerId } });
  };

  return (
    <>
      <div>
        <h2>Property Details</h2>
        <div>
          <h2>Property Input Form</h2>
           <div className="par">
        <section className="container">
          <div className="form">
            <div>
              <div className="det">
                <h2> Player Details</h2>
              </div>
              <br />
              <div className="header">
                <div>
                  <h2> Amount :</h2>{" "}
                </div>
                <div>
                  {" "}
                  <h2> Name : </h2>
                </div>
              </div>

              <div className="input-box">
                <label>
                  <h4> Add Property</h4>
                </label>
              </div>

              <button>Add</button>
              <button>Pay </button>
            </div>

            <br />
            <div className="input-box">
              <label>
                <h4> Choose Player to Pay :</h4>
              </label>
              <input placeholder="pay.." type="number" />

              <div></div>
              <br />
            </div>
            <br />
            <div>
              <button>Pay to Players</button>
            </div>
            <div className="input-box">
              <div>
                Pay to Bank: <input placeholder="amount..." type="number" />
                <button>
                  <div className="button_payment">
                    <div> Pay to Bank</div>
                  </div>
                </button>
              </div>

              <button>
                <div className="button_payment">
                  <div> Add Round Money</div>
                </div>
              </button>
            </div>
            <button>Go back</button>
          </div>
        </section>
      </div>
          <form onSubmit={handleSubmit}>
            {Object.entries(propertyDetails).map(([key, value]) => (
              <input
                key={key}
                type="text"
                name={key}
                placeholder={key}
                value={value}
                onChange={handleChange}
              />
              
            ))}
            <button type="submit">Submit</button>
          </form>
        </div>
        <button onClick={handleViewProperty}>View Properties</button>
      </div>
     
    </>
  );
}
