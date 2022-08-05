import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { biography } from "../../../utils/personsArcgisItems"

import Box from "@mui/material/Box"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent"

const PersonTimeline = (props) => {
	const [biographyFeatures, setBiographyFeatures] = useState([])

	useEffect(() => {
		biography
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${props.globalID}}'`,
			})
			.then((response) => {
				setBiographyFeatures(response.features)
			})
	}, [])

	useEffect(() => {
		console.log(biographyFeatures)
	}, [biographyFeatures])

	return (
		<Box sx={{ maxHeight: window.innerHeight - 90, overflowY: "scroll", width: 700 }}>
			<Timeline>
				{biographyFeatures.map((feature, i) => (
					<TimelineItem key={i}>
						<TimelineOppositeContent color="text.secondary">
							{feature.attributes.Fakto_data
								? (new Date(feature.attributes.Fakto_data)).toLocaleDateString("lt-LT")
								: feature.attributes.Fakto_datos_intervalo_pradžia
								? feature.attributes.Fakto_datos_intervalo_pradžia
								: feature.attributes.Fakto_datos_intervalo_pabaiga
								? feature.attributes.Fakto_datos_intervalo_pabaiga
								: feature.attributes.Fakto_data_tekstu}
						</TimelineOppositeContent>
						<TimelineSeparator>
							<TimelineDot />
							<TimelineConnector />
						</TimelineSeparator>
						<TimelineContent>{feature.attributes.Fakto_aprasymas}</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</Box>
	)
}

export default PersonTimeline

// 		<Timeline>
// 			<TimelineItem>
// 				<TimelineOppositeContent color="text.secondary">1950</TimelineOppositeContent>
// 				<TimelineSeparator>
// 					<TimelineDot />
// 					<TimelineConnector />
// 				</TimelineSeparator>
// 				<TimelineContent>
// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
// 					esse cillum dolore eu fugiat nulla pariatur.
// 				</TimelineContent>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<TimelineOppositeContent color="text.secondary">1980</TimelineOppositeContent>
// 				<TimelineSeparator>
// 					<TimelineDot />
// 					<TimelineConnector />
// 				</TimelineSeparator>
// 				<TimelineContent>
// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
// 				</TimelineContent>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<TimelineOppositeContent color="text.secondary">1981</TimelineOppositeContent>
// 				<TimelineSeparator>
// 					<TimelineDot />
// 					<TimelineConnector />
// 				</TimelineSeparator>
// 				<TimelineContent>
// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
// 				</TimelineContent>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<TimelineOppositeContent color="text.secondary">1982</TimelineOppositeContent>
// 				<TimelineSeparator>
// 					<TimelineDot />
// 					<TimelineConnector />
// 				</TimelineSeparator>
// 				<TimelineContent>
// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
// 					esse cillum dolore eu fugiat nulla pariatur.
// 				</TimelineContent>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<TimelineOppositeContent color="text.secondary">1983</TimelineOppositeContent>
// 				<TimelineSeparator>
// 					<TimelineDot />
// 					<TimelineConnector />
// 				</TimelineSeparator>
// 				<TimelineContent>
// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
// 					esse cillum dolore eu fugiat nulla pariatur.
// 				</TimelineContent>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<TimelineOppositeContent color="text.secondary">1990</TimelineOppositeContent>
// 				<TimelineSeparator>
// 					<TimelineDot />
// 					<TimelineConnector />
// 				</TimelineSeparator>
// 				<TimelineContent>
// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
// 					esse cillum dolore eu fugiat nulla pariatur.
// 				</TimelineContent>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<TimelineOppositeContent color="text.secondary">1995</TimelineOppositeContent>
// 				<TimelineSeparator>
// 					<TimelineDot />
// 					<TimelineConnector />
// 				</TimelineSeparator>
// 				<TimelineContent>
// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
// 					esse cillum dolore eu fugiat nulla pariatur.
// 				</TimelineContent>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<TimelineOppositeContent color="text.secondary">1995</TimelineOppositeContent>
// 				<TimelineSeparator>
// 					<TimelineDot />
// 					<TimelineConnector />
// 				</TimelineSeparator>
// 				<TimelineContent>
// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
// 					esse cillum dolore eu fugiat nulla pariatur.
// 				</TimelineContent>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<TimelineOppositeContent color="text.secondary">1995</TimelineOppositeContent>
// 				<TimelineSeparator>
// 					<TimelineDot />
// 					<TimelineConnector />
// 				</TimelineSeparator>
// 				<TimelineContent>
// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
// 					esse cillum dolore eu fugiat nulla pariatur.
// 				</TimelineContent>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<TimelineOppositeContent color="text.secondary">1995</TimelineOppositeContent>
// 				<TimelineSeparator>
// 					<TimelineDot />
// 					<TimelineConnector />
// 				</TimelineSeparator>
// 				<TimelineContent>
// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
// 					esse cillum dolore eu fugiat nulla pariatur.
// 				</TimelineContent>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<TimelineOppositeContent color="text.secondary">2000</TimelineOppositeContent>
// 				<TimelineSeparator>
// 					<TimelineDot />
// 				</TimelineSeparator>
// 				<TimelineContent>
// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
// 					labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
// 					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
// 					esse cillum dolore eu fugiat nulla pariatur.
// 				</TimelineContent>
// 			</TimelineItem>
// 		</Timeline>
