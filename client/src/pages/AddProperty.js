import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Data } from "../Context";

export default function () {
  const location = useLocation();
  const navigate = useNavigate();
  const PlayerId = location.state.id;
  const {
    joined_Players_details,
    set_joined_Players_details,
    game_Id,
    set_game_Id,
    currentGameId,
    setCurrentGameId,
  } = useContext(Data);

  const [propertyDetails, setpropertyDetails] = useState({
    propertyName: "",
    Rent: "",
    House1Rent: "",
    House2Rent: "",
    House3Rent: "",
    Hotel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setpropertyDetails({
      ...propertyDetails,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", propertyDetails);
  };

  const addProperty = async () => {
    await axios
      .post(
        `https://monopoly-backend-8omq.onrender.com/players/properties_Buying${PlayerId}`,
        {
          property: propertyDetails,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleViewProperty = () => {
    navigate("/view_property", { state: { id: PlayerId, test: "test" } });
  };

  return (
    <>
      <div>
        <h2> Property Details</h2>
        {/* <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="propertyName"
            placeholder="Name"
            value={propertyDetails.propertyName}
            onChange={handleChange}
          />
          <input
            type="number"
            name="Rent"
            placeholder="Rent"
            value={propertyDetails.Rent}
            onChange={handleChange}
          />
          <input
            type="number"
            name="House1Rent"
            placeholder="House 1"
            value={propertyDetails.House1Rent}
            onChange={handleChange}
          />
          <input
            type="number"
            name="House2Rent"
            placeholder="House 2"
            value={propertyDetails.House2Rent}
            onChange={handleChange}
          />
          <input
            type="number"
            name="House3Rent"
            placeholder="House 3"
            value={propertyDetails.House3Rent}
            onChange={handleChange}
          />
          <input
            type="number"
            name="Hotel"
            placeholder="Hotel"
            value={propertyDetails.Hotel}
            onChange={handleChange}
          />
          <button type="submit" onClick={()=>{addProperty()}}>Submit</button>
          
        </form> */}
        <div>
          <h2>Property Input Form</h2>
          <form onSubmit={handleSubmit}>
            {Object.keys(propertyDetails).map((key) => (
              <input
                key={key}
                type="text"
                name={key}
                placeholder={key}
                value={propertyDetails[key]}
                onChange={handleChange}
              />
            ))}
            <button type="submit">Submit</button>
          </form>
        </div>
        <button
          onClick={() => {
            handleViewProperty();
          }}
        >
          View Properties
        </button>
      </div>
    </>
  );
}
