import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Login } from "./Login.jsx";
import {NewUser } from "./NewUser.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<main className="">
			<NewUser/>
			 <p>------------------------login------------------------------------</p>
			<Login/>
		</main>
	);
}; 