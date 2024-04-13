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

      <div className="cont">
        
        <h3>Enter Game Id</h3>
        <input
          value={game_Id}
          required='true'
          onChange={onChanging_game_Id}
          placeholder="Enter Game ID"
        />

        <div>
          <button onClick={join_Game}>Join the Game</button>
        </div>
        <br />
        <h3>Create a new Game!!</h3>
        <button onClick={navigateToCreateGame}>Create</button>
      </div>
    </>
  );
}
