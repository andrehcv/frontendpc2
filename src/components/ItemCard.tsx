import {Link} from "react-router-dom";
import type {Item} from "../types";
import {DETAIL} from "../config";
import {cardClass} from "../ui";

interface Props {
    item: Item;
}

export default function ItemCard ({item}: Props) {
    return(
        <Link to = {`${DETAIL}/${item.id}`} className = {`$CardClass} blockhover: bg-blue-50`}>
            <h2 className = "text-lg font-semibold text-blue-700"> 
            {item.title}
            </h2>
        <p> Autor: {item.author}</p>
        <p> Categoría: {item.category}</p>
        <p> Ejemplares disponibles: {item.availableCopies}

        </p>
        </Link>
    );
}