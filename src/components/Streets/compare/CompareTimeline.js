import React, { useState, useEffect } from "react"

import { map, periods } from "../../../utils/streetsArcgisItems"

import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"

const CompareTimeline = (props) => {
	const [toggle1808, setToggle1808] = useState(true)
	const [toggle1845, setToggle1845] = useState(false)
	const [toggle1911, setToggle1911] = useState(false)
	const [toggle1938, setToggle1938] = useState(false)
	const [toggle1977, setToggle1977] = useState(false)
	const [toggle2021, setToggle2021] = useState(false)

	useEffect(() => {
		//protingesni sprendima?
		if (toggle1808) {
			map.add(periods[0])
		} else {
			map.remove(periods[0])
		}
	}, [toggle1808])

	useEffect(() => {
		if (toggle1845) {
			map.add(periods[1])
		} else {
			map.remove(periods[1])
		}
	}, [toggle1845])

	useEffect(() => {
		if (toggle1911) {
			map.add(periods[2])
		} else {
			map.remove(periods[2])
		}
	}, [toggle1911])

	useEffect(() => {
		if (toggle1938) {
			map.add(periods[3])
		} else {
			map.remove(periods[3])
		}
	}, [toggle1938])

	useEffect(() => {
		if (toggle1977) {
			map.add(periods[4])
		} else {
			map.remove(periods[4])
		}
	}, [toggle1977])

	useEffect(() => {
		if (toggle2021) {
			map.add(periods[5])
		} else {
			map.remove(periods[5])
		}
	}, [toggle2021])

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
