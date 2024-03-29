import FeatureLayer from "@arcgis/core/layers/FeatureLayer"

export const events = new FeatureLayer({
	url: "https://opencity.vplanas.lt/arcgis/rest/services/P_VilniausDNR/VilniausDNR/MapServer/5",
	outFields: ["*"],
	title: "Ivykiai",
})

export const persons = new FeatureLayer({
	url: "https://opencity.vplanas.lt/arcgis/rest/services/P_VilniausDNR/VilniausDNR/MapServer/3",
	outFields: ["*"],
	title: "Asmenys",
})
