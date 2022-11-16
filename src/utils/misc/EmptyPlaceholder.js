import React from "react"
import Box from "@mui/material/Box"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

const EmptyPlaceholder = (props) => {
	return (
		props.display && (
			<Box
				variant="placeholderBox"
        
			>
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
          variant="placeholderGrid"
				>
					<Grid item xs={3}>
						<IconButton disabled>
							<Grid container direction="column" justifyContent="center" alignItems="center">
								<ManageSearchIcon sx={{ fontSize: 150 }} />
								<Typography>{props.text}</Typography>
							</Grid>
						</IconButton>
					</Grid>
				</Grid>
			</Box>
		)
	)
}

export default EmptyPlaceholder
