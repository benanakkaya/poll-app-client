import React, { useState } from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const UsersContext = React.createContext();

export default function Users(props) {

    const [isLoginned, setIsLoginned] = useState(false);
    const [loginnedUser, setLoginnedUser] = useState({});
    const [votedPolls, setVotedPolls] = useState([]);


    useEffect(() => {
        const localToken = JSON.parse(localStorage.getItem("token"));
        const localVoted = JSON.parse(localStorage.getItem("votedPolls"));
        if (localVoted) {
            setVotedPolls(localVoted);  
        }
        if (localToken) {
            const decodedToken = jwt_decode(localToken, "SECRET_KEY");
            const nowTime = Date.now() / 1000;
            if (decodedToken.exp - nowTime < 0) {
                setIsLoginned(false);
                localStorage.setItem("token", JSON.stringify(null));
            } else {
                setIsLoginned(true);
                fetchLoginnedUserData(decodedToken.userID);
            }
        }
    }, [])

    const fetchLoginnedUserData = async (id) => {
        await axios.post("http://localhost:5000/users/fetchUserData", { id }).then((res) => {
            setLoginnedUser(res.data.userData)
        })
    }



    const values = {
        isLoginned,
        setIsLoginned,
        loginnedUser,
        setLoginnedUser,
        votedPolls,
        setVotedPolls
    };

    return (
        <UsersContext.Provider value={values}>
            {props.children}
        </UsersContext.Provider>
    )
}
