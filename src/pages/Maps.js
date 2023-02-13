import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom"

import ObjectMap from "../components/Maps/map/ObjectMap"
import Options from "../components/Periods/options/Options"
import CompareToggle from "../components/Maps/compare/CompareToggle"
import InfoTooltip from "../utils/misc/InfoTooltip"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"

const Maps = () => {
	const [selectedObject, setSelectedObject] = useState("")
	const [initialLoading, setInitialLoading] = useState(false)
	const [initialLoadingOnce, setInitialLoadingOnce] = useState(true)
	const [initialObjectsList, setInitialObjectsList] = useState([])
	const [initialObjectsClasses, setInitialObjectsClasses] = useState([[], []])
	const [mapQuery, setMapQuery] = useState([])
	const [visible, setVisible] = useState(false)
	const [toggleCompareWindow, setToggleCompareWindow] = useState(false)
	const [historyToggle, setHistoryToggle] = useState(false)
	const [once, setOnce] = useState(false)

	const [open, setOpen] = useState(false)
	const [anchorEl, setAnchorEl] = useState(null)

	let location = useLocation()
	let navigate = useNavigate()

	useEffect(() => {
		if (initialLoading && initialLoadingOnce) {
			setInitialLoadingOnce(false)
			const infoButton = document.getElementById("info_button")
			setAnchorEl(infoButton)
			setOpen(true)
			setTimeout(() => {
				setOpen(false)
			}, 4000)
		}
	}, [initialLoading])

	useEffect(() => {
		if (historyToggle) {
			setVisible(false)
		}
	}, [historyToggle])

	return (
		<>
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
								{/* sito collapse reikia kad mapu aukstis butu 100% ?? */}
								<Collapse variant="options" orientation="horizontal" in={visible}>
									<Options
										initialObjectsList={initialObjectsList}
										setSelectedObject={setSelectedObject}
										selectedObject={selectedObject}
										initialObjectsClasses={initialObjectsClasses}
									/>
								</Collapse>

								<Grid variant="compareMain" item xs>
									{/* {!historyToggle && <OptionsToggle visible={visible} setVisible={setVisible} />} */}
									<ObjectMap
										setInitialObjectsList={setInitialObjectsList}
										setInitialLoading={setInitialLoading}
										setMapQuery={setMapQuery}
										setInitialObjectsClasses={setInitialObjectsClasses}
										toggleCompareWindow={toggleCompareWindow}
									/>
									<CompareToggle
										setInitialLoading={setInitialLoading}
										setToggleCompareWindow={setToggleCompareWindow}
										historyToggle={historyToggle}
										setHistoryToggle={setHistoryToggle}
										once={once}
										setOnce={setOnce}
									/>
									<Outlet />
								</Grid>
							</Grid>
							<InfoTooltip open={open} setOpen={setOpen} anchorEl={anchorEl} />
						</>
					}
				></Route>
			</Routes>
		</>
	)
}

export default Maps
