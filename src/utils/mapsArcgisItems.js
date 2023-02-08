import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import TileLayer from "@arcgis/core/layers/TileLayer"
import Basemap from "@arcgis/core/Basemap"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"
import Expand from "@arcgis/core/widgets/Expand"
import Locate from "@arcgis/core/widgets/Locate"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
import FeatureTable from "@arcgis/core/widgets/FeatureTable"

// export const objects = new MapImageLayer({
// 	url: "https://www.geoportal.lt/mapproxy/gisc_vilnius_ort_1944/MapServer",
// 	title: "Žemėlapiai",
// })

export const maps = new FeatureLayer({
	url: "https://opencity.vplanas.lt/arcgis/rest/services/P_VilniausDNR/VilniausDNR/MapServer/91",
})

const basemap1 = new Basemap({
	baseLayers: [
		new TileLayer({
			// url: "https://atviras.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_light_LKS/MapServer",
			url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_LKS_su_rajonu/MapServer",
		}),
	],
	id: "light",
	thumbnailUrl: `${origin}/vilniausdnrtest/signIcons/basemap_light.png`,
})
const basemap2 = new Basemap({
	baseLayers: [
		new TileLayer({
			// url: "https://atviras.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_dark_LKS/MapServer",
			url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_dark_calibrated/MapServer",
		}),
	],
	id: "dark",
	thumbnailUrl: `${origin}/vilniausdnrtest/signIcons/basemap_dark.png`,
})
const basemap3 = new Basemap({
	baseLayers: [
		new TileLayer({
			url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/ORTOFOTO_2019_LKS_FULL/MapServer",
		}),
	],
	id: "orto",
	thumbnailUrl: `${origin}/vilniausdnrtest/signIcons/basemap_orto.png`,
})
export const basemaps = [basemap1, basemap2, basemap3]

export const map = new Map({
	basemap: basemap2,
	// layers: [objects],
})
export const map2 = new Map({
	basemap: basemap2,
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
		color: "#FFFFFF",
		fillOpacity: 1,
		haloColor: "#FF0026",
		haloOpacity: 1,
	},
	constraints: {
		geometry: {
			type: "extent",
			spatialReference: 2600,
			xmin: 566176.6289999997,
			ymin: 6048667.358999999,
			xmax: 595518,
			ymax: 6077582.921,
		},
	},
})

export const view2 = new MapView({
	map: map2,
	zoom: 2,
	slider: false,
	constraints: {
		// snapToZoom: false,
		geometry: {
			type: "extent",
			spatialReference: 2600,
			xmin: 566176.6289999997,
			ymin: 6048667.358999999,
			xmax: 595518,
			ymax: 6077582.921,
		},
	},
	ui: {
		components: ["attribution"],
	},
	highlightOptions: {
		color: "#FF0000",
		haloColor: "#FF0000",
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
