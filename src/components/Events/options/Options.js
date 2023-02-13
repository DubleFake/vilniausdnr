import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import Box from "@mui/material/Box"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"

function CustomAccordion(props) {
	const { group, expanded, selectedGroup, handleChange, eventsList, selectedEvent, setSelectedEvent } = props
	const navigate = useNavigate()

	const tempEventsList = eventsList.filter((event) => event.attributes.Ivykio_grupe_LT === group)

	return (
		<Accordion
			disableGutters
			elevation={0}
			square
			expanded={expanded === group}
			onChange={handleChange(group)}
		>
			<AccordionSummary sx={{ mt: 0 }}>
				<Box
					sx={{
						borderLeft: group === selectedGroup ? "4px solid #D72E30" : "4px solid white",
						position: "absolute",
						left: 0,
						height: "100%",
						width: "3px",
						ml: group === selectedGroup ? 3.9 : 4,
						top: 0,
					}}
					component="div"
				/>
				<Typography
					sx={{
						ml: 4,
						mr: 2,
						fontWeight: group === selectedGroup ? 500 : 400,
						fontSize: "18px",
						color: group === selectedGroup ? "#D72E30" : "black",
					}}
					variant="body2"
				>
					{group}
				</Typography>
			</AccordionSummary>
			<AccordionDetails sx={{ py: 0 }}>
				<List sx={{ pt: 0 }}>
					{tempEventsList.map((event, index) => (
						<ListItem
							sx={{
								color: "gray",
								"&:hover": {
									transition: "0.3s",
								},
								"&.Mui-selected": {
									backgroundColor: "white",
									transition: "0.3s",
									color: "#D72E30",
								},
							}}
							key={index}
							component="div"
							disablePadding
							selected={event.attributes.Ivykio_ID === selectedEvent}
							onClick={() => {
								setSelectedEvent(event.attributes.Ivykio_ID)
								navigate(`#${event.attributes.Ivykio_ID.replace(/[{}]/g, "")}`)
							}}
						>
							<ListItemButton sx={{ height: "auto", pl: 0, ml: 2 }}>
								<Box
									sx={{
										borderLeft:
											event.attributes.Ivykio_ID === selectedEvent
												? "4px solid #D72E30"
												: "2px solid lightgray",
										position: "absolute",
										left: 0,
										height: "100%",
										width: "3px",
										ml: event.attributes.Ivykio_ID === selectedEvent ? -0.1 : 0,
										visibility: expanded === group ? "visible" : "hidden",
									}}
									component="div"
								/>
								<Typography sx={{ ml: 2, fontSize: "14px" }} variant="body2">
									{event.attributes.Istorinis_ivykis}
								</Typography>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</AccordionDetails>
		</Accordion>
	)
}

CustomAccordion.propTypes = {
	sx: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
		PropTypes.func,
		PropTypes.object,
	]),
}

const Options = (props) => {
	const navigate = useNavigate()

	const [eventGroups, setEventGroups] = useState([])
	const [expanded, setExpanded] = useState(false)

	const theme = useTheme()
	const isDownSm = useMediaQuery(theme.breakpoints.down("sm"))

	const handleChange = (panel) => (event, isExpanded) => {
		props.setSelectedGroup(panel)

		if (!isExpanded) {
			props.setEventsFiltered(props.eventsList)
			props.setSelectedGroup("")
		} else {
			const tempFiltered = props.eventsList.filter((event) => event.attributes.Ivykio_grupe_LT === panel)

			props.setEventsFiltered(tempFiltered)
		}
		setExpanded(isExpanded ? panel : false)

		navigate("")
		props.setSelectedEvent("")
		const timelineNode = document.getElementById("eventsTimeline")
		timelineNode.scrollIntoView({ behavior: "smooth", block: "start" })
	}

	useEffect(() => {
		const tempSet = new Set()

		for (let event of props.eventsList) {
			tempSet.add(event.attributes.Ivykio_grupe_LT)
		}

		setEventGroups([...tempSet])
	}, [props.eventsList])

	useEffect(() => {
		setExpanded(props.selectedGroup)
	}, [props.selectedGroup])

	return (
		<Container variant="optionsDivEvents">
			{isDownSm && (
				<IconButton
					color="primary"
					aria-label="close"
					size="small"
					onClick={() => {
						props.setVisible(false)
					}}
					sx={{
						mt: 1,
						mr: 1,
						position: "absolute",
						zIndex: 50,
						right: 0,
						left: "auto",
						backgroundColor: "#EBEBEB",
					}}
				>
					<CloseIcon sx={{ fontSize: 25 }} />
				</IconButton>
			)}

			<Typography sx={{ ml: 4, mt: 2 }} variant="h5">
				Istorinių įvykių juosta
			</Typography>
			{eventGroups.length > 0 && props.eventsList.length > 0 && (
				<Box>
					<CustomAccordion
						group={eventGroups[0]}
						expanded={expanded}
						selectedGroup={props.selectedGroup}
						handleChange={handleChange}
						eventsList={props.eventsList}
						selectedEvent={props.selectedEvent}
						setSelectedEvent={props.setSelectedEvent}
					/>

					<CustomAccordion
						group={eventGroups[1]}
						expanded={expanded}
						selectedGroup={props.selectedGroup}
						handleChange={handleChange}
						eventsList={props.eventsList}
						selectedEvent={props.selectedEvent}
						setSelectedEvent={props.setSelectedEvent}
					/>

					<CustomAccordion
						group={eventGroups[2]}
						expanded={expanded}
						selectedGroup={props.selectedGroup}
						handleChange={handleChange}
						eventsList={props.eventsList}
						selectedEvent={props.selectedEvent}
						setSelectedEvent={props.setSelectedEvent}
					/>

					<CustomAccordion
						group={eventGroups[3]}
						expanded={expanded}
						selectedGroup={props.selectedGroup}
						handleChange={handleChange}
						eventsList={props.eventsList}
						selectedEvent={props.selectedEvent}
						setSelectedEvent={props.setSelectedEvent}
					/>

					<CustomAccordion
						group={eventGroups[4]}
						expanded={expanded}
						selectedGroup={props.selectedGroup}
						handleChange={handleChange}
						eventsList={props.eventsList}
						selectedEvent={props.selectedEvent}
						setSelectedEvent={props.setSelectedEvent}
					/>

					<CustomAccordion
						group={eventGroups[5]}
						expanded={expanded}
						selectedGroup={props.selectedGroup}
						handleChange={handleChange}
						eventsList={props.eventsList}
						selectedEvent={props.selectedEvent}
						setSelectedEvent={props.setSelectedEvent}
					/>

					<CustomAccordion
						group={eventGroups[6]}
						expanded={expanded}
						selectedGroup={props.selectedGroup}
						handleChange={handleChange}
						eventsList={props.eventsList}
						selectedEvent={props.selectedEvent}
						setSelectedEvent={props.setSelectedEvent}
					/>
				</Box>
			)}

			{/* <List>
				{eventGroups.length > 0 &&
					eventGroups.map((group, index) => (
						<ListItem
							sx={{
								color: "gray",
								"&:hover": {
									transition: "0.3s",
								},
								"&.Mui-selected": {
									backgroundColor: "white",
									transition: "0.3s",
									color: "#D72E30",
								},
							}}
							key={index}
							component="div"
							disablePadding
							selected={index === props.selectedGroup}
							onClick={() => handleShare(index)}
						>
							<ListItemButton sx={{ height: "auto" }}>
								<Box
									sx={{
										borderLeft: index === props.selectedGroup ? "4px solid #D72E30" : "2px solid lightgray",
										position: "absolute",
										left: 0,
										height: "100%",
										width: "3px",
										ml: index === props.selectedGroup ? 3.9 : 4,
									}}
									component="div"
								/>
								<Typography
									sx={{ ml: 4, fontWeight: index === props.selectedGroup ? 500 : 400, fontSize: "20px" }}
									variant="body2"
								>
									{group}
								</Typography>
							</ListItemButton>
						</ListItem>
					))}
			</List> */}
		</Container>
	)
}

export default Options
