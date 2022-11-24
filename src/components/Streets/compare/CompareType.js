import React from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"

const CompareType = () => {
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const handleCompareChange = (event) => {
		switch (event.target.value) {
			case 0:
				navigate(`/vilniausdnr/${i18n.language}/streets/compare/timeline`)
				break

			case 1:
				navigate(`/vilniausdnr/${i18n.language}/streets/compare/swipe`)
				break

			case 2:
				navigate(`/vilniausdnr/${i18n.language}/streets/compare/window`)
				break
		}
	}

	return (
		<Grid variant="compareType" container direction="row" justifyContent="left" alignItems="flex-start">
			<FormControl
				sx={{
					width: "auto",
					height: "45px",
					boxShadow: 0,
					mt: 2,
					ml: 2,
				}}
				variant="outlined"
				size="small"
				id="swipe-select"
			>
				<Select defaultValue="0" onChange={handleCompareChange}>
					<MenuItem sx={{ whiteSpace: "unset" }} key={0} value={0}>
						Laiko juosta
					</MenuItem>
					<MenuItem sx={{ whiteSpace: "unset" }} key={1} value={1}>
						Slenkanti juosta
					</MenuItem>
					<MenuItem sx={{ whiteSpace: "unset" }} key={2} value={2}>
						Langai
					</MenuItem>
				</Select>
			</FormControl>
		</Grid>
	)
}

export default CompareType
