import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import {
	persons,
	related_persons,
	related_org,
	related_person_sources,
	related_events,
} from "../../../utils/personsArcgisItems"
import { ReactComponent as ivykiai } from "../../../utils/icons/personIcons/ivykiai.svg"
import { ReactComponent as saltiniai } from "../../../utils/icons/personIcons/saltiniai.svg"
import { ReactComponent as asmenybes } from "../../../utils/icons/personIcons/asmenybes.svg"
import { ReactComponent as organizacijos } from "../../../utils/icons/personIcons/organizacijos.svg"

import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import SvgIcon from "@mui/material/SvgIcon"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

const relatedFamily = [
	"tėvas",
	"mama",
	"sūnus",
	"dukra",
	"brolis",
	"sesė",
	"senelis",
	"senelė",
	"pusbrolis",
	"pusseserė",
	"vyras",
	"žmona",
	"širdies draugas",
	"širdies draugė",
	"uošvis",
	"uošvė",
	"žentas",
	"marti",
	"brolėnas",
	"brolėčia",
	"seserėnas",
	"seserėčia",
	"dėdė",
	"teta",
	"pamotė",
	"patėvis",
	"šešuras",
	"anyta",
]
const relatedCreation = ["domėjosi/tyrinėjo/vertė kūrybą"]
const relatedFriends = [
	"draugas",
	"draugė",
	"politinis bendražygis",
	"bendradarbis",
	"kovų draugas",
	"bendramintis",
	"pažįstamas",
]
const relatedOther = ["politinis priešas", "mokinys", "mokytojas", "nužudė", "pirmtakas", "įpėdinis", "kita"]

