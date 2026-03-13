// 🚀 game.js - ROYAL ESPORTS FULL 3D EDITION (ULTRA PRO INSTANCING - ZERO LAG) 🚀

const firebaseConfig = { apiKey: "AIzaSyD3bPF3B-a6yR8gQxKcKPBVq9-kSPn3MsY", authDomain: "maze-run-7c4b3.firebaseapp.com", projectId: "maze-run-7c4b3", storageBucket: "maze-run-7c4b3.firebasestorage.app", messagingSenderId: "919108275682", appId: "1:919108275682:web:c14c14061bced458f6fdbb" }; 
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); } 
window.db = firebase.firestore(); 

const SVG_COG = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" class="ui-icon"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
const SVG_TROPHY = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" class="ui-icon-right"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`;
const SVG_SKULL = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" class="ui-icon-right"><circle cx="12" cy="10" r="8"></circle><path d="M8 17.8l-1.5 2.2a1 1 0 0 0 .8 1.5h9.4a1 1 0 0 0 .8-1.5l-1.5-2.2"></path><path d="M9 13h.01"></path><path d="M15 13h.01"></path></svg>`;
const SVG_USERS = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" class="ui-icon-right"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
const SVG_COIN = `<svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="2" fill="#ffd700" class="ui-icon-right"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle></svg>`;
const SVG_HEART = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="#ff4444" class="ui-icon-right"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;

let myProfile = { name: '', character: 'm1', password: '' }; let oppProfile = { name: '', character: 'm1' }; let myStats = { coins: 0, wins: 0, losses: 0, matches: 0, history: [] }; 
let appState = 'menu'; let isGameRunning = false; let hasGameEnded = false; 

let currentGraphics = localStorage.getItem('mazeGraphics') || 'HIGH';
window.toggleGraphics = function() { let btn = document.getElementById('btn-graphics'); if(currentGraphics === 'HIGH') currentGraphics = 'LOW'; else if(currentGraphics === 'LOW') currentGraphics = 'MEDIUM'; else currentGraphics = 'HIGH'; localStorage.setItem('mazeGraphics', currentGraphics); btn.innerHTML = SVG_COG + " " + currentGraphics; alert("Graphics set to " + currentGraphics + ". Game will restart to apply changes."); location.reload(); }
window.setAppState = function(state) { appState = state; } 

const AudioCtx = window.AudioContext || window.webkitAudioContext; const audioContext = new AudioCtx(); const gameSounds = {}; 
function loadSound(name, url) { const request = new XMLHttpRequest(); request.open('GET', url, true); request.responseType = 'arraybuffer'; request.onload = function() { audioContext.decodeAudioData(request.response, (buffer) => { gameSounds[name] = buffer; }); }; request.send(); } 
loadSound('coin', 'coin.mp3'); loadSound('run', 'run.mp3'); loadSound('win', 'win.mp3'); loadSound('lose', 'lose.mp3'); loadSound('ghost_voice', 'ghost.mp3'); loadSound('ghost_hit', 'hit.mp3'); 
let runSoundNode = null; let ghostAudioNode = null;
function playInstantSound(name, loop = false, vol = 0.8) { if (!gameSounds[name]) return null; if (audioContext.state === 'suspended') audioContext.resume(); const source = audioContext.createBufferSource(); source.buffer = gameSounds[name]; source.loop = loop; const gainNode = audioContext.createGain(); gainNode.gain.value = vol; source.connect(gainNode); gainNode.connect(audioContext.destination); source.start(0); return source; } 

// ==========================================
// 🚀 3D ENGINE & LIGHTING
// ==========================================
const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
const renderer = new THREE.WebGLRenderer({ antialias: currentGraphics === 'HIGH' }); 
if (currentGraphics === 'HIGH') { renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; } 
else if (currentGraphics === 'MEDIUM') { renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.BasicShadowMap; } 
else { renderer.setPixelRatio(1); renderer.shadowMap.enabled = false; }
renderer.setSize(window.innerWidth, window.innerHeight); 
renderer.domElement.style.position = 'fixed'; renderer.domElement.style.top = '0'; renderer.domElement.style.left = '0'; renderer.domElement.style.zIndex = '-1';
document.body.appendChild(renderer.domElement); 

const textureLoader = new THREE.TextureLoader();
const skyTex = textureLoader.load('sky.png'); const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false }); const skyBox = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 32), skyMat); scene.add(skyBox); 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); scene.add(ambientLight); 
const mainLight = new THREE.DirectionalLight(0xffeedd, 1.0); mainLight.position.set(20, 60, 20); 
if(currentGraphics !== 'LOW') { mainLight.castShadow = true; mainLight.shadow.mapSize.width = 1024; mainLight.shadow.mapSize.height = 1024; mainLight.shadow.camera.near = 0.5; mainLight.shadow.camera.far = 150; mainLight.shadow.camera.left = -50; mainLight.shadow.camera.right = 50; mainLight.shadow.camera.top = 50; mainLight.shadow.camera.bottom = -50; }
scene.add(mainLight); scene.fog = new THREE.FogExp2(0x87cefa, currentGraphics === 'LOW' ? 0.02 : 0.015); 

