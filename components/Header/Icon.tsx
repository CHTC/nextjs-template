import ChtcIconWEBP from "@/public/logos/chtc.webp";
import ChtcIconPNG from "@/public/logos/chtc.png";
import React, {CSSProperties} from "react";

const Icon = ({size = "100px"}: {size?: CSSProperties['width']}) => {

	const style = {
		height: "auto",
		width: size,
	}

	return (
		<picture>
			<source
					srcSet={ChtcIconWEBP.src}
					type="image/webp"
					style={style}
			/>
			<img
					src={ChtcIconPNG.src}
					alt="Badger Hub Icon"
					style={style}
			/>
		</picture>
	)
}

export default Icon;
