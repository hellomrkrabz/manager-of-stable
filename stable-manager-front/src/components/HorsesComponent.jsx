import HorseComponent from "./HorseComponent";
import { v4 } from "uuid";

function HorsesComponent(props)
{
    console.log("kunie "+props.horses.length);
    return(
        <>
            <div className="container-fluid">
                <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 gy-3 gx-3 mt-5">
                    {props.horses.map((o)=>
                        <div key={v4()}>
                            <HorseComponent details={o} setDetails={props.setDetails} setDisplayDetails={props.setDisplayDetails} />
                        </div>
                    )}
                    {props.horses.length === 0 &&
                        <div>Nothing to see here</div>
                    }
                </div>
            </div>

        </>
    );
}

export default HorsesComponent;