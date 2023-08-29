import {useEffect, useState} from 'react'
import axios from 'axios'

// @reduxjs/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {SET_ALL_STRAINS} from "redux/main/mainSlice"

// components and styles
import SeeandSaveStrain from "components/SeeandSaveStrain"
import styles from "./SeeandSaveStrainCont.module.scss"

// utils
import {usePromise} from "Contexts/Promises"

export default function SeeandSaveStrainCont() {
    const dispatch = useDispatch()

    const { setallstrainsPROMISE } = usePromise()

        useEffect( () => {          
        setallstrainsPROMISE()
        }, [])

        return <> <RENDER></RENDER> </>
}

function RENDER() {
    const ALL_STRAINS = useSelector( (state:RootState) => state.main.ALL_STRAINS)

    return (
        <>
        <pre className={styles.ghost}> sure </pre>    

            {   
            ALL_STRAINS &&
                ALL_STRAINS.map( (strains:any, index) => {
                    return (
                        <SeeandSaveStrain key={`strain${index}`} strain={strains.strain}/>
                    )
                })
            }

        <pre className={styles.ghost}> yeah </pre>        
        </>
    )
}