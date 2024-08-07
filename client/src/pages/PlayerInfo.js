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
  const [loadingPayment, setLoadingPayment] = useState(false);
  const[loadingLapAmount,setLoadingLapAmount]=useState(false)
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

    setLoadingLapAmount(true)

    setTimeout(() => {

      axios
      .post(`http://localhost:3001/players/lap${PlayerId}`)
      .then((res) => {
        console.log(res.data)
        setLoadingLapAmount(false)
      })
      .catch((err) => {
        console.log(err);
      });
      
    }, 1600);
    
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

    setLoadingPayment(true)
    setTimeout(() => {
      axios
        .post(`http://localhost:3001/players/pay_Bank${PlayerId}`, {
          pay_Bank: payBankAmount,
        })
        .then((res) => {
          if (res.data.message === "not enough balance") {
            alert("not enough balance");
          } else {
            console.log(res.data);
          }
          setLoadingPayment(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);

    setPayBankAmount("");
  };

  return (
    <>
      <div className="par">
        <section className="container">
          <div className="form">
            {Player_info.map((e) => {
              return (
                <div>
                  <div className="det">
                    <h2> Player Details</h2>
                  </div>
                  <br />
                  <div className="header">
                    <div>
                      <h3> Amount : ${e.amount}</h3>{" "}
                    </div>
                    <div>
                      {" "}
                      <h3>Player Name : {e.Player_name}</h3>
                    </div>
                  </div>

                  <div className="input-box">
                    <label>
                      <h4> Add Property</h4>
                    </label>
                    <input
                      type="text"
                      placeholder="Property"
                      value={property}
                      onChange={(e) => {
                        handleProperty(e);
                      }}
                    />
                  </div>

                  <button onClick={addProperty}>Add</button>
                </div>
              );
            })}
            <br />
            <div className="input-box">
              <label>
                <h4> Choose Player to Pay :</h4>
              </label>
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
                  <div className="sel">
                    <div className="select">
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
              <br />
            </div>
            <br />

            <div>
              <button onClick={payCreditsToPlayers}>Pay to Players</button>
            </div>

            <div className="input-box">
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
                <button onClick={payToBank}>
                  <div className="button_payment">
                    {loadingPayment ? (
                      <svg viewBox="25 25 50 50">
                        <circle r="20" cy="50" cx="50"></circle>
                      </svg>
                    ) : (
                      <div> Pay to Bank</div>
                    )}
                  </div>
                </button>
              </div>

              <button onClick={lapAmount}>
              <div className="button_payment">
                    {loadingLapAmount ? (
                      <svg viewBox="25 25 50 50">
                        <circle r="15" cy="50" cx="50"></circle>
                      </svg>
                    ) : (
                      <div> Add Round Money</div>
                    )}
                  </div>
              </button>
            </div>
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              Go back
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
