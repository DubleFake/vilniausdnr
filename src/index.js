import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import App from "./App"

import "./i18n"
import "./css/index.css"

ReactDOM.render(
	<Suspense fallback="loading">
		<App />
	</Suspense>,
	document.querySelector("#root")
)
