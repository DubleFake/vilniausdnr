import React from "react"
import Container from "@mui/material/Container"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

const EmptyPlaceholder = (props) => {
	return (
		props.display && (
			<Container variant="placeholder">
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					variant="placeholder"
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
			</Container>
		)
	)
}

export default EmptyPlaceholder
