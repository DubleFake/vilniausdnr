import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import Options from "../components/Events/options/Options"
import EventInfo from "../components/Events/EventInfo/EventInfo"
import { events } from "../utils/eventsArcgisItems"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"

const Persons = () => {
	const [selectedObject, setSelectedObject] = useState("")
	const [initialLoading, setInitialLoading] = useState(true)
	const [initialObjectsList, setInitialObjectsList] = useState([])

	useEffect(() => {
		events
			.queryFeatures({
				outFields: ["*"],
				where: "",
				returnGeometry: false,
			})
			.then((response) => {
				if (response) {
					setInitialLoading(false)
					setInitialObjectsList(response.features)
				}
			})
	}, [])

	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<Grid container spacing={0}>
							{/* <Backdrop
								sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
								open={initialLoading}
							>
								<CircularProgress
									sx={{ position: "fixed", top: window.innerHeight / 2 + 25 }}
									color="inherit"
								/>
							</Backdrop> */}
							<Options
								initialObjectsList={initialObjectsList}
								setSelectedObject={setSelectedObject}
								selectedObject={selectedObject}
							/>
            <Outlet />
						</Grid>
					</>
				}
			>
				<Route path=":globalID" element={<EventInfo />} />
			</Route>
		</Routes>
	)
}

export default Persons
