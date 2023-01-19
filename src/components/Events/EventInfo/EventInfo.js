import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { events, related_sources, persons } from "../../../utils/eventsArcgisItems"

import Grid from "@mui/material/Grid"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent"
import TimelineDot from "@mui/lab/TimelineDot"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const EventInfo = (props) => {
	return (
		<Grid sx={{ backgroundColor: "#707070" }} container spacing={0} variant="main">
			{props.eventsList.length > 0 && (
				<Timeline position="alternate">
					{props.eventsList.map((event, index) => (
						<TimelineItem key={index}>
							<TimelineSeparator>
								<TimelineConnector sx={{ backgroundColor: "white", width: "1px" }} />
								<TimelineDot sx={{ backgroundColor: "white", m: 0, borderWidth: "1px" }} />
								<TimelineConnector sx={{ backgroundColor: "white", width: "1px" }} />
							</TimelineSeparator>
							<TimelineContent>
								<Box sx={{ width: "100%", backgroundColor: "white" }}>
									<Box
										sx={{ width: "100%" }}
										component="img"
										src={
											event.attributes.Nuotrauka
												? event.attributes.Nuotrauka
												: "https://elibrary.mab.lt/bitstream/handle/1/527/223316.jpg?sequence=30&isAllowed=y"
										}
									/>
									<Typography
										sx={{ mx: 2, fontWeight: 500, fontSize: "18px", maxWidth: "inherit" }}
										variant="h6"
									>
										{event.attributes.Istorinis_ivykis}
									</Typography>
									<Typography
										sx={{ mx: 2, pb: 1, color: "gray", fontWeight: 400, fontSize: "14px" }}
										variant="body2"
										component="div"
									>
										{new Date(event.attributes.Ivykio_data).toLocaleDateString("lt-LT")}
									</Typography>
								</Box>
							</TimelineContent>
						</TimelineItem>
					))}
				</Timeline>
			)}
		</Grid>
	)
}

export default EventInfo
