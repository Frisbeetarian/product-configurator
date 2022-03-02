/* eslint-disable */
``
import React, {
	Suspense, useRef, useState, useEffect,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
	ContactShadows, Environment, useGLTF, OrbitControls,
} from '@react-three/drei';
import { HexColorPicker } from 'react-colorful';
import { proxy, useSnapshot } from 'valtio';

import {
	ChakraProvider,
	Popover,
	PopoverTrigger,
	PopoverContent,
	// PopoverHeader,
	PopoverBody,
	// PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	// PopoverAnchor,
	Button,
	// ButtonGroup
} from '@chakra-ui/react';

// 1. import `ChakraProvider` component
// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
	current: null,
	items: {
		laces: '#ffffff',
		mesh: '#ffffff',
		caps: '#ffffff',
		inner: '#ffffff',
		sole: '#ffffff',
		stripes: '#000',
		band: '#ffffff',
		patch: '#ffffff',
	},
});

function Shoe() {
	const ref = useRef();
	const snap = useSnapshot(state);
	// Drei's useGLTF hook sets up draco automatically, that's how
	// it differs from useLoader(GLTFLoader, url)
	// { nodes, materials } are extras that come from
	// useLoader, these do not exist in threejs/GLTFLoader
	// nodes is a named collection of meshes, materials a named collection of materials
	const { nodes, materials } = useGLTF('shoe-draco.glb');
	// Animate model
	// eslint-disable-next-line no-shadow
	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
		ref.current.rotation.x = Math.cos(t / 4) / 8;
		ref.current.rotation.y = Math.sin(t / 4) / 8;
		ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
	});

	// Cursor showing current color
	const [hovered, set] = useState(null);
	// eslint-disable-next-line consistent-return
	useEffect(() => {
		const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
		const auto = '<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>';
		if (hovered) {
			document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`;
			// eslint-disable-next-line no-return-assign
			return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`);
		}
	}, [hovered]);

	// Using the GLTFJSX output here to wire in app-state and hook up events
	return (
		<group
			ref={ref}
			dispose={null}
			/* eslint-disable-next-line no-sequences */
			onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
			onPointerOut={(e) => e.intersections.length === 0 && set(null)}
			/* eslint-disable-next-line no-return-assign */
			onPointerMissed={() => (state.current = null)}
			/* eslint-disable-next-line no-return-assign,no-sequences */
			onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}
		>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe.geometry}
				material={materials.laces}
				material-color={snap.items.laces}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_1.geometry}
				material={materials.mesh}
				material-color={snap.items.mesh}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_2.geometry}
				material={materials.caps}
				material-color={snap.items.caps}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_3.geometry}
				material={materials.inner}
				material-color={snap.items.inner}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_4.geometry}
				material={materials.sole}
				material-color={snap.items.sole}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_5.geometry}
				material={materials.stripes}
				material-color={snap.items.stripes}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_6.geometry}
				material={materials.band}
				material-color={snap.items.band}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_7.geometry}
				material={materials.patch}
				material-color={snap.items.patch}
			/>
		</group>
	);
}

function Picker() {
	const snap = useSnapshot(state);
	return (
	// eslint-disable-next-line react/jsx-no-comment-textnodes
		<div className="" style={{ display: snap.current ? 'block' : 'none' }}>
			{/* eslint-disable-next-line no-return-assign */}
			<HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
			<h1 className="text-5xl tracking-tighter ml-7">{snap.current}</h1>
		</div>
	);
}

