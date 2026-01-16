// SIMPLE WORKING VERSION - Targets the correct textarea
(function() {
    console.log('🚀 Αρχικοποίηση αντιγραφής...');
    
    function init() {
        // Ψάχνουμε ΣΥΓΚΕΚΡΙΜΕΝΑ το textarea με όνομα 'ex_4_2_a'
        const targetTextarea = document.querySelector('textarea[name="ex_4_2_a"]');
        
        if (!targetTextarea) {
            console.error('❌ Δεν βρέθηκε το συγκεκριμένο textarea');
            return;
        }
        
        console.log('✅ Βρέθηκε το textarea με τον κώδικα!');
        
        // Δημιουργούμε ένα container για το κουμπί
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'margin-bottom: 15px; text-align: right;';
        
        // Δημιουργούμε το κουμπί
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '📋 Αντιγραφή Κώδικα';
        copyBtn.style.cssText = `
            padding: 10px 20px;
            background: #2c3e50;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: background 0.3s;
        `;
        
        // Προσθέτουμε τη λειτουργία αντιγραφής
        copyBtn.addEventListener('click', function() {
            console.log('Κλικ στο κουμπί αντιγραφής');
            
            // Επιλέγουμε και αντιγράφουμε το κείμενο
            targetTextarea.select();
            const textToCopy = targetTextarea.value;
            
            // Προσπαθούμε με το σύγχρονο Clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        copyBtn.textContent = '✅ Αντιγράφηκε!';
                        copyBtn.style.background = '#27ae60';
                        setTimeout(() => {
                            copyBtn.textContent = '📋 Αντιγραφή Κώδικα';
                            copyBtn.style.background = '#2c3e50';
                        }, 2000);
                    })
                    .catch(err => {
                        console.warn('Σφάλμα με Clipboard API, δοκιμάζω fallback:', err);
                        fallbackCopy(textToCopy);
                    });
            } else {
                fallbackCopy(textToCopy);
            }
            
            // Fallback μέθοδος για παλιά προγράμματα περιήγησης
            function fallbackCopy(text) {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    copyBtn.textContent = '✅ Αντιγράφηκε!';
                    copyBtn.style.background = '#27ae60';
                    setTimeout(() => {
                        copyBtn.textContent = '📋 Αντιγραφή Κώδικα';
                        copyBtn.style.background = '#2c3e50';
                    }, 2000);
                } catch (err) {
                    console.error('Fallback copy failed:', err);
                }
                
                document.body.removeChild(textArea);
            }
        });
        
        // Προσθέτουμε hover effect (προαιρετικό)
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.background = '#1a252f';
        });
        copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.background = '#2c3e50';
        });
        
        // Συνδέουμε τα πάντα
        buttonContainer.appendChild(copyBtn);
        targetTextarea.parentNode.insertBefore(buttonContainer, targetTextarea);
        
        console.log('✅ Το κουμπί αντιγραφής προστέθηκε επιτυχώς πριν από τον κώδικα!');
    }
    
    // Εκτελούμε όταν φορτωθεί η σελίδα
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
