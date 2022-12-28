import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"

import { ReactComponent as reviewIcon } from "../../../utils/icons/compareTypeIcons/perziura.svg"
import { ReactComponent as swipeIcon } from "../../../utils/icons/compareTypeIcons/slenkanti.svg"
import { ReactComponent as windowIcon } from "../../../utils/icons/compareTypeIcons/dulangai.svg"

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
							{value === 0 ? "Peržiūra" : value === 1 ? "Slenkanti juosta" : "Du langai"}
						</Typography>
					)}
				>
					<MenuItem
						sx={{
							display: "flex",
							whiteSpace: "unset",
							"&.Mui-selected": {
								color: "#D72E30",
								backgroundColor: "#F7D5D6",
							},
							px: 1,
						}}
						key={0}
						value={0}
					>
						<SvgIcon sx={{ my: -2, fontSize: 35, mr: 1 }} component={reviewIcon} inheritViewBox />
						<Typography sx={{ width: "100%" }} align="center">
							Peržiūra
						</Typography>
					</MenuItem>

					<MenuItem
						sx={{
							display: "flex",
							whiteSpace: "unset",
							"&.Mui-selected": {
								color: "#D72E30",
								backgroundColor: "#F7D5D6",
							},
							px: 1,
						}}
						key={1}
						value={1}
					>
						<SvgIcon sx={{ my: -2, fontSize: 35, mr: 1 }} component={swipeIcon} inheritViewBox />
						<Typography sx={{ width: "100%" }} align="center">
							Slenkanti juosta
						</Typography>
					</MenuItem>
					<MenuItem
						sx={{
							display: "flex",
							whiteSpace: "unset",
							"&.Mui-selected": {
								color: "#D72E30",
								backgroundColor: "#F7D5D6",
							},
							px: 1,
						}}
						key={2}
						value={2}
					>
						<SvgIcon sx={{ my: -2, fontSize: 35, mr: 1 }} component={windowIcon} inheritViewBox />
						<Typography sx={{ width: "100%" }} align="center">
							Du langai
						</Typography>
					</MenuItem>
				</Select>
			</FormControl>
		</Grid>
	)
}

export default CompareType
