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

export const objectRenderer = {
	type: "unique-value",
	field: "TIPAS",
	uniqueValueInfos: [
		{
			value: "1",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_atminimo_lenta.svg`,
			},
		},
		{
			value: "3",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_atminimo_lenta_bareljefas.svg`,
			},
		},
		{
			value: "5",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_pavadinimo_lentele.svg`,
			},
		},
		{
			value: "6",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_uzrasas.svg`,
			},
		},
		{
			value: "4",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_freska.svg`,
			},
		},
		{
			value: "7",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_vietos_pazymejimas.svg`,
			},
		},
		{
			value: "2",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_skulptura.svg`,
			},
		},
		{
			value: "8",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_paminklas.svg`,
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

export const memoryRenderer = {
	type: "unique-value",
	field: "ATMINT_TIP",
	uniqueValueInfos: [
		{
			value: "1",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_asmuo.svg`,
			},
		},
		{
			value: "2",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_asmenu_grupe.svg`,
			},
		},
		{
			value: "6",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_palaidojimo_vieta.svg`,
			},
		},
		{
			value: "4",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_organizacija.svg`,
			},
		},
		{
			value: "5",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_istoriniai_ivykiai.svg`,
			},
		},
		{
			value: "8",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_istorinis_statinys.svg`,
			},
		},
		{
			value: "7",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_meninis_simbolis.svg`,
			},
		},
		{
			value: "3",
			symbol: {
				type: "picture-marker",
				url: `${origin}/vilniausdnr/signIcons/Atmint_abstraktus.svg`,
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
	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/1",
	outFields: [
		"OBJECTID",
		"TIPAS",
		"OBJ_PAV",
		"ATMINT_TIP",
		"OBJ_LAIK_TIP",
		"OBJ_APRAS",
		"AUTORIUS",
		"SALTINIS",
		"GlobalID",
	],
	title: "Lentelės",
	renderer: objectRenderer,
})

export const persons = new FeatureLayer({
	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/3",
	title: "Asmenys",
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