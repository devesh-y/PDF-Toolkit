import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import * as pdfjsLib from "pdfjs-dist"
import {Loader2} from "lucide-react";
pdfjsLib.GlobalWorkerOptions.workerSrc = "./pdf.worker.js";
export const PdfPagePreview=memo(({file}:{file:File})=>{
	const canvasRef=useRef<null|HTMLCanvasElement>(null)
	const [loading,setLoading]=useState(true);
	const renderFirstPage = useCallback(async() => {
		try{
			const pdf=await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
			const page=await pdf.getPage(1);
			const viewport = page.getViewport({scale:1});

			const canvas = canvasRef.current!;
			const context = canvas.getContext('2d')!;

			canvas.height = viewport.height;
			canvas.width = viewport.width;
			const renderContext = {
				canvasContext: context,
				viewport: viewport
			};
			await page.render(renderContext).promise;
			setLoading(false);
		}catch (e){
			throw  new Error((e as Error).message);
		}

	}, [file])
	useEffect(() => {
		renderFirstPage().catch((e)=>{
			console.log(e)
		});
	}, [renderFirstPage]);
	return <div className={"w-full h-full"}>
		<div className={"h-[90%] flex justify-center items-center p-2"}>
			<canvas ref={canvasRef} className={"rounded-xl w-full h-full"}></canvas>
			{loading ? <Loader2 className={"animate-spin absolute"}/> : <></>}
		</div>
		<div className={"h-[10%] flex items-center justify-center"}>
			<p className={"line-clamp-1 text-center text-sm"} title={file.name}>{file.name}</p>
		</div>
	</div>


})