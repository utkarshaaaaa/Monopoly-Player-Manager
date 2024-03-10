import React, { useState, useContext, useEffect } from "react";
import { Data } from "../Context";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../cssForPages/player.css";

export default function Players({
  id,
  Player_name,
  lap_Money,
  properties,
  amount,
}) {
  const navigate = useNavigate();

  const { setPlayer_id } = useContext(Data);

  const [playerDetails, setPlayerDetails] = useState([
    {
      id: id,
      playerName: Player_name,
      lapMoney: lap_Money,
      properties: properties,
      amount: amount,
    },
  ]);

  // const AddProperties=(e,id)=>{

  //       axios.post(`http://localhost:3001/players/properties_Buying${id}`,)
  //       .then(res=>{
  //           console.log(res.data)
  //       })
  //       .catch(err=>{
  //           console.log(err)
  //       })

  //      }

  const PlayerInfo = (id) => {
    setPlayer_id(id);

    navigate("/player_info", { state: { id: id, test: "test" } });

    console.log(id);
  };

  return (
    <>
      <div>
        {playerDetails.map((players, indx) => {
          return (
            <>
              <div
                onClick={() => {
                  PlayerInfo(players.id);
                }}
                key={indx}
              >
                <ul>
                  <li>Player Name: {players.playerName}</li>
                  <li>Amount : {players.amount}</li>
                  <li>
                    properties:
                    {players.properties.map((property, indx) => {
                      return <div>{property.toLowerCase()}</div>;
                    })}
                  </li>
                </ul>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
