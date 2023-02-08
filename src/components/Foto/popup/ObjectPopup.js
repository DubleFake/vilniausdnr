import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import MuiLinkify from "material-ui-linkify"
import { useTranslation } from "react-i18next"

import { view, objects } from "../../../utils/fotoArcgisItems"

import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import ShareIcon from "@mui/icons-material/Share"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Pagination from "@mui/material/Pagination"
import CircularProgress from "@mui/material/CircularProgress"
import useMediaQuery from "@mui/material/useMediaQuery"
import Backdrop from "@mui/material/Backdrop"
import Fade from "@mui/material/Fade"
import Grid from "@mui/material/Grid"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

let highlight
const ObjectPopup = (props) => {
	const { globalID } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const [objectAttr, setObjectAttr] = useState([])
	const [objectPer, setObjectPer] = useState([])
	const [objectStr, setObjectStr] = useState([])
	const [objectAtt, setObjectAtt] = useState([])
	const [loading, setLoading] = useState(true)
	const [queryObjects, setQueryObjects] = useState([])
	const [popupOpen, setPopupOpen] = useState(false)
	const [page, setPage] = useState(1)
	const [pageCount, setPageCount] = useState(1)
	const [shareTooltip, setShareTooltip] = useState(false)

	const handlePage = (event, value) => {
		navigate(
			`/vilniausdnrtest/${i18n.language}/foto/object/${queryObjects[value - 1].attributes.GlobalID.replace(
				/[{}]/g,
				""
			)}`
		)
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
				if (
					!props.mapQuery.GlobalID &&
					props.mapQuery[obj].attributes.GlobalID.replace(/[{}]/g, "") === globalID
				) {
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
				query.where = `GlobalID = '${globalID}'`

				objects //objectsView neveikia??
					.queryFeatures(query)
					.then((response) => {
						if (highlight) {
							highlight.remove()
						}

						if (response.features.length === 0) {
							navigate(`/vilniausdnrtest/${i18n.language}/foto`)
							return
						}

						objects
							.queryRelatedFeatures({
								outFields: ["Asmenybes_ID", "Vardas_lietuviskai"],
								relationshipId: 18,
								returnGeometry: false,
								objectIds: response.features[0].attributes.OBJECTID,
							})
							.then((related_persons) => {
								const allPersons = []

								Object.keys(related_persons).forEach((objectId) => {
									const person = related_persons[objectId].features

									person.forEach((person) => {
										allPersons.push(person)
									})
								})
								setObjectPer(allPersons)
							})

						objects
							.queryRelatedFeatures({
								outFields: ["GAT_ID", "PAV"],
								relationshipId: 11,
								returnGeometry: false,
								objectIds: response.features[0].attributes.OBJECTID,
							})
							.then((related_persons) => {
								const allStreets = []

								Object.keys(related_persons).forEach((objectId) => {
									const person = related_persons[objectId].features

									person.forEach((person) => {
										allStreets.push(person)
									})
								})
								setObjectStr(allStreets)
							})

						view.goTo({ target: response.features[0].geometry, zoom: 8 })
						highlight = objectsView.highlight(response.features[0])
						props.setSelectedObject(`${globalID}`)

						setObjectAttr(response.features[0].attributes)
						setLoading(false)
					})
					.catch((error) => {
						console.error(error)
					})
			})
		}
	}, [globalID, props.initialLoading])

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
				<Card variant="popup">
					<CardContent sx={{ pt: 0, px: 4 }}>
						{pageCount > 1 ? (
							<Box component="div" display="flex" justifyContent="center" alignItems="center">
								<Pagination
									sx={{ mb: 1, ".MuiPaginationItem-root": { color: "white" } }}
									color="secondary"
									count={pageCount}
									page={page}
									onChange={handlePage}
								/>
							</Box>
						) : null}
						{loading ? (
							<Box display="flex" justifyContent="center" alignItems="center">
								<CircularProgress />
							</Box>
						) : (
							<>
								{/* {objectAtt.length
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
									: null} */}

								<IconButton
									color="primary"
									aria-label="close"
									size="small"
									onClick={() => {
										navigate(`/vilniausdnrtest/${i18n.language}/foto`)
									}}
									sx={{
										mt: 2,
										mr: 1,
										position: "fixed",
										zIndex: 10,
										right: 0,
										backgroundColor: "#F6F6F6",
										"&:hover": {
											transition: "0.3s",
											backgroundColor: "white",
										},
									}}
								>
									<CloseIcon sx={{ fontSize: 25 }} />
								</IconButton>

								<Box sx={{ my: 1, mx: -4, mt: -1, display: "flex", justifyContent: "center" }}>
									<a href={`${objectAttr.Nuotraukos_URL}`} target="_blank">
										<img
											style={{ maxWidth: "100%", maxHeight: "auto" }}
											src={`${objectAttr.Nuotraukos_URL}`}
										/>
									</a>
								</Box>

								<CardHeader
									sx={{ p: 0, mt: 2 }}
									title={
										<>
											<Typography
												sx={{ color: "white", fontWeight: 600, fontSize: "26px", display: "inline" }}
											>
												{objectAttr.Pavadinimas}
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

								{objectAttr.Data_tekstu && (
									<Typography
										sx={{ color: "white", fontWeight: 500, fontSize: "14px" }}
										variant="body2"
										component="div"
									>
										{objectAttr.Data_tekstu}
									</Typography>
								)}

								{(objectAttr.Saltinis || objectAttr.Autorius) && (
									<hr
										style={{
											color: "gray",
											backgroundColor: "gray",
											height: 1,
											width: "100%",
											border: "none",
											marginTop: 15,
											marginBottom: 25,
										}}
									/>
								)}

								<Grid container spacing={2}>
									{objectAttr.Autorius !== "-" && (
										<Grid item xs={6}>
											<Typography
												sx={{ color: "white", fontWeight: 500, fontSize: "18px" }}
												variant="h6"
												component="div"
											>
												{t(`plaques.objectPopup.AUTORIUS`)}
												<Typography sx={{ color: "white", fontWeight: 400 }} variant="body2" component="div">
													{objectAttr.Autorius}
												</Typography>
											</Typography>
										</Grid>
									)}

									{objectAttr.Saltinis && (
										<Grid item xs={6}>
											<Typography
												sx={{ color: "white", fontWeight: 500, fontSize: "18px" }}
												variant="h6"
												component="div"
											>
												{t("plaques.objectPopup.SALTINIS")}
											</Typography>
											<Link
												sx={{ mt: 0.5 }}
												target="_blank"
												href={`${objectAttr.Saltinio_nuoroda}`}
												rel="noopener"
												textAlign="left"
												variant="body2"
											>{`${objectAttr.Saltinis}`}</Link>
										</Grid>
									)}

									{objectPer.length ? (
										<Grid item xs={6}>
											<Typography
												sx={{ color: "white", fontWeight: 500, fontSize: "18px" }}
												variant="body2"
												component="div"
											>
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
																	`/vilniausdnrtest/${i18n.language}/persons/${objectPer[
																		per
																	].attributes.Asmenybes_ID.replace(/[{}]/g, "")}`
																}
																rel="noopener"
																textAlign="left"
																variant="body2"
															>{`${objectPer[per].attributes.Vardas_lietuviskai}`}</Link>
															<br></br>
														</div>
													))}
												</Typography>
											</Typography>
										</Grid>
									) : null}

									{objectStr.length ? (
										<Grid item xs={6}>
											<Typography
												sx={{ color: "white", fontWeight: 500, fontSize: "18px" }}
												variant="body2"
												component="div"
											>
												Susijusi gatvė
												<Typography component="div">
													{Object.keys(objectStr).map((str) => (
														<div key={str}>
															<Link
																sx={{ mt: 0.5 }}
																target="_blank"
																href={
																	"https://zemelapiai.vplanas.lt" +
																	`/vilniausdnrtest/${i18n.language}/streets/object/${objectStr[str].attributes.GAT_ID}`
																}
																rel="noopener"
																textAlign="left"
																variant="body2"
															>{`${objectStr[str].attributes.PAV}`}</Link>
															<br></br>
														</div>
													))}
												</Typography>
											</Typography>
										</Grid>
									) : null}
								</Grid>
							</>
						)}
					</CardContent>
				</Card>
			</Fade>
		</>
	)
}

export default ObjectPopup
