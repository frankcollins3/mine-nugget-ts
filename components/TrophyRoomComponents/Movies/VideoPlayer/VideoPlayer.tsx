import {useEffect, useState} from "react"

// components and styles
import Container from "react-bootstrap/Container"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { INCREMENT_VIDEO_SRC_ARRAY, RESET_VIDEO_SRC_ARRAY } from "redux/trophyRoom/trophyRoomSlice"


// utils
import {useImage} from "Contexts/Img"
import ReactPlayer from "react-player"
import { videoSrcArray } from "utility/utilityValues"

export default function VideoPlayer() {
    return <RENDER/>
}

function RENDER() {
    const VIDEO_SRC_ARRAY_INDEX = useSelector( (state:RootState) => state.trophyRoom.VIDEO_SRC_ARRAY_INDEX)


    return (
        <>
            <ReactPlayer 
                url={videoSrcArray[VIDEO_SRC_ARRAY_INDEX]}
                // url="vids/userProfileAllUserFeed.mp4"
                autoPlay={true}
                controls={true}
                muted={true}
                style={{ height: '100px', width: '100px', transform: 'scale(0.5)' }}
            />
        </>
    )
}