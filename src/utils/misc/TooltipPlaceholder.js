import React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import WarningIcon from "@mui/icons-material/Warning"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"

const TooltipPlaceholder = (props) => {
	return (
		props.display && (
			<Container sx={{zIndex: 1}} variant="placeholder">
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					variant="placeholder"
				>
					<Grid item xs={3}>
						<Box sx={{ width: 400}}>
							<Card sx={{ border: "solid 2px red", backgroundColor: "#fcebe6" }} variant="outlined">
								<CardContent>
									<Grid container direction="row" justifyContent="center" alignItems="center">
										<WarningIcon sx={{ mr: 2 }} color="secondary" />
										<Typography sx={{ fontSize: 20, width: 320 }} variant="body2">
											{props.text}
										</Typography>
									</Grid>
								</CardContent>
								<CardActions>
									<Grid container direction="row" justifyContent="center" alignItems="center">
										<Button
											variant="contained"
											color="secondary"
											size="large"
											onClick={() => {
												props.setDisplayTooltip(false)
											}}
										>
											Supratau
										</Button>
									</Grid>
								</CardActions>
							</Card>
						</Box>
					</Grid>
				</Grid>
			</Container>
		)
	)
}

export default TooltipPlaceholder
