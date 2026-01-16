// FINAL WORKING VERSION - FIXED NULL ERROR
(function() {
    console.log('🚀 Εκκίνηση αντιγραφής...');
    
    function init() {
        console.log('🔍 Ψάχνω για HTML κώδικα...');
        
        // 1. Βρες όλο το κείμενο της σελίδας
        const pageText = document.body.innerText || document.body.textContent;
        
        // 2. Βρες τον HTML κώδικα μέσα σε αυτό
        const htmlMatch = pageText.match(/<!DOCTYPE[\s\S]*?<\/html>/i);
        
        if (!htmlMatch) {
            console.error('❌ Δεν βρέθηκε HTML κώδικας');
            return;
        }
        
        const htmlCode = htmlMatch[0];
        console.log('✅ Βρέθηκε HTML! Μήκος:', htmlCode.length, 'χαρακτήρες');
        
        // 3. Δημιούργησε το κουμπί
        const buttonDiv = document.createElement('div');
        buttonDiv.style.cssText = `
            margin: 20px 0;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #3498db;
            text-align: center;
        `;
        
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '📋 Αντιγραφή Κώδικα';
        copyBtn.style.cssText = `
            padding: 12px 24px;
            background: #2c3e50;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: background 0.3s;
        `;
        
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.background = '#1a252f';
        });
        
        copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.background = '#2c3e50';
        });
        
        copyBtn.addEventListener('click', function() {
            console.log('🎯 Κλικ για αντιγραφή');
            
            navigator.clipboard.writeText(htmlCode)
                .then(() => {
                    copyBtn.textContent = '✅ Αντιγράφηκε!';
                    copyBtn.style.background = '#27ae60';
                    setTimeout(() => {
                        copyBtn.textContent = '📋 Αντιγραφή Κώδικα';
                        copyBtn.style.background = '#2c3e50';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Σφάλμα:', err);
                    // Fallback
                    const temp = document.createElement('textarea');
                    temp.value = htmlCode;
                    document.body.appendChild(temp);
                    temp.select();
                    document.execCommand('copy');
                    document.body.removeChild(temp);
                    
                    copyBtn.textContent = '✅ Αντιγράφηκε!';
                    copyBtn.style.background = '#27ae60';
                    setTimeout(() => {
                        copyBtn.textContent = '📋 Αντιγραφή Κώδικα';
                        copyBtn.style.background = '#2c3e50';
                    }, 2000);
                });
        });
        
        buttonDiv.appendChild(copyBtn);
        
        // 4. Βάλε το κουμπί ΣΩΣΤΑ (FIXED!)
        const targetElement = document.querySelector('h1, h2, .page-preview-item, .ck-content, #code-container, pre, .content');
        
        if (targetElement && targetElement.parentNode) {
            targetElement.parentNode.insertBefore(buttonDiv, targetElement);
            console.log('✅ Το κουμπί προστέθηκε πριν από:', targetElement.tagName);
        } else {
            // Fallback: Βάλε το στην αρχή του body
            document.body.insertBefore(buttonDiv, document.body.firstChild);
            console.log('✅ Το κουμπί προστέθηκε στην αρχή της σελίδας');
        }
        
        console.log('✅ Το κουμπί δημιουργήθηκε!');
    }
    
    // Εκτέλεση
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 500);
    }
    
    // Δεύτερη ευκαιρία
    setTimeout(init, 2000);
})();
