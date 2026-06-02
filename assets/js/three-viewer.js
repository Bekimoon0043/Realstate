/* ============================================
   ETHIO REAL ESTATE 3D VIEWER
   Three.js Interactive Property Visualization
   ============================================ */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Viewer State
const ViewerState = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    building: null,
    animationId: null,
    isWalkMode: false,
    isWireframe: false,
    isNightMode: false,
    tourPositions: [],
    currentTourIndex: 0,
    isAnimating: false
};

// DOM Elements
let container, loadingOverlay, titleElement;

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', initViewer);

function initViewer() {
    container = document.getElementById('three-canvas-container');
    loadingOverlay = document.getElementById('viewer-loading');
    titleElement = document.getElementById('viewer-title');
    
    // Listen for open event from app.js
    window.addEventListener('open3DViewer', (e) => {
        openViewer(e.detail.propertyId);
    });
    
    // Viewer controls
    document.getElementById('viewer-close').addEventListener('click', closeViewer);
    document.getElementById('viewer-fullscreen').addEventListener('click', toggleFullscreen);
    document.getElementById('tool-orbit').addEventListener('click', () => setMode('orbit'));
    document.getElementById('tool-walk').addEventListener('click', () => setMode('walk'));
    document.getElementById('tool-reset').addEventListener('click', resetCamera);
    document.getElementById('tool-wireframe').addEventListener('click', toggleWireframe);
    document.getElementById('tool-lights').addEventListener('click', toggleNightMode);
    
    // Modal close on backdrop
    document.getElementById('viewer-modal').addEventListener('click', (e) => {
        if (e.target.id === 'viewer-modal') closeViewer();
    });
}

function openViewer(propertyId) {
    const property = window.AppData.properties.find(p => p.id === propertyId);
    if (!property) return;
    
    // Update title
    const lang = window.AppState?.currentLang || 'en';
    titleElement.textContent = lang === 'am' && property.nameAm ? property.nameAm : property.name;
    
    // Show modal
    document.getElementById('viewer-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show loading
    loadingOverlay.classList.remove('hidden');
    
    // Initialize Three.js scene
    setTimeout(() => {
        initThreeJS(property);
        loadingOverlay.classList.add('hidden');
    }, 100);
}

function closeViewer() {
    document.getElementById('viewer-modal').classList.remove('active');
    document.body.style.overflow = '';
    
    // Cleanup
    if (ViewerState.animationId) {
        cancelAnimationFrame(ViewerState.animationId);
    }
    if (ViewerState.renderer) {
        ViewerState.renderer.dispose();
        container.innerHTML = '';
    }
    ViewerState.scene = null;
    ViewerState.camera = null;
    ViewerState.renderer = null;
    ViewerState.controls = null;
}

function toggleFullscreen() {
    const modal = document.querySelector('.viewer-modal-content');
    if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(err => {
            console.warn(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function initThreeJS(property) {
    // Clear previous
    container.innerHTML = '';
    
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue
    scene.fog = new THREE.Fog(0x87CEEB, 50, 200);
    ViewerState.scene = scene;
    
    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(40, 30, 50);
    ViewerState.camera = camera;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    ViewerState.renderer = renderer;
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 150;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent going below ground
    controls.target.set(0, 15, 0);
    ViewerState.controls = controls;
    
    // Lighting
    setupLighting(scene);
    
    // Environment
    createEnvironment(scene);
    
    // Building
    const building = createProceduralBuilding(property);
    scene.add(building);
    ViewerState.building = building;
    
    // Set up tour positions
    setupTourPositions(property);
    
    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
        if (!container || !camera || !renderer) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
    resizeObserver.observe(container);
    
    // Animation loop
    function animate() {
        ViewerState.animationId = requestAnimationFrame(animate);
        controls.update();
        
        // Auto-rotate in orbit mode if not interacting
        if (!ViewerState.isWalkMode && !ViewerState.isAnimating) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
        } else {
            controls.autoRotate = false;
        }
        
        renderer.render(scene, camera);
    }
    animate();
}

function setupLighting(scene) {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    ViewerState.ambientLight = ambientLight;
    
    // Main directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.5);
    sunLight.position.set(50, 80, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 200;
    sunLight.shadow.camera.left = -60;
    sunLight.shadow.camera.right = 60;
    sunLight.shadow.camera.top = 60;
    sunLight.shadow.camera.bottom = -60;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    ViewerState.sunLight = sunLight;
    
    // Fill light
    const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.5);
    fillLight.position.set(-30, 40, -20);
    scene.add(fillLight);
    ViewerState.fillLight = fillLight;
    
    // Ground bounce light
    const bounceLight = new THREE.HemisphereLight(0x87CEEB, 0x5a7a5a, 0.3);
    scene.add(bounceLight);
}

function createEnvironment(scene) {
    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(300, 300);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x5a7a5a,
        roughness: 0.9,
        metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Pavement around building
    const pavementGeometry = new THREE.PlaneGeometry(50, 50);
    const pavementMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x888888,
        roughness: 0.8,
        metalness: 0.1
    });
    const pavement = new THREE.Mesh(pavementGeometry, pavementMaterial);
    pavement.rotation.x = -Math.PI / 2;
    pavement.position.y = 0.02;
    pavement.receiveShadow = true;
    scene.add(pavement);
    
    // Simple trees
    const treePositions = [
        [-20, 0, -15], [25, 0, -20], [-15, 0, 20], [20, 0, 15],
        [-30, 0, 0], [30, 0, -10], [-25, 0, 25], [35, 0, 5]
    ];
    
    treePositions.forEach(pos => {
        const tree = createTree();
        tree.position.set(...pos);
        scene.add(tree);
    });
    
    // Simple clouds
    for (let i = 0; i < 5; i++) {
        const cloud = createCloud();
        cloud.position.set(
            (Math.random() - 0.5) * 150,
            60 + Math.random() * 30,
            (Math.random() - 0.5) * 100 - 50
        );
        scene.add(cloud);
    }
}

function createTree() {
    const group = new THREE.Group();
    
    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.5, 3, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 1.5;
    trunk.castShadow = true;
    group.add(trunk);
    
    // Foliage
    const foliageGeometry = new THREE.SphereGeometry(2.5, 8, 6);
    const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.8 });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.y = 4;
    foliage.castShadow = true;
    group.add(foliage);
    
    // Scale variation
    const scale = 0.8 + Math.random() * 0.4;
    group.scale.set(scale, scale, scale);
    
    return group;
}

