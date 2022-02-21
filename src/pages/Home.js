import React from "react"
import PropTypes from "prop-types"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { ReactComponent as addressesIcon } from "../homeIcons/addresses.svg"
import { ReactComponent as buildingsIcon } from "../homeIcons/buildings.svg"
import { ReactComponent as eventsIcon } from "../homeIcons/events.svg"
import { ReactComponent as mapsIcon } from "../homeIcons/maps.svg"
import { ReactComponent as partsIcon } from "../homeIcons/parts.svg"
import { ReactComponent as periodsIcon } from "../homeIcons/periods.svg"
import { ReactComponent as personsIcon } from "../homeIcons/persons.svg"
import { ReactComponent as signsIcon } from "../homeIcons/signs.svg"
import { ReactComponent as streetsIcon } from "../homeIcons/streets.svg"

import { useTheme } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"

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

	const iconSize = 75
	const fontSize = 25

	return (
		<div style={{ width: "100%" }}>
			<Box
				sx={{
					display: "grid",
					gap: 0,
					gridTemplateColumns: matchesLg ? "repeat(5, 1fr)" : "repeat(2, 1fr)",
					gridTemplateRows: matchesLg ? `repeat(3, ${(window.innerHeight * 0.9) / 3}px)` : `repeat(5, 300px)`,
					gridTemplateAreas: matchesLg
						? `
            "periodai   periodai  lentos  asmenybes asmenybes"
            "zemelapiai gatves    dalys   asmenybes asmenybes"
            "adresai    pastatai  dalys   ivykiai   ivykiai"
          `
						: `
            "periodai   asmenybes"
            "lentos     asmenybes"
            "zemelapiai gatves"
            "adresai    pastatai"
            "dalys      ivykiai"
          `,
				}}
			>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#861618", gridArea: "periodai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<SvgIcon component={periodsIcon} inheritViewBox sx={{ color: "#FBBF11", fontSize: iconSize }} />
						</Grid>
						<Grid item>
							<Typography sx={{ color: "white" }} variant="body1" fontSize={fontSize}>
								{t("periods")}
							</Typography>
						</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#4d0539", gridArea: "lentos" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<SvgIcon component={signsIcon} inheritViewBox sx={{ color: "#EE2858", fontSize: iconSize }} />
						</Grid>
						<Grid item>
							<Typography sx={{ color: "white" }} variant="body1" fontSize={fontSize}>
								{t("signs")}
							</Typography>
						</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#753092", gridArea: "asmenybes" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<SvgIcon component={personsIcon} inheritViewBox sx={{ color: "#58C8DF", fontSize: iconSize }} />
						</Grid>
						<Grid item>
							<Typography sx={{ color: "white" }} variant="body1" fontSize={fontSize}>
								{t("persons")}
							</Typography>
						</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#ec7c22", gridArea: "zemelapiai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<SvgIcon component={mapsIcon} inheritViewBox sx={{ color: "#861618", fontSize: iconSize }} />
						</Grid>
						<Grid item>
							<Typography sx={{ color: "white" }} variant="body1" fontSize={fontSize}>
								{t("maps")}
							</Typography>
						</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#fcca0a", gridArea: "gatves" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<SvgIcon component={streetsIcon} inheritViewBox sx={{ color: "#4D0539", fontSize: iconSize }} />
						</Grid>
						<Grid item>
							<Typography sx={{ color: "white" }} variant="body1" fontSize={fontSize}>
								{t("streets")}
							</Typography>
						</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#6cb38f", gridArea: "dalys" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<SvgIcon component={partsIcon} inheritViewBox sx={{ color: "#FCC011", fontSize: iconSize }} />
						</Grid>
						<Grid item>
							<Typography sx={{ color: "white" }} variant="body1" fontSize={fontSize}>
								{t("parts")}
							</Typography>
						</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#b51d52", gridArea: "adresai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<SvgIcon
								component={addressesIcon}
								inheritViewBox
								sx={{ color: "#4D0539", fontSize: iconSize }}
							/>
						</Grid>
						<Grid item>
							<Typography sx={{ color: "white" }} variant="body1" fontSize={fontSize}>
								{t("addresses")}
							</Typography>
						</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#009bd8", gridArea: "pastatai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<SvgIcon
								component={buildingsIcon}
								inheritViewBox
								sx={{ color: "#753092", fontSize: iconSize }}
							/>
						</Grid>
						<Grid item>
							<Typography sx={{ color: "white" }} variant="body1" fontSize={fontSize}>
								{t("buildings")}
							</Typography>
						</Grid>
					</Grid>
				</Tile>
				<Tile setMenuOpen={props.setMenuOpen} sx={{ backgroundColor: "#6c8ec9", gridArea: "ivykiai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<SvgIcon component={eventsIcon} inheritViewBox sx={{ color: "#4D0539", fontSize: iconSize }} />
						</Grid>
						<Grid item>
							<Typography sx={{ color: "white" }} variant="body1" fontSize={fontSize}>
								{t("events")}
							</Typography>
						</Grid>
					</Grid>
				</Tile>
			</Box>
		</div>
	)
}

export default Home
