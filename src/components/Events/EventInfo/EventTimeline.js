import React, { useEffect, useState, useRef } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { HashScroll } from "react-hash-scroll"

import { events, sources, persons } from "../../../utils/eventsArcgisItems"

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
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import IconButton from "@mui/material/IconButton"
import ShareIcon from "@mui/icons-material/Share"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import { styled } from "@mui/material/styles"

const EventTimeline = (props) => {
	const navigate = useNavigate()
	const { hash } = useLocation()
	const { t, i18n } = useTranslation()

	const [expandedList, setExpandedList] = useState([])
	const [relations, setRelations] = useState({})
	const [shareTooltip, setShareTooltip] = useState(false)

	const BootstrapTooltip = styled(({ className, ...props }) => (
		<Tooltip {...props} arrow classes={{ popper: className }} />
	))(({ theme }) => ({
		[`& .${tooltipClasses.arrow}`]: {
			color: theme.palette.secondary.main,
		},
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: theme.palette.secondary.main,
			fontSize: 15,
		},
	}))

	const handleShare = async () => {
		await navigator.clipboard.writeText(window.location.href)
		setShareTooltip(true)
	}

	useEffect(() => {
		if (!props.selectedGroup) {
			const eventByID = props.eventsFiltered.find(
				(obj) => obj.attributes.Ivykio_ID.replace(/[{}]/g, "") === window.location.hash.slice(1)
			)

			if (eventByID) {
				props.setSelectedGroup(eventByID.attributes.Ivykio_grupe_LT)
				props.setSelectedEvent(eventByID.attributes.Ivykio_ID)

				const tempFiltered = props.eventsFiltered.filter(
					(event) => event.attributes.Ivykio_grupe_LT === eventByID.attributes.Ivykio_grupe_LT
				)
				props.setEventsFiltered(tempFiltered)

				setTimeout(() => {
					const eventNode = document.getElementById(eventByID.attributes.Ivykio_ID.replace(/[{}]/g, ""))
					eventNode.scrollIntoView({ behavior: "smooth", block: "start" })
				}, 2000)

				const eventByIndex = tempFiltered.findIndex(
					(event) => event.attributes.Ivykio_ID === eventByID.attributes.Ivykio_ID
				)

				eventClickHandler({}, eventByIndex, tempFiltered)
			}
		}
	}, [])

	useEffect(() => {
		const tempArray = []
		let index
		for (let obj in props.eventsFiltered) {
			if (props.eventsFiltered[obj].attributes.Ivykio_ID === props.selectedEvent) {
				index = obj
			}
			tempArray.push(false)
		}
		tempArray[parseInt(index)] = true
		setExpandedList(tempArray)
	}, [props.eventsFiltered])

	useEffect(() => {
		const tempExpandedList = [...expandedList]
		tempExpandedList.fill(false)

		const indexById = props.eventsFiltered.findIndex(
			(obj) => obj.attributes.Ivykio_ID.replace(/[{}]/g, "") === hash.slice(1)
		)

		tempExpandedList[indexById] = true
		setExpandedList(tempExpandedList)

		if (!relations[hash.slice(1)]) {
			eventClickHandler({}, indexById, props.eventsFiltered)
		}
	}, [hash])

	const eventClickHandler = async (event, eventIndex, fromInitial = []) => {
		const tempRelations = { ...relations }

		if (!fromInitial.length > 0) {
			const tempExpandedList = [...expandedList]
			tempExpandedList.fill(false)
			tempExpandedList[eventIndex] = expandedList[eventIndex]
			tempExpandedList[eventIndex] = !tempExpandedList[eventIndex]

			if (tempExpandedList[eventIndex]) {
				props.setSelectedEvent(props.eventsFiltered[eventIndex].attributes.Ivykio_ID)
			} else {
				props.setSelectedEvent("")
			}

			setExpandedList(tempExpandedList)

			if (!tempRelations[props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")]) {
				tempRelations[props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")] = {}

				if (
					!tempRelations[props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")]
						.related_persons
				) {
					await events
						.queryRelatedFeatures({
							outFields: ["Susijes_asmuo_is_saraso"],
							relationshipId: 27,
							returnGeometry: false,
							objectIds: props.eventsFiltered[eventIndex].attributes.OBJECTID,
						})
						.then((response) => {
							let personQueryWhere = ""
							let i = 1
							for (let person of response[props.eventsFiltered[eventIndex].attributes.OBJECTID].features) {
								if (i === 1) {
									personQueryWhere += `Asmenybes_ID = '${person.attributes.Susijes_asmuo_is_saraso.replace(
										/[{}]/g,
										""
									)}'`
								} else {
									personQueryWhere += ` OR Asmenybes_ID = '${person.attributes.Susijes_asmuo_is_saraso.replace(
										/[{}]/g,
										""
									)}'`
								}
								i++
							}

							persons
								.queryFeatures({
									outFields: ["Vardas_lietuviskai", "Pavarde_lietuviskai", "Asmenybes_ID"],
									where: personQueryWhere,
								})
								.then((response_persons) => {
									tempRelations[
										props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")
									].related_persons = response_persons.features
								})
						})
						.catch(() => {
							return
						})
				}

				if (
					!tempRelations[props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")]
						.related_sources
				) {
					await events
						.queryRelatedFeatures({
							outFields: ["Saltinio_pavadinimas", "Saltinio_URL"],
							relationshipId: 28,
							returnGeometry: false,
							objectIds: props.eventsFiltered[eventIndex].attributes.OBJECTID,
						})
						.then((response) => {
							tempRelations[
								props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")
							].related_sources = response[props.eventsFiltered[eventIndex].attributes.OBJECTID].features
						})
						.catch(() => {
							return
						})
				}

				if (
					!tempRelations[props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")]
						.related_maps
				) {
					await events
						.queryRelatedFeatures({
							outFields: ["Pavadinimas", "GlobalID_zemelapio"],
							relationshipId: 29,
							returnGeometry: false,
							objectIds: props.eventsFiltered[eventIndex].attributes.OBJECTID,
						})
						.then((response) => {
							tempRelations[
								props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")
							].related_maps = response[props.eventsFiltered[eventIndex].attributes.OBJECTID].features
						})
						.catch(() => {
							return
						})
				}

				if (
					!tempRelations[props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")]
						.related_plaques
				) {
					await events
						.queryRelatedFeatures({
							outFields: ["OBJ_PAV", "GlobalID"],
							relationshipId: 2,
							returnGeometry: false,
							objectIds: props.eventsFiltered[eventIndex].attributes.OBJECTID,
						})
						.then((response) => {
							tempRelations[
								props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")
							].related_plaques = response[props.eventsFiltered[eventIndex].attributes.OBJECTID].features
						})
						.catch(() => {
							return
						})
				}

				if (
					!tempRelations[props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")]
						.related_foto
				) {
					await events
						.queryRelatedFeatures({
							outFields: ["Pavadinimas", "GlobalID"],
							relationshipId: 19,
							returnGeometry: false,
							objectIds: props.eventsFiltered[eventIndex].attributes.OBJECTID,
						})
						.then((response) => {
							tempRelations[
								props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")
							].related_foto = response[props.eventsFiltered[eventIndex].attributes.OBJECTID].features
						})
						.catch(() => {
							return
						})
				}
			}
		} else {
			if (!tempRelations[fromInitial[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")]) {
				tempRelations[fromInitial[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")] = {}

				if (
					!tempRelations[fromInitial[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")].related_persons
				) {
					await events
						.queryRelatedFeatures({
							outFields: ["Susijes_asmuo_is_saraso"],
							relationshipId: 27,
							returnGeometry: false,
							objectIds: fromInitial[eventIndex].attributes.OBJECTID,
						})
						.then((response) => {
							let personQueryWhere = ""
							let i = 1
							for (let person of response[fromInitial[eventIndex].attributes.OBJECTID].features) {
								if (i === 1) {
									personQueryWhere += `Asmenybes_ID = '${person.attributes.Susijes_asmuo_is_saraso.replace(
										/[{}]/g,
										""
									)}'`
								} else {
									personQueryWhere += ` OR Asmenybes_ID = '${person.attributes.Susijes_asmuo_is_saraso.replace(
										/[{}]/g,
										""
									)}'`
								}
								i++
							}

							persons
								.queryFeatures({
									outFields: ["Vardas_lietuviskai", "Pavarde_lietuviskai", "Asmenybes_ID"],
									where: personQueryWhere,
								})
								.then((response_persons) => {
									tempRelations[
										fromInitial[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")
									].related_persons = response_persons.features
								})
						})
						.catch(() => {
							return
						})
				}

				if (
					!tempRelations[fromInitial[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")].related_sources
				) {
					await events
						.queryRelatedFeatures({
							outFields: ["Saltinio_pavadinimas", "Saltinio_URL"],
							relationshipId: 28,
							returnGeometry: false,
							objectIds: fromInitial[eventIndex].attributes.OBJECTID,
						})
						.then((response) => {
							tempRelations[
								fromInitial[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")
							].related_sources = response[fromInitial[eventIndex].attributes.OBJECTID].features
						})
						.catch(() => {
							return
						})
				}

				if (!tempRelations[fromInitial[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")].related_maps) {
					await events
						.queryRelatedFeatures({
							outFields: ["Pavadinimas", "GlobalID_zemelapio"],
							relationshipId: 29,
							returnGeometry: false,
							objectIds: fromInitial[eventIndex].attributes.OBJECTID,
						})
						.then((response) => {
							tempRelations[fromInitial[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")].related_maps =
								response[fromInitial[eventIndex].attributes.OBJECTID].features
						})
						.catch(() => {
							return
						})
				}

				if (
					!tempRelations[fromInitial[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")].related_plaques
				) {
					await events
						.queryRelatedFeatures({
							outFields: ["OBJ_PAV", "GlobalID"],
							relationshipId: 2,
							returnGeometry: false,
							objectIds: fromInitial[eventIndex].attributes.OBJECTID,
						})
						.then((response) => {
							tempRelations[
								fromInitial[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")
							].related_plaques = response[fromInitial[eventIndex].attributes.OBJECTID].features
						})
						.catch(() => {
							return
						})
				}

				if (!tempRelations[fromInitial[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")].related_foto) {
					await events
						.queryRelatedFeatures({
							outFields: ["Pavadinimas", "GlobalID"],
							relationshipId: 19,
							returnGeometry: false,
							objectIds: fromInitial[eventIndex].attributes.OBJECTID,
						})
						.then((response) => {
							tempRelations[fromInitial[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")].related_foto =
								response[fromInitial[eventIndex].attributes.OBJECTID].features
						})
						.catch(() => {
							return
						})
				}
			}
		}
		setRelations(tempRelations)
	}

	return (
		<Grid sx={{ backgroundColor: "#707070" }} container spacing={0} variant="main">
			{props.eventsFiltered.length > 0 && (
				<Timeline position="alternate" id="eventsTimeline">
					{props.eventsFiltered.map((event, index) => (
						<TimelineItem
							sx={{ mt: index === 0 ? 0 : "-12%", mx: "5%" }}
							key={index}
							id={event.attributes.Ivykio_ID.replace(/[{}]/g, "")}
						>
							<TimelineSeparator sx={{ mx: "3%" }}>
								<TimelineConnector sx={{ backgroundColor: "white", width: "1px" }} />
								<TimelineDot sx={{ backgroundColor: "white", m: 0, borderWidth: "1px" }} />
								<TimelineConnector sx={{ backgroundColor: "white", width: "1px" }} />
							</TimelineSeparator>
							<TimelineContent>
								<HashScroll hash={event.attributes.Ivykio_ID.replace(/[{}]/g, "")} position="center">
									<Box
										sx={{
											width: "100%",
											backgroundColor: "#252525",
											position: "relative",
											zIndex: 1,
											cursor: "pointer",
											textAlign: "left",
										}}
										component="div"
										// id={event.attributes.Ivykio_ID.replace(/[{}]/g, "")}
										onClick={(evt) => {
											navigate(`#${event.attributes.Ivykio_ID.replace(/[{}]/g, "")}`)
											eventClickHandler(evt, index)
										}}
									>
										<Box
											sx={{ width: "100%" }}
											component="img"
											src={
												event.attributes.Nuotrauka
													? event.attributes.Nuotrauka
													: "https://elibrary.mab.lt/bitstream/handle/1/527/223316.jpg?sequence=30&isAllowed=y"
											}
										/>

										{expandedList[index] && event.attributes.Nuotraukos_aprasymas && (
											<Typography
												sx={{
													mx: 2,
													pb: 1,
													color: "gray",
													fontWeight: 400,
													fontSize: "14px",
													fontStyle: "italic",
													textAlign: "center",
												}}
												variant="body2"
												component="div"
											>
												{event.attributes.Nuotraukos_aprasymas}
											</Typography>
										)}

										<Typography
											sx={{ mx: 2, fontWeight: 500, fontSize: "18px", maxWidth: "inherit", color: "white" }}
											variant="h6"
										>
											{event.attributes.Istorinis_ivykis}
											{expandedList[index] && (
												<BootstrapTooltip
													open={shareTooltip}
													leaveDelay={1000}
													title={t(`plaques.objectPopup.shareUrl`)}
													arrow
													placement="top"
													onClose={() => {
														setShareTooltip(false)
													}}
												>
													<IconButton
														color="secondary"
														aria-label="share"
														size="medium"
														onClick={(evt) => {
															evt.stopPropagation()
															handleShare()
														}}
														sx={{ mt: -0.5 }}
													>
														<ShareIcon style={{ fontSize: 25 }} />
													</IconButton>
												</BootstrapTooltip>
											)}
										</Typography>

										<Typography
											sx={{ mx: 2, pb: 1, color: "gray", fontWeight: 400, fontSize: "14px" }}
											variant="body2"
											component="div"
										>
											{new Date(event.attributes.Ivykio_data).toLocaleDateString("lt-LT")}
										</Typography>

										{relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")] ? (
											<Grid container spacing={0}>
												{relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")].related_persons && (
													<Grid item xs={6}>
														<Typography
															sx={{
																fontWeight: 400,
																fontSize: "16px",
																color: "white",
																ml: 2,
															}}
															variant="h6"
														>
															Susiję asmenys
														</Typography>
														{relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")].related_persons.map(
															(person, index) => (
																<Box sx={{ width: "100%", display: "flex" }} key={index}>
																	<Link
																		sx={{
																			p: 0.5,
																			ml: 1.5,
																			width: "100%",
																			position: "relative",
																			fontSize: "14px",
																		}}
																		target="_blank"
																		href={
																			"https://zemelapiai.vplanas.lt" +
																			`/vilniausdnr/${
																				i18n.language
																			}/persons/${person.attributes.Asmenybes_ID.replace(/[{}]/g, "")}`
																		}
																		rel="noopener"
																		textAlign="left"
																		variant="body2"
																		onClick={(evt) => evt.stopPropagation()}
																	>
																		{`${person.attributes.Vardas_lietuviskai} ${person.attributes.Pavarde_lietuviskai}`}
																	</Link>
																</Box>
															)
														)}
													</Grid>
												)}

												{relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")].related_maps && (
													<Grid item xs={6}>
														<Typography
															sx={{
																fontWeight: 400,
																fontSize: "16px",
																color: "white",
																ml: 2,
															}}
															variant="h6"
														>
															Susiję žemėlapiai
														</Typography>
														{relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")].related_maps.map(
															(map, index) => (
																<Box sx={{ width: "100%", display: "flex" }} key={index}>
																	<Link
																		sx={{
																			p: 0.5,
																			ml: 1.5,
																			width: "100%",
																			position: "relative",
																			fontSize: "14px",
																		}}
																		target="_blank"
																		href={
																			"https://zemelapiai.vplanas.lt" +
																			`/vilniausdnr/${
																				i18n.language
																			}/maps/compare/review/${map.attributes.GlobalID_zemelapio.replace(
																				/[{}]/g,
																				""
																			)}`
																		}
																		rel="noopener"
																		textAlign="left"
																		variant="body2"
																		onClick={(evt) => evt.stopPropagation()}
																	>
																		{map.attributes.Pavadinimas}
																	</Link>
																</Box>
															)
														)}
													</Grid>
												)}

												{relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")].related_plaques && (
													<Grid item xs={6}>
														<Typography
															sx={{
																fontWeight: 400,
																fontSize: "16px",
																color: "white",
																ml: 2,
															}}
															variant="h6"
														>
															Susijusios skulpūros ir atminimo lentos
														</Typography>
														{relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")].related_plaques.map(
															(plaque, index) => (
																<Box sx={{ width: "100%", display: "flex" }} key={index}>
																	<Link
																		sx={{
																			p: 0.5,
																			ml: 1.5,
																			width: "100%",
																			position: "relative",
																			fontSize: "14px",
																		}}
																		target="_blank"
																		href={
																			"https://zemelapiai.vplanas.lt" +
																			`/vilniausdnr/${
																				i18n.language
																			}/plaques/object/${plaque.attributes.GlobalID.replace(/[{}]/g, "")}`
																		}
																		rel="noopener"
																		textAlign="left"
																		variant="body2"
																		onClick={(evt) => evt.stopPropagation()}
																	>
																		{plaque.attributes.OBJ_PAV}
																	</Link>
																</Box>
															)
														)}
													</Grid>
												)}

												{relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")].related_foto && (
													<Grid item xs={6}>
														<Typography
															sx={{
																fontWeight: 400,
																fontSize: "16px",
																color: "white",
																ml: 2,
															}}
															variant="h6"
														>
															Susijusios nuotraukos
														</Typography>
														{relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")].related_foto.map(
															(foto, index) => (
																<Box sx={{ width: "100%", display: "flex" }} key={index}>
																	<Link
																		sx={{
																			p: 0.5,
																			ml: 1.5,
																			width: "100%",
																			position: "relative",
																			fontSize: "14px",
																		}}
																		target="_blank"
																		href={
																			"https://zemelapiai.vplanas.lt" +
																			`/vilniausdnr/${
																				i18n.language
																			}/foto/object/${foto.attributes.GlobalID.replace(/[{}]/g, "")}`
																		}
																		rel="noopener"
																		textAlign="left"
																		variant="body2"
																		onClick={(evt) => evt.stopPropagation()}
																	>
																		{foto.attributes.Pavadinimas}
																	</Link>
																</Box>
															)
														)}
													</Grid>
												)}

												{relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")].related_sources && (
													<Grid item xs={6}>
														<Typography
															sx={{
																fontWeight: 400,
																fontSize: "16px",
																color: "white",
																ml: 2,
															}}
															variant="h6"
														>
															{t("plaques.objectPopup.SALTINIS")}
														</Typography>
														{relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")].related_sources.map(
															(source, index) => (
																<Box sx={{ width: "100%", display: "flex" }} key={index}>
																	<Link
																		sx={{
																			ml: 1.5,
																			p: 0.5,
																			width: "100%",
																			position: "relative",
																			fontSize: "14px",
																		}}
																		target="_blank"
																		href={`${source.attributes.Saltinio_URL}`}
																		rel="noopener"
																		textAlign="left"
																		variant="body2"
																		onClick={(evt) => evt.stopPropagation()}
																	>
																		{`${source.attributes.Saltinio_pavadinimas}`}
																	</Link>
																</Box>
															)
														)}
													</Grid>
												)}
											</Grid>
										) : (
											<Grid container spacing={2}>
												{expandedList[index] && (
													<>
														<Grid item xs={6}>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem", bgcolor: "grey.700", ml: 2 }}
															/>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem", bgcolor: "grey.700", ml: 2 }}
															/>
														</Grid>
														<Grid item xs={6}>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem", bgcolor: "grey.700", mr: 2 }}
															/>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem", bgcolor: "grey.700", mr: 2 }}
															/>
														</Grid>
														<Grid item xs={6}>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem", bgcolor: "grey.700", ml: 2 }}
															/>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem", bgcolor: "grey.700", ml: 2 }}
															/>
														</Grid>
														<Grid item xs={6}>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem", bgcolor: "grey.700", mr: 2 }}
															/>
															<Skeleton
																variant="text"
																sx={{ fontSize: "1rem", bgcolor: "grey.700", mr: 2 }}
															/>
														</Grid>
													</>
												)}
											</Grid>
										)}

										<Typography
											sx={{ mx: 2, pb: 1, mt: 1, color: "#D72E30", fontWeight: 400, fontSize: "14px" }}
											variant="body2"
											component="div"
										>
											{expandedList[index] ? "Suskleisti" : "Plačiau..."}
										</Typography>
									</Box>
								</HashScroll>
							</TimelineContent>
						</TimelineItem>
					))}
				</Timeline>
			)}
		</Grid>
	)
}

export default EventTimeline
