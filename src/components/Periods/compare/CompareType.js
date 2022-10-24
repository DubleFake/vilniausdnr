import React, {useState, useEffect} from "react"
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
  const [selectedCompare, setSelectedCompare] = useState(0)

  useEffect(() => {

    switch(true) {
      case window.location.href.includes("timeline"):
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

	const handleCompareChange = (event) => {
    setSelectedCompare(event.target.value)
		switch (event.target.value) {
			case 0:
				navigate(`/vilniausdnr/${i18n.language}/periods/compare/timeline`)
				break

			case 1:
				navigate(`/vilniausdnr/${i18n.language}/periods/compare/swipe`)
				break

			case 2:
				navigate(`/vilniausdnr/${i18n.language}/periods/compare/window`)
				break
		}
	}

	return (
		<Grid
			sx={{
				backgroundColor: "yellow",
				width: "100%",
				height: "0%",
				bottom: window.innerHeight - 90,
				position: "relative",
				zIndex: 2,
			}}
			container
			direction="row"
			justifyContent="right"
			alignItems="flex-start"
		>
			<FormControl
				sx={{
					mt: 1.5,
					mr: 1.5,
					width: 170,
					backgroundColor: "white",
				}}
				variant="filled"
				size="small"
				id="swipe-select"
			>
				<InputLabel>Vaizdavimas</InputLabel>
				<Select label="Sluoksnis" value={selectedCompare} onChange={handleCompareChange}>
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
