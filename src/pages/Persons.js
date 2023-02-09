import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import Options from "../components/Persons/options/Options"
import PersonInfo from "../components/Persons/personInfo/PersonInfo"
import { persons } from "../utils/personsArcgisItems"
import InfoTooltip from "../utils/misc/InfoTooltip"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const Persons = () => {
	const [selectedObject, setSelectedObject] = useState("")
	const [initialLoading, setInitialLoading] = useState(true)
	const [initialObjectsList, setInitialObjectsList] = useState([])
	const [visible, setVisible] = useState(true)
	const theme = useTheme()
	const isDownSm = useMediaQuery(theme.breakpoints.down("sm"))

	const [open, setOpen] = useState(false)
	const [anchorEl, setAnchorEl] = useState(null)

	useEffect(() => {
		persons
			.queryFeatures({
				outFields: [
					"OBJECTID",
					"Vardas_lietuviskai",
					"Asmenybes_ID",
					"Pagrindine_veikla",
					"Veiklos_detalizavimas",
				],
				where: "",
				returnGeometry: false,
			})
			.then((response) => {
				if (response) {
					setInitialLoading(false)
					setInitialObjectsList(response.features)

					const infoButton = document.getElementById("info_button")
					setAnchorEl(infoButton)
					setOpen(true)
					setTimeout(() => {
						setOpen(false)
					}, 4000)
				}
			})
	}, [])
	useEffect(() => {
		if (selectedObject !== "" && isDownSm) {
			setVisible(false)
		}
	}, [selectedObject])

	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<Grid container spacing={0}>
							{/* <Backdrop
								sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
								open={initialLoading}
							>
								<CircularProgress
									sx={{ position: "fixed", top: window.innerHeight / 2 + 25 }}
									color="inherit"
								/>
							</Backdrop> */}
							<Collapse orientation="horizontal" in={visible}>
								<Options
									initialObjectsList={initialObjectsList}
									setSelectedObject={setSelectedObject}
									selectedObject={selectedObject}
									visible={visible}
									setVisible={setVisible}
								/>
							</Collapse>

							<PersonInfo
								visible={visible}
								setVisible={setVisible}
								setSelectedObject={setSelectedObject}
								initialObjectsList={initialObjectsList}
							/>
							<Outlet />
						</Grid>
						<InfoTooltip open={open} setOpen={setOpen} anchorEl={anchorEl} />
					</>
				}
			>
				<Route
					path="/:globalID"
					element={
						<>
							<PersonInfo
								visible={visible}
								setVisible={setVisible}
								initialLoading={initialLoading}
								setSelectedObject={setSelectedObject}
							/>
						</>
					}
				/>
			</Route>
		</Routes>
	)
}

export default Persons
