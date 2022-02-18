import React from "react"
import PropTypes from "prop-types"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { useTheme } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"
import Button from "@mui/material/Button"
import MuseumIcon from "@mui/icons-material/Museum"

function Tile(props) {
	const location = useLocation()
	const { setMenuOpen, sx, ...other } = props

	return (
		<Button
			component={Link}
			onClick={() => location.pathname !== "/" && setMenuOpen(false)}
			to={`/${sx.gridArea}`}
			variant="contained"
			sx={{
				borderRadius: 0,
				textAlign: "center",
				boxShadow: "none",
				textTransform: "none",
				transition: "0.3s",
				opacity: 1,
				"&:hover": {
					boxShadow: "none",
					backgroundColor: sx.backgroundColor,
					opacity: 0.9,
				},
				...sx,
			}}
			{...other}
		/>
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
	const matchesLg = useMediaQuery(theme.breakpoints.up("lg"))
	const matchesMd = useMediaQuery(theme.breakpoints.up("md"))
	const matchesSm = useMediaQuery(theme.breakpoints.up("sm"))

	return (
		<div style={{ width: "100%" }}>
			<Box
				sx={{
					display: "grid",
					gap: 0,
					gridTemplateColumns: matchesLg ? "repeat(5, 1fr)" : matchesMd ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
					gridTemplateRows: `repeat(3, ${window.innerHeight / 3}px)`,
					gridTemplateAreas: matchesLg
						? `
          "periodai   periodai  lentos  asmenybes asmenybes"
          "zemelapiai gatves    dalys   asmenybes asmenybes"
          "adresai    pastatai  dalys   ivykiai   ivykiai"
          `
						: matchesMd
						? `
          "periodai   periodai  lentos asmenybes"
          "zemelapiai gatves    dalys  asmenybes"
          "adresai    pastatai  dalys  ivykiai"
          `
						: `
          "periodai   lentos    asmenybes"
          "zemelapiai gatves    dalys"
          "adresai    pastatai  ivykiai"
          `,
				}}
			>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#861618", gridArea: "periodai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>{t("periods")}</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#4d0539", gridArea: "lentos" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>{t("signs")}</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#753092", gridArea: "asmenybes" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>{t("persons")}</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#ec7c22", gridArea: "zemelapiai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>{t("maps")}</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#fcca0a", gridArea: "gatves" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>{t("streets")}</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#6cb38f", gridArea: "dalys" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>{t("parts")}</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#b51d52", gridArea: "adresai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>{t("addresses")}</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#009bd8", gridArea: "pastatai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>{t("buildings")}</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#6c8ec9", gridArea: "ivykiai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>{t("events")}</Grid>
					</Grid>
				</Tile>
			</Box>
		</div>
	)
}

export default Home
