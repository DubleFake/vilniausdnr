import React from "react"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const PersonHeader = (props) => {
	return (
		props.biographyFeatures.length > 0 && (
			<Box sx={{ ml: 2, mt: 1, mb: 1 }}>
				<Typography
					sx={{ fontWeight: "bold", color: "black" }}
					variant="h4"
					gutterBottom={false}
					component="div"
					align="left"
				>
					{props.biographyFeatures[0].attributes.Vardas_lietuviskai}
				</Typography>

				{props.biographyFeatures[0].attributes.Vardas_pavarde_EN ? (
					<Typography sx={{ color: "black", fontSize: "1.875rem" }} variant="h4" component="div" align="left">
						{props.biographyFeatures[0].attributes.Vardas_pavarde_EN}
					</Typography>
				) : null}

				{props.biographyFeatures[0].attributes.Vardas_pavarde_KITA ? (
					<Typography sx={{ color: "black", fontSize: "1.875rem" }} variant="h4" component="div" align="left">
						{props.biographyFeatures[0].attributes.Vardas_pavarde_KITA}
					</Typography>
				) : null}

				{props.biographyFeatures[0].attributes.Vardas_pavarde_PL ? (
					<Typography sx={{ color: "black", fontSize: "1.875rem" }} variant="h4" component="div" align="left">
						{props.biographyFeatures[0].attributes.Vardas_pavarde_PL}
					</Typography>
				) : null}

				{props.biographyFeatures[0].attributes.Vardas_pavarde_RU ? (
					<Typography sx={{ color: "black", fontSize: "1.875rem" }} variant="h4" component="div" align="left">
						{props.biographyFeatures[0].attributes.Vardas_pavarde_RU}
					</Typography>
				) : null}

				{props.biographyFeatures[0].attributes.Pseudonimas_ir_slapyvardziai && (
					<Typography
						variant="h5"
						gutterBottom={
							props.biographyFeatures[0].attributes.Vardas_pavarde_EN ||
							props.biographyFeatures[0].attributes.Vardas_pavarde_KITA ||
							props.biographyFeatures[0].attributes.Vardas_pavarde_PL ||
							props.biographyFeatures[0].attributes.Vardas_pavarde_RU
								? false
								: true
						}
						component="div"
						align="left"
						color="text.secondary"
					>
						Slapyvardis - {props.biographyFeatures[0].attributes.Pseudonimas_ir_slapyvardziai}
					</Typography>
				)}
				<Typography color="text.secondary" variant="body2" gutterBottom component="div" align="left">
					{props.biographyFeatures[0].attributes.Veikla_kuryba_trumpai}
				</Typography>
			</Box>
		)
	)
}

export default PersonHeader
