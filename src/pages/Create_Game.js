import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Data } from "../Context";
import "../cssForPages/createGame.css";

export default function Create_Game() {
  const [createGameId, setCreateGameId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [createdPlayers, setCreatedPlayers] = useState([]);
  const[playerImage,setPlayerImage]=useState('')
  const[created,setCreated]=useState(false)
  const[startingAmount,setStartingAmount]=useState(0)

  const [playersNumber, setPlayerNumber] = useState(1);

  const navigate = useNavigate();

  const handlePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  const gameId = () => {
    setCreateGameId(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
  };

  useEffect(() => {

    gameId();

  }, []);

  const handleImage=(e)=>{
    setPlayerImage(e.target.value)
  }

  const createPlayers = () => {
    if (playerName === "" || createGameId === "") {
      alert("fill up the name");
    }
    
    axios
      .post("http://localhost:3001/players/create", {
      name: playerName,
      game_id: createGameId,
      amount:startingAmount,
      image:playerImage
      

      })
      .then((res) => {
        setCreatedPlayers([...createdPlayers, res.data.user]);
        console.log(createdPlayers);

        setPlayerNumber((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
    setCreated(true)
    setPlayerName("");
  };

  const navToJoinPage = () => {
    navigate("/");
  };

  const handleAmount=(e)=>{
    setStartingAmount(e.target.value)
  }

  console.log(createGameId);

  return (
    <div>
      <div>
        <h2> Player {playersNumber}</h2>
      </div>
      <div>
        <h3> Game ID - {createGameId}</h3>
      </div>
      <div>
        Enter Name :{" "}
        <input
          value={playerName}
          onChange={(e) => {
            handlePlayerName(e);
          }}
        placeholder="name.."/>
      </div>

      <div>
        Duration of Game : <input type="time" />
      </div>
      <div>
        Amount : <input type="number" value={startingAmount} onChange={(e)=>{handleAmount(e)}} />
      </div>
      <div>
        image: <input value={playerImage} onChange={(e)=>{handleImage(e)}} placeholder="URL.."/>
      </div>
      <br/>
      <div>
        <button onClick={createPlayers}>Create Players</button>
      </div>
      <div>
        {
          created ?  <h3>Players Created</h3> :<div></div>
        }
       
       
        <div>
          <div class="container">
            {createdPlayers.map((e, indx) => {
              return (
                <>
                  <div>
                    <div class="card">
                      <img
                        src={e.image}
                        style={{width:"auto",height:"auto"}}
                      />
                        
                      
                      <div class="card__content">
                        <p class="card__title">Player Details</p>
                        <p class="card__description">
                          <ul>
                            <li> Name : {e.Player_name}</li>
                            <li>Game ID : {e.game_id}</li>
                            <li>Amount : ${e.amount}</li>
                          </ul>
                          
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <button onClick={navToJoinPage}>Start</button>
      </div>
    </div>
  );
}
