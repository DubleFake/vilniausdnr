import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { persons } from "../../../utils/personsArcgisItems"
import { ReactComponent as s_apdovanojimai } from "../../../utils/icons/personIcons/s_apdovanojimai.svg"
import { ReactComponent as s_palaidojimas } from "../../../utils/icons/personIcons/s_palaidojimas.svg"
import { ReactComponent as s_skulpturos } from "../../../utils/icons/personIcons/s_skulpturos.svg"
import { ReactComponent as s_lentos } from "../../../utils/icons/personIcons/s_lentos.svg"
import { ReactComponent as s_gatves } from "../../../utils/icons/personIcons/s_gatves.svg"
import { ReactComponent as s_vilnius } from "../../../utils/icons/personIcons/s_vilnius.svg"
import person_placeholder from "../../../utils/icons/personIcons/person_placeholder.png"

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"
import Link from "@mui/material/Link"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

const PersonGeneral = (props) => {
	const { t, i18n } = useTranslation()
	const { globalID } = useParams()

	const [relatedObjects, setRelatedObjects] = useState([])
	const [relatedMemorialShow, setRelatedMemorialShow] = useState(false)
	const [relatedPlaquesShow, setRelatedPlaquesShow] = useState(false)
	const [relatedStreets, setRelatedStreets] = useState([])
	const [relatedStreetsShow, setRelatedStreetsShow] = useState(true)

	const iconSize = 22

	useEffect(() => {
		setRelatedMemorialShow(false)
		setRelatedPlaquesShow(false)
		setRelatedObjects([])

		persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${globalID}}'`,
			})
			.then((response) => {
				persons
					.queryRelatedFeatures({
						outFields: ["OBJ_PAV", "GlobalID", "TIPAS"],
						relationshipId: 1,
						returnGeometry: false,
						objectIds: response.features[0].attributes.OBJECTID,
					})
					.then((response_related) => {
						if (response_related[response.features[0].attributes.OBJECTID].features.length > 0) {
							setRelatedObjects(response_related[response.features[0].attributes.OBJECTID].features)

							const hasMemorial = response_related[response.features[0].attributes.OBJECTID].features.some(
								(obj) => obj.attributes.TIPAS !== 1 && obj.attributes.TIPAS !== 3
							)
							hasMemorial ? setRelatedMemorialShow(true) : setRelatedMemorialShow(false)

							const hasPlaque = response_related[response.features[0].attributes.OBJECTID].features.some(
								(obj) => obj.attributes.TIPAS === 1 || obj.attributes.TIPAS === 3
							)
							hasPlaque ? setRelatedPlaquesShow(true) : setRelatedPlaquesShow(false)
						}
					})
			})
	}, [globalID])

	useEffect(() => {
		setRelatedStreetsShow(true)

		persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${globalID}}'`,
			})
			.then((response) => {
				setRelatedStreets([])
				persons
					.queryRelatedFeatures({
						outFields: ["PAV", "GAT_ID"],
						relationshipId: 4,
						returnGeometry: false,
						objectIds: response.features[0].attributes.OBJECTID,
					})
					.then((response_related) => {
						if (Object.keys(response_related).length !== 0) {
							setRelatedStreets(response_related[response.features[0].attributes.OBJECTID].features)
						} else {
							setRelatedStreetsShow(false)
						}
					})
			})
	}, [globalID])

	return (
		props.biographyFeatures.length > 0 && (
			<Grid
				sx={{ backgroundColor: "#252525", height: "100%" }}
				container
				direction="column"
				justifyContent="flex-start"
				alignItems="center"
			>
				<Box
					component="img"
					sx={{
						maxWidth: "100%",
					}}
					src={
						props.biographyFeatures[0].attributes.Nuotrauka
							? props.biographyFeatures[0].attributes.Nuotrauka
							: person_placeholder
					}
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
					sx={{ mx: 4, mt: 2, mb: 2 }}
					color="white"
					variant="body2"
					gutterBottom
					component="div"
					align="center"
				>
					{props.biographyFeatures[0].attributes.Veikla_profesija}
				</Typography>

				{props.biographyFeatures[0].attributes.Asmens_rysys_su_Vilniumi && (
					<>
						<Grid container direction="row" justifyContent="flex-start" alignItems="center">
							<Typography sx={{ mx: 2 }} color="white" variant="h6" gutterBottom>
								Ryšys su Vilniumi
							</Typography>
						</Grid>
						<Grid
							sx={{ px: 2 }}
							container
							direction="column"
							justifyContent="flex-start"
							alignItems="stretch"
						>
							<Box sx={{ display: "flex", mb: 1 }}>
								<SvgIcon sx={{ fontSize: iconSize, mr: 1 }} component={s_vilnius} inheritViewBox />
								<Typography color="white" variant="body2" gutterBottom component="div" align="left">
									{props.biographyFeatures[0].attributes.Asmens_rysys_su_Vilniumi}
								</Typography>
							</Box>
						</Grid>
					</>
				)}

				{relatedMemorialShow && (
					<>
						<Grid container direction="row" justifyContent="flex-start" alignItems="center">
							<Typography sx={{ mx: 2 }} color="white" variant="h6" gutterBottom>
								Skulptūros ir paminklai
							</Typography>
						</Grid>
						{relatedObjects.length > 0 ? (
							relatedObjects.map(
								(obj, i) =>
									obj.attributes.TIPAS !== 1 &&
									obj.attributes.TIPAS !== 3 && (
										<Grid
											sx={{ px: 2 }}
											container
											direction="column"
											justifyContent="flex-start"
											alignItems="stretch"
											key={i}
										>
											<Box sx={{ display: "flex", mb: 1 }}>
												<SvgIcon sx={{ fontSize: iconSize, mr: 1 }} component={s_skulpturos} inheritViewBox />
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
												>
													{obj.attributes.OBJ_PAV}
												</Link>
											</Box>
										</Grid>
									)
							)
						) : (
							<Stack sx={{ m: 1.5, width: "80%", my: 1 }} spacing={1}>
								<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
							</Stack>
						)}
					</>
				)}

				{relatedPlaquesShow && (
					<>
						<Grid container direction="row" justifyContent="flex-start" alignItems="center">
							<Typography sx={{ mx: 2 }} color="white" variant="h6" gutterBottom>
								Atminimo lentos
							</Typography>
						</Grid>
						{relatedObjects.length > 0 ? (
							relatedObjects.map(
								(obj, i) =>
									(obj.attributes.TIPAS === 1 || obj.attributes.TIPAS === 3) && (
										<Grid
											sx={{ px: 2 }}
											container
											direction="column"
											justifyContent="flex-start"
											alignItems="stretch"
											key={i}
										>
											<Box sx={{ display: "flex", mb: 1 }}>
												<SvgIcon sx={{ fontSize: iconSize, mr: 1 }} component={s_lentos} inheritViewBox />
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
												>
													{obj.attributes.OBJ_PAV}
												</Link>
											</Box>
										</Grid>
									)
							)
						) : (
							<Stack sx={{ m: 1.5, width: "80%", my: 1 }} spacing={1}>
								<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
							</Stack>
						)}
					</>
				)}

				{relatedStreetsShow && (
					<>
						<Grid container direction="row" justifyContent="flex-start" alignItems="center">
							<Typography sx={{ mx: 2 }} color="white" variant="h6" gutterBottom>
								Gatvės
							</Typography>
						</Grid>
						{relatedStreets.length > 0 ? (
							relatedStreets.map((obj, i) => (
								<Grid
									sx={{ px: 2 }}
									container
									direction="column"
									justifyContent="flex-start"
									alignItems="stretch"
									key={i}
								>
									<Box sx={{ display: "flex", mb: 1 }}>
										<SvgIcon sx={{ fontSize: iconSize, mr: 1 }} component={s_gatves} inheritViewBox />
										<Link
											target="_blank"
											href={
												"https://zemelapiai.vplanas.lt" +
												`/vilniausdnr/${i18n.language}/streets/object/${obj.attributes.GAT_ID}`
											}
											rel="noopener"
											textAlign="left"
											variant="body2"
										>
											{obj.attributes.PAV}
										</Link>
									</Box>
								</Grid>
							))
						) : (
							<Stack sx={{ m: 1.5, width: "80%", my: 1 }} spacing={1}>
								<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
							</Stack>
						)}
					</>
				)}

				{props.biographyFeatures[0].attributes.Palaidojimo_aprasymas && (
					<>
						<Grid container direction="row" justifyContent="flex-start" alignItems="center">
							<Typography sx={{ mx: 2 }} color="white" variant="h6" gutterBottom>
								Palaidojimas
							</Typography>
						</Grid>
						<Grid
							sx={{ px: 2 }}
							container
							direction="column"
							justifyContent="flex-start"
							alignItems="stretch"
						>
							{props.biographyFeatures[0].attributes.Palaidojimas ? (
								<Box sx={{ display: "flex", mb: 1 }}>
									<SvgIcon sx={{ fontSize: iconSize, mr: 1 }} component={s_palaidojimas} inheritViewBox />
									<Link
										target="_blank"
										href={props.biographyFeatures[0].attributes.Palaidojimas}
										rel="noopener"
										textAlign="left"
										variant="body2"
									>
										{props.biographyFeatures[0].attributes.Palaidojimo_aprasymas}
									</Link>
								</Box>
							) : (
								<Box sx={{ display: "flex", mb: 1 }}>
									<SvgIcon sx={{ fontSize: iconSize, mr: 1 }} component={s_palaidojimas} inheritViewBox />
									<Typography color="white" variant="body2" gutterBottom component="div" align="left">
										{props.biographyFeatures[0].attributes.Palaidojimo_aprasymas}
									</Typography>
								</Box>
							)}
						</Grid>
					</>
				)}

				{props.biographyFeatures[0].attributes.Apdovanojimai && (
					<>
						<Grid container direction="row" justifyContent="flex-start" alignItems="center">
							<Typography sx={{ mx: 2 }} color="white" variant="h6" gutterBottom>
								Apdovanojimai
							</Typography>
						</Grid>
						<Grid
							sx={{ px: 2 }}
							container
							direction="column"
							justifyContent="flex-start"
							alignItems="stretch"
						>
							<Box sx={{ display: "flex", mb: 1 }}>
								<SvgIcon sx={{ fontSize: iconSize, mr: 1 }} component={s_apdovanojimai} inheritViewBox />
								<Typography color="white" variant="body2" gutterBottom>
									{props.biographyFeatures[0].attributes.Apdovanojimai}
								</Typography>
							</Box>
						</Grid>
					</>
				)}
			</Grid>
		)
	)
}

export default PersonGeneral
