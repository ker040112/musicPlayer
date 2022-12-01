import React, { useEffect, useState } from "react";
import './sidebar.css';
import SidebarButton from "./sidebarButton";
import {MdFavorite} from "react-icons/md";
import {FaGripfire, FaPlay} from "react-icons/fa";
import {IoLibrary} from "react-icons/io5";
import {MdSpaceDashboard} from "react-icons/md";
import {FaSignOutAlt} from "react-icons/fa";
import apiClient from "../../spotify";



export default function Sidebar(){
    const [image, setImage] = useState(
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MDlfMjY4%2FMDAxNjI4NTAzNTY1ODg5.rTzxshRFK1GB48-2f6B_B5mvYlJllvEs8pAfKGjHWCsg.mHkI040uV0nBu6YeOpNRrlf1hgHXpQhp9UiexfMhLacg.JPEG.dddaaakkk222%2FIMG_5036.JPG&type=sc960_832"
    );

    useEffect(()=>{
        apiClient.get("me").then(response => {
            setImage(response.data.images[0].url);
        });
    }, []);

    return (
    <div className="sidebar-container">
        <img src={image}
        className="profile-img" alt="profile-img"></img>
        <div>
            <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />}/>
            <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />}/>
            <SidebarButton title="Player" to="/player" icon={<FaPlay/>}/>
            <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite/>}/>
            <SidebarButton title="Library" to="/" icon={<IoLibrary/>}/>
        </div>
        <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt/>}/>
    </div>
    );
}