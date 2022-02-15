import * as React from "react"
import PropTypes from "prop-types"
import Box from "@mui/material/Box"
import useMediaQuery from '@mui/material/useMediaQuery';

const Item = (props) => {
	const { sx, ...other } = props
	return (
		<Box
			sx={{
				bgcolor: (theme) => (theme.palette.mode === "dark" ? "#FFFFFF" : "#000009"),
				color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
				border: "1px solid",
				borderColor: (theme) => (theme.palette.mode === "dark" ? "grey.800" : "grey.300"),
				p: 1,
				borderRadius: 2,
				textAlign: "center",
				fontSize: "0.875rem",
				fontWeight: "700",
				...sx,
			}}
			{...other}
		/>
	)
}

Item.propTypes = {
	sx: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
		PropTypes.func,
		PropTypes.object,
	]),
}

const App = () => {
  const matches = useMediaQuery('(min-width:1000px)');
	return (
		<div style={{ width: "100%" }}>
			<Box
				sx={{
					display: "grid",
					gridAutoFlow: "row",
					gridTemplateColumns: matches ? "repeat(5, 1fr)" : "repeat(3, 1fr)" ,
					gridTemplateRows: "repeat(3, 200px)",
					gap: 1,
				}}
			>
				<Item sx={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>1</Item>
				<Item>2</Item>
				<Item>3</Item>
				<Item>4</Item>
				<Item sx={{ gridColumn: matches ? "5" : "3", gridRow: "1 / 3" }}>5</Item>
			</Box>
		</div>
	)
}
export default App
