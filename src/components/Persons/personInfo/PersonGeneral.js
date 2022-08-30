import React from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as random_ikona } from "../../../utils/icons/personIcons/random_ikona.svg"

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"
import Link from "@mui/material/Link"
import CircularProgress from "@mui/material/CircularProgress"

const PersonGeneral = (props) => {
	const { t, i18n } = useTranslation()

	return (
		props.biographyFeatures.length > 0 && (
			<Grid
				sx={{ backgroundColor: "#323B4C", height: "100%" }}
				container
				direction="column"
				justifyContent="flex-start"
				alignItems="center"
			>
				<Box
					component="img"
					sx={{
						mt: 3,
						maxWidth: "85%",
						// maxHeight: { xs: 233, md: 167 },
						// maxWidth: { xs: 350, md: 250 },
					}}
					src={props.biographyFeatures[0].attributes.Nuotrauka}
				/>
				<Typography
					sx={{ mx: 4, mt: 1, fontStyle: "italic" }}
					color="gray"
					variant="body2"
					gutterBottom
					component="div"
					align="center"
				>
					{props.biographyFeatures[0].attributes.Nuotraukos_aprasymas}
				</Typography>

				<Typography
					sx={{ mx: 4, mt: 4, mb: 6 }}
					color="white"
					variant="body2"
					gutterBottom
					component="div"
					align="center"
				>
					{props.biographyFeatures[0].attributes.Veikla_profesija}
				</Typography>

				<Grid container direction="row" justifyContent="flex-start" alignItems="center">
					<SvgIcon sx={{ fontSize: 35 }} component={random_ikona} inheritViewBox />
					<Typography sx={{ m: 0 }} color="white" variant="h6" gutterBottom>
						Ryšys su Vilniumi
					</Typography>
				</Grid>

				<Typography
					sx={{ mx: 1, ml: 4.5 }}
					color="white"
					variant="body2"
					gutterBottom
					component="div"
					align="left"
				>
					{props.biographyFeatures[0].attributes.Asmens_rysys_su_Vilniumi}
				</Typography>

				<Grid container direction="row" justifyContent="flex-start" alignItems="center">
					<SvgIcon sx={{ fontSize: 35 }} component={random_ikona} inheritViewBox />
					<Typography sx={{ m: 0 }} color="white" variant="h6" gutterBottom>
						Įamžinimas Vilniuje
					</Typography>
				</Grid>

				{props.relatedObjects.length > 0 ? (
					props.relatedObjects.map((obj, i) => (
						<Grid
							sx={{ pl: 4, pr: 1}}
							container
							direction="column"
							justifyContent="flex-start"
							alignItems="stretch"
						>
							<Link
								target="_blank"
								href={
									"https://zemelapiai.vplanas.lt" +
									`/vilniausdnr/${i18n.language}/plaques/object/${obj.attributes.GlobalID.replace(
										/[{}]/g,
										""
									)}`
								}
								rel="noopener"
								textAlign="left"
								variant="body2"
								key={i}
							>
								{obj.attributes.OBJ_PAV}
							</Link>
						</Grid>
					))
				) : (
					<CircularProgress color="inherit" />
				)}

				{props.biographyFeatures[0].attributes.Apdovanojimai && (
					<>
						<Grid container direction="row" justifyContent="flex-start" alignItems="center">
							<SvgIcon sx={{ fontSize: 35 }} component={random_ikona} inheritViewBox />
							<Typography sx={{ m: 0 }} color="white" variant="h6" gutterBottom>
								Apdovanojimai
							</Typography>
						</Grid>
						<Typography sx={{ mx: 1, ml: 4.5 }} color="white" variant="body2" gutterBottom>
							{props.biographyFeatures[0].attributes.Apdovanojimai}
						</Typography>
					</>
				)}
			</Grid>
		)
	)
}

export default PersonGeneral