// 🧱 WALL & FLOOR
let wallUnit = 5; 
const brickTex = textureLoader.load('wall.png'); brickTex.wrapS = THREE.RepeatWrapping; brickTex.wrapT = THREE.RepeatWrapping; brickTex.repeat.set(1, 1);
const wallMat = new THREE.MeshStandardMaterial({ map: brickTex, roughness: 0.9 }); const wallGeo = new THREE.BoxGeometry(wallUnit, wallUnit, wallUnit);
const grassTex = textureLoader.load('floor.png'); grassTex.wrapS = THREE.RepeatWrapping; grassTex.wrapT = THREE.RepeatWrapping; grassTex.repeat.set(50, 50); 
const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), new THREE.MeshStandardMaterial({ map: grassTex, roughness: 1.0, color: 0x999999 })); 
floorMesh.rotation.x = -Math.PI / 2; if(currentGraphics !== 'LOW') floorMesh.receiveShadow = true; scene.add(floorMesh);

const menuEnvGroup = new THREE.Group(); scene.add(menuEnvGroup); const myPlayer = new THREE.Group(); scene.add(myPlayer); const opponentPlayer = new THREE.Group(); scene.add(opponentPlayer); opponentPlayer.position.set(1000, 1000, 1000); opponentPlayer.visible = false; 

// ==========================================
// 🚀 THE BRAHMASTRA: INSTANCED MESH SYSTEM 🚀
// ==========================================
const dracoLoader = new THREE.DRACOLoader(); dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); 
window.GameModels = { tree: null, coin: null, rock: null, grass: null, medkit: null };
window.PropSizes = { tree: 0.4, rock: 0.3, grass: 1.5, coin: 0.25, medkit: 1.0 }; // Dhyan se dekh, sizes yahan likhe hain!
const gLoader = new THREE.GLTFLoader(); gLoader.setDRACOLoader(dracoLoader);

// 1. Dynamic Models (Coin, Medkit) - Inko alag load kiya taki ghoom sakein
function prepDynamicModel(gltf, targetSize, centerIt) {
    let model = gltf.scene;
    if (centerIt) { const box = new THREE.Box3().setFromObject(model); const center = box.getCenter(new THREE.Vector3()); model.position.sub(center); }
    let wrapper = new THREE.Group(); wrapper.add(model); wrapper.scale.set(targetSize, targetSize, targetSize); 
    wrapper.traverse(c => { if(c.isMesh && currentGraphics !== 'LOW') c.castShadow = true; });
    return wrapper;
}
gLoader.load('coin.glb', (g) => { window.GameModels.coin = prepDynamicModel(g, window.PropSizes.coin, true); }, undefined, ()=>{});
gLoader.load('medkit.glb', (g) => { window.GameModels.medkit = prepDynamicModel(g, window.PropSizes.medkit, true); }, undefined, ()=>{});

// 2. Static Models (Tree, Rock, Grass) - Raw load kiya Instancing ke liye
gLoader.load('tree.glb', (g) => { window.GameModels.tree = g.scene; }, undefined, ()=>{});
gLoader.load('rock.glb', (g) => { window.GameModels.rock = g.scene; }, undefined, ()=>{});
gLoader.load('grass.glb', (g) => { window.GameModels.grass = g.scene; }, undefined, ()=>{});

// Ghost Load
const ghostGroup = new THREE.Group(); scene.add(ghostGroup); ghostGroup.visible = false;
const ghostMesh = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), new THREE.MeshStandardMaterial({color: 0xff0000, emissive: 0xaa0000, transparent: true, opacity: 0.8})); ghostMesh.position.y = 1.5; ghostGroup.add(ghostMesh);
let ghostMixer = null; let ghostAnim = null;
gLoader.load('ghost.glb', (gltf) => { const gModel = gltf.scene; gModel.scale.set(1.0, 1.0, 1.0); gModel.position.y = 0; ghostGroup.add(gModel); ghostMesh.visible = false; if(gltf.animations.length) { ghostMixer = new THREE.AnimationMixer(gModel); ghostAnim = ghostMixer.clipAction(gltf.animations[0]); ghostAnim.play(); } });

