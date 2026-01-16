// ULTIMATE VERSION - For .ck-content DIV instead of textarea
(function() {
    console.log('🚀 Αρχικοποίηση Copy Button System...');
    
    function initializeCopyButton() {
        console.log('🔍 Αναζήτηση στοιχείων...');
        
        // 1. ΒΡΕΣ ΤΟ DIV ΜΕ ΤΟΝ ΚΩΔΙΚΑ (.ck-content)
        const codeDiv = document.querySelector('.ck-content');
        
        if (!codeDiv) {
            console.error('❌ ΔΕΝ ΒΡΕΘΗΚΕ .ck-content div!');
            // Εναλλακτική αναζήτηση
            const allPreElements = document.querySelectorAll('pre');
            if (allPreElements.length > 0) {
                codeDiv = allPreElements[0];
                console.log('✅ Βρέθηκε εναλλακτικό pre element:', codeDiv);
            } else {
                return;
            }
        } else {
            console.log('✅ Βρέθηκε .ck-content div:', codeDiv);
        }
        
        console.log('📏 Μήκος κειμένου:', (codeDiv.innerText || codeDiv.textContent).length, 'χαρακτήρες');
        
        // 2. ΒΡΕΣ ΤΟ CONTAINER
        let container = codeDiv.closest('.page-preview-item, .ck-content, div, pre');
        if (!container) {
            container = codeDiv.parentElement;
        }
        
        console.log('📦 Container:', container);
        
        // 3. ΔΗΜΙΟΥΡΓΙΑ ΚΟΥΜΠΙΟΥ
        const copyBtn = document.createElement('button');
        copyBtn.id = 'copy-code-btn-' + Date.now();
        copyBtn.innerHTML = '📋 Αντιγραφή Κώδικα';
        
        // STYLES
        copyBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            padding: 10px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            z-index: 999999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: all 0.3s ease;
        `;
        
        // HOVER EFFECTS
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.transform = 'translateY(-2px)';
            copyBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
        });
        
        copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.transform = 'translateY(0)';
            copyBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
        
        // 4. CLICK FUNCTIONALITY
        copyBtn.addEventListener('click', function(event) {
            console.log('🖱️ Κλικ στο κουμπί αντιγραφής');
            event.preventDefault();
            event.stopPropagation();
            
            // Πάρε το κείμενο από το div
            const text = codeDiv.innerText || codeDiv.textContent;
            console.log('📋 Κείμενο για αντιγραφή:', text.substring(0, 100) + '...');
            
            // Αντιγραφή στο clipboard
            copyToClipboard(text, copyBtn);
        });
        
        // 5. ΒΑΛΕ ΤΟ CONTAINER ΣΕ RELATIVE
        container.style.position = 'relative';
        if (!container.style.paddingTop || parseInt(container.style.paddingTop) < 50) {
            container.style.paddingTop = '60px';
        }
        
        // 6. ΠΡΟΣΘΗΚΗ ΚΟΥΜΠΙΟΥ
        container.appendChild(copyBtn);
        
        console.log('✅ Το κουμπί προστέθηκε επιτυχώς! ID:', copyBtn.id);
        
        // 7. ΔΗΜΙΟΥΡΓΙΑ TEST BUTTON (για debugging)
        createTestButton(codeDiv);
    }
    
    function copyToClipboard(text, button) {
        console.log('📋 Προσπάθεια αντιγραφής...');
        
        // ΜΟΝΤΕΡΝ ΜΕΘΟΔΟΣ (Clipboard API)
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    console.log('✅ Αντιγράφηκε με Clipboard API');
                    showSuccess(button);
                })
                .catch(err => {
                    console.warn('⚠️ Clipboard API failed:', err);
                    fallbackCopy(text, button);
                });
        } else {
            fallbackCopy(text, button);
        }
    }
    
    function fallbackCopy(text, button) {
        console.log('🔄 Χρήση fallback method...');
        
        // Δημιουργία προσωρινού textarea
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
                console.log('✅ Αντιγράφηκε με fallback');
                showSuccess(button);
            } else {
                console.error('❌ Fallback failed');
                showError(button, 'Αποτυχία');
            }
        } catch (err) {
            document.body.removeChild(tempTextarea);
            console.error('❌ Error:', err);
            showError(button, 'Σφάλμα: ' + err.message);
        }
    }
    
    function showSuccess(button) {
        const originalHTML = button.innerHTML;
        const originalBg = button.style.background;
        
        button.innerHTML = '✅ Αντιγράφηκε!';
        button.style.background = '#27ae60';
        button.style.boxShadow = '0 4px 20px rgba(39, 174, 96, 0.4)';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = originalBg;
            button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        }, 2000);
    }
    
    function showError(button, message) {
        const originalHTML = button.innerHTML;
        
        button.innerHTML = '❌ ' + message;
        button.style.background = '#e74c3c';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 2000);
    }
    
    function createTestButton(codeDiv) {
        // Πρόσθεσε ένα test button για debugging
        const testBtn = document.createElement('button');
        testBtn.textContent = '🔧 TEST';
        testBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 8px 15px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            z-index: 9999999;
            font-size: 12px;
        `;
        
        testBtn.addEventListener('click', () => {
            const text = codeDiv.innerText || codeDiv.textContent;
            console.log('🧪 TEST: Κείμενο από div:', text.substring(0, 150) + '...');
            console.log('🧪 TEST: Div element:', codeDiv);
            alert('TEST: Βρέθηκε κείμενο με ' + text.length + ' χαρακτήρες');
        });
        
        document.body.appendChild(testBtn);
        setTimeout(() => {
            if (document.body.contains(testBtn)) {
                document.body.removeChild(testBtn);
            }
        }, 10000);
    }
    
    // ΕΚΤΕΛΕΣΗ
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCopyButton);
    } else {
        initializeCopyButton();
    }
    
    // ΕΠΑΝΑΛΗΨΗ ΜΕΤΑ ΑΠΟ 2 ΔΕΥΤΕΡΟΛΕΠΤΑ (για dynamic content)
    setTimeout(initializeCopyButton, 2000);
})();
