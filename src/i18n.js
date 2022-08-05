// import i18n from "i18next"
// import { initReactI18next } from "react-i18next"

// import Backend from "i18next-http-backend"
// import LanguageDetector from "i18next-browser-languagedetector"

// // don't want to use this?
// // have a look at the Quick start guide
// // for passing in lng and translations on init

// i18n
// 	// load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
// 	// learn more: https://github.com/i18next/i18next-http-backend
// 	// want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
// 	.use(Backend)
// 	// detect user language
// 	// learn more: https://github.com/i18next/i18next-browser-languageDetector
// 	.use(LanguageDetector)
// 	// pass the i18n instance to react-i18next.
// 	.use(initReactI18next)
// 	// init i18next
// 	// for all options read: https://www.i18next.com/overview/configuration-options
// 	.init({
// 		resources,
// 		lng: "lt", //default
// 		fallbackLng: "lt",
// 		debug: true,
// 		interpolation: {
// 			escapeValue: false, // not needed for react as it escapes by default
// 		},
// 		detection: {
// 			order: [
// 				"path",
// 				"cookie",
// 				"localStorage",
// 				"sessionStorage",
// 				"navigator",
// 				"querystring",
// 				"htmlTag",
// 				"subdomain",
// 			],

// 			lookupFromPathIndex: 0,
// 			lookupFromSubdomainIndex: 0,
// 		},
// 	})

// export default i18n

