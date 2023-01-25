import React from "react"

import { ReactComponent as paieska } from "../icons/personIcons/paeiska.svg"

import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import SvgIcon from "@mui/material/SvgIcon"

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
								<SvgIcon sx={{ fontSize: 130, mb: 1 }} component={paieska} inheritViewBox />
								<Typography sx={{ color: "black", mt: 1 }}>{props.text}</Typography>
							</Grid>
						</IconButton>
					</Grid>
				</Grid>
			</Container>
		)
	)
}

export default EmptyPlaceholder
