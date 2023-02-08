import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import MuiLinkify from "material-ui-linkify"
import { useTranslation } from "react-i18next"

import { maps, view } from "../../../utils/periodsArcgisItems"

import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import ShareIcon from "@mui/icons-material/Share"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Pagination from "@mui/material/Pagination"
import CircularProgress from "@mui/material/CircularProgress"
import useMediaQuery from "@mui/material/useMediaQuery"
import Backdrop from "@mui/material/Backdrop"
import Fade from "@mui/material/Fade"

let highlight
const ObjectPopup = (props) => {
	const { globalID } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const [loading, setLoading] = useState(true)
	const [queryObjects, setQueryObjects] = useState({})
	const [relatedMaps, setRelatedMaps] = useState([])
	const [popupOpen, setPopupOpen] = useState(false)
	const [page, setPage] = useState(1)
	const [pageCount, setPageCount] = useState(1)
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
		const clickHandles = view.on("click", () => {
			setPopupOpen(true)
		})
		view.addHandles(clickHandles)
	}, [])

	useEffect(() => {
		setLoading(true)

		maps
			.queryFeatures({
				where: `Sudarytas = '${globalID}' AND Grupe = 'Istorinių topografijų rekonstrukcijos'`,
				outFields: ["*"],
				returnGeometry: false,
			})
			.then((response) => {
				setQueryObjects(response.features[0].attributes)
				return response.features[0].attributes.OBJECTID
			})
			.then((OBJECTID) => {
				maps
					.queryRelatedFeatures({
						outFields: ["*"],
						relationshipId: 21,
						returnGeometry: false,
						objectIds: OBJECTID,
					})
					.then(async (related_response) => {
						let tempRelatedList = []

						if (!related_response[OBJECTID]) {
							setLoading(false)
							return tempRelatedList
						}

						for (let feature of related_response[OBJECTID].features) {
							await maps
								.queryFeatures({
									where: `GlobalID_zemelapio = '${feature.attributes.ZEMELAPIO_ID_SUSIJUSIO}'`,
									outFields: ["Pavadinimas", "GlobalID_zemelapio"],
									returnGeometry: false,
								})
								.then((related_map) => {
									tempRelatedList.push(related_map)
								})
						}
						return tempRelatedList
					})
					.then((relatedList) => {
						setRelatedMaps(relatedList)
						setPopupOpen(true)
						setLoading(false)
					})
			})
	}, [globalID])

	useEffect(() => {
		return () => {
			setPage(1)
			setPageCount(1)
			// props.setSelectedObject("")
			setQueryObjects({})
			setPopupOpen(false)

			view.removeHandles()

			if (highlight) {
				highlight.remove()
			}
		}
	}, [])

	const matches = useMediaQuery("(min-width:995px)")
	return (
		<Box sx={{ visibility: popupOpen ? "visible" : "hidden" }}>
			{!matches && <Backdrop sx={{ color: "#fff", zIndex: 2 }} open={popupOpen}></Backdrop>}
			<Fade in={true} timeout={300} unmountOnExit>
				<Box sx={{ top: 90, right: 0, position: "fixed", zIndex: 3, mt: 0.5 }}>
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
										sx={{ p: 0, mt: 0 }}
										action={
											<IconButton
												color="primary"
												aria-label="close"
												size="small"
												onClick={() => {
													setPopupOpen(false)
												}}
												sx={{
													mt: 0.5,
													mr: 1,
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
													{queryObjects.Pavadinimas}
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

									{queryObjects.Mastelis && (
										<Typography
											sx={{ color: "white", fontWeight: 500, fontSize: "14px" }}
											variant="body2"
											component="div"
										>
											{queryObjects.Mastelis}
										</Typography>
									)}

									{queryObjects.Aprasymas && (
										<Typography
											sx={{ color: "white", fontWeight: 400, mt: 2 }}
											variant="body2"
											component="div"
										>
											{queryObjects.Aprasymas}
										</Typography>
									)}

									{queryObjects.Legenda && (
										<>
											<Typography
												sx={{ color: "white", fontWeight: 500, fontSize: "18px", mt: 1 }}
												variant="h6"
												component="div"
											>
												Sutartiniai ženklai
											</Typography>
											<img src={queryObjects.Legenda} style={{ width: "100%" }}></img>
										</>
									)}

									{(queryObjects.Saltinis || queryObjects.Autorius) && (
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

									<Grid container spacing={2}>
										{queryObjects.Autorius !== "-" && queryObjects.Autorius !== null && (
											<Grid item xs={6}>
												<Typography
													sx={{ color: "white", fontWeight: 500, fontSize: "18px" }}
													variant="h6"
													component="div"
												>
													{t(`plaques.objectPopup.AUTORIUS`)}
													<Typography
														sx={{ color: "white", fontWeight: 400 }}
														variant="body2"
														component="div"
													>
														{queryObjects.Autorius}
													</Typography>
												</Typography>
											</Grid>
										)}

										{relatedMaps.length > 0 && (
											<Grid item xs={8}>
												<Typography
													sx={{ color: "white", fontWeight: 500, fontSize: "18px" }}
													variant="h6"
													component="div"
												>
													Originalūs naudoti žemėlapiai
												</Typography>
												{relatedMaps.map((map, index) => (
													<Link
														sx={{ mt: 0.5, display: "block" }}
														target="_blank"
														href={
															"https://zemelapiai.vplanas.lt" +
															`/vilniausdnrtest/${
																i18n.language
															}/maps/compare/review/${map.features[0].attributes.GlobalID_zemelapio.replace(
																/[{}]/g,
																""
															)}`
														}
														rel="noopener"
														textAlign="left"
														variant="body2"
														key={index}
													>
														{`${map.features[0].attributes.Pavadinimas}`}
													</Link>
												))}
											</Grid>
										)}

										{queryObjects.Saltinis && (
											<Grid item xs={4}>
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
													href={`${queryObjects.Saltinio_nuoroda}`}
													rel="noopener"
													textAlign="left"
													variant="body2"
												>{`${queryObjects.Saltinis}`}</Link>
											</Grid>
										)}
									</Grid>
								</>
							)}
						</CardContent>
					</Card>
				</Box>
			</Fade>
		</Box>
	)
}

export default ObjectPopup