function createCloud() {
    const group = new THREE.Group();
    const geometry = new THREE.SphereGeometry(1, 8, 6);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        roughness: 1,
        transparent: true,
        opacity: 0.8
    });
    
    for (let i = 0; i < 5; i++) {
        const puff = new THREE.Mesh(geometry, material);
        puff.position.set(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 1,
            (Math.random() - 0.5) * 2
        );
        puff.scale.setScalar(1 + Math.random() * 2);
        group.add(puff);
    }
    
    return group;
}

function createProceduralBuilding(property) {
    const buildingGroup = new THREE.Group();
    
    // Determine building parameters based on property
    const floors = property.floor.includes('-') ? 
        parseInt(property.floor.split('-')[1]) : 
        parseInt(property.floor);
    const isCommercial = property.type === 'commercial';
    const isResidential = property.type === 'residential';
    
    const width = isCommercial ? 24 : 18;
    const depth = isCommercial ? 16 : 14;
    const floorHeight = 3.2;
    const totalHeight = floors * floorHeight;
    
    // Materials
    const concreteMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xe8e8e8, 
        roughness: 0.7,
        metalness: 0.1
    });
    
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x88ccff,
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.6,
        transparent: true,
        opacity: 0.7
    });
    
    const glassLitMaterial = new THREE.MeshStandardMaterial({
        color: 0xffeebb,
        emissive: 0xffaa00,
        emissiveIntensity: 0.5,
        roughness: 0.2
    });
    
    const balconyMaterial = new THREE.MeshStandardMaterial({
        color: 0xdddddd,
        roughness: 0.6,
        metalness: 0.2
    });
    
    const darkFrameMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.4,
        metalness: 0.6
    });
    
    // Podium / Base (first 1-2 floors)
    const podiumFloors = Math.min(2, floors);
    const podiumHeight = podiumFloors * floorHeight;
    const podiumWidth = width + 4;
    const podiumDepth = depth + 4;
    
    const podiumGeometry = new THREE.BoxGeometry(podiumWidth, podiumHeight, podiumDepth);
    const podium = new THREE.Mesh(podiumGeometry, concreteMaterial);
    podium.position.y = podiumHeight / 2;
    podium.castShadow = true;
    podium.receiveShadow = true;
    buildingGroup.add(podium);
    
    // Main tower
    const towerFloors = floors - podiumFloors;
    const towerHeight = towerFloors * floorHeight;
    
    if (towerFloors > 0) {
        const towerGeometry = new THREE.BoxGeometry(width, towerHeight, depth);
        const tower = new THREE.Mesh(towerGeometry, concreteMaterial);
        tower.position.y = podiumHeight + towerHeight / 2;
        tower.castShadow = true;
        tower.receiveShadow = true;
        buildingGroup.add(tower);
        
        // Windows and balconies for each floor
        for (let floor = 0; floor < towerFloors; floor++) {
            const yPos = podiumHeight + floor * floorHeight + floorHeight / 2;
            
            // Front and back windows
            const windowWidth = (width - 2) / 3;
            const windowHeight = 1.8;
            
            for (let side = 0; side < 2; side++) {
                const zOffset = side === 0 ? depth / 2 + 0.1 : -depth / 2 - 0.1;
                
                for (let w = 0; w < 3; w++) {
                    const xPos = -width / 2 + 1 + windowWidth / 2 + w * (windowWidth + 0.5);
                    const isLit = Math.random() > 0.4; // Some windows lit, some dark
                    
                    const winGeometry = new THREE.PlaneGeometry(windowWidth - 0.2, windowHeight);
                    const winMaterial = isLit ? glassLitMaterial : glassMaterial;
                    const window = new THREE.Mesh(winGeometry, winMaterial);
                    window.position.set(xPos, yPos, zOffset);
                    if (side === 1) window.rotation.y = Math.PI;
                    buildingGroup.add(window);
                    
                    // Window frame
                    const frameGeometry = new THREE.BoxGeometry(windowWidth, 2, 0.2);
                    const frame = new THREE.Mesh(frameGeometry, darkFrameMaterial);
                    frame.position.set(xPos, yPos, zOffset * 0.95);
                    buildingGroup.add(frame);
                }
            }
            
            // Side windows
            const sideWindowWidth = (depth - 2) / 2;
            for (let side = 0; side < 2; side++) {
                const xOffset = side === 0 ? width / 2 + 0.1 : -width / 2 - 0.1;
                
                for (let w = 0; w < 2; w++) {
                    const zPos = -depth / 2 + 1 + sideWindowWidth / 2 + w * (sideWindowWidth + 0.5);
                    const isLit = Math.random() > 0.4;
                    
                    const winGeometry = new THREE.PlaneGeometry(sideWindowWidth - 0.2, windowHeight);
                    const winMaterial = isLit ? glassLitMaterial : glassMaterial;
                    const window = new THREE.Mesh(winGeometry, winMaterial);
                    window.position.set(xOffset, yPos, zPos);
                    window.rotation.y = side === 0 ? Math.PI / 2 : -Math.PI / 2;
                    buildingGroup.add(window);
                }
            }
            
            // Balconies for residential (every other floor)
            if (isResidential && floor % 2 === 0 && floor > 0) {
                const balconyGeometry = new THREE.BoxGeometry(width + 1, 0.2, 2);
                const balcony = new THREE.Mesh(balconyGeometry, balconyMaterial);
                balcony.position.set(0, yPos - floorHeight / 2 + 0.1, depth / 2 + 1);
                balcony.castShadow = true;
                buildingGroup.add(balcony);
                
                // Balcony railing
                const railingGeometry = new THREE.BoxGeometry(width + 1, 1.0, 0.05);
                const railing = new THREE.Mesh(railingGeometry, darkFrameMaterial);
                railing.position.set(0, yPos - floorHeight / 2 + 0.6, depth / 2 + 2);
                buildingGroup.add(railing);
            }
        }
    }
    
    // Roof structure
    const roofHeight = 2;
    const roofGeometry = new THREE.BoxGeometry(width + 1, roofHeight, depth + 1);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x444444, 
        roughness: 0.5,
        metalness: 0.3
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = totalHeight + roofHeight / 2;
    roof.castShadow = true;
    buildingGroup.add(roof);
    
    // Rooftop equipment / AC units
    for (let i = 0; i < 3; i++) {
        const acGeometry = new THREE.BoxGeometry(2, 1.5, 1.5);
        const acMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
        const ac = new THREE.Mesh(acGeometry, acMaterial);
        ac.position.set(-5 + i * 5, totalHeight + roofHeight + 0.75, 0);
        ac.castShadow = true;
        buildingGroup.add(ac);
    }
    
    // Entrance
    const entranceWidth = 6;
    const entranceHeight = 3;
    const entranceGeometry = new THREE.BoxGeometry(entranceWidth, entranceHeight, 1);
    const entranceMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x222222,
        roughness: 0.3,
        metalness: 0.7
    });
    const entrance = new THREE.Mesh(entranceGeometry, entranceMaterial);
    entrance.position.set(0, entranceHeight / 2, depth / 2 + 2);
    buildingGroup.add(entrance);
    
    // Entrance canopy
    const canopyGeometry = new THREE.BoxGeometry(entranceWidth + 2, 0.2, 3);
    const canopyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.4,
        metalness: 0.5
    });
    const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
    canopy.position.set(0, entranceHeight + 0.1, depth / 2 + 3.5);
    canopy.castShadow = true;
    buildingGroup.add(canopy);
    
    // Entrance columns
    const columnGeometry = new THREE.CylinderGeometry(0.3, 0.3, entranceHeight, 8);
    const columnMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x666666,
        roughness: 0.3,
        metalness: 0.6
    });
    [-3, 3].forEach(x => {
        const column = new THREE.Mesh(columnGeometry, columnMaterial);
        column.position.set(x, entranceHeight / 2, depth / 2 + 2.5);
        column.castShadow = true;
        buildingGroup.add(column);
    });
    
    // Decorative elements - vertical lines on facade
    for (let i = 0; i < 4; i++) {
        const lineGeometry = new THREE.BoxGeometry(0.3, totalHeight, 0.2);
        const line = new THREE.Mesh(lineGeometry, darkFrameMaterial);
        line.position.set(-width / 2 + 2 + i * (width / 3), totalHeight / 2, depth / 2 + 0.1);
        buildingGroup.add(line);
    }
    
    // Property name sign
    const signGeometry = new THREE.BoxGeometry(8, 1.5, 0.3);
    const signMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xD4AF37,
        roughness: 0.3,
        metalness: 0.8,
        emissive: 0xD4AF37,
        emissiveIntensity: 0.2
    });
    const sign = new THREE.Mesh(signGeometry, signMaterial);
    sign.position.set(0, entranceHeight + 1, depth / 2 + 2.2);
    buildingGroup.add(sign);
    
    return buildingGroup;
}

