import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import "./i18n"
import "./css/index.css"

const theme = createTheme({
	palette: {
		mode: "dark",
	},
})

ReactDOM.render(
	<Suspense fallback="loading">
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Suspense>,
	document.querySelector("#root")
)
