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
  const [playerImage, setPlayerImage] = useState("");
  const [created, setCreated] = useState(false);
  const [startingAmount, setStartingAmount] = useState(0);

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

  const handleImage = (e) => {
    setPlayerImage(e.target.value);
  };

  const createPlayers = () => {
    if (playerName === "" || createGameId === "") {
      alert("fill up the name");
    }

    axios
      .post("http://localhost:3001/players/create", {
        name: playerName,
        game_id: createGameId,
        amount: startingAmount,
        image: playerImage,
      })
      .then((res) => {
        setCreatedPlayers([...createdPlayers, res.data.user]);
        console.log(createdPlayers);

        setPlayerNumber((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
    setCreated(true);
    setPlayerName("");
  };

  const navToJoinPage = () => {
    navigate("/");
  };

  const handleAmount = (e) => {
    setStartingAmount(e.target.value);
  };

  console.log(createGameId);
  //{{"transition-delay":"50ms"}}
  return (
    <div>
      <div>
        <h2> Player {playersNumber}</h2>
      </div>
      <div>
        <h3> Game ID - {createGameId}</h3>
      </div>
      <div>
        <div className="form__group field">
          <input
            type="input"
            className="form__field"
            required=""
            value={playerName}
            onChange={(e) => {
              handlePlayerName(e);
            }}
            placeholder="name.."
          />
          <label for="name" className="form__label">
            Name
          </label>
        </div>
      </div>
      <div>
        <div className="form__group field">
          <input
            className="form__field"
            placeholder="Amount"
            required=""
            type="input"
            value={startingAmount}
            onChange={(e) => {
              handleAmount(e);
            }}
          />
          <label for="name" className="form__label">
            Amount
          </label>
        </div>
      </div>
      <div>
        <div className="form__group field">
          <input
            type="input"
            className="form__field"
            required=""
            value={playerImage}
            onChange={(e) => {
              handleImage(e);
            }}
            placeholder="URL.."
          />
          <label for="name" className="form__label">
            Image
          </label>
        </div>
      </div>
      <br />

      <button className="cssbuttons-io-button" onClick={createPlayers}>
        Create Players
        <div className="icon">
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
      <div>
        {created ? <h3>Players Created</h3> : <div></div>}

        <div>
          <div className="container">
            {createdPlayers?.map((e, indx) => {
              return (
                <>{
                  createPlayers.length!=0 ?<div>No players</div>:<div className="holder">
                  <div className="card">
                    <img
                      className="image-players"
                      src={e.image}
                      style={{ width: "auto", height: "auto"}}
                    />

                    <div className="card__content">
                      <p className="card__title">Player Details</p>
                      <p className="card__description">
                        <ul>
                          <li> Name : {e.Player_name}</li>
                          <li>Game ID : {e.game_id}</li>
                          <li>Amount : ${e.amount}</li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
                  
                }
                  
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <button className="cssbuttons-io-button" onClick={navToJoinPage}>
          Start Game
          <div className="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>



       
      </div>
    </div>
  );
}
