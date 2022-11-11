import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import Options from "../components/Persons/options/Options"
import PersonInfo from "../components/Persons/personInfo/PersonInfo"
import { persons } from "../utils/personsArcgisItems"
import TooltipPlaceholder from "../utils/misc/TooltipPlaceholder"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"

const Persons = () => {
	const [selectedObject, setSelectedObject] = useState("")
	const [initialLoading, setInitialLoading] = useState(true)
	const [initialObjectsList, setInitialObjectsList] = useState([])
	const [displayTooltip, setDisplayTooltip] = useState(true)

	useEffect(() => {
		persons
			.queryFeatures({
				outFields: [
					"OBJECTID",
					"Vardas_lietuviskai",
					"Pavarde_lietuviskai",
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
				}
			})
	}, [])

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
							<Options
								initialObjectsList={initialObjectsList}
								setSelectedObject={setSelectedObject}
								selectedObject={selectedObject}
							/>

							<TooltipPlaceholder
								display={displayTooltip}
								text={`"Įamžintos asmenybės" titulinis puslapis dar kuriamas, prašome pasirinkti konkrečią asmenybę iš
							sąrašo kairėje.`}
								setDisplayTooltip={setDisplayTooltip}
							/>

							<Outlet />
						</Grid>
					</>
				}
			>
				<Route
					path="/:globalID"
					element={
						<>
							<TooltipPlaceholder display={displayTooltip} />
							<PersonInfo setDisplayTooltip={setDisplayTooltip} />
						</>
					}
				/>
			</Route>
		</Routes>
	)
}

export default Persons
