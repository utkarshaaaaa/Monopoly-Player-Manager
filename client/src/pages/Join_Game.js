import React, { useState, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Data } from "../Context";
import { useNavigate } from "react-router-dom";
import "../cssForPages/join.css";

export default function Join_Game() {
  const { game_Id, set_game_Id } = useContext(Data);

  const navigate = useNavigate();

  const onChanging_game_Id = (e) => {
    set_game_Id(e.target.value);
  };

  const navigateToCreateGame = () => {
    navigate("/create");
  };
  const join_Game = () => {
    //   set_store_id(store_id)

    //     axios.post(`http://localhost:3001/players/players_details${game_Id}`)
    //     .then(res=>{

    //     set_joined_Players_details(res.data.players)

    //     console.log(joined_Players_details)

    //       // navigate("/enter_Join_Game",{state:{data:joined_Players_details}})

    //   })
    // .catch((error)=>{

    //   if(error.message==="Request failed with status code 404"){
    //       console.log("error")

    //   }

    // })

    navigate("/enter_Join_Game", { state: { data: game_Id, setdata: "test" } });
  };

  return (
    <>
      <div>
        <div class="loader">
          <p class="text">Monopoly Bank</p>
        </div>
      </div>

      <div className="enter-game">
        <div class="input-container">
          <input
            type="text"
            id="input"
            value={game_Id}
            required="true"
            onChange={onChanging_game_Id}
          />

          <label for="input" class="label">
            Enter Game ID
          </label>
          <br />

          <button class="cssbuttons-io-button" onClick={join_Game}>
            Start Game
            <div class="icon">
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
            <button class="cssbuttons-io-button" onClick={navigateToCreateGame}>
              Create Game
              <div class="icon">
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

      </div>
    </>
  );
}