function ContentBrowser() {
	// const snap = useSnapshot(state);

	return (
		<div
			style={{
				// top: '0',
				zIndex: '1000',
			}}
			className="flex absolute bottom-0 bg-black w-full h-24 justify-evenly place-content-center place-items-center box-content"
		>

			<Popover>
				<PopoverTrigger>
					<Button>Laces</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					{/* <PopoverHeader>Confirmation!</PopoverHeader> */}
					<PopoverBody className="flex justify-evenly">
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
						{/* eslint-disable-next-line no-return-assign,jsx-a11y/click-events-have-key-events */}
						<div
							className="border border-amber-200 w-10 h-10 bg-red-600 cursor-pointer"
							onClick={() => (state.items.laces = 'red')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onClick={() => (state.items.laces = 'green')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onClick={() => (state.items.laces = 'blue')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onClick={() => (state.items.laces = 'black')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onClick={() => (state.items.laces = 'white')}
						/>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger>
					<Button>Mesh</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					{/* <PopoverHeader>Confirmation!</PopoverHeader> */}
					<PopoverBody className="flex justify-evenly">
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
						{/* eslint-disable-next-line no-return-assign */}
						<div
							className="border border-amber-200 w-10 h-10 bg-red-600 cursor-pointer"
							onClick={() => (state.items.mesh = 'red')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onClick={() => (state.items.mesh = 'green')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onClick={() => (state.items.mesh = 'blue')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onClick={() => (state.items.mesh = 'black')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onClick={() => (state.items.mesh = 'white')}
						/>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger>
					<Button>Caps</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					{/* <PopoverHeader>Confirmation!</PopoverHeader> */}
					<PopoverBody className="flex justify-evenly">
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
						{/* eslint-disable-next-line no-return-assign */}
						<div
							className="border border-amber-200 w-10 h-10 bg-red-600 cursor-pointer"
							onClick={() => (state.items.caps = 'red')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onClick={() => (state.items.caps = 'green')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onClick={() => (state.items.caps = 'blue')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onClick={() => (state.items.caps = 'black')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onClick={() => (state.items.caps = 'white')}
						/>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger>
					<Button>Inner</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					{/* <PopoverHeader>Confirmation!</PopoverHeader> */}
					<PopoverBody className="flex justify-evenly">
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
						{/* eslint-disable-next-line no-return-assign */}
						<div
							className="border border-amber-200 w-10 h-10 bg-red-600 cursor-pointer"
							onClick={() => (state.items.inner = 'red')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onClick={() => (state.items.inner = 'green')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onClick={() => (state.items.inner = 'blue')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onClick={() => (state.items.inner = 'black')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onClick={() => (state.items.inner = 'white')}
						/>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger>
					<Button>Sole</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					{/* <PopoverHeader>Confirmation!</PopoverHeader> */}
					<PopoverBody className="flex justify-evenly">
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
						{/* eslint-disable-next-line no-return-assign */}
						<div
							className="border border-amber-200 w-10 h-10 bg-red-600 cursor-pointer"
							onClick={() => (state.items.sole = 'red')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onClick={() => (state.items.sole = 'green')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onClick={() => (state.items.sole = 'blue')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onClick={() => (state.items.sole = 'black')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onClick={() => (state.items.sole = 'white')}
						/>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger>
					<Button>Stripes</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					{/* <PopoverHeader>Confirmation!</PopoverHeader> */}
					<PopoverBody className="flex justify-evenly">
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
						{/* eslint-disable-next-line no-return-assign */}
						<div
							className="border border-amber-200 w-10 h-10 bg-red-600 cursor-pointer"
							onClick={() => (state.items.stripes = 'red')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onClick={() => (state.items.stripes = 'green')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onClick={() => (state.items.stripes = 'blue')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onClick={() => (state.items.stripes = 'black')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onClick={() => (state.items.stripes = 'white')}
						/>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger>
					<Button>Band</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					{/* <PopoverHeader>Confirmation!</PopoverHeader> */}
					<PopoverBody className="flex justify-evenly">
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
						{/* eslint-disable-next-line no-return-assign */}
						<div
							className="border border-amber-200 w-10 h-10 bg-red-600 cursor-pointer"
							onClick={() => (state.items.band = 'red')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onClick={() => (state.items.band = 'green')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onClick={() => (state.items.band = 'blue')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onClick={() => (state.items.band = 'black')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onClick={() => (state.items.band = 'white')}
						/>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger>
					<Button>Patch</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					{/* <PopoverHeader>Confirmation!</PopoverHeader> */}
					<PopoverBody className="flex justify-evenly">
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
						{/* eslint-disable-next-line no-return-assign */}
						<div
							className="border border-amber-200 w-10 h-10 bg-red-600 cursor-pointer"
							onClick={() => (state.items.patch = 'red')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onClick={() => (state.items.patch = 'green')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onClick={() => (state.items.patch = 'blue')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onClick={() => (state.items.patch = 'black')}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onClick={() => (state.items.patch = 'white')}
						/>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			{/* sole: '#ffffff', */}
			{/* stripes: '#000', */}
			{/* band: '#ffffff', */}
			{/* patch: '#ffffff', */}
			{/* eslint-disable-next-line max-len */}
			{/* eslint-disable-next-line no-return-assign,jsx-a11y/click-events-have-key-events,
			jsx-a11y/no-noninteractive-element-interactions */}
			{/* <p key={1} className="text-3xl text-white font-bold"
			 onClick={() => (state.items.mesh = 'red')}>option 1</p> */}
			{/* /!* eslint-disable-next-line max-len *!/ */}
			{/* /!* eslint-disable-next-line no-return-assign,jsx-a11y/click-events-
			have-key-events,jsx-a11y/no-noninteractive-element-interactions *!/ */}
			{/* <p key={2} className="text-3xl text-white font-bold" onClick={() =>
			(state.items.laces = '#010')}>option 2</p> */}
			{/* /!* eslint-disable-next-line max-len *!/ */}
			{/* /!* eslint-disable-next-line no-return-assign,jsx-a11y/click-events-
			have-key-events,jsx-a11y/no-noninteractive-element-interactions *!/ */}
			{/* <p key={3} className="text-3xl text-white font-bold" onClick={() =>
			(state.items.sole = 'yellow')}>option 3</p> */}
			{/* /!* eslint-disable-next-line max-len *!/ */}
			{/* /!* eslint-disable-next-line no-return-assign,jsx-a11y/click-events-
			have-key-events,jsx-a11y/no-noninteractive-element-interactions *!/ */}
			{/* <p key={4} className="text-3xl text-white font-bold" onClick={() =>
			(state.items.patch = 'green')}>option 4</p> */}
		</div>
	);
}

export default function App() {
	return (
		<ChakraProvider>
			<ContentBrowser style={{ zIndex: '1000' }} />

			<Canvas
				shadows
				dpr={[1, 2]}
				camera={{ position: [0, 0, 4], fov: 50 }}
				style={{ zIndex: '1' }}
				// className="bg-amber-900"
			>
				<ambientLight intensity={0.7} />
				<spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
				<Suspense fallback={null}>
					<Shoe />
					<Environment preset="city" />
					{/* eslint-disable-next-line max-len */}
					<ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
				</Suspense>
				{/* eslint-disable-next-line max-len */}
				<OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
			</Canvas>
			<Picker />
		</ChakraProvider>
	);
}
