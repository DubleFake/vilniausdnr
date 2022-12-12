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
	const [objectAtt, setObjectAtt] = useState([])
	const [loading, setLoading] = useState(true)
	const [queryObjects, setQueryObjects] = useState([])
	const [popupOpen, setPopupOpen] = useState(false)
	const [page, setPage] = useState(1)
	const [pageCount, setPageCount] = useState(1)
	const [shareTooltip, setShareTooltip] = useState(false)

	const handlePage = (event, value) => {
		navigate(
			`/vilniausdnr/${i18n.language}/foto/object/${queryObjects[value - 1].attributes.GlobalID.replace(
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

				objectsView
					.queryFeatures(query)
					.then((response) => {
						if (highlight) {
							highlight.remove()
						}

						if (response.features.length === 0) {
							navigate(`/vilniausdnr/${i18n.language}/foto`)
							return
						}

						view.goTo(response.features[0].geometry)
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
					<CardContent sx={{ pt: 0 }}>
						{pageCount > 1 ? (
							<Box component="div" display="flex" justifyContent="center" alignItems="center">
								<Pagination color="secondary" count={pageCount} page={page} onChange={handlePage} />
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
										navigate(`/vilniausdnr/${i18n.language}/foto`)
									}}
									sx={{
										mt: 0.9,
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
									sx={{ p: 0 }}
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
												<IconButton
													sx={{ mr: 5, mt: 0.2 }}
													color="secondary"
													aria-label="share"
													size="large"
													onClick={handleShare}
												>
													<ShareIcon style={{ fontSize: 30 }} />
												</IconButton>
											</BootstrapTooltip>
										</>
									}
									title={objectAttr.Pavadinimas}
									titleTypographyProps={{ color: "white", fontWeight: "bold" }}
								/>
								{/* <TableContainer sx={{ mb: 1 }} component={Paper}>
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
															{t(`plaques.objectPopup.${objectAttr[attr].field}`)}
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
								</TableContainer> */}
								<Box sx={{ my: 1, mx: -2 }}>
									<a href={`${objectAttr.Nuotraukos_URL}`} target="_blank">
										<img
											style={{ maxWidth: "100%", maxHeight: "auto" }}
											src={`${objectAttr.Nuotraukos_URL}`}
										/>
									</a>
								</Box>

								<Typography sx={{ color: "white" }} variant="h6" component="div">
									{objectAttr.Saltinis}
								</Typography>

								<MuiLinkify LinkProps={{ target: "_blank", rel: "noopener", rel: "noreferrer" }}>
									<Typography variant="body2" component="div">
										{objectAttr.Saltinio_nuoroda}
									</Typography>
								</MuiLinkify>
							</>
						)}
					</CardContent>
				</Card>
			</Fade>
		</>
	)
}

export default ObjectPopup
