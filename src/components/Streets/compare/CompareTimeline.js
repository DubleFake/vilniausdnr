import React, { useState, useEffect } from "react"

import { map, view, view2, objects, periods } from "../../../utils/streetsArcgisItems"

import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

const CompareTimeline = (props) => {
	const [toggle1808, setToggle1808] = useState(true)
	const [toggle1845, setToggle1845] = useState(false)
	const [toggle1911, setToggle1911] = useState(false)
	const [toggle1938, setToggle1938] = useState(false)
	const [toggle1977, setToggle1977] = useState(false)
	const [toggle2021, setToggle2021] = useState(false)

	useEffect(() => {
		map.removeAll()

		periods[0]
			.when(() => {
				return periods[0].queryExtent()
			})
			.then((response) => {
				view.constraints.geometry = {
					type: "extent",
					spatialReference: response.extent.spatialReference,
					xmin: response.extent.xmin,
					ymin: response.extent.ymin,
					xmax: response.extent.xmax,
					ymax: response.extent.ymax,
				}
			})

		view
			.when(() => {
				view.goTo({ target: periods[0].fullExtent.center, zoom: 4 })
			})
	}, [])

	useEffect(() => {
		//protingesni sprendima?
		if (toggle1808) {
			map.add(periods[0])
		} else {
			map.remove(periods[0])
		}

		if (toggle1845) {
			map.add(periods[1])
		} else {
			map.remove(periods[1])
		}

		if (toggle1911) {
			map.add(periods[2])
		} else {
			map.remove(periods[2])
		}

		if (toggle1938) {
			map.add(periods[3])
		} else {
			map.remove(periods[3])
		}

		if (toggle1977) {
			map.add(periods[4])
		} else {
			map.remove(periods[4])
		}

		if (toggle2021) {
			map.add(periods[5])
		} else {
			map.remove(periods[5])
		}
	}, [toggle1808, toggle1845, toggle1911, toggle1938, toggle1977, toggle2021])

	return (
		<Grid
			sx={{
				backgroundColor: "yellow",
				width: "100%",
				height: "0%",
				position: "relative",
			}}
			container
			direction="row"
			justifyContent="center"
			alignItems="flex-start"
		>
			<ButtonGroup
				sx={{
					bottom: 16,
					mt: -8.5,
					// width: 150,
					// height: 48,
				}}
				variant="contained"
			>
				<Button
					sx={{ borderRadius: 0, backgroundColor: toggle1808 && "#55AFB0" }}
					size="large"
					variant="contained"
					onClick={() => {
						setToggle1808(!toggle1808)
					}}
				>
					<Typography variant="button">1808</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: toggle1845 && "#407D5C" }}
					size="large"
					variant="contained"
					onClick={() => {
						setToggle1845(!toggle1845)
					}}
				>
					<Typography variant="button">1845</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: toggle1911 && "#007FCC" }}
					size="large"
					variant="contained"
					onClick={() => {
						setToggle1911(!toggle1911)
					}}
				>
					<Typography variant="button">1911</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: toggle1938 && "#823F86" }}
					size="large"
					variant="contained"
					onClick={() => {
						setToggle1938(!toggle1938)
					}}
				>
					<Typography variant="button">1938</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: toggle1977 && "#EE5066" }}
					size="large"
					variant="contained"
					onClick={() => {
						setToggle1977(!toggle1977)
					}}
				>
					<Typography variant="button">1977</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: toggle2021 && "#FFAF28" }}
					size="large"
					variant="contained"
					onClick={() => {
						setToggle2021(!toggle2021)
					}}
				>
					<Typography variant="button">2021</Typography>
				</Button>
			</ButtonGroup>
		</Grid>
	)
}

export default CompareTimeline
