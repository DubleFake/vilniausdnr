import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import ObjectMap from "../components/Streets/map/ObjectMap"
import ObjectPopup from "../components/Streets/popup/ObjectPopup"
import OptionsToggle from "../components/Streets/options/OptionsToggle"
import Options from "../components/Streets/options/Options"
import CompareToggle from "../components/Streets/compare/CompareToggle"
import InfoTooltip from "../utils/misc/InfoTooltip"
import DNRSpinner from "../utils/misc/DNRSpinner"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"

const Plaques = () => {
	const [selectedObject, setSelectedObject] = useState("")
	const [initialLoading, setInitialLoading] = useState(true)
	const [initialObjectsList, setInitialObjectsList] = useState([])
	const [initialObjectsClasses, setInitialObjectsClasses] = useState([[], []])
	const [mapQuery, setMapQuery] = useState([])
	const [visible, setVisible] = useState(false)
	const [toggleCompareWindow, setToggleCompareWindow] = useState(false)
	const [historyToggle, setHistoryToggle] = useState(false)
	const [once, setOnce] = useState(false)

	const [open, setOpen] = useState(false)
	const [anchorEl, setAnchorEl] = useState(null)

	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

	useEffect(() => {
		if (!initialLoading || (initialLoading && historyToggle)) {
			const infoButton = document.getElementById("info_button")
			setAnchorEl(infoButton)
			setOpen(true)
			setTimeout(() => {
				setOpen(false)
			}, 4000)
		}

		if (!historyToggle && !initialLoading && !isMobile) {
			setVisible(true)
		} else {
			setVisible(false)
		}

		if (window.location.href.includes("compare")) {
			setInitialLoading(false)
		}
	}, [isMobile, historyToggle, initialLoading])

	return (
		<Routes>
			<Route
				path="*"
				element={
					<>
						<Grid container spacing={0}>
							<Backdrop
								sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
								open={initialLoading}
							>
								<DNRSpinner />
							</Backdrop>

							<Collapse variant="options" orientation="horizontal" in={visible}>
								<Options
									initialObjectsList={initialObjectsList}
									setSelectedObject={setSelectedObject}
									selectedObject={selectedObject}
									initialObjectsClasses={initialObjectsClasses}
									setVisible={setVisible}
								/>
							</Collapse>

							<Grid item xs>
								<ObjectMap
									setInitialObjectsList={setInitialObjectsList}
									setInitialLoading={setInitialLoading}
									setMapQuery={setMapQuery}
									setInitialObjectsClasses={setInitialObjectsClasses}
									toggleCompareWindow={toggleCompareWindow}
									historyToggle={historyToggle}
									setHistoryToggle={setHistoryToggle}
								/>
								{(!isMobile || !visible) && (
									<CompareToggle
										setToggleCompareWindow={setToggleCompareWindow}
										historyToggle={historyToggle}
										setHistoryToggle={setHistoryToggle}
										setMapQuery={setMapQuery}
										mapQuery={mapQuery}
										setSelectedObject={setSelectedObject}
										initialLoading={initialLoading}
										once={once}
										setOnce={setOnce}
									/>
								)}
								{!historyToggle && <OptionsToggle visible={visible} setVisible={setVisible} />}
								<Outlet />
							</Grid>
						</Grid>
						<InfoTooltip open={open} setOpen={setOpen} anchorEl={anchorEl} />
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
							setHistoryToggle={setHistoryToggle}
							setMapQuery={setMapQuery}
						/>
					}
				/>
			</Route>
		</Routes>
	)
}

export default Plaques
