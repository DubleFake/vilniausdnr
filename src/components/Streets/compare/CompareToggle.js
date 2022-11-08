import React, { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

import { objects, map } from "../../../utils/streetsArcgisItems"
import CompareTimeline from "../compare/CompareTimeline"
import CompareSwipe from "../compare/CompareSwipe"
import CompareWindow from "../compare/CompareWindow"
import ObjectPopupTimeline from "../../../components/Streets/popup/ObjectPopupTimeline"

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
						sx={{ width: 95 }}
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
						sx={{ width: 95 }}
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
					path="compare/timeline"
					element={
						<>
							<CompareTimeline setMapQuery={props.setMapQuery} />
							<CompareType />
						</>
					}
				/>
				<Route
					path="compare/timeline/:globalID"
					element={
						<>
							<ObjectPopupTimeline
								mapQuery={props.mapQuery}
								setSelectedObject={props.setSelectedObject}
								initialLoading={props.initialLoading}
							/>
							<CompareTimeline setMapQuery={props.setMapQuery} />
							<CompareType />
						</>
					}
				/>
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
