import React, { useState } from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import ObjectMap from "../components/Streets/map/ObjectMap"
import ObjectPopup from "../components/Streets/popup/ObjectPopup"
import TableToggle from "../components/Streets/options/OptionsToggle"
import Options from "../components/Streets/options/Options"
import CompareLayers from "../components/Streets/compare/CompareLayers"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"

//subklase pagal klase, 2 langai, pagalvoti apie atvaizdavima (paprastai ir kai palyginimas)?

const Plaques = () => {
	const [selectedObject, setSelectedObject] = useState("")
	const [initialLoading, setInitialLoading] = useState(true)
	const [initialObjectsList, setInitialObjectsList] = useState([])
	const [initialObjectsClasses, setInitialObjectsClasses] = useState([[], []])
	const [mapQuery, setMapQuery] = useState([])
	const [visible, setVisible] = useState(false)

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
							<Collapse sx={{ maxWidth: 350 }} orientation="horizontal" in={visible}>
								<Options
									initialObjectsList={initialObjectsList}
									setSelectedObject={setSelectedObject}
									selectedObject={selectedObject}
									initialObjectsClasses={initialObjectsClasses}
								/>
							</Collapse>

							<Grid item xs>
								<ObjectMap
									setInitialObjectsList={setInitialObjectsList}
									setInitialLoading={setInitialLoading}
									setMapQuery={setMapQuery}
									setInitialObjectsClasses={setInitialObjectsClasses}
								/>
								<TableToggle visible={visible} setVisible={setVisible} />
								<CompareLayers />
								<Outlet />
							</Grid>
						</Grid>
					</>
				}
			>
				<Route
					path="object/:globalID"
					element={
						<ObjectPopup
							mapQuery={mapQuery}
							setSelectedObject={setSelectedObject}
							initialLoading={initialLoading}
						/>
					}
				/>
			</Route>
		</Routes>
	)
}

export default Plaques
