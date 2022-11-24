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

	const [loading, setLoading] = useState(true)
	const [queryObjects, setQueryObjects] = useState([])
	const [popupOpen, setPopupOpen] = useState(false)
	const [page, setPage] = useState(1)
	const [pageCount, setPageCount] = useState(1)
	const [shareTooltip, setShareTooltip] = useState(false)

	const handlePage = (event, value) => {
		navigate(
			`/vilniausdnr/${i18n.language}/streets/compare/timeline/${queryObjects[
				value - 1
			].attributes.GlobalID.replace(/[{}]/g, "")}`
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
		setPopupOpen(true)
		setLoading(true)

		maps
			.queryFeatures({
				where: `GlobalID_zemelapio = '${globalID}'`,
				outFields: ["*"],
				returnGeometry: false,
			})
			.then((response) => {
				console.log(response.features[0].attributes)
				setQueryObjects(response.features[0])

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
				<Box sx={{ top: 90, right: 0, position: "fixed", zIndex: 3, mt: 0.5 }}>
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
												{/* <IconButton
													color="secondary"
													aria-label="close"
													size="large"
													onClick={() => {
														navigate(`/vilniausdnr/${i18n.language}/streets/compare/timeline`)
													}}
												>
													<CloseIcon style={{ fontSize: 30 }} />
												</IconButton> */}
											</>
										}
										title={queryObjects.attributes.Pavadinimas}
									/>
									<TableContainer sx={{ mb: 1 }} component={Paper}>
										<Table size="small">
											<TableBody>
												{Object.keys(queryObjects.attributes).map((attr) =>
													queryObjects.attributes[attr] &&
													attr !== "Nuoroda" &&
													attr !== "Pavadinimas" &&
													attr !== "Saltinis" ? (
														<TableRow key={attr} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
															<TableCell component="th" scope="row">
																{attr}
															</TableCell>
															<TableCell align="right">{queryObjects.attributes[attr]}</TableCell>
														</TableRow>
													) : null
												)}
											</TableBody>
										</Table>
									</TableContainer>

									{queryObjects.attributes["Saltinio_nuoroda"] || queryObjects.attributes["Saltinis"] ? (
										<Typography variant="h6" component="div">
											Šaltinis
											<MuiLinkify LinkProps={{ target: "_blank", rel: "noopener", rel: "noreferrer" }}>
												<Typography variant="body2" component="div">
													{queryObjects.attributes["Saltinio_nuoroda"] && queryObjects.attributes["Saltinio_nuoroda"]}
												</Typography>
											</MuiLinkify>
											<Typography variant="body2" component="div">
												{queryObjects.attributes["Saltinis"] && queryObjects.attributes["Saltinis"]}
											</Typography>
										</Typography>
									) : null}
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
