import React from "react";
import "./ErrorMessage.css"

export default function ErrorMessage({errMsg}) {
	return (
		<div className={errMsg ? "errmsg" : "offscreen"}>
			<i
				className="fa-solid fa-circle-info"
				style={{ paddingRight: "5px" }}
			></i>
			{errMsg}
		</div>
	);
}
