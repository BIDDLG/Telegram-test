// 🚀 game.js - ROYAL ESPORTS FULL 3D EDITION (VISIBLE & PERFECT SIZE) 🚀

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
window.addEventListener('beforeunload', () => { if(myProfile.name) window.db.collection('players').doc(myProfile.name).update({ online: false }); }); 

window.onload = async function() { 
    let gBtn = document.getElementById('btn-graphics'); if(gBtn) gBtn.innerHTML = SVG_COG + " " + currentGraphics;
    let localUser = localStorage.getItem('mazeUser'); 
    if (localUser) { 
        let parsedUser = JSON.parse(localUser); 
        document.getElementById('login-screen').style.display = 'none'; document.getElementById('loading-screen').style.display = 'flex'; document.getElementById('load-title').innerText = "SYNCING ACCOUNT..."; 
        try { 
            const doc = await window.db.collection('players').doc(parsedUser.name).get(); 
            if (doc.exists && doc.data().password === parsedUser.password) { 
                const data = doc.data(); myProfile = parsedUser; myProfile.character = data.character || data.gender || 'm1'; myStats = { coins: data.coins || 0, wins: data.wins || 0, losses: data.losses || 0, matches: data.matches || 0, history: data.history || [] }; 
                await window.db.collection('players').doc(myProfile.name).update({ online: true }); 
                if(typeof setupInviteListener === 'function') setupInviteListener(); 
                if(typeof setupLiveFriendsList === 'function') setupLiveFriendsList(); 
                document.getElementById('welcome-msg').innerText = `Welcome back, ${myProfile.name}!`; document.getElementById('player-role').innerText = myProfile.name.toUpperCase(); document.getElementById('lobby-p1-name').innerText = myProfile.name.toUpperCase(); document.getElementById('load-title').innerText = "LOADING ASSETS..."; 
                if(typeof window.forceLandscapeLock === 'function') window.forceLandscapeLock(); 
                loadMyCharacter(); 
            } else { localStorage.removeItem('mazeUser'); document.getElementById('login-screen').style.display = 'flex'; document.getElementById('loading-screen').style.display = 'none'; } 
        } catch (e) { localStorage.removeItem('mazeUser'); document.getElementById('login-screen').style.display = 'flex'; document.getElementById('loading-screen').style.display = 'none'; } 
    } 
} 

window.selectChar = function(c) { myProfile.character = c; document.querySelectorAll('.char-btn').forEach(btn => { btn.style.background = 'rgba(255, 255, 255, 0.05)'; btn.style.border = '1px solid transparent'; }); const selectedBtn = document.getElementById('btn-' + c); if(selectedBtn) { selectedBtn.style.background = 'rgba(0, 255, 136, 0.3)'; selectedBtn.style.border = '1px solid #00ff88'; } } 
window.updateCharacter = async function(c) { document.getElementById('change-char-overlay').style.display = 'none'; myProfile.character = c; localStorage.setItem('mazeUser', JSON.stringify(myProfile)); document.getElementById('main-menu').style.display = 'none'; document.getElementById('loading-screen').style.display = 'flex'; document.getElementById('load-title').innerText = "UPDATING AGENT..."; try { await window.db.collection('players').doc(myProfile.name).update({ character: c }); } catch(e) {} loadMyCharacter(); } 

window.saveProfile = async function() { 
    const loginBtn = document.getElementById('login-btn'); loginBtn.innerText = "PLEASE WAIT..."; loginBtn.disabled = true; const nameInput = document.getElementById('username-input').value.trim(); const passInput = document.getElementById('password-input').value.trim(); 
    if(nameInput.length < 3 || passInput.length < 3) { alert("Invalid length! Minimum 3 chars."); loginBtn.innerHTML = 'ENTER HUB'; loginBtn.disabled = false; return; } 
    if(typeof window.forceLandscapeLock === 'function') window.forceLandscapeLock(); 
    document.getElementById('login-screen').style.display = 'none'; document.getElementById('loading-screen').style.display = 'flex'; document.getElementById('load-title').innerText = "AUTHENTICATING..."; 
    let isNewUser = false; let userData = null; 
    try { const doc = await window.db.collection('players').doc(nameInput).get(); if (doc.exists) { userData = doc.data(); if (userData.password !== passInput) { alert("❌ Wrong Password!"); document.getElementById('login-screen').style.display = 'flex'; document.getElementById('loading-screen').style.display = 'none'; loginBtn.innerHTML = 'ENTER HUB'; loginBtn.disabled = false; return; } } else { isNewUser = true; } } catch (e) { alert("Internet Error!"); document.getElementById('login-screen').style.display = 'flex'; document.getElementById('loading-screen').style.display = 'none'; loginBtn.innerHTML = 'ENTER HUB'; loginBtn.disabled = false; return; } 
    try { if(isNewUser) { myProfile.name = nameInput; myProfile.password = passInput; myStats = { coins: 0, wins: 0, losses: 0, matches: 0, history: [] }; await window.db.collection('players').doc(nameInput).set({ name: nameInput, password: passInput, character: myProfile.character, coins: 0, wins: 0, losses: 0, matches: 0, history: [] }); } else { myProfile.name = nameInput; myProfile.password = passInput; myProfile.character = userData.character || 'm1'; myStats = { coins: userData.coins || 0, wins: userData.wins || 0, losses: userData.losses || 0, matches: userData.matches || 0, history: userData.history || [] }; } await window.db.collection('players').doc(nameInput).update({ online: true }); } catch (e) {} 
    if(typeof setupInviteListener === 'function') setupInviteListener(); 
    if(typeof setupLiveFriendsList === 'function') setupLiveFriendsList(); 
    localStorage.setItem('mazeUser', JSON.stringify(myProfile)); document.getElementById('welcome-msg').innerText = `Welcome, ${myProfile.name}!`; document.getElementById('player-role').innerText = myProfile.name.toUpperCase(); document.getElementById('lobby-p1-name').innerText = myProfile.name.toUpperCase(); document.getElementById('load-title').innerText = "LOADING ASSETS..."; loadMyCharacter(); 
} 

window.logoutProfile = function() { document.body.style.transition = "0.2s"; document.body.style.opacity = "0"; if(myProfile.name) { window.db.collection('players').doc(myProfile.name).update({ online: false }).catch(e=>{}); } localStorage.removeItem('mazeUser'); setTimeout(() => { location.reload(); }, 150); } 
window.showStats = function() { 
    try { document.getElementById('stat-name').innerText = myProfile.name || "PLAYER"; document.getElementById('stat-coins').innerText = myStats?.coins || 0; document.getElementById('stat-wins').innerText = myStats?.wins || 0; document.getElementById('stat-losses').innerText = myStats?.losses || 0; document.getElementById('stat-matches').innerText = myStats?.matches || 0; let historyList = document.getElementById('match-history-list'); if(historyList) { let historyHTML = ""; if (myStats && myStats.history && myStats.history.length > 0) { myStats.history.forEach(match => { let resColor = match.res === "WON" ? "#00ff88" : (match.res === "LOST" ? "#ff4444" : "#00ffff"); historyHTML += `<div style="border-bottom: 1px solid #333; padding: 5px 0; display:flex; justify-content:space-between; align-items:center;"><div><span style="color:${resColor}; font-weight:bold;">${match.res}</span><span style="color:#aaa;"> vs </span><span style="color:#00ffff;">${match.opp}</span></div><div style="text-align:right;"><span style="color:#ffd700; display:flex; align-items:center;">+${match.coins} ${SVG_COIN}</span><span style="color:#666; font-size:8px;">${match.time}</span></div></div>`; }); } else { historyHTML = "<p style='color:#aaa; text-align:center;'>No matches played.</p>"; } historyList.innerHTML = historyHTML; } document.getElementById('stats-overlay').style.display = 'flex'; } catch (e) { alert("Failed to load stats."); } 
} 

