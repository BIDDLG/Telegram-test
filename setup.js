// 🚀 setup.js - FIREBASE, VARIABLES & THREE.JS SCENE SETTINGS 🚀

// 1. Firebase Setup (Tera Original Database)
const firebaseConfig = { apiKey: "AIzaSyD3bPF3B-a6yR8gQxKcKPBVq9-kSPn3MsY", authDomain: "maze-run-7c4b3.firebaseapp.com", projectId: "maze-run-7c4b3", storageBucket: "maze-run-7c4b3.firebasestorage.app", messagingSenderId: "919108275682", appId: "1:919108275682:web:c14c14061bced458f6fdbb" }; 
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); } 
window.db = firebase.firestore(); 

// 2. SVG Icons (UI ke liye)
window.SVG_COG = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" class="ui-icon"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
window.SVG_TROPHY = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" class="ui-icon-right"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`;
window.SVG_SKULL = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" class="ui-icon-right"><circle cx="12" cy="10" r="8"></circle><path d="M8 17.8l-1.5 2.2a1 1 0 0 0 .8 1.5h9.4a1 1 0 0 0 .8-1.5l-1.5-2.2"></path><path d="M9 13h.01"></path><path d="M15 13h.01"></path></svg>`;
window.SVG_USERS = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" class="ui-icon-right"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
window.SVG_COIN = `<svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="2" fill="#ffd700" class="ui-icon-right"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle></svg>`;
window.SVG_HEART = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="#ff4444" class="ui-icon-right"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;

// 3. Global Game Variables
window.myProfile = { name: '', character: 'm1', password: '' }; 
window.oppProfile = { name: '', character: 'm1' }; 
window.myStats = { coins: 0, wins: 0, losses: 0, matches: 0, history: [] }; 

window.appState = 'menu'; 
window.isGameRunning = false; 
window.hasGameEnded = false; 
window.gameState = { map: null, size: 13 }; 
window.isSinglePlayer = true; 
window.isSpectating = false;

window.myStatus = 'playing'; 
window.oppStatus = 'playing'; 
window.myCoins = 0; 
window.oppCoins = 0; 
window.myHealth = 100; 
window.oppHealth = 100;

// 4. Graphics Settings
window.currentGraphics = localStorage.getItem('mazeGraphics') || 'HIGH';

// 5. Three.js Engine Setup (Scene, Camera, Renderer)
window.scene = new THREE.Scene(); 
window.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
window.renderer = new THREE.WebGLRenderer({ antialias: window.currentGraphics === 'HIGH' }); 

if (window.currentGraphics === 'HIGH') {
    window.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    window.renderer.shadowMap.enabled = true;
    window.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
} else if (window.currentGraphics === 'MEDIUM') {
    window.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    window.renderer.shadowMap.enabled = true;
    window.renderer.shadowMap.type = THREE.BasicShadowMap;
} else { 
    window.renderer.setPixelRatio(1); 
    window.renderer.shadowMap.enabled = false; 
}

window.renderer.setSize(window.innerWidth, window.innerHeight); 
window.renderer.domElement.style.position = 'fixed'; 
window.renderer.domElement.style.top = '0'; 
window.renderer.domElement.style.left = '0'; 
window.renderer.domElement.style.zIndex = '-1';
document.body.appendChild(window.renderer.domElement); 

window.textureLoader = new THREE.TextureLoader();

// Lighting
window.ambientLight = new THREE.AmbientLight(0xffffff, 0.8); 
window.scene.add(window.ambientLight); 

window.mainLight = new THREE.DirectionalLight(0xffeedd, 1.0); 
window.mainLight.position.set(20, 60, 20); 
if(window.currentGraphics !== 'LOW') window.mainLight.castShadow = true; 
window.scene.add(window.mainLight); 

window.scene.fog = new THREE.FogExp2(0x87cefa, window.currentGraphics === 'LOW' ? 0.02 : 0.015);

// Engine Groups
window.menuEnvGroup = new THREE.Group(); window.scene.add(window.menuEnvGroup); 
window.myPlayer = new THREE.Group(); window.scene.add(window.myPlayer); 
window.opponentPlayer = new THREE.Group(); window.scene.add(window.opponentPlayer); 
window.opponentPlayer.position.set(1000, 1000, 1000); 
window.opponentPlayer.visible = false; 

window.mazeGroup = new THREE.Group(); window.scene.add(window.mazeGroup); 
window.ghostGroup = new THREE.Group(); window.scene.add(window.ghostGroup); 
window.ghostGroup.visible = false;

// Helpers
window.wallUnit = 5;
window.walls = [];
window.coinMeshes = {}; 
window.healthMeshes = {};

console.log("✅ setup.js: Base Engine Ready!");
