import React, { useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Data } from "../Context";

export default function PropertyForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const PlayerId = location.state?.id;

  const [propertyDetails, setPropertyDetails] = useState({
    propertyCost: "",
    propertyName: "",
    Rent: "",
    House1Rent: "",
    House2Rent: "",
    House3Rent: "",
    Hotel: "",
  });
  const goBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      propertyDetails.Hotel ||
      propertyDetails.propertyName ||
      propertyDetails.Rent == ""
    ) {
       
    } else {
      try {
        const response = await axios.post(
          `https://monopoly-backend-8omq.onrender.com/players/properties_Buying${PlayerId}`,
          { property: propertyDetails }
        );
        console.log("Property Added:", response.data);
      } catch (error) {
        console.error("Error adding property:", error);
      }
      setPropertyDetails({
        propertyCost: "",
        propertyName: "",
        Rent: "",
        House1Rent: "",
        House2Rent: "",
        House3Rent: "",
        Hotel: "",
      });
    }
  };

  const handleViewProperty = () => {
    navigate("/view_property", { state: { id: PlayerId } });
  };

  return (
    <>
      <div>
        <div>
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

                  <div className="input-box" >
                    <button>
                      <div className="button_payment" onClick={handleSubmit}>Add Property Details</div>
                    </button>
                  </div>
                  <button onClick={goBack}>Go back</button>
                 
                  <button onClick={handleViewProperty}>
                    View Owned Property
                  </button>
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
      </div>
    </>
  );
}
