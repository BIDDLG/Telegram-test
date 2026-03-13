// 🚀 ui.js - LOGIN, PROFILE & UI FUNCTIONS 🚀

// 1. Character Selection
window.selectChar = function(c) { 
    window.myProfile.character = c; 
    document.querySelectorAll('.char-btn').forEach(btn => { 
        btn.style.background = 'rgba(255, 255, 255, 0.05)'; 
        btn.style.border = '1px solid transparent'; 
    }); 
    const selectedBtn = document.getElementById('btn-' + c); 
    if(selectedBtn) { 
        selectedBtn.style.background = 'rgba(0, 255, 136, 0.3)'; 
        selectedBtn.style.border = '1px solid #00ff88'; 
    } 
} 

// 2. Character Load karne ka function
window.loadMyCharacter = function() { 
    const char = window.myProfile.character || 'm1'; 
    const files = [`${char}_idle`, `${char}_run`, `${char}_win`, `${char}_lose`]; 
    let tempClips = {}; 
    let oldMesh = window.myPlayer.getObjectByName("charMesh"); 
    if(oldMesh) window.myPlayer.remove(oldMesh); 

    const manager = new THREE.LoadingManager(); 
    const loader = new THREE.GLTFLoader(manager); 
    loader.setDRACOLoader(window.dracoLoader); 

    manager.onProgress = (url, itemsLoaded, itemsTotal) => { 
        document.getElementById('load-fill').style.width = `${Math.floor((itemsLoaded/itemsTotal)*100)}%`; 
    }; 

    manager.onLoad = () => { 
        if(tempClips[`${char}_idle`]) window.myAnims['idle'] = window.myMixer.clipAction(tempClips[`${char}_idle`]); 
        if(tempClips[`${char}_run`]) window.myAnims['run'] = window.myMixer.clipAction(tempClips[`${char}_run`]); 
        if(tempClips[`${char}_win`]) window.myAnims['win'] = window.myMixer.clipAction(tempClips[`${char}_win`]); 
        if(tempClips[`${char}_lose`]) window.myAnims['lose'] = window.myMixer.clipAction(tempClips[`${char}_lose`]); 

        window.appState = 'menu'; 
        if(window.myAnims['idle']) window.myAnims['idle'].reset().play(); 
        
        document.getElementById('loading-screen').style.display = 'none'; 
        document.getElementById('main-menu').style.display = 'flex'; 
    }; 

    files.forEach(file => { 
        loader.load(`./${file}.glb`, (gltf) => { 
            if (file.includes('idle')) { 
                const model = gltf.scene; model.name = "charMesh"; 
                model.scale.set(2.2, 2.2, 2.2); 
                window.myPlayer.add(model); 
                window.myMixer = new THREE.AnimationMixer(model); 
            } 
            if(gltf.animations.length) tempClips[file] = gltf.animations[0]; 
        }); 
    }); 
}

// 3. Save Profile & Login (Main Button Function)
window.saveProfile = async function() { 
    const loginBtn = document.getElementById('login-btn'); 
    loginBtn.innerText = "WAIT..."; loginBtn.disabled = true; 
    const nameInput = document.getElementById('username-input').value.trim(); 
    const passInput = document.getElementById('password-input').value.trim(); 
    
    if(nameInput.length < 3 || passInput.length < 3) { 
        alert("Min 3 chars!"); loginBtn.innerText = 'ENTER HUB'; loginBtn.disabled = false; return; 
    } 

    document.getElementById('login-screen').style.display = 'none'; 
    document.getElementById('loading-screen').style.display = 'flex'; 

    try { 
        const doc = await window.db.collection('players').doc(nameInput).get(); 
        if (doc.exists) { 
            const userData = doc.data(); 
            if (userData.password !== passInput) { 
                alert("Wrong Password!"); location.reload(); return; 
            } 
            window.myProfile = { name: nameInput, password: passInput, character: userData.character || 'm1' }; 
        } else { 
            await window.db.collection('players').doc(nameInput).set({ 
                name: nameInput, password: passInput, character: window.myProfile.character, coins: 0 
            }); 
            window.myProfile = { name: nameInput, password: passInput, character: window.myProfile.character };
        }
        localStorage.setItem('mazeUser', JSON.stringify(window.myProfile)); 
        document.getElementById('welcome-msg').innerText = `Welcome, ${nameInput}!`; 
        window.loadMyCharacter(); 
    } catch (e) { alert("Network Error!"); location.reload(); } 
}

// 4. Logout
window.logoutProfile = function() { 
    localStorage.removeItem('mazeUser'); 
    location.reload(); 
}

console.log("✅ ui.js: Interface Logic Ready!");
