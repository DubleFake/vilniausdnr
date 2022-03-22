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
