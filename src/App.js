import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
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
	})

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path=":lng" element={<Nav />}>
						<Route index element={<Home />} />
						<Route path={t(`nav.periods`) + "/*"} element={<Periods />} />
						<Route path={t(`nav.plaques`) + "/*"} element={<Plaques />} />
						<Route path={t(`nav.persons`) + "/*"} element={<Persons />} />
						<Route path={t(`nav.maps`) + "/*"} element={<Maps />} />
						<Route path={t(`nav.streets`) + "/*"} element={<Streets />} />
						<Route path={t(`nav.parts`) + "/*"} element={<Parts />} />
						<Route path={t(`nav.addresses`) + "/*"} element={<Addresses />} />
						<Route path={t(`nav.buildings`) + "/*"} element={<Buildings />} />
						<Route path={t(`nav.events`) + "/*"} element={<Events />} />
					</Route>
					{/* <Route path="*" element={<Navigate to={`/${i18n.language}`} />} /> */}
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
