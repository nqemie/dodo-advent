// Sélectionner tous les éléments étoiles
const stars = document.querySelectorAll('.star');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const popupGift = document.querySelector('.popup-gift');
const lockedPopup = document.getElementById('lockedPopup');
const closeLocked = document.getElementById('closeLocked');
const countdownElement = document.getElementById('countdown');

// Quotes pour Dodo - Version complète
const gifts = {
    1: "L'ascenseur du succès est en panne. Tu vas devoir prendre les escaliers... une marche à la fois ! 💪",
    2: "Le café et toi, vous avez un point commun : vous êtes incroyables le matin ! ☕",
    3: "Qui gobe une noix de coco fait confiance à son anus.",
    4: "La vie est courte. Souris tant que tu as encore des dents. 😁",
    5: "Pense comme un proton. Toujours positif ! ⚡",
    6: "Je ne suis pas paresseux, je suis en mode économie d'énergie. 🔋",
    7: "Rien n'est impossible... sauf monter le lit de Dodo. 🛏️",
    8: "Le stress, c'est quand tu ouvres ton placard et que tu ne trouves pas le nutella. 🤔",
    9: "Je suis multi-tâches : je peux perdre mes clés tout en regardant mes clés. 🔑",
    10: "Si le plan A ne marche pas, l'alphabet a 25 autres lettres. 🔤",
    11: "Fais en sorte qu'aujourd'hui soit tellement génial qu'hier soit jaloux. ✨",
    12: "La vie a donné des citrons à quelqu'un. Et maintenant on nous vend de la limonade trop chère. 🍋",
    13: "Rêve grand, mais n'oublie pas ton réveil. ⏰",
    14: "Je suis pas chiante, je suis... comment dire... une expérience immersive. 😇",
    15: "La boxe m'a appris une chose : parfois il faut esquiver les problèmes... ou les mettre K.O. 🥊💥",
    16: "Mon profil criminel selon Spencer Reid : 'Obsédée par le Nutella, potentiellement dangereuse si affamée.' 🍫🔍",
    17: "Je boxe pour évacuer mon stress. Ou pour être sexy en sueur. Les deux marchent. 🥊💦",
    18: "Profil criminel : suspecte numéro 1 dans la disparition mystérieuse du pot de Nutella de tous les WEI AMMA. 🍫🕵️",
    19: "On a beau dissimuler ses excréments au fond de l'eau, ils remontent toujours a la surface.",
    20: "Si le crocodile a un pantalon, c'est qu'il a enfin trouvé ou ranger sa queue.",
    21: "Les calories du Nutella ne comptent pas si personne ne te voit le manger. C'est scientifique. 🍫🔬",
    22: "Ne prends pas la vie trop au sérieux, tu n'en sortiras pas vivant de toute façon. - Elbert Hubbard ",
    23: "Quelle est la fée qui aime le plus boire de l'Hépar ? La fécale.",
    24: "Bravo, tu as survécu à décembre ! Maintenant, prépare-toi pour janvier... Et surtout, Joyeuses Pacques ! 🎉"
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


