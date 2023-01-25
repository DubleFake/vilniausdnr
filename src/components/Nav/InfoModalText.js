import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

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

	maps_info: (
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
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }} component={"div"}>
				<ul>
					<li>
						Topografiniai planai – tai detaliausi turimi stambaus mastelio (1:5000 ir stambesnio) istoriniai
						žemėlapiai, kuriuose sutartiniais ženklais tiksliai vaizduojami gamtiniai ir žmogaus sukurti žemės
						paviršiaus objektai. Dėl didelio detalumo šie žemėlapiai paprastai sudaryti iš skirtingų lapų.
					</li>
					<li>
						Istorinių topografijų rekonstrukcijos – tai atkurti ir patikslinti topografiniai planai. Apie
						rekonstrukcijas daugiau informacijos pateikiama “Miestas atskirais istoriniais periodais”
						skiltyje.
					</li>
					<li>
						Ortofotografiniai žemėlapiai – tai žemėlapiai, sudaryti iš specialia fotokamera iš orlaivių
						padarytų žemės paviršiaus (aerofotografinių) nuotraukų.
					</li>
					<li>
						LMA Vrublevskių bibliotekos žemėlapiai – tai 2015-2016 m. Lietuvos mokslų akademijos Vrublevskių
						bibliotekos projekto „Užmirštasis Vilnius“ metu skaitmenizuoti 49 žemėlapiai. Šie žemėlapiai
						sudaryti XIX–XX a., jų mastelis varijuoja tarp 1:8 000 ir 1:40 000, žemėlapių pavadinimai
						pateikiami originalia forma.
					</li>
				</ul>
			</Typography>
		</>
	),
	maps_how: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Informacija rengiama
			</Typography>
		</>
	),

	streets_info: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Turbūt daugelis vilniečių yra atkreipę dėmesį, kad Žvėryne yra daug gatvių, kurios pavadintos žvėrių
				pavadinimais. Bet ar žinote, kad tokių vienodos kilmės pavadinimų gatvių santalkų Vilniaus mieste yra
				ir daugiau? Pavyzdžiui Balsiuose yra gatvių santalka pavadinta baltų dievybių, o Pavilnyje – tautų
				vardais.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Portalo miesto gatvių skiltį sudaro dvi dalys – dabartis ir praeitis.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				<b>Dabarties skiltyje</b> pateikiama informacija apie visas miesto gatves. Jos suklasifikuotos pagal
				pavadinimų reikšmes, pagal kurias galite filtruoti gatves. Pavyzdžiui, galite sužinoti, kiek Vilniaus
				mieste gatvių pavadintų rašytojų vardais. Taip pat pateikiama informacija apie kiekvienos gatvės ar
				jos dalies pavadinimus, kurie pateikiami istoriniuose žemėlapiuose (originalia forma).
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				<b>Praeities skiltyje</b> pateikiama informacija apie centrinės Vilniaus miesto dalies gatvių istoriją
				- 5 istorinių periodų pavadinimus ir ašines linijas, kurias galima lyginti tarpusavyje. Taip pat
				pateikiamos nuorodos į originalius žemėlapius, kuriuos naudojant istoriniai gatvių pavadinimai ir
				ašinės linijos buvo
			</Typography>
		</>
	),
	streets_how: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Informacija rengiama
			</Typography>
		</>
	),

	persons_info: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Skiltyje pateikiama informacija apie asmenybes, kurioms Vilniaus mieste įrengtos atminimo lentos,
				skulptūros, paminklai ar jų vardais pavadintos gatvės. Informacija apima:
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }} component={"div"}>
				<ol>
					<li style={{ paddingLeft: 4 }}>
						Išskirtus pagrindinius asmenybės biografijos faktus. Faktai susiję su Vilniumi išskirti ir
						pateikiami raudonai;
					</li>
					<li style={{ paddingLeft: 4 }}>Ryšio su Vilniumi aprašymą;</li>
					<li style={{ paddingLeft: 4 }}>Asmenybei Vilniuje įrengtų skulptūrų ir paminklų nuorodas;</li>
					<li style={{ paddingLeft: 4 }}>Asmenybei Vilniuje įrengtų atminimo lentų nuorodas.</li>
					<li style={{ paddingLeft: 4 }}>Asmenybės vardu pavadintų gatvių nuorodas;</li>
					<li style={{ paddingLeft: 4 }}>
						Asmenybės palaidojimo vietos nuorodą, jei asmenybė palaidota Vilniaus mieste ir palaidojimo vieta
						žinoma;
					</li>
					<li style={{ paddingLeft: 4 }}>Su asmenybe susiję Vilniaus miestu svarbūs istoriniai įvykiai;</li>
					<li style={{ paddingLeft: 4 }}>Su asmenybe susijusios kitos asmenybės.</li>
				</ol>
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Daugumos asmenybių aprašymai parengti pagrindiniu šaltiniu naudojant „Visuotinę lietuvių
				enciklopediją“, kurios straipsnius rengia Lietuvos mokslininkai, įvairių sričių specialistai bei
				moksliniai redaktoriai. „Visuotinė lietuvių enciklopedija“ pasiekiamame interneto adresu
				<Link href="www.vle.lt"> www.vle.lt</Link>, ją administruoja Mokslo ir enciklopedijų leidybos centras.
			</Typography>
		</>
	),
	persons_how: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Informacija rengiama
			</Typography>
		</>
	),

	foto_info: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Skiltyje pateikiamos senosios Vilniaus miesto fotografijos ir atvirutės – jų darymo vieta pažymėta
				žemėlapyje, fotografijų galima ieškoti pagal jų darymo datą, autorių ar žemėlapio aprėptį. Šiuo metu
				visos skiltyje pateikiamos 183 nuotraukos integruotos iš 2015–2016 m. LMA Vrublevskių bibliotekos
				vykdyto projekto „Užmirštasis Vilnius“. Didžioji integruotų fotografijų dalis padaryta dviejų garsių
				Vilniaus fotografų – Jano Bulhako ir Stanislovo Filiberto Flerio.
			</Typography>
		</>
	),
	foto_how: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Informacija rengiama
			</Typography>
		</>
	),

	plaques_info: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Skiltyje pateikiama informacija apie visas (tiek Vilniaus miesto, tiek privačiomis iniciatyvomis
				įrengtas) mieste esančias atminimo lentas, paminklus, skulptūras ir kitus meninius ar mažosios
				architektūros objektus, kuriuos projekto autoriams pavyko identifikuoti iš įvairių viešų šaltinių.
				Informacija pateikiama ir apie paskutiniu metu pašalintus objektus. Pačius objektus galima filtruoti
				pagal įrengimo laikotarpį (kai jis žinomas), pagal objekto tipą, ar atminties tipą (kam atminti
				objektas buvo įrengtas).
			</Typography>
		</>
	),
	plaques_how: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Informacija rengiama
			</Typography>
		</>
	),

	periods_info: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Ar kada norėjote panagrinėti, kaip skirtingais laikotarpiais kito Vilnius? Jei taip, turbūt bandėte tą
				daryti nagrinėdami senus istorinius žemėlapius, tačiau juos vartant pastebėti mieste vykusius pokyčius
				dažnai nėra taip paprasta. Skirtingi istoriniai žemėlapiai sudaryti skirtingais masteliais, juose
				vaizduojami objektai būna skirtingai generalizuoti (tie patys objektai pateikiami skirtingu detalumu).
				Negana to, kuo žemėlapis senesnis, tuo, dažniausiai, ir jo tikslumas prastesnis. Kitaip tariant, net
				ir perklojus vieną žemėlapį su kitu neretai sudėtinga nustatyti, ar dominantis ir abiejuose
				žemėlapiuose vaizduojamas tas pats objektas yra toks pats, ar jau pakitęs. Praktiškai visuomet seni
				žemėlapiai net ir vizualizuojami skirtingu dizainu!
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Tai koks galėtų būti sprendimas, kuris įgalintų net ir kartografijoje neįgudusius žmones paprastai
				nagrinėti pokyčius, kurie vyko Vilniuje? Manome, kad istorinių topografinių žemėlapių (arba tiesiog -
				topografijų) rekonstrukcijos, kurios ir yra pateikiamos “Miestas atskirais istoriniais periodais”
				skiltyje.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Kaip tai atlikta? Išskirtume kelis etapus:
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Pirmiausia – žemėlapiai atrinkti. Kodėl pasirinkti būtent šie žemėlapiai? Juos atrinko UAB „Vilniaus
				planas“ ekspertai, kaip detaliausius ir geriausius, kurie apie Vilnių yra sudaryti, o kartu jie
				reprezentuoja atskirus istorinius laikotarpius:
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }} component={"div"}>
				<ol>
					<li style={{ paddingLeft: 4 }}>
						1808 m. K. Grunerto planas realiai rodo iki carinio laikotarpio Vilnių;
					</li>
					<li style={{ paddingLeft: 4 }}>1845 m. planas – carinio laikotarpio vidurio;</li>
					<li style={{ paddingLeft: 4 }}>1911 m. – carinio laikotarpio pabaigos;</li>
					<li style={{ paddingLeft: 4 }}>1938 m. – tarpukario pabaigos;</li>
					<li style={{ paddingLeft: 4 }}>1977 m. – vėlyvojo sovietmečio miestą.</li>
				</ol>
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Visus atrinktus žemėlapius galima laikyti stambaus mastelio – juose vaizduojami objektai iki pastatų
				lygmens!
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Toliau atrinkti topografiniai žemėlapiai buvo įskaitmeninti – nuskenuoti, orientuoti šių laikų
				koordinačių sistemose, apkirpti (nes visais atvejais tokie detalūs žemėlapiai sudaryti iš daug lapų,
				kurių paraštės dengia viena kitą ir uždengia svarbius objektus), išvalyti, sutvarkytos spalvos ir
				ryškumas.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Galiausiai topografijos rekonstruotos. Kiekvieną topografiniame žemėlapyje vaizduojamą objektą
				kartografijos ekspertas lygino su tiksliais skaitmeniniais šių laikų duomenimis ir vertino – tai toks
				pats objektas, ar kitoks. Jei tas pats kaip dabar, objekto (pavyzdžiui statinio) kontūras buvo
				perkeliamas iš šių laikų skaitmeninių duomenų. Jei įvertinta, kad žemėlapyje vaizduojamas kitoks
				objektas – jo kontūras tiksliai atkartotas, įvedant jį į šių laikų duomenų bazę. Taip buvo
				rekonstruoti visi pasirinkti žemėlapiai, atkuriant juos nuo naujausių iki seniausių, vis vertinant
				atskirus geografinius objektus ir juos perkeliant iš prieš tai buvusio periodo arba įbraižant naujai.
				Dėl aprašytų priežasčių rekonstrukcijas lyginant su originaliais topografiniais žemėlapiais
				pastebėsite prasilenkimų – rekonstrukcijų objektai turi tiksliai atitikti tikslius šių laikų
				skaitmeninius duomenis, o tai leidžia laikotarpius lyginti tarpusavyje. Ir žinoma, lyginimą dar
				supaprastina tai, kad visos rekonstrukcijos vizualizuotos vienu dizainu.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				<b>Duomenų tikslumas ir kokybė.</b> Kadangi, kaip aprašyta anksčiau, istorinių topografijų
				rekonstrukcija visuomet kažkiek yra kartografijos eksperto interpretacija, į pateikiamus duomenis
				siūlome žiūrėti kritiškai. Šios rekonstrukcijos - pagalba naudotojui lengviau lyginti skirtinguose
				istoriniuose žemėlapiuose pateikiamus duomenis, tačiau juose gali pasitaikyti klaidų ar neatitikimų.
				Net ir originaliuose naudotuose istoriniuose topografiniuose žemėlapiuose jų galėjo pasitaikyti – jei
				autorius pavaizdavo žemėlapyje objektą, tai dar nereiškia, kad jis tikrai buvo toks ar buvo iš vis.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Kadangi rekonstrukcija yra gana sudėtingas ir lėtas darbas, kol kas rekonstruota tik centrinė,
				pasirinktiems žemėlapiams bendra, Vilniaus miesto dalis.
			</Typography>
		</>
	),
	periods_how: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Informacija rengiama
			</Typography>
		</>
	),

	events_info: (
		<>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Skiltyje pateikiama informacija apie svarbiausius Vilniaus miestui istorinius įvykius, kurie kaip
				„Vilniaus miesto kalendorius“ istorikų buvo įtraukti į Vilniaus atminties kultūros programą. Įvykiai
				sugrupuoti pagal Vilniaus istorijos periodus, susieti su susijusiomis asmenybėmis, nuotraukomis,
				atminimo ženklais ir žemėlapiais.
			</Typography>
		</>
	),
	events_how: (
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
	["Istoriniai planai ir žemėlapiai", "maps_info", "maps_how"],
	["Miesto gatvės", "streets_info", "streets_how"],
	["Mieste įamžintos asmenybės", "persons_info", "persons_how"],
	["Senosios fotografijos ir atvirutės", "foto_info", "foto_how"],
	["Skulptūros ir atminimo lentos", "plaques_info", "plaques_how"],
	["Miestas atskirais istoriniais periodais", "periods_info", "periods_how"],
	["Istoriniai įvykiai", "events_info", "events_how"],
]
