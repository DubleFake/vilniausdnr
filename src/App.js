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
import Foto from "./pages/Foto"
import Buildings from "./pages/Buildings"
import Events from "./pages/Events"
import Nav from "./components/Nav/Nav"
import "./i18n"
import "./css/index.css"

import { createTheme, ThemeProvider, experimental_sx as sx } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const App = () => {
	const { t, i18n } = useTranslation()
	intl.setLocale(`${i18n.language}`)

	const appBarHeight = 90
	const optionsWidth = 400
	const tabsHeight = 60

	const lightGray = "#EBEBEB"
	const darkGray = "#252525"
	const red = "#D72E30"

	const orgTheme = useTheme()
	const isDownSm = useMediaQuery(orgTheme.breakpoints.down("sm"))

	const theme = createTheme({
		palette: {
			primary: {
				main: darkGray,
			},
			secondary: {
				main: red,
			},
		},

		typography: {
			allVariants: {
				fontWeight: 450,
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
							width: isDownSm ? "100vw" : `calc(100vw - ${optionsWidth}px)`,
						},
					},
					{
						props: {
							variant: "options",
						},
						style: {
							width: isDownSm ? "100vw" : optionsWidth,
							height: window.innerHeight - appBarHeight,
							display: "flex",
							flexDirection: "column",
							overflow: "hidden",
						},
					},
					{
						props: {
							variant: "optionsTabs",
						},
						style: {
							width: optionsWidth,
							height: window.innerHeight - appBarHeight - tabsHeight,
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
					{
						props: {
							variant: "compareType",
						},
						style: {
							backgroundColor: "transparent",
							width: "100%",
							height: "0%",
							bottom: window.innerHeight - appBarHeight,
							position: "relative",
							zIndex: 2,
						},
					},
					{
						props: {
							variant: "compareMain",
						},
						style: {
							height: window.innerHeight - appBarHeight,
						},
					},
					{
						props: {
							variant: "compareTimelineButtons",
						},
						style: {
							backgroundColor: "transparent",
							width: "100%",
							height: "0%",
							bottom: 72,
							position: "relative",
							zIndex: 2,
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
							backgroundColor: lightGray,
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
							backgroundColor: lightGray,
						},
					},
					{
						props: {
							variant: "optionsDiv",
						},
						style: {
							width: optionsWidth,
						},
					},
					{
						props: {
							variant: "optionsVisualizeTab",
						},
						style: {
							width: optionsWidth,
							height: "100vh",
							display: "flex",
							flexDirection: "column",
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
								color: red,
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
					{
						props: {
							variant: "filled",
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
					{
						props: {
							variant: "filled",
						},
						style: {
							borderRadius: "30px",
							height: "50px",
							backgroundColor: "white",
						},
					},
				],
			},

			MuiCollapse: {
				variants: [
					{
						props: {
							variant: "outlined",
						},
						style: {
							maxWidth: optionsWidth,
						},
					},
				],
			},

			MuiTabs: {
				styleOverrides: {
					root: sx({
						"& .MuiTabs-indicator": {
							display: "flex",
							justifyContent: "center",
						},
					}),
				},
			},

			MuiTab: {
				styleOverrides: {
					root: sx({
						height: tabsHeight,
						backgroundColor: lightGray,
					}),
				},
			},

			MuiToggleButton: {
				variants: [
					{
						props: {
							variant: "optionsToggle",
						},
						style: {
							position: "fixed",
							zIndex: 2,
							height: "20vh",
							top: `calc(40vh + ${appBarHeight / 2}px)`,
							width: "25px",
							backgroundColor: red,
							borderRadius: 0,
							transition: "0.3s",
							"&:hover": {
								backgroundColor: red,
							},
						},
					},
				],
			},

			MuiCard: {
				variants: [
					{
						props: {
							variant: "popup",
						},
						style: {
							borderRadius: "0px",
							width: isDownSm ? "100%" : 500,
							backgroundColor: darkGray,
							top: 0 + appBarHeight,
							right: 0,
							position: "fixed",
							zIndex: 3,
							maxHeight: window.innerHeight - appBarHeight - 16,
							overflowY: "auto",
							overflowX: "hidden",
						},
					},
				],
			},

			MuiButton: {
				variants: [
					{
						props: {
							variant: "timeline",
						},
						style: {
							boxSizing: "border-box",
							width: "98px",
							height: "45px",
							border: "1px solid rgba(255, 255, 255, 0.2)",
							borderRadius: "30px",
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
						<Route path="foto/*" element={<Foto />} />
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