function setupTourPositions(property) {
    const floors = property.floor.includes('-') ? 
        parseInt(property.floor.split('-')[1]) : 
        parseInt(property.floor);
    const totalHeight = floors * 3.2;
    
    ViewerState.tourPositions = [
        { name: 'Front Entrance', position: [0, 3, 35], target: [0, 5, 0] },
        { name: 'Aerial View', position: [40, 50, 40], target: [0, totalHeight / 2, 0] },
        { name: 'Side Perspective', position: [-35, 15, 20], target: [0, 10, 0] },
        { name: 'Top Down', position: [0, totalHeight + 20, 0], target: [0, 0, 0] },
        { name: 'Street Level', position: [20, 2, 30], target: [0, 8, 0] },
        { name: 'Rear View', position: [0, 15, -35], target: [0, 10, 0] }
    ];
    ViewerState.currentTourIndex = 0;
}

function setMode(mode) {
    ViewerState.isWalkMode = mode === 'walk';
    
    document.getElementById('tool-orbit').classList.toggle('active', mode === 'orbit');
    document.getElementById('tool-walk').classList.toggle('active', mode === 'walk');
    
    if (mode === 'walk') {
        startVirtualTour();
    } else {
        ViewerState.controls.enabled = true;
        ViewerState.isAnimating = false;
    }
}

