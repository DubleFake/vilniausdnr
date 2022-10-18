import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom"

import ObjectMap from "../components/Maps/map/ObjectMap"
// // import ObjectPopup from "../components/Periods/popup/ObjectPopup"
// // import OptionsToggle from "../components/Periods/options/OptionsToggle"
// import Options from "../components/Periods/options/Options"
import CompareToggle from "../components/Maps/compare/CompareToggle"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
// import CircularProgress from "@mui/material/CircularProgress"
// import Backdrop from "@mui/material/Backdrop"

const Maps = () => {
	const [selectedObject, setSelectedObject] = useState("")
	const [initialLoading, setInitialLoading] = useState(true)
	const [initialObjectsList, setInitialObjectsList] = useState([])
	const [initialObjectsClasses, setInitialObjectsClasses] = useState([[], []])
	const [mapQuery, setMapQuery] = useState([])
	const [visible, setVisible] = useState(false)
	const [toggleCompareWindow, setToggleCompareWindow] = useState(false)
	const [historyToggle, setHistoryToggle] = useState(false)

	let location = useLocation()
	let navigate = useNavigate()
	useEffect(() => {
		if (!location.pathname.includes("compare")) {
			navigate("compare/review")
		}
	}, [location])

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
								{/* <Collapse sx={{ maxWidth: 350 }} orientation="horizontal" in={visible}>
									<Options
										initialObjectsList={initialObjectsList}
										setSelectedObject={setSelectedObject}
										selectedObject={selectedObject}
										initialObjectsClasses={initialObjectsClasses}
									/>
								</Collapse> */}

								<Grid item xs>
									{/* {!historyToggle && <OptionsToggle visible={visible} setVisible={setVisible} />} */}
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
									<Outlet />
								</Grid>
							</Grid>
						</>
					}
				>
					{/* <Route
        path="object/:globalID"
        element={
            <ObjectPopup
                mapQuery={mapQuery}
                setSelectedObject={setSelectedObject}
                initialLoading={initialLoading}
            />
        }
    /> */}
				</Route>
			</Routes>
		</>
	)
}

export default Maps
