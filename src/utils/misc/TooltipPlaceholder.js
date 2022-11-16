import React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import WarningIcon from "@mui/icons-material/Warning"
import Grid from "@mui/material/Grid"

const TooltipPlaceholder = (props) => {
	return (
		props.display && (
			<Box
				sx={{
					backgroundColor: "#D7D7D7",
					height: window.innerHeight - 90,
					width: "calc(100vw - 450px)",
				}}
			>
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: "calc(100vh - 90px)" }}
				>
					<Grid item xs={3}>
						<Box sx={{ width: 400, zIndex: 100 }}>
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
			</Box>
		)
	)
}

export default TooltipPlaceholder
