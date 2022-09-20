import React from "react";
import "./Instruction.css";

export default function Instruction({showInstructionCondition, instructions}) {
	return (
		<div
			className={showInstructionCondition ? "instructions" : "offscreen"}
		>
			<p>
				<i
					className="fa-solid fa-circle-info"
					style={{ paddingRight: "5px" }}
				></i>
				{/* Use more than 6 characters for your password! */}
                {instructions}
			</p>
		</div>
	);
}
