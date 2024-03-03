import React, {memo, useCallback, useState} from "react";

export const DragDrop=memo(({files}:{files:File[]})=>{
	const [items,setItems]=useState(files)

	const dragStartFunc=useCallback((e: React.DragEvent<HTMLDivElement>)=>{
		e.dataTransfer.setData("from",e.currentTarget.id)
	},[])

	const dragEnterFunc=useCallback((e:React.DragEvent<HTMLDivElement>)=>{
		(e.currentTarget as HTMLDivElement).style.opacity="0.5"
		e.preventDefault();
	},[])

	const dragOverFunc=useCallback((e:React.DragEvent<HTMLDivElement>)=>{
		e.preventDefault();
	},[])

	const dropFunc=useCallback((e:React.DragEvent<HTMLDivElement>)=>{
		e.preventDefault();
		(e.currentTarget as HTMLDivElement).style.opacity="1"
		const prevId=(e.dataTransfer.getData("from")).split(" ")[0];
		const currId=(e.currentTarget.id).split(" ")[0];
		const newArray=items.map((item)=>item);
		[newArray[Number(prevId)],newArray[Number(currId)]]=[newArray[Number(currId)],newArray[Number(prevId)]]
		setItems(newArray);
	},[items])

	const dragLeaveFunc=useCallback((e:React.DragEvent<HTMLDivElement>)=>{
		e.preventDefault();
		let targetRect=e.currentTarget.getBoundingClientRect();
		if( e.clientX<=0 || e.clientY<=0 || (e.pageX<=targetRect.left) || (e.pageX>=targetRect.right) || (e.pageY<=targetRect.top) || (e.pageY)>=targetRect.bottom) {
			(e.currentTarget as HTMLDivElement).style.opacity="1"
		}

	},[])

	return <div className={"w-full flex flex-wrap gap-4"}>
		{items.map((value,index)=>{
			return <div id={index+" d&d"} key={index} draggable={true} onDragStart={dragStartFunc} onDragLeave={dragLeaveFunc} onDragEnter={dragEnterFunc} onDragOver={dragOverFunc} onDrop={dropFunc} className={"flex items-center justify-center w-40 h-40 bg-blue-700 rounded-xl"}>
				<p>{value.size}</p>
			</div>
		})}
	</div>

})