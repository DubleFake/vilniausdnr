import React, { useState, useEffect } from "react"

import { map, view, objects, periods } from "../../../utils/periodsArcgisItems"

import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

const CompareTimeline = (props) => {
	const [currentPeriod, setCurrentPeriod] = useState(0)

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
    map.removeAll()
    map.add(periods[currentPeriod])
  }, [currentPeriod])

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
					sx={{ borderRadius: 0, backgroundColor: currentPeriod === 0 && "#55AFB0" }}
					size="large"
					variant="contained"
					onClick={() => {
						setCurrentPeriod(0)
					}}
				>
					<Typography variant="button">1808</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: currentPeriod === 1 && "#407D5C" }}
					size="large"
					variant="contained"
					onClick={() => {
						setCurrentPeriod(1)
					}}
				>
					<Typography variant="button">1845</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: currentPeriod === 2 && "#007FCC" }}
					size="large"
					variant="contained"
					onClick={() => {
						setCurrentPeriod(2)
					}}
				>
					<Typography variant="button">1911</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: currentPeriod === 3 && "#823F86" }}
					size="large"
					variant="contained"
					onClick={() => {
						setCurrentPeriod(3)
					}}
				>
					<Typography variant="button">1938</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: currentPeriod === 4 && "#EE5066" }}
					size="large"
					variant="contained"
					onClick={() => {
						setCurrentPeriod(4)
					}}
				>
					<Typography variant="button">1977</Typography>
				</Button>
				<Button
					sx={{ borderRadius: 0, backgroundColor: currentPeriod === 5 && "#FFAF28" }}
					size="large"
					variant="contained"
					onClick={() => {
						setCurrentPeriod(5)
					}}
				>
					<Typography variant="button">2022</Typography>
				</Button>
			</ButtonGroup>
		</Grid>
	)
}

export default CompareTimeline
