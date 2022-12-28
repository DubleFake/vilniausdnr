import React, { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

import { objects, map } from "../../../utils/buildingsArcgisItems"
import CompareTimeline from "../compare/CompareTimeline"
import CompareSwipe from "../compare/CompareSwipe"
import CompareWindow from "../compare/CompareWindow"

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
				<ButtonGroup sx={{ mt: 1.5 }}>
					<Button
						variant="timeline"
						sx={{
							width: 95,
							backgroundColor: props.historyToggle ? "white" : "#D72E30",
							color: props.historyToggle ? "black" : "white",
							"&:hover": {
								backgroundColor: props.historyToggle ? "white" : "#D72E30",
							},
						}}
						onClick={() => {
							map.removeAll()
							map.add(objects)
							props.setHistoryToggle(false)
							navigate("")
						}}
					>
						<Typography
							sx={{
								textTransform: "none",
								fontSize: "16px",
								fontWeight: 500,
							}}
							variant="button"
						>
							Dabartis
						</Typography>
					</Button>
					<Button
						variant="timeline"
						sx={{
							width: 95,
							backgroundColor: props.historyToggle ? "#D72E30" : "white",
							color: props.historyToggle ? "white" : "black",
							"&:hover": {
								backgroundColor: props.historyToggle ? "#D72E30" : "white",
							},
						}}
						onClick={() => {
							const url = window.location.href
							if (!url.includes("compare")) {
								props.setHistoryToggle(true)
								navigate("compare/timeline")
							}
						}}
					>
						<Typography
							sx={{
								textTransform: "none",
								fontSize: "16px",
								fontWeight: 500,
							}}
							variant="button"
						>
							Praeitis
						</Typography>
					</Button>
				</ButtonGroup>
			</Grid>

			<Routes>
				<Route
					path="compare/timeline"
					element={
						<>
							<CompareTimeline />
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
