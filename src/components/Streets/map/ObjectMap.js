import React, { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import * as watchUtils from "@arcgis/core/core/watchUtils"

import { view, view2, objects, bgExpand, locateWidget } from "../../../utils/streetsArcgisItems"

const viewHandles = []

const ObjectMap = (props) => {
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const mapDiv = useRef(null)
	const mapDiv2 = useRef(null)

	useEffect(() => {
		view.container = mapDiv.current
		// view2.container = mapDiv2.current

		// const views = [view, view2]
		// let active
		// const sync = (source) => {
		// 	if (!active || !active.viewpoint || active !== source) {
		// 		return
		// 	}
		// 	for (const view of views) {
		// 		if (view !== active) {
		// 			view.viewpoint = active.viewpoint
		// 		}
		// 	}
		// }
		// for (const view of views) {
		// 	view.watch(["interacting", "animation"], () => {
		// 		active = view
		// 		sync(active)
		// 	})
		// 	view.watch("viewpoint", () => sync(view))
		// }

		viewHandles.forEach((handle) => {
			handle.remove()
		})
		viewHandles.length = 0

		view.whenLayerView(objects).then((objectsView) => {
			watchUtils.whenFalseOnce(objectsView, "updating").then(() => {
				objectsView
					.queryFeatures({
						outFields: ["OBJECTID", "KATEGOR", "PAV", "Klasė", "Poklasis"],
						where: "",
						returnGeometry: false,
					})
					.then((response) => {
						if (response.features.length) {
							props.setInitialObjectsList(response.features)

							let objectClass = []
							let objectSubclass = []
							let dictClassRelations = []

							for (let field in response.fields) {
								if (response.fields[field].alias === "Klasė") {
									for (let code in response.fields[field].domain.codedValues) {
										let obj = {}
										obj.code = response.fields[field].domain.codedValues[code].code
										obj.alias = response.fields[field].domain.codedValues[code].name
										objectClass.push(obj)
									}
								}
								if (response.fields[field].alias === "Poklasis") {
									for (let code in response.fields[field].domain.codedValues) {
										let obj = {}
										obj.code = response.fields[field].domain.codedValues[code].code
										obj.alias = response.fields[field].domain.codedValues[code].name
										objectSubclass.push(obj)
									}
								}
							}
							for (let cls in objectClass) {
								let tempSet = new Set()
								for (let feature in response.features) {
									if (response.features[feature].attributes.Klasė === objectClass[cls].code) {
										tempSet.add(response.features[feature].attributes.Poklasis)
									}
								}
								dictClassRelations.push([...tempSet])
							}

							props.setInitialObjectsClasses([objectClass, objectSubclass, dictClassRelations])
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
								outFields: ["OBJECTID"],
							})
						})
						.then((response) => {
							if (response.features.length > 0) {
								props.setMapQuery(response.features)
								navigate(`object/${response.features[0].attributes.OBJECTID}`)
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

	return (
		<>
			<div className="map" ref={mapDiv}></div>
			{/* <div id="view1Div" ref={mapDiv} style={{ float: "left", width: "50%", height: "100%" }}></div> */}
			{/* <div id="view2Div" ref={mapDiv2} style={{ float: "left", width: "50%", height: "100%" }}></div> */}
		</>
	)
}

export default ObjectMap
