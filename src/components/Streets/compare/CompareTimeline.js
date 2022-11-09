import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { map, view, view2, objects, periods } from "../../../utils/streetsArcgisItems"

import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

const viewHandles = []

const CompareTimeline = (props) => {
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	useEffect(() => {
		map.removeAll()
		// map.add(periods[0])

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

		view.when(() => {
			view.goTo({ target: periods[0].fullExtent.center, zoom: 4 })
		})

		viewHandles.push(
			view.on("click", function (event) {
				view.hitTest(event).then(function (response) {
					if (response.results.length) {
						const tempFeatures = []
						for (let feature in response.results) {
							tempFeatures.push(response.results[feature].graphic)
						}

						props.setMapQuery(tempFeatures)
						navigate(
							`/vilniausdnr/${
								i18n.language
							}/streets/compare/timeline/${tempFeatures[0].attributes.GlobalID.replace(/[{}]/g, "")}`
						)
					}
				})
			})
		)
	}, [])

	useEffect(() => {
		map.removeAll()
		map.add(props.initialPeriod)

		props.initialPeriod
			.when(() => {
				return props.initialPeriod.queryExtent()
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
			view.goTo({ target: props.initialPeriod.fullExtent.center, zoom: 4 })
		})

    props.setToggle1808(false)
		switch (parseInt(props.initialPeriod.title.replace(/\D/g, ""))) {
			case 1808:
				props.setToggle1808(true)
				break
			case 1845:
				props.setToggle1845(true)
				break
			case 1911:
				props.setToggle1911(true)
				break
			case 1938:
				props.setToggle1938(true)
				break
			case 1977:
				props.setToggle1977(true)
				break
			case 2021:
				props.setToggle2021(true)
				break
		}
	}, [props.initialPeriod])

	useEffect(() => {
		//protingesni sprendima?
		if (props.toggle1808) {
			map.add(periods[0])
		} else {
			map.remove(periods[0])
		}

		if (props.toggle1845) {
			map.add(periods[1])
		} else {
			map.remove(periods[1])
		}

		if (props.toggle1911) {
			map.add(periods[2])
		} else {
			map.remove(periods[2])
		}

		if (props.toggle1938) {
			map.add(periods[3])
		} else {
			map.remove(periods[3])
		}

		if (props.toggle1977) {
			map.add(periods[4])
		} else {
			map.remove(periods[4])
		}

		if (props.toggle2021) {
			map.add(periods[5])
		} else {
			map.remove(periods[5])
		}
	}, [props.toggle1808, props.toggle1845, props.toggle1911, props.toggle1938, props.toggle1977, props.toggle2021])

	useEffect(() => {
		return () => {
			viewHandles.forEach((handle) => {
				handle.remove()
			})
			viewHandles.length = 0
		}
	}, [])

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
					sx={{ borderRadius: 0, backgroundColor: props.toggle1808 && "#55AFB0" }}
					size="large"
					variant="contained"
					onClick={() => {
						props.setToggle1808(!props.toggle1808)
					}}
				>
					<Typography variant="button">1808</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: props.toggle1845 && "#407D5C" }}
					size="large"
					variant="contained"
					onClick={() => {
						props.setToggle1845(!props.toggle1845)
					}}
				>
					<Typography variant="button">1845</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: props.toggle1911 && "#007FCC" }}
					size="large"
					variant="contained"
					onClick={() => {
						props.setToggle1911(!props.toggle1911)
					}}
				>
					<Typography variant="button">1911</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: props.toggle1938 && "#823F86" }}
					size="large"
					variant="contained"
					onClick={() => {
						props.setToggle1938(!props.toggle1938)
					}}
				>
					<Typography variant="button">1938</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: props.toggle1977 && "#EE5066" }}
					size="large"
					variant="contained"
					onClick={() => {
						props.setToggle1977(!props.toggle1977)
					}}
				>
					<Typography variant="button">1977</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: props.toggle2021 && "#FFAF28" }}
					size="large"
					variant="contained"
					onClick={() => {
						props.setToggle2021(!props.toggle2021)
					}}
				>
					<Typography variant="button">2021</Typography>
				</Button>
			</ButtonGroup>
		</Grid>
	)
}

export default CompareTimeline
