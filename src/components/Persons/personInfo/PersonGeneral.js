import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { persons } from "../../../utils/personsArcgisItems"
import { ReactComponent as random_ikona } from "../../../utils/icons/personIcons/random_ikona.svg"

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"
import Link from "@mui/material/Link"
import CircularProgress from "@mui/material/CircularProgress"

const PersonGeneral = (props) => {
	const { t, i18n } = useTranslation()
	const { globalID } = useParams()

	const [relatedObjects, setRelatedObjects] = useState([])
	const [relatedObjectsShow, setRelatedObjectsShow] = useState(true)
	const [relatedStreets, setRelatedStreets] = useState([])
	const [relatedStreetsShow, setRelatedStreetsShow] = useState(true)

	useEffect(() => {
		setRelatedObjectsShow(true)

		persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${globalID}}'`,
			})
			.then((response) => {
				setRelatedObjects([])
				persons
					.queryRelatedFeatures({
						outFields: ["OBJ_PAV", "GlobalID"],
						relationshipId: 1,
						returnGeometry: false,
						objectIds: response.features[0].attributes.OBJECTID,
					})
					.then((response_related) => {
						if (Object.keys(response_related).length !== 0) {
							setRelatedObjects(response_related[response.features[0].attributes.OBJECTID].features)
						} else {
							setRelatedObjectsShow(false)
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
          outFields: ["PAV", "OBJECTID"],
          relationshipId: 8,
          returnGeometry: false,
          objectIds: response.features[0].attributes.OBJECTID,
        })
        .then((response_related) => {
            console.log(response_related)
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

				{props.biographyFeatures[0].attributes.Asmens_rysys_su_Vilniumi && (
					<>
						<Grid container direction="row" justifyContent="flex-start" alignItems="center">
							<SvgIcon sx={{ fontSize: 35 }} component={random_ikona} inheritViewBox />
							<Typography sx={{ m: 0 }} color="white" variant="h6" gutterBottom>
								Ryšys su Vilniumi
							</Typography>
						</Grid>
						<Grid
							sx={{ pl: 4.5, pr: 1 }}
							container
							direction="column"
							justifyContent="flex-start"
							alignItems="stretch"
						>
							<Typography color="white" variant="body2" gutterBottom component="div" align="left">
								{props.biographyFeatures[0].attributes.Asmens_rysys_su_Vilniumi}
							</Typography>
						</Grid>
					</>
				)}

				{relatedObjectsShow && (
					<>
						<Grid container direction="row" justifyContent="flex-start" alignItems="center">
							<SvgIcon sx={{ fontSize: 35 }} component={random_ikona} inheritViewBox />
							<Typography sx={{ m: 0 }} color="white" variant="h6" gutterBottom>
								Įamžinimas Vilniuje
							</Typography>
						</Grid>
						{relatedObjects.length > 0 ? (
							relatedObjects.map((obj, i) => (
								<Grid
									sx={{ pl: 4.5, pr: 1 }}
									container
									direction="column"
									justifyContent="flex-start"
									alignItems="stretch"
									key={i}
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
									>
										{obj.attributes.OBJ_PAV}
									</Link>
								</Grid>
							))
						) : (
							<CircularProgress color="inherit" />
						)}
					</>
				)}

				{props.biographyFeatures[0].attributes.Apdovanojimai && (
					<>
						<Grid container direction="row" justifyContent="flex-start" alignItems="center">
							<SvgIcon sx={{ fontSize: 35 }} component={random_ikona} inheritViewBox />
							<Typography sx={{ m: 0 }} color="white" variant="h6" gutterBottom>
								Apdovanojimai
							</Typography>
						</Grid>
						<Grid
							sx={{ pl: 4.5, pr: 1 }}
							container
							direction="column"
							justifyContent="flex-start"
							alignItems="stretch"
						>
							<Typography color="white" variant="body2" gutterBottom>
								{props.biographyFeatures[0].attributes.Apdovanojimai}
							</Typography>
						</Grid>
					</>
				)}

				{relatedStreetsShow && (
					<>
						<Grid container direction="row" justifyContent="flex-start" alignItems="center">
							<SvgIcon sx={{ fontSize: 35 }} component={random_ikona} inheritViewBox />
							<Typography sx={{ m: 0 }} color="white" variant="h6" gutterBottom>
								Gatvės
							</Typography>
						</Grid>
						{relatedStreets.length > 0 ? (
							relatedStreets.map((obj, i) => (
								<Grid
									sx={{ pl: 4.5, pr: 1 }}
									container
									direction="column"
									justifyContent="flex-start"
									alignItems="stretch"
									key={i}
								>
									{/* <Link
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
										{obj.attributes.PAV}
									</Link> */}

									<Typography sx={{}} color="white" variant="body2">
										{obj.attributes.PAV}
									</Typography>
								</Grid>
							))
						) : (
							<CircularProgress color="inherit" />
						)}
					</>
				)}
			</Grid>
		)
	)
}

export default PersonGeneral
