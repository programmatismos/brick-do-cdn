// FINAL PRODUCTION VERSION - TESTED AND WORKING
(function() {
    console.log('🚀 PRODUCTION: Εκκίνηση αντιγραφής...');
    
    function findHTMLCode() {
        console.log('🔍 Ψάχνω για HTML κώδικα...');
        
        // Μέθοδος 1: Ψάξε σε ΟΛΟ το κείμενο της σελίδας
        const pageText = document.body.innerText || document.body.textContent;
        
        // Βρες τον HTML κώδικα (το παράδειγμα της άσκησης)
        const htmlMatch = pageText.match(/<!DOCTYPE[\s\S]*?<\/html>/i);
        
        if (!htmlMatch) {
            console.error('❌ Δεν βρέθηκε HTML στο page text');
            return null;
        }
        
        const htmlCode = htmlMatch[0];
        console.log('✅ Βρέθηκε HTML! Μήκος:', htmlCode.length, 'χαρακτήρες');
        
        // Τώρα βρες ΠΟΥ είναι αυτός ο κώδικας
        // Ψάξε σε όλα τα elements
        const allElements = document.querySelectorAll('body *');
        
        for (const el of allElements) {
            const elementText = el.innerText || el.textContent || '';
            // Έλεγξε αν περιέχει τουλάχιστον τα πρώτα 200 chars του HTML
            if (htmlCode.substring(0, 200) && elementText.includes(htmlCode.substring(0, 200))) {
                console.log('📍 Βρέθηκε σε:', el.tagName, 'class:', el.className);
                return el;
            }
        }
        
        // Αν δεν βρέθηκε container, επέστρεψε το ίδιο το κείμενο
        console.log('⚠️ Δεν βρέθηκε container, θα δημιουργήσω έναν');
        return htmlCode;
    }
    
    function createProductionButton(codeSource) {
        console.log('🔨 Δημιουργία production κουμπιού...');
        
        // Δημιούργησε ένα κύριο container
        const mainContainer = document.createElement('div');
        mainContainer.style.cssText = `
            margin: 25px 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
            border-radius: 12px;
            border: 2px solid #667eea30;
            text-align: center;
        `;
        
        // Δημιούργησε το κουμπί
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '<span style="font-size: 18px;">📋</span> <strong>ΑΝΤΙΓΡΑΦΗ ΚΩΔΙΚΑ</strong>';
        copyBtn.style.cssText = `
            padding: 15px 30px;
            background: linear-gradient(135deg, #2c3e50 0%, #4a6491 100%);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(44, 62, 80, 0.3);
            display: inline-block;
            margin: 0 auto;
        `;
        
        // Hover effects
        copyBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 10px 25px rgba(44, 62, 80, 0.4)';
            this.style.background = 'linear-gradient(135deg, #1a252f 0%, #2c3e50 100%)';
        });
        
        copyBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 6px 20px rgba(44, 62, 80, 0.3)';
            this.style.background = 'linear-gradient(135deg, #2c3e50 0%, #4a6491 100%)';
        });
        
        // CLICK FUNCTIONALITY
        copyBtn.addEventListener('click', function() {
            console.log('🎯 Κλικ στο production κουμπί!');
            
            // Πάρε τον κώδικα
            let textToCopy;
            
            if (typeof codeSource === 'string') {
                // Αν είναι string (HTML κώδικας)
                textToCopy = codeSource;
            } else if (codeSource && codeSource.innerText) {
                // Αν είναι DOM element
                textToCopy = codeSource.innerText;
            } else {
                // Fallback: Όλο το κείμενο της σελίδας
                textToCopy = document.body.innerText;
                const htmlMatch = textToCopy.match(/<!DOCTYPE[\s\S]*?<\/html>/i);
                if (htmlMatch) {
                    textToCopy = htmlMatch[0];
                }
            }
            
            console.log('📋 Αντιγραφή', textToCopy.length, 'χαρακτήρες...');
            
            // Αντιγραφή με modern API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        console.log('✅ PRODUCTION SUCCESS!');
                        showSuccess(this);
                    })
                    .catch(err => {
                        console.error('Clipboard error:', err);
                        fallbackCopy(textToCopy, this);
                    });
            } else {
                fallbackCopy(textToCopy, this);
            }
        });
        
        function showSuccess(button) {
            const originalHTML = button.innerHTML;
            const originalStyle = button.style.cssText;
            
            button.innerHTML = '<span style="font-size: 18px;">✅</span> <strong>ΑΝΤΙΓΡΑΦΗΚΕ!</strong>';
            button.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
            button.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.4)';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.cssText = originalStyle;
            }, 3000);
        }
        
        function fallbackCopy(text, button) {
            const temp = document.createElement('textarea');
            temp.value = text;
            temp.style.position = 'fixed';
            temp.style.left = '-9999px';
            document.body.appendChild(temp);
            temp.select();
            
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(temp);
                
                if (successful) {
                    showSuccess(button);
                } else {
                    button.innerHTML = '<span style="font-size: 18px;">❌</span> <strong>ΑΠΟΤΥΧΙΑ</strong>';
                    button.style.background = '#e74c3c';
                    setTimeout(() => {
                        button.innerHTML = '<span style="font-size: 18px;">📋</span> <strong>ΑΝΤΙΓΡΑΦΗ ΚΩΔΙΚΑ</strong>';
                        button.style.background = 'linear-gradient(135deg, #2c3e50 0%, #4a6491 100%)';
                    }, 2000);
                }
            } catch (err) {
                document.body.removeChild(temp);
                console.error('Fallback error:', err);
            }
        }
        
        // Προσθήκη οδηγιών
        const instructions = document.createElement('div');
        instructions.innerHTML = `
            <p style="margin-top: 15px; color: #666; font-size: 14px;">
                Αυτό το κουμπί θα αντιγράψει <strong>ολόκληρο τον HTML κώδικα</strong> της άσκησης.
            </p>
            <p style="margin-top: 5px; color: #888; font-size: 12px;">
                Μήκος κώδικα: ${typeof codeSource === 'string' ? codeSource.length : '...'} χαρακτήρες
            </p>
        `;
        
        mainContainer.appendChild(copyBtn);
        mainContainer.appendChild(instructions);
        
        // ΒΑΛΕ ΤΟ ΚΟΥΜΠΙ ΣΤΗΝ ΑΡΧΗ ΤΗΣ ΣΕΛΙΔΑΣ
        const firstContent = document.querySelector('.page-preview-item, .ck-content, pre, h1') || document.body;
        firstContent.parentNode.insertBefore(mainContainer, firstContent);
        
        console.log('✅ PRODUCTION ΚΟΥΜΠΙ ΔΗΜΙΟΥΡΓΗΘΗΚΕ!');
        return copyBtn;
    }
    
    function initProduction() {
        console.log('🎬 PRODUCTION Αρχικοποίηση...');
        
        const codeSource = findHTMLCode();
        
        if (!codeSource) {
            console.error('❌ Αδυναμία εύρεσης κώδικα για production!');
            
            // Emergency fallback
            const emergencyDiv = document.createElement('div');
            emergencyDiv.style.cssText = 'position:fixed;top:20px;right:20px;padding:15px;background:#e74c3c;color:white;border-radius:8px;z-index:999999;';
            emergencyDiv.innerHTML = '<strong>🚨 ΚΛΙΚ ΕΔΩ για αντιγραφή</strong>';
            
            emergencyDiv.addEventListener('click', function() {
                const pageText = document.body.innerText;
                const htmlCode = pageText.match(/<!DOCTYPE[\s\S]*?<\/html>/i);
                if (htmlCode) {
                    navigator.clipboard.writeText(htmlCode[0]);
                    this.innerHTML = '<strong>✅ ΑΝΤΙΓΡΑΦΗΚΕ!</strong>';
                    this.style.background = '#27ae60';
                    setTimeout(() => {
                        this.innerHTML = '<strong>🚨 ΚΛΙΚ ΕΔΩ για αντιγραφή</strong>';
                        this.style.background = '#e74c3c';
                    }, 2000);
                }
            });
            
            document.body.appendChild(emergencyDiv);
            return;
        }
        
        createProductionButton(codeSource);
    }
    
    // ΕΚΤΕΛΕΣΗ
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProduction);
    } else {
        setTimeout(initProduction, 500);
    }
    
    // Δεύτερη ευκαιρία
    setTimeout(initProduction, 2000);
    setTimeout(initProduction, 4000);
})();
