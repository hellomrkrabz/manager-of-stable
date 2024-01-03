import CostComponent from "./CostComponent";

function CostsComponent(props)
{
    return(
        <>
            <div className="container-fluid overflow-auto">
                {props.costs.length > 0 && props.costs[0].map((o)=>
                    <CostComponent details={o}/>
                )}
                {props.costs.length === 0 &&
                    <div>Nothing to see here</div>
                }
            </div>
        </>
    );
}

export default CostsComponent;