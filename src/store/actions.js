import axios from "axios";
import { PUBLIC_API, dataToken } from "../utils/API";

export function getUser(){
    axios(`${PUBLIC_API}/api/v1/users`, {
        headers: {
            "authorization": `Bearer ${dataToken.content.token}`
        }
    })
    .then(({ data }) => {
        return data.content
    })
}

// getUser()

// export const dataUser = (data) => {
//     if(data) {
//         return data
//     }
// }
