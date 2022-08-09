import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { persons, biography } from "../../../utils/personsArcgisItems"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

const Biography = (props) => {
	const [biographyFeatures, setBiographyFeatures] = useState([])

	useEffect(() => {
		persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${props.globalID}}'`,
			})
			.then((response) => {
				setBiographyFeatures(response.features)
			})
	}, [props.globalID])

	return (
		<Box
			sx={{
				maxHeight: window.innerHeight - 90,
				overflowY: "auto",
				width: "calc(50vw - 175px)",
			}}
		>
			{biographyFeatures.length > 0 && (
				<Grid container direction="column" justifyContent="flex-start" alignItems="center">
					<Box
						component="img"
						sx={{
							// height: 200,
							// width: 200,
							// maxHeight: { xs: 233, md: 167 },
							// maxWidth: { xs: 350, md: 250 },
							mt: 3,
							maxHeight: 200,
							maxWidth: 200,
						}}
						alt={biographyFeatures[0].attributes.Nuotraukos_aprasymas}
						src={biographyFeatures[0].attributes.Nuotrauka}
					/>
					<Typography
						style={{ whiteSpace: "pre-line" }}
						variant="h5"
						gutterBottom
						component="div"
						align="center"
					>
						{biographyFeatures[0].attributes.Vardas_lietuviskai +
							"\n" +
							biographyFeatures[0].attributes.Pavarde_lietuviskai.toUpperCase()}
					</Typography>
					<Typography variant="body2" gutterBottom component="div" align="center">
						{biographyFeatures[0].attributes.Veikla_profesija}
					</Typography>

					<Typography sx={{ mt: 1 }} variant="h6" gutterBottom component="div" align="center">
						Veikla
					</Typography>
					<Typography variant="body2" gutterBottom component="div" align="center">
						{biographyFeatures[0].attributes.Veikla_kuryba_trumpai}
					</Typography>

					{biographyFeatures[0].attributes.Apdovanojimai && (
						<>
							<Typography sx={{ mt: 1 }} variant="h6" gutterBottom component="div" align="center">
								Apdovanojimai
							</Typography>
							<Typography variant="body2" gutterBottom component="div" align="center">
								{biographyFeatures[0].attributes.Apdovanojimai}
							</Typography>
						</>
					)}

					<Typography sx={{ mt: 1 }} variant="h6" gutterBottom component="div" align="center">
						Atminimo įamžinimas Vilniuje
					</Typography>
					<Typography variant="subtitle1" gutterBottom component="div" align="center">
						Skulptūra
					</Typography>
					<Typography variant="subtitle1" gutterBottom component="div" align="center">
						Gatvė
					</Typography>
					<Typography variant="subtitle1" gutterBottom component="div" align="center">
						Kapas
					</Typography>

					<Typography sx={{ mt: 1 }} variant="h6" gutterBottom component="div" align="center">
						Susiję
					</Typography>
					<Typography variant="subtitle1" gutterBottom component="div" align="center">
						Pastatai
					</Typography>
					<Typography variant="subtitle1" gutterBottom component="div" align="center">
						Įvykiai
					</Typography>
					<Typography variant="subtitle1" gutterBottom component="div" align="center">
						Asmenybės
					</Typography>
				</Grid>
			)}
		</Box>
	)
}

export default Biography
