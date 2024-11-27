import { useEffect, useRef, useState } from 'react'

import '../App.css'
import { players } from '../team'

function App() {
  const [playersDetails] = useState(players)
  const [arr, setArr] = useState(playersDetails[0])
  const [count, setCount] = useState(0)
  // const countRef=useRef(count)
  const [price, setPrice] = useState(arr.basePrice.split("")[0])
  const [teamArr] = useState(["Chennai Super Kings",
    "Mumbai Indians",
    "Royal Challengers Bangalore",
    "Kolkata Knight Riders",
    "Delhi Capitals",
    "Punjab Kings",
    "Rajasthan Royals",
    "Sunrisers Hyderabad",

    "Lucknow Super Giants",
    "Gujarat Titans"])

  const [teamDetails,setTeamDetails] = useState(teamArr.map(x=>{
    return{name:x, spent: 0,
    remaining: 80,
    WicketKeeper: [],
    Batsman: [],
    Finisher: [],
    Bowlers: [],
    Allrounders: []
}}))
  const h = (e) => {
    setPrice(e.target.value)
  }

  useEffect(() => {
    console.log("A")
  }, [])
  useEffect(() => {
    setArr(playersDetails[count])
  }, [count])

  useEffect(()=>{
    setPrice(arr.basePrice.split("")[0])

  },[arr])

  return (
    <>
      <header className='min-h-16 bg-blue-500 flex justify-center items-center mt-0'>
        <h1 className=' text-white font-extrabold text-3xl'>IPL 2024 Auction Tracker</h1>
      </header>
      <div className=' w-11/12 flex flex-col  gap-10 mx-auto mt-3'>
        <button className="bg-transparent hover:bg-blue-500 max-w-32  text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded " onClick={() => {
          // countRef.current++
          // console.log(countRef.current)

          setCount(s => {
            if (s >= 0 && s < playersDetails.length) {
              s += 1
              return s;
            }
            return s
          })
          
        }
        }>
          Next Bid
        </button>

        <div className=' mx-auto w-full border-2 min-h-44 shadow-xl flex flex-wrap gap-14 py-10 px-1 justify-center '>
          {Object.keys(arr).map((x, index) => (
            <div className=' flex gap-2 items-center' key={index}>
              <label htmlFor={x}>{x}&nbsp;:</label>
              <input type="text" name={x} required className='bg-gray-200 rounded-md p-2 text-gray-600' value={arr[x]} readOnly />
            </div>
          ))}

          <div>
            <label htmlFor="team">Select Team:</label>
            <select id="team" className='p-2 rounded-md px-3 bg-white border-2' required>
              {teamArr.map((x, index) =>
                <option value={x} key={index}>{x}</option>
              )}
            </select>
          </div>
          <div>
            <label htmlFor="playerPrice">Price (in Crores):</label>
            <input type="number" id="playerPrice" required step={(price >= 5 ? 0.25 : 0.20)} min="0" defaultValue={price}  className='rounded-md p-2 border-2' onChange={h} />
          </div>


        </div>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded max-w-36 " onClick={()=>{
          const d=teamDetails.map((x)=>{
            if(x.name==="Chennai Super Kings"){
              console.log(arr.playerName)
              return {...x,Batsman:[...x.Batsman,`${arr.playerName} (${arr.Rank})- ₹${price}crore`],spent:price, remaining:(x.remaining-price).toFixed(2), }
            }
            return x
          })
      setTeamDetails(d)
        }}>
          ADD player
        </button>

      </div>

      {/* team bufget */}
      <div className='mx-auto w-full'>
        <h1 className='text-center'>Team Budget</h1>
        <div className='w-10/12 flex flex-wrap mx-auto gap-x-4 justify-evenly mb-4 gap-y-6'>
          {teamArr.map((x, index) => (
            <div className='flex flex-col gap-2 items-center  border-2 rounded-md box-border min-w-52 shadow-lg p-2' key={index}>
              <h3>{x}</h3>
              {/* {teamDetails[index]} */}
              <p>Spent: ₹<span id="${team}-spent">{teamDetails[index].spent}</span> crore</p>
              <p>Remaining: ₹<span id="${team}-remaining">{teamDetails[index].remaining}</span> crore</p>
              <div id="${team}-Wicketkeeper" ><h4>Wicketkeeper:</h4><ul>{teamDetails[0].WicketKeeper.map((x,index)=>
              <li key={index}>{x}</li>
              )}</ul></div>
              <div id="${team}-Wicketkeeper" ><h4>Bowler:</h4><ul>{teamDetails[0].Bowlers.map((x,index)=>
              <li key={index}>{x}</li>
              )}</ul></div>
              <div id="${team}-Wicketkeeper" ><h4>Batsman:</h4><ul>{teamDetails[0].Batsman.map((x,index)=>
              <li key={index}>{x}</li>
              )}</ul></div>
              <div id="${team}-Wicketkeeper" ><h4>All rounders:</h4><ul>{teamDetails[0].Allrounders.map((x,index)=>
              <li key={index}>{x}</li>
              )}</ul></div>
               <div id="${team}-Wicketkeeper" ><h4> Finisher:</h4><ul>{teamDetails[0].Finisher.map((x,index)=>
              <li key={index}>{x}</li>
              )}</ul></div>
               
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App;