function startVirtualTour() {
    if (ViewerState.isAnimating) return;
    ViewerState.isAnimating = true;
    
    const positions = ViewerState.tourPositions;
    let index = 0;
    
    function nextPosition() {
        if (!ViewerState.isWalkMode || !ViewerState.isAnimating) return;
        
        const pos = positions[index];
        animateCamera(pos.position, pos.target, 3000, () => {
            index = (index + 1) % positions.length;
            setTimeout(nextPosition, 1000);
        });
    }
    
    nextPosition();
}

function animateCamera(position, target, duration, callback) {
    if (!ViewerState.camera || !ViewerState.controls) return;
    
    const startPos = ViewerState.camera.position.clone();
    const startTarget = ViewerState.controls.target.clone();
    const endPos = new THREE.Vector3(...position);
    const endTarget = new THREE.Vector3(...target);
    
    const startTime = Date.now();
    
    function update() {
        if (!ViewerState.isAnimating) return;
        
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-in-out cubic)
        const ease = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        ViewerState.camera.position.lerpVectors(startPos, endPos, ease);
        ViewerState.controls.target.lerpVectors(startTarget, endTarget, ease);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (callback) callback();
        }
    }
    
    update();
}

function resetCamera() {
    if (!ViewerState.camera || !ViewerState.controls) return;
    
    animateCamera([40, 30, 50], [0, 15, 0], 1500);
    ViewerState.isWalkMode = false;
    ViewerState.isAnimating = false;
    document.getElementById('tool-orbit').classList.add('active');
    document.getElementById('tool-walk').classList.remove('active');
}

