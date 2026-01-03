// Toggle menu mobile
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});






// Script pour le bouton du header
document.addEventListener('DOMContentLoaded', function() {
    const donateBtnHeader = document.getElementById('donate-btn-header');
    const donationModal = new bootstrap.Modal(document.getElementById('donationModal'));
    
    if (donateBtnHeader) {
        donateBtnHeader.addEventListener('click', function() {
            donationModal.show();
        });
        
        // S'assurer que le bouton est cliquable
        donateBtnHeader.style.cursor = 'pointer';
        donateBtnHeader.disabled = false;
    }
});









// Compteur de caractères
document.getElementById('message').addEventListener('input', function() {
    const charCount = this.value.length;
    document.getElementById('charCount').textContent = charCount;
    
    if (charCount > 500) {
        this.value = this.value.substring(0, 500);
        document.getElementById('charCount').textContent = 500;
    }
});

// Gestion du formulaire
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Animation du bouton
    submitBtn.innerHTML = `
        <div class="spinner-border spinner-border-sm me-2" role="status">
            <span class="visually-hidden">Chargement...</span>
        </div>
        Envoi en cours...
    `;
    submitBtn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
        });

        if (response.ok) {
            // Succès
            document.getElementById('successMessage').classList.remove('d-none');
            form.reset();
            document.getElementById('charCount').textContent = '0';
            
            // Réinitialiser le bouton après un délai
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            throw new Error('Erreur serveur');
        }
    } catch (error) {
        alert('Une erreur est survenue. Veuillez réessayer ou nous écrire directement.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});



// Script unique pour gérer tous les boutons de don
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le modal Bootstrap
    const donationModalElement = document.getElementById('donationModal');
    
    if (!donationModalElement) {
        console.error('Modal de donation non trouvé !');
        return;
    }
    
    const donationModal = new bootstrap.Modal(donationModalElement);

    // Fonction pour ouvrir le modal
    function openDonationModal() {
        console.log('Ouverture du modal de donation');
        donationModal.show();
    }

    // Gérer le bouton du header
    const donateBtnHeader = document.getElementById('donate-btn-header');
    if (donateBtnHeader) {
        donateBtnHeader.addEventListener('click', openDonationModal);
        donateBtnHeader.style.cursor = 'pointer';
        donateBtnHeader.disabled = false;
    }

    // Gérer le bouton flottant
    const openDonationBtn = document.getElementById('openDonationModal');
    if (openDonationBtn) {
        openDonationBtn.addEventListener('click', openDonationModal);
        openDonationBtn.style.cursor = 'pointer';
        openDonationBtn.disabled = false;
    }

    // Debug
    console.log('Bouton header:', donateBtnHeader);
    console.log('Bouton flottant:', openDonationBtn);
    console.log('Modal:', donationModalElement);
});

// Effet de confetti au clic (optionnel)
function addClickEffect(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

// Ajouter les effets de clic
document.addEventListener('click', function(e) {
    if (e.target.id === 'donate-btn-header' || e.target.id === 'openDonationModal' || 
        e.target.closest('#donate-btn-header') || e.target.closest('#openDonationModal')) {
        addClickEffect(e.target);
    }
});
