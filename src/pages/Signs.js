import React, { useState } from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import ObjectMap from "../components/Signs/map/ObjectMap"
import Table from "../components/Signs/table/Table"
import ObjectPopup from "../components/Signs/popup/ObjectPopup"
import PersonPopup from "../components/Signs/popup/PersonPopup"
import TableToggle from "../components/Signs/table/TableToggle"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"

const Signs = () => {
	const [selectedObject, setSelectedObject] = useState("")
	const [initialLoading, setInitialLoading] = useState(true)
	const [initialObjectsList, setInitialObjectsList] = useState([])
	const [mapQuery, setMapQuery] = useState([])
	const [visible, setVisible] = useState(false)

	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<Grid container spacing={0}>
							<Backdrop
								sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
								open={initialLoading}
							>
								<CircularProgress sx={{ position: "fixed", top: window.innerHeight / 2 + 25 }} color="inherit" />
							</Backdrop>
							<Collapse sx={{ maxWidth: 350 }} orientation="horizontal" in={visible}>
								<Table
									initialObjectsList={initialObjectsList}
									setSelectedObject={setSelectedObject}
									selectedObject={selectedObject}
								/>
							</Collapse>

							<Grid item xs>
								<ObjectMap
									setInitialObjectsList={setInitialObjectsList}
									setInitialLoading={setInitialLoading}
									setMapQuery={setMapQuery}
								/>
								<TableToggle visible={visible} setVisible={setVisible} />
								<Outlet />
							</Grid>
						</Grid>
					</>
				}
			>
				<Route
					path="objektas/:globalID"
					element={
						<ObjectPopup
							mapQuery={mapQuery}
							setSelectedObject={setSelectedObject}
							initialLoading={initialLoading}
						/>
					}
				/>

				<Route path="asmuo/:globalID" element={<PersonPopup initialLoading={initialLoading} />} />
			</Route>
		</Routes>
	)
}

export default Signs
