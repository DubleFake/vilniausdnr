import React, { useState, useEffect } from "react"

import { map, map2, view, view2, objects, periods } from "../../../utils/periodsArcgisItems"

import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"

const CompareWindow = (props) => {
	const [selectedLeftPeriod, setSelectedLeftPeriod] = useState(0)
	const [selectedRightPeriod, setSelectedRightPeriod] = useState(5)

	const isMobile = useMediaQuery("(min-width:600px)")

	useEffect(() => {
		map.removeAll()
		map2.removeAll()

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
				view2.constraints.geometry = {
					type: "extent",
					spatialReference: response.extent.spatialReference,
					xmin: response.extent.xmin,
					ymin: response.extent.ymin,
					xmax: response.extent.xmax,
					ymax: response.extent.ymax,
				}
			})

		// view.when(() => {
		// view.goTo({ target: periods[0].fullExtent.center, zoom: 4 })
		// view2.goTo({ target: periods[0].fullExtent.center, zoom: 4 })
		// })

		map.add(periods[0])
		map2.add(periods[5])

		props.setToggleCompareWindow(true)
	}, [])

	useEffect(() => {
		return () => {
			props.setToggleCompareWindow(false)

			map.removeAll()
			map2.removeAll()
			map.add(objects)

			objects
				.when(() => {
					return objects.queryExtent()
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
					view2.constraints.geometry = {
						type: "extent",
						spatialReference: response.extent.spatialReference,
						xmin: response.extent.xmin,
						ymin: response.extent.ymin,
						xmax: response.extent.xmax,
						ymax: response.extent.ymax,
					}
				})
		}
	}, [])

	const handleLeftSelect = (event) => {
		map.remove(periods[selectedLeftPeriod])
		map.add(periods[event.target.value])

		setSelectedLeftPeriod(event.target.value)
	}

	const handleRightSelect = (event) => {
		map2.remove(periods[selectedRightPeriod])
		map2.add(periods[event.target.value])

		setSelectedRightPeriod(event.target.value)
	}

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
			<FormControl
				sx={{
					bottom: 16,
					mt: -7.5,
					mr: isMobile ? 8 : 18,
					width: "auto",
					height: "45px",
					backgroundColor: "white",
					boxShadow: 0,
				}}
				variant="outlined"
				size="small"
				id="swipe-select"
			>
				<Select
					value={selectedLeftPeriod}
					onChange={handleLeftSelect}
					renderValue={(value) => (
						<Typography sx={{ color: "#D72E30" }}>
							<Typography sx={{ color: "black", display: "inline" }}>Kairė: </Typography>
							{periods[value].title}
						</Typography>
					)}
					MenuProps={{
						anchorOrigin: {
							vertical: "top",
							horizontal: "left",
						},
						transformOrigin: {
							vertical: "bottom",
							horizontal: "left",
						},
					}}
				>
					{periods.map(
						(object, index) =>
							index !== selectedRightPeriod && (
								<MenuItem
									sx={{
										whiteSpace: "unset",
										"&.Mui-selected": {
											color: "#D72E30",
											backgroundColor: "#F7D5D6",
										},
										justifyContent: "center",
									}}
									key={index}
									value={index}
								>
									{object.title}
								</MenuItem>
							)
					)}
				</Select>
			</FormControl>
			<FormControl
				sx={{
					bottom: 16,
					mt: -7.5,
					ml: isMobile ? 8 : 19.5,
					width: "auto",
					height: "45px",
					backgroundColor: "white",
					boxShadow: 0,
				}}
				variant="outlined"
				size="small"
				id="swipe-select"
			>
				<Select
					value={selectedRightPeriod}
					onChange={handleRightSelect}
					renderValue={(value) => (
						<Typography sx={{ color: "#D72E30" }}>
							<Typography sx={{ color: "black", display: "inline" }}>Dešinė: </Typography>
							{periods[value].title}
						</Typography>
					)}
					MenuProps={{
						anchorOrigin: {
							vertical: "top",
							horizontal: "left",
						},
						transformOrigin: {
							vertical: "bottom",
							horizontal: "left",
						},
					}}
				>
					{periods.map(
						(object, index) =>
							index !== selectedLeftPeriod && (
								<MenuItem
									sx={{
										whiteSpace: "unset",
										"&.Mui-selected": {
											color: "#D72E30",
											backgroundColor: "#F7D5D6",
										},
										justifyContent: "center",
									}}
									key={index}
									value={index}
								>
									{object.title}
								</MenuItem>
							)
					)}
				</Select>
			</FormControl>
		</Grid>
	)
}

export default CompareWindow
