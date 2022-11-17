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

import { createTheme, ThemeProvider, experimental_sx as sx } from "@mui/material/styles"

const App = () => {
	const { t, i18n } = useTranslation()
	intl.setLocale(`${i18n.language}`)

	const appBarHeight = 90
	const optionsWidth = 400

	const theme = createTheme({
		palette: {
			primary: {
				main: "#252525",
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

			MuiAppBar: {
				styleOverrides: {
					root: sx({
						height: appBarHeight,
					}),
				},
				defaultProps: {
					color: "primary",
				},
			},

			MuiGrid: {
				variants: [
					{
						props: {
							variant: "main",
						},
						style: {
							height: window.innerHeight - appBarHeight,
							overflowY: "auto",
							overflowX: "hidden",
							width: `calc(100vw - ${optionsWidth}px)`,
						},
					},
					{
						props: {
							variant: "options",
						},
						style: {
							width: optionsWidth,
							display: "flex",
							flexDirection: "column",
							overflow: "hidden",
						},
					},
					{
						props: {
							variant: "placeholder",
						},
						style: {
							height: `calc(100vh - ${appBarHeight}px)`,
						},
					},
					{
						props: {
							variant: "result",
						},
						style: {
							paddingLeft: 24,
							paddingRight: 24,
							marginTop: 4,
						},
					},
				],
			},

			MuiContainer: {
				variants: [
					{
						props: {
							variant: "placeholder",
						},
						style: {
							position: "absolute",
							backgroundColor: "#D7D7D7",
							height: window.innerHeight - appBarHeight,
							width: `calc(100vw - ${optionsWidth}px)`,
						},
					},
					{
						props: {
							variant: "filter",
						},
						style: {
							paddingTop: 0,
							paddingLeft: 24,
							paddingRight: 24,
							paddingBottom: 20,
							backgroundColor: "#F6F6F6",
						},
					},
					{
						props: {
							variant: "filterSearch",
						},
						style: {
							paddingTop: 20,
							paddingLeft: 24,
							paddingRight: 24,
							paddingBottom: 0,
							backgroundColor: "#F6F6F6",
						},
					},
				],
				defaultProps: {
					maxWidth: "false",
					disableGutters: true,
				},
			},

			MuiListItem: {
				variants: [
					{
						props: {
							variant: "tableItem",
						},
						style: {
							"&:hover": {
								transition: "0.3s",
								backgroundColor: "#F7D5D6",
							},
							"&.Mui-selected": {
								transition: "0.3s",
								color: "secondary.main",
								backgroundColor: "#F7D5D6",
							},
						},
					},
				],
			},

			MuiListItemButton: {
				variants: [
					{
						props: {
							variant: "tableItemButton",
						},
						style: {
							"&:hover": {
								backgroundColor: "rgba(0,0,0,0)",
							},
						},
					},
				],
			},

			MuiOutlinedInput: {
				variants: [
					{
						props: {
							variant: "outlined",
						},
						style: {
							marginTop: 20,
							borderRadius: "30px",
							borderColor: "rgba(0,0,0,0)",
							backgroundColor: "white",
							boxShadow: "0px 4px 3px 0px rgba(191,191,191,0.75)",
							height: "50px",
						},
					},
				],
			},

			MuiFormControl: {
				variants: [
					{
						props: {
							variant: "outlined",
						},
						style: {
							marginTop: 20,
							borderRadius: "30px",
							backgroundColor: "white",
							boxShadow: "0px 4px 3px 0px rgba(191,191,191,0.75)",
							height: "50px",
							width: "100%",
						},
					},
				],
			},

			MuiSelect: {
				variants: [
					{
						props: {
							variant: "outlined",
						},
						style: {
							borderRadius: "30px",
							height: "50px",
							backgroundColor: "white",
						},
					},
				],
			},
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
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
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
