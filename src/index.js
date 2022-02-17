import * as React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Periods from "./pages/Periods"
import Signs from "./pages/Signs"
import Persons from "./pages/Persons"
import Maps from "./pages/Maps"
import Streets from "./pages/Streets"
import Parts from "./pages/Parts"
import Addresses from "./pages/Addresses"
import Buildings from "./pages/Buildings"
import Events from "./pages/Events"
import Nav from "./components/Nav"
import "./css/index.css"

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route index element={<Home />} />
			<Route path="/" element={<Nav />}>
				<Route path="periodai" element={<Periods />} />
				<Route path="lentos" element={<Signs />} />
				<Route path="asmenybes" element={<Persons />} />
				<Route path="zemelapiai" element={<Maps />} />
				<Route path="gatves" element={<Streets />} />
				<Route path="dalys" element={<Parts />} />
				<Route path="adresai" element={<Addresses />} />
				<Route path="pastatai" element={<Buildings />} />
				<Route path="ivykiai" element={<Events />} />
			</Route>
		</Routes>
	</BrowserRouter>,
	document.querySelector("#root")
)