function setupLiveFriendsList() { window.db.collection('players').where('online', '==', true).onSnapshot((snapshot) => { const listDiv = document.getElementById('live-friends-list'); let html = ""; let found = false; snapshot.forEach((doc) => { if(doc.id !== myProfile.name) { found = true; html += `<div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 5px; display: flex; justify-content: space-between; align-items: center; border-left: 2px solid #00ff88;"><div><p style="margin: 0; color: white; font-family: 'Poppins'; font-size: 11px;">${doc.id.toUpperCase()}</p></div><button class="action-btn green-glow" style="padding: 4px 10px; font-size: 9px;" onclick="window.sendInvite('${doc.id}')">INVITE</button></div>`; } }); listDiv.innerHTML = found ? html : "<p style='color:#ffaa00; font-size:10px; text-align:center;'>No friends online.</p>"; }); } 
let incomingInviteRoom = null; function setupInviteListener() { window.db.collection('invites').doc(myProfile.name).onSnapshot((doc) => { if(doc.exists) { const data = doc.data(); if(data && data.roomId && appState === 'menu' && (Date.now() - data.time < 30000)) { document.getElementById('inviter-name').innerText = data.from.toUpperCase(); incomingInviteRoom = data.roomId; document.getElementById('invite-alert').style.display = 'flex'; } } }); } 
window.getMyProfile = () => myProfile; window.setOppProfile = (p) => { oppProfile = p; }; window.getIncomingRoom = () => incomingInviteRoom; window.clearIncomingRoom = () => { incomingInviteRoom = null; window.db.collection('invites').doc(myProfile.name).delete(); }; 

const AudioCtx = window.AudioContext || window.webkitAudioContext; const audioContext = new AudioCtx(); const gameSounds = {}; 
function loadSound(name, url) { 
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest(); request.open('GET', url, true); request.responseType = 'arraybuffer';
        request.onload = function() { audioContext.decodeAudioData(request.response, (buffer) => { gameSounds[name] = buffer; resolve(buffer); }, (e) => reject(e)); };
        request.onerror = function() { reject(new Error("Network error")); }; request.send();
    });
} 
loadSound('coin', 'coin.mp3'); loadSound('run', 'run.mp3'); loadSound('win', 'win.mp3'); loadSound('lose', 'lose.mp3'); loadSound('ghost_voice', 'ghost.mp3'); loadSound('ghost_hit', 'hit.mp3'); 
let runSoundNode = null; let ghostAudioNode = null;
function playInstantSound(name, loop = false, vol = 0.8) { if (!gameSounds[name]) return null; if (audioContext.state === 'suspended') audioContext.resume(); const source = audioContext.createBufferSource(); source.buffer = gameSounds[name]; source.loop = loop; const gainNode = audioContext.createGain(); gainNode.gain.value = vol; source.connect(gainNode); gainNode.connect(audioContext.destination); source.start(0); return source; } 

// ==========================================
// 🚀 THREE.JS ENGINE SETUP
// ==========================================
const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
const renderer = new THREE.WebGLRenderer({ antialias: currentGraphics === 'HIGH' }); 
if (currentGraphics === 'HIGH') { renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; } else if (currentGraphics === 'MEDIUM') { renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.BasicShadowMap; } else { renderer.setPixelRatio(1); renderer.shadowMap.enabled = false; }
renderer.setSize(window.innerWidth, window.innerHeight); 
renderer.domElement.style.position = 'fixed'; renderer.domElement.style.top = '0'; renderer.domElement.style.left = '0'; renderer.domElement.style.zIndex = '-1';
document.body.appendChild(renderer.domElement); 

const textureLoader = new THREE.TextureLoader();
const skyTex = textureLoader.load('sky.png'); const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false }); const skyBox = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 32), skyMat); scene.add(skyBox); 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); scene.add(ambientLight); 
const mainLight = new THREE.DirectionalLight(0xffeedd, 1.0); mainLight.position.set(20, 60, 20); if(currentGraphics !== 'LOW') mainLight.castShadow = true; scene.add(mainLight); 
scene.fog = new THREE.FogExp2(0x87cefa, currentGraphics === 'LOW' ? 0.02 : 0.015); 

// 🧱 WALL & FLOOR TEXTURES
let wallUnit = 5; 
const brickTex = textureLoader.load('wall.png'); brickTex.wrapS = THREE.RepeatWrapping; brickTex.wrapT = THREE.RepeatWrapping; brickTex.repeat.set(1, 1);
const wallMat = new THREE.MeshStandardMaterial({ map: brickTex, roughness: 0.9 }); 
const wallGeo = new THREE.BoxGeometry(wallUnit, wallUnit, wallUnit);

const grassTex = textureLoader.load('floor.png'); grassTex.wrapS = THREE.RepeatWrapping; grassTex.wrapT = THREE.RepeatWrapping; grassTex.repeat.set(50, 50); 
const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), new THREE.MeshStandardMaterial({ map: grassTex, roughness: 1.0, color: 0x999999 })); 
floorMesh.rotation.x = -Math.PI / 2; if(currentGraphics !== 'LOW') floorMesh.receiveShadow = true; scene.add(floorMesh);

const myLantern = new THREE.PointLight(0xffb84d, 0, 25); myLantern.position.set(0, 1.5, 1.5); 
const oppLantern = new THREE.PointLight(0xffb84d, 0, 25); oppLantern.position.set(0, 1.5, 1.5); 
const menuEnvGroup = new THREE.Group(); scene.add(menuEnvGroup); 
const myPlayer = new THREE.Group(); scene.add(myPlayer); const opponentPlayer = new THREE.Group(); scene.add(opponentPlayer); opponentPlayer.position.set(1000, 1000, 1000); opponentPlayer.visible = false; myPlayer.add(myLantern); opponentPlayer.add(oppLantern); 

// ==========================================
// 🚀 SMART GLB LOADER (CENTERING & SIZE FIXES) 🚀
// ==========================================
let myMixer = null, oppMixer = null; let myAnims = {}, oppAnims = {}; let myCurrentAnim = 'idle', oppCurrentAnim = 'idle'; let lobbyRotationY = 0; let isDraggingLobby = false; 
const dracoLoader = new THREE.DRACOLoader(); dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); 

window.GameModels = { tree: null, coin: null, rock: null, grass: null, medkit: null };
const gLoader = new THREE.GLTFLoader(); gLoader.setDRACOLoader(dracoLoader);

// 🛠️ Updated Fixer: 
// - centerIt = true: Sirf Coin aur Medkit ke liye taki hawa me theek se ghoomein.
// - centerIt = false: Tree aur Rock ke liye taki wo zameen par khade rahein, underground na ghuse!
function fixModel(gltf, targetSize, centerIt) {
    let model = gltf.scene;
    
    if (centerIt) {
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center); 
    }

    let wrapper = new THREE.Group();
    wrapper.add(model);
    wrapper.scale.set(targetSize, targetSize, targetSize); 

    wrapper.traverse(c => { 
        if(c.isMesh) { c.castShadow = false; c.receiveShadow = false; }
    });
    return wrapper;
}

