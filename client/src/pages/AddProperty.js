import React, { useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Data } from "../Context";

export default function PropertyForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const PlayerId = location.state.id;

  const [propertyName, setPropertyName] = useState("");
  const [rent, setRent] = useState(0);
  const [houseRent1, setHouseRent1] = useState(0);
  const [houseRent2, setHouseRent2] = useState(0);
  const [houseRent3, setHouseRent3] = useState(0);
  const [hotel, setHotel] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty();
  };

  const addProperty = async () => {
    try {
      const res = await axios.post(
        `https://monopoly-backend-8omq.onrender.com/players/properties_Buying${PlayerId}`,
        {
          propertyName,
          rent,
          houseRent1,
          houseRent2,
          houseRent3,
          hotel,
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewProperty = () => {
    navigate("/view_property", { state: { id: PlayerId, test: "test" } });
  };

  return (
    <>
      <div>
        <h2>Property Details</h2>
        <div>
          Property Name :
          <input
            value={propertyName}
            onChange={(e) => {
              setPropertyName(e.target.value);
            }}
          />
        </div>
        <div>
          Rent :
          <input
            value={rent}
            onChange={(e) => {
              setRent(e.target.value);
            }}
          />
        </div>
        <div>
          Rent1 :
          <input
            value={houseRent1}
            onChange={(e) => {
              setHouseRent1(e.target.value);
            }}
            type="number"
          />
        </div>
        <div>
          Rent2 :
          <input
            value={houseRent2}
            onChange={(e) => {
              setHouseRent2(e.target.value);
            }}
            type="number"
          />
        </div>
        <div>
          Rent3 :
          <input
            value={houseRent3}
            onChange={(e) => {
              setHouseRent3(e.target.value);
            }}
            type="number"
          />
        </div>
        <div>
          Hotel :
          <input
            value={hotel}
            onChange={(e) => {
              setHotel(e.target.value);
            }}
            type="number"
          />
        </div>
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit Property Details
        </button>

        <button onClick={handleViewProperty}>View Properties</button>
      </div>
    </>
  );
}