// ==========================================
// 🚀 INSTANCE BUILDER (1 Draw Call Magic) 🚀
// ==========================================
function buildInstancedProps(type, dataArray) {
    let baseModel = window.GameModels[type];
    
    // Agar GLB load nahi hua, toh simple dabba bana dega (Fallback)
    if(!baseModel || dataArray.length === 0) {
        if(dataArray.length > 0 && type === 'tree') {
            for(let d of dataArray) {
                let m = new THREE.Mesh(new THREE.BoxGeometry(2,5,2), new THREE.MeshStandardMaterial({color: 0x00ff00}));
                m.position.set(d.x, 2.5, d.z); window.mazeGroup.add(m);
            }
        }
        return;
    }

    let baseSize = window.PropSizes[type];
    baseModel.position.set(0,0,0); baseModel.rotation.set(0,0,0); baseModel.scale.set(1,1,1); baseModel.updateMatrixWorld(true);

    baseModel.traverse(c => {
        if(c.isMesh) {
            let imesh = new THREE.InstancedMesh(c.geometry, c.material, dataArray.length);
            if(currentGraphics !== 'LOW') { 
                imesh.castShadow = (type !== 'grass'); // Grass no shadow
                imesh.receiveShadow = (type !== 'grass'); 
            }
            let dummy = new THREE.Object3D();
            for(let i=0; i<dataArray.length; i++) {
                let d = dataArray[i];
                dummy.position.set(d.x, d.y, d.z);
                dummy.rotation.y = d.rot;
                let s = baseSize * d.scale;
                dummy.scale.set(s, s, s);
                dummy.updateMatrix();
                
                // Real magic: Local model offset + World position
                let finalMat = new THREE.Matrix4().multiplyMatrices(dummy.matrix, c.matrixWorld);
                imesh.setMatrixAt(i, finalMat);
            }
            imesh.instanceMatrix.needsUpdate = true;
            window.mazeGroup.add(imesh);
        }
    });
}

// Fallbacks for Dynamic
window.createHealthKit = function() { const group = new THREE.Group(); const box = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.8), new THREE.MeshStandardMaterial({color: 0xffffff})); const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.2, 0.2), new THREE.MeshBasicMaterial({color: 0xff0000})); const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.9), new THREE.MeshBasicMaterial({color: 0xff0000})); box.position.y = 0.3; c1.position.y = 0.6; c2.position.y = 0.6; group.add(box, c1, c2); return group; }
window.createRealCoin = function() { const group = new THREE.Group(); const rim = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.08, 16, 32), new THREE.MeshStandardMaterial({color: 0xffd700})); const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.1, 32), new THREE.MeshStandardMaterial({color: 0xffaa00})); inner.rotation.x = Math.PI/2; group.add(rim, inner); return group; }
window.createFortGate = function() { const group = new THREE.Group(); const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 7, 8), wallMat); p1.position.set(-2.5, 3.5, 0); group.add(p1); const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 7, 8), wallMat); p2.position.set(2.5, 3.5, 0); group.add(p2); const beam = new THREE.Mesh(new THREE.BoxGeometry(7, 1.5, 2), wallMat); beam.position.set(0, 7.5, 0); group.add(beam); return group; } 

let myMixer = null, oppMixer = null; let myAnims = {}, oppAnims = {}; let myCurrentAnim = 'idle', oppCurrentAnim = 'idle'; let lobbyRotationY = 0; let isDraggingLobby = false; 

// UI & Logic
window.onload = async function() { /* ... Setup already in index ... */ }
window.selectChar = function(c) { myProfile.character = c; document.querySelectorAll('.char-btn').forEach(btn => { btn.style.border = '1px solid transparent'; }); const selectedBtn = document.getElementById('btn-' + c); if(selectedBtn) { selectedBtn.style.border = '1px solid #00ff88'; } } 
window.saveProfile = async function() { const name = document.getElementById('username-input').value.trim(); document.getElementById('login-screen').style.display = 'none'; document.getElementById('loading-screen').style.display = 'flex'; myProfile.name = name; window.loadMyCharacter(); } 

