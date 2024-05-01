import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Data } from "../Context";
import "../cssForPages/joinedGame.css";
import Players from "./Players";

export default function Enter_joined_Game() {
  const { joined_Players_details, set_joined_Players_details } =
    useContext(Data);

  const location = useLocation();
  const navigate = useNavigate();

  const [playersPlaying, setPlayersPlaying] = useState(0);

  const data = location.state.data;
  // set_joined_Players_details(data)

  //  console.log(data.length)

  useEffect(() => {
    setTimeout(() => {
      axios
        .post(`http://localhost:3001/players/players_details${data}`)
        .then((res) => {
          set_joined_Players_details(res.data.players);
        })
        .catch((error) => {
          if (error.message === "Request failed with status code 404") {
            console.log("error 404");
          }
        });
    }, 100);
  }, []);

  const navigateToCreateGame = () => {
    navigate("/create");
  };

  //    const AddProperties=(e,id)=>{

  //     axios.post(`http://localhost:3001/players/properties_Buying${id}`,properties)
  //     .then(res=>{
  //         console.log(res.data)
  //     })
  //     .catch(err=>{
  //         console.log(err)
  //     })

  //    }

  const totalPlayers = () => {
    setPlayersPlaying(joined_Players_details.length);
  };

  useEffect(() => {
    totalPlayers();
  });
  console.log(playersPlaying);

  return (
    <>
    <div className="parent">

      <div className="heading">

      <h2>Players Playing {playersPlaying} </h2>

      </div>
      <div>
        
      </div>
      <div >
        {joined_Players_details.length === 0 ? (
          <div>
            {" "}
            <div>Game Id Not avaible</div>
            <button onClick={navigateToCreateGame}>Create Game</button>
          </div>
        ) : (
          <div>
            <div class="grid-container">
              {joined_Players_details.map((e, indx) => {
                return (
                  <>
                    <div style={{ cursor: "pointer" }} className="grid-item">
                      <Players
                        id={e._id}
                        Player_name={e.Player_name}
                        lap_Money={e.lap_money}
                        properties={e.properties}
                        amount={e.amount}
                        image={e.image}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>

      </div>
    </>
  );
}
