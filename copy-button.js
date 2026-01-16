// UPDATED VERSION - For PRE element not textarea
(function() {
    console.log('🚀 Αρχικοποίηση αντιγραφής κώδικα...');
    
    function init() {
        console.log('🔍 Αναζήτηση κώδικα στη σελίδα...');
        
        // 1. Βρες τον κώδικα στο PRE element
        const codePre = document.querySelector('pre');
        
        if (!codePre) {
            console.error('❌ Δεν βρέθηκε PRE element με κώδικα');
            
            // Εναλλακτική: Ψάξε για textarea (αν υπάρχει)
            const textarea = document.querySelector('textarea');
            if (textarea) {
                console.log('✅ Βρέθηκε textarea:', textarea);
                codePre = textarea;
            } else {
                return;
            }
        }
        
        console.log('✅ Βρέθηκε κώδικας:', codePre);
        console.log('📏 Μήκος:', codePre.textContent.length, 'χαρακτήρες');
        
        // 2. Δημιούργησε container για το κουμπί
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            margin-bottom: 15px;
            text-align: right;
        `;
        
        // 3. Δημιούργησε το κουμπί
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '📋 Αντιγραφή Κώδικα';
        copyBtn.style.cssText = `
            padding: 10px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: all 0.3s ease;
            display: inline-block;
        `;
        
        // 4. Προσθήκη hover effect
        copyBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
        });
        
        copyBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
        
        // 5. Προσθήκη click functionality
        copyBtn.addEventListener('click', function() {
            console.log('🖱️ Κλικ για αντιγραφή κώδικα');
            
            // Πάρε το κείμενο από το PRE
            const textToCopy = codePre.textContent || codePre.innerText;
            
            console.log('📋 Κείμενο για αντιγραφή:', textToCopy.substring(0, 100) + '...');
            
            // Αντιγραφή
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        console.log('✅ Αντιγράφηκε επιτυχώς!');
                        showSuccess(this);
                    })
                    .catch(err => {
                        console.warn('⚠️ Σφάλμα με clipboard API:', err);
                        fallbackCopy(textToCopy, this);
                    });
            } else {
                fallbackCopy(textToCopy, this);
            }
        });
        
        // 6. Προσθήκη του κουμπιού πριν από τον κώδικα
        codePre.parentNode.insertBefore(buttonContainer, codePre);
        buttonContainer.appendChild(copyBtn);
        
        console.log('✅ Το κουμπί προστέθηκε ΠΡΙΝ από τον κώδικα!');
        
        // 7. Βοηθητικές συναρτήσεις
        function showSuccess(button) {
            const originalText = button.textContent;
            const originalBg = button.style.background;
            
            button.textContent = '✅ Αντιγράφηκε!';
            button.style.background = '#27ae60';
            button.style.boxShadow = '0 4px 20px rgba(39, 174, 96, 0.4)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = originalBg;
                button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }, 2000);
        }
        
        function fallbackCopy(text, button) {
            console.log('🔄 Χρήση fallback method...');
            
            const tempTextarea = document.createElement('textarea');
            tempTextarea.value = text;
            tempTextarea.style.position = 'fixed';
            tempTextarea.style.left = '-9999px';
            tempTextarea.style.opacity = '0';
            document.body.appendChild(tempTextarea);
            
            tempTextarea.select();
            tempTextarea.setSelectionRange(0, 99999);
            
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(tempTextarea);
                
                if (successful) {
                    console.log('✅ Αντιγράφηκε με fallback!');
                    showSuccess(button);
                } else {
                    console.error('❌ Αποτυχία fallback');
                    showError(button);
                }
            } catch (err) {
                document.body.removeChild(tempTextarea);
                console.error('❌ Σφάλμα:', err);
                showError(button);
            }
        }
        
        function showError(button) {
            const originalText = button.textContent;
            
            button.textContent = '❌ Σφάλμα';
            button.style.background = '#e74c3c';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }, 2000);
        }
    }
    
    // Εκτέλεση
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Επαναπροσπάθεια μετά από 1 δευτερόλεπτο
    setTimeout(init, 1000);
})();
