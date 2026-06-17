/* ═══════════════════════════════════════════════════════════
   BUILDEMPIRE – PREMIUM JS v2.0
   Three.js Enhanced | GSAP Premium | Luxury Interactions
═══════════════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────
// 1. PREMIUM LOADER
// ─────────────────────────────────────────────
(function initLoader() {
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  document.body.style.overflow = 'hidden';

  let progress = 0;
  const steps = [
    { target: 35, delay: 80 },
    { target: 65, delay: 60 },
    { target: 85, delay: 80 },
    { target: 100, delay: 40 },
  ];

  let stepIdx = 0;
  let current = 0;

  function runStep() {
    if (stepIdx >= steps.length) return;
    const { target, delay } = steps[stepIdx];

    const interval = setInterval(() => {
      current += 1;
      loaderBar.style.width = current + '%';
      if (current >= target) {
        clearInterval(interval);
        stepIdx++;
        if (stepIdx < steps.length) {
          setTimeout(runStep, 150);
        } else {
          setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
            initAll();
          }, 500);
        }
      }
    }, delay);
  }

  runStep();
})();

// ─────────────────────────────────────────────
// 2. INIT ALL
// ─────────────────────────────────────────────
function initAll() {
  initNavbar();
  initThemeToggle();
  initMobileMenu();
  initHeroCanvas();
  initAboutCanvas();
  initScrollReveal();
  initStatCounters();
  initProgressBars();
  initProjectFilters();
  initCarousel();
  initContactForm();
  initBackToTop();
  initParallax();
  initBeforeAfterSlider();
  initFloatParallax();
  init3DTilt();
  initGSAP();
  initCursorGlow();
}

// ─────────────────────────────────────────────
// 3. NAVBAR
// ─────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNavLink();
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('hamburger').classList.remove('active');
      }
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop) current = s.id; });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-section') === current);
  });
}

// ─────────────────────────────────────────────
// 4. MOBILE MENU
// ─────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

// ─────────────────────────────────────────────
// 5. THEME TOGGLE
// ─────────────────────────────────────────────
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const html = document.documentElement;
  const saved = localStorage.getItem('be-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateThemeIcon(saved, icon);

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('be-theme', next);
    updateThemeIcon(next, icon);
    window.dispatchEvent(new CustomEvent('themechanged', { detail: next }));
  });
}

function updateThemeIcon(theme, icon) {
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ─────────────────────────────────────────────
// 6. CUSTOM CURSOR GLOW
// ─────────────────────────────────────────────
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 320px; height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
    left: -999px; top: -999px;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ─────────────────────────────────────────────
// 7. THREE.JS HERO CANVAS – PREMIUM CITY
// ─────────────────────────────────────────────
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const W = window.innerWidth, H = window.innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050508, 0.018);

  const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
  camera.position.set(0, 4, 32);
  camera.lookAt(0, 2, 0);

  // ── Lights ──
  const ambient = new THREE.AmbientLight(0x0d0d1f, 1.5);
  scene.add(ambient);

  const goldKey = new THREE.PointLight(0xf0c96b, 5, 80);
  goldKey.position.set(8, 18, 8);
  goldKey.castShadow = true;
  scene.add(goldKey);

  const blueRim = new THREE.PointLight(0x1a3c8a, 2.5, 50);
  blueRim.position.set(-14, 6, 4);
  scene.add(blueRim);

  const purpleAccent = new THREE.PointLight(0x4a1a7a, 1.5, 40);
  purpleAccent.position.set(14, 3, -8);
  scene.add(purpleAccent);

  const dirLight = new THREE.DirectionalLight(0xfff8f0, 0.6);
  dirLight.position.set(2, 20, 10);
  dirLight.castShadow = true;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 100;
  dirLight.shadow.camera.top = 40;
  dirLight.shadow.camera.bottom = -40;
  dirLight.shadow.camera.left = -40;
  dirLight.shadow.camera.right = 40;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  scene.add(dirLight);

  // ── Materials ──
  const buildingMat = (emissiveStrength = 0.05) => new THREE.MeshPhongMaterial({
    color: 0x12121e,
    emissive: 0x0a0a18,
    emissiveIntensity: emissiveStrength,
    shininess: 120,
  });

  const windowMat = (brightness = 1.0) => new THREE.MeshPhongMaterial({
    color: 0xc9a84c,
    emissive: 0xd4900a,
    emissiveIntensity: brightness,
    shininess: 300,
    transparent: true,
    opacity: 0.85,
  });

  const darkWindowMat = () => new THREE.MeshPhongMaterial({
    color: 0x1a2a4a,
    emissive: 0x0a1520,
    emissiveIntensity: 0.3,
    shininess: 200,
    transparent: true,
    opacity: 0.7,
  });

  const glassFacade = () => new THREE.MeshPhongMaterial({
    color: 0x1a2f5a,
    emissive: 0x0d1a3a,
    shininess: 400,
    transparent: true,
    opacity: 0.55,
  });

  const groundMat = new THREE.MeshPhongMaterial({
    color: 0x0a0a12,
    shininess: 20,
    reflectivity: 0.2,
  });

  const spireGold = new THREE.MeshPhongMaterial({
    color: 0xc9a84c,
    emissive: 0x8a5c00,
    emissiveIntensity: 0.6,
    shininess: 400,
  });

  // ── Ground plane ──
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -9;
  ground.receiveShadow = true;
  ground.userData.type = 'ground';
  scene.add(ground);

  // Ground grid
  const gridHelper = new THREE.GridHelper(150, 60, 0xc9a84c, 0x0d0d1a);
  gridHelper.position.y = -8.99;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.18;
  gridHelper.userData.type = 'grid';
  scene.add(gridHelper);

  // Ground reflection plane
  const reflectGeom = new THREE.PlaneGeometry(200, 200);
  const reflectMat = new THREE.MeshPhongMaterial({
    color: 0x0a0a16,
    shininess: 80,
    transparent: true,
    opacity: 0.3,
  });
  const reflect = new THREE.Mesh(reflectGeom, reflectMat);
  reflect.rotation.x = -Math.PI / 2;
  reflect.position.y = -8.95;
  reflect.userData.type = 'reflection';
  scene.add(reflect);

  // ── Building factory ──
  const buildings = [];
  const animatedWindows = [];

  function createBuilding(x, z, w, d, h, opts = {}) {
    const group = new THREE.Group();
    const { hasTower = false, hasAntenna = false } = opts;

    // Base body
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), buildingMat());
    body.position.y = h / 2 - 9;
    body.castShadow = true;
    body.receiveShadow = true;
    body.userData.type = 'building';
    group.add(body);

    // Glass facade (front)
    const facGeom = new THREE.BoxGeometry(w * 0.88, h * 0.97, 0.15);
    const fac = new THREE.Mesh(facGeom, glassFacade());
    fac.position.set(0, h / 2 - 9, d / 2 + 0.08);
    fac.userData.type = 'facade';
    group.add(fac);

    // Side facade
    const sideFac = new THREE.Mesh(new THREE.BoxGeometry(0.15, h * 0.97, d * 0.88), glassFacade());
    sideFac.position.set(w / 2 + 0.08, h / 2 - 9, 0);
    sideFac.userData.type = 'facade';
    group.add(sideFac);

    // Window grid
    const wRows = Math.floor(h / 1.8);
    const wColsF = Math.floor(w / 1.4);
    for (let r = 0; r < wRows; r++) {
      for (let c = 0; c < wColsF; c++) {
        const lit = Math.random() > 0.28;
        const mat = lit ? windowMat(0.6 + Math.random() * 0.8) : darkWindowMat();
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.08), mat);
        win.position.set(
          (c - wColsF / 2 + 0.5) * 1.3,
          r * 1.65 - h / 2 + 1.5 - 9,
          d / 2 + 0.12
        );
        win.userData.type = lit ? 'litWindow' : 'darkWindow';
        group.add(win);
        if (lit) animatedWindows.push({ mesh: win, phase: Math.random() * Math.PI * 2 });
      }
    }

    // Tower section
    if (hasTower) {
      const towerH = h * 0.22;
      const tw = w * 0.55;
      const towerBody = new THREE.Mesh(new THREE.BoxGeometry(tw, towerH, d * 0.55), buildingMat(0.1));
      towerBody.position.y = h - 9 + towerH / 2;
      towerBody.userData.type = 'building';
      group.add(towerBody);

      const towerCap = new THREE.Mesh(new THREE.BoxGeometry(tw * 0.7, 1.5, d * 0.38), spireGold.clone());
      towerCap.position.y = h - 9 + towerH + 0.75;
      towerCap.userData.type = 'spire';
      group.add(towerCap);

      // Spire
      const spire = new THREE.Mesh(new THREE.ConeGeometry(tw * 0.18, towerH * 0.9, 4), spireGold.clone());
      spire.position.y = h - 9 + towerH + 1.5 + towerH * 0.45;
      spire.userData.type = 'spire';
      group.add(spire);

      if (hasAntenna) {
        const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 4), spireGold.clone());
        ant.position.y = h - 9 + towerH + 1.5 + towerH * 0.9 + 2;
        ant.userData.type = 'spire';
        group.add(ant);

        // Blinking light
        const lightGeom = new THREE.SphereGeometry(0.12, 8, 8);
        const lightMat = new THREE.MeshPhongMaterial({ color: 0xff4444, emissive: 0xff0000, emissiveIntensity: 2 });
        const light = new THREE.Mesh(lightGeom, lightMat);
        light.position.copy(ant.position);
        light.position.y += 2;
        light.userData.type = 'litWindow';
        group.add(light);
        animatedWindows.push({ mesh: light, phase: Math.random() * Math.PI * 2, isBeacon: true });
      }
    }

    group.position.set(x, 0, z);
    scene.add(group);
    buildings.push(group);
    return group;
  }

  // Premium city layout
  createBuilding(-22, -4, 3.5, 3.5, 18);
  createBuilding(-16, -2, 4.5, 4.5, 28);
  createBuilding(-9, -1, 5.5, 5.5, 44, { hasTower: true, hasAntenna: true });
  createBuilding(-2, -0.5, 6, 6, 52, { hasTower: true, hasAntenna: true });
  createBuilding(6, -0.5, 5, 5, 36, { hasTower: true });
  createBuilding(13, -2, 4, 4, 26, { hasTower: true });
  createBuilding(19, -4, 3, 3, 18);
  createBuilding(-26, -7, 2.5, 2.5, 12);
  createBuilding(24, -7, 2.5, 2.5, 14);
  createBuilding(-6, -10, 2.5, 2.5, 10);
  createBuilding(9, -10, 2, 2, 8);
  createBuilding(-14, -8, 3, 3, 14);
  createBuilding(16, -8, 3, 3, 16);

  // ── Gold particle system ──
  const particleCount = 800;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(particleCount * 3);
  const pSizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 120;
    pPos[i * 3 + 1] = Math.random() * 60 - 5;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    pSizes[i] = Math.random() * 0.15 + 0.05;
  }

  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));

  const pMat = new THREE.PointsMaterial({
    color: 0xc9a84c,
    size: 0.1,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(pGeo, pMat);
  particles.userData.type = 'particles';
  scene.add(particles);

  // ── Wireframe floating geometry ──
  const floaters = [];
  const wireGeoms = [
    new THREE.OctahedronGeometry(1.0, 0),
    new THREE.TetrahedronGeometry(1.1, 0),
    new THREE.IcosahedronGeometry(0.9, 0),
    new THREE.TorusGeometry(0.7, 0.25, 6, 12),
    new THREE.BoxGeometry(1.2, 1.2, 1.2),
    new THREE.DodecahedronGeometry(0.9, 0),
  ];

  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xc9a84c,
    wireframe: true,
    transparent: true,
    opacity: 0.22,
  });

  for (let i = 0; i < 18; i++) {
    const g = wireGeoms[Math.floor(Math.random() * wireGeoms.length)];
    const m = new THREE.Mesh(g, wireMat.clone());
    m.userData.type = 'floater';
    m.position.set(
      (Math.random() - 0.5) * 70,
      Math.random() * 35 - 2,
      (Math.random() - 0.5) * 25 - 5
    );
    const s = 0.35 + Math.random() * 1.4;
    m.scale.setScalar(s);
    m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    scene.add(m);
    floaters.push({
      mesh: m,
      ry: (Math.random() - 0.5) * 0.015,
      rx: (Math.random() - 0.5) * 0.01,
      bobSpeed: 0.003 + Math.random() * 0.007,
      bobAmp: 0.4 + Math.random() * 1.2,
      bobPhase: Math.random() * Math.PI * 2,
    });
  }

  // ── Mouse interaction ──
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // ── Animation loop ──
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Lerp camera
    currentX += (targetX - currentX) * 0.025;
    currentY += (targetY - currentY) * 0.025;
    camera.position.x = currentX * 4;
    camera.position.y = 4 + currentY * 2;
    camera.lookAt(currentX * 0.5, 2, 0);

    // Animate windows (flicker effect)
    animatedWindows.forEach(w => {
      if (w.isBeacon) {
        w.mesh.material.emissiveIntensity = 1 + Math.sin(t * 2 + w.phase) > 0 ? 2 : 0.1;
      } else {
        const flicker = Math.sin(t * 0.8 + w.phase);
        if (flicker > 0.98) {
          w.mesh.material.emissiveIntensity = Math.random() * 2;
        }
      }
    });

    // Animate floaters
    floaters.forEach(f => {
      f.mesh.rotation.y += f.ry;
      f.mesh.rotation.x += f.rx;
      f.mesh.position.y += Math.sin(t * f.bobSpeed * 60 + f.bobPhase) * 0.008 * f.bobAmp;
    });

    // Particles drift
    particles.rotation.y += 0.0003;
    particles.position.y = Math.sin(t * 0.1) * 0.5;

    // Lights animation
    goldKey.intensity = 4.5 + Math.sin(t * 1.5) * 0.5;
    goldKey.position.x = Math.sin(t * 0.3) * 6;
    blueRim.intensity = 2 + Math.sin(t * 0.8 + 1) * 0.4;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Dynamic Theme Switching for Three.js Hero City
  function updateThreeTheme(theme) {
    const isDark = theme === 'dark';

    scene.fog.color.setHex(isDark ? 0x050508 : 0xf2ede5);

    ambient.color.setHex(isDark ? 0x0d0d1f : 0xd5cfc5);
    ambient.intensity = isDark ? 1.5 : 1.8;

    goldKey.color.setHex(isDark ? 0xf0c96b : 0xa07830);
    goldKey.intensity = isDark ? 5 : 2.0;

    blueRim.color.setHex(isDark ? 0x1a3c8a : 0x6b8ebf);
    blueRim.intensity = isDark ? 2.5 : 1.0;

    purpleAccent.color.setHex(isDark ? 0x4a1a7a : 0x8e76a6);
    purpleAccent.intensity = isDark ? 1.5 : 0.5;

    dirLight.color.setHex(isDark ? 0xfff8f0 : 0xffffff);
    dirLight.intensity = isDark ? 0.6 : 1.2;

    scene.traverse((node) => {
      if (node.isMesh && node.userData.type) {
        const type = node.userData.type;
        const mat = node.material;

        switch(type) {
          case 'building':
            mat.color.setHex(isDark ? 0x12121e : 0xeeeadf);
            mat.emissive.setHex(isDark ? 0x0a0a18 : 0xdfdcd6);
            break;
          case 'litWindow':
            mat.color.setHex(isDark ? 0xc9a84c : 0xe2a93a);
            mat.emissive.setHex(isDark ? 0xd4900a : 0xe2a93a);
            break;
          case 'darkWindow':
            mat.color.setHex(isDark ? 0x1a2a4a : 0xdfdcd6);
            mat.emissive.setHex(isDark ? 0x0a1520 : 0xc0b8a8);
            break;
          case 'facade':
            mat.color.setHex(isDark ? 0x1a2f5a : 0xc5dbe8);
            mat.emissive.setHex(isDark ? 0x0d1a3a : 0xb5ccd9);
            mat.opacity = isDark ? 0.55 : 0.45;
            break;
          case 'spire':
            mat.color.setHex(isDark ? 0xc9a84c : 0xa07830);
            mat.emissive.setHex(isDark ? 0x8a5c00 : 0x7a5820);
            break;
          case 'ground':
            mat.color.setHex(isDark ? 0x0a0a12 : 0xe6e0d5);
            break;
          case 'reflection':
            mat.color.setHex(isDark ? 0x0a0a16 : 0xe6e0d5);
            mat.opacity = isDark ? 0.3 : 0.15;
            break;
          case 'floater':
            mat.color.setHex(isDark ? 0xc9a84c : 0xa07830);
            mat.opacity = isDark ? 0.22 : 0.45;
            break;
          case 'grid':
            mat.color.setHex(isDark ? 0xc9a84c : 0xa07830);
            mat.opacity = isDark ? 0.18 : 0.35;
            break;
        }
        mat.needsUpdate = true;
      } else if (node.isPoints) {
        node.material.color.setHex(isDark ? 0xc9a84c : 0xa07830);
        node.material.opacity = isDark ? 0.55 : 0.4;
        node.material.needsUpdate = true;
      }
    });
  }

  // Set initial theme
  const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThreeTheme(initialTheme);

  // Listen to theme changes
  window.addEventListener('themechanged', (e) => {
    updateThreeTheme(e.detail);
  });
}

// ─────────────────────────────────────────────
// 8. ABOUT SECTION 3D MINI CANVAS
// ─────────────────────────────────────────────
function initAboutCanvas() {
  const container = document.getElementById('aboutCanvas3D');
  if (!container || typeof THREE === 'undefined') return;

  const W = container.offsetWidth, H = 340;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05050d, 0.06);

  const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 100);
  camera.position.set(0, 2, 13);
  camera.lookAt(0, 0, 0);

  const ambient = new THREE.AmbientLight(0x0a0a1f, 2.5);
  scene.add(ambient);

  const goldPt = new THREE.PointLight(0xf0c96b, 5, 40);
  goldPt.position.set(5, 10, 6);
  scene.add(goldPt);

  const bluePt = new THREE.PointLight(0x1a3a8a, 3, 30);
  bluePt.position.set(-6, 4, -4);
  scene.add(bluePt);

  const matBody = new THREE.MeshPhongMaterial({ color: 0x12121e, shininess: 80 });
  const matGold = new THREE.MeshPhongMaterial({ color: 0xc9a84c, emissive: 0x7a5000, emissiveIntensity: 0.6, shininess: 300 });
  const matGlass = new THREE.MeshPhongMaterial({ color: 0x1a3a6a, transparent: true, opacity: 0.65, shininess: 400 });
  const matWire = new THREE.MeshBasicMaterial({ color: 0xc9a84c, wireframe: true, transparent: true, opacity: 0.25 });
  const matGround = new THREE.MeshPhongMaterial({ color: 0x0a0a14, shininess: 30 });

  // Ground
  const groundG = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), matGround);
  groundG.rotation.x = -Math.PI / 2;
  groundG.position.y = -4.5;
  groundG.userData.type = 'ground';
  scene.add(groundG);

  const grid = new THREE.GridHelper(30, 20, 0xc9a84c, 0x12121e);
  grid.position.y = -4.49;
  grid.material.transparent = true;
  grid.material.opacity = 0.2;
  grid.userData.type = 'grid';
  scene.add(grid);

  // Main tower group
  const tower = new THREE.Group();

  // Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 9, 3.2), matBody.clone());
  body.position.y = 0;
  body.userData.type = 'building';
  tower.add(body);

  // Facade
  const fac = new THREE.Mesh(new THREE.BoxGeometry(3, 8.8, 0.1), matGlass.clone());
  fac.position.set(0, 0, 1.65);
  fac.userData.type = 'facade';
  tower.add(fac);

  // Windows
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 3; c++) {
      const lit = Math.random() > 0.3;
      const wm = matGold.clone();
      wm.emissiveIntensity = lit ? 0.5 + Math.random() * 0.8 : 0.1;
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.5, 0.06), wm);
      win.position.set((c - 1) * 0.95, r * 1.05 - 3.8, 1.7);
      win.userData.type = lit ? 'litWindow' : 'darkWindow';
      tower.add(win);
    }
  }

  // Tower cap
  const cap = new THREE.Mesh(new THREE.BoxGeometry(2, 1.2, 2), matGold.clone());
  cap.position.y = 5.1;
  cap.userData.type = 'spire';
  tower.add(cap);

  // Spire
  const spire = new THREE.Mesh(new THREE.ConeGeometry(0.25, 3.5, 4), matGold.clone());
  spire.position.y = 7.35;
  spire.userData.type = 'spire';
  tower.add(spire);

  // Antenna
  const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2), matGold.clone());
  ant.position.y = 9.35;
  ant.userData.type = 'spire';
  tower.add(ant);

  scene.add(tower);

  // Side buildings
  const bL = new THREE.Mesh(new THREE.BoxGeometry(2.2, 5.5, 2.2), matBody.clone());
  bL.position.set(-3.8, -1.75, 0);
  bL.userData.type = 'building';
  scene.add(bL);

  const bR = new THREE.Mesh(new THREE.BoxGeometry(1.8, 4, 1.8), matBody.clone());
  bR.position.set(3.5, -2.5, 0);
  bR.userData.type = 'building';
  scene.add(bR);

  // Floating shapes
  const w1 = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 0), matWire.clone());
  w1.position.set(4.5, 1.5, 2);
  w1.userData.type = 'floater';
  scene.add(w1);

  const w2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 0), matWire.clone());
  w2.position.set(-4.5, 0.5, 2);
  w2.userData.type = 'floater';
  scene.add(w2);

  const w3 = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.2, 6, 12), matWire.clone());
  w3.position.set(0, 3.5, -2);
  w3.userData.type = 'floater';
  scene.add(w3);

  // Orbit ring
  const ringGeo = new THREE.TorusGeometry(5, 0.015, 4, 60);
  const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.2 }));
  ring.rotation.x = Math.PI / 2.5;
  ring.userData.type = 'floater';
  scene.add(ring);

  // Orbit orb
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8),
    new THREE.MeshPhongMaterial({ color: 0xf0c96b, emissive: 0xc9a84c, emissiveIntensity: 1.5, shininess: 500 })
  );
  orb.userData.type = 'litWindow';
  scene.add(orb);

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.008;

    tower.rotation.y = Math.sin(t * 0.4) * 0.25;

    w1.rotation.y += 0.018;
    w1.rotation.x += 0.01;
    w1.position.y = 1.5 + Math.sin(t * 1.2) * 0.4;

    w2.rotation.y -= 0.014;
    w2.rotation.z += 0.008;
    w2.position.y = 0.5 + Math.cos(t * 0.9) * 0.35;

    w3.rotation.z += 0.012;
    w3.rotation.y += 0.008;
    w3.position.y = 3.5 + Math.sin(t * 1.5) * 0.3;

    // Orbit orb around tower
    orb.position.x = Math.sin(t * 0.8) * 5;
    orb.position.y = Math.cos(t * 0.4) * 1.5;
    orb.position.z = Math.cos(t * 0.8) * 3;

    goldPt.position.x = Math.sin(t * 0.5) * 7;
    goldPt.position.z = Math.cos(t * 0.5) * 7;
    goldPt.intensity = 4.5 + Math.sin(t * 2) * 0.5;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const nW = container.offsetWidth;
    renderer.setSize(nW, H);
    camera.aspect = nW / H;
    camera.updateProjectionMatrix();
  });

  // Dynamic Theme Switching for Three.js About Section Mini Canvas
  function updateAboutThreeTheme(theme) {
    const isDark = theme === 'dark';

    scene.fog.color.setHex(isDark ? 0x05050d : 0xeeeadf);

    ambient.color.setHex(isDark ? 0x0a0a1f : 0xd5cfc5);
    ambient.intensity = isDark ? 2.5 : 1.8;

    goldPt.color.setHex(isDark ? 0xf0c96b : 0xa07830);
    goldPt.intensity = isDark ? 5 : 2.0;

    bluePt.color.setHex(isDark ? 0x1a3a8a : 0x6b8ebf);
    bluePt.intensity = isDark ? 3 : 1.0;

    scene.traverse((node) => {
      if (node.isMesh && node.userData.type) {
        const type = node.userData.type;
        const mat = node.material;

        switch(type) {
          case 'building':
            mat.color.setHex(isDark ? 0x12121e : 0xeeeadf);
            mat.emissive.setHex(isDark ? 0x0a0a18 : 0xdfdcd6);
            break;
          case 'litWindow':
            mat.color.setHex(isDark ? 0xc9a84c : 0xe2a93a);
            mat.emissive.setHex(isDark ? 0xd4900a : 0xe2a93a);
            break;
          case 'darkWindow':
            mat.color.setHex(isDark ? 0x1a2a4a : 0xdfdcd6);
            mat.emissive.setHex(isDark ? 0x0a1520 : 0xc0b8a8);
            break;
          case 'facade':
            mat.color.setHex(isDark ? 0x1a3a6a : 0xc5dbe8);
            mat.emissive.setHex(isDark ? 0x0d1a3a : 0xb5ccd9);
            mat.opacity = isDark ? 0.65 : 0.45;
            break;
          case 'spire':
            mat.color.setHex(isDark ? 0xc9a84c : 0xa07830);
            mat.emissive.setHex(isDark ? 0x7a5000 : 0x7a5820);
            break;
          case 'ground':
            mat.color.setHex(isDark ? 0x0a0a14 : 0xeeeadf);
            break;
          case 'floater':
            mat.color.setHex(isDark ? 0xc9a84c : 0xa07830);
            mat.opacity = isDark ? 0.25 : 0.45;
            break;
          case 'grid':
            mat.color.setHex(isDark ? 0xc9a84c : 0xa07830);
            mat.opacity = isDark ? 0.2 : 0.35;
            break;
        }
        mat.needsUpdate = true;
      }
    });
  }

  // Set initial theme
  const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateAboutThreeTheme(initialTheme);

  // Listen to theme changes
  window.addEventListener('themechanged', (e) => {
    updateAboutThreeTheme(e.detail);
  });
}

// ─────────────────────────────────────────────
// 9. SCROLL REVEAL
// ─────────────────────────────────────────────
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('revealed'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────────────
// 10. STAT COUNTERS
// ─────────────────────────────────────────────
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-num, .band-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, 0, parseInt(el.dataset.target), el.dataset.suffix || '', 2200);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, start, end, suffix, duration) {
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(start + (end - start) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ─────────────────────────────────────────────
// 11. PROGRESS BARS
// ─────────────────────────────────────────────
function initProgressBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-fill');
        if (fill) setTimeout(() => { fill.style.width = entry.target.dataset.width + '%'; }, 250);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress-bar').forEach(b => observer.observe(b));
}

// ─────────────────────────────────────────────
// 12. PROJECT FILTERS
// ─────────────────────────────────────────────
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        if (show) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'none';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92) translateY(12px)';
          setTimeout(() => { card.style.display = 'none'; }, 350);
        }
      });
    });
  });
}

// ─────────────────────────────────────────────
// 13. PROJECT MODAL
// ─────────────────────────────────────────────
const projectData = [
  { title: 'Skyline Residences', location: 'Mumbai, Maharashtra', description: 'A landmark 24-floor residential tower featuring premium 3BHK and 4BHK apartments with panoramic city views, rooftop infinity pool, and full smart home integration. Completed 2 months ahead of schedule using Grade A certified materials and sustainable construction practices.', imgClass: 'proj-img-1', details: [{ value: '45,000 sq.ft', label: 'Total Area' }, { value: '₹120 Cr', label: 'Project Value' }, { value: '18 Months', label: 'Duration' }] },
  { title: 'Apex Corporate Tower', location: 'Pune, Maharashtra', description: 'A 32-floor LEED Platinum certified commercial tower housing 50+ multinational companies. Features a sky lobby, green terraces, and cutting-edge smart building systems for energy efficiency, reducing carbon footprint by 40%.', imgClass: 'proj-img-2', details: [{ value: '1,20,000 sq.ft', label: 'Total Area' }, { value: '₹380 Cr', label: 'Project Value' }, { value: '30 Months', label: 'Duration' }] },
  { title: 'Grand Highway Overpass', location: 'Nashik, Maharashtra', description: 'A critical 2.5km 4-lane highway overpass built using advanced pre-stressed concrete technology, designed to withstand seismic activity and handle 80,000 vehicles daily, significantly reducing urban congestion.', imgClass: 'proj-img-3', details: [{ value: '2.5 km span', label: 'Total Length' }, { value: '₹210 Cr', label: 'Project Value' }, { value: '24 Months', label: 'Duration' }] },
  { title: 'Golden Villa Estate', location: 'Lonavala, Maharashtra', description: 'An exclusive 5-bedroom luxury hillside villa with infinity pool, home theater, wine cellar, and fully landscaped gardens. Custom Italian marble, imported fixtures, and a fully automated smart home system throughout.', imgClass: 'proj-img-4', details: [{ value: '8,500 sq.ft', label: 'Total Area' }, { value: '₹18 Cr', label: 'Project Value' }, { value: '14 Months', label: 'Duration' }] },
  { title: 'Empire Mall & Convention', location: 'Nagpur, Maharashtra', description: 'A mega mixed-use development featuring a 4-level retail mall, 5-star convention center, multiplex cinema, and premium food court. Attracts 1.2 million visitors monthly with award-winning architectural design.', imgClass: 'proj-img-5', details: [{ value: '3,50,000 sq.ft', label: 'Total Area' }, { value: '₹650 Cr', label: 'Project Value' }, { value: '36 Months', label: 'Duration' }] },
  { title: 'Metro Station Complex', location: 'Hyderabad, Telangana', description: 'A modern transit-oriented development integrating a metro rail station with retail, office, and hospitality spaces. Designed for 1,00,000 daily commuters with accessibility and sustainability at its core.', imgClass: 'proj-img-6', details: [{ value: '75,000 sq.ft', label: 'Total Area' }, { value: '₹290 Cr', label: 'Project Value' }, { value: '28 Months', label: 'Duration' }] },
];

function openProject(index) {
  const d = projectData[index];
  const modal = document.getElementById('projectModal');

  document.getElementById('modalImg').className = 'modal-img ' + d.imgClass;
  document.getElementById('baBefore').className = 'ba-before';
  document.getElementById('baAfter').className = 'ba-after ' + d.imgClass;
  document.getElementById('modalTitle').textContent = d.title;
  document.getElementById('modalLocation').querySelector('span').textContent = d.location;

  const descEl = document.getElementById('modalDesc');
  if (descEl) descEl.textContent = d.description;

  document.getElementById('modalDetails').innerHTML = d.details.map(dd =>
    `<div class="modal-detail-item"><strong>${dd.value}</strong><span>${dd.label}</span></div>`
  ).join('');

  document.getElementById('baRange').value = 50;
  updateBASlider(50);

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  document.getElementById('projectModal').classList.remove('open');
  document.body.style.overflow = '';
}

window.openProject = openProject;
window.closeProject = closeProject;
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProject(); });

// ─────────────────────────────────────────────
// 14. BEFORE/AFTER SLIDER
// ─────────────────────────────────────────────
function initBeforeAfterSlider() {
  const range = document.getElementById('baRange');
  if (!range) return;
  range.addEventListener('input', () => updateBASlider(range.value));
}

function updateBASlider(v) {
  const after = document.getElementById('baAfter');
  if (after) after.style.left = v + '%';
}

// ─────────────────────────────────────────────
// 15. TESTIMONIAL CAROUSEL
// ─────────────────────────────────────────────
function initCarousel() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.testimonial-card'));
  let currentIndex = 0;
  let cardsPerView = getCardsPerView();
  let totalSlides = Math.ceil(cards.length / cardsPerView);
  let autoTimer;

  function getCardsPerView() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3;
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    totalSlides = Math.ceil(cards.length / getCardsPerView());
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlide() {
    cardsPerView = getCardsPerView();
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${currentIndex * cardW * cardsPerView}px)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  function goTo(i) {
    currentIndex = Math.max(0, Math.min(i, totalSlides - 1));
    updateSlide();
    resetAuto();
  }

  function next() { currentIndex = (currentIndex + 1) % totalSlides; updateSlide(); }
  function prev() { currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; updateSlide(); }
  function resetAuto() { clearInterval(autoTimer); autoTimer = setInterval(next, 5500); }

  document.getElementById('nextBtn').addEventListener('click', () => { next(); resetAuto(); });
  document.getElementById('prevBtn').addEventListener('click', () => { prev(); resetAuto(); });

  // Touch swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) { diff > 0 ? prev() : next(); resetAuto(); }
  });

  window.addEventListener('resize', () => { createDots(); currentIndex = 0; updateSlide(); });

  createDots();
  resetAuto();
}

// ─────────────────────────────────────────────
// 16. CONTACT FORM
// ─────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    function setErr(id, errId, msg) {
      const el = document.getElementById(id);
      const err = document.getElementById(errId);
      if (msg) { err.textContent = msg; el.style.borderColor = '#f06070'; valid = false; }
      else { err.textContent = ''; el.style.borderColor = ''; }
    }

    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const msg = document.getElementById('contactMessage').value.trim();

    name.length < 2 ? setErr('contactName', 'nameError', 'Please enter your full name.') : setErr('contactName', 'nameError', '');
    !/^[+]?[\d\s\-()]{8,15}$/.test(phone) ? setErr('contactPhone', 'phoneError', 'Please enter a valid phone number.') : setErr('contactPhone', 'phoneError', '');
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? setErr('contactEmail', 'emailError', 'Please enter a valid email address.') : setErr('contactEmail', 'emailError', '');
    msg.length < 10 ? setErr('contactMessage', 'messageError', 'Please describe your project (min 10 characters).') : setErr('contactMessage', 'messageError', '');

    if (!valid) return;

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      const successEl = document.getElementById('formSuccess');
      successEl.classList.add('show');
      form.reset();
      setTimeout(() => successEl.classList.remove('show'), 6000);
    }, 2000);
  });

  form.querySelectorAll('input, textarea').forEach(f => {
    f.addEventListener('focus', () => { f.style.borderColor = ''; });
  });
}

// ─────────────────────────────────────────────
// 17. BACK TO TOP
// ─────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ─────────────────────────────────────────────
// 18. PARALLAX
// ─────────────────────────────────────────────
function initParallax() {
  const overlay = document.querySelector('.hero-overlay');
  const content = document.querySelector('.hero-content');
  if (!overlay) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const s = window.scrollY;
        if (overlay) overlay.style.transform = `translateY(${s * 0.25}px)`;
        if (content) content.style.transform = `translateY(${s * 0.12}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ─────────────────────────────────────────────
// 19. FLOATING ELEMENTS MOUSE PARALLAX
// ─────────────────────────────────────────────
function initFloatParallax() {
  const floats = document.querySelectorAll('.float-el');
  if (!floats.length) return;

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5);
    my = (e.clientY / window.innerHeight - 0.5);
  }, { passive: true });

  let raf;
  function tick() {
    floats.forEach((el, i) => {
      const s = (i + 1) * 14;
      el.style.transform = `translate(${mx * s}px, ${my * s * 0.8}px)`;
    });
    raf = requestAnimationFrame(tick);
  }
  tick();
}

// ─────────────────────────────────────────────
// 20. 3D TILT EFFECT ON CARDS
// ─────────────────────────────────────────────
function init3DTilt() {
  const cards = document.querySelectorAll('.service-card, .why-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    card.addEventListener('touchstart', () => { card.style.transform = ''; }, { passive: true });
  });
}

// ─────────────────────────────────────────────
// 21. GSAP PREMIUM ANIMATIONS
// ─────────────────────────────────────────────
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // ── Hero entrance ──
  const tl = gsap.timeline({ delay: 0.4 });

  tl.fromTo('.hero-eyebrow',
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
  );

  tl.fromTo('.hero-title',
    { y: 100, opacity: 0, skewY: 4 },
    { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'power4.out' },
    '-=0.3'
  );

  tl.fromTo('.hero-subtitle',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    '-=0.7'
  );

  tl.fromTo('.hero-cta',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
    '-=0.6'
  );

  tl.fromTo('.hero-stats',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
    '-=0.6'
  );

  tl.fromTo('.float-el',
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' },
    '-=0.5'
  );

  // ── Section headers ──
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.fromTo(el,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  // ── Service cards ──
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.fromTo(card,
      { y: 70, opacity: 0, rotateX: 12 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.08,
        scrollTrigger: { trigger: card, start: 'top 88%' }
      }
    );
  });

  // ── Project cards ──
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.fromTo(card,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: { trigger: card, start: 'top 88%' }
      }
    );
  });

  // ── Why cards ──
  gsap.utils.toArray('.why-card').forEach((card, i) => {
    gsap.fromTo(card,
      { y: 60, opacity: 0, rotateY: -10 },
      { y: 0, opacity: 1, rotateY: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: { trigger: card, start: 'top 88%' }
      }
    );
  });

  // ── Testimonial cards ──
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.fromTo(card,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.12,
        scrollTrigger: { trigger: card, start: 'top 88%' }
      }
    );
  });

  // ── Timeline items ──
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.fromTo(item,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.12,
        scrollTrigger: { trigger: '.timeline', start: 'top 80%' }
      }
    );
  });

  // ── Stats band numbers ──
  gsap.utils.toArray('.band-stat').forEach((stat, i) => {
    gsap.fromTo(stat,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: { trigger: '.stats-band', start: 'top 80%' }
      }
    );
  });

  // ── Contact section ──
  gsap.fromTo('.contact-info',
    { x: -60, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact', start: 'top 80%' }
    }
  );

  gsap.fromTo('.contact-form-wrap',
    { x: 60, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact', start: 'top 80%' }
    }
  );

  // ── About section ──
  gsap.fromTo('.about-visual',
    { x: -80, opacity: 0 },
    { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-grid', start: 'top 80%' }
    }
  );

  gsap.fromTo('.about-content',
    { x: 80, opacity: 0 },
    { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-grid', start: 'top 80%' }
    }
  );

  // ── Horizontal scroll progress line ──
  gsap.to('.progress-bar-scroll', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    }
  });
}

// ─────────────────────────────────────────────
// 22. LOGO CANVAS (small branding element in footer)
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// CONSOLE BRANDING
// ─────────────────────────────────────────────
console.log(
  '%c\n ██████╗ ██╗   ██╗██╗██╗     ██████╗ \n' +
  ' ██╔══██╗██║   ██║██║██║     ██╔══██╗\n' +
  ' ██████╔╝██║   ██║██║██║     ██║  ██║\n' +
  ' ██╔══██╗██║   ██║██║██║     ██║  ██║\n' +
  ' ██████╔╝╚██████╔╝██║███████╗██████╔╝\n' +
  ' ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ \n',
  'color: #c9a84c; font-size: 10px; font-family: monospace;'
);
console.log('%cEMPIRE – Premium Civil Construction Since 2009', 'color: #f0c96b; font-size: 13px; font-weight: bold;');
console.log('%c✦ Crafted with Three.js + GSAP + Pure CSS Luxury ✦', 'color: #7a7265; font-size: 11px;');
