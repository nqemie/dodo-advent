// Sélectionner tous les éléments étoiles
const stars = document.querySelectorAll('.star');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const popupGift = document.querySelector('.popup-gift');
const lockedPopup = document.getElementById('lockedPopup');
const closeLocked = document.getElementById('closeLocked');
const countdownElement = document.getElementById('countdown');

// Textes des cadeaux
const gifts = {
    1: "Pleins de bêtises pour manger à Metz",
    2: "Bon pour une soirée coquillettes",
    3: "Massage de 30 minutes par moi",
    4: "Bon pour une soirée \"IT takes Two\"",
    5: "Soirée chocolat chaud, Pop Corn et film de ton choix",
    6: "Bon pour un petit déjeuner au lit",
    7: "Encore des bêtises pour dans le train",
    8: "Un livre sur les randonnées",
    9: "Un appareil photo jetable comme ça tu peux prendre autant de photos que tu veux",
    10: "Une petite broderie",
    11: "Bon pour une journée où je ne touche pas à mon téléphone",
    12: "Bon pour une soirée où tu m'apprends à jouer à LoL",
    13: "Carte cadeau Steam 10-20€",
    14: "Livre de rando pour être un vrai randonneur",
    15: "Soirée Pépé Chicken Tenders",
    16: "Une autre soirée chocolat chaud, films & pop corn",
    17: "Bon pour une rando surprise",
    18: "Brunch maison pancake, bacon, etc",
    19: "Minecraft date night",
    20: "Massage tout nu",
    21: "Un aller retour en train Paris-Metz",
    22: "Soirée/Après-midi gaming",
    23: "Un beau bouquet pour une belle princesse",
    24: "Une super gourde et d'autres cadeaux à découvrir plus tard"
};

// Fonction pour vérifier si une case peut être ouverte
function canOpenDay(day) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = janvier, 11 = décembre
    
    // Si on est en décembre
    if (currentMonth === 11) {
        const unlockDate = new Date(currentYear, 11, day, 0, 0, 0); // Minuit du jour J
        return now >= unlockDate;
    }
    
    // Si on est après décembre (janvier ou plus), tout est déverrouillé
    if (currentMonth > 11 || (currentMonth === 0 && now.getFullYear() > currentYear)) {
        return true;
    }
    
    // Si on est avant décembre, tout est verrouillé
    return false;
}

// Fonction pour calculer le temps restant jusqu'à l'ouverture
function getTimeUntilUnlock(day) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const unlockDate = new Date(currentYear, 11, day, 0, 0, 0); // Décembre = mois 11
    
    const diff = unlockDate - now;
    
    if (diff <= 0) return "maintenant !";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
        return `${days} jour${days > 1 ? 's' : ''} et ${hours}h`;
    } else if (hours > 0) {
        return `${hours}h et ${minutes}min`;
    } else {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
}

// Ajouter les cadenas et gérer les clics
stars.forEach(star => {
    const day = parseInt(star.getAttribute('data-day'));
    
    // Vérifier si la case peut être ouverte
    if (!canOpenDay(day)) {
        star.classList.add('locked');
    }
    
    star.addEventListener('click', function() {
        const day = parseInt(this.getAttribute('data-day'));
        
        // Si la case est verrouillée
        if (!canOpenDay(day)) {
            const timeLeft = getTimeUntilUnlock(day);
            countdownElement.textContent = timeLeft;
            lockedPopup.classList.add('active');
            return;
        }
        
        // Si la case est déverrouillée, afficher le cadeau
        const giftText = gifts[day];
        
        popupGift.innerHTML = '';
        
        const giftCard = document.createElement('div');
        giftCard.className = 'gift-card';
        
        const giftTextElement = document.createElement('p');
        giftTextElement.className = 'gift-text';
        giftTextElement.textContent = giftText;
        
        giftCard.appendChild(giftTextElement);
        popupGift.appendChild(giftCard);
        
        popup.classList.add('active');
    });
});

// Fermer le popup cadeau
closePopup.addEventListener('click', function() {
    popup.classList.remove('active');
});

popup.addEventListener('click', function(e) {
    if (e.target === popup) {
        popup.classList.remove('active');
    }
});

// Fermer le popup verrouillage
closeLocked.addEventListener('click', function() {
    lockedPopup.classList.remove('active');
});

lockedPopup.addEventListener('click', function(e) {
    if (e.target === lockedPopup) {
        lockedPopup.classList.remove('active');
    }
});

// Fermer avec la touche Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (popup.classList.contains('active')) {
            popup.classList.remove('active');
        }
        if (lockedPopup.classList.contains('active')) {
            lockedPopup.classList.remove('active');
        }
    }
});

// Reste du code (neige, enveloppe, etc.) reste identique...


// EFFET NEIGE
function createSnowflakes() {
    const snowflakeChars = ['❄', '❅', '❆', '✻', '✼', '❉'];
    const snowContainer = document.body;
    
    // Créer 50 flocons de neige
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        
        // Position aléatoire
        snowflake.style.left = Math.random() * 100 + '%';
        
        // Taille aléatoire
        snowflake.style.fontSize = (Math.random() * 1.5 + 0.5) + 'em';
        
        // Délai aléatoire
        snowflake.style.animationDelay = Math.random() * 10 + 's';
        
        // Durée aléatoire
        snowflake.style.animationDuration = (Math.random() * 10 + 5) + 's';
        
        snowContainer.appendChild(snowflake);
    }
}

// Lancer la neige quand la page est chargée
window.addEventListener('load', createSnowflakes);

// POPUP MESSAGE SECRET (enveloppe)
const envelopeBtn = document.getElementById('envelopeBtn');
console.log('Enveloppe trouvée:', envelopeBtn);  // TEST

const messagePopup = document.getElementById('messagePopup');
const closeMessage = document.getElementById('closeMessage');

// Ouvrir le message au clic sur l'enveloppe
envelopeBtn.addEventListener('click', function() {
    messagePopup.classList.add('active');
});

// Fermer le message au clic sur le bouton
closeMessage.addEventListener('click', function() {
    messagePopup.classList.remove('active');
});

// Fermer le message au clic en dehors
messagePopup.addEventListener('click', function(e) {
    if (e.target === messagePopup) {
        messagePopup.classList.remove('active');
    }
});

// Fermer avec la touche Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && messagePopup.classList.contains('active')) {
        messagePopup.classList.remove('active');
    }
});


