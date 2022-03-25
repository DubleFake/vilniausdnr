import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import App from "./App"

import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"

ReactDOM.render(
	<Suspense
		fallback={
			<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
				<CircularProgress sx={{ position: "fixed", top: window.innerHeight / 2 + 25 }} color="inherit" />
			</Backdrop>
		}
	>
		<App />
	</Suspense>,
	document.querySelector("#root")
)
