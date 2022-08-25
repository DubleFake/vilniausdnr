import React from "react"

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const PersonGeneral = (props) => {
	return (
		props.biographyFeatures.length > 0 && (
			<Box sx={{ backgroundColor: "#323B4C", height: "100%" }}>
				<Grid container direction="column" justifyContent="flex-start" alignItems="center">
					<Box
						component="img"
						sx={{
							// height: 200,
							// width: 200,
							// maxHeight: { xs: 233, md: 167 },
							// maxWidth: { xs: 350, md: 250 },
							mt: 3,
							maxHeight: 300,
							maxWidth: 300,
						}}
						alt={props.biographyFeatures[0].attributes.Nuotraukos_aprasymas}
						src={props.biographyFeatures[0].attributes.Nuotrauka}
					/>
					<Typography color="white" variant="body2" gutterBottom component="div" align="center">
						{props.biographyFeatures[0].attributes.Veikla_profesija}
					</Typography>

					{props.biographyFeatures[0].attributes.Apdovanojimai && (
						<>
							<Typography
								sx={{ mt: 1 }}
								color="white"
								variant="h6"
								gutterBottom
								component="div"
								align="center"
							>
								Apdovanojimai
							</Typography>
							<Typography color="white" variant="body2" gutterBottom component="div" align="center">
								{props.biographyFeatures[0].attributes.Apdovanojimai}
							</Typography>
						</>
					)}
				</Grid>
			</Box>
		)
	)
}

export default PersonGeneral
