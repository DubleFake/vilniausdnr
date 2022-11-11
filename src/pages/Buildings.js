import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import ObjectMap from "../components/Buildings/map/ObjectMap"
import ObjectPopup from "../components/Buildings/popup/ObjectPopup"
import OptionsToggle from "../components/Buildings/options/OptionsToggle"
import Options from "../components/Buildings/options/Options"
import CompareToggle from "../components/Buildings/compare/CompareToggle"
import TooltipPlaceholder from "../utils/misc/TooltipPlaceholder"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"

const Buildings = () => {
	const [selectedObject, setSelectedObject] = useState("")
	const [initialLoading, setInitialLoading] = useState(true)
	const [initialObjectsList, setInitialObjectsList] = useState([])
	const [initialObjectsClasses, setInitialObjectsClasses] = useState([[], []])
	const [mapQuery, setMapQuery] = useState([])
	const [visible, setVisible] = useState(false)
	const [toggleCompareWindow, setToggleCompareWindow] = useState(false)
	const [historyToggle, setHistoryToggle] = useState(false)
  const [displayTooltip, setDisplayTooltip] = useState(true)

	useEffect(() => {
		if (historyToggle) {
			setVisible(false)
		}
	}, [historyToggle])

	return (
		<Routes>
			<Route
				path="*"
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
								{!historyToggle && <OptionsToggle visible={visible} setVisible={setVisible} />}
								<ObjectMap
									setInitialObjectsList={setInitialObjectsList}
									setInitialLoading={setInitialLoading}
									setMapQuery={setMapQuery}
									setInitialObjectsClasses={setInitialObjectsClasses}
									toggleCompareWindow={toggleCompareWindow}
								/>
								<CompareToggle
									setToggleCompareWindow={setToggleCompareWindow}
									historyToggle={historyToggle}
									setHistoryToggle={setHistoryToggle}
								/>

								<TooltipPlaceholder
									display={displayTooltip}
									text={`Atsiprašome, ši skiltis šiuo metu vis dar yra kuriama, nepasiekiamas joks jos funkcionalumas ir duomenys.`}
									setDisplayTooltip={setDisplayTooltip}
								/>

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

export default Buildings
