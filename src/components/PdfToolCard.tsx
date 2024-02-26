import {memo} from "react";
import {toolType} from "@/pages/HomePage";
import {Link} from "react-router-dom";

export const PdfToolCard=memo(({info}: { info:toolType })=>{
	return <Link to={`/${info.pageName}`} className="w-60 bg-white p-4 rounded-xl">
		<span className="material-symbols-outlined w-[30px] h-[30px] flex items-center">
			{info.icon}
		</span>
		<p className={"text-xl font-bold"}>{info.title}</p>
		<p className={"text-sm text-gray-600"}>{info.content}</p>
	</Link>
})
