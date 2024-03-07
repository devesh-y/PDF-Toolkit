import {PdfToolCard} from "@/components/PdfToolCard";
import {BookType, FileArchive, Image, Merge, Scaling, SendToBack} from "lucide-react";
export type toolType={
	title:string,
	content:string,
	pageName:string
}
export const HomePage=()=>{
	const tools:toolType[]=[{
		"title":"Merge PDF",
		"content":"Combine PDFs in the order you want with the easiest PDF merger available.",
		"pageName":"mergePdf"
	},{
		"title":"Organize PDF",
		"content":"Sort, add and delete PDF pages.\n" +
			"Drag and drop the page thumbnails and sort them in our PDF organizer.",
		"pageName":"organizePdf"
	},{
		"title":"Resize PDF",
		"content":"Change file size while optimizing for maximal PDF quality.",
		"pageName":"resizePdf"
	},{
		"title":"Edit PDF",
		"content":"Edit PDF by adding text, shapes, comments and highlights. Your secure and simple tool to edit PDF.",
		"pageName":"editPdf"
	},{
		"title":"PDF to Image",
		"content":"Convert each PDF page into a image or extract all images contained in a PDF.",
		"pageName":"pdfToImage"
	},{
		"title":"Image to PDF",
		"content":"Convert images to PDF in seconds. Easily adjust orientation and margins.",
		"pageName":"imageToPdf"
	},{
		"title":"Sign PDF",
		"content":"Your tool to eSign documents. Sign a document yourself or send a signature request to others.",
		"pageName":"signPdf"
	}]
	return <div className={"h-screen bg-gray-800 overflow-auto"}>

		{/*tools*/}
		<div className={"flex flex-wrap justify-center gap-2 mx-auto w-11/12"}>
			<PdfToolCard  info={tools[0]}>
				<Merge size={30} />
			</PdfToolCard>
			<PdfToolCard  info={tools[1]}>
				<SendToBack size={30} />
			</PdfToolCard>
			<PdfToolCard  info={tools[2]}>
				<Scaling size={30} />
			</PdfToolCard>
			<PdfToolCard  info={tools[3]}>
				<BookType size={30} />
			</PdfToolCard>
			<PdfToolCard  info={tools[4]}>
				<Image size={30} />
			</PdfToolCard>
			<PdfToolCard  info={tools[5]}>
				<FileArchive size={30} />
			</PdfToolCard>
		</div>

	</div>
}