import React from "react"
import PropTypes from "prop-types"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { ReactComponent as fotoIcon } from "../utils/icons/homeIcons/foto.svg"
import { ReactComponent as buildingsIcon } from "../utils/icons/homeIcons/buildings.svg"
import { ReactComponent as eventsIcon } from "../utils/icons/homeIcons/events.svg"
import { ReactComponent as mapsIcon } from "../utils/icons/homeIcons/maps.svg"
import { ReactComponent as partsIcon } from "../utils/icons/homeIcons/parts.svg"
import { ReactComponent as periodsIcon } from "../utils/icons/homeIcons/periods.svg"
import { ReactComponent as personsIcon } from "../utils/icons/homeIcons/persons.svg"
import { ReactComponent as signsIcon } from "../utils/icons/homeIcons/plaques.svg"
import { ReactComponent as streetsIcon } from "../utils/icons/homeIcons/streets.svg"
import VilniausSkyline from "../utils/icons/homeIcons/vilniaus_skyline.svg"
import VilniausLogo from "../utils/icons/homeIcons/vilniausdnr_logo.svg"

import { useTheme } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import useMediaQuery from "@mui/material/useMediaQuery"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"

function Tile(props) {
	const location = useLocation()
	const { t, i18n } = useTranslation()

	const {
		setMenuOpen,
		propHeight,
		propBackgroundColor,
		propTo,
		propIcon,
		propIconColor,
		propText,
		propTextMore,
		propTextColor,
	} = props

	return (
		<Button
			fullWidth
			component={Link}
			onClick={() => location.pathname !== `/vilniausdnr/${i18n.language}` && setMenuOpen(false)}
			to={`${propTo}`}
			variant="contained"
			sx={
				propHeight === 370
					? {
							borderRadius: 0,
							boxShadow: "none",
							textTransform: "none",
							height: propHeight,
							backgroundColor: propBackgroundColor,
							"&:hover": {
								backgroundColor: propBackgroundColor,
								transition: "0.3s",
								opacity: 0.8,
							},
							"& .hoverIcon": {
								mt: propHeight === 480 ? 10 : 4,
								color: propIconColor,
								fontSize: propHeight === 480 ? 80 : 32,
								transition: "0.3s cubic-bezier(0.680, -0.550, 0.265, 1.550)",
							},
							"& .hoverMore": {
								fontSize: "16px",
								opacity: 1,
								transition: "opacity 0.3s",
								padding: 4,
							},
							"& .hoverTitle": {
								mb: propHeight === 480 ? 5 : 3,
								transition: "0.3s cubic-bezier(0.680, -0.550, 0.265, 1.550)",
							},
					  }
					: {
							borderRadius: 0,
							boxShadow: "none",
							textTransform: "none",
							height: propHeight,
							backgroundColor: propBackgroundColor,
							"&:hover": {
								backgroundColor: propBackgroundColor,
								transition: "0.3s",
								opacity: 0.8,
								"& .hoverIcon": {
									mt: propHeight === 480 ? 10 : 4,
									color: propIconColor,
									fontSize: propHeight === 480 ? 80 : 32,
									transition: "0.3s cubic-bezier(0.680, -0.550, 0.265, 1.550)",
								},
								"& .hoverMore": {
									fontSize: "16px",
									opacity: 1,
									transition: "opacity 0.3s",
								},
								"& .hoverTitle": {
									mb: propHeight === 480 ? 5 : 3,
									transition: "0.3s cubic-bezier(0.680, -0.550, 0.265, 1.550)",
								},
							},
					  }
			}
			// sx={{
			// 	borderRadius: 0,
			// 	boxShadow: "none",
			// 	textTransform: "none",
			// 	height: propHeight,
			// 	backgroundColor: propBackgroundColor,
			// 	"&:hover": {
			// 		backgroundColor: propBackgroundColor,
			// 		transition: "0.3s",
			// 		opacity: 0.8,
			// 		"& .hoverIcon": {
			// 			mt: propHeight === 480 ? 10 : 4,
			// 			color: propIconColor,
			// 			fontSize: propHeight === 480 ? 80 : 32,
			// 			transition: "0.3s cubic-bezier(0.680, -0.550, 0.265, 1.550)",
			// 		},
			// 		"& .hoverMore": {
			// 			fontSize: "16px",
			// 			opacity: 1,
			// 			transition: "opacity 0.3s",
			// 		},
			// 		"& .hoverTitle": {
			// 			mb: propHeight === 480 ? 5 : 3,
			// 			transition: "0.3s cubic-bezier(0.680, -0.550, 0.265, 1.550)",
			// 		},
			// 	},
			// }}
		>
			<Grid
				sx={{ height: "100%", position: "absolute", zIndex: 20 }}
				container
				direction="column"
				justifyContent="space-between"
				alignItems="center"
			>
				<SvgIcon
					className="hoverIcon"
					component={propIcon}
					inheritViewBox
					sx={{
						mt: propHeight === 480 ? 20 : 10,
						color: propIconColor,
						fontSize: propHeight === 480 ? 150 : 80,
						transition: "0.3s cubic-bezier(0.680, -0.550, 0.265, 1.550)",
					}}
				/>
				<Typography
					className="hoverTitle"
					sx={{
						mb: propHeight === 480 ? 8 : 6,
						color: propTextColor,
						fontSize: "22px",
						transition: "0.3s cubic-bezier(0.680, -0.550, 0.265, 1.550)",
					}}
					variant="body1"
					align="center"
				>
					{propText}
				</Typography>
			</Grid>

			<Grid
				sx={{ position: "absolute", zIndex: 10 }}
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
			>
				<Grid item xs={3}>
					<Typography
						className="hoverMore"
						sx={{ color: propTextColor, fontSize: "0px", opacity: 0, transition: "opacity 0.3s", px: 10 }}
						align="center"
						variant="body1"
					>
						{propTextMore}
					</Typography>
				</Grid>
			</Grid>
		</Button>
	)
}

