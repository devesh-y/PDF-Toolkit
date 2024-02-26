import {PdfToolCard} from "@/components/PdfToolCard";
export type toolType={
	title:string,
	content:string,
	icon:string,
	pageName:string
}
export const HomePage=()=>{
	const tools=[{
		"title":"Merge PDF",
		"icon":"arrow_or_edge",
		"content":"Combine PDFs in the order you want with the easiest PDF merger available.",
		"pageName":"mergePdf"
	},{
		"title":"Split PDF",
		"icon":"call_split",
		"content":"Separate one page or a whole set for easy conversion into independent PDF files.",
		"pageName":"splitPdf"
	},{
		"title":"Compress PDF",
		"icon":"compress",
		"content":"Reduce file size while optimizing for maximal PDF quality.",
		"pageName":"compressPdf"
	},{
		"title":"Edit PDF",
		"icon":"draw",
		"content":"Edit PDF by adding text, shapes, comments and highlights. Your secure and simple tool to edit PDF.",
		"pageName":"editPdf"
	},{
		"title":"PDF to Image",
		"icon":"photo_library",
		"content":"Convert each PDF page into a image or extract all images contained in a PDF.",
		"pageName":"pdfToImage"
	},{
		"title":"Image to PDF",
		"icon":"picture_as_pdf",
		"content":"Convert images to PDF in seconds. Easily adjust orientation and margins.",
		"pageName":"imageToPdf"
	},{
		"title":"Sign PDF",
		"icon":"signature",
		"content":"Your tool to eSign documents. Sign a document yourself or send a signature request to others.",
		"pageName":"signPdf"
	}]
	return <div className={"h-screen bg-gray-800 overflow-auto"}>

		{/*tools*/}
		<div className={"flex flex-wrap gap-2 mx-auto w-11/12"}>
			{tools.map((value,index)=>{
				return <PdfToolCard info={value} key={index}/>
			})}
		</div>

	</div>
}