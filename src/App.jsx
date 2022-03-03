/* eslint-disable */

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
	useBoolean,
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
		laces: {
			color: '#ffffff',
			set: null,
		},
		mesh: {
			color: '#ffffff',
			set: null,
		},
		caps: {
			color: '#ffffff',
			set: null,
		},
		inner: {
			color: '#ffffff',
			set: null,
		},
		sole: {
			color: '#ffffff',
			set: null,
		},
		stripes: {
			color: '#ffffff',
			set: null,
		},
		band: {
			color: '#ffffff',
			set: null,
		},
		patch: {
			color: '#ffffff',
			set: null,
		},
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
				material-color={snap.items.laces.color}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_1.geometry}
				material={materials.mesh}
				material-color={snap.items.mesh.color}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_2.geometry}
				material={materials.caps}
				material-color={snap.items.caps.color}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_3.geometry}
				material={materials.inner}
				material-color={snap.items.inner.color}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_4.geometry}
				material={materials.sole}
				material-color={snap.items.sole.color}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_5.geometry}
				material={materials.stripes}
				material-color={snap.items.stripes.color}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_6.geometry}
				material={materials.band}
				material-color={snap.items.band.color}
			/>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.shoe_7.geometry}
				material={materials.patch}
				material-color={snap.items.patch.color}
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

	const [flag, setFlag] = useBoolean();

	const red = '#721121';
	const blue = '#035e7b';
	const green = '#3ec300';
	const black = '#0c1713';
	const white = '#ffffff';



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
							onMouseEnter={() => {
								state.items.laces.color = red;
							}}
							onMouseLeave={() => {
								// alert(state.items.laces.set);
								state.items.laces.color = !state.items.laces.set ? white : state.items.laces.set;
							}}
							onClick={() => {
								state.items.laces.color = red
								state.items.laces.set = red
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.laces.color = green;
							}}
							onMouseLeave={() => {
								// alert(state.items.laces.set);
								state.items.laces.color = !state.items.laces.set ? white : state.items.laces.set;
							}}
							onClick={() => {
								state.items.laces.color = green
								state.items.laces.set = green
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.laces.color = blue;
							}}
							onMouseLeave={() => {
								// alert(state.items.laces.set);
								state.items.laces.color = !state.items.laces.set ? white : state.items.laces.set;
							}}
							onClick={() => {
								state.items.laces.color = blue
								state.items.laces.set = blue
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onMouseEnter={() => {
								state.items.laces.color = black;
							}}
							onMouseLeave={() => {
								// alert(state.items.laces.set);
								state.items.laces.color = !state.items.laces.set ? white : state.items.laces.set;
							}}
							onClick={() => {
								state.items.laces.color = black
								state.items.laces.set = black
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onMouseEnter={() => {
								state.items.laces.color = white;
							}}
							onMouseLeave={() => {
								// alert(state.items.laces.set);
								state.items.laces.color = !state.items.laces.set ? white : state.items.laces.set;
							}}
							onClick={() => {
								state.items.laces.color = white
								state.items.laces.set = white
							}}
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
							onMouseEnter={() => {
								state.items.mesh.color = red;
							}}
							onMouseLeave={() => {
								state.items.mesh.color = !state.items.mesh.set ? white : state.items.mesh.set;
							}}
							onClick={() => {
								state.items.mesh.color = red
								state.items.mesh.set = red
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.mesh.color = green;
							}}
							onMouseLeave={() => {
								state.items.mesh.color = !state.items.mesh.set ? white : state.items.mesh.set;
							}}
							onClick={() => {
								state.items.mesh.color = green
								state.items.mesh.set = green
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.mesh.color = blue;
							}}
							onMouseLeave={() => {
								state.items.mesh.color = !state.items.mesh.set ? white : state.items.mesh.set;
							}}
							onClick={() => {
								state.items.mesh.color = blue
								state.items.mesh.set = blue
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onMouseEnter={() => {
								state.items.mesh.color = black;
							}}
							onMouseLeave={() => {
								state.items.mesh.color = !state.items.mesh.set ? white : state.items.mesh.set;
							}}
							onClick={() => {
								state.items.mesh.color = black
								state.items.mesh.set = black
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onMouseEnter={() => {
								state.items.mesh.color = white;
							}}
							onMouseLeave={() => {
								state.items.mesh.color = !state.items.mesh.set ? white : state.items.mesh.set;
							}}
							onClick={() => {
								state.items.mesh.color = white
								state.items.mesh.set = white
							}}
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
							onMouseEnter={() => {
								state.items.caps.color = red;
							}}
							onMouseLeave={() => {
								state.items.caps.color = !state.items.caps.set ? white : state.items.caps.set;
							}}
							onClick={() => {
								state.items.caps.color = red
								state.items.caps.set = red
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.caps.color = green;
							}}
							onMouseLeave={() => {
								state.items.caps.color = !state.items.caps.set ? white : state.items.caps.set;
							}}
							onClick={() => {
								state.items.caps.color = green
								state.items.caps.set = green
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.caps.color = blue;
							}}
							onMouseLeave={() => {
								state.items.caps.color = !state.items.caps.set ? white : state.items.caps.set;
							}}
							onClick={() => {
								state.items.caps.color = blue
								state.items.caps.set = blue
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onMouseEnter={() => {
								state.items.caps.color = black;
							}}
							onMouseLeave={() => {
								state.items.caps.color = !state.items.caps.set ? white : state.items.caps.set;
							}}
							onClick={() => {
								state.items.caps.color = black
								state.items.caps.set = black
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onMouseEnter={() => {
								state.items.caps.color = white;
							}}
							onMouseLeave={() => {
								state.items.caps.color = !state.items.caps.set ? white : state.items.caps.set;
							}}
							onClick={() => {
								state.items.caps.color = white
								state.items.caps.set = white
							}}
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
							onMouseEnter={() => {
								state.items.inner.color = red;
							}}
							onMouseLeave={() => {
								state.items.inner.color = !state.items.inner.set ? white : state.items.inner.set;
							}}
							onClick={() => {
								state.items.inner.color = red
								state.items.inner.set = red
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.inner.color = green;
							}}
							onMouseLeave={() => {
								state.items.inner.color = !state.items.inner.set ? white : state.items.inner.set;
							}}
							onClick={() => {
								state.items.inner.color = green
								state.items.inner.set = green
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.inner.color = blue;
							}}
							onMouseLeave={() => {
								state.items.inner.color = !state.items.inner.set ? white : state.items.inner.set;
							}}
							onClick={() => {
								state.items.inner.color = blue
								state.items.inner.set = blue
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onMouseEnter={() => {
								state.items.inner.color = black;
							}}
							onMouseLeave={() => {
								state.items.inner.color = !state.items.inner.set ? white : state.items.inner.set;
							}}
							onClick={() => {
								state.items.inner.color = black
								state.items.inner.set = black
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onMouseEnter={() => {
								state.items.inner.color = white;
							}}
							onMouseLeave={() => {
								state.items.inner.color = !state.items.inner.set ? white : state.items.inner.set;
							}}
							onClick={() => {
								state.items.inner.color = white
								state.items.inner.set = white
							}}
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
							onMouseEnter={() => {
								state.items.sole.color = red;
							}}
							onMouseLeave={() => {
								state.items.sole.color = !state.items.sole.set ? white : state.items.sole.set;
							}}
							onClick={() => {
								state.items.sole.color = red
								state.items.sole.set = red
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.sole.color = green;
							}}
							onMouseLeave={() => {
								state.items.sole.color = !state.items.sole.set ? white : state.items.sole.set;
							}}
							onClick={() => {
								state.items.sole.color = green
								state.items.sole.set = green
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.sole.color = blue;
							}}
							onMouseLeave={() => {
								state.items.sole.color = !state.items.sole.set ? white : state.items.sole.set;
							}}
							onClick={() => {
								state.items.sole.color = blue
								state.items.sole.set = blue
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onMouseEnter={() => {
								state.items.sole.color = black;
							}}
							onMouseLeave={() => {
								state.items.sole.color = !state.items.sole.set ? white : state.items.sole.set;
							}}
							onClick={() => {
								state.items.sole.color = black
								state.items.sole.set = black
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onMouseEnter={() => {
								state.items.sole.color = white;
							}}
							onMouseLeave={() => {
								state.items.sole.color = !state.items.sole.set ? white : state.items.sole.set;
							}}
							onClick={() => {
								state.items.sole.color = white
								state.items.sole.set = white
							}}
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
							onMouseEnter={() => {
								state.items.stripes.color = red;
							}}
							onMouseLeave={() => {
								state.items.stripes.color = !state.items.stripes.set ? white : state.items.stripes.set;
							}}
							onClick={() => {
								state.items.stripes.color = red
								state.items.stripes.set = red
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.stripes.color = green;
							}}
							onMouseLeave={() => {
								state.items.stripes.color = !state.items.stripes.set ? white : state.items.stripes.set;
							}}
							onClick={() => {
								state.items.stripes.color = green
								state.items.stripes.set = green
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.stripes.color = blue;
							}}
							onMouseLeave={() => {
								state.items.stripes.color = !state.items.stripes.set ? white : state.items.stripes.set;
							}}
							onClick={() => {
								state.items.stripes.color = blue
								state.items.stripes.set = blue
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onMouseEnter={() => {
								state.items.stripes.color = black;
							}}
							onMouseLeave={() => {
								state.items.stripes.color = !state.items.stripes.set ? white : state.items.stripes.set;
							}}
							onClick={() => {
								state.items.stripes.color = black
								state.items.stripes.set = black
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onMouseEnter={() => {
								state.items.stripes.color = white;
							}}
							onMouseLeave={() => {
								state.items.stripes.color = !state.items.stripes.set ? white : state.items.stripes.set;
							}}
							onClick={() => {
								state.items.stripes.color = white
								state.items.stripes.set = white
							}}
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
							onMouseEnter={() => {
								state.items.band.color = red;
							}}
							onMouseLeave={() => {
								state.items.band.color = !state.items.band.set ? white : state.items.band.set;
							}}
							onClick={() => {
								state.items.band.color = red
								state.items.band.set = red
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.band.color = green;
							}}
							onMouseLeave={() => {
								state.items.band.color = !state.items.band.set ? white : state.items.band.set;
							}}
							onClick={() => {
								state.items.band.color = green
								state.items.band.set = green
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.band.color = blue;
							}}
							onMouseLeave={() => {
								state.items.band.color = !state.items.band.set ? white : state.items.band.set;
							}}
							onClick={() => {
								state.items.band.color = blue
								state.items.band.set = blue
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onMouseEnter={() => {
								state.items.band.color = black;
							}}
							onMouseLeave={() => {
								state.items.band.color = !state.items.band.set ? white : state.items.band.set;
							}}
							onClick={() => {
								state.items.band.color = black
								state.items.band.set = black
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onMouseEnter={() => {
								state.items.band.color = white;
							}}
							onMouseLeave={() => {
								state.items.band.color = !state.items.band.set ? white : state.items.band.set;
							}}
							onClick={() => {
								state.items.band.color = white
								state.items.band.set = white
							}}
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
							onMouseEnter={() => {
								state.items.patch.color = red;
							}}
							onMouseLeave={() => {
								state.items.patch.color = !state.items.patch.set ? white : state.items.patch.set;
							}}
							onClick={() => {
								state.items.patch.color = red
								state.items.patch.set = red
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-green-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.patch.color = green;
							}}
							onMouseLeave={() => {
								state.items.patch.color = !state.items.patch.set ? white : state.items.patch.set;
							}}
							onClick={() => {
								state.items.patch.color = green
								state.items.patch.set = green
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-blue-600 cursor-pointer"
							onMouseEnter={() => {
								state.items.patch.color = blue;
							}}
							onMouseLeave={() => {
								state.items.patch.color = !state.items.patch.set ? white : state.items.patch.set;
							}}
							onClick={() => {
								state.items.patch.color = blue
								state.items.patch.set = blue
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-black cursor-pointer"
							onMouseEnter={() => {
								state.items.patch.color = black;
							}}
							onMouseLeave={() => {
								state.items.patch.color = !state.items.patch.set ? white : state.items.patch.set;
							}}
							onClick={() => {
								state.items.patch.color = black
								state.items.patch.set = black
							}}
						/>
						<div
							className="border border-amber-200 w-10 h-10 bg-white cursor-pointer"
							onMouseEnter={() => {
								state.items.patch.color = white;
							}}
							onMouseLeave={() => {
								state.items.patch.color = !state.items.patch.set ? white : state.items.patch.set;
							}}
							onClick={() => {
								state.items.patch.color = white
								state.items.patch.set = white
							}}
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
			{/*<Picker />*/}
		</ChakraProvider>
	);
}
