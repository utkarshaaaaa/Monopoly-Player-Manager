import React,{createContext, useState} from 'react'
export const Data=createContext()


export default function Context({children}) {
   const[game_Id,set_game_Id]=useState("")
   const[joined_Players_details,set_joined_Players_details]=useState([])
   const[property,setproperty]=useState("")
   const[Player_id,setPlayer_id]=useState('')
   



  return (
    <Data.Provider value={{game_Id,set_game_Id,joined_Players_details,set_joined_Players_details,Player_id,setPlayer_id}}>
       {children}

    </Data.Provider>
    
  )
}
