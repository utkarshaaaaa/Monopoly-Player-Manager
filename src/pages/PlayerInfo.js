import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Data } from "../Context";
import "../cssForPages/playerInfo.css";

export default function PlayerInfo() {
  const { game_Id } = useContext(Data);

  const location = useLocation();

  const navigate = useNavigate();

  const [Player_info, set_Player_Info] = useState([]);
  const [property, setProperty] = useState("");
  const [PlayersToPay, setPlayersToPay] = useState([]);
  const [pay, setPay] = useState();
  const [otherPlayersId, setotherPlayersId] = useState("");
  const [payBankAmount, setPayBankAmount] = useState(0);

  const PlayerId = location.state.id;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/players/player_info${PlayerId}`)
      .then((res) => {
        // console.log(Player_info);

        set_Player_Info([res.data.info]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/players/players_data${game_Id}`)
      .then((res) => {
        console.log(res.data.info);

        setPlayersToPay(res.data.info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProperty = (e) => {
    setProperty(e.target.value);
  };

  const addProperty = async () => {
    await axios
      .post(`http://localhost:3001/players/properties_Buying${PlayerId}`, {
        property: property,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setProperty("");
  };

  const lapAmount = () => {
    axios
      .post(`http://localhost:3001/players/lap${PlayerId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePayment = (e) => {
    setPay(e.target.value);
  };

  const payPlayerId = (e) => {
    console.log(e.target.value);
    setotherPlayersId(e.target.value);
  };

  const payCreditsToPlayers = async () => {
    await axios
      .post(`http://localhost:3001/players/transfer/${PlayerId}`, {
        player_id: otherPlayersId,
        amountSend: pay,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBankAmount = (e) => {
    setPayBankAmount(e.target.value);
  };

  const payToBank = async () => {
    await axios
      .post(`http://localhost:3001/players/pay_Bank${PlayerId}`, {
        pay_Bank: payBankAmount,
      })
      .then((res) => {
        if (res.data.message === "not enough balance") {
          alert("not enough balance");
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setPayBankAmount("");
  };

  return (
    <>
     
        {/* {Player_info.map((e) => {
          return (
            <div>
              Amount: {e.amount}
              <div>Player Name:{e.Player_name}</div>
              <div>
                Add property:
                <input
                  value={property}
                  onChange={(e) => {
                    handleProperty(e);
                  }}
                />
                <button onClick={addProperty}>Add</button>
              </div>
              <div>
                <button onClick={lapAmount}>Round Money</button>
              </div>
            </div>
          );
        })}
        <div>
          <br />
          <label>Choose person to Pay :</label>
          <input
            placeholder="pay.."
            value={pay}
            onChange={(e) => {
              handlePayment(e);
            }}
            type="number"
          />

          {
            <select
              onChange={(e) => {
                payPlayerId(e);
              }}
            >
              {PlayersToPay.map((player) => {
                return (
                  <option value={player._id} key={player._id}>
                    {player.Player_name}
                  </option>
                );
              })}
            </select>
          }

          <button onClick={payCreditsToPlayers}>Pay</button>

          <div>
            Pay to Bank:{" "}
            <input
              value={payBankAmount}
              onChange={(e) => {
                handleBankAmount(e);
              }}
              placeholder="amount..."
              type="number"
            />
            <button onClick={payToBank}>Pay to Bank </button>
          </div>
        </div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </button>
      </div>

      <div> */}


      <div>
        <section class="container">
          <div  class="form">
            {Player_info.map((e) => {
              return (
                <div>
                  <div class="det">
                  <h2> Player Details</h2>
                    </div>
                  <br/>
                  <div class="header">

                   <div><h3> Amount : {e.amount}</h3> </div>
                   <div> <h3>Player Name :  {e.Player_name}</h3></div> 


                  </div>

                 
                  <div class="input-box">
                    <label><h4> Add Property</h4></label>
                    <input type="text" placeholder="Property"   value={property}
                      onChange={(e) => {
                        handleProperty(e);
                      }} />
                  </div>
                  
                    <button onClick={addProperty}>Add</button>
                  
                </div>
              );
            })} 
            <br />
            <div class="input-box">
            <label><h4> Choose person to Pay :</h4></label>
            <input
              placeholder="pay.."
              value={pay}
              onChange={(e) => {
                handlePayment(e);
              }}
              type="number"
            />

            <div>
  
            {
              
              <div class="sel">
              <div class="select">
              <select
                onChange={(e) => {
                  payPlayerId(e);
                }}
              >
                {PlayersToPay.map((player) => {
                  return (
                    <option value={player._id} key={player._id}>
                      {player.Player_name}
                    </option>
                  );
                })}
                
              </select>
              </div>
              </div>
              
           
            }
            </div>
            <br/>
           
        
            </div>
            <br/>

            <div>
            <button onClick={payCreditsToPlayers}>Pay to Players</button>
            </div>
            
            <div class="input-box">
            <div>
            Pay to Bank:{" "}
            <input
              value={payBankAmount}
              onChange={(e) => {
                handleBankAmount(e);
              }}
              placeholder="amount..."
              type="number"
            />
            <button onClick={payToBank}>Pay to Bank </button>
          </div>
          
              <button onClick={lapAmount}>Click to Add Round Money</button>
            </div>
            <button  onClick={() => {
            navigate(-1);
          }}>Go back</button>
          </div>
        </section>
      </div>

   

    </>
  );
}
