import React, { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { view, objects, bgExpand, locateWidget } from "../../../utils/signsArcgisItems"
import * as watchUtils from "@arcgis/core/core/watchUtils"

const ObjectMap = (props) => {
	const navigate = useNavigate()
	const mapDiv = useRef(null)

	useEffect(() => {
		view.container = mapDiv.current

		view.ui.add(bgExpand, "top-left")
		view.ui.add(locateWidget, "top-left")

		view.whenLayerView(objects).then((objectsView) => {
			watchUtils.whenFalseOnce(objectsView, "updating").then(() => {
				objectsView
					.queryFeatures({
						outFields: ["OBJ_PAV", "TIPAS", "ATMINT_TIP", "GlobalID"],
						where: "",
						returnGeometry: false,
					})
					.then((response) => {
						if (response.features.length) {
							props.setInitialObjectsList(response.features)
							props.setInitialLoading(false)
						}
					})
					.catch((error) => {
						console.error(error)
					})
			})
		})

		// view.watch("scale", (newScale) => {
		// 	for (let stop in map.layers.items[0].renderer.visualVariables[0].stops) {
		// 		if (map.layers.items[0].renderer.visualVariables[0].stops[stop].value === newScale) {
		// 			console.log(
		// 				`scale ${newScale}, size ${map.layers.items[0].renderer.visualVariables[0].stops[stop].size}`
		// 			)
		// 		}
		// 	}
		// })

		view.on("click", (event) => {
			bgExpand.collapse()

			view.whenLayerView(objects).then((objectsView) => {
				watchUtils
					.whenNotOnce(objectsView, "updating")
					.then(() => {
						return objectsView.queryFeatures({
							geometry: event.mapPoint,
							where: objectsView.filter.where,
							distance: view.resolution <= 7 ? view.resolution * 15 : 100,
							spatialRelationship: "intersects",
							outFields: ["GlobalID"],
						})
					})
					.then((response) => {
						if (response.features.length > 0) {
							props.setMapQuery(response.features)
							navigate(`objektas/${response.features[0].attributes.GlobalID.replace(/[{}]/g, "")}`)
						}
					})
			})
		})
	}, [])

	return <div className="map" ref={mapDiv}></div>
}

export default ObjectMap
