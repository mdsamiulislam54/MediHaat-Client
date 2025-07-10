import { useContext } from "react"
import { UserContext } from "../../Contextapi/UserContext/UserContext"

export const UserAuth = ()=>{
    const user = useContext(UserContext);
    return user
}