import React, { useEffect, useState } from "react"

import { biography } from "../../../utils/personsArcgisItems"

import Box from "@mui/material/Box"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import EventIcon from "@mui/icons-material/Event"

const PersonTimeline = (props) => {
	const [timelineFeatures, setTimelineFeatures] = useState([])

	useEffect(() => {
		biography
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${props.globalID}}'`,
			})
			.then((response) => {
				let tempFeatures = response.features
				tempFeatures.sort((a, b) => a.attributes.Fakto_data_rikiavimas - b.attributes.Fakto_data_rikiavimas)
				setTimelineFeatures(tempFeatures)
			})
	}, [props.globalID])

	return (
		<Box
			sx={{
				maxHeight: window.innerHeight - 90,
				// overflowY: "auto",
				width: "calc(50vw - 175px)",
			}}
		>
			<Timeline>
				{timelineFeatures.map((feature, i) => (
					<TimelineItem key={i}>
						<TimelineOppositeContent sx={{ mt: 1.5, maxWidth: 100 }} align="right" color="text.secondary">
							{feature.attributes.Fakto_data
								? new Date(feature.attributes.Fakto_data).toLocaleDateString("lt-LT")
								: feature.attributes.Fakto_datos_intervalo_pradžia
								? feature.attributes.Fakto_datos_intervalo_pradžia
								: feature.attributes.Fakto_datos_intervalo_pabaiga
								? feature.attributes.Fakto_datos_intervalo_pabaiga
								: feature.attributes.Fakto_data_tekstu}
						</TimelineOppositeContent>
						<TimelineSeparator>
							<TimelineDot color={feature.attributes.Fakto_vieta === "Vilnius" ? "secondary" : "primary"}>
								{feature.attributes.Fakto_vieta === "Vilnius" ? <LocationCityIcon /> : <EventIcon />}
							</TimelineDot>
							{i !== timelineFeatures.length - 1 && <TimelineConnector />}
						</TimelineSeparator>
						<TimelineContent sx={{ mt: 1.5 }}>{feature.attributes.Fakto_aprasymas}</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</Box>
	)
}

export default PersonTimeline
