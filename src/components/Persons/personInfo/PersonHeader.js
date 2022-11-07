import React from "react"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const PersonHeader = (props) => {
	return (
		props.biographyFeatures.length > 0 && (
			<Box sx={{ ml: 2, mt: 4, mb: 1 }}>
				<Typography
					sx={{ fontWeight: "bold" }}
					variant="h3"
					gutterBottom={props.biographyFeatures[0].attributes.Kuri_kalba_pagrindine === "LT" ? true : false}
					component="div"
					align="left"
					color="#323B4C"
				>
					{console.log(props.biographyFeatures)}
					{props.biographyFeatures[0].attributes.Vardas_lietuviskai +
						" " +
						props.biographyFeatures[0].attributes.Pavarde_lietuviskai}
					{props.biographyFeatures[0].attributes.Pseudonimas_ir_slapyvardziai
						? "-" + props.biographyFeatures[0].attributes.Pseudonimas_ir_slapyvardziai
						: null}
				</Typography>

				{props.biographyFeatures[0].attributes.Kuri_kalba_pagrindine === "EN" ? (
					<Typography
						sx={{ fontStyle: "italic" }}
						color="text.secondary"
						variant="h5"
						gutterBottom
						component="div"
						align="left"
					>
						{props.biographyFeatures[0].attributes.Vardas_pavarde_EN}
					</Typography>
				) : props.biographyFeatures[0].attributes.Kuri_kalba_pagrindine === "KITA" ? (
					<Typography
						sx={{ fontStyle: "italic" }}
						color="text.secondary"
						variant="h5"
						gutterBottom
						component="div"
						align="left"
					>
						{props.biographyFeatures[0].attributes.Vardas_pavarde_KITA}
					</Typography>
				) : props.biographyFeatures[0].attributes.Kuri_kalba_pagrindine === "PL" ? (
					<Typography
						sx={{ fontStyle: "italic" }}
						color="text.secondary"
						variant="h5"
						gutterBottom
						component="div"
						align="left"
					>
						{props.biographyFeatures[0].attributes.Vardas_pavarde_PL}
					</Typography>
				) : props.biographyFeatures[0].attributes.Kuri_kalba_pagrindine === "RU" ? (
					<Typography
						sx={{ fontStyle: "italic" }}
						color="text.secondary"
						variant="h5"
						gutterBottom
						component="div"
						align="left"
					>
						{props.biographyFeatures[0].attributes.Vardas_pavarde_RU}
					</Typography>
				) : null}

				<Typography color="text.secondary" variant="body2" gutterBottom component="div" align="left">
					{props.biographyFeatures[0].attributes.Veikla_kuryba_trumpai}
				</Typography>
			</Box>
		)
	)
}

export default PersonHeader