Tile.propTypes = {
	sx: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
		PropTypes.func,
		PropTypes.object,
	]),
}

const Home = (props) => {
	const { t, i18n } = useTranslation()
	const theme = useTheme()
	const isDownSm = useMediaQuery(theme.breakpoints.down("sm"))
	const isDownMd = useMediaQuery(theme.breakpoints.down("md"))
	const isDownLg = useMediaQuery(theme.breakpoints.down("lg"))

	const bgWhite = "#EBEBEB"
	const bgRed = "#D72E30"
	const bgGray = "#252525"

	return (
		<Container sx={{ overflowY: "auto", overflowX: "hidden", height: window.innerHeight - 90 }}>
			{(location.pathname === `/vilniausdnr/${i18n.language}` ||
				location.pathname === `/vilniausdnr/${i18n.language}/`) && (
				<Box sx={{ height: 510, width: "100%", backgroundColor: bgGray }}>
					<Grid
						sx={{ position: "relative", zIndex: 100, top: "10vh", height: "auto" }}
						container
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						<img src={VilniausLogo} width={isDownMd ? 300 : 500} />
						<hr
							style={{
								position: "relative",
								zIndex: 100,
								color: bgRed,
								backgroundColor: bgRed,
								height: 2,
								width: 60,
								border: "none",
								marginTop: "50px",
							}}
						/>
						<img
							src={VilniausSkyline}
							style={{
								position: "absolute",
								bottom: isDownMd ? -198 : -198,
								width: isDownMd ? 1000 : "100%",
								zIndex: -1,
								pointerEvents: "none",
								marginRight: "5px",
							}}
						/>
						<Typography sx={{ fontSize: "22px", color: "white", mt: "50px" }} align="center">
							Sveikiname apsilankius „Vilniaus DNR“ svetainėje.
							<br />
							Čia rasite istorinius miesto žemėlapius bei įrankius juos nagrinėti įvairiais pjūviais.
							Kviečiame tyrinėti Vilnių!
						</Typography>
					</Grid>
				</Box>
			)}

			<Box sx={{ position: "relative", backgroundColor: "white", zIndex: 100 }}>
				<Grid container spacing={0}>
					<Grid item xs={isDownMd ? 12 : isDownLg ? 6 : 4}>
						<Tile
							setMenuOpen={props.setMenuOpen}
							propHeight={isDownSm ? 370 : isDownLg ? 302 : 480}
							propBackgroundColor={bgGray}
							propTo={"maps"}
							propIcon={mapsIcon}
							propIconColor={"white"}
							propTextColor={"white"}
							propText={t("home.maps")}
							propTextMore={
								"Skiltyje pateikiami istoriniai Vilniaus miesto planai, žemėlapiai, ortofotografinės nuotraukos ir kita kartografinė medžiaga"
							}
						/>
					</Grid>
					<Grid item xs={isDownMd ? 12 : isDownLg ? 6 : 4}>
						<Tile
							setMenuOpen={props.setMenuOpen}
							propHeight={isDownSm ? 370 : isDownLg ? 302 : 480}
							propBackgroundColor={bgRed}
							propTo={"streets"}
							propIcon={streetsIcon}
							propIconColor={"white"}
							propTextColor={"white"}
							propText={t("home.streets")}
							propTextMore={
								"Skiltyje pateikiama informacija apie visas Vilniaus miesto gatves. Kartu pateikiama informacija apie centrinės Vilniaus miesto dalies gatvių istoriją - 5 istorinių periodų pavadinimus ir ašines linijas"
							}
						/>
					</Grid>
					<Grid item xs={isDownMd ? 12 : isDownLg ? 6 : 4}>
						<Tile
							setMenuOpen={props.setMenuOpen}
							propHeight={isDownSm ? 370 : isDownLg ? 302 : 480}
							propBackgroundColor={bgWhite}
							propTo={"buildings"}
							propIcon={buildingsIcon}
							propIconColor={bgGray}
							propTextColor={bgGray}
							propText={t("home.buildings")}
							propTextMore={
								"Skiltyje bus pateikiama informacija apie Vilniaus miesto pastatus, jų statybos metus, autorius bei fundatorius"
							}
						/>
					</Grid>

					<Grid item xs={isDownMd ? 12 : isDownLg ? 6 : 3}>
						<Tile
							setMenuOpen={props.setMenuOpen}
							propHeight={isDownSm ? 370 : isDownLg ? 302 : 302}
							propBackgroundColor={bgRed}
							propTo={"foto"}
							propIcon={fotoIcon}
							propIconColor={"white"}
							propTextColor={"white"}
							propText={t("home.foto")}
							propTextMore={"Skiltyje bus pateikiamos Vilniaus miesto fotografijos ir atvirutės"}
						/>
					</Grid>
					<Grid item xs={isDownMd ? 12 : isDownLg ? 6 : 3}>
						<Tile
							setMenuOpen={props.setMenuOpen}
							propHeight={isDownSm ? 370 : isDownLg ? 302 : 302}
							propBackgroundColor={bgWhite}
							propTo={"plaques"}
							propIcon={signsIcon}
							propIconColor={bgGray}
							propTextColor={bgGray}
							propText={t("home.plaques")}
							propTextMore={
								"Skiltyje pateikiama informacija apie visas (tiek Vilniaus miesto, tiek privačiomis iniciatyvomis įrengtas) mieste esančias atminimo lentas, paminklus, skulptūras ir kitus meninius objektus ar mažosios architektūros objektus"
							}
						/>
					</Grid>
					<Grid item xs={isDownMd ? 12 : isDownLg ? 6 : 6}>
						<Tile
							setMenuOpen={props.setMenuOpen}
							propHeight={isDownSm ? 370 : isDownLg ? 302 : 302}
							propBackgroundColor={bgGray}
							propTo={"periods"}
							propIcon={periodsIcon}
							propIconColor={"white"}
							propTextColor={"white"}
							propText={t("home.periods")}
							propTextMore={
								"Skiltyje pateikiamos 5 rekonstruotos istorinės topografijos, kurias galima lyginti tarpusavyje ar su šių laikų informacija. Topografijos apima tik centrinę Vilniaus miesto dalį"
							}
						/>
					</Grid>

					<Grid item xs={isDownMd ? 12 : isDownLg ? 6 : 6}>
						<Tile
							setMenuOpen={props.setMenuOpen}
							propHeight={isDownSm ? 370 : isDownLg ? 302 : 302}
							propBackgroundColor={bgGray}
							propTo={"events"}
							propIcon={eventsIcon}
							propIconColor={"white"}
							propTextColor={"white"}
							propText={t("home.events")}
							propTextMore={
								"Skiltyje pateikiama informacija apie svarbiausius Vilniaus miestui istorinius įvykius"
							}
						/>
					</Grid>
					<Grid item xs={isDownMd ? 12 : isDownLg ? 6 : 3}>
						<Tile
							setMenuOpen={props.setMenuOpen}
							propHeight={isDownSm ? 370 : isDownLg ? 302 : 302}
							propBackgroundColor={bgRed}
							propTo={"parts"}
							propIcon={partsIcon}
							propIconColor={"white"}
							propTextColor={"white"}
							propText={t("home.parts")}
							propTextMore={
								"Skiltyje bus pateikiama informacija apie Vilniaus miesto dalis - seniūnijas, seniūnaitijas, rajonus bei istorinius įvairių laikmečių vietovardžius"
							}
						/>
					</Grid>
					<Grid item xs={isDownMd ? 12 : isDownLg ? 12 : 3}>
						<Tile
							setMenuOpen={props.setMenuOpen}
							propHeight={isDownSm ? 370 : isDownLg ? 302 : 302}
							propBackgroundColor={bgWhite}
							propTo={"persons"}
							propIcon={personsIcon}
							propIconColor={bgGray}
							propTextColor={bgGray}
							propText={t("home.persons")}
							propTextMore={
								"Skiltyje pateikiama informacija apie asmenybes, kurioms Vilniaus mieste įrengtos atminimo lentos, skulptūros, paminklai ar jų vardais pavadintos gatvės"
							}
						/>
					</Grid>
					<Grid item xs={3}></Grid>
				</Grid>
			</Box>
		</Container>
	)
}

export default Home
