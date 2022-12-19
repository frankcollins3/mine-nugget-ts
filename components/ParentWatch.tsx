export default function ParentWatch (props) {
    return (
        <div
        style={{ backgroundImage: `url('img/watch.png')`}}
         className="RingWatch">
            {/* <p> parent Watch </p> */}
            <p> {props.parents || 'nothing'} </p>
        </div>
    )
}