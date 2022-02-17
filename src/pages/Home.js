import React from "react"
import PropTypes from "prop-types"

import { useTheme } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"
import Button from "@mui/material/Button"
import MuseumIcon from "@mui/icons-material/Museum"

function Tile(props) {
	const { sx, ...other } = props
	return (
		<Button
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

const Home = () => {
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
          "periodas   periodas  skulpturos  asmenybes asmenybes"
          "zemelapiai gatves    dalys       asmenybes asmenybes"
          "adresai    pastatai  dalys       ivykiai   ivykiai"
          `
						: matchesMd
						? `
          "periodas   periodas  skulpturos  asmenybes"
          "zemelapiai gatves    dalys       asmenybes"
          "adresai    pastatai  dalys       ivykiai"
          `
						: `
          "periodas   skulpturos  asmenybes"
          "zemelapiai gatves      dalys"
          "adresai    pastatai    ivykiai"
          `,
				}}
			>
				<Tile sx={{ backgroundColor: "#861618", gridArea: "periodas" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>Miestas atskirais istoriniais periodais</Grid>
					</Grid>
				</Tile>
				<Tile sx={{ backgroundColor: "#4d0539", gridArea: "skulpturos" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>Skulptūros ir atminimo lentos</Grid>
					</Grid>
				</Tile>
				<Tile sx={{ backgroundColor: "#753092", gridArea: "asmenybes" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>Asmenybės ir jų atminimo ženklai</Grid>
					</Grid>
				</Tile>
				<Tile sx={{ backgroundColor: "#ec7c22", gridArea: "zemelapiai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>Istoriniai planai ir žemėlapiai</Grid>
					</Grid>
				</Tile>
				<Tile sx={{ backgroundColor: "#fcca0a", gridArea: "gatves" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>Miesto gatvės</Grid>
					</Grid>
				</Tile>
				<Tile sx={{ backgroundColor: "#6cb38f", gridArea: "dalys" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>Miesto dalys</Grid>
					</Grid>
				</Tile>
				<Tile sx={{ backgroundColor: "#b51d52", gridArea: "adresai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>Adresai</Grid>
					</Grid>
				</Tile>
				<Tile sx={{ backgroundColor: "#009bd8", gridArea: "pastatai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>Pastatai</Grid>
					</Grid>
				</Tile>
				<Tile sx={{ backgroundColor: "#6c8ec9", gridArea: "ivykiai" }}>
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<Grid item>
							<MuseumIcon sx={{ fontSize: 50 }} />
						</Grid>
						<Grid item>Istoriniai įvykiai</Grid>
					</Grid>
				</Tile>
			</Box>
		</div>
	)
}

export default Home
