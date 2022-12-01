import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import './player.css';
import Queue from "../../components/queue";
import SongCard from "../../components/songCard";
import APIKit from '../../spotify';
import AudioPlayer from "../../components/audioPlayer";
import Widgets from "../../components/widgets";

export default function Player(){

    const location = useLocation();
    //console.log(location.state);
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    

    useEffect(()=>{
        if(location.state){
            apiClient.get("playlists/"+location.state?.id+"/tracks")
            .then(res=>{
                //console.log(res);
                setTracks(res.data.items);
                setCurrentTrack(res.data.items[0].track);
            });
        }
    },[location.state]);

    useEffect(()=>{
        setCurrentTrack(tracks[currentIndex]?.track);
    }, [currentIndex, tracks]);

    return(
        
        <div className="screen-containter flex">
            <div className="left-player-body">
                <AudioPlayer 
                    currentTrack={currentTrack} 
                    total={tracks} 
                    currentIndex={currentIndex} 
                    setCurrentIndex={setCurrentIndex}
                />
                <Widgets artistID={currentTrack?.album?.artists[0]?.id}/>
            </div>
            <div className="right-player-body">
            <SongCard album={currentTrack?.album} />
            <Queue tracks={tracks} setCurrentIndex={setCurrentIndex}/>
            </div>
        </div>
    );

    
}