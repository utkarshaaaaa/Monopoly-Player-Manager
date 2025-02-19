import React, { createContext, useState } from "react";
export const Data = createContext();

export default function Context({ children }) {
  const [game_Id, set_game_Id] = useState("");
  const [joined_Players_details, set_joined_Players_details] = useState([]);
  const [property, setproperty] = useState("");
  const [Player_id, setPlayer_id] = useState("");
  const [currentGameId, setCurrentGameId] = useState(0);
  const [userAmount, setUserAmount] = useState(0);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [totalPriceOfProperty, setTotalPriceOfProperty] = useState(0);

  return (
    <Data.Provider
      value={{
        game_Id,
        set_game_Id,
        joined_Players_details,
        set_joined_Players_details,
        Player_id,
        setPlayer_id,
        currentGameId,
        setCurrentGameId,
        userAmount,
        setUserAmount,
        propertyDetails,
        setPropertyDetails,
        totalPriceOfProperty,
        setTotalPriceOfProperty,
      }}
    >
      {children}
    </Data.Provider>
  );
}
