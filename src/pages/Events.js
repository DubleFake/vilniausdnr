import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import Options from "../components/Events/options/Options"
import EventTimeline from "../components/Events/EventInfo/EventTimeline"
import { events } from "../utils/eventsArcgisItems"
import DNRSpinner from "../utils/misc/DNRSpinner"
import InfoTooltip from "../utils/misc/InfoTooltip"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Backdrop from "@mui/material/Backdrop"

const Persons = () => {
	const [eventsList, setEventsList] = useState([])
	const [eventsFiltered, setEventsFiltered] = useState([])
	const [selectedEvent, setSelectedEvent] = useState()
	const [selectedGroup, setSelectedGroup] = useState("")

	const [open, setOpen] = useState(false)
	const [anchorEl, setAnchorEl] = useState(null)

	useEffect(() => {
		events
			.queryFeatures({
				where: "1 = 1",
				outFields: ["*"],
			})
			.then((response) => {
				const infoButton = document.getElementById("info_button")
				setAnchorEl(infoButton)
				setOpen(true)
				setTimeout(() => {
					setOpen(false)
				}, 4000)

				const tempFeatures = response.features
				tempFeatures.sort((a, b) => a.attributes.Ivykio_data - b.attributes.Ivykio_data)
				setEventsFiltered(tempFeatures)
				setEventsList(tempFeatures)
			})
	}, [])

	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<Grid container spacing={0}>
							<Backdrop
								sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
								open={!eventsFiltered.length > 0}
							>
								<DNRSpinner />
							</Backdrop>
							<Options
								eventsList={eventsList}
								setEventsFiltered={setEventsFiltered}
								selectedEvent={selectedEvent}
								setSelectedEvent={setSelectedEvent}
								selectedGroup={selectedGroup}
								setSelectedGroup={setSelectedGroup}
							/>
							{eventsFiltered.length > 0 && (
								<EventTimeline
									eventsFiltered={eventsFiltered}
									setEventsFiltered={setEventsFiltered}
									setSelectedEvent={setSelectedEvent}
									selectedGroup={selectedGroup}
									setSelectedGroup={setSelectedGroup}
									eventsList={eventsList}
									selectedEvent={selectedEvent}
								/>
							)}
							<Outlet />
						</Grid>
						<InfoTooltip open={open} setOpen={setOpen} anchorEl={anchorEl} />
					</>
				}
			></Route>
		</Routes>
	)
}

export default Persons
