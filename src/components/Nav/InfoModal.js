import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import IconButton from "@mui/material/IconButton"
import Grid from "@mui/material/Grid"

const InfoModal = () => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	useEffect(() => {
		if (window.location.pathname === "/vilniausdnr/lt") {
			setOpen(true)
		}
	}, [])

	return (
		<div>
			<IconButton
				size="small"
				sx={{
					width: 43.28,
					backgroundColor: "#D42323",
					mr: 1,
					"&:hover": {
						transition: "0.3s",
						backgroundColor: "#941818",
					},
				}}
				onClick={handleOpen}
			>
				<Typography variant="h4" sx={{ color: "white", ml: 0.3, mt: 0.3,fontSize: 25 }}>
					<b>i</b>
				</Typography>
			</IconButton>

			<Modal
				sx={{ zIndex: 10 }}
				disableEnforceFocus
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "60%",
						height: "90%",
						bgcolor: "rgb(18, 18, 18)",
						border: "2px solid #000",
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography sx={{ color: "white" }} id="modal-modal-title" variant="h6" component="h2">
						Esate tęstinėje „Vilniaus DNR“ svetainės versijoje.
					</Typography>
					<Typography sx={{ color: "white", mt: 2, mb: 2 }} id="modal-modal-description">
						Svetainė <b>šiuo metu yra kuriama</b>, todėl:
						<ul>
							<li sx={{ mt: 1 }}>ne visos jos skiltys ir funkcionalumas veikia;</li>
							<li>
								gali pasitaikyti netikslumų laukų pavadinimuose, gali būti rodomi sisteminiai laukai ar laukai
								kitomis kalbomis, kurie dar bus panaudoti svetainę verčiant į kitas kalbas;
							</li>
							<li>svetainės dizainas dar bus keičiamas;</li>
							<li>
								bus kuriami ir svetainės skilčių interaktyvūs turai naudotojui (Guided Tour), kiekvienoje
								skiltyje paaiškinantys, kaip naudotis funkcionalumu.
							</li>
						</ul>
						Kadangi turai dar nesukurti, siūlome naudotis šiuo trumpu vaizdo įrašu, kuris laikinai padės
						naudotis šios tęstinės svetainės pagrindiniu funkcionalumu:
					</Typography>
					<iframe
						width="100%"
						height={window.innerHeight - (window.innerHeight / 10) * 5}
						src="https://www.youtube.com/embed/Sb59WddVs4I"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen="allowFullScreen"
					></iframe>
					<Typography sx={{ color: "white", mt: 2 }} id="modal-modal-description">
						Kilus klausimams, pastebėjus klaidų ar turint pasiūlymų rašykite el. paštu{" "}
						<b>donatas.gudelis@vplanas.lt</b>
					</Typography>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Button
							sx={{
								mt: 2,
								width: 200,
							}}
							color="secondary"
							variant="contained"
							onClick={handleClose}
						>
							Supratau, naršyti
						</Button>
					</Grid>
				</Box>
			</Modal>
		</div>
	)
}

export default InfoModal
