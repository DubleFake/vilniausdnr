import React from "react"
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom"
import { useTranslation } from "react-i18next"
import * as intl from "@arcgis/core/intl"

import Home from "./pages/Home"
import Periods from "./pages/Periods"
import Plaques from "./pages/Plaques"
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
	const { t, i18n } = useTranslation()
	intl.setLocale(`${i18n.language}`)

	const theme = createTheme({
		palette: {
			primary: {
				main: "#000000",
			},
			secondary: {
				main: "#D42323",
			},
		},
		components: {
			MuiLink: {
				defaultProps: {
					color: "secondary",
				},
			},
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<HashRouter>
				<Routes>
					<Route path="/vilniausdnr/:lng" element={<Nav />}>
						<Route index element={<Home />} />
						<Route path="periods/*" element={<Periods />} />
						<Route path="plaques/*" element={<Plaques />} />
						<Route path="persons/*" element={<Persons />} />
						<Route path="maps/*" element={<Maps />} />
						<Route path="streets/*" element={<Streets />} />
						<Route path="parts/*" element={<Parts />} />
						<Route path="addresses/*" element={<Addresses />} />
						<Route path="buildings/*" element={<Buildings />} />
						<Route path="events/*" element={<Events />} />
					</Route>
					<Route path="*" element={<Navigate to={`/vilniausdnr/${i18n.language}`} />} />
				</Routes>
			</HashRouter>
		</ThemeProvider>
	)
}

export default App
