import { useEffect, useState } from "react"


export default function Dishes(){

    const [dishes, setDishes] = useState([]);

    useEffect(()=>{

        let ignore = false;

        fetch("http://localhost:3000/api/dishes")
        .then((response) => response.json())
        .then((data) => {
            if(!ignore){
                setDishes(data);
            }
        }).catch((error) => console.log('Error: ', error));

        return () => {
            ignore = true;
        }

    },[])

    return(
        <div className="dishes">
            <h1>Lista de platos</h1>
            {dishes?.map((dish) => (
                <div key={dish.id} className="dish">
                    <h2>{dish.name}</h2>
                    <p>{dish.description}</p>
                    <p>Precio: {dish.price}</p>
                </div>
            ))}
        </div>
    )
}