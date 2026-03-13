// 🚀 assets.js - SOUNDS, TEXTURES, 3D MODELS (WALLS/PLAYERS) 🚀

// ==========================================
// 1. ANDROID SAFE AUDIO SYSTEM
// ==========================================
window.AudioCtx = window.AudioContext || window.webkitAudioContext; 
window.audioContext = new window.AudioCtx(); 
window.gameSounds = {}; 

window.loadSound = function(name, url) { 
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            window.audioContext.decodeAudioData(request.response, (buffer) => {
                window.gameSounds[name] = buffer;
                resolve(buffer);
            }, (e) => reject(e));
        };
        request.onerror = function() { reject(new Error("Network error")); };
        request.send();
    });
} 

window.loadSound('coin', 'coin.mp3'); window.loadSound('run', 'run.mp3'); 
window.loadSound('win', 'win.mp3'); window.loadSound('lose', 'lose.mp3'); 
window.loadSound('ghost_voice', 'ghost.mp3'); window.loadSound('ghost_hit', 'hit.mp3'); 

window.playInstantSound = function(name, loop = false, vol = 0.8) { 
    if (!window.gameSounds[name]) return null; 
    if (window.audioContext.state === 'suspended') window.audioContext.resume(); 
    const source = window.audioContext.createBufferSource(); 
    source.buffer = window.gameSounds[name]; source.loop = loop; 
    const gainNode = window.audioContext.createGain(); gainNode.gain.value = vol; 
    source.connect(gainNode); gainNode.connect(window.audioContext.destination); 
    source.start(0); 
    return source; 
};

// ==========================================
// 2. ENVIRONMENT TEXTURES & MATERIALS
// ==========================================
window.skyTex = window.textureLoader.load('sky.png'); 
window.skyMat = new THREE.MeshBasicMaterial({ map: window.skyTex, side: THREE.BackSide, fog: false }); 
window.skyBox = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 32), window.skyMat); 
window.scene.add(window.skyBox); 

window.grassTex = window.textureLoader.load('floor.png');
window.grassTex.wrapS = THREE.RepeatWrapping; window.grassTex.wrapT = THREE.RepeatWrapping; window.grassTex.repeat.set(30, 30); 
window.floor = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshStandardMaterial({ map: window.grassTex, roughness: 1.0, color: 0x999999 })); 
window.floor.rotation.x = -Math.PI / 2; 
if(window.currentGraphics !== 'LOW') window.floor.receiveShadow = true; 
window.scene.add(window.floor); 

// Purani PNG Wall ka backup (Agar GLB model na mile toh ye lag jayegi)
window.brickTex = window.textureLoader.load('wall.png');
window.brickTex.wrapS = THREE.RepeatWrapping; window.brickTex.wrapT = THREE.RepeatWrapping; window.brickTex.repeat.set(1, 1);
window.wallMat = new THREE.MeshStandardMaterial({ map: window.brickTex, roughness: 0.9 }); 
window.wallGeo = new THREE.BoxGeometry(window.wallUnit, window.wallUnit, window.wallUnit);

// ==========================================
// 3. 3D GLB MODELS (WALL, PATTHAR, GHOST)
// ==========================================
window.dracoLoader = new THREE.DRACOLoader(); 
window.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); 
window.gLoader = new THREE.GLTFLoader(); 
window.gLoader.setDRACOLoader(window.dracoLoader);

// Naye models yahan save honge
window.GameModels = { wall: null, patthar: null };

// A. 3D Wall Load (Naya code)
window.gLoader.load('wall.glb', (gltf) => { 
    window.GameModels.wall = gltf.scene; 
    window.GameModels.wall.scale.set(1.0, 1.0, 1.0); // Agar wall choti lage toh isko 1.5 ya 2.0 kar dena
    window.GameModels.wall.traverse(c => { 
        if(c.isMesh && window.currentGraphics !== 'LOW') { c.castShadow = true; c.receiveShadow = true; }
    });
}, undefined, (e) => { /* Ignore agar file nahi hai */ });

// B. 3D Patthar Load (Naya code)
window.gLoader.load('patthar.glb', (gltf) => { 
    window.GameModels.patthar = gltf.scene; 
    window.GameModels.patthar.scale.set(1.0, 1.0, 1.0); 
    window.GameModels.patthar.traverse(c => { 
        if(c.isMesh && window.currentGraphics !== 'LOW') { c.castShadow = true; c.receiveShadow = true; }
    });
}, undefined, (e) => { /* Ignore */ });

// C. Ghost Load
window.ghostMixer = null; window.ghostAnim = null;
window.ghostAura = new THREE.PointLight(0xff0000, 3, 15); window.ghostGroup.add(window.ghostAura);
window.ghostMesh = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), new THREE.MeshStandardMaterial({color: 0xff0000, emissive: 0xaa0000, transparent: true, opacity: 0.8})); 
window.ghostMesh.position.y = 1.5; window.ghostGroup.add(window.ghostMesh);

window.gLoader.load('ghost.glb', (gltf) => { 
    const gModel = gltf.scene; gModel.scale.set(1.0, 1.0, 1.0); gModel.position.y = 0; window.ghostGroup.add(gModel); window.ghostMesh.visible = false; 
    if(gltf.animations.length) { 
        window.ghostMixer = new THREE.AnimationMixer(gModel); window.ghostAnim = window.ghostMixer.clipAction(gltf.animations[0]); window.ghostAnim.play(); 
    } 
});

