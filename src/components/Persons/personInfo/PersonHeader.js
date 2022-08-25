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
					gutterBottom
					component="div"
					align="left"
					color="#323B4C"
				>
					{props.biographyFeatures[0].attributes.Vardas_lietuviskai +
						" " +
						props.biographyFeatures[0].attributes.Pavarde_lietuviskai}
				</Typography>

				<Typography color="text.secondary" variant="body2" gutterBottom component="div" align="left">
					{props.biographyFeatures[0].attributes.Veikla_kuryba_trumpai}
				</Typography>
			</Box>
		)
	)
}

export default PersonHeader
