"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { PlanetTag } from "@/lib/planetTags";

type KnowledgePlanetProps = {
  tags: PlanetTag[];
};

export function KnowledgePlanet({ tags }: KnowledgePlanetProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 1.05, 7.1);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    scene.add(new THREE.AmbientLight(0xffffff, 1.45));

    const key = new THREE.DirectionalLight(0xffffff, 2.3);
    key.position.set(4, 4, 5);
    scene.add(key);

    const coolFill = new THREE.PointLight(0x6e9db4, 1.2, 16);
    coolFill.position.set(-4, -1, 3);
    scene.add(coolFill);

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(2.05, 96, 64),
      new THREE.MeshStandardMaterial({
        color: 0xa8d3d0,
        roughness: 0.64,
        metalness: 0.04,
        transparent: true,
        opacity: 0.96
      })
    );
    group.add(globe);

    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(2.068, 40, 26),
      new THREE.MeshBasicMaterial({
        color: 0xf2fbfa,
        wireframe: true,
        transparent: true,
        opacity: 0.25
      })
    );
    group.add(wire);

    const landMaterial = new THREE.MeshStandardMaterial({
      color: 0x8ebf9e,
      roughness: 0.7,
      transparent: true,
      opacity: 0.54
    });

    [
      [-0.8, 0.75, 0.35, 0.52, 0.24],
      [0.72, 0.48, -0.45, 0.42, 0.2],
      [0.32, -0.55, 0.82, 0.5, 0.18],
      [-0.35, -0.2, -0.9, 0.32, 0.16],
      [0.98, -0.2, 0.1, 0.26, 0.13]
    ].forEach(([x, y, z, sx, sy]) => {
      const normal = new THREE.Vector3(x, y, z).normalize();
      const patch = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 14), landMaterial);
      patch.scale.set(sx, sy, 0.035);
      patch.position.copy(normal.clone().multiplyScalar(2.09));
      patch.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      group.add(patch);
    });

    const nodeMaterial = new THREE.MeshStandardMaterial({ color: 0xd9965f, roughness: 0.4 });
    const nodePositions = [
      [-1.4, 0.9, 1.2],
      [1.55, 0.25, 1.1],
      [0.3, -1.35, 1.55],
      [-1.1, -0.8, -1.35],
      [1.25, 1.05, -0.55]
    ];
    nodePositions.forEach(([x, y, z], index) => {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(index % 2 === 0 ? 0.09 : 0.065, 18, 12),
        nodeMaterial
      );
      node.position.set(x, y, z).normalize().multiplyScalar(2.19);
      group.add(node);
    });

    const orbitColors = [0x8aa6c2, 0x7465aa, 0xd9965f];
    orbitColors.forEach((color, index) => {
      const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.34 });
      const curve = new THREE.EllipseCurve(0, 0, 3.25, 0.82 + index * 0.22, 0, Math.PI * 2);
      const points = curve.getPoints(180).map((point) => new THREE.Vector3(point.x, point.y, 0));
      const orbit = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
      orbit.rotation.x = Math.PI / 2 + index * 0.16;
      orbit.rotation.z = index * 0.53;
      group.add(orbit);
    });

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(2.45, 64, 32),
      new THREE.MeshBasicMaterial({ color: 0xe8f2f0, transparent: true, opacity: 0.23 })
    );
    group.add(halo);

    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const pointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
    };

    const pointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      group.rotation.y += dx * 0.008;
      group.rotation.x += dy * 0.006;
      lastX = event.clientX;
      lastY = event.clientY;
    };

    const pointerUp = () => {
      dragging = false;
    };

    const resize = () => {
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };

    host.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);
    window.addEventListener("resize", resize);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!dragging) {
        group.rotation.y += 0.0032;
        group.rotation.x = Math.sin(Date.now() * 0.00045) * 0.06;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="planet-shell">
      <div ref={hostRef} className="planet-canvas" aria-label="Interactive industrial AI knowledge planet" />
      <div className="planet-tags" aria-hidden="true">
        {tags.map((tag, index) => (
          <span className={`tag-${tag.tone ?? "blue"}`} key={tag.label} style={{ ["--i" as string]: index }}>
            <i />
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}
