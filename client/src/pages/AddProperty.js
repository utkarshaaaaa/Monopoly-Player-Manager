import React, { useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Data } from "../Context";

export default function PropertyForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const PlayerId = location.state?.id;

  const [propertyDetails, setPropertyDetails] = useState({
    propertyCost:"",
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
        <div>
          <h2>Property Input Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="par">
              <section className="container">
                <div className="form">
                  <div>
                    <div className="input-box-property">
                      <label>Add property</label>
                    </div>
                  </div>

                  <div className="input-box">
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
                    
                  </div>

                  <div className="input-box" type="submit">
                    <button>
                      <div className="button_payment">Add Property Details</div>
                    </button>
                  </div>
                  <button>Go back</button>
                </div>
              </section>
            </div>
          </form>

          {/* <form onSubmit={handleSubmit}>
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
          </form> */}
        </div>
        <button onClick={handleViewProperty}>View Properties</button>
      </div>
    </>
  );
}
