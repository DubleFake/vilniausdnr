import React, { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import * as watchUtils from "@arcgis/core/core/watchUtils"
import Point from "@arcgis/core/geometry/Point"

import {
	view,
	view2,
	map2,
	swipeObjects,
	objects,
	bgExpand,
	locateWidget,
	basemaps,
} from "../../../utils/streetsArcgisItems"

const viewHandles = []

const ObjectMap = (props) => {
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const mapDiv = useRef(null)
	const mapDiv2 = useRef(null)

	useEffect(() => {
		view.container = mapDiv.current

		let pt = new Point({
			x: 582527.5805600522,
			y: 6061855.557955307,
			spatialReference: {
				wkid: 2600,
			},
		})
		view.center = pt
		view2.center = pt

		viewHandles.forEach((handle) => {
			handle.remove()
		})
		viewHandles.length = 0

		viewHandles.push(
			view.watch("map.basemap.id", (newBasemap) => {
				console.log(newBasemap)
				switch (newBasemap) {
					case "light":
						map2.basemap = basemaps[0]
						break
					case "dark":
						map2.basemap = basemaps[1]
						break
					case "orto":
						map2.basemap = basemaps[2]
						break
				}
			})
		)

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

							objectClass.sort((a, b) => a.code - b.code)
							objectSubclass.sort((a, b) => a.code - b.code)
              
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
		bgExpand.content.source.basemaps.items[2].title = t("plaques.map.basemapOrto")

		view.ui.empty("top-left")

		view.ui.add(bgExpand, "top-left")
		view.ui.add(locateWidget, "top-left")
	}, [i18n.language])

	useEffect(() => {
		if (props.toggleCompareWindow) {
			view2.container = mapDiv2.current

			view.container.style.width = "50%"
			view.container.style.boxSizing = "border-box"
			view.container.style.borderRight = "thin solid #D42323"

			view2.container.style.width = "50%"
			view2.container.style.boxSizing = "border-box"
			view2.container.style.borderLeft = "thin solid #D42323"

			const views = [view, view2]
			let active
			const sync = (source) => {
				if (!active || !active.viewpoint || active !== source) {
					return
				}
				for (const view of views) {
					if (view !== active) {
						view.viewpoint = active.viewpoint
					}
				}
			}
			for (const view of views) {
				view.watch(["interacting", "animation"], () => {
					active = view
					sync(active)
				})
				view.watch("viewpoint", () => sync(view)) //reiks poto istrint view arba handles
			}
		} else if (!props.toggleCompareWindow && view2.container) {
			view.container.style.width = "100%"
			view.container.style.boxSizing = ""
			view.container.style.borderRight = ""

			view2.container.style.width = "0%"
			view2.container.style.boxSizing = ""
			view2.container.style.borderLeft = ""
			view2.container = null
		}
	}, [props.toggleCompareWindow])

	useEffect(() => {
		return () => {
			viewHandles.forEach((handle) => {
				handle.remove()
			})
			viewHandles.length = 0

			view.container = null
			view2.container = null
		}
	}, [])

	return (
		<>
			<div
				className="map"
				id="view1Div"
				ref={mapDiv}
				style={{
					float: "left",
					width: "100%",
					height: "100%",
				}}
			></div>
			<div
				id="view2Div"
				ref={mapDiv2}
				style={{
					float: "left",
					width: "0%",
					height: "100%",
				}}
			></div>
			{/* <div id="view2Div" ref={mapDiv2} style={{ float: "left", width: "50%", height: "100%" }}></div> */}
		</>
	)
}

export default ObjectMap
