import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import TileLayer from "@arcgis/core/layers/TileLayer"
import Basemap from "@arcgis/core/Basemap"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"
import Expand from "@arcgis/core/widgets/Expand"
import Locate from "@arcgis/core/widgets/Locate"
import Swipe from "@arcgis/core/widgets/Swipe"

const url = window.location.href
const origin = new URL(url).origin

const colors = ["#f22f00", "#26ffff", "#d99800", "#ffdd00", "#ff4dc4", "#5ff500", "#0040ff"]

export const objectRenderer = {
	type: "unique-value",
	field: "Klasė",
	uniqueValueInfos: [
		{
			value: 1,
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[0],
			},
		},
		{
			value: 2,
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[1],
			},
		},
		{
			value: 3,
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[2],
			},
		},
		{
			value: 4,
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[3],
			},
		},
		{
			value: 5,
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[4],
			},
		},
		{
			value: 6,
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[5],
			},
		},
		{
			value: 7,
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[6],
			},
		},
	],
	visualVariables: [
		{
			type: "size",
			valueExpression: "$view.scale",
			stops: [
				{ size: 14, value: 500 },
				{ size: 11, value: 1000 },
				{ size: 8, value: 2000 },
				{ size: 5, value: 5000 },
				{ size: 2, value: 10000 },
			],
		},
	],
}

export const objects = new FeatureLayer({
	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/50",
	outFields: ["*"],
	title: "Gatvės",
})

const gatves_1808 = new FeatureLayer({
	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/76",
	outFields: ["*"],
	title: "1808",
	metai: 1808,
})
const gatves_1845 = new FeatureLayer({
	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/89",
	outFields: ["*"],
	title: "1845",
	metai: 1845,
})
const gatves_1911 = new FeatureLayer({
	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/82",
	outFields: ["*"],
	title: "1911",
	metai: 1911,
})
const gatves_1938 = new FeatureLayer({
	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/81",
	outFields: ["*"],
	title: "1938",
	metai: 1938,
})
const gatves_1977 = new FeatureLayer({
	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/90",
	outFields: ["*"],
	title: "1977",
	metai: 1977,
})
const gatves_2023 = new FeatureLayer({
	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/94",
	outFields: ["*"],
	title: "2023",
})
export const periods = [gatves_1808, gatves_1845, gatves_1911, gatves_1938, gatves_1977, gatves_2023]

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
	layers: [objects],
})
export const map2 = new Map({
	basemap: basemap2,
	layers: [gatves_1808],
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

export const swipe = new Swipe({
	view: view,
	leadingLayers: [],
	trailingLayers: [],
	direction: "horizontal",
	position: 50,
})
