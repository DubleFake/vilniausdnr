import React, { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

import { map } from "../../../utils/mapsArcgisItems"
// import CompareTimeline from "../compare/CompareTimeline"
import CompareSwipe from "../compare/CompareSwipe"
import CompareWindow from "../compare/CompareWindow"
import CompareReview from "../compare/CompareReview"

import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import CompareType from "./CompareType"

const CompareLayers = (props) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (window.location.href.includes("compare")) {
			props.setHistoryToggle(true)
		}
	}, [])

	return (
		<>
			<Grid
				sx={{
					display: "none", //temp
					backgroundColor: "yellow",
					width: "100%",
					height: "0%",
					bottom: window.innerHeight - 90,
					position: "relative",
					zIndex: 2,
				}}
				container
				direction="row"
				justifyContent="center"
				alignItems="flex-start"
			>
				<ButtonGroup sx={{ mt: 1.5 }} variant="contained">
					<Button
						color={props.historyToggle ? "primary" : "secondary"}
						onClick={() => {
							map.removeAll()
							map.add(objects)
							props.setHistoryToggle(false)
							navigate("")
						}}
					>
						<Typography variant="button">dabartis</Typography>
					</Button>
					<Button
						color={props.historyToggle ? "secondary" : "primary"}
						onClick={() => {
							const url = window.location.href
							if (!url.includes("compare")) {
								props.setHistoryToggle(true)
								navigate("compare/timeline")
							}
						}}
					>
						<Typography variant="button">istorija</Typography>
					</Button>
				</ButtonGroup>
			</Grid>

			<Routes>
				<Route
					path="compare/review/:globalID"
					element={
						<>
							<CompareReview/>
							<CompareType />
						</>
					}
				/>
				<Route
					path="compare/review"
					element={
						<>
							<CompareReview/>
							<CompareType />
						</>
					}
				/>
				{/* <Route
					path="compare/timeline"
					element={
						<>
							<CompareTimeline />
							<CompareType />
						</>
					}
				/> */}
				<Route
					path="compare/swipe"
					element={
						<>
							<CompareSwipe />
							<CompareType />
						</>
					}
				/>
				<Route
					path="compare/window"
					element={
						<>
							<CompareWindow setToggleCompareWindow={props.setToggleCompareWindow} />
							<CompareType />
						</>
					}
				/>
			</Routes>
		</>
	)
}

export default CompareLayers
