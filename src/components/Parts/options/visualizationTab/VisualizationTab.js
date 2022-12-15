import React from "react"

import Legends from "./Legends"
import VisualizationSelect from "./VisualizationSelect"

import Box from "@mui/material/Box"

const VisualizationTab = (props) => {
	return (
		<Box sx={{ ml: 0.5, mr: 0.5 }}>
			{/* <VisualizationSelect
				visualizationType={props.visualizationType}
				setVisualizationType={props.setVisualizationType}
			/>
			<Legends
				selectedObjectFilter={props.selectedObjectFilter}
				selectedMemoryFilter={props.selectedMemoryFilter}
				visualizationType={props.visualizationType}
        visibleObjectIcons={props.visibleObjectIcons}
        visibleMemoryIcons={props.visibleMemoryIcons}
			/> */}
			<table>
				<tbody>
					<tr>
						<td>
							<b>Istoriniai vietovardžiai (44)</b>
							<table>
								<tbody>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB4UlEQVQ4jbWVMXKrMBCG/53xNURj1dYBVDy5wkdICnyBtJ7XCveZSeULxEV8hHjSyAUHIDVp7IPsK5CIQDJJ8/4KwerTvwu7LPCftJh7yMwGgPFLC8D56wsAR0Qu2fQTmJlrD0PX3vD1eQUAs1wVAGCkEpaZHYB97oAEHAPPxwbvr80kol9LVaCstJFKGGbeE1F9F+xTt3ngWF17RddesdlqlJW2zIwYPnVsu/b2IzRWiPXwoe4D2JfAHHZvo41SFZBKDACpCjw9P+CwO6FrrwN8uSoglRhecOzYHnanxJFUAv0LG5zhfGwGaNBh94aXj7+GmQ0RuYV3a36T9marR+nfkQHgFtEicTGFLlcFpqWKdT42KKv+8AD+07W3uxukEpBKIFeqjCyAOoAv+O6wRKFBykrPZuXlYseQSsxGv782ePnQ2Gz13Rr7rkQMdvDdNqe4hjm4N7cfwETkmHnWTQwrqzROqmK0jr/jfVlp27W3pI5+AI3gUhWjOJ9J2nlEVDMzengKyjkP2mw1pBIgonXOcYDbp+fHbHfl5IcQAKzj+7l5vJZKWKkeTA9PSzMBApmZnIB9gGPmuqy0Lav+fvwtR0rm8JzjcEANoA5zpM9CXPzj2d/SLHiSAfD9v/uV/gFFavROplaDOQAAAABJRU5ErkJggg=="
												alt="kiemas, kaimas"
											/>
										</td>
										<td>kiemas, kaimas</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACp0lEQVQ4jbWVTUwTURDH/y82gcSbB29bJWykRmVFOairso3GQsJFEhNNbGOiJ/WgCTHxtNu70cSEi0c4tJGbJ4hQtodiRa0shq+wBN0eUCIoRIMiZTz07bLtvoIX57Rvdub3ZubNmxfCf5LQTj+JSAOg8aUOwOTfWQAmY8wMOO0GJiKDw2BbRcxPOACgNTaHAUCTFUknIhNAUrRBAOwHDvblMNCbq7Ior2UljFhc1WRF0ogoyRgzaoJ56roYWCm25cC2HLQnVMTiqk5E8MOrI9Ztq7gr1C+uLYd7dffAvARaT3fKc+q4cQ4bv/5gOJ2vgNXvrcNN4zLSjwewvPgdA705NDaHISuSd8D+iPWe7nQFYG3lBzoSZzHSP4at0panP3ZGxv7wPqx8XvV0Pd0pPHn5QCMijTFmhni0mijN8ewMum5fwKGWA5h5u+DplfMRvDdnQEQiNw2AGfItYFtOhcXP1XXMvvuIluhhD1y/tw6R1oN4em80QBzsyyEWV+EvRZttFUW7o5CZRtfdi3ge2oPSZglHT8v4trQGZ3ZRaI9yqxouOIvtG1YhH0bncOX+JURaGzCZt3G8rQmFzHQtKFB9eLIiCa1+r29g8tU8TkQjmJ9w0HSyAS+eZYW2/FbCDzZ5CkIpZKZw/WEn5sYdfPn0FUvFZaEdDy7pgRljJhGhPaEKL8f0mwWUNrfQeasNw+nXNaDhirW/j5OxuKrbVjHQHaXNEkb6x3DklIxCZkoI5t0QvHmMMYOIUIY7AcehVB5DqXxADwDtCRWyIoExFhVF7ML1O4+uYbAvF4i8FpRHG/XrRfM4KiuSLitXtTI8WJoqICCYyQEwNzCJyIjFVT0WL+vdYe+DuUBDlEnNF4Q7GO4cKWchuQ2847O0I7gqA2D7vfsn+QvETSf3ncl6RQAAAABJRU5ErkJggg=="
												alt="valstiečio sodyba"
											/>
										</td>
										<td>valstiečio sodyba</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACT0lEQVQ4jbWVPYgTQRTH/5Ns7k6wEDmOk2NjcYsIwq3FdVvcBItNoY02WmwasRK7YDubXjgsUtiaIndYKQjGD9yAwY9G1kaLVTBbiAgqnHLkLuFZZHYzm91LAsF/tfNm5jfvzb73RsN/kjZpkog4AC6HAoAnv9sAPMaYl9o0DUxEroQh8EN8/tAFAL6+UQQAbpi6ICIPQC3rgBRYBbYaHTy53xlbMRwbZhG2Y3HD1DkR1Rhj7pFgGbrIBiYV+F0EfhfligXbsQQRQYWPeywCP5wKVRWtlfD43mOwvAJerzbjTZsXzmHNWMHDey8TsK0rm9C0PF7svo3h6xtFGKYe/2DVY1Gv7iQAy2snoJ9ZTXm5enoZhYVksPVqE9vPbnMi4owxT5Pe8pljny4OwNOUAQK/Oxex1ejAdiwAo6vYCvxwLqgiAcCNwG2MKmxeeYDy8wxTT6047PWxsFRI2ReXCjg86Kfssiqhgj3IalP1PfyJFf0kjh1fxP6fHgAgl8+hePYUXj16nwJL52oxmDHmERHKFStRHB/ffcHvH3u4XruM58036PcHsC6eRy6fw+vH/hi0mBiryVizHUsEfhhnx6A/QL26g3LFwqUbHADh66dv2L7VQG//IAGS2ZCuPMaYS0QYwkdpt/frLx7cfZoKW1W5YsEwdTDGSlkeR3Bx8841tBqdmfJaNiEAKKn2rH5cMkxdGOZVPoSHmQcoQCCjJ6fAcoFHRK7tWMJ2hvao2SuwCOhmRXLkCyI3uFEfGUaht+X0xGdpIngsAmD03s2kf5Hx7fDfPwNKAAAAAElFTkSuQmCC"
												alt="užusienis"
											/>
										</td>
										<td>užusienis</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACeklEQVQ4jbWVPWgUURCAv4cXEVEshCiGPSXZBAwkK/GnWSR71aUUUdHi0orYBgub3WsEQbAKaGPhFRG0SCMYBd1EToLBmFWiUTce3hlRg0QUgj+XPIt7e9m73culcap9b958b2Z2Zl6C/ySJ9ZRSSguw1NIGXPU9DrhCCDdi1AwspXQUDN8rMf+iCGB19CYBLN3QbCmlC2TjLoiAw8CxXJ57N/N1Jypr3UiSzpiWbmiWlDIrhHAaglXodjywVnyviO8VGRg0SWdMW0pJGF7vse17pabQsARnFbya9ypYpcAaHhqpGu0/0o514jAA5T9llr78YGbiDb5XjMA7epPohlb9wWGP7eGhWzUGWucuduzcxt0bE7RsTrCvu41zl0/xeHSa0WsPa84OD41w9cEFS0ppCSHchPLWahTq8s9fvMy/A2D60WtePZ3n7KWTzD0rMDdViDOxADcRWkRCjJO5qQKF2QX6Ut0R8FguTzpjAmup6Pe9UlNoIJ/ef2VPe2sjtQ04AXictQ5rKivlVVZXVhupXQj9PN3QNsqlTW9l8eNSZF91JWGwi+q2ZtJ5YC8dPRr3c08iOuVctgoWQrhSSgYGzUhzbN2+hR6zk0TLJrSu3Rw9dhD3zhRvn3+ogyZr1uE6zqYzpu17pWp1LMwv0tW3TP/xQ/z9Xebb5+9cv3gbfyZaPaoaop0nhHCklFTgFcPZSZ/ZSb9pegYGTXRDQwiRivM4gNvnr5xhLJffUF2rIQSQCu/HzeOUbmi2bpy2KvBS7AUhIMTM5AhYHXCllE46Y9rpTGU/GPYhWAB04iJp+IIoAyeYI5UotHGlXvdZWhdcFwGsvXcbkn+xjAzgPfk/6AAAAABJRU5ErkJggg=="
												alt="dvaras"
											/>
										</td>
										<td>dvaras</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACUklEQVQ4jbWVP2gUQRSHv5Er/IcIYqGwlyJLOrMQBYUFs9HirrBQbGJx6Wy0Dba71wsp5LA3RVQQ7fQwhk1xIBKFjSgGVyJ3QpCQ4JEYE4x5Fjd3t3u3txcLX7Vv5s03vzf75k2G/2SZtEkRcQBHuy7g6+95wFdK+V2L+oFFxNMwwqDGl8UqgDM4nAVwTMtwRcQHikkbdIGjwPJ0hRcPKh0RDd+0suQKtmNahiMiRaWU1xOsU3eTgXELgyphUCU/YZMr2K6IEIV3KnbDoNYXGrVmrIa3zr0F1kfglCZnYgsvj19gaGQABH793GFpYZnXzxcRkRh8cDiLaRmtHxxV7JYmH3YpGhoZYGtjm3dzHzlx6jhXbo5yevAkT+7NxuJKkzNMvbzjiIijlPIzWq2Tlu7qt3XeVz4D8Htnl2u3LvG09Iq9PUkKdwA/E3EIg2oaH4D62iYA6oCCDnB5ukKuYAPtoxgNg1pf6OGjB3Gun2Pp7Vf+7O71CnMBrwmep33Duuzi1bOcz5/hyLFDfFpY5tFUOW1/P6oY0zJ6Ri7MfmDu8RvqaxtpStG3kijY1ykk2tbmNuvf62kqo+KKLbBSyhcR8hP2P12OODQb86N1XMwVbDcMarHqWFleZW3lR1+wrobum6eU8kSEBrwNfnZ/ri80P2FjWgZKqbEkxU24e/vuDcrTlX3VtW5CAGPR8aR+PGZahmta404DXkvcIAKEhJ7cBdYBvoh4uYLt5gqN8Wazj8CaQC8pk54viF7gNftIIwtjXk+nPkup4I4MoP3e7cv+Amx8AzxC4Po2AAAAAElFTkSuQmCC"
												alt="palivarkas"
											/>
										</td>
										<td>palivarkas</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACdUlEQVQ4jbWVTWgTQRTHfyOBKkUKCn4gm4LdHizYpRSksGI3UEguHvRkD6kXPXktgqfdHEXBU/GmYNHqzUurQQlbJGJFSrfFCnaLNBEqlIrFUj/AjodMkt3sZuvFd9o38+Y3/zf75k2K/2SppEkppQVYyrUBV33PAq4Qwo0s2gsspXQUDN+rsrpYAbB6+tMAlm5otpTSBQpxG0TAQWBxsszzB+WWiJqvG2myedPSDc2SUhaEEE5bsErdjgeGzfcq+F6F3JhJNm/aUkqC8FbFtu9V94QGrR6r4I1zb4DVEVgT41OhhSOjQ/QOdIOEXz9+83F+jdfTC+z+2Q3Be/rT6IbW+MFBxfbE+OOIot6Bbna+/2S+tEzX4YOMjA7Rfeo4D29Oh+Imxqe48+K6JaW0hBBuSqm1ktLd+PyVpfIKAELA+atWBBwwC3BTAQffqyTxAdjf2cH21k7sXHGyTDZvAs2jGPa9altYz2mN3OWzHDraRd+Zkzy6NZO0tw04dfAszRsWMbFPcKCzA93QWFlY48Pb1SSwG1SMbmhtI32vwsz9V5SezHHj3hUGMn3Ml5YjcepWEgS7KoVE29rcZq64xPDFwViwEldogIUQrpSS3Ji55+V482yRcxcG0XqPUV35EoCmQ3HBOi5k86bte9VQdax/2mBz/VvIf/fyPSf0IyGwqobozRNCOFJKavAm+OndUkR1aw3nxkx0Q0MIkYlTXIfb126PUpws/1NdqyYEkAmOx/XjjG5otm5csmrwauwGASDE9OQIWAW4UkonmzftbL42Xm/2AVgd6MRl0vYFUQuceh+pZaHNqunEZykR3JIBNN+7f7K/ihoL2HzW0M0AAAAASUVORK5CYII="
												alt="rezidencija"
											/>
										</td>
										<td>rezidencija</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAClElEQVQ4jbWVzWsTURDAf69JWxGlWlKE1qSHbAsidK0HKa7iBsT04sGDYJH04LE9CcXrJnepIOQfaCvVi6citopswUTxUN2gHkoCNlH8qJbiF/1IeB6ySXaTTdqLc9p5M+/3ZmbnzfPzn8Tfyiil1AHdVg3AtL+XAVMIYTZs2gsspYzbMLJWgVwmD6CHh0IAuqIGDSmlCSS8DmgAO4GLsykez6TqPMq6ooaIxjRdUYO6lDIhhIg3BdupG95At2StPFkrz+i4RjSmGVJKnPD6iI2sVdgT6pSKrw2v1r0KtkugJ6fmXRsvjo0wMNwPEna2dlh9vUZ6waJULLng4aEQihqs/mBnxEZy6n5DRAPD/fze/MvKs/d0BQ5z6fpZevq6eZh86vJLTs1z58ktXUqpCyFMvx2t3ird9Y8bvHuZA6DjQDva5VOQbOquA6bfoZC18q34AAR6j7Dx9aenbXE2RTSmAbVSXMhahaawoXODBHqP0hU4RF/4GHdv3mt1tgHEK+BlajesQX583mR15QOdBzto87VxI36F6ckZtv5se7mbzohR1GDTED7lvvFq6S0ALx5lSDyY4HTkBOmFNy4/+1biBJt2CntKabfI7nYRf7uvwWYHl6iChRCmlJLRcc3zcvQc7+bkSBif34d6fpD2Tj+Z56t10JBLd/ZxIhrTjKxVcHVHLlNgcLifyNUzFHdLfFn7zvTEDJvrv1wguxsab54QIi6lpAyvgZfm0izNpVsUB0bHNRQ1iBAi4hVxBW5M3h5jcTa1r762hxBAxLnuNY8jiho0FPWaXoYXPA9wAMFjJjeAbQdTShmPxjQjGiuvV4a9A1YBxr0yafqC2BvilTlSziK4bJtbPkstwXUZQO2925f8AyUqC78MOQAJAAAAAElFTkSuQmCC"
												alt="bajorkaimis"
											/>
										</td>
										<td>bajorkaimis</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACmElEQVQ4jbWVTWgTURDH/69GwYMggnrp5tCuiCLdg1KEhXQDhQQqqAfBIAlijr0GPYjs5q54MShehBapgtjWU2MtbtLGD7C1W5tDdFNhU6PVKr0I4kfGQ16S3exm48U57bw37/dmZmfmBfCfJOC3SUQKAIWrKgCdf+cA6Iwx3XWoG5iINA6DaVRQXrEAQOkfCAKAIkqCSkQ6gLTXBS6wHZgdL2BmrNBmUddFKYhIXFZESVCIKM0Y0zqCeeiqN9AppmHBNCxEEzIicVklItjh7R6rplHpCrVLw5bDm3lvgnkKlExqwnX40GAfQqeOYvfeXdiwvuLx3eeorn12wPsHghAlofmD7R6rmdQ9F7T3wH4k06cxfesp1s0N9B3phSgJDjAAZFITuD57USEihTGmB7i3SqdQRSmIzeoW5qeXAADvix98EgOgXp56wKbANCyX1Zf1b9gn7IEUOggjX/IlZscLiMRlAK1UDJlGxdO4+KKMhUevcf7KSZjLFmbGCii/8bblogLQGuAcWh3mkoc3nuDVbBHRhIzRazFM3ZxDfnKxk7lu9xiiJPh5Aav0EbcvP8DIhRBGkiEsTC+hViOHDe9K2ME6D6GrrK2uI3xmED3belCr/XHscefSTTBjTCciRBOyqznOXRrBZnUL5rKFHTu340RyCCvzJfz+1Q4NOnR7HacjcVk1jYqjOvKTixiOHcex4cP48f0nVp+9w9z9l65IeDW4O48xphER6vAWuPL2E+6kp3zTE03IECUBjLGwl8cNuDp6NYbseMGzrr2g3Nuwfd1rHodFSVBF6axSh1c8L7ABAY+Z7AJzA52ItEhcViPx+npj2NtgDaDmFUnHF4Qf0BpzpB6FkOPbvs+SL7gtAqD13v2T/AX7Px1rpwem0QAAAABJRU5ErkJggg=="
												alt="slabada"
											/>
										</td>
										<td>slabada</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACvUlEQVQ4jbWVTWgTQRTHf1OjFYqCRT2IqQejWITGiqC4hW4omiJ+XBT1kAoiXkRBKIogbHoSQfCgKQjioVX04MdB0RYVtodo9aCuVUTdVpPYgr0UP0/tPg+ZJJtkU734P+3MvP3NezPvvQnxnxSabVFETMDUQwuw9fcQYCul7Kqf/gYWkaSG4To5Rl9nAcyVLU0AZiQatkTEBnqCNqgC+4GD/WkG+tIVFvlxJNpEPGGYkWjYFJEepVSyJliHbgUDy+U6WVwnS2eXQTxhWCKCH17pseU6ub9C/SrYanjx3ItgfQRmqvs6AAsaG1i4qIGJsUlEymHzG+pZGm5k3P3KzLTHQF+alS1NRKLh4gX7PbZS3TeKg12HY7Saa7h18RFP7r0qAx84vZNV65q4dOomH19lAEh1X+f8wxOmiJhKKTukvTUrQ6ybU8fb4VGMHa1l4CXLG1m8bBHj7iSqLvB0TMAO+Qa4TrbM4v2Lz3Ts3ciK5mVk3k0A0Lazlaf3HVraVlcRB/vTxBMG/qNod51claF4wvPBETZvX0fm3QTz6ueyPtbM2UNXAsFaFpAsgIcoVViZng2McPLyQe70Pqa1fQ0fXmb4+e13LShUXl4kGg60mpr8zqe342zoWMumbS3cTj2qSdRViR9s6xACNfzgNXuObeXH1C/GRr7UBGvneopgpZQtInR2GcWEFxHEyyfwmycf2X10C+m7pewQTxDPDy156/cYoCeeMCzXyeE6Wa6euYfoypiZ9rD29eLNlEgXjl/D80qVo7OhuvKUUkkRIQ/PFqEF+aFAGbSzyyASDaOUigV5XIBbR87tZ7A/XZXXQdJNCCDmnw/qx7FINGxFovvMPDwXuIEPCAE9uQqsDWwRScYThhVP5OcLzd4HKwCTQZHUfEH0D8lCH8lHER7Sy7M+S7OCKyKA0nv3T/oDLLoy0mRnkwsAAAAASUVORK5CYII="
												alt="miestelis"
											/>
										</td>
										<td>miestelis</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAClUlEQVQ4jbWVPWhTURTHf1ei2FqLIhUUkg4NdbIPqqDwwL7qkAwOFZc6pODgomtxfckudJDg4GaHquAHOGiwlpchIFrFVPwoplYTsZaa0tDaJrT2OOQlfcl7SXXwTO+ce8/v/s99957r4z+Zr9mgiBiAYbsmYNnfScBSSlmupO3AIhK1YWTSOWamsgBGV08AwAhqflNELCDmtYAL7AQmRlM8uZWqm1H2g1qAUEQ3gprfEJGYUiraEGyXbnoDay2TzpJJZwkP6YQiuikiOOH1is1MOrct1GmVuTa8uu9VsL0FRnx4rJp0ZvAk3b2dILD2q8T05CzPH08hIi54V0+AoOav/mCnYjM+fLsmobu3k9XlIq8n3nPg0D7OXurjcFcH966Pu5THh8cYeXrVEBFDKWX5bLVGo1IXvi3yNvUJgPXSBucun+ZB/Bmbm9IoxQAsn8Mhk842mgxAIb8CgNqhwAOcGE0RiujA1lb0ZdK5ptDWtt0Y548z/eoLO3f5CBzpoHVvC8XVEjNTNbkmEK2Ak2zdsBo7NXCME+Gj7Glv4ePkLHdGEuw/2M5Fc4A3yWk+vPxcn2I5FRPU/J5KJ8ffMXH3BYX8Mr83NgFoa2/h5/cl7sdrf6J9K3GCLbsEl62uFFmcL7jiaytFV8wWF6uClVKWiBAe0v/pctRCAzW+8xzHQhHdzKRz1dMxN7tAfm7JBSmtrfPja74mZp8G981TSkVFhDK8DH54Y8JT3eJ8gUc3raofHtIJan6UUv1eiitw88q1CyRGU9ue6wrUVtvvjHv14/6g5jeD2qBRhuc8F3AAwaMnu8D2BEtEoqGIboYi5Xil2TtgFWDUq5KGL4idEK30kXIV/qQ93PRZagquqwC23ru/sj+5JB7UY3bF5QAAAABJRU5ErkJggg=="
												alt="priemiestis"
											/>
										</td>
										<td>priemiestis</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABcElEQVQ4jd3UO0hCURzH8e9JM7WHldiLoMiIyoaGoCm8RZRLtAftBS2NQaSNQauDW3s0V1TkhdzEJSPo5RJJ9iJ7qRG3xewpeL3W0G/7c8758BsOfz2/FD2AoigewF0g0y+E6NenB2fsyM/e+rwmsaZVwjHsliDdGODiWCZ25NcMv0Wf/Zq25ASbKuppcIygM5gBeHl+4jIS4DYaVg8394zTJk1TZm2h2Gh5P1AUnpNxio0WDne8hFam1MH3Vyck72Ik4lF2V+cQQkfv2BLB5UkeriMMTMkkbs/UN76MBJB9rsxsqXOwv7VAIh6lxGwlvObh/GBDPfw1de0uukcXCS5PYLY00jk0i+xz8ZSl9d/+iiKdAYO5GgAhBAiBwVQJQGlVE8by2vxgm70PaXLzxwcdgzP5Ny5E/gmcerzJaSGlHq/VwTenIba9/Tl2UwEXIhnYZnfS5fJowmx25zdYrmmVPi1qDZEzsBDCUwjxY14B34Zl1HNLN9wAAAAASUVORK5CYII="
												alt="fabrikas"
											/>
										</td>
										<td>fabrikas</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAx0lEQVQ4je3UzQ2DIAAF4EfCCrKA3HQH8KS7dAhxiO6iJ2UHvekCOoRetLFpoRb00vTdIOQLefxQXBQKAPM8KwD5SWZDCEnoOhBj36CrCi+RcYkozSWw7hgApkFj7BtveAs1L/OLEY4zhSh9rb2rCrSlcoeDULydj9IcQShQ3xM32BbGJZJbbcWdO2ZcIs6UsRavwzPV5Q3b8od/EZ4G/fSpmNZ8Dbel+fIfyfVVBKFAnCkvbP8SN1gzLj92ejD6ARNC1BniPgsKbjC/fky26gAAAABJRU5ErkJggg=="
												alt="popieriaus fabrikas"
											/>
										</td>
										<td>popieriaus fabrikas</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAu0lEQVQ4je3UwQ3CIBQG4P8lrNAuUG50h9IT3cWTE4BDOIQjeCoM4a0ugEPQS602TRNqMUbjf4KEfMALPIY3hQFACMEA0IlMS0Q1GyaV7ywu58MmMecSQmkJDCcGgNvVwXd2M3wPW142TdkY+M5Gbx4NC6UhlMZpT2nhtfksXDZmHOdcRtU5Chbq8cTrXRtV5x+t8R/+Yrg91pPOlQxe09VmcFZUk6/7SrKimsEu53L1dRfiRpiITArxOT32mi2/vtLizwAAAABJRU5ErkJggg=="
												alt="vyno ir degtinės fabrikas"
											/>
										</td>
										<td>vyno ir degtinės fabrikas</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABFUlEQVQ4je3UsUrDUBSA4f+ml1oHRZDUOjmkgxJn3Uw6pa/g1t3JJ0j6JOIi+AZ2MhmLq4UOKbSbplhLoFRKSVzaUFEhmujUfztw+TjLuZI/SgLEcewAdk6mK4SoycVgBL5Lp9XMJJarJrplm7DYGGDY8wh8NzO8TH7/LFtrOB1c2qqwvXeYzLPpmOLmDgBv4RNh0P0dvH9U5+T8KpmHPQ9VMwDoP1zTvmn8DBZCQSkUmU3HvAzaEEcgFMLnLorcAGAy6lOQJaJoThzN08Gqdkbt4v7TprsHp0xeBwDolo1u2XRaTR7vnHRwHn0JB77L7aXIH86jNfyPsKoZHNedTNjyKldhr1w1P3zUGfISWAjh5CGu9g4z/0zGZyba7gAAAABJRU5ErkJggg=="
												alt="plytinė"
											/>
										</td>
										<td>plytinė</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB50lEQVQ4jbXUP09TURjH8e9tD71XSttLwDa0xJhA2ibUyuKgS6sxoguDu2Ez8Q3oSBl08jWYuDAYBicCcWkTQyROmBIdkLYBNNQW2uql/1sHgVDsvU1b+E33nud5PjlnOEdwSREAzWYzAsxfkBmVJOmuOP4JpbeibK4u9CU6J8NMzcyH4XjHAL++x0hvRfuGTyL029rH7vRTSH/r2NcV7Bi7QTG/i+oOkvvxpX/YLBRsTh/aYQrL4DB/sts4xgIU83tUjg57h+u1EtpBEtk6gtlixTKqIuQhGrVK77CQbdhdfhq1MoX9r1yxu2nUKwwpXqqlgv6cXsEkZKZnX3P91hMGFAcApd/7mMwDlLUsy6+8xhtquypJ3Jl7h+q5yfJLL6FnH1DdQRSbC4BMYq3TQdvD48HHeAKzVLQsQrFT1jItdZfvPoPqOEe53e5hAIt1hEcv4piE3FI3CwWX7wGJ9TfdwbJ19PT7PHoS6/A1XVQX1g6ShkP/elLdw8nPb5m4/VR3qFrMsRd/3z2cSayxubrA1Mz/L2mjXmV9cU73YhjCAPGVCPmfcfz3nqN6pmnUK2S2PxJfiZBNfTJEDWGAnY0ldjaWOiKG8NWJEIGHkZ6Qs8Z5OOacDLc81H0kdgpLkhS5CPFs/gJlOZQ5XHJq9QAAAABJRU5ErkJggg=="
												alt="parako rūsys"
											/>
										</td>
										<td>parako rūsys</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA/klEQVQ4jbXUwRGCMBAF0J+ZtCANyC30IDmFXiwisQh60ROhB7lhA7EIvBAHgWyU4L8xC2+W7ALHn8IBYBgGA0DvZFrGmOTjxcn1Ft3tkiRmeQmhdAmMHQPA89HC9TYZ9uHh2+II1UgQzvIS8tygu11wv5qPWlEZCKXR1DKIkzAACKUXDwulo10HYd+lUBry3Czqa2/yFTzHf0GjsMfncAz9Cp6ukE9RmbSO/fTn8QPdtG4h1Ce0ilE4NeS6ud5CKL16ztTHQcIA4Hq7usO+RoWE1zqd1pI6bmoZrFGJDm/rr/QNH44nFJXZhEyNOdxmeUme6Q9p3zBjzOwhTvMCT3xxuZ4pTDIAAAAASUVORK5CYII="
												alt="malūnas"
											/>
										</td>
										<td>malūnas</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABKUlEQVQ4jbXUsXGDMBTG8b/uKGEA0UcMwABJemsOD8AA8QIskDXIAPEATg/p0QDQkyKWItuIoOB8HZz46Um8ewn/lARgmqYD8HIn810I8ZycHx7HzmCa0yYxLSRyVz7BuWKAoesZun4zbJMsrHORugRgbM3qzRdhC1o0LSRSl5jm9OsGQdii/r0PXc+oDFKXSJY3mIXnUB8f6t6ti4JD6HXG1pCpfBZfvIqxNa5K/71NpnK6ullfsWlOSF3yUO0A+Ni/AqAqTap+WuqzfgueJljx2Br4dlGVBrhAXfUNcVfh5xq0sSezPzMa/ks2wWkh49ttbUJtGYTXzATbjlEwXLaTP7nWDKNF2P84dqQ6OFM56Khvb5Kp/AY+pkoG+zUyRwcLIQ73EP18AQEXfW4AM4/0AAAAAElFTkSuQmCC"
												alt="karčema"
											/>
										</td>
										<td>karčema</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABMklEQVQ4jbWUwXGDMBBFv2Y4igKWu8U9FJDkLrWRBiggboACUgcUEBdAAYg7KgDd8cGgwNiSPOD8E6ykt3+k3U3wT0oAYJqmM4DvFzF/GWOfyfzzbrWBqdtDRJ4TSBYfwOwYAEY9YNTDYfCiJLAPpAr3bTuzOWw7EzTiBaciA8k/cN81t2RLTAJ91XjhQccAYJrWuQVusPkug+eCYN+DjnpAKrL9YC4otLwfDACiVHf3mIosmjQK5oJ2OY+CrTYuwTp2yLHVBrqqQapwINO0MHWLt5+vfeBRDzgJCVGqjTuSRbQioo77qsGplHdxLijYHFEwz+lhLfOcwHM61tJWm83MWLsG4J2IQcfLQ/kSr6fZ0+DYGI2tO3AqMkB59z2ldbUs4MveDnugiwMzxs6vIK51BXqJe0/Idcy+AAAAAElFTkSuQmCC"
												alt="geležinkelio stotis"
											/>
										</td>
										<td>geležinkelio stotis</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABpUlEQVQ4jd3STUsbURTG8f/FqDROJNqYMEENVju1UHCRNiBIX8ClCrpw5xdxo9/ApXTTnZtu60YopULopqQQpVDiS2yUGIUaJ3Gizjhzu9AGIWaInXTTZ3e49/zu4XB9/KP4AKSUi8BCk8zPQog3vpvi1VnmkMMPKU+i8kRFnYi/hpuJAcqZPOVM3jP8Jz6Xe57SENza6Sc6k0Df+Mnpt2zz4K7EEA9HNZRHkebCxdQO4fFnFNbSDaGusD8Won/uJaXNHNKRYEv8fd20TcbpGAhzUdA5eP/l/rC0HGzDxDqtIG0Hx7Kx9ApX5QvMoIGlG3838Xn+hK2l1Wrd9WKQYmqXy+MSJH+4oq6w1/wnsDr1nOBIDGP3iNxKsuZceazSOzuKEIKd5TXMX2eNwYXVFP5YiMDTXobnpyl936c12EFobJj2SJAH0W4A9t59uhOtC0tHkn37Eceyae8JoAypFL9uY1dM9HQOI3uEaGnBsa7qbaL+jh3zuunyuHT9xWoer4+6wl5ThQNaFCa9YQEtWgOvK5qKoql3d9wv61VYCLHYDPF2fgOhX5OIoyjIxwAAAABJRU5ErkJggg=="
												alt="perkėla (akmeninė)"
											/>
										</td>
										<td>perkėla (akmeninė)</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABJ0lEQVQ4jbWUzXHDIBCFHzM6igLg7nUBKiDJHdWRAlJAXIfbkApIClDuoQAoAN2Vg60dywaERs67MNqBj/3Ro8I/qQKAaZpOAD6fxPwSQrxV14+X0Xr4bthFrI8KyjSvwDVjAAjWIVi3GzyryuxjqbbB+Os3XbwKlqShTAMYYLQewKW6tbYlwZL03DOO1aR4laThuyFZRRKs2oZBMdWkcPgw+Hk/l4Ml6Sz0fm8s6yhYtU0sHFV9VOXgYF1xxilFwb4bFkNLKWeq5PB8v4T7/gJYxDK/XBrcDWwKSZr77vuBB5YzTNYg88FgHQ5kuHSP9TelyNL3F5WoCCxJ81qSbTE4WMfDK1VxK7a+1QyWpIF209kHzS27BX/XpHa7bWYxWAhxegbxVn9mZ3PraR5hpgAAAABJRU5ErkJggg=="
												alt="eiguva"
											/>
										</td>
										<td>eiguva</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABTElEQVQ4jbWTwVHDMBREn2dytAqQ7vm54wKAu9UGFOACSAMqANqwCyAFmHuUu1WAfQ8HRyYQHJw47E0azdP+/bML/kkLgP1+vwZebsR8T5LkcXE43Hc+EMp6FjFdaXSePcDBMUDrG1rfzAZHLc68m6XJYG0zlBi8K1FiWBY5oapH4/sTHCFRUtghMiWGwBVgbTN0ngEQqppuG4a7zoezOxkFR8DPcVvXIIUllX5Rkx0rMWibkYoezdC7cvhYCot35TTHEQp9pqGsv+W6LHJ2rmK3rVgWOUrMSSwn4NY3fDy/fbnPM7TNaF0zQI/zjW8nOT7+ZOcqtO1HBuh8+HX0i8AR3rqGu9enydBJ4LjMscyvBsf+h7JGiUGJIV3peWBt+3LE8WMssd5XFSS6vOR+MniOBrASA3YeTIk5AW9S0UP/Z2ozgJMkWd+CeKxPZ/OicD4khbkAAAAASUVORK5CYII="
												alt="kareivinės"
											/>
										</td>
										<td>kareivinės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABQElEQVQ4jbWUwXGEIBiFHzMetYDfu6QACkhyhzq2AAvINmADaUMLyBZg7mHvUgDezcGFEBVXx913Qge+eTweJHiSEgAYhuEM4ONBzC/G2Hty+3jttYGp20PE9IVAUrwBN8cAYHUHq7vDYKdkZd4hLYJJCWQ8h6nb6C5ICT9eijDqOOWEopS4Vs0MnvEcJEdwrw0MdoCdpvCM5yhKueo2CjZ1i/7HeEBRSnyfPgFMImjiUUUdW93hWjUezksFYIwIwGJEm8AhnJTwQNf3e9W8m7HVHVJNHry171FwmCVJAdO0fhxq1+G5BaSEh4YAkgK9NtBVvd+x62qvzey/aVqQHC/RrlY4p+7kw1is7v7Vcbqbu47DjoYL3djqzue+2fHW53Nt3vNft4zngDoGy3g+A19S/ncJDuriwYyx8yOIoX4Bx3ip2tQ5GkUAAAAASUVORK5CYII="
												alt="karinis laukas"
											/>
										</td>
										<td>karinis laukas</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABDUlEQVQ4je3UvUoDQRSG4XfiBot0pp6F9CEhYBUIkRQWAS/BgJ03YL9X4BVY2Vml07RTpEi5W9gICrsQAglbpYqerIW6ZpHE/QlWft03zHk4MDAWe44FEEWRA3QLWkYp5VifpRsE7onve7kk226gdfN7QwDf9xiPb3MuN/gJ7kqrdcZ6Lbju/a93U4Ht9jkiq2JgpXJErXYMQLl8SKl0QL1+CsBi8cJs9pQNrFY1/f5V4uyrTyZ32cEwDBiNrgHo9S4RecOYGwDm8+dtY9vB5TLE8x4A6HQuEFnFfVdSPUqW/IN/BE6nj4i87g8cDp1UWAK07QYwSD24mY/ZJGi0bsZfUM6YGFRKOUWkzbwD1N1PsayOmqUAAAAASUVORK5CYII="
												alt="katalikų kapinės"
											/>
										</td>
										<td>katalikų kapinės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACNklEQVQ4jbWU0WoaQRSGv93ZbG76Aom7mrtSlCxIgspi2j5CoWBIiQT6IM1t36FQMLSY2z5BJQy6RCyG9tq4Js8Qos7Yi6ybipoVTP+bYdhzvv3nzJlj8Z9kAUwmk1Pg0zMxfxqG8daKNq8Hgy5Snq1FdF0P3z9+A5FjgDC8Igy7a4Onsp6IwzQFruthmoJ02osMPPy83++gtVqauxRsmoJS6QO+fwyAUkMACoUKAM3md6SsLYUvBGcyeSqVz2it0FphmmIuplCo4Lq7SHlGv99JBpumiF2apkCpEUo9uNJaYRgq/uY4OXZ28tze/mY8Hj4N9v0q29uv4r2UNVqtOo6Tw3U9ms1vFIuHHBx8BGB//z3j8RApa8mOJxPF/f0dlmXTatUBKJdPCMMr0mmPVqtOqXQUl8my7ORSpFJZhLARwo4vzPer0XqMlI+dsbn5Yg64FDzV9LaLxcPomFXC8AopazhODiEeXaZS2WRwr9dma+slQmwAYgYwVal0BIBSI7RW9Pu/ksFBUKdcPpmBOE6Wm5s/DAZdfL9KJpOPWlAgxAZBUE8Ga60IgnMKhQpaK5Qaksnko7JU4torpRDCJgjO51ptIRjg4uIrAHt77+JSTJ82gBA2o9Ed7fZ5HLsSWGsVJ6RSWRwnNxfT6fzg+nr5vHiyKxqNL1iWjet6aK1wnByWZSNlbeHxVwJPNR4P6fUuARbOhERwOr0LVFdOXKQHxiy44brezKBeQ40YbBjG6XMQ/9VffUfhfWUaThkAAAAASUVORK5CYII="
												alt="liuteronų kapinės"
											/>
										</td>
										<td>liuteronų kapinės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA/klEQVQ4jcWUsW3DMBBFHwGtwRtBHIBFksI7yIU1Rfq4FjyFXXiNuLgB5BHIQZRCpiEBAcNADPIrEuA9kp/32fBHagCmaToCH5WYn8aYt+YxeYlxRPWyiWitw/vDKzxODBDCnRDGzeCkJrNuJe97YhyLNy8CizhEWkRagCJ4EbjrTouxYxh2dcDDsGO/n+HX63tJSR4s4lYPMr96D/Cj31mwte7pa9ogzWPM+5wFq55RncdVrdii/wUnG6qDQ7jj/QGYO6VaQFTPiLRY6+i6U72AJMU41u8K1csqLNXAIZT/bCvwnKi+uPA7pVQuwTdr3a+umtHtCTbGHGsQl/oCb+pSmi2GaYgAAAAASUVORK5CYII="
												alt="stačiatikių kapinės"
											/>
										</td>
										<td>stačiatikių kapinės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB+ElEQVQ4jbXUT0iTcRzH8fdvjh3sMPAgJDwiw4vB2qER5B/ao4iHvCw8CFnZIRIPQccO0S5F0a1LBkFY2SXEsNlRt8H0IMu5MDboMJ6nLda/bY8PTzYH66AOJyrP2tPn9v3x/b348uXHz85/ih2gUqkEgLsWmSEhhGzfLc6r6jrR6MuGREny0NNz2Qe7EwMoSgJFWW8Y3ov9mL6GYhru7b1KPB5E139aB7e0SLjdQzidJ1lYeGAd3N8/wfz8Pbq7L9HWdops9tO/wR0dZ/D7A+TzWZqbnQghGBy8ic1mY3T0Efn8FxyOE+j6D2ZmbgEVc3A6HUNVE6yuvkGWJ5idvcPm5ncABgYmyeU+09Uls7z86lD0SBhgaWmKsbHHxGJvqyhANPqC8fGnZDIbZDIb9a0CwDCKAGjat5rzUmmLcrlEsZg7Ej0W7uu7RiTyHK/3IslkiFLpNwBer59kMoTLdZZE4j2FwlfzcGurC7d7iFQqQlOTg5GR+2jazoSdnedIpz8ghECWbzA3FzAP6/ovpqcnq/Xw8G1SqQgezwXC4Weo6sd93QLTr8IwChhGoVovLj7B57vO9vYWa2vvDp3QFHwwihJH03KsrLw2hZqGAYLBh5TLf6yH60Fr4Pb208CVui4fzI5RC4clyVPzUTeQcBUWQgSsEPfnLyUkswWj9m1LAAAAAElFTkSuQmCC"
												alt="žydų kapinės"
											/>
										</td>
										<td>žydų kapinės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB8klEQVQ4jbXU0UtTYRjH8e/ZziYpzibUDugmgzzCAk/B7saovNu6EPJ60X/QjXQVZBDddGn9ASFC0IWQsIucoaAiItjUDqNdLM5BliDCVrTltt4ustHY3Nk89rt5eXne98Pz8r68Mv8pMoAQYgZ4ckHmiiRJd+TTyS3TTLO+PmdL9Ps1IpHEbTjtGMAwdjGMtG34b+Q262zFEnY6XQSDYXy+a8hyD8fHJtnsBuXyt/PDIyM3icWm8Xiukstto+spCoVDAoEbmOYupVKhezgYDDM19QxJcpBMvmB//73V4axht/sS8fgjHA4na2uvu0bPhFU1Sl+fl5OTH2xtvW25MRSaQNc/dAcrigpAPv+ZavVnQ83j8TE2FiUcvsfAgIJhpDk4+NQZLMtuAKrVclOtWDwEoL//Coqisrn5pvOOC4WvAHi9wy031WoVFhefoygqQvzqHM5mN4hGHzA4OMzQ0PWmo+7svEMIQSaz0hI9Ez46+kI6nUTT7hKLTTM//5BSqVivCyEaxo5hgFTqFb29lxkdjZBIzLK09JJcbhsQgITL1UOl0nwHlnCtVmFh4Smh0ASaFmdy8jHl8ncM4yP5fIa9vfZv2+KvEOj6Mrq+3H5Z9/D5U4cDgXHgvi3sj9EIr/r9WsNHbSOrdViSpJmLEP/Nb3+fpo3h+gdMAAAAAElFTkSuQmCC"
												alt="musulmonų kapinės"
											/>
										</td>
										<td>musulmonų kapinės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVQ4jcWUO26EMBRFz5MoaSnYAAWbiNOTNcEGZjVMH2YTFGyAgjL0N0XAYhw+kxmk3MpycXye3pUjTk70b0BJzsyaU4CSPgEH2MtASdUEQ1JlZtVLQKBs+ysAeVqUwPNASdUwdrR9PQMPLTeBktyPXe3v2v56aLlnWA5jx/DVLYC1N9+yXAVOdm5pFz4mqVmr0ZbhL7vQMk8LBxwD55rcusuWHW1fk6dFKYlw9DVDX5O9TAt62zUMa7IPrMnTwoUL8sC1mjxoeVejpeHmIg4s72oULewcQJ5+PAwEGMaOJM68ZQRgZo2kJokzkjj7E3DKbT74kc3s/RlSmNN/7G8kPpVUK1zSxwAAAABJRU5ErkJggg=="
												alt="gamtinis objektas (upė, ežeras, kalva, griova)"
											/>
										</td>
										<td>gamtinis objektas (upė, ežeras, kalva, griova)</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABFklEQVQ4jbWUwY3EIAxFv6UUEcpwGtic0xShsmUawGW4DO/FRGx2JpBI+49EvDzxDRP+KdOnD2a2A/gaYCQiykNgh0ZV7VJDCC8AfbCZrQCiiKCU0oMihBDNDES094yjqnahAKCqEBEwcwTwGey2q4h0oTWlFDAzzGxvrc/GUVUxcrZt3lkfYC/slu2VdWscReS27dm6Fjm57Xf989PUvcyM1vgFYH1M9czzDPilmgCAiHYzi8uyPLb2mQaAdIA9yZt9BN+2DWiu9wF2awCId6HLshyMunae43zXOoRQC0vt+i8wEWUzS8wcR8EOzd234k6R58IuwZ7EzNHH5xLstnkI7NY5hLBekoE/z+Ul2DdkvHnAR/MDCUuXlKQ5wyIAAAAASUVORK5CYII="
												alt="kitas objektas"
											/>
										</td>
										<td>kitas objektas</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABzUlEQVQ4jb2Uv0sbYRjHvy9IdHCQmldPMIlDbONdhwuCYKFcKp0qdAvOLg7nH5EbOnczg4PQjt4gZBOEcCAOlZJIe2d+OGgSyTUnOnRpK/K4JMdpzHknxe/28PJ+eH59nyH8Zw09O5CIJG/MGDOfBCSibLNua0X9kDeqbT6ZGMfwSMS5cn6bY9HRPGNMDwQkIqlZt7e/fCqIZaNy/5kXNouZ+feS1GldZiamX6w/CmzW7e3P6lfRr6zveya/ub5RS8axk1bmtIHATutyYyu34wvrqZt9johMb/kukIikon6Ytc8ugvBc6NLKggagHwgAf//844FpXbVqNohI6k3fBTrnV+qRUQ3LQ63UEBeXZRHAXeB5/ZcuzETVMCUDwGRiHACsXuwC5UyKH+3XQmc4PBJxvLG3h1b81ZRTNiqh+piUY47XPS6QMWaWjOO8rKRyDyz0g5KVFGKzgjYoQ6SVOa1Ra2fLRuXRXRQSUXxYfdtnwT6nxGYF7ePau41vuz/4oAHJSgpLKwtWIOsxxnQisl6/Sao/D06yjWqb26cXEGaiAICX6bi1uCxrgY9DF2oCWCeiPACxedLhseREb5qW3wnzvYfdj773LxTwKboFWSSw6Pu6sdkAAAAASUVORK5CYII="
												alt="gyvenvietė ar jos objektas"
											/>
										</td>
										<td>gyvenvietė ar jos objektas</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAc0lEQVQ4jWNhoDJgoZmB////12ZgYNAixxBGRsbVGAZ+eX0n69K2qixSDeMX12b4//9/GMxQFC9/enGN4eOLq6SZaIDKpV0Yjho4auCogcQayCdBemHDL66N3UAeUZUDel5tZLkKa/EFFVyNVQcJgOphCAC+DhhtQBdizwAAAABJRU5ErkJggg=="
												alt="gamybos/pramonės objektas"
											/>
										</td>
										<td>gamybos/pramonės objektas</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAdklEQVQ4jWNhoDJgoZmB////12ZgYNAixxBGRsbVGAb+fPUx69mG01mkGsYhJcjw////MJihKF7+/vw9w49n70kyUJBBCYVPuzAcNXDUwFEDiTWQU1KQZAM4pFD1wA1kF+M/IBVgSparsBZfUMHVWHWQAKgehgAxNxhTSmQPhAAAAABJRU5ErkJggg=="
												alt="veiklos objektas"
											/>
										</td>
										<td>veiklos objektas</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAdUlEQVQ4jWNhoDJgoZmB////12ZgYNAixxBGRsbVGAa+f/806/Dh+VmkGiYsLM/w////MJihKF5+8+YBw5s3D0kyUEPDHoVPuzAcNXDUwFEDiTVQRESBZAOEheWxGygoKH3A1jaRLFdhLb6ggqux6iABUD0MAVDdGL/QhOQ3AAAAAElFTkSuQmCC"
												alt="kapinės"
											/>
										</td>
										<td>kapinės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABEElEQVQ4jWNhoDJgGTUQK/j84+VUHnaxA4yMjKspNvD////at17uChXlUXdgYGCg3MAvP19lPXh7XPTdtweij9+ebpAVNm0g20CY6z79eMbw6cczBjZmrtD///9fxed1vAbCXAfj//r7TevJuzPaDHi8jtPA////h564Pyvr049ncLEn788yMDAw1ONzJU4D33992AA1AAU8eX+W4b3YwwZcrsRq4OcfL6ceuztdC5dlN1/t1Pr//38oNldiGIgcEbgAPldiGIgeEaS6EsVAYlxHyJUoBn75+Srrz79fojKCxgQNZGBgYHj+6TKGK1EM5GEXm6Yl6XOAKNMQ4BpOFzIyMl5lYGC4SqKBKGDwl4cAhWOaREQeCXYAAAAASUVORK5CYII="
												alt="gamtinis objektas"
											/>
										</td>
										<td>gamtinis objektas</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABM0lEQVQ4jdXUMYqDQBQG4DcQ2ygkr0kjgkEwYOUBvIR7CHOI9RKbS6TKBQTBK8TGgWCtopN2irdNFtSocTeBsH89882bx5tZwIuzeAtIRDsAAMbY+WmQiPwkSUJVVVEIcVRVdf8nkIj8sizDKIrsy+UCAABZlgVFUXjr9TpkjB1ngUPQT+q6htPpZJum+SWE8JbL5aHfhg5YlmUQx3HIOcepa3HOsaqqYLvd+kS0b1fbARVF2VVVNYm1qy2K4m7te8ZmLE3TwPV69QBg+MqvyD8DpZRnTdOgrutZmzVNAynl+ByuVqvYdd0DIvpZluEYbBgGOI6TDr2YDnib+j0RHXRdD/I8v4Mty0o3m80REcOhwwZ72IYR8TNNUx8ARqt6CPbgj9v3ZU9Bs8Ae/PAvnA3+Jt8VHZPdD2Q5mAAAAABJRU5ErkJggg=="
												alt="kitas objektas"
											/>
										</td>
										<td>kitas objektas</td>
									</tr>
								</tbody>
							</table>
							<b>SENIUNAIT nuo 10K (45)</b>
							<table>
								<tbody>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASUlEQVQ4je3MMRHAMAwDQOnOZMoiexmlexmla83CcJSlQwF41AP4eK56JQw0IJEhYZz3wY5wzVJ0RH8OHTp06PALSeSapY6MRG790xDfa8XfVQAAAABJRU5ErkJggg=="
												alt=""
											/>
										</td>
										<td />
									</tr>
								</tbody>
							</table>
							<b>MIKRORAJ nuo 25K (46)</b>
							<table>
								<tbody>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASklEQVQ4jWM5EDSvjZGBQYeBCuA/A8MVFkYGBh37dUl+1DDwYNC8TSzUMAgZjBo4auCogaMGjhoINfA/A8OVg0HzNlHDsP8MDFcAvTQOvTFQKckAAAAASUVORK5CYII="
												alt=""
											/>
										</td>
										<td />
									</tr>
								</tbody>
							</table>
							<b>SENIUNIJOS (47)</b>
							<table>
								<tbody>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASklEQVQ4je3UsQ3AMAhE0Y/kjdjJQ2UmM9OlCYp7LFf8hu7pKoakxcHGdx8gipYDM8EwsxIoCfgXHqvBBhts8C7o+c8K+Q7Oqpa9IiQOfWVcj3gAAAAASUVORK5CYII="
												alt=""
											/>
										</td>
										<td />
									</tr>
								</tbody>
							</table>
							<b>SENIUNIJOS (48)</b>
							<table>
								<tbody>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWElEQVQ4je3UMRHAMAwEwSuMILWEwECE2UAUAhaBBEEKT0JAnlQ6ADtffbumH2ysAYwxCY8UJF0w0wWGB37eyW0BL7izAgsssMAfQekC5A/2A80UTJPbVg+oRxJH+cV9xAAAAABJRU5ErkJggg=="
												alt="Antakalnis"
											/>
										</td>
										<td>Antakalnis</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAXUlEQVQ4jWP5//GxEAMVAQsDAwND/87HDMefPKHIIEsZGYZCd1mIgcefPGE4fvUThW57wlDIADWQmmDUwFEDRw0cNZCOBlrKyDAwMFBewMINLHSXZShkkKXQbRAAAAcYEu4YMvgWAAAAAElFTkSuQmCC"
												alt="Fabijoniškės"
											/>
										</td>
										<td>Fabijoniškės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUklEQVQ4je3MMRHAMAhA0T8wM3RHQWRFV/zUQBTgAAPt0EMBuevCE/Dkcb84SACWOzuiFA1VptkX7gjuYpjkyNJhhx12+E84VMtRHgIwzcphegGsFQ+48w6BQgAAAABJRU5ErkJggg=="
												alt="Grigiškės"
											/>
										</td>
										<td>Grigiškės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAXUlEQVQ4jWP5f/WxEAMVAQsDAwND/9WdDDs/PaHIIHc+GYZCbXeIgTs/PWE4/uQqZU6TYWAohLmQmmDUwFEDRw0cNZCOBrrzyTAwyFBmkDufDMLAQm13hkIKXQYDALRVEQjZTIsNAAAAAElFTkSuQmCC"
												alt="Justiniškės"
											/>
										</td>
										<td>Justiniškės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWklEQVQ4je3UMRHAIAxA0T8wZ+iOARASzTVQB2AgDqKgA9yxF65TvoA3/vSYXRwsAXS7cW9bkEilZB2ge8O8b4EZgAmeLMAAAwzwR1Ckzp99T6QusGQFdJMcvX2HEDfFUxlKAAAAAElFTkSuQmCC"
												alt="Karoliniškės"
											/>
										</td>
										<td>Karoliniškės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVklEQVQ4je3OMRHAIBQE0S2or0iPD3QhJLaCgSjAwSlIE2bSfybVXwFvttxzHmysAGieyCMEWQ3X/oIe4CsECvA63FmCCSaY4I+g1VAQstoHrB0HwdUDSsgScPXhyUYAAAAASUVORK5CYII="
												alt="Lazdynai"
											/>
										</td>
										<td>Lazdynai</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWUlEQVQ4je3MMRHAIAxA0T8wZ+iMERSgByXVgwKMxECioAO9q4BwnfIEvGJmFwcVANaN6wxFUju0sUPXCbpCoQPCG56UYYYZZvhjKLXjwUhq/0LaQBjBcnsAA2AQ3jrR8KcAAAAASUVORK5CYII="
												alt="Naujamiestis"
											/>
										</td>
										<td>Naujamiestis</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWUlEQVQ4je3MMQ3AMAwAwR+yW+ocBgESBEZZBAXiEkgImEGHVCoAR518AK7YGAcbFQCuE58WiqQ26LpCnwZ2h0IHhDfcKcMMM8zwx1Bqw4OR1PaFdEXQYLk8iJsQRWt/CvMAAAAASUVORK5CYII="
												alt="Naujininkai"
											/>
										</td>
										<td>Naujininkai</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWUlEQVQ4je3OMRXAIAwA0RuYM3TGAQpQEMutgiqgBkBBFDCUKgivU07Af5fO1g82lgDsurE2XJCUjGhdYBvY0913outwZwEGGGCAP4JSshv6jBfUiqjbBGACKK8QC8nfizAAAAAASUVORK5CYII="
												alt="Naujoji Vilnia"
											/>
										</td>
										<td>Naujoji Vilnia</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWElEQVQ4je3OMRWAMAwA0Rs6Z2CugxpIvaIHMFAFjQGqgIGiIH1MOQH/XdqPvrGwBDCuk9HMBUnJiNYJNuO27r4TnYcrCzDAAAP8EZSS3dBnvKBWRN0mAA8NEw/AYmPZSQAAAABJRU5ErkJggg=="
												alt="Paneriai"
											/>
										</td>
										<td>Paneriai</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVklEQVQ4jWP5+PiqEAMVAQsDAwPD1Z2PGT49+USRQXwyfAza7rIQAz89+cTw5CplBsogu5CaYNTAUQNHDRw1kI4G8snwwcszcgGfDB/CQG13WQqNQwAA59IPtt6KifMAAAAASUVORK5CYII="
												alt="Pašilaičiai"
											/>
										</td>
										<td>Pašilaičiai</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWElEQVQ4je3OMRWAMAwA0RuqgLkK4iAKorkKUNAYaA2ggA6AgvQx5QT8d+W+xsHGCkBrJz49BEkVzPQBfTq9j/Cd8YI7SzDBBBP8EZQqYegzCoCZYmgYBVhfgBD6mZxHXAAAAABJRU5ErkJggg=="
												alt="Pilaitė"
											/>
										</td>
										<td>Pilaitė</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWUlEQVQ4je3OMREAIQxE0S2oKa5GARGymhGSGOAUYOAoiIMwV+ULePPLN+eDixUAGENhukJQlwpSDmi6oPYG3xpIP7xZggkmmOCPYJcKoIWgYzhICsjgmrcBSo4RJ2eFX8kAAAAASUVORK5CYII="
												alt="Rasos"
											/>
										</td>
										<td>Rasos</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWklEQVQ4je3UMRHAMAwEwSuMILUMRLCEJLCEIAgsBCGQFPaEgDypdAB2vvr2XONgYw3g9IFHpCAVwbRP0CPwcSe3BcYCd1ZggQUW+COoIkD+YD/QtGP05LbZC6UXEtJ+HetKAAAAAElFTkSuQmCC"
												alt="Senamiestis"
											/>
										</td>
										<td>Senamiestis</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAT0lEQVQ4je3MMRHAQAhFwVdQU6THzomOgJMQA98BClJkUMDNpGEFrG3p4iADuCWU2YrCnRXxhcrkaYbFjiwTTjjhhP+E4d6O6jCAFdEOywvX1w9itYTUKgAAAABJRU5ErkJggg=="
												alt="Verkiai"
											/>
										</td>
										<td>Verkiai</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWElEQVQ4je3OMRWAMAwA0RuqgDkKGiE1UlkYQQEKUgONkA6AgvQx5QT8d8XmPNhYATjtYriHoCpC1/aAw53bLb6n7+HOEkwwwQR/BKtIGPqMAtC1gYZNABYXqBAM6avMgwAAAABJRU5ErkJggg=="
												alt="Vilkpėdė"
											/>
										</td>
										<td>Vilkpėdė</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAXUlEQVQ4je3OMRXAIAxF0T+goHMwEBRECCorpAqIgdRAUNCBAQHhdMoTcM8r7n7hYAUAnveG2ghBXBuE+gLVBmxqbM2wwZMlmGCCCf4Icm2AxSCubYNCHUI9+Lb6AD7gExeMsILAAAAAAElFTkSuQmCC"
												alt="Viršuliškės"
											/>
										</td>
										<td>Viršuliškės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVklEQVQ4je3OMRHAIBQE0S2or0iPD3QhJLaCgSjAwSlIE2bSfybVXwFvttxzHmysAGieyCMEWQ3X/oIe4CsECvA63FmCCSaY4I+g1VAQstoHrB0HwdUDSsgScPXhyUYAAAAASUVORK5CYII="
												alt="Šeškinė"
											/>
										</td>
										<td>Šeškinė</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVUlEQVQ4jWPZcfWxEAMVAQsDAwOD7NU+BoZPJygzic+C4bF2EcRAhk8nGPieHKfIvE8ySC6kJhg1cNTAUQNHDaSngXwW8PKMbMBngTDwsXYRhaYhAADpJQ9uf4w06gAAAABJRU5ErkJggg=="
												alt="Šnipiškės"
											/>
										</td>
										<td>Šnipiškės</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAXklEQVQ4je3UMRGAMAxA0T90ZmAmCmogRuoOB/jgMFAMNAqqgKF3ICA9pnwBb/xpP9vKxBLAdh3Qqk+SjGkZIK2y2O3yOsALTizAAAMM8E9Q8viZJ8kfaFpAi5cE4AGavRAnBULgIgAAAABJRU5ErkJggg=="
												alt="Žirmūnai"
											/>
										</td>
										<td>Žirmūnai</td>
									</tr>
									<tr valign="middle">
										<td>
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVUlEQVQ4je3UMRGAQAxE0V9EAXUcrJ5TiZ5g4GIABxQ3YCA3VPkC3my1ds842JgBxBlkZAlyORpaYEaS1yyv+8CdNdhggw3+CLq8DL2GwTpGDZVRgAfkbhENwzA+xgAAAABJRU5ErkJggg=="
												alt="Žvėrynas"
											/>
										</td>
										<td>Žvėrynas</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</Box>
	)
}

export default VisualizationTab
