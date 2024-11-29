import React from 'react'

export const TeamList = (props) => {
  const{teamDetails,className,...rest}=props
  return (
    <div className={`mx-auto w-full  ${className}`}  {...rest}>
    <h1 className='text-center text-2xl font-bold mb-10'>Teams</h1>
    <div className='w-10/12 flex flex-wrap mx-auto justify-evenly mb-4 gap-y-6 '>
      {teamDetails.map((x, index) => (
        <div className='w-full md:w-5/12 flex flex-col gap-2 items-center   rounded-md box-border min-w-52 shadow-lg p-2 bg-neutral-900 shadow-black ' key={index}>
          <h3 className="text-xl text-blue-600">{x.name}</h3>
          <p>Spent: ₹<span id="${team}-spent">{x.spent}</span> crore</p>
          <p>Remaining: ₹<span id="${team}-remaining">{x.remaining}</span> crore</p>


          <div className="w-full flex flex-col justify" ><h4 className="text-md text-blue-600 font-medium">Wicketkeeper:</h4>
            <ul className="w-full flex flex-col justify-evenly items-start"

            >{x.Wicketkeeper.map((x, index) =>
              <li key={index} >{x}</li>
            )}</ul></div>
          <div className="w-full flex flex-col justify" ><h4 className="text-md text-blue-600 font-medium">Bowler:</h4><ul className="w-full flex flex-col justify-evenly items-start">{x.Bowler.map((x, index) =>
            <li key={index} >{x}</li>
          )}</ul></div>
          <div className="w-full flex flex-col justify" ><h4 className="text-md text-blue-600 font-medium">Batsman:</h4><ul className="w-full flex flex-col justify-evenly items-start">{x.Batsman.map((x, index) =>
            <li key={index} >{x}</li>
          )}</ul></div>
          <div className="w-full flex flex-col justify" ><h4 className="text-md text-blue-600 font-medium">All rounders:</h4><ul className="w-full flex flex-col justify-evenly items-start">{x["All-rounder"].map((x, index) =>
            <li key={index} >{x}</li>
          )}</ul></div>
          <div className="w-full flex flex-col justify" ><h4 className="text-md text-blue-600 font-medium"> Finisher:</h4><ul className="w-full flex flex-col justify-evenly items-start">{x.Finisher.map((x, index) =>
            <li key={index} >{x}</li>
          )}</ul></div>

        </div>
      ))}
    </div>
  </div>
  )
}
