import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { map, view, objects, periods } from "../../../utils/periodsArcgisItems"

import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

const CompareTimeline = (props) => {
	const { globalID } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	useEffect(() => {
		if (globalID) {
			map.removeAll()

			const foundPeriod = periods.find((period) => String(period.metai) === globalID)

			map.add(foundPeriod)
			foundPeriod
				.when(() => {
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

			view.when(() => {
				view.goTo({ target: foundPeriod.fullExtent.center, zoom: 4 })
			})
		} else {
			navigate(String(periods[0].metai))
		}
	}, [globalID])

	useEffect(() => {
		return () => {
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
					}}
					size="large"
					variant="timeline"
					onClick={() => {
						navigate(`/vilniausdnr/${i18n.language}/periods/compare/timeline/${String(periods[0].metai)}`)
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
					}}
					size="large"
					variant="timeline"
					onClick={() => {
						navigate(`/vilniausdnr/${i18n.language}/periods/compare/timeline/${String(periods[1].metai)}`)
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
					}}
					size="large"
					variant="timeline"
					onClick={() => {
						navigate(`/vilniausdnr/${i18n.language}/periods/compare/timeline/${String(periods[2].metai)}`)
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
					}}
					size="large"
					variant="timeline"
					onClick={() => {
						navigate(`/vilniausdnr/${i18n.language}/periods/compare/timeline/${String(periods[3].metai)}`)
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
					}}
					size="large"
					variant="timeline"
					onClick={() => {
						navigate(`/vilniausdnr/${i18n.language}/periods/compare/timeline/${String(periods[4].metai)}`)
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
					}}
					size="large"
					variant="timeline"
					onClick={() => {
						navigate(`/vilniausdnr/${i18n.language}/periods/compare/timeline/${String(periods[5].metai)}`)
					}}
				>
					<Typography variant="button">2022</Typography>
				</Button>
			</ButtonGroup>
		</Grid>
	)
}

export default CompareTimeline