// 🎛️ SIZE CONTROLS: Yahan se numbers change karke size badha/ghata sakta hai!
// Tree, Rock, Grass ko centerIt=false diya hai taki zameen me na dhase.
gLoader.load('tree.glb', (g) => { window.GameModels.tree = fixModel(g, 0.4, false); }, undefined, ()=>{});
gLoader.load('coin.glb', (g) => { window.GameModels.coin = fixModel(g, 0.25, true); }, undefined, ()=>{});
gLoader.load('rock.glb', (g) => { window.GameModels.rock = fixModel(g, 0.3, false); }, undefined, ()=>{});
gLoader.load('grass.glb', (g) => { window.GameModels.grass = fixModel(g, 0.35, false); }, undefined, ()=>{});
gLoader.load('medkit.glb', (g) => { window.GameModels.medkit = fixModel(g, 0.25, true); }, undefined, ()=>{});

window.spawnModel = function(modelType, x, y, z, randomScale = false) {
    if(!window.GameModels[modelType]) return null;
    let mesh = window.GameModels[modelType].clone(); mesh.position.set(x, y, z);
    if(randomScale) { 
        let s = 0.8 + Math.random() * 0.5; 
        mesh.scale.set(mesh.scale.x * s, mesh.scale.y * s, mesh.scale.z * s); 
        mesh.rotation.y = Math.random() * Math.PI * 2; 
    }
    return mesh;
}

// Ghost Loading
const ghostGroup = new THREE.Group(); scene.add(ghostGroup); ghostGroup.visible = false;
const ghostAura = new THREE.PointLight(0xff0000, 3, 15); ghostGroup.add(ghostAura);
const ghostMesh = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), new THREE.MeshStandardMaterial({color: 0xff0000, emissive: 0xaa0000, transparent: true, opacity: 0.8})); ghostMesh.position.y = 1.5; ghostGroup.add(ghostMesh);
let ghostMixer = null; let ghostAnim = null;
gLoader.load('ghost.glb', (gltf) => { const gModel = gltf.scene; gModel.scale.set(1.0, 1.0, 1.0); gModel.position.y = 0; ghostGroup.add(gModel); ghostMesh.visible = false; if(gltf.animations.length) { ghostMixer = new THREE.AnimationMixer(gModel); ghostAnim = ghostMixer.clipAction(gltf.animations[0]); ghostAnim.play(); } });

// Fallback Generators
window.createHealthKit = function() { const group = new THREE.Group(); const box = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.8), new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.5})); const cross1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.2, 0.2), new THREE.MeshBasicMaterial({color: 0xff0000})); const cross2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.9), new THREE.MeshBasicMaterial({color: 0xff0000})); box.position.y = 0.3; cross1.position.y = 0.6; cross2.position.y = 0.6; group.add(box, cross1, cross2); return group; }
window.createFortGate = function() { const group = new THREE.Group(); const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 7, 8), wallMat); p1.position.set(-2.5, 3.5, 0); group.add(p1); const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 7, 8), wallMat); p2.position.set(2.5, 3.5, 0); group.add(p2); const beam = new THREE.Mesh(new THREE.BoxGeometry(7, 1.5, 2), wallMat); beam.position.set(0, 7.5, 0); group.add(beam); return group; } 

let myHealth = 100; let oppHealth = 100; let ghostAttackCooldown = 0; let currentGhostSpeed = 0.12; let ghostCurrentPath = []; let lastPathCalcTime = 0;
window.updateHealthUI = function() { let hFill = document.getElementById('health-fill'); let hText = document.getElementById('health-text'); if(hFill) { hFill.style.width = Math.min(100, (myHealth / 200) * 100) + '%'; if(myHealth > 100) { hFill.style.background = '#00ff88'; hFill.style.boxShadow = '0 0 10px #00ff88'; } else { hFill.style.background = '#ff4444'; hFill.style.boxShadow = '0 0 10px #ff0000'; } } if(hText) hText.innerText = Math.floor(myHealth) + '%'; if(!isSinglePlayer && window.sendEvent) window.sendEvent({ type: 'health', val: myHealth }); }
window.setOpponentHealth = function(val) { oppHealth = val; let mateBox = document.getElementById('teammate-health-box'); if(mateBox) { if(oppHealth <= 0) { mateBox.innerHTML = oppProfile.name.toUpperCase() + ": DEAD " + SVG_SKULL; mateBox.style.color = '#ff4444'; mateBox.style.borderColor = '#ff4444'; } else { mateBox.innerHTML = oppProfile.name.toUpperCase() + ": " + Math.floor(oppHealth) + "% " + SVG_HEART; mateBox.style.color = '#ffaa00'; mateBox.style.borderColor = '#ffaa00'; } } }
window.resetAnimationsToIdle = function() { if(myAnims['idle']) myAnims['idle'].reset().play(); if(oppAnims['idle']) oppAnims['idle'].reset().play(); myCurrentAnim = 'idle'; oppCurrentAnim = 'idle'; } 
function playAnim(p, anim) { let anims = p === 'my' ? myAnims : oppAnims; let cur = p === 'my' ? myCurrentAnim : oppCurrentAnim; if (!anims[anim]) return; if (cur !== anim) { if (anims[cur]) anims[cur].fadeOut(0.2); anims[anim].reset().fadeIn(0.2).play(); if (p === 'my') myCurrentAnim = anim; else oppCurrentAnim = anim; } else { if (!anims[anim].isRunning()) anims[anim].play(); } } 

function loadMyCharacter() { 
    const char = myProfile.character || 'm1'; const files = [`${char}_idle`, `${char}_run`, `${char}_win`, `${char}_lose`]; let tempClips = {}; let oldMesh = myPlayer.getObjectByName("charMesh"); if(oldMesh) myPlayer.remove(oldMesh); const manager = new THREE.LoadingManager(); const loader = new THREE.GLTFLoader(manager); loader.setDRACOLoader(dracoLoader); 
    manager.onProgress = function (url, itemsLoaded, itemsTotal) { document.getElementById('load-fill').style.width = `${Math.floor((itemsLoaded/itemsTotal)*100)}%`; }; 
    manager.onLoad = function () { 
        if(tempClips[`${char}_idle`]) myAnims['idle'] = myMixer.clipAction(tempClips[`${char}_idle`]); 
        if(tempClips[`${char}_run`]) myAnims['run'] = myMixer.clipAction(tempClips[`${char}_run`]); 
        if(tempClips[`${char}_win`]) { myAnims['win'] = myMixer.clipAction(tempClips[`${char}_win`]); myAnims['win'].setLoop(THREE.LoopOnce); myAnims['win'].clampWhenFinished = true; } 
        if(tempClips[`${char}_lose`]) { myAnims['lose'] = myMixer.clipAction(tempClips[`${char}_lose`]); myAnims['lose'].setLoop(THREE.LoopOnce); myAnims['lose'].clampWhenFinished = true; } 
        myPlayer.visible = true; appState = 'menu'; myCurrentAnim = 'idle'; if(myAnims['idle']) myAnims['idle'].reset().play(); 
        
        while(menuEnvGroup.children.length > 0) menuEnvGroup.remove(menuEnvGroup.children[0]); 
        for(let wX = -10; wX <= 10; wX++) { for(let wY = 0; wY < 5; wY++) { const backW = new THREE.Mesh(wallGeo, wallMat); backW.position.set(wX * wallUnit, (wY * wallUnit) + (wallUnit/2), -15); menuEnvGroup.add(backW); } }
        setTimeout(() => { document.getElementById('loading-screen').style.display = 'none'; document.getElementById('main-menu').style.display = 'flex'; }, 500); 
    }; 
    files.forEach(file => { loader.load(`./${file}.glb`, (gltf) => { if (file.includes('idle')) { const model = gltf.scene; model.name = "charMesh"; model.scale.set(2.2, 2.2, 2.2); model.traverse(c => { if(c.isMesh && currentGraphics !== 'LOW') c.castShadow = true; }); myPlayer.add(model); myMixer = new THREE.AnimationMixer(model); } if(gltf.animations.length) tempClips[file] = gltf.animations[0]; }); }); 
} 

