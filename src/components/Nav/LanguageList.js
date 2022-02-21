import React from "react"
import { useTranslation } from "react-i18next"

import ClickAwayListener from "@mui/material/ClickAwayListener"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import Collapse from "@mui/material/Collapse"

const LanguageList = (props) => {
	const { t, i18n } = useTranslation()

	const handleLanguageChange = (lan) => {
		i18n.changeLanguage(lan)
		props.setLanguageOpen(false)
	}

	const handleClickAway = () => {
		props.setLanguageOpen(false)
	}

	return (
		<ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
			<Collapse sx={{ position: "absolute", zIndex: 50, right: 0 }} in={props.languageOpen}>
				<Paper square>
					<List sx={{ p: 0 }}>
						<ListItem
							disablePadding
							selected={i18n.language === "lt"}
							onClick={() => handleLanguageChange("lt")}
						>
							<ListItemButton>
								<Typography sx={{ color: "#D42323" }} variant="h5">
									Lietuvių
								</Typography>
							</ListItemButton>
						</ListItem>
						<ListItem
							disablePadding
							selected={i18n.language === "en"}
							onClick={() => handleLanguageChange("en")}
						>
							<ListItemButton>
								<Typography sx={{ color: "#D42323" }} variant="h5">
									English
								</Typography>
							</ListItemButton>
						</ListItem>
					</List>
				</Paper>
			</Collapse>
		</ClickAwayListener>
	)
}

export default LanguageList
