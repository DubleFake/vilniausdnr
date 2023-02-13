import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import MuiLinkify from "material-ui-linkify"
import { useTranslation } from "react-i18next"

import { view, objects } from "../../../utils/streetsArcgisItems"

import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import ShareIcon from "@mui/icons-material/Share"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Pagination from "@mui/material/Pagination"
import CircularProgress from "@mui/material/CircularProgress"
import useMediaQuery from "@mui/material/useMediaQuery"
import Backdrop from "@mui/material/Backdrop"
import Fade from "@mui/material/Fade"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent"
import Grid from "@mui/material/Grid"

let highlight
const ObjectPopup = (props) => {
	const { globalID } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const [objectAttr, setObjectAttr] = useState({})
	const [coded, setCoded] = useState({})
	const [objectPer, setObjectPer] = useState([])
	const [relatedFoto, setRelatedFoto] = useState([])
	const [relatedStreets, setRelatedStreets] = useState([])
	const [loading, setLoading] = useState(true)
	const [queryObjects, setQueryObjects] = useState([])
	const [popupOpen, setPopupOpen] = useState(false)
	const [page, setPage] = useState(1)
	const [pageCount, setPageCount] = useState(1)
	const [shareTooltip, setShareTooltip] = useState(false)

	const handlePage = (event, value) => {
		navigate(`/vilniausdnr/${i18n.language}/streets/object/${queryObjects[value - 1].attributes.GAT_ID}`)
	}

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
		if (!props.initialLoading) {
			setPopupOpen(true)
			setLoading(true)

			let found = false
			for (let obj in props.mapQuery) {
				if (!props.mapQuery.GlobalID && props.mapQuery[obj].attributes.GAT_ID === globalID) {
					setPage(parseInt(obj) + 1)
					found = true
				}
			}

			if (found) {
				setQueryObjects(props.mapQuery)
				setPageCount(props.mapQuery.length)
			} else {
				setPageCount(1)
				setPage(1)
			}

			view.whenLayerView(objects).then((objectsView) => {
				objects
					.queryFeatures({
						where: `GAT_ID = ${globalID}`,
						outFields: ["OBJECTID", "PAV", "Klasė", "Poklasis", "Shape.STLength()"],
						returnGeometry: true,
					})
					.then((response) => {
						if (highlight) {
							highlight.remove()
						}

						if (response.features.length === 0) {
							navigate(`/vilniausdnr/${i18n.language}/streets`)
							return
						}

						view.goTo(response.features[0].geometry.extent)
						highlight = objectsView.highlight(response.features[0])
						props.setSelectedObject(`${globalID}`)

						// const allAttributes = []

						// let count = 0
						// for (let attr in response.features[0].attributes) {
						// 	if (
						// 		response.features[0].attributes[attr] !== null &&
						// 		response.features[0].attributes[attr] !== "" &&
						// 		response.features[0].attributes[attr] !== 0 &&
						// 		(attr === "PAV" || attr === "Klasė" || attr === "Poklasis" || attr === "Shape.STLength()")
						// 	) {
						// 		const obj = {}

						// 		obj.alias = response.features[0].layer.fields[count].alias
						// 		if (response.features[0].layer.fields[count].domain === null) {
						// 			obj.value = response.features[0].attributes[attr]
						//       console.log(obj.value)
						// 		} else {
						// 			for (let code in response.features[0].layer.fields[count].domain.codedValues) {
						// 				if (
						// 					response.features[0].layer.fields[count].domain.codedValues[code].code ===
						// 					response.features[0].attributes[attr]
						// 				) {
						// 					obj.value = response.features[0].layer.fields[count].domain.codedValues[code].name
						// 					obj.code = response.features[0].layer.fields[count].domain.codedValues[code].code
						// 				}
						// 			}
						// 		}

						// 		obj.field = attr
						// 		allAttributes.push(obj)
						// 	}
						// 	count++
						// }

						const tempCoded = {}
						for (let field of response.fields) {
							if (field.domain) {
								tempCoded[field.alias] = {}
								for (let coded of field.domain.codedValues) {
									tempCoded[field.alias][coded.code] = coded.name
								}
							}
						}

						setCoded(tempCoded)
						setObjectAttr(response.features[0].attributes)
						return response.features[0].attributes.OBJECTID
					})
					.then(() => {
						setLoading(false)
					})
					.catch((error) => {
						console.error(error)
					})
			})
		}
	}, [globalID, props.initialLoading])

	useEffect(() => {
		const allPersons = []

		objects
			.queryFeatures({
				where: `GAT_ID = ${globalID}`,
				outFields: ["OBJECTID", "GAT_ID"],
			})
			.then((response) => {
				objects
					.queryRelatedFeatures({
						outFields: ["Asmenybes_ID", "Vardas_lietuviskai", "Asmenybes_ID"],
						relationshipId: 4,
						objectIds: response.features[0].attributes.OBJECTID,
					})
					.then((response_related) => {
						if (Object.keys(response_related).length === 0) {
							setObjectPer([])
							return
						}
						Object.keys(response_related).forEach((objectId) => {
							const person = response_related[objectId].features
							person.forEach((person) => {
								allPersons.push(person)
							})
						})
						setObjectPer(allPersons)
					})
					.catch((error) => {
						console.error(error)
					})

				objects
					.queryRelatedFeatures({
						outFields: ["Pavadinimas", "GlobalID", "Data_tekstu"],
						relationshipId: 6,
						objectIds: response.features[0].attributes.OBJECTID,
					})
					.then((response_related) => {
						setRelatedFoto(response_related[response.features[0].attributes.OBJECTID].features)
					})
					.catch((error) => {
						console.error(error)
					})
			})
	}, [globalID])

	useEffect(() => {
		setRelatedStreets([])

		objects
			.queryFeatures({
				where: `GAT_ID = ${globalID}`,
				outFields: ["OBJECTID", "GAT_ID"],
			})
			.then(async (response) => {
				let tempFeatures = []
				const relateID = [4, 5, 6, 7, 8, 9, 10]

				for (let i of relateID) {
					await objects
						.queryRelatedFeatures({
							outFields: ["GlobalID", "Pavadinimas", "Metai"],
							relationshipId: i,
							objectIds: response.features[0].attributes.OBJECTID,
						})
						.then((response_related) => {
							if (response_related[response.features[0].attributes.OBJECTID]) {
								for (let feature in response_related[response.features[0].attributes.OBJECTID].features) {
									const tempObj = {}
									tempObj.GlobalID =
										response_related[response.features[0].attributes.OBJECTID].features[
											feature
										].attributes.GlobalID
									tempObj.Metai = parseInt(
										response_related[response.features[0].attributes.OBJECTID].features[feature].attributes
											.Metai
									)
									tempObj.Pavadinimas =
										response_related[response.features[0].attributes.OBJECTID].features[
											feature
										].attributes.Pavadinimas
									tempObj.Linked = i === 4 ? false : true

									tempFeatures.push(tempObj)
								}
							}
						})
				}
				tempFeatures.sort((a, b) => a.Metai - b.Metai)
				setRelatedStreets(tempFeatures)
			})
	}, [globalID])

	useEffect(() => {
		return () => {
			setPage(1)
			setPageCount(1)
			props.setSelectedObject("")
			setQueryObjects([])
			setPopupOpen(false)

			if (highlight) {
				highlight.remove()
			}
		}
	}, [])

	const matches = useMediaQuery("(min-width:600px)")
	return (
		<>
			{!matches && (
				<Backdrop
					sx={{ color: "#fff", zIndex: 2 }}
					open={popupOpen}
					onClick={() => setPopupOpen(false)}
				></Backdrop>
			)}
			<Fade in={true} timeout={300} unmountOnExit>
				<Box sx={{ top: 90, right: 0, position: "fixed", zIndex: 10, mt: 0.5 }}>
					<Card variant="popup">
						<CardContent sx={{ pt: 0, px: 4, pb: "8px !important" }}>
							{pageCount > 1 ? (
								<Box component="div" display="flex" justifyContent="center" alignItems="center">
									<Pagination count={pageCount} page={page} onChange={handlePage} />
								</Box>
							) : null}
							{loading ? (
								<Box display="flex" justifyContent="center" alignItems="center">
									<CircularProgress />
								</Box>
							) : (
								<>
									<CardHeader
										sx={{ p: 0, mt: 1 }}
										action={
											<IconButton
												color="primary"
												aria-label="close"
												size="small"
												onClick={() => {
													navigate(`/vilniausdnr/${i18n.language}/streets`)
												}}
												sx={{
													mt: 1,
													mr: -1.5,
													backgroundColor: "#F6F6F6",
													"&:hover": {
														transition: "0.3s",
														backgroundColor: "white",
													},
												}}
											>
												<CloseIcon sx={{ fontSize: 25 }} />
											</IconButton>
										}
										title={
											<>
												<Typography
													sx={{ color: "white", fontWeight: 600, fontSize: "26px", display: "inline" }}
												>
													{objectAttr.PAV}
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
															onClick={handleShare}
															sx={{ mt: -0.5 }}
														>
															<ShareIcon style={{ fontSize: 25 }} />
														</IconButton>
													</BootstrapTooltip>
												</Typography>
											</>
										}
									/>
									<Grid container spacing={2}>
										{objectAttr.Klasė && (
											<Grid item xs={6}>
												<Typography sx={{ color: "white" }} variant="h6" component="div">
													Klasė
													<Typography sx={{ color: "white" }} variant="body2" component="div">
														{coded["Klasė"][objectAttr.Klasė]}
													</Typography>
												</Typography>
											</Grid>
										)}

										{objectAttr.Poklasis && (
											<Grid item xs={6}>
												<Typography sx={{ color: "white" }} variant="h6" component="div">
													Poklasis
													<Typography sx={{ color: "white" }} variant="body2" component="div">
														{coded["Poklasis"][objectAttr.Poklasis]}
													</Typography>
												</Typography>
											</Grid>
										)}

										{objectAttr["Shape.STLength()"] && (
											<Grid item xs={6}>
												<Typography sx={{ color: "white" }} variant="h6" component="div">
													Gatvės ilgis (m)
													<Typography sx={{ color: "white" }} variant="body2" component="div">
														{Math.round(objectAttr["Shape.STLength()"])}
													</Typography>
												</Typography>
											</Grid>
										)}

										{objectPer.length ? (
											<Grid item xs={6}>
												<Typography sx={{ color: "white" }} variant="h6" component="div">
													{objectPer.length > 1
														? t("plaques.objectPopup.relatedMany")
														: t("plaques.objectPopup.relatedOne")}
													<Typography component="div">
														{Object.keys(objectPer).map((per) => (
															<div key={per}>
																<Link
																	sx={{ mt: 0.5 }}
																	target="_blank"
																	href={
																		"https://zemelapiai.vplanas.lt" +
																		`/vilniausdnr/${i18n.language}/persons/${objectPer[
																			per
																		].attributes.Asmenybes_ID.replace(/[{}]/g, "")}`
																	}
																	rel="noopener"
																	textAlign="left"
																	variant="body2"

																	// textAlign="left"
																	// component="button"
																	// variant="body2"
																	// onClick={() => {
																	// 	navigate(
																	// 		`/vilniausdnr/${i18n.language}/persons/${objectPer[per].attributes.Asmenybes_ID.replace(/[{}]/g, "")}`
																	// 	)
																	// }}
																>{`${objectPer[per].attributes.Vardas_lietuviskai}`}</Link>
																<br></br>
															</div>
														))}
													</Typography>
												</Typography>
											</Grid>
										) : null}
									</Grid>

									{(relatedStreets.length > 0 || relatedFoto.length > 0) && (
										<hr
											style={{
												color: "gray",
												backgroundColor: "gray",
												height: 1,
												width: "100%",
												border: "none",
												marginTop: 10,
												marginBottom: 15,
											}}
										/>
									)}

									{relatedStreets.length > 0 && (
										<Typography sx={{ mt: 2, color: "white" }} variant="h6" component="div">
											Istoriniuose žemėlapiuose pateikiami gatvės ar jos dalies pavadinimai (originalia forma)
											<Typography component="div">
												<Timeline sx={{ m: 0, mt: 1, p: 0 }}>
													{relatedStreets.map((street, i) => (
														<TimelineItem key={i}>
															<TimelineOppositeContent
																sx={{ mt: 0.1, pl: 1, maxWidth: 50, fontWeight: 400, fontSize: 14 }}
																align="right"
																color="white"
															>
																{street.Metai}
															</TimelineOppositeContent>
															<TimelineSeparator>
																<TimelineDot />
																{i !== relatedStreets.length - 1 && <TimelineConnector />}
															</TimelineSeparator>
															<TimelineContent sx={{ mt: 0 }}>
																{street.Linked ? (
																	<Link
																		sx={{ fontWeight: 400, fontSize: 14 }}
																		// target="_blank"
																		// href={
																		// 	"https://zemelapiai.vplanas.lt" +
																		// 	`/vilniausdnr/${
																		// 		i18n.language
																		// 	}/streets/compare/timeline/${street.GlobalID.replace(/[{}]/g, "")}`
																		// }
																		// rel="noopener"
																		// textAlign="left"
																		// variant="body2"

																		textAlign="left"
																		component="button"
																		variant="body2"
																		onClick={() => {
																			props.setHistoryToggle(true)
																			props.setMapQuery(street)
																			navigate(
																				`/vilniausdnr/${
																					i18n.language
																				}/streets/compare/timeline/${street.GlobalID.replace(/[{}]/g, "")}`
																			)
																		}}
																	>{`${street.Pavadinimas}`}</Link>
																) : (
																	<Typography sx={{ fontWeight: 400, fontSize: 14 }}>
																		{street.Pavadinimas}
																	</Typography>
																)}
															</TimelineContent>
														</TimelineItem>
													))}
												</Timeline>
											</Typography>
										</Typography>
									)}

									{relatedFoto.length > 0 && (
										<Typography sx={{ color: "white" }} variant="h6" component="div">
											Susijusios nuotraukos
											<Typography component="div">
												{relatedFoto.map((foto) => (
													<div key={foto.attributes.GlobalID}>
														<Link
															sx={{ mt: 0.5 }}
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

															// textAlign="left"
															// component="button"
															// variant="body2"
															// onClick={() => {
															// 	navigate(
															// 		`/vilniausdnr/${i18n.language}/persons/${objectPer[per].attributes.Asmenybes_ID.replace(/[{}]/g, "")}`
															// 	)
															// }}
														>{`${foto.attributes.Pavadinimas} ${foto.attributes.Data_tekstu}`}</Link>
														<br></br>
													</div>
												))}
											</Typography>
										</Typography>
									)}
								</>
							)}
						</CardContent>
					</Card>
				</Box>
			</Fade>
		</>
	)
}

export default ObjectPopup
