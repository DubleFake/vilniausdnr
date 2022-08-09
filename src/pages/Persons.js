import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import Options from "../components/Persons/options/Options"
import PersonInfo from "../components/Persons/personInfo/PersonInfo"
import { persons } from "../utils/personsArcgisItems"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"

import Box from "@mui/material/Box"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent"

const Persons = () => {
	const [selectedObject, setSelectedObject] = useState("")
	const [initialLoading, setInitialLoading] = useState(true)
	const [initialObjectsList, setInitialObjectsList] = useState([])

	useEffect(() => {
		persons
			.queryFeatures({
				outFields: ["Vardas_lietuviskai", "Pavarde_lietuviskai", "Asmenybes_ID"],
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
				<Route path=":globalID" element={<PersonInfo />} />
			</Route>
		</Routes>
	)
}

export default Persons
