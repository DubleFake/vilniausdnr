import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import MuiLinkify from "material-ui-linkify"
import { useTranslation } from "react-i18next"

import { maps } from "../../../utils/mapsArcgisItems"

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
		setPopupOpen(true)
		setLoading(true)

		maps
			.queryFeatures({
				where: `GlobalID_zemelapio = '${globalID}'`,
				outFields: ["*"],
				returnGeometry: false,
			})
			.then((response) => {
				setQueryObjects(response.features[0].attributes)

				setLoading(false)
			})

		// for (let period of periods) {
		// 	period
		// 		.queryFeatures({
		// 			where: `GlobalID = '${globalID}'`,
		// 			outFields: ["*"],
		// 			returnGeometry: true,
		// 		})
		// 		.then((response) => {
		// 			if (response.features.length > 0) {
		// 				setQueryObjects(response.features)
		// 				setLoading(false)
		// 				props.setInitialPeriod(period)

		// 				if (highlight) {
		// 					highlight.remove()
		// 				}

		// 				map.removeAll()
		// 				map.add(period)
		// 				view.whenLayerView(period).then((periodView) => {
		// 					view.goTo(response.features[0].geometry.extent)
		// 					highlight = periodView.highlight(response.features[0])
		// 				})

		// 				period
		// 					.queryRelatedFeatures({
		// 						outFields: ["*"],
		// 						relationshipId: 2,
		// 						returnGeometry: false,
		// 						objectIds: response.features[0].attributes.OBJECTID,
		// 					})
		// 					.then((response_related) => {
		// 						setRelatedStreets(response_related[response.features[0].attributes.OBJECTID].features)
		// 					})

		// 			}
		// 		})
		// }
	}, [globalID])

	useEffect(() => {
		return () => {
			setPage(1)
			setPageCount(1)
			// props.setSelectedObject("")
			setQueryObjects({})
			setPopupOpen(false)

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
						<CardContent sx={{ pt: 0, px: 4 }}>
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
									<IconButton
										color="primary"
										aria-label="close"
										size="small"
										onClick={() => {
											setPopupOpen(false)
										}}
										sx={{
											mt: 0.3,
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

									<CardHeader
										sx={{ p: 0, mt: 0 }}
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

									{(queryObjects.Saltinis || queryObjects.Autorius) && (
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
                    {console.log(queryObjects)}
										{queryObjects.Saltinis && (
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
