import React from "react"

import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"

const CompareTimeline = (props) => {
	return (
		<Grid
			sx={{
				backgroundColor: "yellow",
				width: "100%",
				height: "0%",
				bottom: window.innerHeight - 500,
				position: "relative",
			}}
			container
			direction="row"
			justifyContent="center"
			alignItems="flex-start"
		>
			<ButtonGroup sx={{ mt: 1.5 }} variant="contained">
				<Button color="primary">
					<Typography variant="button">asda</Typography>
				</Button>
				<Button color="secondary">
					<Typography variant="button">dasd</Typography>
				</Button>
			</ButtonGroup>
		</Grid>
	)
}

export default CompareTimeline
