import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Data } from "../Context";
import "../cssForPages/joinedGame.css";
import Players from "./Players";

export default function Enter_joined_Game() {
  const {
    joined_Players_details,
    set_joined_Players_details,
    game_Id,
    set_game_Id,
    currentGameId,
    setCurrentGameId,
  } = useContext(Data);

  const location = useLocation();
  const navigate = useNavigate();

  const [playersCount, setPlayersCount] = useState(0);

  const data = location.state.data;

  useEffect(() => {
    axios
      .post(
        `https://monopoly-backend-8omq.onrender.com/players/players_details${currentGameId}`
      )
      .then((res) => {
        set_joined_Players_details(res.data.players);
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 404") {
          console.log("error 404");
        }
      });
  }, []);

  const navigateToCreateGame = () => {
    navigate("/create");
  };

  const exitGame = () => {
    setCurrentGameId(0);
    console.log(currentGameId);
  };

  useEffect(() => {
    axios
      .post(
        `https://monopoly-backend-8omq.onrender.com/players/players_count${currentGameId}`
      )
      .then((res) => {
        setPlayersCount(res.data.players_count);
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 404") {
          console.log("error 404");
        }
      });
  }, []);


  return (
    <>
      <div className="parent">
        <div className="heading">
          <h2 className="players-count">Players Playing : {playersCount} </h2>
        </div>
        <div></div>
        <div>
          {joined_Players_details.length == 0 ? (
            <div>
              {" "}
              <div class="game-id-error-container">
                <p class="game-id-error-text">
                  Game ID Not Available or Wrong Game ID
                </p>
              </div>
              <button
                className="cssbuttons-io-button"
                onClick={navigateToCreateGame}
              >
                Create Game
                <div className="icon">
                  <svg
                    height="24"
                    width="90"
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
          ) : (
            <div>
              <div class="grid-container">
                {joined_Players_details.map((e, indx) => {
                  return (
                    <>
                      <div
                        style={{ cursor: "pointer" }}
                        className="grid-item"
                        indx={indx}
                      >
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
        <button
          onClick={() => {
            exitGame();
          }}
        >
          Exit Game
        </button>
      </div>
    </>
  );
}
