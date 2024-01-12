import UserComponent from "./UserComponent"
import RideComponent from "./RideComponent";
function UsersComponent(props)
{
    return(
        <>
            <div className="container-fluid overflow-auto">
                {props.users.length > 0 && props.users[0].map((o)=>
                    <UserComponent details={o}/>
                )}
                {props.users.length === 0 &&
                    <div>Nothing to see here</div>
                }
            </div>
        </>
    );
}

export default UsersComponent;