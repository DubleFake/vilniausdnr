import React, { useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Point from "@arcgis/core/geometry/Point"

import { view, view2, map2, bgExpand, locateWidget, basemaps } from "../../../utils/mapsArcgisItems"

const viewHandles = []

const ObjectMap = (props) => {
	const { t, i18n } = useTranslation()
	const mapDiv = useRef(null)
	const mapDiv2 = useRef(null)

	useEffect(() => {
		view.container = mapDiv.current

		let pt = new Point({
			x: 583417.5449750205,
			y: 6061705.226068436,
			spatialReference: {
				wkid: 2600,
			},
		})
		view.center = pt
		view.zoom = 3
		view2.center = pt
		view2.zoom = 3

		viewHandles.forEach((handle) => {
			handle.remove()
		})
		viewHandles.length = 0

		viewHandles.push(
			view.watch("map.basemap.id", (newBasemap) => {
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
