import { useEffect, useRef, useState } from 'react'
import { players } from '../team'
import { TeamList } from './TeamList'
import '../App.css'
import { Tab, TabPanel,TabGroup,TabList,TabPanels } from '@headlessui/react';
function App() {
  const [playersDetails] = useState(players)
  const [tog, setTog] = useState(true)
  const [arr, setArr] = useState(playersDetails[0])
  const [count, setCount] = useState(0)
  // const countRef=useRef(count)
  const [price, setPrice] = useState(parseFloat(arr.basePrice))
  const [teamArr, setTeamArr] = useState(["Chennai Super Kings",
    "Mumbai Indians",
    "Royal Challengers Bangalore",
    "Kolkata Knight Riders",
    "Delhi Capitals",
    "Punjab Kings",
    "Rajasthan Royals",
    "Sunrisers Hyderabad",
    "Lucknow Super Giants",
    "Gujarat Titans"])
  const [disteam, setDisTeam] = useState(JSON.parse(window.localStorage.getItem("disteam")) || [])
  const [t, setT] = useState(teamArr[0])

  const [teamDetails, setTeamDetails] = useState(JSON.parse(window.localStorage.getItem("details")) || teamArr.map(x => {
    return {
      name: x, spent: 0,
      remaining: 80,
      WicketKeeper: [],
      Batsman: [],
      Finisher: [],
      Bowler: [],
      "All-rounder": []
    }
  }))
  const h = (e) => {
    const newPrice = parseFloat(e.target.value) || 0; // Ensure valid number
    console.log("New Price:", newPrice); // Debug log
    setPrice(newPrice);

  }
  const hh = (e) => {
    console.log(e.target)
    setT(e.target.value)
  }
  useEffect(() => {
    console.log("A")
  }, [])
  useEffect(() => {
    setArr(playersDetails[count])
  }, [count])

  useEffect(() => {
    console.log(arr.basePrice)
    setPrice(arr.basePrice)

  }, [arr])
  useEffect(() => {
    let r = teamDetails.find(x => x.spent >= 80)
    if (r) {
      alert(`${r.name},is disqualified`)
      setDisTeam((e) => [...e, r])
      window.localStorage.setItem("disteam", JSON.stringify(disteam))
      setTeamDetails(teamDetails.filter(x => x.name !== r.name))
      setTeamArr(teamArr.filter(x => x !== r.name))
      setTog(false)
    }
  }, [teamDetails])


  return (
    <>
      <header className='min-h-16 bg-blue-500 flex justify-center items-center mt-0 '>
        <h1 className=' text-white font-extrabold text-3xl'>IPL 2024 Auction Tracker</h1>
      </header>
      <div className=' w-11/12 flex flex-col  gap-10 mx-auto mt-3 '>
        <div className='w-full flex justify-between'>

          <button className="bg-transparent hover:bg-blue-500 max-w-32  text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded " onClick={() => {
            // countRef.current++
            // console.log(countRef.current)
            if (count > playersDetails.length) {
              setCount(0)
              return
            }
            setCount(s => {
              s += 1
              return s
            })

          }
          }>
            Next Bid
          </button>
          <button className="bg-transparent hover:bg-blue-500 max-w-32  text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded " onClick={() => {

            // countRef.current++
            // console.log(countRef.current)
            window.localStorage.removeItem("details")
            window.localStorage.removeItem("disteam")

            window.location.reload()
          }
          }>
            reset
          </button>
        </div>

        <div className=' mx-auto w-full border-2 min-h-44 shadow-xl flex flex-wrap gap-14 py-10 px-1 justify-center rounded-xl bg-white'>
          {Object.keys(arr).map((x, index) => (
            <div className=' flex gap-2 items-center flex-wrap justify-center' key={index}>
              <label htmlFor={x}>{x}&nbsp;:</label>
              <input type="text" name={x} required className='bg-gray-200 rounded-md p-2 text-gray-600' value={arr[x]} readOnly />
            </div>
          ))}

          <div>
            <label htmlFor="team">Select Team:</label>
            <select id="team" className='p-2 rounded-md px-3 bg-white border-2' required onChange={hh}>
              {teamArr.map((x, index) =>
                <option value={x} key={index}>{x}</option>
              )}
            </select>
          </div>
          <div>
            <label htmlFor="playerPrice">Price (in Crores):</label>
            <input type="number" id="playerPrice" required step={(price >= 5 ? 0.25 : 0.20)} value={price} className='rounded-md p-2 border-2' onChange={h} />
          </div>


        </div>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded max-w-36 " onClick={() => {
          const d = teamDetails.map((x) => {
            if (x.name === t) {
              let r = parseFloat(price) + parseFloat(x.spent)
              console.log("s", x[arr.Role])
              return { ...x, [`${arr.Role}`]: [...x[`${arr.Role}`], `${arr.playerName} (${arr.Rank})- ₹${price}crore`], spent: r.toFixed(2), remaining: (x.remaining - price).toFixed(2), }
            }
            return x
          })
          alert(`${arr.playerName} is sold to a ${t}`)
          setTeamDetails(d)
          window.localStorage.setItem("details", JSON.stringify(d))
          setCount(s=>s+1)
        }}>
          ADD player
        </button>

      </div>



    <TabGroup className="w-11/12 mx-auto mt-10">
      <TabList className=" w-full flex gap-x-1 border-b border-gray-200">
        <Tab
          className={({ selected }) =>
            `py-3 px-4 text-sm font-medium rounded-t-lg ${
              selected
                ? 'bg-white text-blue-600 border-b-transparent'
                : 'bg-gray-50 text-gray-500 hover:text-gray-700'
            }`
          }
        >
          Qualified
        </Tab>
        <Tab
          className={({ selected }) =>
            `py-3 px-4 text-sm font-medium rounded-t-lg ${
              selected
                ? 'bg-white text-blue-600 border-b-transparent'
                : 'bg-gray-50 text-gray-500 hover:text-gray-700'
            }`
          }
        >
          disQualified
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TeamList teamDetails={teamDetails} />
        </TabPanel>
        <TabPanel>
          <TeamList teamDetails={disteam} />
        </TabPanel>
      </TabPanels>
    </TabGroup>

  


    </>
  )
}

export default App;
