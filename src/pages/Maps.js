import React from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import ObjectMap from "../components/Maps/map/ObjectMap"

import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"

const Maps = () => {
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

							<Grid item xs>
								<ObjectMap />
								<Outlet />
							</Grid>
						</Grid>
					</>
				}
			></Route>
		</Routes>
	)
}

export default Maps
