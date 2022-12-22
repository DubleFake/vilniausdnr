import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"
import InputAdornment from "@mui/material/InputAdornment"
import Typography from "@mui/material/Typography"

const CompareType = () => {
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const [selectedCompare, setSelectedCompare] = useState(0)

	const handleCompareChange = (event) => {
		setSelectedCompare(event.target.value)
		switch (event.target.value) {
			case 0:
				navigate(`/vilniausdnr/${i18n.language}/maps/compare/review`)
				break

			case 1:
				navigate(`/vilniausdnr/${i18n.language}/maps/compare/swipe`)
				break

			case 2:
				navigate(`/vilniausdnr/${i18n.language}/maps/compare/window`)
				break
		}
	}

	useEffect(() => {
		switch (true) {
			case window.location.href.includes("review"):
				setSelectedCompare(0)
				break
			case window.location.href.includes("swipe"):
				setSelectedCompare(1)
				break
			case window.location.href.includes("window"):
				setSelectedCompare(2)
				break
		}
	}, [])

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
				<Select
					variant="outlined"
					value={selectedCompare}
					onChange={handleCompareChange}
					renderValue={(value) => (
						<Typography sx={{ color: "#D72E30" }}>
							<Typography sx={{ color: "black", display: "inline" }}>Režimas: </Typography>
							{value === 0 ? "Laiko juosta" : value === 1 ? "Slenkanti juosta" : "Du langai"}
						</Typography>
					)}
				>
					<MenuItem
						sx={{
							whiteSpace: "unset",
							"&.Mui-selected": {
								color: "#D72E30",
							},
							justifyContent: "center",
						}}
						key={0}
						value={0}
					>
						Laiko juosta
					</MenuItem>
					<MenuItem
						sx={{
							whiteSpace: "unset",
							"&.Mui-selected": {
								color: "#D72E30",
							},
							justifyContent: "center",
						}}
						key={1}
						value={1}
					>
						Slenkanti juosta
					</MenuItem>
					<MenuItem
						sx={{
							whiteSpace: "unset",
							"&.Mui-selected": {
								color: "#D72E30",
							},
							justifyContent: "center",
						}}
						key={2}
						value={2}
					>
						Du langai
					</MenuItem>
				</Select>
			</FormControl>
		</Grid>
	)
}

export default CompareType
