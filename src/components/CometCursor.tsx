"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type Coord = {
	x: number,
	y: number
}

const Canvas = styled.canvas`
  width: 100vw;
  height: 100vh;
`;

const CommetTail = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 500;
	pointer-events: none;
`

const Commet = styled.div`
	--size-outer: 36px;
	--size-inner: 5px;
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: var(--size-outer);
	height: var(--size-outer);
	pointer-events: none;
`

const CommetCore = styled.div`
	width: 100%;
	height: 100%;
	max-width: var(--size-inner);
	max-height: var(--size-inner);
	border-radius: 50%;
	border: 4px solid var(--green);
	box-shadow: 0 0 10px 1px var(--green);
	background-color: transparent;
`

const COMET_SIZE = 0

export const CometCursor = () => {
	const cvsRef = useRef<HTMLCanvasElement>(null)
	const mouseRef = useRef<MouseEvent[]>([])
	const isDrawing = useRef<Boolean>(false)
	const cometHead = useRef<MouseEvent>()

	const [cometHeadPos, setCometHeadPos] = useState<Coord>({ x: 0, y: 0 })

	const getCvsOrNull = useCallback((): HTMLCanvasElement | null => cvsRef.current || null, [])

	const getCtxOrNull = useCallback((): CanvasRenderingContext2D | null => {
		const cvs = getCvsOrNull()
		const ctx = cvs?.getContext("2d") || null

		return ctx
	}, [getCvsOrNull])

	const drawShape = useCallback((
		mouseEvent: MouseEvent
	): boolean => {
		const cvs = getCvsOrNull()
		const ctx = getCtxOrNull()
		if (!ctx || !cvs) return false

		ctx.clearRect(0, 0, cvs.width, cvs.height)

		const x = mouseEvent.clientX
		const y = mouseEvent.clientY

		ctx.beginPath()
		ctx.arc(x, y, COMET_SIZE, 0, 2 * Math.PI, true)
		ctx.fillStyle = `#e6f1ff`
		ctx.fill();

		return true
	}, [getCtxOrNull, getCvsOrNull])


	const drawComet = useCallback(() => {
		const mouseEvent = mouseRef.current.shift()

		if (mouseEvent) {
			isDrawing.current = drawShape(mouseEvent)
			requestAnimationFrame(drawComet);
		} else {
			isDrawing.current = false
		}
	}, [drawShape])

	/**
	 * Init event
	 */
	useEffect(() => {
		const cvs = cvsRef.current
		if (cvs) {
			const mouseMoveEventHandler = (mouseEvent: MouseEvent) => {
				mouseRef.current.push(mouseEvent)
				setCometHeadPos({
					x: mouseEvent.clientX,
					y: mouseEvent.clientY
				})
				if (!isDrawing.current) {
					cometHead.current = mouseEvent
					drawComet()
				}
			}

			window.addEventListener("mousemove", mouseMoveEventHandler, false)

			return () => {
				window.removeEventListener("mousemove", mouseMoveEventHandler)
			};
		}
	}, [drawComet])

	/**
	 * Init cvs
	 */
	useEffect(() => {
		const setcvsSize = () => {
			const cvs = cvsRef.current;
			if (cvs) {
				cvs.width = window.innerWidth;
				cvs.height = window.innerHeight;
			}
		}

		setcvsSize()

		window.addEventListener('resize', setcvsSize)

		return () => {
			window.removeEventListener("resize", setcvsSize)
		};
	}, [])

	return (
		<>
			<div>
				<Commet
					style={{
						transform: `translate3d(${cometHeadPos.x - 20}px, ${cometHeadPos.y - 20}px, 0px)`
					}}
				>
					<CommetCore />
				</Commet>
				<CommetTail>
					<Canvas ref={cvsRef} />
				</CommetTail>
			</div>
		</>
	)
}