window.currentOppChar = null; 
window.loadOpponentCharacter = function(char, callback) { 
    if(window.currentOppChar === char) { if(callback) callback(); return; } window.currentOppChar = char; let oldMesh = opponentPlayer.getObjectByName("charMesh"); if(oldMesh) opponentPlayer.remove(oldMesh); const files = [`${char}_idle`, `${char}_run`, `${char}_win`, `${char}_lose`]; let tempClips = {}; const manager = new THREE.LoadingManager(); const loader = new THREE.GLTFLoader(manager); loader.setDRACOLoader(dracoLoader); 
    manager.onLoad = function () { 
        if(tempClips[`${char}_idle`]) oppAnims['idle'] = oppMixer.clipAction(tempClips[`${char}_idle`]); 
        if(tempClips[`${char}_run`]) oppAnims['run'] = oppMixer.clipAction(tempClips[`${char}_run`]); 
        if(tempClips[`${char}_win`]) { oppAnims['win'] = oppMixer.clipAction(tempClips[`${char}_win`]); oppAnims['win'].setLoop(THREE.LoopOnce); oppAnims['win'].clampWhenFinished = true; } 
        if(tempClips[`${char}_lose`]) { oppAnims['lose'] = oppMixer.clipAction(tempClips[`${char}_lose`]); oppAnims['lose'].setLoop(THREE.LoopOnce); oppAnims['lose'].clampWhenFinished = true; } 
        oppCurrentAnim = 'idle'; if(oppAnims['idle']) { oppAnims['idle'].reset().play(); } if(callback) callback(); 
    }; 
    files.forEach(file => { loader.load(`./${file}.glb`, (gltf) => { if (file.includes('idle')) { const model = gltf.scene; model.name = "charMesh"; model.scale.set(2.2, 2.2, 2.2); model.traverse(c => { if(c.isMesh && currentGraphics !== 'LOW') c.castShadow = true; }); opponentPlayer.add(model); oppMixer = new THREE.AnimationMixer(model); } if(gltf.animations.length) tempClips[file] = gltf.animations[0]; }); }); 
} 

