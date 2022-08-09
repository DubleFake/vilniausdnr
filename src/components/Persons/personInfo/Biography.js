import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { persons, related_persons } from "../../../utils/personsArcgisItems"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

const Biography = (props) => {
	const [biographyFeatures, setBiographyFeatures] = useState([])
	const [relatedPersons, setRelatedPersons] = useState([])
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	useEffect(() => {
		persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${props.globalID}}'`,
			})
			.then((response) => {
				setBiographyFeatures(response.features)
			})
	}, [props.globalID])

	useEffect(() => {
		setRelatedPersons([])

		related_persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmuo = '{${props.globalID}}'`,
			})
			.then((response) => {
				const tempPersons = response.features
				let personsCount = 0

				console.log(response.features)

				for (let person in tempPersons) {
					if (!tempPersons[person].attributes.Susijes_asmuo_irasant_tekstu) {
						personsCount++
					}
				}

				let queryCount = 0
				for (let person in tempPersons) {
					if (!tempPersons[person].attributes.Susijes_asmuo_irasant_tekstu) {
						persons
							.queryFeatures({
								outFields: ["Vardas_lietuviskai", "Pavarde_lietuviskai"],
								where: `Asmenybes_ID = '{${tempPersons[person].attributes.Susijes_asmuo_is_saraso.replace(
									/[{}]/g,
									""
								)}}'`,
							})
							.then((response) => {
								tempPersons[
									person
								].attributes.Susijes_asmuo_irasant_tekstu = `${response.features[0].attributes.Vardas_lietuviskai} ${response.features[0].attributes.Pavarde_lietuviskai}`

								queryCount++
								if (queryCount === personsCount) {
									setRelatedPersons(tempPersons)
								}
							})
					}
				}

				if (queryCount === 0 && personsCount === 0) {
					setRelatedPersons(tempPersons)
				}
			})
	}, [props.globalID])

	return (
		<Box
			sx={{
				maxHeight: window.innerHeight - 90,
				overflowY: "auto",
				width: "calc(50vw - 175px)",
			}}
		>
			{biographyFeatures.length > 0 && (
				<Grid container direction="column" justifyContent="flex-start" alignItems="center">
					<Box
						component="img"
						sx={{
							// height: 200,
							// width: 200,
							// maxHeight: { xs: 233, md: 167 },
							// maxWidth: { xs: 350, md: 250 },
							mt: 3,
							maxHeight: 200,
							maxWidth: 200,
						}}
						alt={biographyFeatures[0].attributes.Nuotraukos_aprasymas}
						src={biographyFeatures[0].attributes.Nuotrauka}
					/>
					<Typography
						style={{ whiteSpace: "pre-line" }}
						variant="h5"
						gutterBottom
						component="div"
						align="center"
					>
						{biographyFeatures[0].attributes.Vardas_lietuviskai +
							"\n" +
							biographyFeatures[0].attributes.Pavarde_lietuviskai.toUpperCase()}
					</Typography>
					<Typography variant="body2" gutterBottom component="div" align="center">
						{biographyFeatures[0].attributes.Veikla_profesija}
					</Typography>

					<Typography sx={{ mt: 1 }} variant="h6" gutterBottom component="div" align="center">
						Veikla
					</Typography>
					<Typography variant="body2" gutterBottom component="div" align="center">
						{biographyFeatures[0].attributes.Veikla_kuryba_trumpai}
					</Typography>

					{biographyFeatures[0].attributes.Apdovanojimai && (
						<>
							<Typography sx={{ mt: 1 }} variant="h6" gutterBottom component="div" align="center">
								Apdovanojimai
							</Typography>
							<Typography variant="body2" gutterBottom component="div" align="center">
								{biographyFeatures[0].attributes.Apdovanojimai}
							</Typography>
						</>
					)}

					<Typography sx={{ mt: 1 }} variant="h6" gutterBottom component="div" align="center">
						Atminimo įamžinimas Vilniuje
					</Typography>
					<Typography variant="subtitle1" gutterBottom component="div" align="center">
						Skulptūra
					</Typography>
					<Typography variant="subtitle1" gutterBottom component="div" align="center">
						Gatvė
					</Typography>
					<Typography variant="subtitle1" gutterBottom component="div" align="center">
						Kapas
					</Typography>

					<Typography sx={{ mt: 1 }} variant="h6" gutterBottom component="div" align="center">
						Susiję
					</Typography>
					<Typography variant="subtitle1" gutterBottom component="div" align="center">
						Pastatai
					</Typography>
					<Typography variant="subtitle1" gutterBottom component="div" align="center">
						Įvykiai
					</Typography>
					<Typography variant="subtitle1" gutterBottom component="div" align="center">
						Asmenybės
					</Typography>
					{relatedPersons.length > 0 ? (
						relatedPersons.map((person, i) =>
							person.attributes.Susijes_asmuo_is_saraso ? (
								<Link
									key={i}
									textAlign="left"
									component="button"
									variant="body2"
									onClick={() => {
										navigate(
											`/vilniausdnr/${
												i18n.language
											}/persons/${person.attributes.Susijes_asmuo_is_saraso.replace(/[{}]/g, "")}`
										)
									}}
								>
									{person.attributes.Susijes_asmuo_irasant_tekstu}
								</Link>
							) : (
								<Typography
									sx={{ mb: 0 }}
									variant="body2"
									gutterBottom
									component="div"
									align="center"
									key={i}
								>
									{person.attributes.Susijes_asmuo_irasant_tekstu}
								</Typography>
							)
						)
					) : (
						<CircularProgress color="inherit" />
					)}
				</Grid>
			)}
		</Box>
	)
}

export default Biography
