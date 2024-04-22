
import {pdfjsLib} from "@/lib/pdfJs";

export const renderPdfPage = async(file:File, canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,pageNumber=1) => {
    try{
        const pdf=await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
        const page=await pdf.getPage(pageNumber);
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

    }catch (e){
        throw  new Error((e as Error).message);
    }

}