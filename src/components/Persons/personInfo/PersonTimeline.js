import React, { useEffect, useState } from "react"

import { biography } from "../../../utils/personsArcgisItems"
import { ReactComponent as dirbo } from "../../../utils/icons/personIcons/dirbo.svg"
import { ReactComponent as emigravo } from "../../../utils/icons/personIcons/emigravo.svg"
import { ReactComponent as gime } from "../../../utils/icons/personIcons/gime.svg"
import { ReactComponent as kalejo } from "../../../utils/icons/personIcons/kalejo.svg"
import { ReactComponent as kovojo } from "../../../utils/icons/personIcons/kovojo.svg"
import { ReactComponent as mire } from "../../../utils/icons/personIcons/mire.svg"
import { ReactComponent as mokesi } from "../../../utils/icons/personIcons/mokesi.svg"
import { ReactComponent as perlaidotas } from "../../../utils/icons/personIcons/perlaidotas.svg"
import { ReactComponent as sukure } from "../../../utils/icons/personIcons/sukure.svg"
import { ReactComponent as vede } from "../../../utils/icons/personIcons/vede.svg"
import { ReactComponent as veike } from "../../../utils/icons/personIcons/veike.svg"
import { ReactComponent as random_ikona } from "../../../utils/icons/personIcons/random_ikona.svg"

import SvgIcon from "@mui/material/SvgIcon"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent"

const personIconList = {
	dirbo: dirbo,
	emigravo: emigravo,
	gimė: gime,
	kalėjo: kalejo,
	kovojo: kovojo,
	mirė: mire,
	mokėsi: mokesi,
	perlaidotas: perlaidotas,
	sukūrė: sukure,
	vedė: vede,
	veikė: veike,
	palaidotas: mire,
}

const PersonTimeline = (props) => {
	const [timelineFeatures, setTimelineFeatures] = useState([])

	useEffect(() => {
		biography
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${props.globalID}}'`,
			})
			.then((response) => {
				let tempFeatures = response.features

				// const asd = new Set()
				// for (let a in tempFeatures) {
				//   asd.add(tempFeatures[a].attributes.Fakto_tipas)
				// }

				tempFeatures.sort((a, b) => a.attributes.Fakto_data_rikiavimas - b.attributes.Fakto_data_rikiavimas)
				setTimelineFeatures(tempFeatures)
			})
	}, [props.globalID])

	return (
		<Timeline sx={{ m: 0, mt: 1, p: 0 }}>
			<Grid container direction="row" justifyContent="flex-start" alignItems="center">
				<SvgIcon sx={{ ml: 1, fontSize: 35 }} component={random_ikona} inheritViewBox />
				<Typography sx={{ m: 0 }} variant="h6" gutterBottom>
					Biografija
				</Typography>
			</Grid>

			{timelineFeatures.map((feature, i) => (
				<TimelineItem key={i}>
					<TimelineOppositeContent sx={{ mt: 1, pl: 1, maxWidth: 100 }} align="right" color="text.secondary">
						{feature.attributes.Fakto_data
							? new Date(feature.attributes.Fakto_data).toLocaleDateString("lt-LT")
							: feature.attributes.Fakto_datos_intervalo_pradžia
							? feature.attributes.Fakto_datos_intervalo_pradžia
							: feature.attributes.Fakto_datos_intervalo_pabaiga
							? feature.attributes.Fakto_datos_intervalo_pabaiga
							: feature.attributes.Fakto_data_tekstu}
					</TimelineOppositeContent>
					<TimelineSeparator>
						{feature.attributes.Fakto_tipas ? (
							<SvgIcon
								sx={{ my: 1, fontSize: 35 }}
								color={feature.attributes.Fakto_vieta.includes("Vilnius") ? "secondary" : "primary"}
								component={personIconList[feature.attributes.Fakto_tipas]}
								inheritViewBox
							/>
						) : (
							<SvgIcon
								sx={{ my: 1, fontSize: 35 }}
								color={feature.attributes.Fakto_vieta.includes("Vilnius") ? "secondary" : "primary"}
								component={personIconList["dirbo"]}
								inheritViewBox
							/>
						)}
						{i !== timelineFeatures.length - 1 && <TimelineConnector />}
					</TimelineSeparator>
					<TimelineContent sx={{ mt: 1 }}>
						<div>
							<Typography
								sx={{
									display: "inline",
									fontWeight:
										feature.attributes.Fakto_tipas === "gimė" || feature.attributes.Fakto_tipas === "mirė"
											? "bold"
											: "normal",
								}}
							>
								{feature.attributes.Fakto_aprasymas}
							</Typography>

							{feature.attributes.Fakto_vieta && (
								<Typography sx={{ display: "inline" }} color="text.secondary">
									<Typography sx={{ display: "inline" }} noWrap={true} component={"span"}>
										{" "}
										|{" "}
									</Typography>
									{feature.attributes.Fakto_vieta}
								</Typography>
							)}
						</div>
					</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	)
}

export default PersonTimeline
