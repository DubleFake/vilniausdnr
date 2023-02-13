import React, { useEffect, useState, useRef } from "react"
import ForceGraph2D from "react-force-graph-2d"

import { related_persons } from "../../../utils/personsArcgisItems"

import Container from "@mui/material/Container"

const ForceGraph = (props) => {
	const [graphData, setGraphData] = useState({ nodes: [], links: [] })
	const [graphRendered, setGraphRendered] = useState(false)
	const graphRef = useRef(null)

	useEffect(() => {
		if (graphRendered) {
			graphRef.current.d3Force("charge").strength(-20).distanceMax(1000)
			graphRef.current.zoom(0.35, 1000)
		}
	}, [graphRendered])

	useEffect(() => {
		related_persons
			.queryFeatures({
				outFields: ["Asmuo", "Susijes_asmuo_is_saraso", "Rysio_tipas"],
				where: "Susijes_asmuo_is_saraso is not null",
			})
			.then((response) => {
				const tempGraphData = { nodes: [], links: [] }

				const perRelateCount = {}
				for (let per of response.features) {
					if (perRelateCount[per.attributes.Asmuo]) {
						perRelateCount[per.attributes.Asmuo] += 1
					} else {
						perRelateCount[per.attributes.Asmuo] = 1
					}
				}

				for (let per of props.initialObjectsList) {
					tempGraphData.nodes.push({
						id: per.attributes.Asmenybes_ID,
						name: per.attributes.Vardas_lietuviskai,
						// val: perRelateCount[per.attributes.Asmenybes_ID],
						val: 1,
					})
				}

				for (let per of response.features) {
					if (!per.attributes.Asmuo || !per.attributes.Susijes_asmuo_is_saraso) {
						console.log(per)
					}
					tempGraphData.links.push({
						source: per.attributes.Asmuo,
						target: per.attributes.Susijes_asmuo_is_saraso,
					})
				}

				setGraphData(tempGraphData)
			})
	}, [props.initialObjectsList])

	return (
		<Container variant="graph">
			{graphData.nodes.length > 0 && graphData.links.length > 0 && (
				<ForceGraph2D
					ref={(el) => {
						graphRef.current = el
						setGraphRendered(true)
					}}
					graphData={graphData}
					height={window.innerHeight - 90}
					backgroundColor={["#EBEBEB"]}
					nodeColor={["#D72E30"]}
					linkColor={["gray"]}
				/>
			)}
		</Container>
	)
}

export default ForceGraph
