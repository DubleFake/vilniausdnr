import React, { useState, useEffect } from "react"

import { map } from "../../../utils/mapsArcgisItems"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"

const CompareReview = (props) => {
	const [selectedGroup, setSelectedGroup] = useState("")
	const [selectedMap, setSelectedMap] = useState()

	useEffect(() => {
		// console.log(selectedMap)
		map.removeAll()
		map.add(selectedMap)
	}, [selectedMap])

	const handleGroupChange = (event) => {
		setSelectedGroup(props.groupList[event.target.value])
	}
	const handleMapChange = (event) => {
		setSelectedMap(props.mapList[event.target.value])
	}

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
				<FormControl
					sx={{
						mt: 1.5,
						width: "auto",
						minWidth: 125,
						backgroundColor: "white",
					}}
					variant="filled"
					size="small"
					id="swipe-select"
				>
					<InputLabel>Grupė</InputLabel>
					<Select label="Grupe" defaultValue="" onChange={handleGroupChange}>
						{props.groupList.map((group, index) => (
							<MenuItem sx={{ whiteSpace: "unset" }} key={index} value={index}>
								{group}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
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
				<FormControl
					sx={{
						bottom: 16,
						mt: -8,
						width: "auto",
						minWidth: 125,
						backgroundColor: "white",
					}}
					variant="filled"
					size="small"
					id="swipe-select"
				>
					<InputLabel>Žemėlapis</InputLabel>
					<Select label="Zemelapis" defaultValue="" onChange={handleMapChange}>
						{props.mapList.map((map, index) =>
							map.group === selectedGroup ? (
								<MenuItem sx={{ whiteSpace: "unset" }} key={index} value={index}>
									{map.title}
								</MenuItem>
							) : null
						)}
					</Select>
				</FormControl>
			</Grid>
		</>
	)
}

export default CompareReview
