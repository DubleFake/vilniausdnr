import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { persons } from "../../../utils/personsArcgisItems"
import PersonTimeline from "./PersonTimeline"
import PersonRelated from "./PersonRelated"
import PersonGeneral from "./PersonGeneral"
import PersonHeader from "./PersonHeader"
import TooltipPlaceholder from "../../../utils/misc/TooltipPlaceholder"
import EmptyPlaceholder from "../../../utils/misc/EmptyPlaceholder"

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

const PersonInfo = (props) => {
	const { globalID } = useParams()

	const [biographyFeatures, setBiographyFeatures] = useState([])
	const [displayTooltip, setDisplayTooltip] = useState(true)
	const [displayEmpty, setDisplayEmpty] = useState(true)

	useEffect(() => {
		setBiographyFeatures([])

		persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${globalID}}'`,
			})
			.then((response) => {
				setBiographyFeatures(response.features)
				setDisplayEmpty(false)
				setDisplayTooltip(false)
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
			{displayEmpty ? (
				<>
					<TooltipPlaceholder
						display={displayTooltip}
						text={`"Įamžintos asmenybės" titulinis puslapis dar kuriamas, prašome pasirinkti konkrečią asmenybę iš
							sąrašo kairėje.`}
						setDisplayTooltip={setDisplayTooltip}
					/>
					<EmptyPlaceholder
						display={displayEmpty}
						text={"Pasirinkite konkrečią asmenybę iš sąrašo kairėje"}
					/>
				</>
			) : (
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(4, 1fr)",
						gap: 0,
						gridTemplateRows: "auto",
						gridTemplateAreas: `
              "left top top right"
              "left middle middle right"
            `,
					}}
				>
					<Box sx={{ gridArea: "top" }}>
						<PersonHeader biographyFeatures={biographyFeatures} />
						<hr
							style={{
								position: "relative",
								zIndex: 100,
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
			)}
		</Grid>
	)
}

export default PersonInfo