import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import Backend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	lt: {
		translation: {
			home: {
				periods: "Miestas atskirais istoriniais periodais",
				plaques: "Skulptūros ir atminimo lentos",
				persons: "Asmenybės ir jų atminimo ženklai",
				maps: "Istoriniai planai ir žemėlapiai",
				streets: "Miesto gatvės",
				parts: "Miesto dalys",
				addresses: "Adresai",
				buildings: "Pastatai",
				events: "Istoriniai įvykiai",
			},
			plaques: {
				map: {
					basemapLight: "Šviesus žemėlapis",
					basemapDark: "Tamsus žemėlapis",
					basemapOrto: "Ortofoto",
				},
				options: {
					search: "Paieška",
					visualization: "Vaizdavimas",
					visualizeBy: "Vaizduoti pagal",
					objectType: "Objekto tipą",
					memoryType: "Atminimo tipą",
					period: "Įrengimo laikotarpis",
					extent: "Rodyti tik matomus objektus",
					legend: "Sutartiniai ženklai",
					clearFilters: "Išvalyti filtrus",
					all: "Visi",
					notFound: "Objektų nerasta, filtrai išvalyti",
					count: "Rezultatų skaičius",
					objects: {
						1: "Atminimo arba memorealinė lenta su tekstu",
						2: "Skulptūra, paminklas, skulptūrinė kompozicija",
						3: "Atminimo lenta su bareljefu ar kitais meniniais elementais",
						4: "Freska, pano, mozaika, sieninė tapyba",
						5: "Pavadinimo lentelė (pavadinimas, kuris suteiktas pastatui, statiniui ar kitam objektui)",
						6: "Užrašas, ženklas grindinyje, ant laiptų, akmenų",
						7: "Vietos pažymėjimo ženklas mažosios architektūros priemonėmis",
						8: "Paminklas, antkapis palaidojimo vietose",
					},
					memories: {
						1: "Žymaus asmens atminimui",
						2: "Žymių asmenų grupės atminimui",
						3: "Abstraktus objektas",
						4: "Organizacijos atminimui",
						5: "Reikšmingo (istorinio) įvykio atminimui",
						6: "Žymaus asmens palaidojimo vietai žymėti",
						7: "Meninis idėjos simbolis",
						8: "Istorinio statinio vietos pažymėjimas",
					},
					periods: {
						1: "Iki 1795 m. (Respublikos padalinimo)",
						2: "1796 - 1919 m. (Iki lenkų okupacijos)",
						3: "1919 - 1939 m.",
						4: "1939 - 1989 m. (Sovietų okupacija)",
						5: "nuo 1990 m. (Atkūrus nepriklausomybę)",
					},
				},
				objectPopup: {
					TIPAS: "Objekto tipas",
					ATMINT_TIP: "Atminties tipas",
					OBJEKT_TXT: "Užrašas ant objekto",
					VIETA: "Orientacinė vieta",
					KONSTRUKC: "Objekto konstrukcija",
					METAI_PRAD: "Įrengimo pradžia",
					METAI_PAB: "Įrengimo pabaiga",
					OBJ_LAIK_TIP: "Objekto tipas pagal įrengimo laikotarpį",
					OBJ_APRAS: "Objekto aprašymas",
					AUTORIUS: "Autorius",
					SALTINIS: "Šaltiniai (Autorius, pavadinimas, int. puslapis)",
					relatedOne: "Susijęs asmuo",
					relatedMany: "Susiję asmenys",
					shareUrl: "Nuoroda nukopijuota",
				},
				personPopup: {
					Vardas__liet_: "Vardas",
					Pavardė__liet_: "Pavardė",
					Gimimo_data: "Gimimo data",
					Gimimo_vieta: "Gimimo vieta",
					Mirties_data: "Mirties data",
					Mirties_vieta: "Mirties vieta",
					Palaidojimo_vieta: "Palaidojimo vieta",
					Veikla__profesija: "Veikla, profesija",
					Veikla__kūryba__trumpai: "Veikla (kūryba) trumpai",
					Asmens__įamžinto_pavadinime_ryš: "Asmens, įamžinto pavadinime ryšys su Vilniumi",
					Biografija___bendroji_informaci: "Biografija, bendroji informacija",
					Veikla_plačiau__kūriniai__istor: "Veikla plačiau (kūriniai, istoriniai poelgiai ir pn.)",
					Apdovanojimai: "Apdovanojimai",
					Šaltiniai__Autorius__pavadinima: "Šaltiniai [Autorius, pavadinimas, www]",
					relatedOne: "Susijęs objektas",
					relatedMany: "Susiję objektai",
				},
			},
      persons: {
        options: {
          profession: "Profesija",
          period: "Gyvenimo laikotarpis",
        },
      },
		},
	},
	en: {
		translation: {
			home: {
				periods: "The city in separate historical periods",
				plaques: "Sculptures and memorial plaques",
				persons: "Personalities and their signs of remembrance",
				maps: "Historical plans and maps",
				streets: "City streets",
				parts: "Parts of the city",
				addresses: "Addresses",
				buildings: "Buildings",
				events: "Historical events",
			},
			plaques: {
				map: {
					basemapLight: "Light basemap",
					basemapDark: "Dark basemap",
					basemapOrto: "Ortophoto",
				},
				options: {
					search: "Search",
					visualization: "Visualization",
					visualizeBy: "Visualize by",
					objectType: "Object type",
					memoryType: "Memory type",
					period: "Installation period",
					extent: "Show only visible objects",
					legend: "Legend",
					clearFilters: "Clear filters",
					all: "All",
					notFound: "No objects found, filters cleared",
					count: "Number of results",
					objects: {
						1: "Commemorative or memorial plaque with text",
						2: "Sculpture, monument, sculptural composition",
						3: "Commemorative plaque with bas-relief or other artistic elements",
						4: "Fresco, panel, mosaic, wall painting",
						5: "Title sign (name given to the building, structure or other object)",
						6: "Inscription, sign on pavement, stairs, stones",
						7: "Place marking by means of small architectural means",
						8: "Monument, tombstone at burial sites",
					},
					memories: {
						1: "In memory of a famous person",
						2: "In memory of a group of famous persons",
						3: "Abstract object",
						4: "In memory of an organisation",
						5: "In commemoration of a significant (historical) event",
						6: "Burial place of a famous person",
						7: "Artistic symbol of an idea",
						8: "Place mark of a historic building",
					},
					periods: {
						1: "Before 1795 (Division of the Commonwealth)",
						2: "1796 - 1919 (Before the Polish occupation)",
						3: "1919 - 1939",
						4: "1939 - 1989 (Soviet occupation)",
						5: "since 1990 (After restoration of independence)",
					},
				},
				objectPopup: {
					TIPAS: "Object type",
					ATMINT_TIP: "Memory type",
					OBJEKT_TXT: "Writing on the object",
					VIETA: "Indicative location",
					KONSTRUKC: "Object construction",
					METAI_PRAD: "Start of installation",
					METAI_PAB: "End of installation",
					OBJ_LAIK_TIP: "Object type by installation period",
					OBJ_APRAS: "Object description",
					AUTORIUS: "Author",
					SALTINIS: "Sources (Author, title, web page)",
					relatedOne: "Related person",
					relatedMany: "Related persons",
					shareUrl: "Link copied",
				},
				personPopup: {
					Vardas__liet_: "Name",
					Pavardė__liet_: "Last name",
					Gimimo_data: "Date of birth",
					Gimimo_vieta: "Place of birth",
					Mirties_data: "Date of death",
					Mirties_vieta: "Place of death",
					Palaidojimo_vieta: "Place of burial",
					Veikla__profesija: "Activity, profession",
					Veikla__kūryba__trumpai: "Activities (works) in brief",
					Asmens__įamžinto_pavadinime_ryš: "Personal connection to Vilnius",
					Biografija___bendroji_informaci: "Biography, general information",
					Veikla_plačiau__kūriniai__istor: "Activities (works, historical deeds, etc.)",
					Apdovanojimai: "Awards",
					Šaltiniai__Autorius__pavadinima: "Sources [Author, title, www]",
					relatedOne: "Related object",
					relatedMany: "Related objects",
				},
			},
		},
	},
}

// i18n
// 	.use(initReactI18next) // passes i18n down to react-i18next
// 	.init({
// 		resources,
// 		lng: "lt", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
// 		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
// 		// if you're using a language detector, do not define the lng option

// 		interpolation: {
// 			escapeValue: false, // react already safes from xss
// 		},
// 	})

// export default i18n

i18n
	// load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
	// learn more: https://github.com/i18next/i18next-http-backend
	// want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
	.use(Backend)
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		resources,
		lng: "lt", //default
		fallbackLng: "lt",
		debug: true,
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		detection: {
			order: [
				"path",
				"cookie",
				"localStorage",
				"sessionStorage",
				"navigator",
				"querystring",
				"htmlTag",
				"subdomain",
			],

			lookupFromPathIndex: 0,
			lookupFromSubdomainIndex: 0,
		},
	})

export default i18n
