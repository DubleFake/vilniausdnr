import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import Options from "../components/Events/options/Options"
import EventTimeline from "../components/Events/EventInfo/EventTimeline"
import { events } from "../utils/eventsArcgisItems"
import TooltipPlaceholder from "../utils/misc/TooltipPlaceholder"
import "../css/signs.css"

import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"

const Persons = () => {
	const [eventsList, setEventsList] = useState([])
	const [eventsFiltered, setEventsFiltered] = useState([])
	const [selectedEvent, setSelectedEvent] = useState()

	useEffect(() => {
		events
			.queryFeatures({
				where: "1 = 1",
				outFields: ["*"],
			})
			.then((response) => {
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
							<Options
								eventsList={eventsList}
								setEventsFiltered={setEventsFiltered}
								selectedEvent={selectedEvent}
								setSelectedEvent={setSelectedEvent}
							/>

							<EventTimeline
								eventsFiltered={eventsFiltered}
								setEventsFiltered={setEventsFiltered}
								setSelectedEvent={setSelectedEvent}
							/>
							<Outlet />
						</Grid>
					</>
				}
			></Route>
		</Routes>
	)
}

export default Persons