function toggleWireframe() {
    ViewerState.isWireframe = !ViewerState.isWireframe;
    document.getElementById('tool-wireframe').classList.toggle('active', ViewerState.isWireframe);
    
    ViewerState.scene.traverse((child) => {
        if (child.isMesh && child !== ViewerState.scene.children.find(c => c.geometry && c.geometry.type === 'PlaneGeometry')) {
            if (Array.isArray(child.material)) {
                child.material.forEach(m => m.wireframe = ViewerState.isWireframe);
            } else if (child.material) {
                child.material.wireframe = ViewerState.isWireframe;
            }
        }
    });
}

function toggleNightMode() {
    ViewerState.isNightMode = !ViewerState.isNightMode;
    document.getElementById('tool-lights').classList.toggle('active', ViewerState.isNightMode);
    
    if (ViewerState.isNightMode) {
        // Night settings
        ViewerState.scene.background = new THREE.Color(0x0a0a1a);
        ViewerState.scene.fog.color.set(0x0a0a1a);
        ViewerState.ambientLight.intensity = 0.1;
        ViewerState.sunLight.intensity = 0.2;
        ViewerState.sunLight.color.set(0x4444aa);
        ViewerState.fillLight.intensity = 0.1;
        
        // Add point lights for building
        const pointLight1 = new THREE.PointLight(0xffaa00, 2, 50);
        pointLight1.position.set(0, 5, 15);
        pointLight1.name = 'nightLight';
        ViewerState.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xffaa00, 1.5, 40);
        pointLight2.position.set(-10, 20, 10);
        pointLight2.name = 'nightLight';
        ViewerState.scene.add(pointLight2);
        
        const pointLight3 = new THREE.PointLight(0xffaa00, 1.5, 40);
        pointLight3.position.set(10, 20, 10);
        pointLight3.name = 'nightLight';
        ViewerState.scene.add(pointLight3);
        
        // Enhance window emissive
        ViewerState.scene.traverse((child) => {
            if (child.isMesh && child.material && child.material.emissive && child.material.emissive.r > 0) {
                child.material.emissiveIntensity = 2.0;
            }
        });
    } else {
        // Day settings
        ViewerState.scene.background = new THREE.Color(0x87CEEB);
        ViewerState.scene.fog.color.set(0x87CEEB);
        ViewerState.ambientLight.intensity = 0.4;
        ViewerState.sunLight.intensity = 1.5;
        ViewerState.sunLight.color.set(0xfff5e6);
        ViewerState.fillLight.intensity = 0.5;
        
        // Remove night lights
        const nightLights = [];
        ViewerState.scene.traverse((child) => {
            if (child.name === 'nightLight') nightLights.push(child);
        });
        nightLights.forEach(light => ViewerState.scene.remove(light));
        
        // Reset window emissive
        ViewerState.scene.traverse((child) => {
            if (child.isMesh && child.material && child.material.emissive && child.material.emissive.r > 0) {
                child.material.emissiveIntensity = 0.5;
            }
        });
    }
}

// Export for potential module use
window.ThreeViewer = {
    open: openViewer,
    close: closeViewer,
    toggleFullscreen,
    resetCamera
};