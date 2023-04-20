import { UserProps } from "../types/user";
import Search from "../componets/Search"
import User from "../componets/User";
import { useState } from "react";
import Error from "../componets/Error";

const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    // state de errors, começa com false pq nao tem erro no inicio
    const [error, setError] = useState(false);

    const loadUser = async(userName: String) => {
        const res = await fetch(`http://api.github.com/users/${userName}`)
        
        const data  = await res.json();

        if(res.status === 404){

        }

        const {avatar_url, login, location, followers, following} = data

        const userData: UserProps = { 
            avatar_url,
            login,
            location, 
            followers,
            following,
        };
        
        setUser(userData);

    }
    return(
        <div>
            <Search loadUser={loadUser} />
            {user && <User {...user} />}
            {error && <Error/>}
        </div>
    );
};

export default Home
