import React from 'react'

function Comment1({name,comment}) {
  return (
    <div className="flex flex-col p-4" style={{backgroundColor:"#d6d6d6" ,width: "100%",
      height: "auto ", marginTop:10,borderRadius:10}}>
      <h1 className="m-1 font-semibold">
        {name}
      </h1>
      <h1 className="mt-0.2">
        {comment}
      </h1>
    </div>
  )
}

export default Comment1