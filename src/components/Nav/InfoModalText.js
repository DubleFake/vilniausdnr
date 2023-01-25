import Typography from "@mui/material/Typography"

export const textDict = {
	about: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				„Vilniaus DNR“ portalas – tai virtualūs interneto vartai į Vilniaus istoriją. Čia rasite istorinius
				miesto žemėlapius, kuriuose užkoduota Vilniaus praeitis bei įrankius, kurie padės šį painų kodą
				įveikti. Skirtingose portalo skiltyse pateikta informacija padės geriau pažinti Vilnių – rasite
				istorinių topografijų rekonstrukcijas, istorines nuotraukas, dabartines ir istorines gatves, mieste
				įamžintas asmenybes, jų įamžinimo ženklus bei svarbiausius istorinius įvykius. Visa ši informacija
				ryšiais susieta tarpusavyje, taip sudarant daugialypį, bet vientisą ir unikalų Vilniaus kodą.
				„Vilniaus DNR“ kodą.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Portalą Vilniaus miesto savivaldybės užsakymu sukūrė UAB „Vilniaus planas“. Portalą kuriant savo
				medžiaga prisidėjo Mokslo ir enciklopedijų leidybos centras bei LMA Vrubevskių biblioteka.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Simboliška, kad „Vilniaus DNR“ portalas visuomenei atveriamas Vilniui švenčiant 700-ajį gimtadienį.
				Tikime, kad tai bus dovana Vilniaus miestui, vilniečiams, miesto svečiams bei visiems smalsuoliams,
				kurie domisi Vilniumi bei marga jo istorija.
			</Typography>
		</>
	),

	map_info: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Ar kada ieškojote senų Vilniaus miesto žemėlapių? Yra daug informacijos šaltinių, kuriuose galima
				rasti senų Vilniaus žemėlapių, tačiau dažniausiai tie žemėlapiai tėra skenuoti paveikslėliai, kurie
				nėra įskaitmeninti ir orientuoti šių laikų koordinačių sistemoje, todėl nėra galimybės jų lyginti su
				šių laikų žemėlapiais. Reti koordinuoti žemėlapiai publikuoti atskiruose skaitmeninių žemėlapių
				portaluose, tačiau jie nėra integruoti tarpusavyje. „Vilniaus DNR“ portalo skiltis „Istoriniai planai
				ir žemėlapiai“ būtent ir turėtų būti ta viena vieta, kurioje planuojame integruoti įvairius istorinius
				Vilniaus miesto planus ir žemėlapius. Šiuo metu esami žemėlapiai suskirstyti į keturias grupes:
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1, ml: 2 }}>
				• Topografiniai planai – tai detaliausi turimi stambaus mastelio (1:5000 ir stambesnio) istoriniai
				žemėlapiai, kuriuose sutartiniais ženklais tiksliai vaizduojami gamtiniai ir žmogaus sukurti žemės
				paviršiaus objektai. Dėl didelio detalumo šie žemėlapiai paprastai sudaryti iš skirtingų lapų.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1, ml: 2 }}>
				• Istorinių topografijų rekonstrukcijos – tai atkurti ir patikslinti topografiniai planai. Apie
				rekonstrukcijas daugiau informacijos pateikiama “Miestas atskirais istoriniais periodais” skiltyje.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1, ml: 2 }}>
				• Ortofotografiniai žemėlapiai – tai žemėlapiai, sudaryti iš specialia fotokamera iš orlaivių padarytų
				žemės paviršiaus (aerofotografinių) nuotraukų.{" "}
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1, ml: 2 }}>
				• LMA Vrublevskių bibliotekos žemėlapiai – tai 2015-2016 m. Lietuvos mokslų akademijos Vrublevskių
				bibliotekos projekto „Užmirštasis Vilnius“ metu skaitmenizuoti 49 žemėlapiai. Šie žemėlapiai sudaryti
				XIX–XX a., jų mastelis varijuoja tarp 1:8 000 ir 1:40 000, žemėlapių pavadinimai pateikiami originalia
				forma.{" "}
			</Typography>
		</>
	),
	map_how: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Informacija rengiama
			</Typography>
		</>
	),

	contacts: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Turite klausimų ar pasiūlymų? Rašykite info@vplanas.lt
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				“Vilniaus DNR” atviras pasiūlymams bendradarbiauti ir kaupti Vilniaus istoriją kartu!
			</Typography>
		</>
	),
}

export const secondLevelTitles = [
	["Istoriniai planai ir žemėlapiai", "map_info", "map_how"],
	["Miesto gatvės", "street_info", "street_how"],
	["Mieste įamžintos asmenybės", "person_info", "person_how"],
	["Senosios fotografijos ir atvirutės", "foto_info", "foto_how"],
	["Skulptūros ir atminimo lentos", "plaque_info", "plaque_how"],
	["Miestas atskirais istoriniais periodais", "period_info", "period_how"],
	["Istoriniai įvykiai", "event_info", "event_how"],
]
