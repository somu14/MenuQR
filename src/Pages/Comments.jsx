import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Comment1({ name, comment }) {
  return (
    <div className="bg-zinc-200 p-4  shadow mb-4 " style={{ borderRadius: 10 }}>
      <h3 className="text-lg font-bold text-gray-700">{name}</h3>
      <p>{comment}</p>
    </div>
  );
}

const Comments = () => {
  const { id } = useParams();
  const [comments, setcomment] = useState([]);
  const [username, setusername] = useState("");
  const [resturantname, setresturantname] = useState("");
  const [usercomment, setusercomment] = useState("");
  const [validate, setvalidate] = useState(false);

  const handleapi = async () => {
    try {
      const response = await axios.get(
        `https://menu-qr-server.vercel.app/home/comment/${id}`
      );
      setcomment(response.data.commentdata);
      setresturantname(response.data.restaurantname);
      //console.log(response.data.commentdata)
    } catch (err) {
      console.log("fetching error", err);
    }
  };
  useEffect(() => {
    handleapi();
  }, []);

  const handlepost = async (e) => {
    e.preventDefault();
    if (username === "" || usercomment === "") {
      setvalidate(true);
    } else {
      setvalidate(false);
      const commentdata = { name: username, comment: usercomment };
      try {
        setcomment([...comments, commentdata]);
        toast.success("Comment posted", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const response = await axios.post(
          `https://menu-qr-server.vercel.app/home/comment/${id}`,
          commentdata
        );
        setusername("");
        setusercomment("");
      } catch (err) {
        toast.error("Unknown Error", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("Not sent try again", err);
      }
    }
  };

  return (
    <div className="bg-red-400 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="items-center justify-center flex flex-col text-center mb-4">
        <div className="flex items-center justify-center w-full max-w-2xl mb-4 mt-4 relative">
          <NavLink to={`/${id}`} className="absolute right-56">
            <ArrowLeft size={40} color="white" className="" />
          </NavLink>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-zinc-200 font-semibold">
            {resturantname}
          </h1>
        </div>
        <h2 className="text-zinc-200 mt-2 text-sm sm:text-base">
          Developed By Tathagata Nayak
        </h2>
      </div>

      <div className="w-full bg-red-500 h-1"></div>

      <div className="w-full max-w-3xl  p-4 bg-red-200 rounded-lg">
        <form className="flex flex-col sm:flex-row sm:gap-2">
          <input
            className="p-2 rounded-lg mb-1 sm:mb-0 sm:flex-1"
            style={validate ? { borderColor: "red", borderWidth: 2 } : {}}
            placeholder="Name"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          {validate && (
            <p style={{ color: "red", fontSize: 15 }}>Name required</p>
          )}
          <input
            className="p-2 rounded-lg mt-2 mb-1 sm:mb-0 sm:flex-2"
            style={validate ? { borderColor: "red", borderWidth: 2 } : {}}
            placeholder="Comment"
            value={usercomment}
            onChange={(e) => {
              setusercomment(e.target.value);
            }}
          />
          {validate && (
            <p style={{ color: "red", fontSize: 15 }}>Comment required</p>
          )}
          <button
            onClick={handlepost}
            type="submit"
            className="p-2 mt-4 bg-red-400 text-white sm:w-32 rounded-lg"
            style={{ minWidth: "100px" }}
          >
            Send
          </button>
        </form>
      </div>

      {/* Comments section with responsive height */}
      <div className="p-4 w-full max-w-3xl">
        {comments.map((item, index) => (
          <Comment1 name={item.name} comment={item.comment} key={index} />
        ))}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Comments;
