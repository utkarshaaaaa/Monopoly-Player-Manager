import React, { useState, useContext, useEffect } from "react";
import { Data } from "../Context";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../cssForPages/viewProperty.css";

export default function () {
  const location = useLocation();
  const {
    propertyDetails,
    setPropertyDetails,
    totalPriceOfProperty,
    setTotalPriceOfProperty,
  } = useContext(Data);
  const [totalOwnedProperty, settotalOwnedProperty] = useState(0);

  const PlayerId = location.state.id;
  const totalPrice = 0;
  useEffect(() => {
    axios
      .get(
        `https://monopoly-backend-8omq.onrender.com/players/getUser_property${PlayerId}`
      )
      .then((res) => {
        setPropertyDetails([...res.data.property]);
        settotalOwnedProperty(res.data.property.length);
        console.log(propertyDetails);
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 404") {
          console.log("error 404");
        }
      });

    priceOfProperty();
  }, []);

  const priceOfProperty = () => {
    let totalPrice = 0;
    {
      propertyDetails.map((data) => {
        return (totalPrice += Number(data.propertyCost));
      });
    }
    setTotalPriceOfProperty(totalPrice);
  };

  return (
    <>
      <div>
        <div>
          <div>
            <span>Properties Owned {totalOwnedProperty}</span>
          </div>
          <div>
            <span>Total Cost Of Property : {totalPriceOfProperty}</span>
          </div>
        </div>

        <div class="grid-container-view">
          {propertyDetails.map((details, index) => (
            <div class="card_view" key={index}>
              <div class="first-content-view">
                <span>{details.propertyName}</span>
              </div>
              <div class="second-content-view">
                <ul className="view-ul">
                  <div className="rent-Title">Rent</div>
                  <li className="view-li">Rent :{details.Rent}</li>
                  <li className="view-li">House 1 :{details.House1Rent}</li>
                  <li className="view-li">House 2 :{details.House2Rent}</li>
                  <li className="view-li">House 3 :{details.House3Rent}</li>
                  <li className="view-li">Hotel :{details.Hotel}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        {/* {propertyDetails.map((details) => {
          return (
            <div>
              {details.propertyName}

              <div class="card_view">
                <div class="first-content-view">
                  <span>First</span>
                </div>
                <div class="second-content-view">
                  <span>Second</span>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
    </>
  );
}
