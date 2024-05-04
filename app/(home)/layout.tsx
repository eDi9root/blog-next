import RightBar from "@/components/Right/RightBar";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			{children}
		</>
	);
}