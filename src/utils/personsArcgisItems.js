import FeatureLayer from "@arcgis/core/layers/FeatureLayer"

export const persons = new FeatureLayer({
	url: "https://opencity.vplanas.lt/arcgis/rest/services/P_VilniausDNR/VilniausDNR/MapServer/3",
	// outFields: ["*"],
	title: "Asmenys",
})

export const biography = new FeatureLayer({
	url: "https://opencity.vplanas.lt/arcgis/rest/services/P_VilniausDNR/VilniausDNR/MapServer/4",
	// outFields: ["*"],
	title: "Biografija",
})

export const related_persons = new FeatureLayer({
	url: "https://opencity.vplanas.lt/arcgis/rest/services/P_VilniausDNR/VilniausDNR/MapServer/8",
	// outFields: ["*"],
	title: "Susije asmenys",
})

export const related_org = new FeatureLayer({
	url: "https://opencity.vplanas.lt/arcgis/rest/services/P_VilniausDNR/VilniausDNR/MapServer/9",
	// outFields: ["*"],
	title: "Susije org",
})

export const related_person_sources = new FeatureLayer({
	url: "https://opencity.vplanas.lt/arcgis/rest/services/P_VilniausDNR/VilniausDNR/MapServer/11",
	// outFields: ["*"],
	title: "Susije saltiniai",
})

export const related_events = new FeatureLayer({
	url: "https://opencity.vplanas.lt/arcgis/rest/services/P_VilniausDNR/VilniausDNR/MapServer/5",
	// outFields: ["*"],
	title: "Susije ivykiai",
})

export const classifications = new FeatureLayer({
	url: "https://opencity.vplanas.lt/arcgis/rest/services/P_VilniausDNR/VilniausDNR/MapServer/6",
	// outFields: ["*"],
	title: "Klasifikatoriai",
})
