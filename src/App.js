import React, { Suspense } from "react"
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
import Nav from "./components/Nav/Nav"
import "./i18n"
import "./css/index.css"

import { createTheme, ThemeProvider } from "@mui/material/styles"

const App = () => {
	const theme = createTheme({
		palette: {
			mode: "light",
		},
	})

	return (
		<Suspense fallback="kraunasi...">
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Nav />}>
							<Route index element={<Home />} />
							<Route path="periodai/*" element={<Periods />} />
							<Route path="lentos/*" element={<Signs />} />
							<Route path="asmenybes/*" element={<Persons />} />
							<Route path="zemelapiai/*" element={<Maps />} />
							<Route path="gatves/*" element={<Streets />} />
							<Route path="dalys/*" element={<Parts />} />
							<Route path="adresai/*" element={<Addresses />} />
							<Route path="pastatai/*" element={<Buildings />} />
							<Route path="ivykiai/*" element={<Events />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Suspense>
	)
}

export default App
