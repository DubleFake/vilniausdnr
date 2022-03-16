import React, { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import * as watchUtils from "@arcgis/core/core/watchUtils"

import { view, objects, bgExpand, locateWidget } from "../../../utils/plaquesArcgisItems"

const viewHandles = []

const ObjectMap = (props) => {
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const mapDiv = useRef(null)

	useEffect(() => {
		view.container = mapDiv.current

		viewHandles.forEach((handle) => {
			handle.remove()
		})
		viewHandles.length = 0

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

		// view.whenLayerView(objects).then((objectsView) => {
		// 	watchUtils.whenFalseOnce(objectsView, "updating").then(() => {
		// 		objectsView
		// 			.queryFeatures({
		// 				outFields: ["*"],
		// 				where: "",
		// 				returnGeometry: false,
		// 			})
		// 			.then((response) => {
		// 				const allObjects = []
		// 				let total = 0
		// 				for (let feature in response.features) {
		// 					const tempObj = {}
		// 					for (let attr in response.features[feature].attributes) {
		// 						if (attr === "OBJ_PAV" || attr === "OBJEKT_TXT" || attr === "OBJ_APRAS") {
		// 							tempObj[`${attr}`] = response.features[feature].attributes[attr]
		// 							if (
		// 								response.features[feature].attributes[attr] !== null &&
		// 								response.features[feature].attributes[attr] !== ""
		// 							) {
		// 								total += response.features[feature].attributes[attr].length
		// 							}
		// 							//console.log(attr, response.features[feature].attributes[attr])
		// 						}
		// 					}
		// 					allObjects.push(tempObj)
		// 				}
		// 				console.log(total)
		// 				//console.log(JSON.stringify(allObjects))
		// 			})
		// 			.catch((error) => {
		// 				console.error(error)
		// 			})
		// 	})
		// })

		// view.watch("scale", (newScale) => {
		// 	for (let stop in map.layers.items[0].renderer.visualVariables[0].stops) {
		// 		if (map.layers.items[0].renderer.visualVariables[0].stops[stop].value === newScale) {
		// 			console.log(
		// 				`scale ${newScale}, size ${map.layers.items[0].renderer.visualVariables[0].stops[stop].size}`
		// 			)
		// 		}
		// 	}
		// })

		viewHandles.push(
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
								navigate(
									`/${i18n.language}/plaques/object/${response.features[0].attributes.GlobalID.replace(
										/[{}]/g,
										""
									)}`
								)
							}
						})
				})
			})
		)
	}, [])

	useEffect(() => {
		bgExpand.content.source.basemaps.items[0].title = t("plaques.map.basemapLight")
		bgExpand.content.source.basemaps.items[1].title = t("plaques.map.basemapDark")

		view.ui.empty("top-left")

		view.ui.add(bgExpand, "top-left")
		view.ui.add(locateWidget, "top-left")
	}, [i18n.language])

	useEffect(() => {
		return () => {
			viewHandles.forEach((handle) => {
				handle.remove()
			})
			viewHandles.length = 0

			view.container = null
		}
	}, [])

	return <div className="map" ref={mapDiv}></div>
}

export default ObjectMap