const PersonRelated = (props) => {
	const [relatedPersons, setRelatedPersons] = useState([])
	const [relatedOrg, setRelatedOrg] = useState([])
	const [relatedPersonSources, setRelatedPersonSources] = useState([])
	const [relatedEvents, setRelatedEvents] = useState([])

	const [relatedEventsShow, setRelatedEventsShow] = useState(true)
	const [relatedPersonsShow, setRelatedPersonsShow] = useState(true)
	const [relatedFamilyShow, setRelatedFamilyShow] = useState(true)
	const [relatedCreationShow, setRelatedCreationShow] = useState(true)
	const [relatedFriendsShow, setRelatedFriendsShow] = useState(true)
	const [relatedOtherShow, setRelatedOtherShow] = useState(true)
	const [relatedOrganizationShow, setRelatedOrganizationShow] = useState(true)
	const [relatedSourcesShow, setRelatedSourcesShow] = useState(true)

	const [personDomain, setPersonDomain] = useState({})
	const [orgDomain, setOrgDomain] = useState({})

	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const iconSize = 24

	useEffect(() => {
		setRelatedPersons([])
		setRelatedPersonsShow(true)
		setRelatedFamilyShow(true)
		setRelatedCreationShow(true)
		setRelatedFriendsShow(true)
		setRelatedOtherShow(true)

		related_persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmuo = '{${props.globalID}}'`,
			})
			.then((response) => {
				if (response.features.length !== 0) {
					const tempPersonDomain = {}
					for (let codedValue of response.fields[3].domain.codedValues) {
						tempPersonDomain[codedValue.code] = codedValue.name
					}
					setPersonDomain(tempPersonDomain)

					const tempPersons = response.features
					let personsCount = 0

					let relatedFamilyFound = false
					let relatedCreationFound = false
					let relatedFriendsFound = false
					let relatedOtherFound = false

					for (let person in tempPersons) {
						if (!tempPersons[person].attributes.Susijes_asmuo_irasant_tekstu) {
							personsCount++
						}

						if (
							!relatedFamilyFound &&
							relatedFamily.some((family) =>
								Number.isInteger(Number(tempPersons[person].attributes.Rysio_tipas))
									? family === tempPersonDomain[tempPersons[person].attributes.Rysio_tipas]
									: family === tempPersons[person].attributes.Rysio_tipas
							)
						) {
							relatedFamilyFound = true
						}

						if (
							!relatedCreationFound &&
							relatedCreation.some((creation) =>
								Number.isInteger(Number(tempPersons[person].attributes.Rysio_tipas))
									? creation === tempPersonDomain[tempPersons[person].attributes.Rysio_tipas]
									: creation === tempPersons[person].attributes.Rysio_tipas
							)
						) {
							relatedCreationFound = true
						}

						if (
							!relatedFriendsFound &&
							relatedFriends.some((friend) =>
								Number.isInteger(Number(tempPersons[person].attributes.Rysio_tipas))
									? friend === tempPersonDomain[tempPersons[person].attributes.Rysio_tipas]
									: friend === tempPersons[person].attributes.Rysio_tipas
							)
						) {
							relatedFriendsFound = true
						}

						if (
							!relatedOtherFound &&
							relatedOther.some((other) =>
								Number.isInteger(Number(tempPersons[person].attributes.Rysio_tipas))
									? other === tempPersonDomain[tempPersons[person].attributes.Rysio_tipas]
									: other === tempPersons[person].attributes.Rysio_tipas
							)
						) {
							relatedOtherFound = true
						}
					}

					if (!relatedFamilyFound) {
						setRelatedFamilyShow(false)
					}
					if (!relatedCreationFound) {
						setRelatedCreationShow(false)
					}
					if (!relatedFriendsFound) {
						setRelatedFriendsShow(false)
					}
					if (!relatedOtherFound) {
						setRelatedOtherShow(false)
					}

					let queryCount = 0
					for (let person in tempPersons) {
						if (!tempPersons[person].attributes.Susijes_asmuo_irasant_tekstu) {
							persons
								.queryFeatures({
									outFields: ["Vardas_lietuviskai"],
									where: `Asmenybes_ID = '${tempPersons[person].attributes.Susijes_asmuo_is_saraso}'`,
								})
								.then((response) => {
									tempPersons[
										person
									].attributes.Susijes_asmuo_irasant_tekstu = `${response.features[0].attributes.Vardas_lietuviskai}`

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
				} else {
					setRelatedPersonsShow(false)
				}
			})
	}, [props.globalID])

	useEffect(() => {
		setRelatedOrg([])
		setRelatedOrganizationShow(true)

		related_org
			.queryFeatures({
				outFields: ["*"],
				where: `Asmuo = '{${props.globalID}}'`,
			})
			.then((response) => {
				if (response.features.length !== 0) {
					const tempOrgDomain = {}
					for (let codedValue of response.fields[3].domain.codedValues) {
						tempOrgDomain[codedValue.code] = codedValue.name
					}
					setOrgDomain(tempOrgDomain)

					setRelatedOrg(response.features)
				} else {
					setRelatedOrganizationShow(false)
				}
			})
	}, [props.globalID])

	useEffect(() => {
		setRelatedPersonSources([])
		setRelatedSourcesShow(true)

		related_person_sources
			.queryFeatures({
				outFields: ["*"],
				where: `Susijes_asmuo_is_saraso = '{${props.globalID}}'`,
			})
			.then((response) => {
				if (response.features.length !== 0) {
					setRelatedPersonSources(response.features)
				} else {
					setRelatedSourcesShow(false)
				}
			})
	}, [props.globalID])

	useEffect(() => {
		setRelatedEvents([])
		setRelatedEventsShow(true)

		persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${props.globalID}}'`,
			})
			.then((response) => {
				persons
					.queryRelatedFeatures({
						outFields: ["Ivykio_ID"],
						relationshipId: 12,
						returnGeometry: false,
						objectIds: response.features[0].attributes.OBJECTID,
					})
					.then((response_related) => {
						console.log(response_related)
						if (Object.keys(response_related).length !== 0) {
							const tempEvents = []
							let eventsCount = response_related[response.features[0].attributes.OBJECTID].features.length
							let queryCount = 0

							for (let feature in response_related[response.features[0].attributes.OBJECTID].features) {
								related_events
									.queryFeatures({
										outFields: ["Istorinis_ivykis ", "Ivykio_ID"],
										where: `Ivykio_ID = '${
											response_related[response.features[0].attributes.OBJECTID].features[feature].attributes
												.Ivykio_ID
										}'`,
									})
									.then((response_events) => {
										tempEvents.push(response_events.features[0])

										queryCount++
										if (queryCount === eventsCount) {
											setRelatedEvents(tempEvents)
										}
									})
							}
						} else {
							setRelatedEventsShow(false)
						}
					})
			})
	}, [props.globalID])

	return (
		<Box sx={{ mt: 1, ml: 1, mr: 1 }}>
			{relatedEventsShow && (
				<>
					<Grid sx={{ my: 1 }} container direction="row" justifyContent="flex-start" alignItems="center">
						<SvgIcon sx={{ fontSize: iconSize, mr: 1 }} component={ivykiai} inheritViewBox />
						<Typography sx={{ m: 0 }} variant="h6" gutterBottom>
							Susiję įvykiai
						</Typography>
					</Grid>
					{relatedEvents.length > 0 ? (
						relatedEvents.map((event, i) => (
							<Grid
								sx={{ mb: 0.5 }}
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
										`/vilniausdnr/${i18n.language}/events#${event.attributes.Ivykio_ID.replace(/[{}]/g, "")}`
									}
									rel="noopener"
									// component="button"
									variant="body2"
									textAlign="left"
								>
									{event.attributes.Istorinis_ivykis}
								</Link>
							</Grid>
						))
					) : (
						<Stack sx={{ m: 1.5 }} spacing={1}>
							<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
						</Stack>
					)}
				</>
			)}

			{relatedPersonsShow && (
				<>
					<Grid sx={{ my: 1 }} container direction="row" justifyContent="flex-start" alignItems="center">
						<SvgIcon sx={{ fontSize: iconSize, mr: 1 }} component={asmenybes} inheritViewBox />
						<Typography sx={{ m: 0 }} variant="h6" gutterBottom>
							Susijusios asmenybės
						</Typography>
					</Grid>

					{relatedFamilyShow && (
						<>
							<Typography sx={{ my: 1, fontSize: 17 }} variant="h6" gutterBottom>
								Asmenybės ryšys su šeimos nariais
							</Typography>
							{relatedPersons.length > 0 ? (
								relatedPersons.map(
									(person, i) =>
										relatedFamily.some((family) =>
											Number.isInteger(Number(person.attributes.Rysio_tipas))
												? family === personDomain[person.attributes.Rysio_tipas]
												: family === person.attributes.Rysio_tipas
										) &&
										(person.attributes.Susijes_asmuo_is_saraso ? (
											<Grid
												sx={{ mb: 0.5 }}
												container
												direction="column"
												justifyContent="flex-start"
												alignItems="stretch"
												key={i}
											>
												<Box>
													<Link
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
													<Typography sx={{ display: "inline" }} color="text.secondary" variant="body2">
														<Typography
															sx={{ display: "inline" }}
															noWrap={true}
															component={"span"}
															variant="body2"
														>
															{" "}
															|{" "}
														</Typography>
														{Number.isInteger(Number(person.attributes.Rysio_tipas))
															? personDomain[person.attributes.Rysio_tipas]
															: person.attributes.Rysio_tipas}
													</Typography>
												</Box>
											</Grid>
										) : (
											<Grid
												sx={{ mb: 0.5 }}
												container
												direction="column"
												justifyContent="flex-start"
												alignItems="stretch"
												key={i}
											>
												<Typography variant="body2">
													{person.attributes.Susijes_asmuo_irasant_tekstu}
													<Typography sx={{ display: "inline" }} color="text.secondary" variant="body2">
														<Typography
															sx={{ display: "inline" }}
															noWrap={true}
															component={"span"}
															variant="body2"
														>
															{" "}
															|{" "}
														</Typography>
														{Number.isInteger(Number(person.attributes.Rysio_tipas))
															? personDomain[person.attributes.Rysio_tipas]
															: person.attributes.Rysio_tipas}
													</Typography>
												</Typography>
											</Grid>
										))
								)
							) : (
								<Stack sx={{ m: 1.5 }} spacing={1}>
									<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
								</Stack>
							)}
						</>
					)}

					{relatedCreationShow && (
						<>
							<Typography sx={{ my: 1, fontSize: 17 }} variant="h6" gutterBottom>
								Domėjosi, tyrinėjo ar vertė kūrybą
							</Typography>
							{relatedPersons.length > 0 ? (
								relatedPersons.map(
									(person, i) =>
										relatedCreation.some((creation) =>
											Number.isInteger(Number(person.attributes.Rysio_tipas))
												? creation === personDomain[person.attributes.Rysio_tipas]
												: creation === person.attributes.Rysio_tipas
										) &&
										(person.attributes.Susijes_asmuo_is_saraso ? (
											<Grid
												sx={{ mb: 0.5 }}
												container
												direction="column"
												justifyContent="flex-start"
												alignItems="stretch"
												key={i}
											>
												<Link
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
											</Grid>
										) : (
											<Grid
												sx={{ mb: 0.5 }}
												container
												direction="column"
												justifyContent="flex-start"
												alignItems="stretch"
												key={i}
											>
												<Typography variant="body2">
													{person.attributes.Susijes_asmuo_irasant_tekstu}
												</Typography>
											</Grid>
										))
								)
							) : (
								<Stack sx={{ m: 1.5 }} spacing={1}>
									<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
								</Stack>
							)}
						</>
					)}

					{relatedFriendsShow && (
						<>
							<Typography sx={{ my: 1, fontSize: 17 }} variant="h6" gutterBottom>
								Draugai, politiniai bendražygiai ir bendradarbiai
							</Typography>
							{relatedPersons.length > 0 ? (
								relatedPersons.map(
									(person, i) =>
										relatedFriends.some((friend) =>
											Number.isInteger(Number(person.attributes.Rysio_tipas))
												? friend === personDomain[person.attributes.Rysio_tipas]
												: friend === person.attributes.Rysio_tipas
										) &&
										(person.attributes.Susijes_asmuo_is_saraso ? (
											<Grid
												sx={{ mb: 0.5 }}
												container
												direction="column"
												justifyContent="flex-start"
												alignItems="stretch"
												key={i}
											>
												<Box>
													<Link
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
													<Typography sx={{ display: "inline" }} color="text.secondary" variant="body2">
														<Typography
															sx={{ display: "inline" }}
															noWrap={true}
															component={"span"}
															variant="body2"
														>
															{" "}
															|{" "}
														</Typography>
														{Number.isInteger(Number(person.attributes.Rysio_tipas))
															? personDomain[person.attributes.Rysio_tipas]
															: person.attributes.Rysio_tipas}
													</Typography>
												</Box>
											</Grid>
										) : (
											<Grid
												sx={{ mb: 0.5 }}
												container
												direction="column"
												justifyContent="flex-start"
												alignItems="stretch"
												key={i}
											>
												<Typography variant="body2">
													{person.attributes.Susijes_asmuo_irasant_tekstu}
													<Typography sx={{ display: "inline" }} color="text.secondary" variant="body2">
														<Typography
															sx={{ display: "inline" }}
															noWrap={true}
															component={"span"}
															variant="body2"
														>
															{" "}
															|{" "}
														</Typography>
														{Number.isInteger(Number(person.attributes.Rysio_tipas))
															? personDomain[person.attributes.Rysio_tipas]
															: person.attributes.Rysio_tipas}
													</Typography>
												</Typography>
											</Grid>
										))
								)
							) : (
								<Stack sx={{ m: 1.5 }} spacing={1}>
									<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
								</Stack>
							)}
						</>
					)}

					{relatedOtherShow && (
						<>
							<Typography sx={{ my: 1, fontSize: 17 }} variant="h6" gutterBottom>
								Kiti
							</Typography>
							{relatedPersons.length > 0 ? (
								relatedPersons.map(
									(person, i) =>
										relatedOther.some((other) =>
											Number.isInteger(Number(person.attributes.Rysio_tipas))
												? other === personDomain[person.attributes.Rysio_tipas]
												: other === person.attributes.Rysio_tipas
										) &&
										(person.attributes.Susijes_asmuo_is_saraso ? (
											<Grid
												sx={{ mb: 0.5 }}
												container
												direction="column"
												justifyContent="flex-start"
												alignItems="stretch"
												key={i}
											>
												<Box>
													<Link
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
													<Typography sx={{ display: "inline" }} color="text.secondary" variant="body2">
														<Typography
															sx={{ display: "inline" }}
															noWrap={true}
															component={"span"}
															variant="body2"
														>
															{" "}
															|{" "}
														</Typography>
														{Number.isInteger(Number(person.attributes.Rysio_tipas))
															? personDomain[person.attributes.Rysio_tipas]
															: person.attributes.Rysio_tipas}
													</Typography>
												</Box>
											</Grid>
										) : (
											<Grid
												sx={{ mb: 0.5 }}
												container
												direction="column"
												justifyContent="flex-start"
												alignItems="stretch"
												key={i}
											>
												<Typography variant="body2">
													{person.attributes.Susijes_asmuo_irasant_tekstu}
													<Typography sx={{ display: "inline" }} color="text.secondary" variant="body2">
														<Typography
															sx={{ display: "inline" }}
															noWrap={true}
															component={"span"}
															variant="body2"
														>
															{" "}
															|{" "}
														</Typography>
														{Number.isInteger(Number(person.attributes.Rysio_tipas))
															? personDomain[person.attributes.Rysio_tipas]
															: person.attributes.Rysio_tipas}
													</Typography>
												</Typography>
											</Grid>
										))
								)
							) : (
								<Stack sx={{ m: 1.5 }} spacing={1}>
									<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
								</Stack>
							)}
						</>
					)}
				</>
			)}

			{relatedOrganizationShow && (
				<>
					<Grid sx={{ my: 1 }} container direction="row" justifyContent="flex-start" alignItems="center">
						<SvgIcon sx={{ fontSize: iconSize, mr: 1 }} component={organizacijos} inheritViewBox />
						<Typography sx={{ m: 0 }} variant="h6" gutterBottom>
							Susijusios organizacijos
						</Typography>
					</Grid>
					{relatedOrg.length > 0 ? (
						relatedOrg.map((org, i) => (
							<Grid
								sx={{ mb: 0.5 }}
								container
								direction="column"
								justifyContent="flex-start"
								alignItems="stretch"
								key={i}
							>
								<Typography variant="body2">
									{org.attributes.Organizacijos_pavadinimas}
									<Typography sx={{ display: "inline" }} color="text.secondary" variant="body2">
										<Typography sx={{ display: "inline" }} noWrap={true} component={"span"} variant="body2">
											{" "}
											|{" "}
										</Typography>
										{Number.isInteger(Number(org.attributes.Rysio_tipas))
											? orgDomain[org.attributes.Rysio_tipas]
											: org.attributes.Rysio_tipas}
									</Typography>
								</Typography>
							</Grid>
						))
					) : (
						<Stack sx={{ m: 1.5 }} spacing={1}>
							<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
						</Stack>
					)}
				</>
			)}

			{relatedSourcesShow && (
				<>
					<Grid sx={{ my: 1 }} container direction="row" justifyContent="flex-start" alignItems="center">
						<SvgIcon sx={{ fontSize: iconSize, mr: 1 }} component={saltiniai} inheritViewBox />
						<Typography sx={{ m: 0 }} variant="h6" gutterBottom>
							Šaltiniai
						</Typography>
					</Grid>
					{relatedPersonSources.length > 0 ? (
						relatedPersonSources.map((source, i) => (
							<Grid
								sx={{ mb: 0.5 }}
								container
								direction="column"
								justifyContent="flex-start"
								alignItems="stretch"
								key={i}
							>
								<Box>
									<Typography sx={{ display: "inline" }} variant="body2">
										{i + 1}.{" "}
									</Typography>
									<Link
										target="_blank"
										href={source.attributes.Saltinio_URL}
										rel="noopener"
										textAlign="left"
										variant="body2"
									>
										{source.attributes.Saltinio_pavadinimas}
									</Link>
								</Box>
							</Grid>
						))
					) : (
						<Stack sx={{ m: 1.5 }} spacing={1}>
							<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
						</Stack>
					)}
				</>
			)}
		</Box>
	)
}

export default PersonRelated
