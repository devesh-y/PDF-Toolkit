import {memo, ReactNode} from "react";
import {toolType} from "@/pages/HomePage";
import {Link} from "react-router-dom";

export const PdfToolCard=memo(({info,children}: { info:toolType,children:ReactNode })=>{
	return <Link to={`/${info.pageName}`} className="w-60 bg-white p-4 rounded-xl">
		{children}
		<p className={"text-xl font-bold"}>{info.title}</p>
		<p className={"text-sm text-gray-600"}>{info.content}</p>
	</Link>
})
