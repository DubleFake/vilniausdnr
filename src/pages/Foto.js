import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import ObjectMap from "../components/Foto/map/ObjectMap"
import ObjectPopup from "../components/Foto/popup/ObjectPopup"
import TableToggle from "../components/Foto/options/OptionsToggle"
import Options from "../components/Foto/options/Options"
import DNRSpinner from "../utils/misc/DNRSpinner"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"

const Foto = () => {
	const [selectedObject, setSelectedObject] = useState("")
	const [initialLoading, setInitialLoading] = useState(true)
	const [initialObjectsList, setInitialObjectsList] = useState([])
	const [mapQuery, setMapQuery] = useState([])
	const [visible, setVisible] = useState(false)

	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

	useEffect(() => {
		if (!initialLoading && !isMobile) {
			setVisible(true)
		} else {
			setVisible(false)
		}
	}, [isMobile, initialLoading])

	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<Grid container spacing={0}>
							<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={initialLoading}>
								<DNRSpinner />
							</Backdrop>

							<Collapse variant="options" orientation="horizontal" in={visible}>
								<Options
									initialObjectsList={initialObjectsList}
									setSelectedObject={setSelectedObject}
									selectedObject={selectedObject}
                  setVisible={setVisible}
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
					path="object/:globalID"
					element={
						<ObjectPopup
							mapQuery={mapQuery}
							setSelectedObject={setSelectedObject}
							initialLoading={initialLoading}
						/>
					}
				/>

				{/* <Route path="person/:globalID" element={<PersonPopup initialLoading={initialLoading} />} /> */}
			</Route>
		</Routes>
	)
}

export default Foto
