export default function Die(props) {
    return(  
        <button 
        className="die"
        onClick={props.onClick}
        style={{backgroundColor: props.isHeld ?' #59e391 ': 'white'}}
        >
            {props.value}
        </button>
    )
}