function loadMyCharacter() { 
    const char = myProfile.character || 'm1'; const files = [`${char}_idle`, `${char}_run`, `${char}_win`, `${char}_lose`]; let tempClips = {}; let oldMesh = myPlayer.getObjectByName("charMesh"); if(oldMesh) myPlayer.remove(oldMesh); const manager = new THREE.LoadingManager(); const loader = new THREE.GLTFLoader(manager); loader.setDRACOLoader(dracoLoader); 
    manager.onLoad = function () { 
        if(tempClips[`${char}_idle`]) myAnims['idle'] = myMixer.clipAction(tempClips[`${char}_idle`]); 
        if(tempClips[`${char}_run`]) myAnims['run'] = myMixer.clipAction(tempClips[`${char}_run`]); 
        if(tempClips[`${char}_win`]) { myAnims['win'] = myMixer.clipAction(tempClips[`${char}_win`]); } 
        if(tempClips[`${char}_lose`]) { myAnims['lose'] = myMixer.clipAction(tempClips[`${char}_lose`]); } 
        myPlayer.visible = true; appState = 'menu'; myCurrentAnim = 'idle'; if(myAnims['idle']) myAnims['idle'].reset().play(); 
        
        while(menuEnvGroup.children.length > 0) menuEnvGroup.remove(menuEnvGroup.children[0]); 
        for(let wX = -10; wX <= 10; wX++) { for(let wY = 0; wY < 5; wY++) { const backW = new THREE.Mesh(wallGeo, wallMat); backW.position.set(wX * wallUnit, (wY * wallUnit) + (wallUnit/2), -15); if(currentGraphics !== 'LOW') { backW.castShadow = true; backW.receiveShadow = true; } menuEnvGroup.add(backW); } }
        setTimeout(() => { document.getElementById('loading-screen').style.display = 'none'; document.getElementById('main-menu').style.display = 'flex'; }, 500); 
    }; 
    files.forEach(file => { loader.load(`./${file}.glb`, (gltf) => { if (file.includes('idle')) { const model = gltf.scene; model.name = "charMesh"; model.scale.set(2.2, 2.2, 2.2); model.traverse(c => { if(c.isMesh && currentGraphics !== 'LOW') c.castShadow = true; }); myPlayer.add(model); myMixer = new THREE.AnimationMixer(model); } if(gltf.animations.length) tempClips[file] = gltf.animations[0]; }); }); 
} 

