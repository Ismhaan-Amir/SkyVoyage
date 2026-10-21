import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight, Plane, X } from 'lucide-react';

interface AirplaneIntroProps {
  onComplete: () => void;
}

export const AirplaneIntro: React.FC<AirplaneIntroProps> = ({ onComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Light sky blue
    scene.fog = new THREE.FogExp2(0xc2e2fa, 0.012);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 25);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0x76b6fe, 0xffffff, 0.6);
    scene.add(hemisphereLight);

    const sunLight = new THREE.DirectionalLight(0xfff6e5, 1.8);
    sunLight.position.set(20, 40, 20);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xa5d8ff, 1.0);
    rimLight.position.set(-20, -10, -20);
    scene.add(rimLight);

    // -------------------------------------------------------------
    // Build Procedural 3D Commercial Airliner (SkyVoyage Jet)
    // -------------------------------------------------------------
    const planeGroup = new THREE.Group();

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xfcfcfc,
      roughness: 0.25,
      metalness: 0.15
    });

    const navyAccentMat = new THREE.MeshStandardMaterial({
      color: 0x10233f, // SkyVoyage Deep Navy
      roughness: 0.3,
      metalness: 0.3
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xdfa036, // Warm Gold Accent
      roughness: 0.2,
      metalness: 0.8
    });

    const cockpitGlassMat = new THREE.MeshStandardMaterial({
      color: 0x0a1128,
      roughness: 0.1,
      metalness: 0.9
    });

    const engineInteriorMat = new THREE.MeshStandardMaterial({
      color: 0x222225,
      roughness: 0.7,
      metalness: 0.5
    });

    // 1. Fuselage
    const fuselageGeo = new THREE.CylinderGeometry(1.05, 0.8, 11, 24);
    fuselageGeo.rotateX(Math.PI / 2);
    const fuselage = new THREE.Mesh(fuselageGeo, bodyMat);
    planeGroup.add(fuselage);

    // Nose Cone
    const noseGeo = new THREE.ConeGeometry(1.05, 3.2, 24);
    noseGeo.rotateX(-Math.PI / 2);
    const nose = new THREE.Mesh(noseGeo, bodyMat);
    nose.position.set(0, 0, 7.1);
    planeGroup.add(nose);

    // Cockpit Visor
    const visorGeo = new THREE.BoxGeometry(1.2, 0.45, 1.2);
    const visor = new THREE.Mesh(visorGeo, cockpitGlassMat);
    visor.position.set(0, 0.55, 6.2);
    visor.rotation.x = -Math.PI / 8;
    planeGroup.add(visor);

    // Tail Taper
    const tailTaperGeo = new THREE.ConeGeometry(0.8, 4.0, 24);
    tailTaperGeo.rotateX(Math.PI / 2);
    const tailTaper = new THREE.Mesh(tailTaperGeo, bodyMat);
    tailTaper.position.set(0, 0.2, -7.5);
    planeGroup.add(tailTaper);

    // 2. Wings (Swept-back aerodynamic shape)
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(1.8, 0);
    wingShape.lineTo(7.5, -4.5);
    wingShape.lineTo(7.2, -5.2);
    wingShape.lineTo(0, -2.5);
    wingShape.closePath();

    const extrudeSettings = { depth: 0.18, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
    const wingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
    wingGeo.rotateX(Math.PI / 2);

    // Left Wing
    const leftWing = new THREE.Mesh(wingGeo, bodyMat);
    leftWing.position.set(0.6, -0.2, 1.8);
    leftWing.rotation.z = -0.06; // Dihedral angle
    planeGroup.add(leftWing);

    // Right Wing
    const rightWing = new THREE.Mesh(wingGeo, bodyMat);
    rightWing.position.set(-0.6, -0.2, 1.8);
    rightWing.scale.set(-1, 1, 1);
    rightWing.rotation.z = 0.06;
    planeGroup.add(rightWing);

    // Winglet tips (upward curved)
    const wingletGeo = new THREE.BoxGeometry(0.12, 0.9, 0.7);
    const leftWinglet = new THREE.Mesh(wingletGeo, goldAccentMat);
    leftWinglet.position.set(7.5, 0.35, -2.8);
    leftWinglet.rotation.z = 0.25;
    planeGroup.add(leftWinglet);

    const rightWinglet = new THREE.Mesh(wingletGeo, goldAccentMat);
    rightWinglet.position.set(-7.5, 0.35, -2.8);
    rightWinglet.rotation.z = -0.25;
    planeGroup.add(rightWinglet);

    // 3. Turbofan Engines
    const engineGeo = new THREE.CylinderGeometry(0.55, 0.52, 2.6, 20);
    engineGeo.rotateX(Math.PI / 2);

    const fanSpinnerGeo = new THREE.ConeGeometry(0.25, 0.6, 16);
    fanSpinnerGeo.rotateX(-Math.PI / 2);

    // Left Engine
    const leftEngineGroup = new THREE.Group();
    const leftEngineNacelle = new THREE.Mesh(engineGeo, bodyMat);
    const leftEngineFan = new THREE.Mesh(fanSpinnerGeo, engineInteriorMat);
    leftEngineFan.position.z = 1.0;
    leftEngineGroup.add(leftEngineNacelle, leftEngineFan);
    leftEngineGroup.position.set(3.4, -0.85, 0.8);
    planeGroup.add(leftEngineGroup);

    // Right Engine
    const rightEngineGroup = new THREE.Group();
    const rightEngineNacelle = new THREE.Mesh(engineGeo, bodyMat);
    const rightEngineFan = new THREE.Mesh(fanSpinnerGeo, engineInteriorMat);
    rightEngineFan.position.z = 1.0;
    rightEngineGroup.add(rightEngineNacelle, rightEngineFan);
    rightEngineGroup.position.set(-3.4, -0.85, 0.8);
    planeGroup.add(rightEngineGroup);

    // 4. Vertical Tailfin & Stabilizers
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(2.2, 0);
    finShape.lineTo(0.9, 3.4);
    finShape.lineTo(0.2, 3.4);
    finShape.closePath();

    const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: 0.15, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04 });
    const tailFin = new THREE.Mesh(finGeo, navyAccentMat);
    tailFin.position.set(-0.075, 0.6, -8.2);
    tailFin.rotation.y = Math.PI / 2;
    planeGroup.add(tailFin);

    // Livery Gold Fin Stripe
    const stripeGeo = new THREE.BoxGeometry(0.18, 0.45, 1.8);
    const finStripe = new THREE.Mesh(stripeGeo, goldAccentMat);
    finStripe.position.set(0, 2.4, -7.4);
    planeGroup.add(finStripe);

    // Horizontal Tail Stabilizers
    const hStabShape = new THREE.Shape();
    hStabShape.moveTo(0, 0);
    hStabShape.lineTo(1.0, 0);
    hStabShape.lineTo(2.8, -1.6);
    hStabShape.lineTo(2.4, -1.8);
    hStabShape.lineTo(0, -0.8);
    hStabShape.closePath();

    const hStabGeo = new THREE.ExtrudeGeometry(hStabShape, { depth: 0.1, bevelEnabled: false });
    hStabGeo.rotateX(Math.PI / 2);

    const leftHStab = new THREE.Mesh(hStabGeo, bodyMat);
    leftHStab.position.set(0.2, 0.4, -7.5);
    planeGroup.add(leftHStab);

    const rightHStab = new THREE.Mesh(hStabGeo, bodyMat);
    rightHStab.position.set(-0.2, 0.4, -7.5);
    rightHStab.scale.set(-1, 1, 1);
    planeGroup.add(rightHStab);

    // Scale and place plane in scene
    planeGroup.scale.set(0.68, 0.68, 0.68);
    scene.add(planeGroup);

    // -------------------------------------------------------------
    // Procedural Fluffy Cloud Sea
    // -------------------------------------------------------------
    const cloudsGroup = new THREE.Group();
    const cloudMat = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.88,
      depthWrite: false
    });

    const sphereGeo = new THREE.SphereGeometry(1, 10, 10);

    for (let c = 0; c < 28; c++) {
      const cluster = new THREE.Group();
      const numPuffs = 4 + Math.floor(Math.random() * 4);
      for (let p = 0; p < numPuffs; p++) {
        const puff = new THREE.Mesh(sphereGeo, cloudMat);
        const scale = 2.5 + Math.random() * 3.5;
        puff.scale.set(scale, scale * 0.6, scale);
        puff.position.set(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 4
        );
        cluster.add(puff);
      }
      cluster.position.set(
        (Math.random() - 0.5) * 120,
        -6 - Math.random() * 8,
        (Math.random() - 0.5) * 90 - 15
      );
      cloudsGroup.add(cluster);
    }
    scene.add(cloudsGroup);

    // -------------------------------------------------------------
    // Contrails (Vapor trails from wingtips)
    // -------------------------------------------------------------
    const trailMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35
    });
    const trailGeo = new THREE.CylinderGeometry(0.12, 0.45, 14, 8);
    trailGeo.rotateX(Math.PI / 2);

    const leftTrail = new THREE.Mesh(trailGeo, trailMat);
    leftTrail.position.set(4.9, -0.6, -7.5);
    planeGroup.add(leftTrail);

    const rightTrail = new THREE.Mesh(trailGeo, trailMat);
    rightTrail.position.set(-4.9, -0.6, -7.5);
    planeGroup.add(rightTrail);

    // Animation Timing
    const startTime = performance.now();
    const introDuration = 4400; // 4.4 seconds total for a grand, polished cinematic sequence

    // Reveal logo after 0.8s
    const logoTimeout = setTimeout(() => {
      setLogoVisible(true);
    }, 800);

    const tick = (currentTime: number) => {
      if (isDisposed) return;

      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / introDuration, 1.0);
      setProgress(Math.round(t * 100));

      // Flight Path kinematics:
      // Starts high and off-screen right/rear, banks gracefully into center view,
      // accelerates forward and gently climbs towards upper left
      const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
      const easeVal = easeInOut(t);

      // Airplane Position
      const startX = 35;
      const endX = -32;
      const planeX = startX + (endX - startX) * easeVal;

      const startY = 12;
      const midY = 1.8;
      const endY = 8.5;
      const planeY = (1 - easeVal) * (1 - easeVal) * startY + 2 * (1 - easeVal) * easeVal * midY + easeVal * easeVal * endY;

      const startZ = -30;
      const endZ = 20;
      const planeZ = startZ + (endZ - startZ) * easeVal;

      planeGroup.position.set(planeX, planeY, planeZ);

      // Banking angle (roll) and pitch
      // Natural aircraft banking when turning
      const targetRoll = Math.sin(t * Math.PI) * 0.48; // Bank into the turn
      planeGroup.rotation.z = -targetRoll;
      planeGroup.rotation.y = -Math.PI / 2.3 + (t * 0.45); // Heading
      planeGroup.rotation.x = 0.08 - (t * 0.22); // Climb pitch

      // Dynamic camera tracking with smooth pan
      camera.position.x = Math.sin(t * 1.5) * 3;
      camera.position.y = 5 - t * 2.2;
      camera.lookAt(planeGroup.position.x * 0.4, planeGroup.position.y * 0.5, planeGroup.position.z * 0.3);

      // Gentle cloud drift
      cloudsGroup.children.forEach((cloud, idx) => {
        cloud.position.x += 0.04 * ((idx % 3) + 1);
        if (cloud.position.x > 70) {
          cloud.position.x = -70;
        }
      });

      // Contrail opacity modulation
      const trailOpacity = Math.min(0.4, t * 0.6);
      trailMat.opacity = trailOpacity;

      renderer.render(scene, camera);

      if (t < 1.0) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        // Trigger completion transition
        handleFinish();
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    // Resize Handler
    const handleResize = () => {
      if (!container || isDisposed) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    const handleFinish = () => {
      setFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 700);
    };

    // Keyboard support: Escape or Enter skips intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isDisposed = true;
      clearTimeout(logoTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);

      // Clean up Three.js resources
      fuselageGeo.dispose();
      noseGeo.dispose();
      visorGeo.dispose();
      tailTaperGeo.dispose();
      wingGeo.dispose();
      wingletGeo.dispose();
      engineGeo.dispose();
      fanSpinnerGeo.dispose();
      finGeo.dispose();
      stripeGeo.dispose();
      hStabGeo.dispose();
      sphereGeo.dispose();
      trailGeo.dispose();

      bodyMat.dispose();
      navyAccentMat.dispose();
      goldAccentMat.dispose();
      cockpitGlassMat.dispose();
      engineInteriorMat.dispose();
      cloudMat.dispose();
      trailMat.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onComplete]);

  const handleSkip = () => {
    setFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-sky-200 transition-opacity duration-700 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="SkyVoyage Cinematic Opening Intro"
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Atmospheric vignette & sun flare overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial-[circle_at_70%_20%]_from-amber-100/30_via-transparent_to-sky-950/20" />

      {/* Center Cinematic Brand Reveal */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-1000 ${
          logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="text-center px-6 py-8 max-w-lg">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 shadow-xl mb-4 text-[#10233F]">
            <Plane className="w-8 h-8 text-[#10233F] -rotate-45" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#10233F] drop-shadow-sm font-display mb-2">
            SkyVoyage
          </h1>

          <p className="text-sm md:text-base font-medium text-slate-800/90 tracking-wide uppercase">
            Your Journey Begins Here
          </p>

          {/* Minimal cinematic flight track bar */}
          <div className="mt-6 w-48 mx-auto h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-amber-400 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Skip Button (Top Right) */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleSkip}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-slate-800 text-xs font-semibold tracking-wide shadow-md hover:shadow-lg backdrop-blur-md transition-all active:scale-95"
          title="Skip Intro (Esc)"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Subtle indicator (Bottom Center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-slate-700/70 text-xs font-medium tracking-wider uppercase pointer-events-none">
        International Travel Concierge · Flight Inbound
      </div>
    </div>
  );
};
