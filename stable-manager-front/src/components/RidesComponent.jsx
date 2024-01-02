import RideComponent from "./RideComponent";

function RidesComponent(props)
{
    console.log("rides "+props.visits.length);
    return(
        <>
            <div className="container-fluid">
                {props.visits.length > 0 && props.visits[0].map((o)=>
                    <RideComponent details={o} setDetails={props.setDetails} setDisplayDetails={props.setDisplayDetails} />
                )}
                {props.visits.length === 0 &&
                    <div>Nothing to see here</div>
                }

            </div>

        </>
    );
}

export default RidesComponent;