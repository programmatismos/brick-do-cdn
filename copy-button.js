// ULTIMATE WORKING VERSION - FOR YOUR SPECIFIC PAGE
(function() {
    console.log('🚀 FINAL: Εκκίνηση αντιγραφής...');
    
    function findTheCode() {
        console.log('🔍 Ψάχνω για τον πραγματικό κώδικα...');
        
        // 1. Διάβασε ΟΛΟ το κείμενο της σελίδας
        const pageText = document.body.innerText;
        
        // 2. Βρες τον HTML κώδικα (αυτό που δείχνει η άσκηση)
        const htmlMatch = pageText.match(/<!DOCTYPE[\s\S]*?<\/html>/i);
        
        if (!htmlMatch) {
            console.error('❌ Δεν βρέθηκε HTML κώδικας στο κείμενο της σελίδας!');
            return null;
        }
        
        const htmlCode = htmlMatch[0];
        console.log('✅ Βρέθηκε HTML κώδικας! Μήκος:', htmlCode.length, 'χαρακτήρες');
        
        // 3. Τώρα ψάξε ΠΟΥ βρίσκεται αυτός ο κώδικας στο DOM
        // Ψάξε σε όλα τα στοιχεία
        const allElements = document.querySelectorAll('body *');
        
        for (const el of allElements) {
            const elementText = el.innerText || el.textContent || '';
            
            // Αν αυτό το στοιχείο περιέχει τουλάχιστον τα πρώτα 500 chars του κώδικα
            if (elementText.includes(htmlCode.substring(0, 500))) {
                console.log('📍 Βρέθηκε σε στοιχείο:', el.tagName, 'με κλάση:', el.className);
                return el;
            }
        }
        
        // 4. Αν δεν βρέθηκε, δημιούργησε ένα δικό μας container
        console.log('⚠️ Δεν βρέθηκε container, θα δημιουργήσω έναν...');
        const newContainer = document.createElement('div');
        newContainer.textContent = htmlCode;
        newContainer.style.cssText = 'white-space: pre-wrap; font-family: monospace; background: #f5f5f5; padding: 15px;';
        
        // Βάλε τον κώδικα κάπου ορατό
        const firstCodeElement = document.querySelector('pre, code, .ck-content') || document.body;
        firstCodeElement.appendChild(newContainer);
        
        return newContainer;
    }
    
    function createButton(codeElement) {
        console.log('🔨 Δημιουργία τελικού κουμπιού...');
        
        // Δημιούργησε container για το κουμπί
        const buttonDiv = document.createElement('div');
        buttonDiv.style.cssText = 'margin: 20px 0; padding: 10px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #3498db;';
        
        // Δημιούργησε το κουμπί
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '<strong>📋 ΚΛΙΚ ΓΙΑ ΑΝΤΙΓΡΑΦΗ ΤΟΥ ΚΩΔΙΚΑ</strong>';
        copyBtn.style.cssText = `
            padding: 12px 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            width: 100%;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        // Hover effect
        copyBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
        });
        
        copyBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
        
        // Click functionality
        copyBtn.addEventListener('click', function() {
            console.log('🎯 Κλικ για αντιγραφή!');
            
            // Πάρε το κείμενο
            const textToCopy = codeElement.innerText || codeElement.textContent;
            
            if (!textToCopy || textToCopy.trim().length < 100) {
                console.error('Λίγο κείμενο!');
                return;
            }
            
            // Βρες τον πραγματικό HTML κώδικα μέσα στο κείμενο
            const htmlMatch = textToCopy.match(/<!DOCTYPE[\s\S]*?<\/html>/i);
            const finalCode = htmlMatch ? htmlMatch[0] : textToCopy;
            
            console.log('📋 Αντιγραφή', finalCode.length, 'χαρακτήρες...');
            
            // Αντιγραφή
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(finalCode)
                    .then(() => {
                        console.log('✅ ΕΠΙΤΥΧΙΑ!');
                        copyBtn.innerHTML = '<strong>✅ Ο ΚΩΔΙΚΑΣ ΑΝΤΙΓΡΑΦΗΚΕ!</strong>';
                        copyBtn.style.background = '#27ae60';
                        
                        setTimeout(() => {
                            copyBtn.innerHTML = '<strong>📋 ΚΛΙΚ ΓΙΑ ΑΝΤΙΓΡΑΦΗ ΤΟΥ ΚΩΔΙΚΑ</strong>';
                            copyBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                        }, 3000);
                    })
                    .catch(err => {
                        console.error('Σφάλμα:', err);
                        fallbackCopy(finalCode, copyBtn);
                    });
            } else {
                fallbackCopy(finalCode, copyBtn);
            }
        });
        
        function fallbackCopy(text, button) {
            const temp = document.createElement('textarea');
            temp.value = text;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            
            button.innerHTML = '<strong>✅ Ο ΚΩΔΙΚΑΣ ΑΝΤΙΓΡΑΦΗΚΕ!</strong>';
            button.style.background = '#27ae60';
            
            setTimeout(() => {
                button.innerHTML = '<strong>📋 ΚΛΙΚ ΓΙΑ ΑΝΤΙΓΡΑΦΗ ΤΟΥ ΚΩΔΙΚΑ</strong>';
                button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }, 3000);
        }
        
        // Προσθήκη οδηγιών
        const instructions = document.createElement('p');
        instructions.innerHTML = 'Αυτό το κουμπί θα αντιγράψει <strong>ΟΛΟΚΛΗΡΟΝ</strong> τον κώδικα της άσκησης.';
        instructions.style.cssText = 'margin-top: 10px; color: #666; font-size: 14px; text-align: center;';
        
        buttonDiv.appendChild(copyBtn);
        buttonDiv.appendChild(instructions);
        
        // ΒΑΛΕ ΤΟ ΚΟΥΜΠΙ ΠΡΙΝ ΑΠΟ ΟΛΟ ΤΟ ΠΕΡΙΕΧΟΜΕΝΟ
        document.body.insertBefore(buttonDiv, document.body.firstChild);
        
        console.log('🎉 ΤΟ ΚΟΥΜΠΙ ΔΗΜΙΟΥΡΓΗΘΗΚΕ ΚΑΙ ΕΙΝΑΙ ΟΡΑΤΟ!');
        return copyBtn;
    }
    
    function init() {
        console.log('🎬 Αρχικοποίηση τελικού script...');
        
        const codeElement = findTheCode();
        
        if (!codeElement) {
            console.error('❌ Αδυναμία εύρεσης κώδικα!');
            
            // Δημιούργησε ένα emergency button
            const emergencyBtn = document.createElement('button');
            emergencyBtn.textContent = '🚨 ΚΛΙΚ ΕΔΩ για αντιγραφή κώδικα';
            emergencyBtn.style.cssText = 'position:fixed;top:20px;left:20px;padding:15px;background:red;color:white;z-index:999999;font-size:18px;';
            
            emergencyBtn.addEventListener('click', function() {
                const pageText = document.body.innerText;
                const htmlCode = pageText.match(/<!DOCTYPE[\s\S]*?<\/html>/i);
                if (htmlCode) {
                    navigator.clipboard.writeText(htmlCode[0]);
                    this.textContent = '✅ ΑΝΤΙΓΡΑΦΗΚΕ!';
                    setTimeout(() => this.textContent = '🚨 ΚΛΙΚ ΕΔΩ', 2000);
                }
            });
            
            document.body.appendChild(emergencyBtn);
            return;
        }
        
        createButton(codeElement);
    }
    
    // ΕΚΤΕΛΕΣΗ
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Δεύτερη ευκαιρία
    setTimeout(init, 1500);
    setTimeout(init, 3000);
})();
