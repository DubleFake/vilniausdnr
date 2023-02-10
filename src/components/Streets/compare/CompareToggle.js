import React, { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

import { objects, map, periods } from "../../../utils/streetsArcgisItems"
import CompareTimeline from "../compare/CompareTimeline"
import CompareSwipe from "../compare/CompareSwipe"
import CompareWindow from "../compare/CompareWindow"
import ObjectPopupTimeline from "../../../components/Streets/popup/ObjectPopupTimeline"
import CompareType from "./CompareType"

import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import useMediaQuery from "@mui/material/useMediaQuery"

const CompareLayers = (props) => {
	const navigate = useNavigate()
	const [initialPeriod, setInitialPeriod] = useState(periods[0])
	const [toggle1808, setToggle1808] = useState(true)
	const [toggle1845, setToggle1845] = useState(false)
	const [toggle1911, setToggle1911] = useState(false)
	const [toggle1938, setToggle1938] = useState(false)
	const [toggle1977, setToggle1977] = useState(false)
	const [toggle2023, setToggle2023] = useState(false)

	const isMobile = useMediaQuery("(min-width:600px)")

	useEffect(() => {
		if (window.location.href.includes("compare")) {
			props.setHistoryToggle(true)
		} else {
			map.removeAll()
			map.add(objects)
			props.setHistoryToggle(false)
		}
	}, [])

	return (
		<>
			<Grid
				sx={{ width: isMobile ? "100%" : "80%" }}
				variant="compareType"
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				<ButtonGroup sx={{ mt: 1.5, ml: isMobile ? -12.5 : -2.5 }}>
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
							<CompareTimeline
								setMapQuery={props.setMapQuery}
								initialPeriod={initialPeriod}
								toggle1808={toggle1808}
								setToggle1808={setToggle1808}
								toggle1845={toggle1845}
								setToggle1845={setToggle1845}
								toggle1911={toggle1911}
								setToggle1911={setToggle1911}
								toggle1938={toggle1938}
								setToggle1938={setToggle1938}
								toggle1977={toggle1977}
								setToggle1977={setToggle1977}
								toggle2023={toggle2023}
								setToggle2023={setToggle2023}
							/>
							<CompareType setHistoryToggle={props.setHistoryToggle} />
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
								setInitialPeriod={setInitialPeriod}
								setHistoryToggle={props.setHistoryToggle}
								setToggle1808={setToggle1808}
								setToggle1845={setToggle1845}
								setToggle1911={setToggle1911}
								setToggle1938={setToggle1938}
								setToggle1977={setToggle1977}
								setToggle2023={setToggle2023}
							/>
							<CompareTimeline
								setMapQuery={props.setMapQuery}
								initialPeriod={initialPeriod}
								toggle1808={toggle1808}
								setToggle1808={setToggle1808}
								toggle1845={toggle1845}
								setToggle1845={setToggle1845}
								toggle1911={toggle1911}
								setToggle1911={setToggle1911}
								toggle1938={toggle1938}
								setToggle1938={setToggle1938}
								toggle1977={toggle1977}
								setToggle1977={setToggle1977}
								toggle2023={toggle2023}
								setToggle2023={setToggle2023}
							/>
							<CompareType setHistoryToggle={props.setHistoryToggle} />
						</>
					}
				/>
				<Route
					path="compare/swipe"
					element={
						<>
							<CompareSwipe once={props.once} setOnce={props.setOnce} />
							<CompareType setHistoryToggle={props.setHistoryToggle} />
						</>
					}
				/>
				<Route
					path="compare/window"
					element={
						<>
							<CompareWindow setToggleCompareWindow={props.setToggleCompareWindow} />
							<CompareType setHistoryToggle={props.setHistoryToggle} />
						</>
					}
				/>
			</Routes>
		</>
	)
}

export default CompareLayers
