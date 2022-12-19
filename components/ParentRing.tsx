
import { propTypes } from "react-bootstrap/esm/Image";

export default function ParentRing (props) {
    return (
        <div
        style={{ backgroundImage: `url('img/ring.png')`}}
         className="RingWatch">
            <p> {props.parents || 'nothing'} </p>
        </div>
    )
}