import { useEffect, useRef, useState } from 'react'
import { players } from '../team'
import { TeamList } from './TeamList'
import '../App.css'
import DialogBox from './Dialog'
import { Toggle } from './Toggle'



function App() {
// window.localStorage.removeItem("count")
  const [playersDetails] = useState(players)
  const [tog, setTog] = useState(true)
  const [arr, setArr] = useState(playersDetails[0])
  const [count, setCount] = useState(parseInt(window.localStorage.getItem("count")) || 0)
  const [isopen, setIsOpen] = useState(false)
  const [isopenAdd, setIsOpenAdd] = useState(false)
  const [price, setPrice] = useState(parseFloat(arr.basePrice))
  const [teamArr, setTeamArr] = useState([
    "Chennai Super Kings",
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
  const [t, setT] = useState("")

  const [teamDetails, setTeamDetails] = useState(JSON.parse(window.localStorage.getItem("details")) || teamArr.map(x => {
    return {
      name: x, spent: 0,
      remaining: 80,
      Wicketkeeper: [],
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
    window.localStorage.setItem("count",count)
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
  useEffect(() => {
    setT(teamArr[0])

  }, [teamArr])

  // useEffect(()=>{
  //   const hadnle=(e)=>{
  //     console.log("sd")
  //     if(e.key==="Enter"){
  //       setIsOpen(false)
  //     }
  //   }
  //   document.querySelector("body").addEventListener("keypress",hadnle);
  //   return(()=>{
  //     document.querySelector("body").removeEventListener("keypress",hadnle);
  //   })
  // },[isopen])
  return (
    <>
      <header className='min-h-16 bg-neutral-800 flex justify-center items-center mt-0 '>
        <h1 className=' text-white font-extrabold text-3xl'>IPL 2024 Auction Tracker</h1>
      </header>
      <div className=' w-11/12 flex flex-col  gap-10 mx-auto mt-3 '>
        <div className='w-full flex justify-between flex-wrap gap-4'>

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
            if (count > playersDetails.length || count === 0) {
              setCount(0)
              return
            }
            setCount(s => {
              s -= 1
              return s
            })

          }
          }>
            Previous Bid
          </button>
          <button className="bg-transparent hover:bg-blue-500 max-w-32  text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded " onClick={() => {
            setIsOpen(true)

          }
          }>
            reset
          </button>
        </div>

        <div className=' mx-auto w-full min-h-44 shadow-xl flex flex-wrap gap-14 py-10 px-1 justify-center rounded-xl bg-neutral-900 shadow-black'>
          {Object.keys(arr).map((x, index) => (
            <div className=' flex gap-2 items-center flex-wrap justify-center text-pretty text-white' key={index}>
              <label htmlFor={x}>{x}&nbsp;:</label>
              <input type="text" name={x} required className='bg-neutral-800 rounded-md p-2 text-gray-400 w-5/12 ' value={arr[x]} readOnly />
            </div>
          ))}

          <div className='flex gap-2 items-center flex-wrap justify-center text-pretty text-white'>
            <label htmlFor="team" className='text-white'>Select Team:&nbsp;</label>
            <select id="team" className='p-3 border-2 bg-neutral-800 rounded-md border-neutral-800 text-white  ' required onChange={hh}>
              {teamArr.map((x, index) =>
                <option value={x} key={index}>{x}</option>
              )}
            </select>
          </div>
          <div className=' flex gap-2 items-center flex-wrap justify-center text-pretty text-white'>
            <label htmlFor="playerPrice" className='text-white'>Price (in Crores): &nbsp;</label>
            <input type="number" id="playerPrice" required step={(price >= 5 ? 0.25 : 0.20)} value={price} className=' border-2 w-5/12 bg-neutral-800 rounded-md border-neutral-800 text-white p-2' onChange={h} />
          </div>


        </div>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded max-w-36 "
          onClick={() => {
            setIsOpenAdd(true)

          }}>
          ADD player
        </button>

      </div>


      <Toggle displayDQList={disteam} displayQList={teamDetails} />


      <DialogBox
        open={isopen}
        title={"Log Data"}
        description={"This will permanently delete your  data"}
        info={"Are you sure you want to delete this records? All of your data will be permanently removed."}
        functionHandle={() => {
          window.localStorage.removeItem("details")
          window.localStorage.removeItem("disteam")
          window.localStorage.removeItem("count")
          window.location.reload()
        }}
        cancelFunction={() => {
          setIsOpen(false)
        }} />

      <DialogBox
        open={isopenAdd}
        title={"ADD..."}
        description={"This will permanently update your  data"}
        info={` ${arr.playerName} will be sold to ${t} at ${price} Crores.`}
        functionHandle={() => {
          setIsOpenAdd(true)
          const d = teamDetails.map((x) => {
            if (x.name === t) {
              let r = parseFloat(price) + parseFloat(x.spent)
              let rem = parseFloat(x.remaining) - parseFloat(price)
              console.log("s", x[arr.Role])
              return { ...x, [`${arr.Role}`]: [...x[`${arr.Role}`], `${arr.playerName} (${arr.Rank})- ₹${price}crore`], spent: r.toFixed(3), remaining: rem.toFixed(3), }
            }
            return x
          })
          setTeamDetails(d)
          window.localStorage.setItem("details", JSON.stringify(d))
          setCount(s => s + 1)
          window.localStorage.setItem("count",count)
          setIsOpenAdd(false)
        }}
        cancelFunction={() => {
          setIsOpenAdd(false)
        }} />

    </>
  )
}

export default App;
