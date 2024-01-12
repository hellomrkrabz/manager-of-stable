import VisitComponent from "./VisitComponent";

function VisitsComponent(props)
{
    console.log("kunie "+props.visits.length);
    return(
        <>
            <div className="container-fluid">
                    {props.visits.length > 0 && props.visits[0].map((o)=>
                            <VisitComponent details={o} setDetails={props.setDetails} setDisplayDetails={props.setDisplayDetails} />
                    )}
                    {props.visits.length === 0 &&
                        <div>Nothing to see here</div>
                    }

            </div>

        </>
    );
}

export default VisitsComponent;