import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import Options from "../components/Persons/options/Options"
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
				outFields: ["*"],
				where: "",
				returnGeometry: false,
			})
			.then((response) => {
				if (response) {
					setInitialLoading(false)
					setInitialObjectsList(response.features)
					console.log(response)
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
				{/* <Route
					path="object/:globalID"
					element={
						<ObjectPopup
							mapQuery={mapQuery}
							setSelectedObject={setSelectedObject}
							initialLoading={initialLoading}
						/>
					}
				/>

				<Route path="person/:globalID" element={<PersonPopup initialLoading={initialLoading} />} /> */}
			</Route>
		</Routes>
	)
	// return (
	// 	<Box sx={{ maxHeight: window.innerHeight - 90, overflowY: "auto" }}>
	// 		<h2>{t("home.persons")}</h2>
	// 		<h2 style={{ textAlign: "center" }}>test timeline</h2>
	// 		<Timeline>
	// 			<TimelineItem>
	// 				<TimelineOppositeContent color="text.secondary">1950</TimelineOppositeContent>
	// 				<TimelineSeparator>
	// 					<TimelineDot />
	// 					<TimelineConnector />
	// 				</TimelineSeparator>
	// 				<TimelineContent>
	// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	// 					esse cillum dolore eu fugiat nulla pariatur.
	// 				</TimelineContent>
	// 			</TimelineItem>
	// 			<TimelineItem>
	// 				<TimelineOppositeContent color="text.secondary">1980</TimelineOppositeContent>
	// 				<TimelineSeparator>
	// 					<TimelineDot />
	// 					<TimelineConnector />
	// 				</TimelineSeparator>
	// 				<TimelineContent>
	// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	// 				</TimelineContent>
	// 			</TimelineItem>
	// 			<TimelineItem>
	// 				<TimelineOppositeContent color="text.secondary">1981</TimelineOppositeContent>
	// 				<TimelineSeparator>
	// 					<TimelineDot />
	// 					<TimelineConnector />
	// 				</TimelineSeparator>
	// 				<TimelineContent>
	// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	// 				</TimelineContent>
	// 			</TimelineItem>
	// 			<TimelineItem>
	// 				<TimelineOppositeContent color="text.secondary">1982</TimelineOppositeContent>
	// 				<TimelineSeparator>
	// 					<TimelineDot />
	// 					<TimelineConnector />
	// 				</TimelineSeparator>
	// 				<TimelineContent>
	// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	// 					esse cillum dolore eu fugiat nulla pariatur.
	// 				</TimelineContent>
	// 			</TimelineItem>
	// 			<TimelineItem>
	// 				<TimelineOppositeContent color="text.secondary">1983</TimelineOppositeContent>
	// 				<TimelineSeparator>
	// 					<TimelineDot />
	// 					<TimelineConnector />
	// 				</TimelineSeparator>
	// 				<TimelineContent>
	// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	// 					esse cillum dolore eu fugiat nulla pariatur.
	// 				</TimelineContent>
	// 			</TimelineItem>
	// 			<TimelineItem>
	// 				<TimelineOppositeContent color="text.secondary">1990</TimelineOppositeContent>
	// 				<TimelineSeparator>
	// 					<TimelineDot />
	// 					<TimelineConnector />
	// 				</TimelineSeparator>
	// 				<TimelineContent>
	// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	// 					esse cillum dolore eu fugiat nulla pariatur.
	// 				</TimelineContent>
	// 			</TimelineItem>
	// 			<TimelineItem>
	// 				<TimelineOppositeContent color="text.secondary">1995</TimelineOppositeContent>
	// 				<TimelineSeparator>
	// 					<TimelineDot />
	// 					<TimelineConnector />
	// 				</TimelineSeparator>
	// 				<TimelineContent>
	// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	// 					esse cillum dolore eu fugiat nulla pariatur.
	// 				</TimelineContent>
	// 			</TimelineItem>
	// 			<TimelineItem>
	// 				<TimelineOppositeContent color="text.secondary">1995</TimelineOppositeContent>
	// 				<TimelineSeparator>
	// 					<TimelineDot />
	// 					<TimelineConnector />
	// 				</TimelineSeparator>
	// 				<TimelineContent>
	// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	// 					esse cillum dolore eu fugiat nulla pariatur.
	// 				</TimelineContent>
	// 			</TimelineItem>
	// 			<TimelineItem>
	// 				<TimelineOppositeContent color="text.secondary">1995</TimelineOppositeContent>
	// 				<TimelineSeparator>
	// 					<TimelineDot />
	// 					<TimelineConnector />
	// 				</TimelineSeparator>
	// 				<TimelineContent>
	// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	// 					esse cillum dolore eu fugiat nulla pariatur.
	// 				</TimelineContent>
	// 			</TimelineItem>
	// 			<TimelineItem>
	// 				<TimelineOppositeContent color="text.secondary">1995</TimelineOppositeContent>
	// 				<TimelineSeparator>
	// 					<TimelineDot />
	// 					<TimelineConnector />
	// 				</TimelineSeparator>
	// 				<TimelineContent>
	// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	// 					esse cillum dolore eu fugiat nulla pariatur.
	// 				</TimelineContent>
	// 			</TimelineItem>
	// 			<TimelineItem>
	// 				<TimelineOppositeContent color="text.secondary">2000</TimelineOppositeContent>
	// 				<TimelineSeparator>
	// 					<TimelineDot />
	// 				</TimelineSeparator>
	// 				<TimelineContent>
	// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	// 					esse cillum dolore eu fugiat nulla pariatur.
	// 				</TimelineContent>
	// 			</TimelineItem>
	// 		</Timeline>
	// 	</Box>
	// )
}

export default Persons
