import RideComponent from "./RideComponent";

function RidesComponent(props)
{
    console.log("rides "+props.rides.length);
    return(
        <>
            <div className="container-fluid overflow-auto">
                {props.rides.length > 0 && props.rides[0].map((o)=>
                    <RideComponent details={o}/>
                )}
                {props.rides.length === 0 &&
                    <div>Nothing to see here</div>
                }
            </div>
        </>
    );
}

export default RidesComponent;