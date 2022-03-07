import React, { Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

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
			primary: {
				main: "#000000",
			},
			secondary: {
				main: "#D42323",
			},
		},
	})

	return (
		<Suspense fallback="kraunasi...">
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route path=":lng" element={<Nav />}>
							<Route index element={<Home />} />
							<Route path="periods/*" element={<Periods />} />
							<Route path="signs/*" element={<Signs />} />
							<Route path="persons/*" element={<Persons />} />
							<Route path="maps/*" element={<Maps />} />
							<Route path="streets/*" element={<Streets />} />
							<Route path="parts/*" element={<Parts />} />
							<Route path="addresses/*" element={<Addresses />} />
							<Route path="buildings/*" element={<Buildings />} />
							<Route path="events/*" element={<Events />} />
						</Route>
						<Route path="*" element={<Navigate to="/lt" />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Suspense>
	)
}

export default App
