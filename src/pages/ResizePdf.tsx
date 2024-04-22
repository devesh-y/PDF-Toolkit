import {UploadFiles} from "@/components/UploadFiles";
import React, {useCallback, useRef, useState} from "react";
import {PDFDocument} from "pdf-lib";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Loader2} from "lucide-react";
import {renderPdfPage} from "@/lib/renderPdf";

export const ResizePdf=()=>{
	const [currentPage,setCurrentPage]=useState(1);
	const [uploaded,setUploaded]=useState(false);
	const [pdfDoc,setPdfDoc]=useState<PDFDocument|null>(null)
	const [loading,setLoading]=useState(true);
	const canvasRef=useRef<null|HTMLCanvasElement>(null)
	const getUploadedFiles=useCallback(async(files:File[])=>{
		setUploaded(true);
		const file=files[0];
		renderPdfPage(file,canvasRef,currentPage).then(()=>{
			setLoading(false);
		})

		const url=URL.createObjectURL(file);
		const res=await fetch(url);
		const arrayBuffer=await res.arrayBuffer()
		const srcDoc=await PDFDocument.load(arrayBuffer)
		setPdfDoc(srcDoc)
	},[currentPage])

	const changeMargin=useCallback(async ()=>{
		if(pdfDoc){
			const srcDoc=pdfDoc
			const increase=150;
			const pages=srcDoc.getPages();
			for(const page of pages){
				const { width, height } = page.getSize();
				const newWidth=width+increase*2;
				const newHeight=height+increase*2;
				page.setSize(newWidth,newHeight)
				page.translateContent(increase, increase);
			}
			const buffer=await srcDoc.save();
			const newFile=new File([buffer],"final",{type:"application/pdf"})
			const url=URL.createObjectURL(newFile);
			const res=await fetch(url);
			const arrayBuffer=await res.arrayBuffer()
			const newDoc=await PDFDocument.load(arrayBuffer)
			setPdfDoc(newDoc);
		}

		
	},[pdfDoc])

	const convertToPortrait=useCallback(async(all=false)=>{
		if(pdfDoc){
			let index;
			const pages=pdfDoc!.getPages();
			const start=all?0:currentPage;
			const end=all?pages.length:currentPage+1;

			for(index=start;index<end;index++){
				const page=pages[index]
				const {width,height} = page.getSize();
				//only if the page is in landscape
				if(width>=height){
					//making the height as twice of the landscape height
					//to have a good vertical white space margin
					page.setSize(height,height*1.5);

					const scale=height/width;
					page.scaleContent(scale,scale)
					const contentHeight=scale*height;
					const marginHeight=(height*1.5)-contentHeight;
					page.translateContent(0,marginHeight/2)
				}
			}


			const buffer=await pdfDoc!.save();
			const newDoc=await PDFDocument.load(buffer);
			setPdfDoc(newDoc);
			const newFile=new File([buffer],"final",{type:"application/pdf"})
			setLoading(true);
			renderPdfPage(newFile,canvasRef,currentPage).then(()=>{
				setLoading(false);
			})

		}

	},[currentPage, pdfDoc])

	const convertToLandscape=useCallback(async(all=false)=>{
		if(pdfDoc){
			let index;
			const pages=pdfDoc!.getPages();
			const start=all?0:currentPage;
			const end=all?pages.length:currentPage+1;

			for(index = start; index<end; index++){} {
				const page = pages[index];
				const {width, height} = page.getSize();
				if (height >= width) {

					page.setWidth(height)
					const marginWidth = height - width;
					page.translateContent(marginWidth / 2, 0)
				}
			}
			const buffer=await pdfDoc!.save();
			const newDoc=await PDFDocument.load(buffer);
			const newFile=new File([buffer],"final",{type:"application/pdf"})
			setPdfDoc(newDoc);
			setLoading(true);
			renderPdfPage(newFile,canvasRef,currentPage).then(()=>{
				setLoading(false);
			})


		}
	},[currentPage, pdfDoc])


	return <>
		{uploaded ? <>
				<div className={" mx-auto w-11/12 h-72 max-sm:h-28  overflow-auto select-none relative "}>
					<canvas ref={canvasRef} className={"border-2 rounded-xl mx-auto"} ></canvas>
						{loading && <Loader2 className={" absolute animate-spin top-1/2 left-1/2"}/>}

				</div>
			
				<Accordion type={"single"} collapsible={true}>
					<AccordionItem value="item-1">
						<AccordionTrigger>PDF Page Resize</AccordionTrigger>
						<AccordionContent>
							<div className={"flex flex-wrap gap-2 text-white text-md select-none"}>
								<div className={"p-4 bg-blue-400 rounded-xl hover:bg-blue-600"} onClick={()=>convertToPortrait()}>Portrait</div>
								<div className={"p-4 bg-blue-400 rounded-xl hover:bg-blue-600"} onClick={()=>convertToPortrait(true)}>Portrait All</div>
								<div className={"p-4 bg-blue-400 rounded-xl hover:bg-blue-600"} onClick={()=>convertToLandscape()}>Landscape</div>
								<div className={"p-4 bg-blue-400 rounded-xl hover:bg-blue-600"} onClick={()=>convertToLandscape(true)}>Landscape All</div>

							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Is it styled?</AccordionTrigger>
						<AccordionContent>
							Yes. It comes with default styles that matches the other
							components&apos; aesthetic.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>Is it animated?</AccordionTrigger>
						<AccordionContent>
							Yes. It&apos;s animated by default, but you can disable it if you
							prefer.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</>
			: <div className={"w-11/12 h-80 mx-auto"}>
				<UploadFiles getUploadedFiles={getUploadedFiles} fileType={"application/pdf"} multiple={false}/>
			</div>
		}


	</>
}
