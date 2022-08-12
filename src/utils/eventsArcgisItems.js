import FeatureLayer from "@arcgis/core/layers/FeatureLayer"

export const events = new FeatureLayer({
	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/5",
	outFields: ["*"],
	title: "Ivykiai",
})

export const persons = new FeatureLayer({
	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/3",
	outFields: ["*"],
	title: "Asmenys",
})

export const related_sources = new FeatureLayer({
	url: "https://atviras.vplanas.lt/arcgis/rest/services/VilniausDNR/VilniausDNR/MapServer/11",
	outFields: ["*"],
	title: "Susije saltiniai",
})