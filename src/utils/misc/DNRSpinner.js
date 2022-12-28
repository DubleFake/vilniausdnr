import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"

import { ReactComponent as Spinner } from "../icons/homeIcons/spinner.svg"

const DNRSpinner = () => {
	return (
		<Grid container direction="row" justifyContent="center" alignItems="center">
			<Grid container direction="column" justify="center" alignItems="center">
				<Grid item>
					<Typography sx={{ position: "absolute", mt: "32px", ml: "23px", fontSize: 26 }}>DNR</Typography>
					<SvgIcon
						sx={{ fontSize: 100, animation: "rotate-center 1.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) infinite" }}
						component={Spinner}
						inheritViewBox
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default DNRSpinner
