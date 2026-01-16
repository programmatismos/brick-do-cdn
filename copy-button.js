// FINAL VERSION - ΕΓΚΥΡΗ
(function() {
    console.log('🚀 Αρχικοποίηση Copy Button System...');
    
    function initializeCopyButton() {
        console.log('🔍 Αναζήτηση στοιχείων...');
        
        // 1. ΒΡΕΣ ΟΛΑ ΤΑ TEXTAREAS
        const allTextareas = document.querySelectorAll('textarea');
        console.log('📝 Βρέθηκαν textareas:', allTextareas.length);
        
        // 2. ΒΡΕΣ ΤΟ ΚΥΡΙΟ TEXTAREA (αυτό με τον κώδικα)
        let targetTextarea = null;
        
        // Προτεραιότητα 1: Textarea με συγκεκριμένο όνομα
        targetTextarea = document.querySelector('textarea[name="ex_4_2_a"]');
        
        // Προτεραιότητα 2: Το μεγαλύτερο textarea
        if (!targetTextarea && allTextareas.length > 0) {
            targetTextarea = Array.from(allTextareas).reduce((largest, current) => {
                return (current.value.length > largest.value.length) ? current : largest;
            });
        }
        
        // Προτεραιότητα 3: Το πρώτο textarea
        if (!targetTextarea && allTextareas.length > 0) {
            targetTextarea = allTextareas[0];
        }
        
        if (!targetTextarea) {
            console.error('❌ ΔΕΝ ΒΡΕΘΗΚΕ textarea!');
            return;
        }
        
        console.log('✅ Βρέθηκε textarea:', targetTextarea);
        console.log('📏 Μήκος κειμένου:', targetTextarea.value.length, 'χαρακτήρες');
        
        // 3. ΒΡΕΣ ΤΟ CONTAINER
        let container = targetTextarea.closest('.page-preview-item, .ck-content, div, pre');
        if (!container) {
            container = targetTextarea.parentElement;
        }
        
        console.log('📦 Container:', container);
        
        // 4. ΔΗΜΙΟΥΡΓΙΑ ΚΟΥΜΠΙΟΥ
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
        
        // 5. CLICK FUNCTIONALITY
        copyBtn.addEventListener('click', function(event) {
            console.log('🖱️ Κλικ στο κουμπί αντιγραφής');
            event.preventDefault();
            event.stopPropagation();
            
            // Επιλογή κειμένου
            targetTextarea.select();
            targetTextarea.setSelectionRange(0, 999999);
            
            // Δοκιμή αντιγραφής
            copyToClipboard(targetTextarea.value, copyBtn);
        });
        
        // 6. ΒΑΛΕ ΤΟ CONTAINER ΣΕ RELATIVE
        container.style.position = 'relative';
        if (!container.style.paddingTop || container.style.paddingTop < '50px') {
            container.style.paddingTop = '60px';
        }
        
        // 7. ΠΡΟΣΘΗΚΗ ΚΟΥΜΠΙΟΥ
        container.appendChild(copyBtn);
        
        console.log('✅ Το κουμπί προστέθηκε επιτυχώς! ID:', copyBtn.id);
        
        // 8. ΔΗΜΙΟΥΡΓΙΑ TEST BUTTON (για debugging)
        createTestButton(targetTextarea);
    }
    
    function copyToClipboard(text, button) {
        console.log('📋 Προσπάθεια αντιγραφής...');
        
        // ΜΟΝΤΕΡΝ ΜΕΘΟΔΟΣ
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
    
    function createTestButton(textarea) {
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
            console.log('🧪 TEST: Current textarea value:', textarea.value.substring(0, 100) + '...');
            console.log('🧪 TEST: Textarea element:', textarea);
            alert('TEST: Textarea found with ' + textarea.value.length + ' characters');
        });
        
        document.body.appendChild(testBtn);
        setTimeout(() => document.body.removeChild(testBtn), 10000);
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
