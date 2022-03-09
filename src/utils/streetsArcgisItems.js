import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import TileLayer from "@arcgis/core/layers/TileLayer"
import Basemap from "@arcgis/core/Basemap"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"
import Expand from "@arcgis/core/widgets/Expand"
import Locate from "@arcgis/core/widgets/Locate"

const url = window.location.href
const origin = new URL(url).origin

const colors = [
	"#b2b2b2",
	"#b2b2b2",
	"#a87000",
	"#267300",
	"#4ce600",
	"#cdf57a",
	"#e64b41",
	"#e60000",
	"#a87000",
	"#005ce6",
	"#8400a8",
	"#4e4e4e",
	"#c500ff",
	"#004da8",
	"#ffff73",
	"#73b2ff",
	"#e173ff",
	"#828282",
	"#e60000",
	"#e6e600",
]
export const objectRenderer = {
	type: "unique-value",
	field: "KATEGOR",
	uniqueValueInfos: [
		{
			value: "D1",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[3],
			},
		},
		{
			value: "D2",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[4],
			},
		},
		{
			value: "D",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[5],
			},
		},
		{
			value: "C2",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[6],
			},
		},
		{
			value: "D3",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[7],
			},
		},
		{
			value: "AS",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[8],
			},
		},
		{
			value: "C1",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[9],
			},
		},
		{
			value: "B1",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[10],
			},
		},
		{
			value: "F1",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[12],
			},
		},
		{
			value: "B2",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[13],
			},
		},
		{
			value: "P",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[14],
			},
		},
		{
			value: "E2",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[15],
			},
		},
		{
			value: "S",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[16],
			},
		},
		{
			value: "A2",
			symbol: {
				type: "simple-line",
				cap: "butt",
				color: colors[19],
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
	url: "https://utility.arcgis.com/usrsvcs/servers/23aa84d7de1145d0848d2adc03bc4757/rest/services/VilniausDNR/VilniausDNR/MapServer/1",
	outFields: ["*"],
	title: "Gatvės",
	renderer: objectRenderer,
})

const basemap1 = new Basemap({
	baseLayers: [
		new TileLayer({
			url: "https://atviras.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_light_LKS/MapServer",
		}),
	],
	id: "light",
	thumbnailUrl: `${origin}/signIcons/basemap_light.png`,
})
const basemap2 = new Basemap({
	baseLayers: [
		new TileLayer({
			url: "https://atviras.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_dark_LKS/MapServer",
		}),
	],
	id: "dark",
	thumbnailUrl: `${origin}/signIcons/basemap_dark.png`,
})

export const map = new Map({
	basemap: basemap2,
	layers: [objects],
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
})

const basemapGallery = new BasemapGallery({
	view: view,
	source: [basemap1, basemap2],
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
