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
  image,
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
      image: image,
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
      {playerDetails.map((players, indx) => {
        return (
          <>
            <div
              onClick={() => {
                PlayerInfo(players.id);
              }}
              key={indx}
            >
              <div>
                <div class="card">
                  <img src={players.image} />
                  <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>

                  <div class="card__content">
                    <p class="card__title">Player Info</p>
                    <p class="card__description">
                      <ul>
                        <li>Player Name: {players.playerName}</li>
                        <li>Amount : {players.amount}</li>
                        <li>
                          Properties:
                          {players.properties.map((property, indx) => {
                            return (
                              <div key={indx}>
                                {/* {
                          property ===null?<div>Null</div>:<div>
                            {property}
                          </div>
                        } */}

                                {property}
                              </div>
                            );
                          })}
                        </li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
