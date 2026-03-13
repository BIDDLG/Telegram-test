// 🚀 logic.js - GAME ENGINE, MAZE BUILDER & MOVEMENT 🚀

const clock = new THREE.Clock();
let joyActive = false, joyMoveX = 0, joyMoveY = 0, joyTouchId = null;
let targetRotation = 0, targetPitch = 0, lookActive = false, lookTouchId = null;
let prevTouchX = 0, prevTouchY = 0;
const speed = 0.18;

// ==========================================
// 1. MAZE BUILDER (With 3D GLB Support)
// ==========================================
window.buildMazeFromMap = function(mapArray, dynamicSize) { 
    if(dynamicSize) window.gameState.size = dynamicSize;
    let size = window.gameState.size;
    let offset = (size * window.wallUnit) / 2;

    // Purana maze saaf karo
    while(window.mazeGroup.children.length > 0) window.mazeGroup.remove(window.mazeGroup.children[0]);
    window.walls = []; window.coinMeshes = {}; window.healthMeshes = {}; window.hasGameEnded = false;
    window.myCoins = 0; window.myHealth = 100; window.updateHealthUI();

    document.getElementById('joystick-wrapper').style.display = 'block';
    window.playAnim('my', 'idle');

    for(let z = 0; z < size; z++) { 
        for(let x = 0; x < size; x++) { 
            const posX = (x * window.wallUnit) - offset; 
            const posZ = (z * window.wallUnit) - offset; 

            // 🧱 3D WALL LOGIC
            if(mapArray[z][x] === 1) { 
                let wall;
                if(window.GameModels && window.GameModels.wall) {
                    wall = window.GameModels.wall.clone();
                    wall.position.set(posX, 0, posZ);
                } else {
                    wall = new THREE.Mesh(window.wallGeo, window.wallMat); 
                    wall.position.set(posX, window.wallUnit/2, posZ); 
                }
                window.mazeGroup.add(wall); 
                window.walls.push(new THREE.Box3().setFromObject(wall)); 
            } 
            else { 
                // 🪨 3D PATTHAR & RANDOM OBJECTS
                let rand = Math.random();
                if(rand > 0.92 && window.GameModels && window.GameModels.patthar) {
                    let rock = window.GameModels.patthar.clone();
                    rock.position.set(posX + (Math.random()-0.5)*2, 0, posZ + (Math.random()-0.5)*2);
                    window.mazeGroup.add(rock);
                } else if(rand > 0.9) { 
                    let stone = window.createRealRock(); stone.position.set(posX, 0.2, posZ); window.mazeGroup.add(stone); 
                } 

                if(mapArray[z][x] === 3) { 
                    const coin = window.createRealCoin(); coin.position.set(posX, 1.0, posZ); 
                    window.coinMeshes[`${x}_${z}`] = coin; window.mazeGroup.add(coin); 
                } 
                if(mapArray[z][x] === 4) { 
                    const kit = window.createHealthKit(); kit.position.set(posX, 0.5, posZ); 
                    window.healthMeshes[`${x}_${z}`] = kit; window.mazeGroup.add(kit); 
                }
            } 
        } 
    }
    // Entry/Exit Gates
    let entryPosX = (1 * window.wallUnit) - offset;
    window.myPlayer.position.set(entryPosX, 0, (0 * window.wallUnit) - offset - 2.0);
}

// ==========================================
// 2. COLLISION & MOVEMENT LOGIC
// ==========================================
function checkCollision(newPos) { 
    const pBox = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(newPos.x, 1.0, newPos.z), new THREE.Vector3(1.2, 2.0, 1.2)); 
    for(let w of window.walls) if(pBox.intersectsBox(w)) return true; 
    return false; 
}

// Joystick Events
const joyBase = document.getElementById('joystick-base');
const joyStick = document.getElementById('joystick-stick');
joyBase.addEventListener('touchstart', (e) => { e.preventDefault(); joyTouchId = e.changedTouches[0].identifier; joyActive = true; });
joyBase.addEventListener('touchmove', (e) => { 
    if(!joyActive) return;
    for(let t of e.changedTouches) if(t.identifier === joyTouchId) {
        const rect = joyBase.getBoundingClientRect();
        const maxR = rect.width / 2;
        let dx = t.clientX - (rect.left + maxR), dy = t.clientY - (rect.top + maxR);
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist > maxR) { dx *= maxR/dist; dy *= maxR/dist; }
        joyStick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        joyMoveX = dx/maxR; joyMoveY = dy/maxR;
    }
});
joyBase.addEventListener('touchend', () => { joyActive = false; joyStick.style.transform = `translate(-50%,-50%)`; joyMoveX = 0; joyMoveY = 0; });

// ==========================================
// 3. MAIN ANIMATION LOOP
// ==========================================
function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.1);

    if(window.myMixer) window.myMixer.update(delta);
    if(window.oppMixer) window.oppMixer.update(delta);
    if(window.ghostMixer) window.ghostMixer.update(delta);

    if(window.appState === 'playing' && window.isGameRunning) {
        // Player Movement
        if(Math.abs(joyMoveX) > 0.1 || Math.abs(joyMoveY) > 0.1) {
            const camF = new THREE.Vector3(0,0,-1).applyEuler(new THREE.Euler(0, targetRotation, 0));
            const camR = new THREE.Vector3(1,0,0).applyEuler(new THREE.Euler(0, targetRotation, 0));
            const moveDir = new THREE.Vector3().addScaledVector(camF, -joyMoveY).addScaledVector(camR, joyMoveX).normalize();
            const nextPos = window.myPlayer.position.clone().addScaledVector(moveDir, speed);
            if(!checkCollision(nextPos)) window.myPlayer.position.copy(nextPos);
            window.myPlayer.rotation.y = Math.atan2(moveDir.x, moveDir.z);
            window.playAnim('my', 'run');
        } else {
            window.playAnim('my', 'idle');
        }

        // Camera Follow
        const camOffset = new THREE.Vector3(0, 3.5, 5.5).applyEuler(new THREE.Euler(0, targetRotation, 0));
        window.camera.position.lerp(window.myPlayer.position.clone().add(camOffset), 0.1);
        window.camera.lookAt(window.myPlayer.position.clone().add(new THREE.Vector3(0, 1.5, 0)));
    }

    window.renderer.render(window.scene, window.camera);
}
animate();

// UI Updates
window.updateHealthUI = function() {
    document.getElementById('health-fill').style.width = window.myHealth + '%';
    document.getElementById('health-text').innerText = window.myHealth + '%';
}

console.log("✅ logic.js: Game Engine Running!");
