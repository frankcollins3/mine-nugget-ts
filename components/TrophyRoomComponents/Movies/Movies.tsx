import {useEffect, useState} from "react"
import $ from 'jquery'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./Movies.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { INCREMENT_VIDEO_SRC_ARRAY, RESET_VIDEO_SRC_ARRAY } from "redux/trophyRoom/trophyRoomSlice"

// import familyTreePairents from "vids/familytreePairents.mp4"

// utils
import {useImage} from "Contexts/Img"
import VideoPlayer from "./VideoPlayer/VideoPlayer"
import ReactPlayer from "react-player"
import { videoSrcArray } from "utility/utilityValues"


export default function Movies() {
    return <RENDER/>
}

function RENDER() {
    const { movieReel, singleReel } = useImage()
    const VIDEO_SRC_ARRAY_INDEX = useSelector( (state:RootState) => state.trophyRoom.VIDEO_SRC_ARRAY_INDEX)

    const test = () => {
        console.log("time for a big fast lol")
    }

    
    return (
        <Container id={styles.reelCont}>
         <Container className="singlereel" id={styles.singleReelCont}>
            {/* src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" */}

            {/* <ReactPlayer 
            url={videoSrcArray[0]}
            autoPlay={true}
            controls={true}
            muted={false}
            style={{ height: '200px', width: '200px', border: '5px solid maroon' }}
            /> */}
            <VideoPlayer/>

        </Container> 
        {/* <button style={{ height: '20px', width: '20px', backgroundColor: 'blue' }} onClick={test}/> */}
        </Container>
    )
}