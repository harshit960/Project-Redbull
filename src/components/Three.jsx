import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const Three = () => {
    const ref = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true for a transparent background
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(4)
        ref.current.appendChild(renderer.domElement);
        const sizes = {
            width: window.innerWidth,
            Height: window.innerHeight,
        }
        // Add a directional light
        const light = new THREE.DirectionalLight(0xffffff, 40);
        light.position.set(40, 200, 150);
        scene.add(light);
        const group = new THREE.Group();

        const loader = new GLTFLoader();
        loader.load('redbull.glb', function (gltf) {
            gltf.scene.position.set(15.1, -2.1, 0); // replace x, y, z with the desired coordinates
            gltf.scene.scale.set(8, 6, 8); // replace x, y, z with the desired coordinates
            group.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });
        scene.add(group);

        camera.position.z = 15;
        group.rotation.y = -Math.PI * 0.05
        group.rotation.x = Math.PI * 0.07

        const animate = function () {
            requestAnimationFrame(animate);

            renderer.render(scene, camera);

        };
        // GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(group.position, {
            scrollTrigger: {
                trigger: "#trigger",
                start: "top top",
                end: "bottom top",
                scrub: true,
                toggleActions: "restart pause resume pause"
            },
            z: Math.PI/8,
            y: Math.PI/3,
            x: -Math.PI/6
        });
        animate();
        window.addEventListener('scroll', function () {
            if (group) {
                // camera.rotation.z +=0.01
                console.log()
            }
        });

    }, []);

    return <div className='fixed z-20 sm:scale-[0.3]' ref={ref} />;
};

export default Three;
