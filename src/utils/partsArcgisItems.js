import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import TileLayer from "@arcgis/core/layers/TileLayer"
import Basemap from "@arcgis/core/Basemap"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"
import Expand from "@arcgis/core/widgets/Expand"
import Locate from "@arcgis/core/widgets/Locate"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"

const url = window.location.href
const origin = new URL(url).origin

// export const objects = new FeatureLayer({
// 	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/1",
// 	outFields: [
// 		"OBJECTID",
// 		"TIPAS",
// 		"OBJ_PAV",
// 		"ATMINT_TIP",
// 		"OBJ_LAIK_TIP",
// 		"OBJ_APRAS",
// 		"AUTORIUS",
// 		"SALTINIS",
// 		"GlobalID",
// 		"VIETA",
// 	],
// 	title: "Lentelės",
// 	renderer: objectRenderer,
// })

export const objects = new FeatureLayer({
	url: "https://opencity.vplanas.lt/server/rest/services/Testavimai/Vietovardziai/MapServer/46",
})

export const all = new MapImageLayer({
	url: "https://opencity.vplanas.lt/server/rest/services/Testavimai/Vietovardziai/MapServer",
})

const basemap1 = new Basemap({
	baseLayers: [
		new TileLayer({
			// url: "https://atviras.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_light_LKS/MapServer",
			url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_LKS_su_rajonu/MapServer",
		}),
	],
	id: "light",
	thumbnailUrl: `${origin}/vilniausdnr/signIcons/basemap_light.png`,
})
const basemap2 = new Basemap({
	baseLayers: [
		new TileLayer({
			// url: "https://atviras.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_dark_LKS/MapServer",
			url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_dark_calibrated/MapServer",
		}),
	],
	id: "dark",
	thumbnailUrl: `${origin}/vilniausdnr/signIcons/basemap_dark.png`,
})
const basemap3 = new Basemap({
	baseLayers: [
		new TileLayer({
			url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/ORTOFOTO_2019_LKS_FULL/MapServer",
		}),
	],
	id: "orto",
	thumbnailUrl: `${origin}/vilniausdnr/signIcons/basemap_orto.png`,
})
export const basemaps = [basemap1, basemap2, basemap3]

export const map = new Map({
	basemap: basemap2,
	layers: [all, objects],
})

export const view = new MapView({
	map: map,
	zoom: 2,
	slider: false,
	//popup: {
	//	dockEnabled: true,
	//	dockOptions: {
	//		buttonEnabled: false,
	//		breakpoint: false,
	//		position: "top-right",
	//	},
	//},
	ui: {
		components: ["attribution"],
	},
	highlightOptions: {
		color: "#FF0000",
		haloColor: "#FF0000",
	},
	constraints: {
		rotationEnabled: false,
	},
})

const basemapGallery = new BasemapGallery({
	view: view,
	source: [basemap1, basemap2, basemap3],
})

export const bgExpand = new Expand({
	view: view,
	content: basemapGallery,
	autoCollapse: true,
	collapseIconClass: "esri-icon-left",
	//collapseTooltip: "Suskleisti",
	//expandTooltip: "Išskleisti bazinius žemėlapius",
})

export const locateWidget = new Locate({
	view: view,
	popupEnabled: false,
})
