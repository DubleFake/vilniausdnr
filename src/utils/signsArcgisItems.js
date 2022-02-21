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
const objectsRenderer = {
	type: "unique-value",
	field: "TIPAS",
	uniqueValueInfos: [
		{
			value: "1",
			symbol: {
				type: "picture-marker",
				url: `${origin}/signIcons/Atmint_atminimo_lenta.svg`,
			},
		},
		{
			value: "2",
			symbol: {
				type: "picture-marker",
				url: `${origin}/signIcons/Atmint_skulptura.svg`,
			},
		},
		{
			value: "3",
			symbol: {
				type: "picture-marker",
				url: `${origin}/signIcons/Atmint_atminimo_lenta_bareljefas.svg`,
			},
		},
		{
			value: "4",
			symbol: {
				type: "picture-marker",
				url: `${origin}/signIcons/Atmint_freska.svg`,
			},
		},
		{
			value: "5",
			symbol: {
				type: "picture-marker",
				url: `${origin}/signIcons/Atmint_pavadinimo_lentele.svg`,
			},
		},
		{
			value: "6",
			symbol: {
				type: "picture-marker",
				url: `${origin}/signIcons/Atmint_uzrasas.svg`,
			},
		},
		{
			value: "7",
			symbol: {
				type: "picture-marker",
				url: `${origin}/signIcons/Atmint_vietos_pazymejimas.svg`,
			},
		},
		{
			value: "8",
			symbol: {
				type: "picture-marker",
				url: `${origin}/signIcons/Atmint_paminklas.svg`,
			},
		},
	],
	visualVariables: [
		{
			type: "size",
			valueExpression: "$view.scale",
			stops: [
				{ size: 24, value: 500 },
				{ size: 21, value: 1000 },
				{ size: 18, value: 2000 },
				{ size: 15, value: 5000 },
				{ size: 12, value: 10000 },
			],
		},
	],
}

export const objects = new FeatureLayer({
	url: "https://utility.arcgis.com/usrsvcs/servers/14627426b83f4fcf8198764db38287f3/rest/services/VilniausDNR/VilniausDNR/MapServer/0",
	outFields: ["*"],
	title: "Lentelės",
	renderer: objectsRenderer,
})

export const persons = new FeatureLayer({
	url: "https://utility.arcgis.com/usrsvcs/servers/14627426b83f4fcf8198764db38287f3/rest/services/VilniausDNR/VilniausDNR/MapServer/2",
	outFields: ["*"],
	title: "Asmenys",
})

let basemap = new Basemap({
	baseLayers: [
		new TileLayer({
			url: "https://atviras.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_light_LKS/MapServer",
		}),
	],
	title: "Šviesus",
	id: "Šviesus",
})

export const map = new Map({
	basemap: basemap,
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

const basemap1 = new Basemap({
	baseLayers: [
		new TileLayer({
			url: "https://atviras.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_light_LKS/MapServer",
		}),
	],
	title: "Šviesus žemėlapis",
	id: "Šviesus žemėlapis",
	thumbnailUrl: "basemap_light.png",
})
const basemap2 = new Basemap({
	baseLayers: [
		new TileLayer({
			url: "https://atviras.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_dark_LKS/MapServer",
		}),
	],
	title: "Tamsus žemėlapis",
	id: "Tamsus žemėlapis",
	thumbnailUrl: "basemap_dark.png",
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
	collapseTooltip: "Suskleisti",
	expandTooltip: "Išskleisti bazinius žemėlapius",
})

export const locateWidget = new Locate({
	view: view,
	popupEnabled: false,
})