// ==========================================
// 🚀 JOYSTICK & TOUCH 🚀
// ==========================================
let joyActive = false; let joyMoveX = 0; let joyMoveY = 0; let joyTouchId = null; const speed = 0.18; let targetRotation = 0; let targetPitch = 0; let lookActive = false; let lookTouchId = null; let prevTouchX = 0; let prevTouchY = 0; 
const joyBase = document.getElementById('joystick-base'); const joyStick = document.getElementById('joystick-stick'); 
joyBase.addEventListener('touchstart', (e) => { e.preventDefault(); joyTouchId = e.changedTouches[0].identifier; joyActive = true; updateJoystick(e.changedTouches[0]); }, {passive: false}); joyBase.addEventListener('touchmove', (e) => { e.preventDefault(); if(joyActive) for(let t of e.changedTouches) if(t.identifier === joyTouchId) updateJoystick(t); }, {passive: false}); joyBase.addEventListener('touchend', (e) => { e.preventDefault(); for(let t of e.changedTouches) if(t.identifier === joyTouchId) { joyActive = false; joyTouchId = null; joyStick.style.transform = `translate(-50%, -50%)`; joyMoveX = 0; joyMoveY = 0; } }, {passive: false}); 
function updateJoystick(touch) { if(!isGameRunning || myStatus !== 'playing') return; const rect = joyBase.getBoundingClientRect(); const maxRadius = rect.width / 2; let dx = touch.clientX - (rect.left + maxRadius); let dy = touch.clientY - (rect.top + maxRadius); const dist = Math.sqrt(dx*dx + dy*dy); if (dist > maxRadius) { dx = (dx / dist) * maxRadius; dy = (dy / dist) * maxRadius; } joyStick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`; let nx = dx / maxRadius; let ny = dy / maxRadius; joyMoveX = Math.abs(nx) < 0.15 ? 0 : nx; joyMoveY = Math.abs(ny) < 0.15 ? 0 : ny; } 
document.addEventListener('touchstart', (e) => { for(let t of e.changedTouches) { if (appState === 'menu' || appState === 'lobby') { isDraggingLobby = true; prevTouchX = t.clientX; } else if (isGameRunning && t.clientX > window.innerWidth / 2 && !lookActive) { lookActive = true; lookTouchId = t.identifier; prevTouchX = t.clientX; prevTouchY = t.clientY; } } }, {passive: false}); document.addEventListener('touchmove', (e) => { for(let t of e.changedTouches) { if (isDraggingLobby && (appState === 'menu' || appState === 'lobby')) { lobbyRotationY += (t.clientX - prevTouchX) * 0.01; prevTouchX = t.clientX; } else if (lookActive && t.identifier === lookTouchId) { targetRotation -= (t.clientX - prevTouchX) * 0.008; targetPitch += (t.clientY - prevTouchY) * 0.008; targetPitch = Math.max(-Math.PI/3, Math.min(Math.PI/4, targetPitch)); prevTouchX = t.clientX; prevTouchY = t.clientY; } } }, {passive: false}); document.addEventListener('touchend', (e) => { isDraggingLobby = false; for(let t of e.changedTouches) if(t.identifier === lookTouchId) { lookActive = false; lookTouchId = null; } }, {passive: false}); 

let mazeSize = 13; let walls = []; let mazeGroup = new THREE.Group(); scene.add(mazeGroup); let coinMeshes = {}; let healthMeshes = {}; window.gameState = { map: null }; let isSinglePlayer = true; let opponentData = null; let myStatus = 'playing'; let oppStatus = 'playing'; let myCoins = 0; let oppCoins = 0; let isSpectating = false; 
window.setSinglePlayerFlag = (val) => { isSinglePlayer = val; }; window.setOpponentData = (data) => { opponentData = data; }; 

window.worldToGrid = function(wx, wz) { let s = window.gameState.size || window.mazeSize || 13; let offset = (s * wallUnit) / 2; let x = Math.round((wx + offset) / wallUnit); let z = Math.round((wz + offset) / wallUnit); return {x: Math.max(0, Math.min(s - 1, x)), z: Math.max(0, Math.min(s - 1, z))}; }
window.gridToWorld = function(gx, gz) { let s = window.gameState.size || window.mazeSize || 13; let offset = (s * wallUnit) / 2; return {x: (gx * wallUnit) - offset, z: (gz * wallUnit) - offset}; }
window.findGhostPath = function(sx, sz, tx, tz) { let s = window.gameState.size || window.mazeSize || 13; if(sx === tx && sz === tz) return []; let queue = [{x: sx, z: sz, path: []}]; let visited = new Set([`${sx},${sz}`]); let dirs = [[0,-1],[0,1],[-1,0],[1,0]]; while(queue.length > 0) { let curr = queue.shift(); if(curr.x === tx && curr.z === tz) return curr.path; for(let d of dirs) { let nx = curr.x + d[0], nz = curr.z + d[1]; if(nx >= 0 && nx < s && nz >= 0 && nz < s) { if(window.gameState.map[nz][nx] !== 1 && !visited.has(`${nx},${nz}`)) { visited.add(`${nx},${nz}`); queue.push({x: nx, z: nz, path: [...curr.path, {x: nx, z: nz}]}); } } } } return []; }

window.dropMedkit = function() { if (myStatus !== 'playing' || myHealth <= 25) return; myHealth -= 25; window.updateHealthUI(); const dropPos = myPlayer.position.clone(); const backward = new THREE.Vector3(0, 0, -2.5).applyEuler(new THREE.Euler(0, myPlayer.rotation.y, 0)); dropPos.add(backward); let grid = window.worldToGrid(dropPos.x, dropPos.z); if (window.gameState.map[grid.z] && window.gameState.map[grid.z][grid.x] === 1) { grid = window.worldToGrid(myPlayer.position.x, myPlayer.position.z); } const medId = `med_${Date.now()}_${Math.random()}`; window.spawnMedkitLocally(grid.x, grid.z, medId); if(!isSinglePlayer && window.sendEvent) window.sendEvent({ type: 'spawn_medkit', x: grid.x, z: grid.z, id: medId }); }
window.spawnMedkitLocally = function(x, z, id) { 
    let wPos = window.gridToWorld(x, z); 
    let kit = window.spawnModel('medkit', wPos.x, 0.5, wPos.z);
    if(!kit) { kit = window.createHealthKit(); kit.position.set(wPos.x, 0.5, wPos.z); }
    let uniqueKey = id || `${x}_${z}_${Date.now()}`; healthMeshes[uniqueKey] = kit; mazeGroup.add(kit); 
}

// ==========================================
// 🚀 3D MAZE BUILDER ENGINE 🚀
// ==========================================
window.buildMazeFromMap = function(mapArray, dynamicSize) { 
    if(dynamicSize) { window.mazeSize = dynamicSize; window.gameState.size = dynamicSize; }
    let size = window.gameState.size || window.mazeSize || 13;
    let offset = (size * wallUnit) / 2; 

    while(mazeGroup.children.length > 0) mazeGroup.remove(mazeGroup.children[0]); walls = []; coinMeshes = {}; healthMeshes = {}; hasGameEnded = false; myCoins = 0; oppCoins = 0; myStatus = 'playing'; oppStatus = 'playing'; isSpectating = false; 
    myHealth = 100; oppHealth = 100; window.updateHealthUI(); window.setOpponentHealth(100);
    
    ghostGroup.visible = true; ghostAttackCooldown = 0; ghostCurrentPath = [];
    if(ghostAudioNode) { ghostAudioNode.stop(); ghostAudioNode = null; }

    document.getElementById('joystick-wrapper').style.display = 'block';
    document.getElementById('spectate-btn').style.display = 'none'; document.getElementById('coin-counter').innerText = `COINS: 0`; playAnim('my', 'idle'); if(!isSinglePlayer) playAnim('opp', 'idle'); targetPitch = 0; targetRotation = 0; 
    
    // 🌳 JUNGLE ENVIRONMENT
    let envRange = offset + 100;
    for(let i=0; i<40; i++) { 
        let tx = (Math.random() - 0.5) * envRange * 2; let tz = (Math.random() - 0.5) * envRange * 2;
        if (tx < -offset || tx > offset || tz < -offset || tz > offset) {
            let tree = window.spawnModel('tree', tx, 0, tz, true); if(tree) mazeGroup.add(tree); 
            if(Math.random() > 0.5) { let grass = window.spawnModel('grass', tx + 2, 0, tz + 2, true); if(grass) mazeGroup.add(grass); }
        }
    }

    let midFreeGrid = {x: Math.floor(size/2), z: Math.floor(size/2)};
    for(let z=midFreeGrid.z-2; z<midFreeGrid.z+2; z++) { for(let x=midFreeGrid.x-2; x<midFreeGrid.x+2; x++) { if(mapArray[z] && mapArray[z][x] !== 1) { midFreeGrid = {x, z}; break; } } }
    let ghostSpawn = window.gridToWorld(midFreeGrid.x, midFreeGrid.z); ghostGroup.position.set(ghostSpawn.x, 0, ghostSpawn.z); 

    // 🧱 MAZE & PROPS
    for(let z = 0; z < size; z++) { 
        for(let x = 0; x < size; x++) { 
            const posX = (x * wallUnit) - offset; const posZ = (z * wallUnit) - offset; 
            
            if(mapArray[z][x] === 1) { 
                let oldW = new THREE.Mesh(wallGeo, wallMat); 
                oldW.position.set(posX, wallUnit/2, posZ); 
                mazeGroup.add(oldW); 
                walls.push(new THREE.Box3().setFromObject(oldW));
            } 
            else { 
                let rand = Math.random();
                if(rand > 0.98) { let rock = window.spawnModel('rock', posX + (Math.random()-0.5)*2, 0, posZ + (Math.random()-0.5)*2, true); if(rock) mazeGroup.add(rock); } 
                else if(rand > 0.90) { let grass = window.spawnModel('grass', posX + (Math.random()-0.5)*2, 0, posZ + (Math.random()-0.5)*2, true); if(grass) mazeGroup.add(grass); }

                if(mapArray[z][x] === 3) { let coin = window.spawnModel('coin', posX, 1.0, posZ); if(!coin){ coin = window.createRealCoin(); coin.position.set(posX, 1.0, posZ); } coinMeshes[`${x}_${z}`] = coin; mazeGroup.add(coin); } 
                if(mapArray[z][x] === 4) { let kit = window.spawnModel('medkit', posX, 0.5, posZ); if(!kit){ kit = window.createHealthKit(); kit.position.set(posX, 0.5, posZ); } healthMeshes[`${x}_${z}`] = kit; mazeGroup.add(kit); }
            } 
        } 
    } 
    let entryPosX = (1 * wallUnit) - offset; let entryPosZ = (0 * wallUnit) - offset; let exitPosX = ((size-2) * wallUnit) - offset; let exitPosZ = ((size-1) * wallUnit) - offset; 
    let fenceLeft = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(exitPosX - 100 - wallUnit/2, 5, exitPosZ + 2), new THREE.Vector3(200, 10, 4)); let fenceRight = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(exitPosX + 100 + wallUnit/2, 5, exitPosZ + 2), new THREE.Vector3(200, 10, 4)); walls.push(fenceLeft, fenceRight); 
    let entryGate = window.createFortGate(); entryGate.position.set(entryPosX, 0, entryPosZ); mazeGroup.add(entryGate); let exitGate = window.createFortGate(); exitGate.position.set(exitPosX, 0, exitPosZ); mazeGroup.add(exitGate);
    
    if(isSinglePlayer) { myPlayer.position.set(entryPosX, 0, entryPosZ - 2.0); } 
    else { if(window.isGameHost) { myPlayer.position.set(entryPosX, 0, entryPosZ - 2.0); opponentPlayer.position.set(entryPosX, 0, entryPosZ - 5.0); } else { myPlayer.position.set(entryPosX, 0, entryPosZ - 5.0); opponentPlayer.position.set(entryPosX, 0, entryPosZ - 2.0); } opponentPlayer.visible = true; } 
    document.getElementById('lobby-names-hud').style.display = 'none'; document.getElementById('manual-mp-overlay').style.display = 'none'; 
} 

function checkCollision(newPos) { const pBox = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(newPos.x, 1.0, newPos.z), new THREE.Vector3(1.2, 2.0, 1.2)); for(let w of walls) if(pBox.intersectsBox(w)) return true; return false; } 

window.setOpponentDead = function() { oppStatus = 'dead'; window.setOpponentHealth(0); playAnim('opp', 'lose'); let alertBox = document.getElementById('screen-alert'); if(alertBox) { alertBox.innerHTML = oppProfile.name.toUpperCase() + " DIED! " + SVG_SKULL; alertBox.style.color = "#ff4444"; alertBox.style.display = "flex"; setTimeout(() => { alertBox.style.display = "none"; }, 3000); } if (myStatus === 'dead' || myStatus === 'escaped') { window.evaluateGameEnd(false); } }

window.evaluateGameEnd = function(isTimeout = false) { 
    if(hasGameEnded) return; let size = window.gameState.size || window.mazeSize || 13;
    if(myStatus === 'dead' && !isSinglePlayer && oppStatus === 'playing') { document.getElementById('joystick-wrapper').style.display = 'none'; document.getElementById('drop-med-btn').style.display = 'none'; document.getElementById('spectate-btn').style.display = 'block'; isSpectating = true; let alertBox = document.getElementById('screen-alert'); if(alertBox) { alertBox.innerHTML = "YOU DIED! SPECTATING " + oppProfile.name.toUpperCase(); alertBox.style.color = "#ffaa00"; alertBox.style.display = "flex"; setTimeout(() => { alertBox.style.display = "none"; }, 3000); } return;  }
    if(myStatus === 'escaped' && !isSinglePlayer && oppStatus === 'playing') { document.getElementById('joystick-wrapper').style.display = 'none'; document.getElementById('drop-med-btn').style.display = 'none'; document.getElementById('spectate-btn').style.display = 'block'; isSpectating = true; let alertBox = document.getElementById('screen-alert'); if(alertBox) { alertBox.innerHTML = "ESCAPED! WAITING FOR " + oppProfile.name.toUpperCase(); alertBox.style.color = "#00ff88"; alertBox.style.display = "flex"; setTimeout(() => { alertBox.style.display = "none"; }, 3000); } return;  }

    hasGameEnded = true; isGameRunning = false; joyMoveX = 0; joyMoveY = 0; document.getElementById('joystick-stick').style.transform = `translate(-50%, -50%)`; if(runSoundNode) { runSoundNode.stop(); runSoundNode = null; } if(ghostAudioNode) { ghostAudioNode.stop(); ghostAudioNode = null; } document.getElementById('spectate-btn').style.display = 'none'; document.getElementById('drop-med-btn').style.display = 'none'; isSpectating = false; ghostGroup.visible = false;
    let exitPosX = ((size-2) * wallUnit) - ((size * wallUnit) / 2); let exitPosZ = ((size-1) * wallUnit) - ((size * wallUnit) / 2); 
    myPlayer.position.set(exitPosX - 1.5, 0, exitPosZ + 6.0); myPlayer.rotation.y = 0; if(!isSinglePlayer) { opponentPlayer.visible = true; opponentPlayer.position.set(exitPosX + 1.5, 0, exitPosZ + 6.0); opponentPlayer.rotation.y = 0; } 
    
    let iWon = (myStatus === 'escaped'); let oppWon = (oppStatus === 'escaped'); let tie = (iWon && oppWon);
    playAnim('my', iWon ? 'win' : 'lose'); if(iWon && typeof playInstantSound === 'function') playInstantSound('win'); else if(typeof playInstantSound === 'function') playInstantSound('lose'); if(!isSinglePlayer) playAnim('opp', oppWon ? 'win' : 'lose'); 
    if (iWon || tie) { let currLvl = parseInt(localStorage.getItem('mazeLevel')) || 1; localStorage.setItem('mazeLevel', currLvl + 1); } 
    
    const title = document.getElementById('end-title'); const desc = document.getElementById('end-desc'); let matchResString = ""; 
    if(iWon && !tie) { title.innerHTML = "LEVEL CLEARED! " + SVG_TROPHY; title.style.color = "#00ff88"; desc.innerText = `You looted ${myCoins} Coins! Next level unlocked.`; myStats.wins++; matchResString = "WON"; } else if(tie) { title.innerHTML = "SQUAD ESCAPED! " + SVG_USERS; title.style.color = "#00ffff"; desc.innerText = `Both survived!`; matchResString = "DRAW"; } else { title.innerHTML = "GAME OVER! " + SVG_SKULL; title.style.color = "#ff4444"; if(myStatus === 'dead') desc.innerText = "The Ghost Hunted You Down!"; else desc.innerText = isTimeout ? "Time's Up! You starved." : "Better luck next time."; myStats.losses++; matchResString = "LOST"; } 
    myStats.matches++; myStats.coins += myCoins; let oppName = isSinglePlayer ? "BOT (Solo)" : oppProfile.name.toUpperCase(); let dateStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', month:'short', day:'numeric'}); if(!myStats.history) myStats.history = []; myStats.history.unshift({ opp: oppName, res: matchResString, coins: myCoins, time: dateStr }); if(myStats.history.length > 10) myStats.history.pop(); if(myProfile && myProfile.name) { window.db.collection('players').doc(myProfile.name).update({ coins: myStats.coins, wins: myStats.wins, losses: myStats.losses, matches: myStats.matches, history: myStats.history }).catch(e=>{}); } if(isSinglePlayer) { document.getElementById('end-solo-btns').style.display = 'flex'; document.getElementById('end-mp-btns').style.display = 'none'; } else { document.getElementById('end-solo-btns').style.display = 'none'; document.getElementById('end-mp-btns').style.display = 'flex'; } setTimeout(() => { document.getElementById('endScreen').style.display = 'flex'; }, 4000); 
} 

const mmCanvas = document.getElementById('minimap'); const mmCtx = mmCanvas.getContext('2d'); 
window.drawMinimap = function() { 
    if(!window.gameState.map) return; let size = window.gameState.size || window.mazeSize || 13; const tS = mmCanvas.width / size; mmCtx.fillStyle = '#111'; mmCtx.fillRect(0, 0, mmCanvas.width, mmCanvas.height); 
    for(let z=0; z<size; z++) { for(let x=0; x<size; x++) { if(z === 0 && x === 1) mmCtx.fillStyle = '#00ff88'; else if(z === size-1 && x === size-2) mmCtx.fillStyle = '#00ffff'; else if (window.gameState.map[z][x] === 1) mmCtx.fillStyle = '#222'; else if (window.gameState.map[z][x] === 3) mmCtx.fillStyle = '#ffd700'; else if (window.gameState.map[z][x] === 4) mmCtx.fillStyle = '#ffffff'; else mmCtx.fillStyle = '#555'; mmCtx.fillRect(x * tS, z * tS, tS, tS); } } 
    let offset = (size * wallUnit) / 2; mmCtx.font = "9px Poppins"; mmCtx.textAlign = "center";
    if(!isSinglePlayer && oppStatus === 'playing' && opponentData) { let ox = ((opponentPlayer.position.x + offset) / wallUnit) * tS + (tS/2); let oz = ((opponentPlayer.position.z + offset) / wallUnit) * tS + (tS/2); mmCtx.fillStyle = '#ffaa00'; mmCtx.beginPath(); mmCtx.arc(ox, oz, Math.max(1.5, 3.5 - (size*0.1)), 0, Math.PI * 2); mmCtx.fill(); mmCtx.fillStyle = '#ffffff'; mmCtx.fillText(oppProfile.name.toUpperCase(), ox, oz - 6); } 
    if(myStatus === 'playing') { let px = ((myPlayer.position.x + offset) / wallUnit) * tS + (tS/2); let pz = ((myPlayer.position.z + offset) / wallUnit) * tS + (tS/2); mmCtx.fillStyle = '#0088ff'; mmCtx.beginPath(); mmCtx.arc(px, pz, Math.max(1.5, 3.5 - (size*0.1)), 0, Math.PI * 2); mmCtx.fill(); mmCtx.fillStyle = '#ffffff'; mmCtx.fillText("ME", px, pz - 6); } 
    if(isGameRunning && ghostGroup.visible) { let gx = ((ghostGroup.position.x + offset) / wallUnit) * tS + (tS/2); let gz = ((ghostGroup.position.z + offset) / wallUnit) * tS + (tS/2); mmCtx.fillStyle = '#ff0000'; mmCtx.beginPath(); mmCtx.arc(gx, gz, Math.max(1.5, 3.5 - (size*0.1)), 0, Math.PI * 2); mmCtx.fill(); mmCtx.fillStyle = '#ff4444'; mmCtx.fillText("GHOST", gx, gz - 6); }
} 

const clock = new THREE.Clock(); let lastNetTime = 0; let lastSentAnim = 'idle'; 
function animate() { 
    requestAnimationFrame(animate); const delta = Math.min(clock.getDelta(), 0.1); 
    if(myMixer) myMixer.update(delta); if(oppMixer) oppMixer.update(delta); if(ghostMixer) ghostMixer.update(delta);
    
    if (appState === 'menu') { camera.position.lerp(new THREE.Vector3(0, 3.8, 8.0), 0.1); camera.lookAt(0, 1.5, 0); myPlayer.position.lerp(new THREE.Vector3(0, 0, 0), 0.1); if(!isDraggingLobby) lobbyRotationY += 0.005; myPlayer.rotation.y = lobbyRotationY; if(mazeGroup) mazeGroup.visible = false; opponentPlayer.visible = false; ghostGroup.visible = false; menuEnvGroup.visible = true; skyBox.position.copy(camera.position); } 
    else if (appState === 'lobby') { camera.position.lerp(new THREE.Vector3(0, 3.8, 8.0), 0.1); camera.lookAt(0, 1.5, 0); myPlayer.position.lerp(new THREE.Vector3(-1.2, 0, 0), 0.1); myPlayer.rotation.y = lobbyRotationY; playAnim('my', 'idle'); if(!isSinglePlayer) { opponentPlayer.visible = true; opponentPlayer.position.lerp(new THREE.Vector3(1.2, 0, 0), 0.1); opponentPlayer.rotation.y = lobbyRotationY; playAnim('opp', 'idle'); } if(mazeGroup) mazeGroup.visible = false; ghostGroup.visible = false; menuEnvGroup.visible = true; skyBox.position.copy(camera.position); } 
    else if (appState === 'playing') { 
        menuEnvGroup.visible = false; if(mazeGroup) mazeGroup.visible = true; skyBox.position.copy(camera.position); let currentSize = window.gameState.size || window.mazeSize || 13;
        
        if(isGameRunning) { 
            if(!ghostAudioNode && typeof playInstantSound === 'function') { ghostAudioNode = playInstantSound('ghost_voice', true, 0.5); }
            for(let key in coinMeshes) { if(coinMeshes[key].rotation) coinMeshes[key].rotation.y += 2.0 * delta; }
            for(let key in healthMeshes) healthMeshes[key].rotation.y += 1.0 * delta;

            let anyoneAlive = (myStatus === 'playing') || (!isSinglePlayer && oppStatus === 'playing');
            if (anyoneAlive) {
                let currentLvl = parseInt(localStorage.getItem('mazeLevel')) || 1;
                let timeRatio = window.gameTimeLeft ? ((300 - window.gameTimeLeft) / 300) : 0; 
                currentGhostSpeed = 0.06 + (timeRatio * 0.15) + (currentLvl * 0.005); 

                if(ghostAttackCooldown > 0) { ghostAttackCooldown -= delta; } 
                else {
                    if(Date.now() - lastPathCalcTime > 500) {
                        let targetPlayerPos = null; let myDist = (myStatus === 'playing') ? myPlayer.position.distanceTo(ghostGroup.position) : Infinity; let oppDist = (!isSinglePlayer && oppStatus === 'playing' && opponentPlayer.visible) ? opponentPlayer.position.distanceTo(ghostGroup.position) : Infinity;
                        if (myDist < oppDist) targetPlayerPos = myPlayer.position; else if (oppDist < myDist) targetPlayerPos = opponentPlayer.position; else if (myStatus === 'playing') targetPlayerPos = myPlayer.position;
                        if(targetPlayerPos) { let ghostGrid = window.worldToGrid(ghostGroup.position.x, ghostGroup.position.z); let targetGrid = window.worldToGrid(targetPlayerPos.x, targetPlayerPos.z); ghostCurrentPath = window.findGhostPath(ghostGrid.x, ghostGrid.z, targetGrid.x, targetGrid.z); lastPathCalcTime = Date.now(); }
                    }
                    if(ghostCurrentPath.length > 0) {
                        let nextGrid = ghostCurrentPath[0]; let nextWorld = window.gridToWorld(nextGrid.x, nextGrid.z); let dir = new THREE.Vector3(nextWorld.x - ghostGroup.position.x, 0, nextWorld.z - ghostGroup.position.z);
                        if(dir.length() < 0.5) { ghostCurrentPath.shift(); } else { dir.normalize(); ghostGroup.rotation.y = Math.atan2(dir.x, dir.z); ghostGroup.position.addScaledVector(dir, currentGhostSpeed); }
                    } else if (myStatus === 'playing') { let dir = new THREE.Vector3(myPlayer.position.x - ghostGroup.position.x, 0, myPlayer.position.z - ghostGroup.position.z).normalize(); ghostGroup.rotation.y = Math.atan2(dir.x, dir.z); ghostGroup.position.addScaledVector(dir, currentGhostSpeed); }
                }
            }

            if(myStatus === 'playing') { 
                if(myPlayer.position.distanceTo(ghostGroup.position) < 1.8 && ghostAttackCooldown <= 0) {
                    if(typeof playInstantSound === 'function') playInstantSound('ghost_hit', false, 1.0); 
                    myHealth -= 25; window.updateHealthUI(); let vig = document.getElementById('vignette'); if(vig) { vig.style.background = 'radial-gradient(circle, transparent 40%, rgba(255,0,0,0.8) 100%)'; setTimeout(() => { vig.style.background = 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.8) 100%)'; }, 500); }
                    ghostAttackCooldown = 3.0; 
                    if(myHealth <= 0 && myStatus !== 'dead') { myStatus = 'dead'; playAnim('my', 'lose'); if(!isSinglePlayer && window.sendEvent) window.sendEvent({type: 'dead'}); if(!isSinglePlayer && oppStatus === 'playing') { document.getElementById('joystick-wrapper').style.display = 'none'; document.getElementById('drop-med-btn').style.display = 'none'; document.getElementById('spectate-btn').style.display = 'block'; isSpectating = true; let alertBox = document.getElementById('screen-alert'); if(alertBox) { alertBox.innerHTML = "YOU DIED! SPECTATING " + oppProfile.name.toUpperCase(); alertBox.style.color = "#ffaa00"; alertBox.style.display = "flex"; setTimeout(() => { alertBox.style.display = "none"; }, 3000); } } else { window.evaluateGameEnd(false); } }
                }
            }

            if (myStatus === 'playing') {
                let isMoving = (joyMoveX !== 0 || joyMoveY !== 0); 
                if (isMoving) { const camForward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, targetRotation, 0)); const camRight = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, targetRotation, 0)); const moveDir = new THREE.Vector3().addScaledVector(camForward, -joyMoveY).addScaledVector(camRight, joyMoveX).normalize(); const nextPos = myPlayer.position.clone().addScaledVector(moveDir, speed); if (!checkCollision(nextPos)) { myPlayer.position.copy(nextPos); } const targetModelRotation = Math.atan2(moveDir.x, moveDir.z); let diff = targetModelRotation - myPlayer.rotation.y; diff = Math.atan2(Math.sin(diff), Math.cos(diff)); myPlayer.rotation.y += diff * 0.3; playAnim('my', 'run'); if(!runSoundNode && typeof playInstantSound === 'function') runSoundNode = playInstantSound('run', true); } else { playAnim('my', 'idle'); if(runSoundNode) { runSoundNode.stop(); runSoundNode = null; } } 
                
                for(let key in coinMeshes) { let c = coinMeshes[key]; if(myPlayer.position.distanceTo(c.position) < 2.0) { if(typeof playInstantSound === 'function') playInstantSound('coin'); myCoins++; document.getElementById('coin-counter').innerText = "COINS: " + myCoins; mazeGroup.remove(c); delete coinMeshes[key]; let coords = key.split('_'); window.gameState.map[coords[1]][coords[0]] = 0; if(!isSinglePlayer && window.sendEvent) window.sendEvent({ type: 'coin', x: coords[0], z: coords[1], score: myCoins }); } } 
                for(let key in healthMeshes) { let h = healthMeshes[key]; if(myPlayer.position.distanceTo(h.position) < 2.0 && myHealth < 200) { if(typeof playInstantSound === 'function') playInstantSound('coin'); myHealth = Math.min(200, myHealth + 25); window.updateHealthUI(); mazeGroup.remove(h); delete healthMeshes[key]; let coords = key.split('_'); if(coords.length > 1 && window.gameState.map[coords[1]]) window.gameState.map[coords[1]][coords[0]] = 0; if(!isSinglePlayer && window.sendEvent) window.sendEvent({ type: 'healthKit', key: key }); } }

                let escapeLimit = ((currentSize * wallUnit) / 2); let exitPosX = ((currentSize-2) * wallUnit) - escapeLimit; 
                if(myPlayer.position.z > escapeLimit - 2.5 && Math.abs(myPlayer.position.x - exitPosX) < (wallUnit * 0.8)) { myStatus = 'escaped'; joyMoveX = 0; joyMoveY = 0; myPlayer.position.set(myPlayer.position.x, 0, escapeLimit + 3.0); myPlayer.rotation.y = 0; if(runSoundNode) { runSoundNode.stop(); runSoundNode = null; } if(isSinglePlayer) { window.evaluateGameEnd(); } else { document.getElementById('spectate-btn').style.display = 'flex'; document.getElementById('drop-med-btn').style.display = 'none'; if(window.sendEvent) window.sendEvent({ type: 'escape', score: myCoins, fX: myPlayer.position.x, fZ: myPlayer.position.z }); if(oppStatus === 'escaped') window.evaluateGameEnd(); else { playAnim('my', 'idle'); let alertBox = document.getElementById('screen-alert'); if(alertBox) { alertBox.innerHTML = "ESCAPED! WAITING FOR " + oppProfile.name.toUpperCase(); alertBox.style.color = "#00ff88"; alertBox.style.display = "flex"; setTimeout(() => { alertBox.style.display = "none"; }, 3000); } isSpectating = true; } } } 
            } 
            if(!isSinglePlayer && opponentData && oppStatus === 'playing') { opponentPlayer.position.lerp(opponentData.pos, 0.3); let rotDiff = opponentData.rot - opponentPlayer.rotation.y; rotDiff = Math.atan2(Math.sin(rotDiff), Math.cos(rotDiff)); opponentPlayer.rotation.y += rotDiff * 0.3; playAnim('opp', opponentData.anim || 'idle'); } 
            if(window.sendEvent && !isSinglePlayer && myStatus === 'playing') { let isMoving = (joyMoveX !== 0 || joyMoveY !== 0); let sendRate = isMoving ? 50 : 1000; if (myCurrentAnim !== lastSentAnim || Date.now() - lastNetTime > sendRate) { window.sendEvent({ type: 'pos', x: myPlayer.position.x, y: myPlayer.position.y, z: myPlayer.position.z, rot: myPlayer.rotation.y, anim: myCurrentAnim }); lastNetTime = Date.now(); lastSentAnim = myCurrentAnim; } } 
        } 
        if (window.isCountdown) { let camTargetX = isSinglePlayer ? myPlayer.position.x : (((1 * wallUnit) - ((currentSize * wallUnit) / 2))); let camTarget = new THREE.Vector3(camTargetX, myPlayer.position.y, myPlayer.position.z); const zoomPos = camTarget.clone().add(new THREE.Vector3(0, 3.5, 9.0)); camera.position.lerp(zoomPos, 0.1); camera.lookAt(camTarget.clone().add(new THREE.Vector3(0, 1.3, 0))); } 
        else if (hasGameEnded) { let camTargetObj = new THREE.Vector3(((currentSize-2) * wallUnit) - ((currentSize * wallUnit) / 2), 0, ((currentSize-1) * wallUnit) - ((currentSize * wallUnit) / 2) + 6.0); const zoomPos = camTargetObj.clone().add(new THREE.Vector3(0, 3.0, 8.5)); camera.position.lerp(zoomPos, 0.05); camera.lookAt(camTargetObj.clone().add(new THREE.Vector3(0, 1.4, 0))); } 
        else { 
            let activeTarget = myPlayer; let activeRotation = targetRotation; let activePitch = targetPitch; let baseHeight = 3.0; let baseDist = 5.0; let lookHeight = 2.0; 
            if ((isSpectating || myStatus === 'dead' || myStatus === 'escaped') && !isSinglePlayer && (oppStatus === 'playing' || oppStatus === 'escaped')) { activeTarget = opponentPlayer; activeRotation = opponentPlayer.rotation.y; activePitch = 0; baseHeight = 4.5; baseDist = 6.5; lookHeight = 1.5; } 
            const rayOrigin = activeTarget.position.clone(); rayOrigin.y += 1.5; const backwardDir = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(0, activeRotation, 0)).normalize(); const ray = new THREE.Ray(rayOrigin, backwardDir); let minDist = baseDist; const pt = new THREE.Vector3(); 
            for(let w of walls) { if(ray.intersectBox(w, pt)) { const dist = rayOrigin.distanceTo(pt); if(dist < minDist) minDist = dist; } } 
            let tZ = Math.max(1.0, minDist - 1.0); let camYOffset = baseHeight + (baseDist - tZ) * 0.6 + (activePitch * 3.5); let lookYOffset = lookHeight - (activePitch * 3.0); const rOffset = new THREE.Vector3(0, camYOffset, tZ).applyEuler(new THREE.Euler(0, activeRotation, 0)); 
            camera.position.lerp(activeTarget.position.clone().add(rOffset), 0.15); camera.lookAt(activeTarget.position.clone().add(new THREE.Vector3(0, lookYOffset, 0))); 
        } 
    } 
    window.drawMinimap(); renderer.render(scene, camera); 
} 
animate(); 

window.removeCoinLocally = function(x, z, oppNewScore) { let key = `${x}_${z}`; if(coinMeshes[key]) { mazeGroup.remove(coinMeshes[key]); delete coinMeshes[key]; window.gameState.map[z][x] = 0; } oppCoins = oppNewScore; }; 
window.removeHealthKitLocally = function(key) { if(healthMeshes[key]) { mazeGroup.remove(healthMeshes[key]); delete healthMeshes[key]; } };
window.setOpponentEscaped = function(finalScore, fX, fZ) { oppStatus = 'escaped'; oppCoins = finalScore; if(fX !== undefined && fZ !== undefined) { opponentPlayer.position.set(fX, 0, fZ); opponentPlayer.rotation.y = 0; } playAnim('opp', 'idle'); document.getElementById('spectate-btn').style.display = 'none'; isSpectating = false; if(myStatus === 'escaped' || myStatus === 'dead') window.evaluateGameEnd(); }; 
window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); }); 
window.resetLocalGame = function() { hasGameEnded = false; isGameRunning = false; window.setAppState('lobby'); window.resetAnimationsToIdle(); if(ghostAudioNode) { ghostAudioNode.stop(); ghostAudioNode = null; } } 
window.startLocalCount = function() { isGameRunning = true; window.setAppState('playing'); }
