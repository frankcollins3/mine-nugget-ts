// utils
import {useImage} from "Contexts/Img"

export default function LoadingCoin() {
    return <RENDER/>
}

function RENDER() {
    const { coin } = useImage()

    return (
        <img className="ZindexCoin " style={{ height: '50px', width: '50px' }} src={coin}/>
    )
}