import React from "react";

function Cards({dishname,price}) {
  return (
    <div
    className=" bg-zinc-200"
      style={{
        width: "100%",
        height: 50,
        marginTop: 10,
        flexDirection:"row",
        display:"flex",
        justifyContent:"space-between",
        paddingLeft:20,
        paddingRight:20,
        borderRadius:10,
        alignItems:"center",
        marginBottom:10,
      }}
    >
      <h6 style={{fontSize:14}} className="text-gray-800 font-medium">
        {dishname}
      </h6>
      <h6 style={{fontSize:14}} className="text-gray-800 font-medium">
      ₹{price}
      </h6>
    </div>
  );
}

export default Cards;
