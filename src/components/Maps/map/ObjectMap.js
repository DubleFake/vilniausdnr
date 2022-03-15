import React, { useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import * as projection from "@arcgis/core/geometry/projection"
import SpatialReference from "@arcgis/core/geometry/SpatialReference"

import { view, map, objects, bgExpand, locateWidget } from "../../../utils/mapsArcgisItems"

const ObjectMap = () => {
	const { t, i18n } = useTranslation()
	const mapDiv = useRef(null)

	useEffect(() => {
		view.container = mapDiv.current

		projection.load().then(() => {
			objects.load().then(() => {
				console.log(objects)
				// const inSpatialReference = new SpatialReference({
				// 	wkid: 102100,
				// })
				// const outSpatialReference = new SpatialReference({
				// 	wkid: 2600,
				// 	// wkid: 3346,
				// })
				// const geogtrans = projection.getTransformations(inSpatialReference, outSpatialReference)
				// console.log(objects)

				// let asd = projection.project(objects.allSublayers, outSpatialReference)
				// console.log(asd)

				// // view.graphics.add(asd.items[0])
			})
		})
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
			view.container = null
		}
	}, [])

	return <div className="map" ref={mapDiv}></div>
}

export default ObjectMap
