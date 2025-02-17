import React, { useState, useContext, useEffect } from "react";
import { Data } from "../Context";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function () {
  const location = useLocation();

  const PlayerId = location.state.id;
  const timeout=1000
  const [propertyDetails, setPropertyDetails] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          `https://monopoly-backend-8omq.onrender.com/players/getUser_property${PlayerId}`
        )
        .then((res) => {
          console.log(res.data);
          setPropertyDetails([res.data.property]);
        })
        .catch((error) => {
          if (error.message === "Request failed with status code 404") {
            console.log("error 404");
          }
        });
    }, timeout);
  }, []);
  return (
    <>
      <div>
        {propertyDetails.map((e) => {
          return <div>{e.propertyName}</div>;
        })}
      </div>
    </>
  );
}
