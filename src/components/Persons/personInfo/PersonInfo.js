import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { persons } from "../../../utils/personsArcgisItems"
import PersonTimeline from "./PersonTimeline"
import PersonRelated from "./PersonRelated"
import PersonGeneral from "./PersonGeneral"
import PersonHeader from "./PersonHeader"
import EmptyPlaceholder from "../../../utils/misc/EmptyPlaceholder"
import ForceGraph from "./ForceGraph"

import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import SearchIcon from "@mui/icons-material/Search"
import IconButton from "@mui/material/IconButton"

const PersonInfo = (props) => {
	const { globalID } = useParams()
	const theme = useTheme()
	const isDownSm = useMediaQuery(theme.breakpoints.down("sm"))

	const [biographyFeatures, setBiographyFeatures] = useState([])
	const [displayEmpty, setDisplayEmpty] = useState(true)

	useEffect(() => {
		if (globalID) {
			props.setSelectedObject(globalID)
		}

		setBiographyFeatures([])
		persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${globalID}}'`,
			})
			.then((response) => {
				setBiographyFeatures(response.features)
				setDisplayEmpty(false)
			})
	}, [globalID])

	useEffect(() => {
		return () => {
			setDisplayEmpty(true)
			setBiographyFeatures([])
		}
	}, [])

	return (
		<Grid container spacing={0} variant="main">
			{isDownSm && (
				<IconButton
					color="primary"
					aria-label="close"
					size="small"
					onClick={() => {
						props.setVisible(true)
					}}
					sx={{
						mt: 1,
						mr: 1.5,
						position: "absolute",
						zIndex: 200,
						right: 0,
						left: "auto",
						backgroundColor: "#D72E30",
						color: "white",
					}}
				>
					<SearchIcon sx={{ fontSize: 25 }} />
				</IconButton>
			)}
			{displayEmpty ? (
				<ForceGraph initialObjectsList={props.initialObjectsList} />
			) : isDownSm ? (
				<Box
					sx={{
						display: "grid",
						gap: 0,
						gridTemplateColumns: "repeat(1, 1fr)",
						gridTemplateRows: "auto",
						gridTemplateAreas: `
            "top"
            "left"
            "middle"
            "right"
          `,
					}}
				>
					<Box sx={{ gridArea: "top" }}>
						<PersonHeader biographyFeatures={biographyFeatures} />
						<hr
							style={{
								position: "relative",
								zIndex: 1,
								color: "#D1D1D1",
								backgroundColor: "#D1D1D1",
								height: 1,
								width: "90%",
								border: "none",
								marginTop: 32,
							}}
						/>
					</Box>
					<Box sx={{ gridArea: "left" }}>
						<PersonGeneral biographyFeatures={biographyFeatures} />
					</Box>
					<Box sx={{ gridArea: "middle" }}>
						<PersonTimeline globalID={globalID} />
					</Box>
					<Box sx={{ gridArea: "right" }}>
						<PersonRelated globalID={globalID} />
					</Box>
				</Box>
			) : (
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(4, 1fr)",
						gap: 0,
						gridTemplateRows: "auto",
						gridTemplateAreas: `
              "left top top right"
            `,
					}}
				>
					<Box sx={{ gridArea: "top" }}>
						<PersonHeader biographyFeatures={biographyFeatures} />
						<hr
							style={{
								position: "relative",
								zIndex: 1,
								color: "#D1D1D1",
								backgroundColor: "#D1D1D1",
								height: 1,
								width: "90%",
								border: "none",
								marginTop: 32,
							}}
						/>
						<PersonTimeline globalID={globalID} />
					</Box>
					<Box sx={{ gridArea: "left" }}>
						<PersonGeneral biographyFeatures={biographyFeatures} />
					</Box>
					<Box sx={{ gridArea: "right" }}>
						<PersonRelated globalID={globalID} />
					</Box>
				</Box>
			)}
		</Grid>
	)
}

export default PersonInfo
