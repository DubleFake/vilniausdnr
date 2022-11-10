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

let highlight
const ObjectPopup = (props) => {
	const { globalID } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const [objectAttr, setObjectAttr] = useState([])
	const [objectPer, setObjectPer] = useState([])
	const [objectAtt, setObjectAtt] = useState([])
	const [relatedStreets, setRelatedStreets] = useState([])
	const [relatedStreets2, setRelatedStreets2] = useState(false)
	const [relatedStreets3, setRelatedStreets3] = useState(false)
	const [relatedStreets4, setRelatedStreets4] = useState(false)
	const [relatedStreets5, setRelatedStreets5] = useState(false)
	const [relatedStreets6, setRelatedStreets6] = useState(false)
	const [relatedStreets7, setRelatedStreets7] = useState(false)
	const [relatedStreetsShow, setRelatedStreetsShow] = useState(false)
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
				if (props.mapQuery[obj].attributes.GAT_ID === globalID) {
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
				let query = objectsView.createQuery()
				query.where = `GAT_ID = ${globalID}`

				objects
					.queryFeatures(query)
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

						return response
					})
					.then((response) => {
						const allAttributes = []

						let count = 0
						for (let attr in response.features[0].attributes) {
							if (
								response.features[0].attributes[attr] === null ||
								response.features[0].attributes[attr] === "" ||
								response.features[0].attributes[attr] === 0 ||
								attr === "OBJECTID" ||
								attr === "GAT_ID" ||
								attr === "GAT_ID_1" ||
								attr === "GAT_GYV_ID" ||
								attr === "Shape__Length"
							) {
							} else {
								const obj = {}

								obj.alias = response.features[0].layer.fields[count].alias
								if (response.features[0].layer.fields[count].domain === null) {
									obj.value = response.features[0].attributes[attr]
								} else {
									for (let code in response.features[0].layer.fields[count].domain.codedValues) {
										if (
											response.features[0].layer.fields[count].domain.codedValues[code].code ===
											response.features[0].attributes[attr]
										) {
											obj.value = response.features[0].layer.fields[count].domain.codedValues[code].name
											obj.code = response.features[0].layer.fields[count].domain.codedValues[code].code
										}
									}
								}

								obj.field = attr
								allAttributes.push(obj)
							}
							count++
						}
						setObjectAttr(allAttributes)
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
						outFields: ["Asmenybes_ID", "Vardas_lietuviskai", "Pavarde_lietuviskai", "Asmenybes_ID"],
						relationshipId: 8,
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
			})
	}, [globalID])

	useEffect(() => {
		setRelatedStreets([])
		setRelatedStreets2(false)
		setRelatedStreets3(false)
		setRelatedStreets4(false)
		setRelatedStreets5(false)
		setRelatedStreets6(false)
		setRelatedStreets7(false)

		objects
			.queryFeatures({
				where: `GAT_ID = ${globalID}`,
				outFields: ["OBJECTID", "GAT_ID"],
			})
			.then((response) => {
				let tempFeatures = []
				for (let i = 2; i <= 7; i++) {
					objects
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
									tempFeatures.push(tempObj)
								}
								tempFeatures.sort((a, b) => a.Metai - b.Metai)
								setRelatedStreets(tempFeatures)
							}

							switch (i) {
								case 2:
									setRelatedStreets2(true)
									break
								case 3:
									setRelatedStreets3(true)
									break
								case 4:
									setRelatedStreets4(true)
									break
								case 5:
									setRelatedStreets5(true)
									break
								case 6:
									setRelatedStreets6(true)
									break
								case 7:
									setRelatedStreets7(true)
									break
							}
						})
				}
			})
	}, [globalID])

	useEffect(() => {
		if (
			relatedStreets2 &&
			relatedStreets3 &&
			relatedStreets4 &&
			relatedStreets5 &&
			relatedStreets6 &&
			relatedStreets7
		) {
			setRelatedStreetsShow(true)
		}
	}, [relatedStreets2, relatedStreets3, relatedStreets4, relatedStreets5, relatedStreets6, relatedStreets7])

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

	const matches = useMediaQuery("(min-width:995px)")
	return (
		<>
			{!matches && <Backdrop sx={{ color: "#fff", zIndex: 2 }} open={popupOpen}></Backdrop>}
			<Fade in={true} timeout={300} unmountOnExit>
				<Box sx={{ top: 90, right: 0, position: "fixed", zIndex: 3 }}>
					<Card
						sx={{
							borderRadius: "0px",
							maxWidth: matches ? "auto" : 995,
							width: matches ? 600 : "100vw",
							mt: matches ? 1.5 : 0,
							mr: matches ? 1.5 : 0,
						}}
					>
						<CardContent
							sx={{
								maxHeight: window.innerHeight - 170,
								overflowY: "auto",
								overflowX: "hidden",
							}}
						>
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
										sx={{ px: 0, pt: 0.5, pb: 1 }}
										action={
											<>
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
													<IconButton color="secondary" aria-label="share" size="large" onClick={handleShare}>
														<ShareIcon style={{ fontSize: 30 }} />
													</IconButton>
												</BootstrapTooltip>
												<IconButton
													color="secondary"
													aria-label="close"
													size="large"
													onClick={() => {
														navigate(`/vilniausdnr/${i18n.language}/streets`)
													}}
												>
													<CloseIcon style={{ fontSize: 30 }} />
												</IconButton>
											</>
										}
										title={Object.keys(objectAttr).map((attr) =>
											objectAttr[attr].field === "PAV" ? objectAttr[attr].value : null
										)}
									/>
									<TableContainer sx={{ mb: 1 }} component={Paper}>
										<Table size="small">
											<TableBody>
												{Object.keys(objectAttr).map((attr) =>
													objectAttr[attr].field === "OBJ_APRAS" ||
													objectAttr[attr].field === "AUTORIUS" ||
													objectAttr[attr].field === "OBJ_PAV" ||
													objectAttr[attr].field === "SALTINIS" ? null : (
														<TableRow
															key={objectAttr[attr].field}
															sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
														>
															<TableCell component="th" scope="row">
																{/* {t(`plaques.objectPopup.${objectAttr[attr].field}`)} */}
																{objectAttr[attr].field}
															</TableCell>
															<TableCell align="right">
																{objectAttr[attr].field === "TIPAS"
																	? t(`plaques.options.objects.${objectAttr[attr].code}`)
																	: objectAttr[attr].field === "ATMINT_TIP"
																	? t(`plaques.options.memories.${objectAttr[attr].code}`)
																	: objectAttr[attr].value}
															</TableCell>
														</TableRow>
													)
												)}
											</TableBody>
										</Table>
									</TableContainer>
									{Object.keys(objectAttr).map((attr) =>
										objectAttr[attr].field === "OBJ_APRAS" || objectAttr[attr].field === "AUTORIUS" ? (
											<Typography variant="h6" component="div" key={objectAttr[attr].field}>
												{t(`plaques.objectPopup.${objectAttr[attr].field}`)}
												<Typography variant="body2" component="div">
													{objectAttr[attr].value}
												</Typography>
											</Typography>
										) : null
									)}
									{Object.keys(objectAttr).map((attr) =>
										objectAttr[attr].field === "SALTINIS" ? (
											<Typography variant="h6" component="div" key={objectAttr[attr].field}>
												{t(`plaques.objectPopup.${objectAttr[attr].field}`)}
												<MuiLinkify LinkProps={{ target: "_blank", rel: "noopener", rel: "noreferrer" }}>
													<Typography variant="body2" component="div">
														{objectAttr[attr].value}
													</Typography>
												</MuiLinkify>
											</Typography>
										) : null
									)}

									{objectPer.length ? (
										<Typography variant="h6" component="div">
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
														>{`${objectPer[per].attributes.Vardas_lietuviskai} ${objectPer[per].attributes.Pavarde_lietuviskai}`}</Link>
														<br></br>
													</div>
												))}
											</Typography>
										</Typography>
									) : null}

									{relatedStreetsShow && (
										<Typography variant="h6" component="div">
											Susijusios gatvės
											<Typography component="div">
												<Timeline sx={{ m: 0, mt: 1, p: 0 }}>
													{relatedStreets.map((street, i) => (
														<TimelineItem key={i}>
															<TimelineOppositeContent
																sx={{ mt: 0.1, pl: 1, maxWidth: 50 }}
																align="right"
																color="text.secondary"
															>
																{street.Metai}
															</TimelineOppositeContent>
															<TimelineSeparator>
																<TimelineDot />
																{i !== relatedStreets.length - 1 && <TimelineConnector />}
															</TimelineSeparator>
															<TimelineContent sx={{ mt: 0 }}>
																<Link
																	sx={{ mt: 0.5 }}
																	target="_blank"
																	href={
																		"https://zemelapiai.vplanas.lt" +
																		`/vilniausdnr/${
																			i18n.language
																		}/streets/compare/timeline/${street.GlobalID.replace(/[{}]/g, "")}`
																	}
																	rel="noopener"
																	textAlign="left"
																	variant="body2"
																>{`${street.Pavadinimas}`}</Link>
															</TimelineContent>
														</TimelineItem>
													))}
												</Timeline>
											</Typography>
										</Typography>
									)}

									{objectAtt.length
										? Object.keys(objectAtt).map((att) => (
												<Box sx={{ mt: 1 }} key={att}>
													<a href={`${objectAtt[att].url}`} target="_blank">
														<img
															style={{ maxWidth: "100%", maxHeight: "auto" }}
															src={`${objectAtt[att].url}`}
														/>
													</a>
												</Box>
										  ))
										: null}
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
