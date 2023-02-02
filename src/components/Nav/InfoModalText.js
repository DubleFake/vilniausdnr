import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

import Y700 from "../../utils/icons/aboutIcons/700.svg"
import LMAVB from "../../utils/icons/aboutIcons/LMAVB.png"
import MELC_DNR from "../../utils/icons/aboutIcons/MELC_DNR.png"
import Vilnius_vp from "../../utils/icons/aboutIcons/vilnius_vp.svg"
import box from "../../utils/icons/aboutIcons/box.svg"
import map from "../../utils/icons/aboutIcons/map.svg"
import pin from "../../utils/icons/aboutIcons/pin.svg"

// <img
// 	src={VilniausSkyline}
// 	style={{
// 		position: "absolute",
// 		bottom: isDownMd ? -198 : -198,
// 		width: isDownMd ? 1000 : "100%",
// 		zIndex: -1,
// 		pointerEvents: "none",
// 		marginRight: "5px",
// 	}}
// />

export const textDict = {
	about: (
		<Box sx={{ mr: 4 }}>
			<Box sx={{ mx: "2%" }}>
				<Grid
					sx={{ display: "flex", alignItems: "stretch" }}
					container
					direction="row"
					justifyContent="space-between"
					alignItems="flex-start"
				>
					<Box
						sx={{ backgroundColor: "#D72E31", width: "40%", minHeight: "60vh", mt: "6%", p: 4 }}
						className="aboutBox"
					>
						<Typography
							sx={{ color: "white", fontSize: "24px", fontWeight: 600, mt: 2, textAlign: "center" }}
						>
							Vilniaus DNR projektas
						</Typography>
						<Typography
							sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 2, textAlign: "center" }}
						>
							„Vilniaus DNR“ portalas – tai virtualūs interneto vartai į Vilniaus istoriją. Čia rasite
							istorinius miesto žemėlapius, kuriuose užkoduota Vilniaus praeitis bei įrankius, kurie padės šį
							painų kodą įveikti. Skirtingose portalo skiltyse pateikta informacija padės geriau pažinti
							Vilnių – rasite istorinių topografijų rekonstrukcijas, istorines nuotraukas, dabartines ir
							istorines gatves, mieste įamžintas asmenybes, jų įamžinimo ženklus bei svarbiausius istorinius
							įvykius. Visa ši informacija ryšiais susieta tarpusavyje, taip sudarant daugialypį, bet vientisą
							ir unikalų Vilniaus kodą. „Vilniaus DNR“ kodą.
						</Typography>
						<Typography
							sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1, textAlign: "center" }}
						>
							Simboliška, kad „Vilniaus DNR“ portalas visuomenei atveriamas Vilniui švenčiant 700-ajį
							gimtadienį. Tai dovana Vilniaus miestui, vilniečiams, miesto svečiams bei visiems smalsuoliams,
							kurie domisi Vilniumi bei marga jo istorija.
						</Typography>

						<Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
							<Box
								sx={{
									width: "40%",
									mt: 3,
								}}
								component="img"
								src={Y700}
							/>
						</Grid>
					</Box>

					<Box
						sx={{ backgroundColor: "#EBEBEB", width: "40%", minHeight: "60vh", mt: "6%", p: 4 }}
						className="aboutBox"
					>
						<Typography
							sx={{ color: "black", fontSize: "24px", fontWeight: 600, mt: 2, textAlign: "center" }}
						>
							Kūrėjai
						</Typography>
						<Typography
							sx={{ color: "black", fontSize: "14px", fontWeight: 400, mt: 1, textAlign: "center" }}
						>
							Projektą kuria Vilniaus miesto savivaldybė ir UAB „Vilniaus planas“.{" "}
						</Typography>
						<Grid container direction="row" justifyContent="center" alignItems="flex-end">
							<Box
								sx={{
									width: "50%",
									mt: 3,
									cursor: "pointer",
								}}
								component="img"
								src={Vilnius_vp}
								onClick={() => {
									window.open("https://www.vilniausplanas.lt/", "_blank")
								}}
							/>
						</Grid>
						<Typography
							sx={{ color: "black", fontSize: "24px", fontWeight: 600, mt: 4, textAlign: "center" }}
						>
							Partneriai
						</Typography>
						<Typography
							sx={{ color: "black", fontSize: "14px", fontWeight: 400, mt: 1, textAlign: "center" }}
						>
							Kuriant projektą savo medžiaga prisidėjo Mokslo ir enciklopedijų leidybos centras bei Lietuvos
							mokslų akademijos Vrublevskių biblioteka.
						</Typography>
						<Grid container direction="row" justifyContent="center" alignItems="flex-end">
							<Box
								sx={{
									width: "50%",
									mt: 3,
									cursor: "pointer",
								}}
								component="img"
								src={LMAVB}
								onClick={() => {
									window.open("http://www.mab.lt/", "_blank")
								}}
							/>
							<Box
								sx={{
									width: "50%",
									mt: 3,
									cursor: "pointer",
								}}
								component="img"
								src={MELC_DNR}
								onClick={() => {
									window.open("https://www.melc.lt/lt/", "_blank")
								}}
							/>
						</Grid>
					</Box>
				</Grid>
			</Box>
		</Box>
	),

	maps_info: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Ar kada ieškojote senų Vilniaus miesto žemėlapių? Daugiau neieškokite, nes „Vilniaus DNR“ portalo
				skiltyje „Istoriniai planai ir žemėlapiai“ rasite iš įvairių šaltinių integruotus istorinius Vilniaus
				miesto planus ir žemėlapius. Visi jie yra įskaitmeninti ir orientuoti šių laikų koordinačių sistemoje
				– istorinius žemėlapius galima lyginti su šių laikų. Šiuo metu esami žemėlapiai suskirstyti į keturias
				grupes:
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
						rekonstrukcijas daugiau informacijos pateikiama <b>“Miestas atskirais istoriniais periodais”</b>{" "}
						skiltyje.
					</li>
					<li>
						Ortofotografiniai žemėlapiai – tai žemėlapiai, kuriuos sudaro iš orlaivių padarytų žemės
						paviršiaus (aerofotografinių) nuotraukų.
					</li>
					<li>
						LMA Vrublevskių bibliotekos žemėlapiai – tai 2015-2016 m. Lietuvos mokslų akademijos Vrublevskių
						bibliotekos projekto „Užmirštasis Vilnius“ metu skaitmenizuoti 49 žemėlapiai. Šie žemėlapiai
						sudaryti XIX–XX a., jų mastelis varijuoja tarp 1:8 000 ir 1:40 000, žemėlapių pavadinimai
						pateikiami originalia forma.
					</li>
				</ul>
			</Typography>
		</Box>
	),
	maps_how: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }} component={"div"}>
				<ol>
					<li style={{ paddingLeft: 4 }}>
						Istorinis planas arba žemėlapis atveriamas spaudžiant mygtuką ekrano apačioje, pasirenkant norimą
						grupę ir žemėlapį.
					</li>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Box
							sx={{ my: 2, mr: 2, width: "60%", height: "100%", resizeMode: "contain" }}
							component="img"
							src="https://i.ibb.co/hFtkgz3/25-01-2023-19-43-51-REC-Adobe-Express.gif"
              className="helpGif"
						/>
					</Grid>
					<li style={{ paddingLeft: 4 }}>
						Istorinio plano ar žemėlapio permatomumas keičiamas slankiojant valdiklį ekrano viršuje, kairėje
						pusėje.
					</li>
					<li style={{ paddingLeft: 4 }}>
						Istorinių planų ar žemėlapių peržiūros režimas keičiamas spaudžiant mygtuką ekrano viršuje,
						kairėje pusėje. Galimi trys režimai:
					</li>
					<ul style={{ listStyleType: "disc" }}>
						<li>Peržiūros režimas: vaizduojamas vienas pasirinktas žemėlapis.</li>
						<li>
							Slenkančios juostos režimas: ekranas padalinamas į dvi dalis, vaizduojami du skirtingi
							pasirinkti žemėlapiai. Jie lyginami slankiojant juostą.
						</li>
						<li>
							Dviejų langų režimas: ekranas padalinamas į dvi dalis, vaizduojami du skirtingi pasirinkti
							žemėlapiai, suvienodinamas jų priartinimas ir aprėptis. Žemėlapiai lyginami valdant vieną iš jų.
						</li>
					</ul>
				</ol>
				<Grid container direction="row" justifyContent="center" alignItems="center">
					<Box
						sx={{ my: 2, mr: 2 }}
						component="img"
						src="https://i.ibb.co/7rpDBBz/25-01-2023-19-53-24-REC-Adobe-Express.gif"
					/>
				</Grid>
			</Typography>
		</Box>
	),

	streets_info: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Turbūt daugelis vilniečių yra atkreipę dėmesį, kad Žvėryne yra daug gatvių, kurios pavadintos žvėrių
				pavadinimais. Bet ar žinote, kad tokių vienodos kilmės pavadinimų gatvių santalkų Vilniaus mieste yra
				ir daugiau? Pavyzdžiui, Balsiuose yra gatvių santalka pavadinta baltų dievybių, o Pavilnyje – tautų
				vardais. Kviečiame susipažinti su Vilniaus gatvėmis ir jų kilme.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Portalo miesto gatvių skiltį sudaro dvi dalys – dabartis ir praeitis.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				<b>Dabarties skiltyje</b> pateikiama informacija apie visas miesto gatves. Jos suklasifikuotos pagal
				pavadinimų reikšmes, pagal kurias galite filtruoti gatves. Pavyzdžiui, galite sužinoti, kiek Vilniaus
				mieste gatvių pavadintų rašytojų vardais. Taip pat pateikiama informacija apie kiekvienos gatvės ar
				jos dalies pavadinimus, kurie randami istoriniuose žemėlapiuose (originalia forma).
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				<b>Praeities skiltyje</b> pateikiama informacija apie centrinės Vilniaus miesto dalies gatvių istoriją
				- 5 istorinių periodų pavadinimus ir ašines linijas, kurias galima lyginti tarpusavyje. Taip pat
				pateikiamos nuorodos į originalius žemėlapius, kuriuos naudojant istoriniai gatvių pavadinimai ir
				ašinės linijos buvo įskaitmenintos.
			</Typography>
		</Box>
	),
	streets_how: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }} component={"div"}>
				<ol>
					<li style={{ paddingLeft: 4 }}>
						Gatvės informacija pateikiama paspaudus ant jos linijos žemėlapyje arba pasirenkant gatvę iš
						sąrašo paieškos skiltyje. Atsivėrusiame informacijos lange, susijusi istorinė medžiaga pasiekiama
						spaudžiant interaktyvų tekstą.
					</li>
					<li style={{ paddingLeft: 4 }}>
						Gatvių paieškos ir filtravimo funkcijos pateikiamos paieškos skiltyje, kairėje ekrano pusėje.
					</li>
					<ul style={{ listStyleType: "disc" }}>
						<li>Paieška atliekama įrašant gatvės pavadinimą į paieškos eilutę.</li>
						<li>
							Gatvių sąrašas filtruojamas pasirenkant objekto klasę ir poklasį. Norint pašalinti filtrus,
							spausti mygtuką išvalyti filtrus.
						</li>
					</ul>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Box
							sx={{ my: 2, mr: 2 }}
							component="img"
							src="https://i.ibb.co/hX0Cr4y/25-01-2023-20-01-22-REC-Adobe-Express.gif"
						/>
					</Grid>
					<li style={{ paddingLeft: 4 }}>
						Istorinių gatvių tinklo informacija skirtingais periodais pasiekiama spaudžiant mygtuką praeitis,
						ekrano viršuje.
					</li>
					<li style={{ paddingLeft: 4 }}>
						Gatvių tinklo metai pasirenkami spaudžiant mygtukus ekrano apačioje.
					</li>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Box
							sx={{ my: 2, mr: 2, width: "60%", height: "100%", resizeMode: "contain" }}
							component="img"
							src="https://i.ibb.co/tYYZQ1X/25-01-2023-21-06-44-REC-Adobe-Express.gif"
              className="helpGif"
						/>
					</Grid>
					<li style={{ paddingLeft: 4 }}>
						Gatvės informacija pateikiama paspaudus ant jos linijos žemėlapyje. Atsivėrusiame informacijos
						lange, susijusi istorinė medžiaga pasiekiama spaudžiant interaktyvų tekstą.
					</li>
				</ol>
			</Typography>
		</Box>
	),

	persons_info: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Skiltyje pateikiama informacija apie asmenybes, kurioms Vilniaus mieste įrengtos atminimo lentos,
				skulptūros, paminklai ar jų vardais pavadintos gatvės. Informacija apima:
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }} component={"div"}>
				<ol>
					<li style={{ paddingLeft: 4 }}>
						Išskirtus pagrindinius asmenybės biografijos faktus. Faktai susiję su Vilniumi išskirti raudona
						spalva.
					</li>
					<li style={{ paddingLeft: 4 }}>Ryšio su Vilniumi aprašymą;</li>
					<li style={{ paddingLeft: 4 }}>Asmenybei Vilniuje įrengtų skulptūrų ir paminklų nuorodas;</li>
					<li style={{ paddingLeft: 4 }}>Asmenybei Vilniuje įrengtų atminimo lentų nuorodas;</li>
					<li style={{ paddingLeft: 4 }}>Asmenybės vardu pavadintų gatvių nuorodas;</li>
					<li style={{ paddingLeft: 4 }}>
						Asmenybės palaidojimo vietos nuorodą, jei asmenybė palaidota Vilniaus mieste ir palaidojimo vieta
						yra žinoma;
					</li>
					<li style={{ paddingLeft: 4 }}>
						Su asmenybe susijusius Vilniaus miestui svarbius istorinius įvykius;
					</li>
					<li style={{ paddingLeft: 4 }}>Su asmenybe susijusias kitas asmenybes.</li>
				</ol>
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Daugumos asmenybių aprašymai parengti remiantis pagrindiniu moksliniu šaltiniu „Visuotinė lietuvių
				enciklopedija“, kurios straipsnius rengia Lietuvos mokslininkai, įvairių sričių specialistai bei
				moksliniai redaktoriai. „Visuotinė lietuvių enciklopedija“ pasiekiama interneto adresu{" "}
				<Link href="https://www.vle.lt" target="_blank">
					www.vle.lt
				</Link>
				, ją administruoja Mokslo ir enciklopedijų leidybos centras.
			</Typography>
		</Box>
	),
	persons_how: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				<ol>
					<li style={{ paddingLeft: 4 }}>
						Mieste įamžintos asmenybės informacija pateikiama pasirinkus asmenybę iš sąrašo kairėje ekrano
						pusėje, paieškos skiltyje.
						<ul style={{ listStyleType: "disc" }}>
							<li>Paieška atliekama įrašant asmenybės vardą/pavardę į paieškos eilutę.</li>
							<li>
								Asmenybių sąrašas filtruojamas pasirenkant asmens profesiją ir veiklą. Norint pašalinti
								filtrus, spausti mygtuką išvalyti filtrus.
							</li>
						</ul>
					</li>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Box
							sx={{ my: 2, mr: 2 }}
							component="img"
							src="https://i.ibb.co/qpTyx9g/25-01-2023-20-08-56-REC-Adobe-Express.gif"
						/>
					</Grid>
					<li style={{ paddingLeft: 4 }}>
						Asmenybės aprašymo skiltyje susijusi istorinė medžiaga pasiekiama spaudžiant interaktyvų tekstą.
					</li>
				</ol>
			</Typography>
		</Box>
	),

	foto_info: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Skiltyje pateikiamos senosios Vilniaus miesto fotografijos ir atvirutės – jų darymo vieta pažymėta
				žemėlapyje, fotografijų galima ieškoti pagal jų darymo datą, autorių ar žemėlapio aprėptį. Šiuo metu
				visos skiltyje pateikiamos 183 nuotraukos integruotos iš 2015–2016 m. LMA Vrublevskių bibliotekos
				vykdyto projekto „Užmirštasis Vilnius“. Didžioji integruotų fotografijų dalis padaryta dviejų garsių
				Vilniaus fotografų – Jano Bulhako ir Stanislovo Filiberto Flerio.
			</Typography>
		</Box>
	),
	foto_how: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				<ol>
					<li style={{ paddingLeft: 4 }}>
						Fotografija ir jos informacija pateikiama paspaudus ant simbolio žemėlapyje arba pasirenkant
						fotografiją iš sąrašo kairėje ekrano pusėje, paieškos skiltyje. Atsivėrusiame informacijos lange,
						susijusi istorinė medžiaga pasiekiama spaudžiant interaktyvų tekstą.
					</li>
					<li style={{ paddingLeft: 4 }}>
						Fotografijų ir atviručių paieškos bei filtravimo funkcijos pateikiamos paieškos skiltyje, kairėje
						ekrano pusėje:
					</li>
					<ul style={{ listStyleType: "disc" }}>
						<li>Paieška atliekama įrašant fotografijos pavadinimą į paieškos eilutę.</li>
						<li>
							Fotografijų sąrašas filtruojamas pasirenkant fotografijos autorių arba įamžinimo metus. Metai
							nustatomi slenkant metų juostą, pasirenkama laikotarpio pradžios ir pabaigos data . Norint
							pašalinti filtrus, spausti mygtuką išvalyti filtrus.
						</li>
						<li>
							Fotografijų sąrašas filtruojamas pagal žemėlapio aprėptyje matomus objektus paspaudus mygtuką
							Sąraše rodyti tik žemėlapio aprėptyje matomus objektus.
						</li>
					</ul>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Box
							sx={{ my: 2, mr: 2 }}
							component="img"
							src="https://i.ibb.co/1MJLF3t/25-01-2023-20-22-41-REC-Adobe-Express.gif"
						/>
					</Grid>
				</ol>
			</Typography>
		</Box>
	),

	plaques_info: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Skiltyje pateikiama informacija apie visas (tiek Vilniaus miesto, tiek privačiomis iniciatyvomis
				įrengtas) mieste esančias atminimo lentas, paminklus, skulptūras ir kitus meninius ar mažosios
				architektūros objektus, kuriuos projekto autoriams pavyko identifikuoti iš įvairių viešų šaltinių.
				Informacija pateikiama ir apie paskutiniu metu pašalintus objektus. Pačius objektus galima filtruoti
				pagal įrengimo laikotarpį (kai jis žinomas), pagal objekto tipą, ar atminties tipą (kam atminti
				objektas buvo įrengtas).
			</Typography>
		</Box>
	),
	plaques_how: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				<ol>
					<li style={{ paddingLeft: 4 }}>
						Skulptūros ar atminimo lentos informacija pateikiama paspaudus simboliį žemėlapyje arba
						pasirenkant objektą iš sąrašo kairėje ekrano pusėje, paieškos skiltyje. Atsivėrusiame informacijos
						lange, susijusi istorinė medžiaga pasiekiama spaudžiant interaktyvų tekstą.
					</li>
					<li style={{ paddingLeft: 4 }}>
						Skulptūrų ir atminimo lentų paieškos ir filtravimo funkcijos pateikiamos paieškos skiltyje,
						kairėje ekrano pusėje:
					</li>
					<ul style={{ listStyleType: "disc" }}>
						<li>Paieška atliekama įrašant skulptūros ar atminimo lentos pavadinimą į paieškos eilutę.</li>
						<li>
							Skulptūrų ir atminimo lentų sąrašas filtruojamas pasirenkant objekto tipą, atminimo tipą arba
							įrengimo laikotarpį. Norint pašalinti filtrus, reikia spausti mygtuką išvalyti filtrus.
						</li>
						<li>
							Skulptūrų ir atminimo lentų sąrašas filtruojamas pagal žemėlapio aprėptyje matomus objektus
							paspaudus mygtuką “Sąraše rodyti tik žemėlapio aprėptyje matomus objektus”.
						</li>
					</ul>
					<li>
						Skulptūrų ir atminimo lentų vaizdavimo sutartiniai ženklai keičiami vaizdavimo skiltyje, kairėje
						ekrano pusėje. Pasirenkamas vaizdavimas pagal objekto arba atminimo tipą.
					</li>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Box
							sx={{ my: 2, mr: 2 }}
							component="img"
							src="https://i.ibb.co/8cskrkx/25-01-2023-20-34-42-REC-Adobe-Express.gif"
						/>
					</Grid>
				</ol>
			</Typography>
		</Box>
	),

	periods_info: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Ar kada norėjote panagrinėti, kaip skirtingais laikotarpiais kito Vilnius? Jei taip, turbūt bandėte tą
				daryti nagrinėdami senus istorinius žemėlapius, tačiau juos vartant pastebėti mieste vykusius pokyčius
				dažnai nėra taip paprasta. Skirtingi istoriniai žemėlapiai sudaryti skirtingais masteliais, juose
				vaizduojami objektai būna skirtingai apibendrinti(tie patys objektai pateikiami skirtingu detalumu).
				Negana to, kuo žemėlapis senesnis, tuo jo tikslumas būna prastesnis. Kitaip tariant, net ir perklojus
				vieną žemėlapį su kitu neretai sudėtinga nustatyti, ar dominantis ir abiejuose žemėlapiuose
				vaizduojamas tas pats objektas yra toks pats, ar jau pakitęs. Praktiškai visuomet seni žemėlapiai net
				ir vizualizuojami skirtingu dizainu!
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Tai koks galėtų būti sprendimas, kuris įgalintų net ir kartografijoje neįgudusius žmones paprastai
				nagrinėti pokyčius, kurie vyko Vilniuje? Tai atlikti leidžia istorinių topografinių žemėlapių (arba
				tiesiog - topografijų) rekonstrukcijos, kurios ir yra pateikiamos “Miestas atskirais istoriniais
				periodais” skiltyje.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Kaip tai atlikta? Išskirtume kelis etapus:
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				UAB "Vilniaus planas" ekspertai istorinius žemėlapius atrinko vadovaudamiesi keliais svarbiais
				kriterijais: detalumas ir skirting Vilniaus istorinių laikotarpių reprezentacija:
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
				Visi išvardinti topografiniai žemėlapiai buvo įskaitmeninti – nuskenuoti, orientuoti šių laikų
				koordinačių sistemose, apkirpti ( tokie detalūs žemėlapiai būna sudaryti iš daug lapų, jųparaštės
				dengia viena kitą ir uždengia svarbius objektus), išvalyti, sutvarkytos spalvos ir ryškumas.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Paskutiniame žemėlapių tvarkymo etape topografijos buvo rekonstruotos. Kiekvieną sename topografiniame
				žemėlapyje vaizduojamą objektą kartografijos ekspertas lygino su tiksliais skaitmeniniais šių laikų
				duomenimis ir vertino – istoriniame žemėlapyje vaizduojamas toks pats objektas kaip yra dabar, ar
				pakitęs. Jei toks pats kaip dabar – į rekonstrukciją objekto (pavyzdžiui statinio) kontūras buvo
				perkeliamas iš šių laikų skaitmeninių duomenų. Jei įvertinta, kad istoriniame žemėlapyje vaizduojamas
				kitoks objektas – jo kontūras iš žemėlapio tiksliai atkartotas, įtraukiant jį rekonstrukciją. Taip
				buvo rekonstruoti visi pasirinkti žemėlapiai, atkuriant juos nuo naujausių iki seniausių, vis
				vertinant atskirus geografinius objektus ir juos perkeliant iš prieš tai buvusio laikotarpio arba
				įbraižant naujai iš istorinio žemėlapio.
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				<b>Duomenų tikslumas ir kokybė.</b> Šios rekonstrukcijos – pagalba naudotojui lengviau lyginti
				skirtinguose istoriniuose žemėlapiuose pateikiamus duomenis, tačiau juose gali pasitaikyti netikslumų
				dėl anksčiau aprašyto rekonstrukcijos proceso. Į pateikiamus duomenis siūlome žiūrėti kritiškai, nes
				netikslumų pasitaiko net ir originaliuose naudotuose istoriniuose topografiniuose žemėlapiuose – jei
				autorius pavaizdavo žemėlapyje objektą, tai dar nereiškia, kad jis tikrai buvo toks (tai ypač aktualu
				XIX a. žemėlapiams).
			</Typography>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Kol kas rekonstruota tik centrinė, atrinktiems žemėlapiams bendra, Vilniaus miesto dalis.
			</Typography>
		</Box>
	),
	periods_how: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				<ol>
					<li style={{ paddingLeft: 4 }}>
						Istorinis periodas pasirenkamas spaudžiant mygtukus laiko juostoje, ekrano apačioje
					</li>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Box
							sx={{ my: 2, mr: 2, width: "60%", height: "100%", resizeMode: "contain" }}
							component="img"
							src="https://i.ibb.co/pWh75Hk/25-01-2023-20-41-12-REC-Adobe-Express.gif"
              className="helpGif"
						/>
					</Grid>
					<li style={{ paddingLeft: 4 }}>
						Žemėlapio informacija pateikiama viršuje, dešinėje ekrano pusėje. Susijusi istorinė medžiaga
						pasiekiama spaudžiant interaktyvų tekstą.
					</li>
					<li style={{ paddingLeft: 4 }}>
						Žemėlapių peržiūros režimas keičiamas spaudžiant mygtuką ekrano viršuje, kairėje pusėje. Galimi
						trys režimai:
					</li>
					<ul style={{ listStyleType: "disc" }}>
						<li>Laiko juostos režimas: vaizduojamas vienas, laiko juostoje pasirinktas žemėlapis.</li>
						<li>
							Slenkančios juostos režimas: ekranas sudalinamas į dvi dalis, vaizduojami du skirtingi
							pasirinkti žemėlapiai. Jie lyginami slankiojant juostą.
						</li>
						<li>
							Dviejų langų režimas: ekranas sudalinamas į dvi dalis, vaizduojami du skirtingi pasirinkti
							žemėlapiai, suvienodinamas jų priartinimas ir aprėptis. Žemėlapiai lyginami valdant vieną iš jų.
						</li>
					</ul>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Box
							sx={{ my: 2, mr: 2 }}
							component="img"
							src="https://i.ibb.co/rftYtYd/25-01-2023-20-46-55-REC-Adobe-Express.gif"
						/>
					</Grid>
				</ol>
			</Typography>
		</Box>
	),

	events_info: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				Skiltyje pateikiama informacija apie svarbiausius Vilniaus miestui istorinius įvykius, kuriuos į
				Vilniaus atminties kultūros programoje sukurtą „Vilniaus miesto kalendorių“ įtraukė istorikai. Įvykiai
				sugrupuoti pagal Vilniaus istorijos periodus, susieti su susijusiomis asmenybėmis, nuotraukomis,
				atminimo ženklais ir žemėlapiais.
			</Typography>
		</Box>
	),
	events_how: (
		<Box>
			<Typography sx={{ color: "white", fontSize: "14px", fontWeight: 400, mt: 1 }}>
				<ol>
					<li style={{ paddingLeft: 4 }}>
						Istorinių įvykių juosta valdoma slenkant naršyklės langą aukštyn arba žemyn.
					</li>
					<li style={{ paddingLeft: 4 }}>
						Istorinio įvykio papildoma informacija matoma spaudžiant tekstą Plačiau..., žemiau įvykio
						nuotraukos bei pavadinimo. Susijusi istorinė medžiaga pasiekiama spaudžiant interaktyvų tekstą.
					</li>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Box
							sx={{ my: 2, mr: 2, width: "30%", height: "100%", resizeMode: "contain" }}
							component="img"
							src="https://i.ibb.co/jZfR5Kv/25-01-2023-20-59-25-REC-Adobe-Express.gif"
              className="helpGifTall"
						/>
					</Grid>
					<li style={{ paddingLeft: 4 }}>
						Istoriniai įvykiai gali būti filtruojami ir pasirenkami pagal istorinius laikotarpius, spaudžiant
						istorinių įvykių juostą kairėje ekrano pusėje.
					</li>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Box
							sx={{ my: 2, mr: 2, width: "30%", height: "100%", resizeMode: "contain" }}
							component="img"
							src="https://i.ibb.co/zH7nTpc/25-01-2023-20-54-44-REC-Adobe-Express.gif"
              className="helpGifTall"
						/>
					</Grid>
				</ol>
			</Typography>
		</Box>
	),

	contacts: (
		<Box sx={{ mt: 8, position: "relative" }}>
			<Grid container direction="column" justifyContent="center" alignItems="center">
				<Box
					sx={{
						width: 280,
					}}
					component="img"
					src={box}
				/>
				<Typography sx={{ maxWidth: 280, px: 2, position: "relative", mt: -13, textAlign: "center" }}>
					Turite klausimų ar pasiūlymų? Susisiekime!
				</Typography>
				<Box
					sx={{
						width: 300,
						mt: -2,
					}}
					component="img"
					src={map}
				/>
				<Box
					sx={{
						width: 30,
						mt: -24,
					}}
					component="img"
					src={pin}
				/>
				<Button
					sx={{
						borderRadius: 10,
						backgroundColor: "#D72E30",
						color: "white",
						textTransform: "none",
						mt: 20,
						fontWeight: 400,
						width: 150,
						fontSize: "14px",
						"&:hover": {
							transition: "0.3s",
							backgroundColor: "#941818",
						},
					}}
					variant="contained"
					onClick={() => window.open("mailto:info@vplanas.lt?subject=Vilniaus DNR paklausimas", "_self")}
				>
					Susisiekti
				</Button>
			</Grid>
		</Box>
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