// ==========================================
// 🚀 JOYSTICK & TOUCH 🚀
// ==========================================
let joyActive = false; let joyMoveX = 0; let joyMoveY = 0; let joyTouchId = null; const speed = 0.18; let targetRotation = 0; let targetPitch = 0; let lookActive = false; let lookTouchId = null; let prevTouchX = 0; let prevTouchY = 0; 
const joyBase = document.getElementById('joystick-base'); const joyStick = document.getElementById('joystick-stick'); 
joyBase.addEventListener('touchstart', (e) => { e.preventDefault(); joyTouchId = e.changedTouches[0].identifier; joyActive = true; updateJoystick(e.changedTouches[0]); }, {passive: false}); joyBase.addEventListener('touchmove', (e) => { e.preventDefault(); if(joyActive) for(let t of e.changedTouches) if(t.identifier === joyTouchId) updateJoystick(t); }, {passive: false}); joyBase.addEventListener('touchend', (e) => { e.preventDefault(); for(let t of e.changedTouches) if(t.identifier === joyTouchId) { joyActive = false; joyTouchId = null; joyStick.style.transform = `translate(-50%, -50%)`; joyMoveX = 0; joyMoveY = 0; } }, {passive: false}); 
function updateJoystick(touch) { if(!isGameRunning || myStatus !== 'playing') return; const rect = joyBase.getBoundingClientRect(); const maxRadius = rect.width / 2; let dx = touch.clientX - (rect.left + maxRadius); let dy = touch.clientY - (rect.top + maxRadius); const dist = Math.sqrt(dx*dx + dy*dy); if (dist > maxRadius) { dx = (dx / dist) * maxRadius; dy = (dy / dist) * maxRadius; } joyStick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`; let nx = dx / maxRadius; let ny = dy / maxRadius; joyMoveX = Math.abs(nx) < 0.15 ? 0 : nx; joyMoveY = Math.abs(ny) < 0.15 ? 0 : ny; } 
document.addEventListener('touchstart', (e) => { for(let t of e.changedTouches) { if (appState === 'menu' || appState === 'lobby') { isDraggingLobby = true; prevTouchX = t.clientX; } else if (isGameRunning && t.clientX > window.innerWidth / 2 && !lookActive) { lookActive = true; lookTouchId = t.identifier; prevTouchX = t.clientX; prevTouchY = t.clientY; } } }, {passive: false}); document.addEventListener('touchmove', (e) => { for(let t of e.changedTouches) { if (isDraggingLobby && (appState === 'menu' || appState === 'lobby')) { lobbyRotationY += (t.clientX - prevTouchX) * 0.01; prevTouchX = t.clientX; } else if (lookActive && t.identifier === lookTouchId) { targetRotation -= (t.clientX - prevTouchX) * 0.008; targetPitch += (t.clientY - prevTouchY) * 0.008; targetPitch = Math.max(-Math.PI/3, Math.min(Math.PI/4, targetPitch)); prevTouchX = t.clientX; prevTouchY = t.clientY; } } }, {passive: false}); document.addEventListener('touchend', (e) => { isDraggingLobby = false; for(let t of e.changedTouches) if(t.identifier === lookTouchId) { lookActive = false; lookTouchId = null; } }, {passive: false}); 

let mazeSize = 13; let walls = []; window.mazeGroup = new THREE.Group(); scene.add(window.mazeGroup); let coinMeshes = {}; let healthMeshes = {}; window.gameState = { map: null }; let isSinglePlayer = true; let opponentData = null; let myStatus = 'playing'; let oppStatus = 'playing'; let myCoins = 0; let oppCoins = 0; let isSpectating = false; let myHealth = 100; let oppHealth = 100; let ghostAttackCooldown = 0; let currentGhostSpeed = 0.12; let ghostCurrentPath = []; let lastPathCalcTime = 0;

window.worldToGrid = function(wx, wz) { let s = window.gameState.size || window.mazeSize || 13; let offset = (s * wallUnit) / 2; let x = Math.round((wx + offset) / wallUnit); let z = Math.round((wz + offset) / wallUnit); return {x: Math.max(0, Math.min(s - 1, x)), z: Math.max(0, Math.min(s - 1, z))}; }
window.gridToWorld = function(gx, gz) { let s = window.gameState.size || window.mazeSize || 13; let offset = (s * wallUnit) / 2; return {x: (gx * wallUnit) - offset, z: (gz * wallUnit) - offset}; }
window.findGhostPath = function(sx, sz, tx, tz) { let s = window.gameState.size || window.mazeSize || 13; if(sx === tx && sz === tz) return []; let queue = [{x: sx, z: sz, path: []}]; let visited = new Set([`${sx},${sz}`]); let dirs = [[0,-1],[0,1],[-1,0],[1,0]]; while(queue.length > 0) { let curr = queue.shift(); if(curr.x === tx && curr.z === tz) return curr.path; for(let d of dirs) { let nx = curr.x + d[0], nz = curr.z + d[1]; if(nx >= 0 && nx < s && nz >= 0 && nz < s) { if(window.gameState.map[nz][nx] !== 1 && !visited.has(`${nx},${nz}`)) { visited.add(`${nx},${nz}`); queue.push({x: nx, z: nz, path: [...curr.path, {x: nx, z: nz}]}); } } } } return []; }
window.updateHealthUI = function() { let hFill = document.getElementById('health-fill'); let hText = document.getElementById('health-text'); if(hFill) { hFill.style.width = Math.min(100, (myHealth / 200) * 100) + '%'; } if(hText) hText.innerText = Math.floor(myHealth) + '%'; }
function playAnim(p, anim) { let anims = p === 'my' ? myAnims : oppAnims; let cur = p === 'my' ? myCurrentAnim : oppCurrentAnim; if (!anims[anim]) return; if (cur !== anim) { if (anims[cur]) anims[cur].fadeOut(0.2); anims[anim].reset().fadeIn(0.2).play(); if (p === 'my') myCurrentAnim = anim; else oppCurrentAnim = anim; } else { if (!anims[anim].isRunning()) anims[anim].play(); } } 

// ==========================================
// 🚀 3D MAZE BUILDER ENGINE (INSTANCED) 🚀
// ==========================================
window.buildMazeFromMap = function(mapArray, dynamicSize) { 
    if(dynamicSize) { window.mazeSize = dynamicSize; window.gameState.size = dynamicSize; }
    let size = window.gameState.size || window.mazeSize || 13; let offset = (size * wallUnit) / 2; 

    while(window.mazeGroup.children.length > 0) window.mazeGroup.remove(window.mazeGroup.children[0]); walls = []; coinMeshes = {}; healthMeshes = {}; hasGameEnded = false; myCoins = 0; oppCoins = 0; myStatus = 'playing'; oppStatus = 'playing'; isSpectating = false; myHealth = 100; oppHealth = 100; window.updateHealthUI();
    ghostGroup.visible = true; ghostAttackCooldown = 0; ghostCurrentPath = []; if(ghostAudioNode) { ghostAudioNode.stop(); ghostAudioNode = null; }
    document.getElementById('joystick-wrapper').style.display = 'block'; document.getElementById('spectate-btn').style.display = 'none'; document.getElementById('coin-counter').innerText = `COINS: 0`; playAnim('my', 'idle'); targetPitch = 0; targetRotation = 0; 
    
    // Yahan hum data jama karenge, sidha scene me nahi dalenge
    let instData = { tree: [], rock: [], grass: [] };

    // 🌳 JUNGLE ENVIRONMENT (Wapas 300 Trees, lekin Lag = 0)
    let envRange = offset + 100;
    for(let i=0; i<300; i++) { 
        let tx = (Math.random() - 0.5) * envRange * 2; let tz = (Math.random() - 0.5) * envRange * 2;
        if (tx < -offset || tx > offset || tz < -offset || tz > offset) {
            instData.tree.push({x: tx, y: 0, z: tz, rot: Math.random() * Math.PI*2, scale: 0.8 + Math.random() * 0.5});
            if(Math.random() > 0.4) instData.grass.push({x: tx+2, y: 0, z: tz+2, rot: Math.random() * Math.PI*2, scale: 0.8 + Math.random() * 0.5});
        }
    }

    let midFreeGrid = {x: Math.floor(size/2), z: Math.floor(size/2)};
    for(let z=midFreeGrid.z-2; z<midFreeGrid.z+2; z++) { for(let x=midFreeGrid.x-2; x<midFreeGrid.x+2; x++) { if(mapArray[z] && mapArray[z][x] !== 1) { midFreeGrid = {x, z}; break; } } }
    let ghostSpawn = window.gridToWorld(midFreeGrid.x, midFreeGrid.z); ghostGroup.position.set(ghostSpawn.x, 0, ghostSpawn.z); 

    for(let z = 0; z < size; z++) { 
        for(let x = 0; x < size; x++) { 
            const posX = (x * wallUnit) - offset; const posZ = (z * wallUnit) - offset; 
            
            if(mapArray[z][x] === 1) { 
                let oldW = new THREE.Mesh(wallGeo, wallMat); oldW.position.set(posX, wallUnit/2, posZ); 
                if(currentGraphics !== 'LOW') { oldW.castShadow = true; oldW.receiveShadow = true; } mazeGroup.add(oldW); walls.push(new THREE.Box3().setFromObject(oldW));
            } else { 
                let rand = Math.random();
                if(rand > 0.95) instData.rock.push({x: posX + (Math.random()-0.5)*2, y: 0, z: posZ + (Math.random()-0.5)*2, rot: Math.random()*Math.PI*2, scale: 0.8+Math.random()*0.5});
                else if(rand > 0.80) instData.grass.push({x: posX + (Math.random()-0.5)*2, y: 0, z: posZ + (Math.random()-0.5)*2, rot: Math.random()*Math.PI*2, scale: 0.8+Math.random()*0.5});

                if(mapArray[z][x] === 3) { 
                    let coin = window.GameModels.coin ? window.GameModels.coin.clone() : window.createRealCoin(); 
                    coin.position.set(posX, 1.0, posZ); coinMeshes[`${x}_${z}`] = coin; mazeGroup.add(coin); 
                } 
                if(mapArray[z][x] === 4) { 
                    let kit = window.GameModels.medkit ? window.GameModels.medkit.clone() : window.createHealthKit(); 
                    kit.position.set(posX, 0.5, posZ); healthMeshes[`${x}_${z}`] = kit; mazeGroup.add(kit); 
                }
            } 
        } 
    } 

    // 🔥 INSTANCING MAGIC 🔥
    buildInstancedProps('tree', instData.tree);
    buildInstancedProps('rock', instData.rock);
    buildInstancedProps('grass', instData.grass);

    let entryPosX = (1 * wallUnit) - offset; let entryPosZ = (0 * wallUnit) - offset; let exitPosX = ((size-2) * wallUnit) - offset; let exitPosZ = ((size-1) * wallUnit) - offset; 
    let fenceLeft = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(exitPosX - 100 - wallUnit/2, 5, exitPosZ + 2), new THREE.Vector3(200, 10, 4)); let fenceRight = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(exitPosX + 100 + wallUnit/2, 5, exitPosZ + 2), new THREE.Vector3(200, 10, 4)); walls.push(fenceLeft, fenceRight); 
    let entryGate = window.createFortGate(); entryGate.position.set(entryPosX, 0, entryPosZ); mazeGroup.add(entryGate); let exitGate = window.createFortGate(); exitGate.position.set(exitPosX, 0, exitPosZ); mazeGroup.add(exitGate);
    
    myPlayer.position.set(entryPosX, 0, entryPosZ - 2.0); 
} 

function checkCollision(newPos) { const pBox = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(newPos.x, 1.0, newPos.z), new THREE.Vector3(1.2, 2.0, 1.2)); for(let w of walls) if(pBox.intersectsBox(w)) return true; return false; } 

window.evaluateGameEnd = function(isTimeout = false) { 
    if(hasGameEnded) return; hasGameEnded = true; isGameRunning = false; joyMoveX = 0; joyMoveY = 0; document.getElementById('joystick-stick').style.transform = `translate(-50%, -50%)`; if(runSoundNode) { runSoundNode.stop(); runSoundNode = null; } ghostGroup.visible = false;
    let size = window.gameState.size || window.mazeSize || 13; let exitPosX = ((size-2) * wallUnit) - ((size * wallUnit) / 2); let exitPosZ = ((size-1) * wallUnit) - ((size * wallUnit) / 2); 
    myPlayer.position.set(exitPosX - 1.5, 0, exitPosZ + 6.0); myPlayer.rotation.y = 0; 
    let iWon = (myStatus === 'escaped'); playAnim('my', iWon ? 'win' : 'lose'); if(iWon && typeof playInstantSound === 'function') playInstantSound('win'); else if(typeof playInstantSound === 'function') playInstantSound('lose'); 
    
    const title = document.getElementById('end-title'); const desc = document.getElementById('end-desc'); 
    if(iWon) { title.innerHTML = "LEVEL CLEARED! " + SVG_TROPHY; title.style.color = "#00ff88"; desc.innerText = `You looted ${myCoins} Coins! Next level unlocked.`; } 
    else { title.innerHTML = "GAME OVER! " + SVG_SKULL; title.style.color = "#ff4444"; desc.innerText = "Better luck next time."; } 
    document.getElementById('end-solo-btns').style.display = 'flex'; document.getElementById('end-mp-btns').style.display = 'none'; setTimeout(() => { document.getElementById('endScreen').style.display = 'flex'; }, 4000); 
} 

const clock = new THREE.Clock(); let lastNetTime = 0; let lastSentAnim = 'idle'; 
function animate() { 
    requestAnimationFrame(animate); const delta = Math.min(clock.getDelta(), 0.1); 
    if(myMixer) myMixer.update(delta); if(oppMixer) oppMixer.update(delta); if(ghostMixer) ghostMixer.update(delta);
    
    if (appState === 'menu') { camera.position.lerp(new THREE.Vector3(0, 3.8, 8.0), 0.1); camera.lookAt(0, 1.5, 0); myPlayer.position.lerp(new THREE.Vector3(0, 0, 0), 0.1); if(!isDraggingLobby) lobbyRotationY += 0.005; myPlayer.rotation.y = lobbyRotationY; if(window.mazeGroup) window.mazeGroup.visible = false; ghostGroup.visible = false; menuEnvGroup.visible = true; skyBox.position.copy(camera.position); } 
    else if (appState === 'lobby') { camera.position.lerp(new THREE.Vector3(0, 3.8, 8.0), 0.1); camera.lookAt(0, 1.5, 0); myPlayer.position.lerp(new THREE.Vector3(-1.2, 0, 0), 0.1); myPlayer.rotation.y = lobbyRotationY; playAnim('my', 'idle'); if(window.mazeGroup) window.mazeGroup.visible = false; ghostGroup.visible = false; menuEnvGroup.visible = true; skyBox.position.copy(camera.position); } 
    else if (appState === 'playing') { 
        menuEnvGroup.visible = false; if(window.mazeGroup) window.mazeGroup.visible = true; skyBox.position.copy(camera.position); let currentSize = window.gameState.size || window.mazeSize || 13;
        
        if(isGameRunning) { 
            if(!ghostAudioNode && typeof playInstantSound === 'function') { ghostAudioNode = playInstantSound('ghost_voice', true, 0.5); }
            for(let key in coinMeshes) { if(coinMeshes[key].rotation) coinMeshes[key].rotation.y += 2.0 * delta; }
            for(let key in healthMeshes) if(healthMeshes[key].rotation) healthMeshes[key].rotation.y += 1.0 * delta;

            if (myStatus === 'playing') {
                let currentGhostSpeed = 0.08; 
                if(ghostAttackCooldown > 0) { ghostAttackCooldown -= delta; } 
                else {
                    if(Date.now() - lastPathCalcTime > 500) { let ghostGrid = window.worldToGrid(ghostGroup.position.x, ghostGroup.position.z); let targetGrid = window.worldToGrid(myPlayer.position.x, myPlayer.position.z); ghostCurrentPath = window.findGhostPath(ghostGrid.x, ghostGrid.z, targetGrid.x, targetGrid.z); lastPathCalcTime = Date.now(); }
                    if(ghostCurrentPath.length > 0) { let nextGrid = ghostCurrentPath[0]; let nextWorld = window.gridToWorld(nextGrid.x, nextGrid.z); let dir = new THREE.Vector3(nextWorld.x - ghostGroup.position.x, 0, nextWorld.z - ghostGroup.position.z); if(dir.length() < 0.5) { ghostCurrentPath.shift(); } else { dir.normalize(); ghostGroup.rotation.y = Math.atan2(dir.x, dir.z); ghostGroup.position.addScaledVector(dir, currentGhostSpeed); } } 
                    else { let dir = new THREE.Vector3(myPlayer.position.x - ghostGroup.position.x, 0, myPlayer.position.z - ghostGroup.position.z).normalize(); ghostGroup.rotation.y = Math.atan2(dir.x, dir.z); ghostGroup.position.addScaledVector(dir, currentGhostSpeed); }
                }

                if(myPlayer.position.distanceTo(ghostGroup.position) < 1.8 && ghostAttackCooldown <= 0) {
                    if(typeof playInstantSound === 'function') playInstantSound('ghost_hit', false, 1.0); myHealth -= 25; window.updateHealthUI(); ghostAttackCooldown = 3.0; 
                    if(myHealth <= 0 && myStatus !== 'dead') { myStatus = 'dead'; playAnim('my', 'lose'); window.evaluateGameEnd(false); }
                }

                let isMoving = (joyMoveX !== 0 || joyMoveY !== 0); 
                if (isMoving) { const camForward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, targetRotation, 0)); const camRight = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, targetRotation, 0)); const moveDir = new THREE.Vector3().addScaledVector(camForward, -joyMoveY).addScaledVector(camRight, joyMoveX).normalize(); const nextPos = myPlayer.position.clone().addScaledVector(moveDir, speed); if (!checkCollision(nextPos)) { myPlayer.position.copy(nextPos); } const targetModelRotation = Math.atan2(moveDir.x, moveDir.z); let diff = targetModelRotation - myPlayer.rotation.y; diff = Math.atan2(Math.sin(diff), Math.cos(diff)); myPlayer.rotation.y += diff * 0.3; playAnim('my', 'run'); if(!runSoundNode && typeof playInstantSound === 'function') runSoundNode = playInstantSound('run', true); } else { playAnim('my', 'idle'); if(runSoundNode) { runSoundNode.stop(); runSoundNode = null; } } 
                
                for(let key in coinMeshes) { let c = coinMeshes[key]; if(myPlayer.position.distanceTo(c.position) < 2.0) { if(typeof playInstantSound === 'function') playInstantSound('coin'); myCoins++; document.getElementById('coin-counter').innerText = "COINS: " + myCoins; window.mazeGroup.remove(c); delete coinMeshes[key]; let coords = key.split('_'); window.gameState.map[coords[1]][coords[0]] = 0; } } 
                for(let key in healthMeshes) { let h = healthMeshes[key]; if(myPlayer.position.distanceTo(h.position) < 2.0 && myHealth < 200) { if(typeof playInstantSound === 'function') playInstantSound('coin'); myHealth = Math.min(200, myHealth + 25); window.updateHealthUI(); window.mazeGroup.remove(h); delete healthMeshes[key]; let coords = key.split('_'); if(coords.length > 1 && window.gameState.map[coords[1]]) window.gameState.map[coords[1]][coords[0]] = 0; } }

                let escapeLimit = ((currentSize * wallUnit) / 2); let exitPosX = ((currentSize-2) * wallUnit) - escapeLimit; 
                if(myPlayer.position.z > escapeLimit - 2.5 && Math.abs(myPlayer.position.x - exitPosX) < (wallUnit * 0.8)) { myStatus = 'escaped'; joyMoveX = 0; joyMoveY = 0; myPlayer.position.set(myPlayer.position.x, 0, escapeLimit + 3.0); myPlayer.rotation.y = 0; if(runSoundNode) { runSoundNode.stop(); runSoundNode = null; } window.evaluateGameEnd(); } 
            } 
        } 
        if (hasGameEnded) { let camTargetObj = new THREE.Vector3(((currentSize-2) * wallUnit) - ((currentSize * wallUnit) / 2), 0, ((currentSize-1) * wallUnit) - ((currentSize * wallUnit) / 2) + 6.0); const zoomPos = camTargetObj.clone().add(new THREE.Vector3(0, 3.0, 8.5)); camera.position.lerp(zoomPos, 0.05); camera.lookAt(camTargetObj.clone().add(new THREE.Vector3(0, 1.4, 0))); } 
        else { 
            let activeTarget = myPlayer; let activeRotation = targetRotation; let activePitch = targetPitch; let baseHeight = 3.0; let baseDist = 5.0; let lookHeight = 2.0; 
            const rayOrigin = activeTarget.position.clone(); rayOrigin.y += 1.5; const backwardDir = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(0, activeRotation, 0)).normalize(); const ray = new THREE.Ray(rayOrigin, backwardDir); let minDist = baseDist; const pt = new THREE.Vector3(); 
            for(let w of walls) { if(ray.intersectBox(w, pt)) { const dist = rayOrigin.distanceTo(pt); if(dist < minDist) minDist = dist; } } 
            let tZ = Math.max(1.0, minDist - 1.0); let camYOffset = baseHeight + (baseDist - tZ) * 0.6 + (activePitch * 3.5); let lookYOffset = lookHeight - (activePitch * 3.0); const rOffset = new THREE.Vector3(0, camYOffset, tZ).applyEuler(new THREE.Euler(0, activeRotation, 0)); 
            camera.position.lerp(activeTarget.position.clone().add(rOffset), 0.15); camera.lookAt(activeTarget.position.clone().add(new THREE.Vector3(0, lookYOffset, 0))); 
        } 
    } 
    renderer.render(scene, camera); 
} 
animate(); 

window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); }); 
window.resetLocalGame = function() { hasGameEnded = false; isGameRunning = false; window.setAppState('lobby'); if(ghostAudioNode) { ghostAudioNode.stop(); ghostAudioNode = null; } } 
window.startLocalCount = function() { isGameRunning = true; window.setAppState('playing'); }
