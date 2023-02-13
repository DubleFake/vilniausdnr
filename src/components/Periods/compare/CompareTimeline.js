import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { map, view, objects, periods } from "../../../utils/periodsArcgisItems"

import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Slider from "@mui/material/Slider"
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"

const CompareTimeline = (props) => {
	const { globalID } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const [sliderValue, setSliderValue] = useState(100)

	const isMobile = useMediaQuery("(min-width:600px)")

	const handleSliderChange = (event, newValue) => {
		map.layers.items[0].opacity = newValue / 100
		setSliderValue(newValue)
	}

	useEffect(() => {
		if (globalID) {
			map.removeAll()

			const foundPeriod = periods.find((period) => String(period.metai) === globalID)

			map.add(foundPeriod)
			foundPeriod
				.when(() => {
					const oldOpacity = sliderValue
					setSliderValue(100)
					handleSliderChange({}, oldOpacity)
					return foundPeriod.queryExtent()
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

			// view.when(() => {
			// 	view.goTo({ target: foundPeriod.fullExtent.center, zoom: 4 })
			// })
		} else {
			navigate(String(periods[0].metai))
		}
	}, [globalID])

	useEffect(() => {
		return () => {
			setSliderValue(100)
			const foundPeriod = periods.find((period) => String(period.metai) === globalID)
			foundPeriod.opacity = 1

			map.removeAll()
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
				})
		}
	}, [])

	return (
		<>
			<Grid
				variant="compareTimelineButtons"
				container
				direction="row"
				justifyContent="center"
				alignItems="flex-start"
			>
				<ButtonGroup>
					<Button
						sx={{
							background: globalID === String(periods[0].metai) ? "#55AFB0" : "white",
							color: globalID === String(periods[0].metai) ? "white" : "black",
							"&:hover": {
								backgroundColor: "#55AFB0",
								color: "white",
							},
							width: isMobile ? "auto" : 50,
						}}
						size="large"
						variant="timeline"
						onClick={() => {
							navigate(
								`/vilniausdnrtest/${i18n.language}/periods/compare/timeline/${String(periods[0].metai)}`
							)
						}}
					>
						<Typography variant="button">1808</Typography>
					</Button>
					<Button
						sx={{
							background: globalID === String(periods[1].metai) ? "#407D5C" : "white",
							color: globalID === String(periods[1].metai) ? "white" : "black",
							"&:hover": {
								backgroundColor: "#407D5C",
								color: "white",
							},
							width: isMobile ? "auto" : 50,
						}}
						size="large"
						variant="timeline"
						onClick={() => {
							navigate(
								`/vilniausdnrtest/${i18n.language}/periods/compare/timeline/${String(periods[1].metai)}`
							)
						}}
					>
						<Typography variant="button">1845</Typography>
					</Button>
					<Button
						sx={{
							background: globalID === String(periods[2].metai) ? "#007FCC" : "white",
							color: globalID === String(periods[2].metai) ? "white" : "black",
							"&:hover": {
								backgroundColor: "#007FCC",
								color: "white",
							},
							width: isMobile ? "auto" : 50,
						}}
						size="large"
						variant="timeline"
						onClick={() => {
							navigate(
								`/vilniausdnrtest/${i18n.language}/periods/compare/timeline/${String(periods[2].metai)}`
							)
						}}
					>
						<Typography variant="button">1911</Typography>
					</Button>
					<Button
						sx={{
							background: globalID === String(periods[3].metai) ? "#823F86" : "white",
							color: globalID === String(periods[3].metai) ? "white" : "black",
							"&:hover": {
								backgroundColor: "#823F86",
								color: "white",
							},
							width: isMobile ? "auto" : 50,
						}}
						size="large"
						variant="timeline"
						onClick={() => {
							navigate(
								`/vilniausdnrtest/${i18n.language}/periods/compare/timeline/${String(periods[3].metai)}`
							)
						}}
					>
						<Typography variant="button">1938</Typography>
					</Button>
					<Button
						sx={{
							background: globalID === String(periods[4].metai) ? "#EE5066" : "white",
							color: globalID === String(periods[4].metai) ? "white" : "black",
							"&:hover": {
								backgroundColor: "#EE5066",
								color: "white",
							},
							width: isMobile ? "auto" : 50,
						}}
						size="large"
						variant="timeline"
						onClick={() => {
							navigate(
								`/vilniausdnrtest/${i18n.language}/periods/compare/timeline/${String(periods[4].metai)}`
							)
						}}
					>
						<Typography variant="button">1977</Typography>
					</Button>
					<Button
						sx={{
							background: globalID === String(periods[5].metai) ? "#FFAF28" : "white",
							color: globalID === String(periods[5].metai) ? "white" : "black",
							"&:hover": {
								backgroundColor: "#FFAF28",
								color: "white",
							},
							width: isMobile ? "auto" : 50,
						}}
						size="large"
						variant="timeline"
						onClick={() => {
							navigate(
								`/vilniausdnrtest/${i18n.language}/periods/compare/timeline/${String(periods[5].metai)}`
							)
						}}
					>
						<Typography variant="button">2023</Typography>
					</Button>
				</ButtonGroup>
			</Grid>
			<Grid
				sx={{ ml: isMobile ? "inherit" : -2.25 }}
				variant="compareType"
				container
				direction="row"
				justifyContent={isMobile ? "left" : "center"}
				alignItems="flex-start"
			>
				<Box sx={{ mt: 9, ml: 2, width: 206, height: 45, borderRadius: 10, backgroundColor: "white" }}>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Typography sx={{ mt: 0.4, mb: -1.4 }}>Permatomumas</Typography>
					</Grid>
					<Slider
						sx={{ ml: "10%", width: "80%", "& .MuiSlider-markLabel": { top: "-10px" } }}
						value={sliderValue}
						min={0}
						max={100}
						size="small"
						valueLabelDisplay="auto"
						onChange={handleSliderChange}
					/>
				</Box>
			</Grid>
		</>
	)
}

export default CompareTimeline
