"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { PlanetTag } from "@/lib/planetTags";

type KnowledgePlanetProps = {
  tags: PlanetTag[];
};

function drawBlob(
  context: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  color: string,
  seed: number
) {
  context.beginPath();
  const points = 28;
  for (let i = 0; i <= points; i += 1) {
    const angle = (Math.PI * 2 * i) / points;
    const wobble = 0.82 + Math.sin(i * 1.7 + seed) * 0.12 + Math.cos(i * 2.6 + seed) * 0.08;
    const x = cx + Math.cos(angle) * rx * wobble;
    const y = cy + Math.sin(angle) * ry * wobble;
    if (i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }
  context.closePath();
  context.fillStyle = color;
  context.fill();
}

function createEarthTexture(size: number) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size / 2;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const ocean = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  ocean.addColorStop(0, "#1f6f8b");
  ocean.addColorStop(0.46, "#5fb2bf");
  ocean.addColorStop(1, "#153f63");
  context.fillStyle = ocean;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.globalAlpha = 0.32;
  for (let i = 0; i < 18; i += 1) {
    context.beginPath();
    context.strokeStyle = i % 2 === 0 ? "#d9f5f2" : "#9ad5cf";
    context.lineWidth = size * 0.0018;
    const y = canvas.height * (0.14 + i * 0.043);
    context.moveTo(0, y + Math.sin(i) * 8);
    for (let x = 0; x <= canvas.width; x += 30) {
      context.lineTo(x, y + Math.sin(x * 0.015 + i) * 5);
    }
    context.stroke();
  }
  context.globalAlpha = 1;

  const land = "#7cad81";
  const landSoft = "#9bc094";
  const landDark = "#5e8d75";
  [
    [0.18, 0.34, 0.11, 0.16, land, 1.1],
    [0.28, 0.58, 0.08, 0.17, landDark, 2.4],
    [0.49, 0.38, 0.14, 0.12, landSoft, 4.1],
    [0.62, 0.52, 0.09, 0.16, land, 5.6],
    [0.76, 0.35, 0.13, 0.13, landDark, 7.3],
    [0.85, 0.62, 0.08, 0.1, landSoft, 9.1],
    [0.39, 0.72, 0.15, 0.08, land, 11.2]
  ].forEach(([x, y, rx, ry, color, seed]) => {
    drawBlob(context, canvas.width * Number(x), canvas.height * Number(y), canvas.width * Number(rx), canvas.height * Number(ry), String(color), Number(seed));
  });

  context.globalAlpha = 0.38;
  context.fillStyle = "#edf7f3";
  context.fillRect(0, 0, canvas.width, canvas.height * 0.06);
  context.fillRect(0, canvas.height * 0.92, canvas.width, canvas.height * 0.08);
  context.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function createCloudTexture(size: number) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size / 2;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 0.42;
  context.strokeStyle = "#ffffff";
  context.lineCap = "round";

  for (let i = 0; i < 32; i += 1) {
    context.beginPath();
    context.lineWidth = size * (0.003 + (i % 4) * 0.001);
    const y = canvas.height * (0.16 + ((i * 37) % 70) / 100);
    const start = canvas.width * (((i * 19) % 100) / 100);
    context.moveTo(start, y);
    for (let step = 0; step < 7; step += 1) {
      const x = start + step * size * 0.055;
      context.lineTo(x, y + Math.sin(step + i) * size * 0.009);
    }
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function KnowledgePlanet({ tags }: KnowledgePlanetProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const compact = window.matchMedia("(max-width: 680px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldAnimate = !reducedMotion;
    const rotationSpeed = compact ? 0.0008 : 0.0016;
    const cloudRotationSpeed = compact ? 0.0004 : 0.0008;
    const textureSize = 1024;
    const segmentCount = compact ? 64 : 96;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0.92, compact ? 8.05 : 7.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !compact,
      powerPreference: "low-power"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.5 : 1.6));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.set(0.08, -0.38, -0.08);
    if (compact) {
      group.scale.setScalar(0.84);
      group.position.y = 0.18;
    }
    scene.add(group);

    const earthTexture = createEarthTexture(textureSize);
    const cloudTexture = createCloudTexture(textureSize);

    scene.add(new THREE.AmbientLight(0xbfd7e4, 1.8));

    const sun = new THREE.DirectionalLight(0xffffff, 3.1);
    sun.position.set(4.8, 3.2, 5.5);
    scene.add(sun);

    const rim = new THREE.PointLight(0x7aa9c8, 1.4, 18);
    rim.position.set(-4.2, 0.6, 2.5);
    scene.add(rim);

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(2.05, segmentCount, segmentCount / 2),
      new THREE.MeshPhysicalMaterial({
        map: earthTexture ?? undefined,
        color: earthTexture ? 0xffffff : 0x6eb5bd,
        roughness: 0.72,
        metalness: 0,
        clearcoat: 0.18,
        clearcoatRoughness: 0.68
      })
    );
    group.add(globe);

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(2.095, segmentCount, segmentCount / 2),
      new THREE.MeshStandardMaterial({
        map: cloudTexture ?? undefined,
        color: 0xffffff,
        transparent: true,
        opacity: compact ? 0.2 : 0.32,
        depthWrite: false,
        roughness: 1
      })
    );
    group.add(clouds);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.34, segmentCount, segmentCount / 2),
      new THREE.MeshBasicMaterial({
        color: 0x9ed8ef,
        transparent: true,
        opacity: compact ? 0.14 : 0.2,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
      })
    );
    group.add(atmosphere);

    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xf3a45f });
    [
      [-1.34, 0.88, 1.2],
      [1.48, 0.3, 1.12],
      [0.28, -1.3, 1.58],
      [-1.08, -0.75, -1.32],
      [1.18, 0.98, -0.58]
    ].forEach(([x, y, z], index) => {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(index % 2 === 0 ? 0.055 : 0.045, 18, 12),
        nodeMaterial
      );
      node.position.set(x, y, z).normalize().multiplyScalar(2.21);
      group.add(node);
    });

    const orbitColors = [0x8aa6c2, 0x7465aa, 0xd9965f];
    orbitColors.forEach((color, index) => {
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: compact ? 0.18 : 0.32
      });
      const curve = new THREE.EllipseCurve(0, 0, 3.18, 0.78 + index * 0.24, 0, Math.PI * 2);
      const points = curve.getPoints(compact ? 96 : 180).map((point) => new THREE.Vector3(point.x, point.y, 0));
      const orbit = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
      orbit.rotation.x = Math.PI / 2 + index * 0.16;
      orbit.rotation.z = index * 0.53;
      group.add(orbit);
    });

    let dragging = false;
    let visible = true;
    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const renderScene = () => renderer.render(scene, camera);

    const animate = () => {
      if (!shouldAnimate || !visible) {
        frame = 0;
        return;
      }

      frame = requestAnimationFrame(animate);
      if (!dragging) {
        group.rotation.y += rotationSpeed;
        clouds.rotation.y += cloudRotationSpeed;
        group.rotation.x = 0.06 + Math.sin(Date.now() * 0.00026) * 0.035;
      }
      renderScene();
    };

    const start = () => {
      if (shouldAnimate && visible && frame === 0) {
        frame = requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const pointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      stop();
      host.setPointerCapture?.(event.pointerId);
    };

    const pointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      group.rotation.y += dx * 0.006;
      group.rotation.x += dy * 0.004;
      lastX = event.clientX;
      lastY = event.clientY;
      renderScene();
    };

    const pointerUp = (event: PointerEvent) => {
      dragging = false;
      host.releasePointerCapture?.(event.pointerId);
      start();
    };

    const resize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderScene();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          renderScene();
          start();
        } else {
          stop();
        }
      },
      { threshold: 0.12 }
    );
    intersectionObserver.observe(host);

    host.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);

    renderScene();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);

      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.Line)) return;
        object.geometry.dispose();
        const material = object.material;
        if (Array.isArray(material)) {
          material.forEach((item) => item.dispose());
        } else {
          material.dispose();
        }
      });
      earthTexture?.dispose();
      cloudTexture?.dispose();
      renderer.dispose();
      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
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