// ==========================================
// 4. OBJECT GENERATORS (Trees, Bushes, Coins)
// ==========================================
window.createBush = function() { const geo = new THREE.DodecahedronGeometry(0.6, 1); const mat = new THREE.MeshStandardMaterial({color: 0x0b3d0b, roughness: 0.9}); const bush = new THREE.Mesh(geo, mat); if(window.currentGraphics !== 'LOW') bush.castShadow = true; return bush; }
window.createMushroom = function() { const group = new THREE.Group(); const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, 0.4), new THREE.MeshStandardMaterial({color: 0xeeeeee})); stem.position.y = 0.2; const cap = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.2, 8), new THREE.MeshStandardMaterial({color: 0x00ffff, emissive: 0x0088ff, emissiveIntensity: 0.5})); cap.position.y = 0.4; group.add(stem, cap); return group; }
window.createRealCoin = function() { const group = new THREE.Group(); const rim = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.08, 16, 32), new THREE.MeshStandardMaterial({color: 0xffd700, metalness: 1, roughness: 0.2})); const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.1, 32), new THREE.MeshStandardMaterial({color: 0xffaa00, metalness: 0.8, roughness: 0.4})); inner.rotation.x = Math.PI/2; group.add(rim, inner); group.traverse(c => { if(c.isMesh && window.currentGraphics !== 'LOW') { c.castShadow = true; c.receiveShadow = true; }}); return group; } 
window.createRealRock = function() { const geo = new THREE.DodecahedronGeometry(0.4, 1); const pos = geo.attributes.position; for(let i=0; i<pos.count; i++) { pos.setXYZ(i, pos.getX(i)*(0.7+Math.random()*0.6), pos.getY(i)*(0.7+Math.random()*0.6), pos.getZ(i)*(0.7+Math.random()*0.6)); } geo.computeVertexNormals(); const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({color: 0x4a4a4a, roughness: 1.0})); mesh.scale.set(1.5, 1.5, 1.5); if(window.currentGraphics !== 'LOW') { mesh.castShadow = true; mesh.receiveShadow = true; } return mesh; } 
window.createRealGrass = function() { const group = new THREE.Group(); const geo = new THREE.ConeGeometry(0.06, 0.5 + Math.random()*0.3, 3); const mat = new THREE.MeshStandardMaterial({color: 0x1d3a1e, roughness: 1.0}); for(let i=0; i<8; i++) { const blade = new THREE.Mesh(geo, mat); blade.position.set((Math.random()-0.5)*0.6, 0.25, (Math.random()-0.5)*0.6); blade.rotation.x = (Math.random()-0.5)*0.5; blade.rotation.z = (Math.random()-0.5)*0.5; if(window.currentGraphics !== 'LOW') blade.castShadow = true; group.add(blade); } return group; } 
window.createTree = function() { const tree = new THREE.Group(); const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 2.5, 5), new THREE.MeshStandardMaterial({color: 0x3b2818, roughness: 1.0})); trunk.position.y = 1.25; if(window.currentGraphics !== 'LOW') trunk.castShadow = true; tree.add(trunk); const leavesMat = new THREE.MeshStandardMaterial({color: 0x0b2d0b, roughness: 0.9}); const leaves = new THREE.Mesh(new THREE.DodecahedronGeometry(1.8, 1), leavesMat); leaves.position.y = 3.2; if(window.currentGraphics !== 'LOW') leaves.castShadow = true; tree.add(leaves); const leaves2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.3, 1), leavesMat); leaves2.position.set(0.8, 2.8, -0.5); if(window.currentGraphics !== 'LOW') leaves2.castShadow = true; tree.add(leaves2); return tree; } 
window.createHealthKit = function() { const group = new THREE.Group(); const box = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.8), new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.5})); const cross1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.2, 0.2), new THREE.MeshBasicMaterial({color: 0xff0000})); const cross2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.9), new THREE.MeshBasicMaterial({color: 0xff0000})); box.position.y = 0.3; cross1.position.y = 0.6; cross2.position.y = 0.6; group.add(box, cross1, cross2); group.traverse(c => { if(c.isMesh && window.currentGraphics !== 'LOW') { c.castShadow = true; }}); return group; }
window.createFortGate = function() { const group = new THREE.Group(); const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 7, 8), window.wallMat); p1.position.set(-2.5, 3.5, 0); if(window.currentGraphics !== 'LOW') p1.castShadow=true; group.add(p1); const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 7, 8), window.wallMat); p2.position.set(2.5, 3.5, 0); if(window.currentGraphics !== 'LOW') p2.castShadow=true; group.add(p2); const beam = new THREE.Mesh(new THREE.BoxGeometry(7, 1.5, 2), window.wallMat); beam.position.set(0, 7.5, 0); if(window.currentGraphics !== 'LOW') beam.castShadow=true; group.add(beam); return group; } 

// ==========================================
// 5. ANIMATIONS & LOADERS
// ==========================================
window.myMixer = null; window.oppMixer = null; 
window.myAnims = {}; window.oppAnims = {}; 
window.myCurrentAnim = 'idle'; window.oppCurrentAnim = 'idle';

window.resetAnimationsToIdle = function() { if(window.myAnims['idle']) window.myAnims['idle'].reset().play(); if(window.oppAnims['idle']) window.oppAnims['idle'].reset().play(); window.myCurrentAnim = 'idle'; window.oppCurrentAnim = 'idle'; } 
window.playAnim = function(p, anim) { let anims = p === 'my' ? window.myAnims : window.oppAnims; let cur = p === 'my' ? window.myCurrentAnim : window.oppCurrentAnim; if (!anims[anim]) return; if (cur !== anim) { if (anims[cur]) anims[cur].fadeOut(0.2); anims[anim].reset().fadeIn(0.2).play(); if (p === 'my') window.myCurrentAnim = anim; else window.oppCurrentAnim = anim; } else { if (!anims[anim].isRunning()) anims[anim].play(); } } 
